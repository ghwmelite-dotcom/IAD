//
// GET /api/public/knowledge/:id/download
// Streams the latest version of a published, audience='public' document
// from R2 as an attachment and increments download_count. 404 when the
// document is not published/public or has no version.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { streamLatestVersion } from '../../../../_shared/knowledge';

export const onRequestGet: PagesFunction<Env, 'id'> = async ({ env, params }) => {
  return streamLatestVersion(env, params.id, { includeMda: false });
};
