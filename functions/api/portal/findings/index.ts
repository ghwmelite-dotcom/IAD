//
// GET|POST /api/portal/findings
// GET is scoped by role: full-access roles see all; auditors see findings
// on their engagements; mda_liaison sees findings for their MDA only.
// POST: full-access roles, or auditors on the target engagement.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { all, first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { canAccessEngagement } from '../../../_shared/portal-access';
import { notifyEngagementTeam } from '../../../_shared/notify';
import { writeAuditLog } from '../../../_shared/audit-log';
import { nowIso } from '../../../_shared/time';
import { z } from 'zod';

const LIST_SELECT = `
  SELECT f.id, f.engagement_id, f.universe_id, f.title, f.description, f.category,
         f.severity, f.condition, f.criteria, f.cause, f.effect, f.status, f.closed_at, f.created_at,
         au.mda_name, au.unit_name, e.code AS engagement_code
  FROM findings f
  JOIN audit_universe au ON au.id = f.universe_id
  JOIN engagements e ON e.id = f.engagement_id`;

const CreateBody = z.object({
  engagement_id: z.string().min(1),
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(10000),
  category: z.string().min(1).max(120),
  severity: z.enum(['high', 'medium', 'low']),
  condition: z.string().max(5000).optional(),
  criteria: z.string().max(5000).optional(),
  cause: z.string().max(5000).optional(),
  effect: z.string().max(5000).optional(),
});

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env);
  if (auth.kind === 'reject') return auth.response;
  const user = auth.user;

  let rows: unknown[];
  if (user.role === 'auditor') {
    rows = await all(
      env,
      `${LIST_SELECT}
       WHERE f.engagement_id IN (
         SELECT id FROM engagements WHERE lead_auditor_id = ?
         UNION SELECT engagement_id FROM engagement_team WHERE user_id = ?)
       ORDER BY f.created_at DESC`,
      user.id,
      user.id,
    );
  } else if (user.role === 'mda_liaison') {
    rows = await all(
      env,
      `${LIST_SELECT} WHERE au.mda_name = ? ORDER BY f.created_at DESC`,
      user.mdaId ?? '',
    );
  } else {
    rows = await all(env, `${LIST_SELECT} ORDER BY f.created_at DESC`);
  }

  return json({ data: rows });
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, ['admin', 'director', 'manager', 'auditor']);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, CreateBody);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const engagement = await first<{ id: string; universe_id: string }>(
    env,
    'SELECT id, universe_id FROM engagements WHERE id = ?',
    v.engagement_id,
  );
  if (!engagement) {
    return json({ error: { code: 'NOT_FOUND', message: 'engagement not found' } }, { status: 404 });
  }
  if (!(await canAccessEngagement(env, auth.user, v.engagement_id))) {
    return json({ error: { code: 'AUTH_FORBIDDEN', message: 'no access to this engagement' } }, { status: 403 });
  }

  const id = crypto.randomUUID();
  await run(
    env,
    `INSERT INTO findings (id, engagement_id, universe_id, title, description, category, severity,
                           condition, criteria, cause, effect, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?)`,
    id,
    v.engagement_id,
    engagement.universe_id,
    v.title,
    v.description,
    v.category,
    v.severity,
    v.condition ?? null,
    v.criteria ?? null,
    v.cause ?? null,
    v.effect ?? null,
    nowIso(),
  );

  await notifyEngagementTeam(env, v.engagement_id, 'finding_assigned', {
    finding_id: id,
    engagement_id: v.engagement_id,
    title: v.title,
    severity: v.severity,
  });

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'finding',
    entityId: id,
    meta: { engagement_id: v.engagement_id, severity: v.severity },
  });

  return json({ data: { id } }, { status: 201 });
};
