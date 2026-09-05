//
// GET|POST /api/portal/engagements
// GET is scoped: admin/director/manager see all; auditors see engagements
// where they lead or are on the team. mda_liaison is not granted access.
// POST: admin/director/manager; generates code ENG-YYYY-NNN.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { all, first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { writeAuditLog } from '../../../_shared/audit-log';
import { createNotification } from '../../../_shared/notify';
import { nowIso } from '../../../_shared/time';
import { z } from 'zod';

const READ_ROLES = ['admin', 'director', 'manager', 'auditor'] as const;
const WRITE_ROLES = ['admin', 'director', 'manager'] as const;

const LIST_SELECT = `
  SELECT e.id, e.code, e.title, e.universe_id, e.plan_item_id, e.phase,
         e.lead_auditor_id, e.start_date, e.end_date, e.overall_rating, e.created_at,
         au.mda_name, au.unit_name, u.name AS lead_auditor_name
  FROM engagements e
  JOIN audit_universe au ON au.id = e.universe_id
  LEFT JOIN users u ON u.id = e.lead_auditor_id`;

const CreateBody = z.object({
  title: z.string().min(1).max(300),
  universe_id: z.string().min(1),
  plan_item_id: z.string().optional(),
  lead_auditor_id: z.string().optional(),
  start_date: z.string().min(4).max(40),
});

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, READ_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const rows =
    auth.user.role === 'auditor'
      ? await all(
          env,
          `${LIST_SELECT}
           WHERE e.lead_auditor_id = ?
              OR e.id IN (SELECT engagement_id FROM engagement_team WHERE user_id = ?)
           ORDER BY e.created_at DESC`,
          auth.user.id,
          auth.user.id,
        )
      : await all(env, `${LIST_SELECT} ORDER BY e.created_at DESC`);

  return json({ data: rows });
};

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, WRITE_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, CreateBody);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const universe = await first<{ id: string }>(
    env,
    'SELECT id FROM audit_universe WHERE id = ?',
    v.universe_id,
  );
  if (!universe) {
    return json({ error: { code: 'NOT_FOUND', message: 'universe entry not found' } }, { status: 404 });
  }

  const year = Number(v.start_date.slice(0, 4)) || new Date().getFullYear();
  const seq = await first<{ n: number }>(
    env,
    'SELECT COUNT(*) AS n FROM engagements WHERE code LIKE ?',
    `ENG-${year}-%`,
  );
  const code = `ENG-${year}-${String((seq?.n ?? 0) + 1).padStart(3, '0')}`;

  const id = crypto.randomUUID();
  await run(
    env,
    `INSERT INTO engagements (id, code, title, universe_id, plan_item_id, phase, lead_auditor_id, start_date, created_at)
     VALUES (?, ?, ?, ?, ?, 'planning', ?, ?, ?)`,
    id,
    code,
    v.title,
    v.universe_id,
    v.plan_item_id ?? null,
    v.lead_auditor_id ?? null,
    v.start_date,
    nowIso(),
  );

  if (v.lead_auditor_id) {
    await createNotification(env, v.lead_auditor_id, 'engagement_assigned', {
      engagement_id: id,
      code,
      title: v.title,
      role: 'lead',
    });
  }

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'engagement',
    entityId: id,
    meta: { code, title: v.title },
  });

  return json({ data: { id, code } }, { status: 201 });
};
