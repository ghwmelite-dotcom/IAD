//
// GET /api/portal/notifications
// The signed-in user's notifications, newest first.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { all } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env);
  if (auth.kind === 'reject') return auth.response;

  const rows = await all(
    env,
    'SELECT id, type, payload_json, read, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 100',
    auth.user.id,
  );

  return json({
    data: (rows as { id: string; type: string; payload_json: string; read: number; created_at: string }[]).map(
      (r) => ({
        id: r.id,
        type: r.type,
        payload: JSON.parse(r.payload_json) as unknown,
        read: r.read === 1,
        created_at: r.created_at,
      }),
    ),
  });
};
