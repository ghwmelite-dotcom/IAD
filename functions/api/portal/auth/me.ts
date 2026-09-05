import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { requireSession } from '../../../_shared/session-auth';

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env);
  if (auth.kind === 'reject') return auth.response;

  return json({
    data: {
      id: auth.user.id,
      email: auth.user.email,
      name: auth.user.name,
      role: auth.user.role,
      mda_id: auth.user.mdaId,
    },
  });
};
