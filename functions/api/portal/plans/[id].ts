//
// GET|PATCH /api/portal/plans/:id
// GET returns the plan with its items. PATCH: admin/director/manager.

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { all, first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { writeAuditLog } from '../../../_shared/audit-log';
import { z } from 'zod';

const READ_ROLES = ['admin', 'director', 'manager', 'auditor'] as const;
const WRITE_ROLES = ['admin', 'director', 'manager'] as const;

const PatchBody = z
  .object({
    year: z.number().int().min(2000).max(2100),
    title: z.string().min(1).max(300),
    status: z.enum(['draft', 'submitted', 'approved']),
  })
  .partial();

export const onRequestGet: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, READ_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const plan = await first(
    env,
    'SELECT id, year, title, status, created_by, created_at FROM audit_plans WHERE id = ?',
    params.id,
  );
  if (!plan) {
    return json({ error: { code: 'NOT_FOUND', message: 'plan not found' } }, { status: 404 });
  }

  const items = await all(
    env,
    `SELECT pi.id, pi.plan_id, pi.universe_id, pi.quarter, pi.priority, pi.status,
            au.mda_name, au.unit_name, au.risk_likelihood, au.risk_impact,
            au.risk_likelihood * au.risk_impact AS risk_score
     FROM plan_items pi
     JOIN audit_universe au ON au.id = pi.universe_id
     WHERE pi.plan_id = ?
     ORDER BY pi.quarter ASC, risk_score DESC`,
    params.id,
  );

  return json({ data: { ...plan, items } });
};

export const onRequestPatch: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, WRITE_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, PatchBody);
  if (parsed.kind === 'reject') return parsed.response;

  const entries = Object.entries(parsed.value).filter(([, v]) => v !== undefined);
  if (entries.length === 0) {
    return json({ error: { code: 'VALIDATION', message: 'no fields to update' } }, { status: 400 });
  }

  const existing = await first<{ id: string }>(
    env,
    'SELECT id FROM audit_plans WHERE id = ?',
    params.id,
  );
  if (!existing) {
    return json({ error: { code: 'NOT_FOUND', message: 'plan not found' } }, { status: 404 });
  }

  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  await run(env, `UPDATE audit_plans SET ${sets} WHERE id = ?`, ...entries.map(([, v]) => v), params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'update',
    entity: 'audit_plan',
    entityId: params.id,
    meta: { fields: entries.map(([k]) => k) },
  });

  return json({ data: { id: params.id } });
};
