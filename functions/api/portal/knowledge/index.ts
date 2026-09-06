//
// GET /api/portal/knowledge?q=&category=&page=1&pageSize=12
// Portal Knowledge Hub listing — published documents including
// audience='mda' entries. All portal roles may read.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { requireSession, PORTAL_ROLES } from '../../../_shared/session-auth';
import { listPublishedKnowledge, toListItem, parsePageParams } from '../../../_shared/knowledge';

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, PORTAL_ROLES);
  if (auth.kind === 'reject') return auth.response;

  const url = new URL(request.url);
  const { page, pageSize } = parsePageParams(url, { pageSize: 12, maxPageSize: 50 });

  const { rows, total } = await listPublishedKnowledge(env, {
    q: (url.searchParams.get('q') ?? '').trim(),
    category: (url.searchParams.get('category') ?? '').trim(),
    includeMda: true,
    page,
    pageSize,
  });

  return json({ data: rows.map(toListItem), meta: { page, pageSize, total } });
};
