//
// GET /api/portal/knowledge/:id/download
// Session-gated download of the latest version. Like the public download
// but also allows audience='mda' documents.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { requireSession, PORTAL_ROLES } from '../../../../_shared/session-auth';
import { streamLatestVersion } from '../../../../_shared/knowledge';

export const onRequestGet: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, PORTAL_ROLES);
  if (auth.kind === 'reject') return auth.response;

  return streamLatestVersion(env, params.id, { includeMda: true });
};
