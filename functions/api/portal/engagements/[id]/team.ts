//
// POST /api/portal/engagements/:id/team
// Add a team member. admin/director/manager only. Notifies the member.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { parseBody } from '../../../../_shared/validate';
import { first, run } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import { createNotification } from '../../../../_shared/notify';
import { writeAuditLog } from '../../../../_shared/audit-log';
import { z } from 'zod';

const WRITE_ROLES = ['admin', 'director', 'manager'] as const;

const Body = z.object({
  user_id: z.string().min(1),
  team_role: z.string().min(1).max(80),
});

export const onRequestPost: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, WRITE_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;
  const v = parsed.value;

  const engagement = await first<{ id: string; code: string; title: string }>(
    env,
    'SELECT id, code, title FROM engagements WHERE id = ?',
    params.id,
  );
  if (!engagement) {
    return json({ error: { code: 'NOT_FOUND', message: 'engagement not found' } }, { status: 404 });
  }

  const member = await first<{ id: string }>(
    env,
    'SELECT id FROM users WHERE id = ? AND active = 1',
    v.user_id,
  );
  if (!member) {
    return json({ error: { code: 'NOT_FOUND', message: 'user not found' } }, { status: 404 });
  }

  await run(
    env,
    'INSERT OR IGNORE INTO engagement_team (engagement_id, user_id, team_role) VALUES (?, ?, ?)',
    params.id,
    v.user_id,
    v.team_role,
  );

  await createNotification(env, v.user_id, 'engagement_assigned', {
    engagement_id: params.id,
    code: engagement.code,
    title: engagement.title,
    role: v.team_role,
  });

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'update',
    entity: 'engagement_team',
    entityId: params.id,
    meta: { added_user_id: v.user_id, team_role: v.team_role },
  });

  return json({ data: { engagement_id: params.id, user_id: v.user_id } }, { status: 201 });
};
