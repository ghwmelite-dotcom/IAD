//
// GET /api/public/knowledge?q=&category=&page=1&pageSize=12
// Public Knowledge Hub listing — published, audience='public' documents
// only, with the latest version as current_file (null for metadata-only
// entries). Backs the /knowledge website page.

import type { PagesFunction } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { listPublishedKnowledge, toListItem, parsePageParams } from '../../../_shared/knowledge';

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const url = new URL(request.url);
  const { page, pageSize } = parsePageParams(url, { pageSize: 12, maxPageSize: 50 });

  const { rows, total } = await listPublishedKnowledge(env, {
    q: (url.searchParams.get('q') ?? '').trim(),
    category: (url.searchParams.get('category') ?? '').trim(),
    includeMda: false,
    page,
    pageSize,
  });

  return json(
    { data: rows.map(toListItem), meta: { page, pageSize, total } },
    { headers: { 'cache-control': 'public, max-age=120' } },
  );
};
