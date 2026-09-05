//
// GET /api/portal/users
// Active portal users for engagement lead/team pickers.
// Full-access roles only (admin/director/manager).

import type { PagesFunction } from '../../_shared/types';
import { json } from '../../_shared/json';
import { all } from '../../_shared/db';
import { requireSession } from '../../_shared/session-auth';

const ROLES = ['admin', 'director', 'manager'] as const;

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const rows = await all<{
    id: string;
    name: string;
    email: string;
    role: string;
    mda_id: string | null;
  }>(
    env,
    'SELECT id, name, email, role, mda_id FROM users WHERE active = 1 ORDER BY name ASC',
  );

  return json({ data: rows });
};
