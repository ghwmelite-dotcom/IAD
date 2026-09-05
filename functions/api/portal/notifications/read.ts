//
// POST /api/portal/notifications/read
// Mark the signed-in user's notifications as read. Body: { ids: string[] }
// or { all: true }.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { parseBody } from '../../../_shared/validate';
import { run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { z } from 'zod';

const Body = z.union([
  z.object({ ids: z.array(z.string().min(1)).min(1).max(200) }),
  z.object({ all: z.literal(true) }),
]);

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env);
  if (auth.kind === 'reject') return auth.response;

  const parsed = await parseBody(request, Body);
  if (parsed.kind === 'reject') return parsed.response;

  if ('all' in parsed.value) {
    await run(env, 'UPDATE notifications SET read = 1 WHERE user_id = ? AND read = 0', auth.user.id);
  } else {
    const placeholders = parsed.value.ids.map(() => '?').join(',');
    await run(
      env,
      `UPDATE notifications SET read = 1 WHERE user_id = ? AND id IN (${placeholders})`,
      auth.user.id,
      ...parsed.value.ids,
    );
  }

  return json({ data: { ok: true } });
};
