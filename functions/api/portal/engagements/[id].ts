//
// GET|PATCH /api/portal/engagements/:id
// GET: engagement detail with team + working papers. Auditors only when on
// the engagement; mda_liaison is not granted access.
// PATCH: admin/director/manager; closing a phase stamps end_date.

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { all, first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { canAccessEngagement } from '../../../_shared/portal-access';
import { writeAuditLog } from '../../../_shared/audit-log';
import { nowIso } from '../../../_shared/time';
import { z } from 'zod';

const READ_ROLES = ['admin', 'director', 'manager', 'auditor'] as const;
const WRITE_ROLES = ['admin', 'director', 'manager'] as const;

const PatchBody = z
  .object({
    title: z.string().min(1).max(300),
    phase: z.enum(['planning', 'fieldwork', 'reporting', 'follow_up', 'closed']),
    lead_auditor_id: z.string().nullable(),
    start_date: z.string().min(4).max(40),
    end_date: z.string().max(40).nullable(),
    overall_rating: z.string().max(120).nullable(),
  })
  .partial();

interface EngagementRow {
  id: string;
  phase: string;
  end_date: string | null;
}

export const onRequestGet: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, READ_ROLES);
  if (auth.kind === 'reject') return auth.response;

  if (!(await canAccessEngagement(env, auth.user, params.id))) {
    return json({ error: { code: 'AUTH_FORBIDDEN', message: 'no access to this engagement' } }, { status: 403 });
  }

  const engagement = await first(
    env,
    `SELECT e.id, e.code, e.title, e.universe_id, e.plan_item_id, e.phase,
            e.lead_auditor_id, e.start_date, e.end_date, e.overall_rating, e.created_at,
            au.mda_name, au.unit_name, u.name AS lead_auditor_name
     FROM engagements e
     JOIN audit_universe au ON au.id = e.universe_id
     LEFT JOIN users u ON u.id = e.lead_auditor_id
     WHERE e.id = ?`,
    params.id,
  );
  if (!engagement) {
    return json({ error: { code: 'NOT_FOUND', message: 'engagement not found' } }, { status: 404 });
  }

  const team = await all(
    env,
    `SELECT et.user_id, et.team_role, u.name, u.email
     FROM engagement_team et JOIN users u ON u.id = et.user_id
     WHERE et.engagement_id = ?`,
    params.id,
  );

  const papers = await all(
    env,
    'SELECT id, title, r2_key, uploaded_by, created_at FROM working_papers WHERE engagement_id = ? ORDER BY created_at DESC',
    params.id,
  );

  return json({ data: { ...engagement, team, papers } });
};

export const onRequestPatch: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, WRITE_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, PatchBody);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const existing = await first<EngagementRow>(
    env,
    'SELECT id, phase, end_date FROM engagements WHERE id = ?',
    params.id,
  );
  if (!existing) {
    return json({ error: { code: 'NOT_FOUND', message: 'engagement not found' } }, { status: 404 });
  }

  const entries = Object.entries(v).filter(([, val]) => val !== undefined);
  if (entries.length === 0) {
    return json({ error: { code: 'VALIDATION', message: 'no fields to update' } }, { status: 400 });
  }

  // Closing a phase stamps end_date unless the caller supplied one.
  if (v.phase === 'closed' && existing.phase !== 'closed' && v.end_date === undefined && !existing.end_date) {
    entries.push(['end_date', nowIso()]);
  }

  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  await run(env, `UPDATE engagements SET ${sets} WHERE id = ?`, ...entries.map(([, val]) => val), params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'update',
    entity: 'engagement',
    entityId: params.id,
    meta: { fields: entries.map(([k]) => k) },
  });

  return json({ data: { id: params.id } });
};
