//
// POST /api/portal/plans/:id/items
// Add a plan item. admin/director/manager only.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { parseBody } from '../../../../_shared/validate';
import { first, run } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import { writeAuditLog } from '../../../../_shared/audit-log';
import { z } from 'zod';

const WRITE_ROLES = ['admin', 'director', 'manager'] as const;

const Body = z.object({
  universe_id: z.string().min(1),
  quarter: z.enum(['Q1', 'Q2', 'Q3', 'Q4']),
  priority: z.enum(['high', 'medium', 'low']),
  status: z.enum(['planned', 'in_progress', 'done', 'deferred']).optional(),
});

export const onRequestPost: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, WRITE_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const plan = await first<{ id: string }>(env, 'SELECT id FROM audit_plans WHERE id = ?', params.id);
  if (!plan) {
    return json({ error: { code: 'NOT_FOUND', message: 'plan not found' } }, { status: 404 });
  }
  const universe = await first<{ id: string }>(
    env,
    'SELECT id FROM audit_universe WHERE id = ?',
    v.universe_id,
  );
  if (!universe) {
    return json({ error: { code: 'NOT_FOUND', message: 'universe entry not found' } }, { status: 404 });
  }

  const id = crypto.randomUUID();
  await run(
    env,
    'INSERT INTO plan_items (id, plan_id, universe_id, quarter, priority, status) VALUES (?, ?, ?, ?, ?, ?)',
    id,
    params.id,
    v.universe_id,
    v.quarter,
    v.priority,
    v.status ?? 'planned',
  );

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'plan_item',
    entityId: id,
    meta: { plan_id: params.id, universe_id: v.universe_id },
  });

  return json({ data: { id } }, { status: 201 });
};
