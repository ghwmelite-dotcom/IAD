//
// POST /api/portal/findings/:id/recommendations
// Add a recommendation to a finding. Full-access roles or auditors on the
// engagement.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { parseBody } from '../../../../_shared/validate';
import { first, run } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import { canAccessFinding } from '../../../../_shared/portal-access';
import { writeAuditLog } from '../../../../_shared/audit-log';
import { nowIso } from '../../../../_shared/time';
import { z } from 'zod';

const Body = z.object({
  text: z.string().min(1).max(5000),
  owner: z.string().min(1).max(200),
  due_date: z.string().min(4).max(40),
});

export const onRequestPost: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ['admin', 'director', 'manager', 'auditor']);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const finding = await first<{ id: string; engagement_id: string }>(
    env,
    'SELECT id, engagement_id FROM findings WHERE id = ?',
    params.id,
  );
  if (!finding) {
    return json({ error: { code: 'NOT_FOUND', message: 'finding not found' } }, { status: 404 });
  }
  if (!(await canAccessFinding(env, auth.user, finding))) {
    return json({ error: { code: 'AUTH_FORBIDDEN', message: 'no access to this finding' } }, { status: 403 });
  }

  const id = crypto.randomUUID();
  await run(
    env,
    `INSERT INTO recommendations (id, finding_id, text, owner, due_date, status, created_at)
     VALUES (?, ?, ?, ?, ?, 'open', ?)`,
    id,
    params.id,
    v.text,
    v.owner,
    v.due_date,
    nowIso(),
  );

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'recommendation',
    entityId: id,
    meta: { finding_id: params.id, due_date: v.due_date },
  });

  return json({ data: { id } }, { status: 201 });
};
