//
// PATCH /api/portal/plan-items/:id
// admin/director/manager only.

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { writeAuditLog } from '../../../_shared/audit-log';
import { z } from 'zod';

const WRITE_ROLES = ['admin', 'director', 'manager'] as const;

const PatchBody = z
  .object({
    quarter: z.enum(['Q1', 'Q2', 'Q3', 'Q4']),
    priority: z.enum(['high', 'medium', 'low']),
    status: z.enum(['planned', 'in_progress', 'done', 'deferred']),
  })
  .partial();

export const onRequestPatch: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, WRITE_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, PatchBody);
  if (parsed.kind === 'reject') return parsed.response;

  const entries = Object.entries(parsed.value).filter(([, v]) => v !== undefined);
  if (entries.length === 0) {
    return json({ error: { code: 'VALIDATION', message: 'no fields to update' } }, { status: 400 });
  }

  const existing = await first<{ id: string }>(env, 'SELECT id FROM plan_items WHERE id = ?', params.id);
  if (!existing) {
    return json({ error: { code: 'NOT_FOUND', message: 'plan item not found' } }, { status: 404 });
  }

  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  await run(env, `UPDATE plan_items SET ${sets} WHERE id = ?`, ...entries.map(([, v]) => v), params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'update',
    entity: 'plan_item',
    entityId: params.id,
    meta: { fields: entries.map(([k]) => k) },
  });

  return json({ data: { id: params.id } });
};
