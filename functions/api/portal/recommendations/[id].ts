//
// PATCH /api/portal/recommendations/:id
// Full-access roles or auditors on the parent finding's engagement.

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { canAccessFinding } from '../../../_shared/portal-access';
import { writeAuditLog } from '../../../_shared/audit-log';
import { z } from 'zod';

const PatchBody = z
  .object({
    text: z.string().min(1).max(5000),
    owner: z.string().min(1).max(200),
    due_date: z.string().min(4).max(40),
    status: z.enum(['open', 'in_progress', 'implemented', 'verified', 'overdue']),
  })
  .partial();

export const onRequestPatch: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ['admin', 'director', 'manager', 'auditor']);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, PatchBody);
  if (parsed.kind === 'reject') return parsed.response;

  const rec = await first<{ id: string; finding_id: string; engagement_id: string }>(
    env,
    'SELECT r.id, r.finding_id, f.engagement_id FROM recommendations r JOIN findings f ON f.id = r.finding_id WHERE r.id = ?',
    params.id,
  );
  if (!rec) {
    return json({ error: { code: 'NOT_FOUND', message: 'recommendation not found' } }, { status: 404 });
  }
  if (!(await canAccessFinding(env, auth.user, rec))) {
    return json({ error: { code: 'AUTH_FORBIDDEN', message: 'no access to this recommendation' } }, { status: 403 });
  }

  const entries = Object.entries(parsed.value).filter(([, val]) => val !== undefined);
  if (entries.length === 0) {
    return json({ error: { code: 'VALIDATION', message: 'no fields to update' } }, { status: 400 });
  }

  const sets = entries.map(([k]) => `${k} = ?`).join(', ');
  await run(env, `UPDATE recommendations SET ${sets} WHERE id = ?`, ...entries.map(([, val]) => val), params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'update',
    entity: 'recommendation',
    entityId: params.id,
    meta: { fields: entries.map(([k]) => k) },
  });

  return json({ data: { id: params.id } });
};
