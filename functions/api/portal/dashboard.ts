//
// GET /api/portal/dashboard
// KPIs + chart data, scoped by role: admin/director/manager see
// everything, auditors see their own engagements, mda_liaison sees their
// own MDA. Also performs the lazy overdue-recommendation status flip
// (open/in_progress past due_date → overdue) and notifies director/manager
// once per flipped recommendation.

import type { PagesFunction } from '../../_shared/types';
import { json } from '../../_shared/json';
import { all, first } from '../../_shared/db';
import { requireSession, type SessionUser } from '../../_shared/session-auth';
import {
  flipOverdueRecommendations,
  notifyRoles,
} from '../../_shared/notify';

interface Scope {
  where: string;
  binds: unknown[];
}

function findingsScope(user: SessionUser): Scope {
  if (user.role === 'auditor') {
    return {
      where:
        'f.engagement_id IN (SELECT id FROM engagements WHERE lead_auditor_id = ? UNION SELECT engagement_id FROM engagement_team WHERE user_id = ?)',
      binds: [user.id, user.id],
    };
  }
  if (user.role === 'mda_liaison') {
    return {
      where: 'f.universe_id IN (SELECT id FROM audit_universe WHERE mda_name = ?)',
      binds: [user.mdaId ?? ''],
    };
  }
  return { where: '1=1', binds: [] };
}

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env);
  if (auth.kind === 'reject') return auth.response;
  const user = auth.user;

  // Lazy overdue flip; notify leadership once per recommendation.
  const flipped = await flipOverdueRecommendations(env);
  for (const recId of flipped) {
    await notifyRoles(env, ['director', 'manager'], 'recommendation_overdue', {
      recommendation_id: recId,
    });
  }

  const scope = findingsScope(user);

  const totals = await first<{ findings: number; closed: number }>(
    env,
    `SELECT COUNT(*) AS findings,
            SUM(CASE WHEN f.status IN ('closed','verified') THEN 1 ELSE 0 END) AS closed
     FROM findings f WHERE ${scope.where}`,
    ...scope.binds,
  );

  const bySeverity = await all<{ severity: string; count: number }>(
    env,
    `SELECT f.severity AS severity, COUNT(*) AS count FROM findings f WHERE ${scope.where} GROUP BY f.severity`,
    ...scope.binds,
  );

  const byStatus = await all<{ status: string; count: number }>(
    env,
    `SELECT f.status AS status, COUNT(*) AS count FROM findings f WHERE ${scope.where} GROUP BY f.status`,
    ...scope.binds,
  );

  // 12-month raised vs closed trend, scoped to what the caller may see.
  const trend = await all<{ month: string; raised: number; closed: number }>(
    env,
    `WITH RECURSIVE months(m, n) AS (
       SELECT strftime('%Y-%m', 'now'), 1
       UNION ALL
       SELECT strftime('%Y-%m', 'now', '-' || n || ' months'), n + 1
       FROM months WHERE n < 12
     )
     SELECT m AS month,
       (SELECT COUNT(*) FROM findings f WHERE substr(f.created_at, 1, 7) = m AND ${scope.where}) AS raised,
       (SELECT COUNT(*) FROM findings f WHERE f.closed_at IS NOT NULL AND substr(f.closed_at, 1, 7) = m AND ${scope.where}) AS closed
     FROM months
     ORDER BY m`,
    ...scope.binds,
    ...scope.binds,
  );

  const overdue = await first<{ n: number }>(
    env,
    `SELECT COUNT(*) AS n FROM recommendations r
     JOIN findings f ON f.id = r.finding_id
     WHERE r.status = 'overdue' AND ${scope.where}`,
    ...scope.binds,
  );

  const engagements = await first<{ n: number; active: number }>(
    env,
    user.role === 'auditor'
      ? `SELECT COUNT(*) AS n, SUM(CASE WHEN phase != 'closed' THEN 1 ELSE 0 END) AS active
         FROM engagements WHERE lead_auditor_id = ?
            OR id IN (SELECT engagement_id FROM engagement_team WHERE user_id = ?)`
      : user.role === 'mda_liaison'
        ? `SELECT COUNT(*) AS n, SUM(CASE WHEN e.phase != 'closed' THEN 1 ELSE 0 END) AS active
           FROM engagements e JOIN audit_universe au ON au.id = e.universe_id
           WHERE au.mda_name = ?`
        : `SELECT COUNT(*) AS n, SUM(CASE WHEN phase != 'closed' THEN 1 ELSE 0 END) AS active FROM engagements`,
    ...(user.role === 'auditor' ? [user.id, user.id] : user.role === 'mda_liaison' ? [user.mdaId ?? ''] : []),
  );

  const recentActivity = await all<{
    id: string;
    action: string;
    entity: string;
    entity_id: string | null;
    created_at: string;
  }>(
    env,
    'SELECT id, action, entity, entity_id, created_at FROM audit_log ORDER BY created_at DESC LIMIT 10',
  );

  const findings = totals?.findings ?? 0;
  const closed = totals?.closed ?? 0;

  return json({
    data: {
      kpis: {
        findings,
        open: findings - closed,
        closed,
        resolutionRate: findings > 0 ? Math.round((closed / findings) * 1000) / 10 : 0,
        overdueRecommendations: overdue?.n ?? 0,
        engagements: engagements?.n ?? 0,
        activeEngagements: engagements?.active ?? 0,
      },
      bySeverity,
      byStatus,
      trend,
      recentActivity,
    },
  });
};
