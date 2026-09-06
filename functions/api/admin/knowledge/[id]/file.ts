//
// GET /api/admin/knowledge/:id/file?version=n
// Streams a specific version inline (admin preview). Session-gated to
// admin/director. 404 when the document, version or R2 object is missing.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { first } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import { safeFilename } from '../../../../_shared/knowledge';

const ROLES = ['admin', 'director'] as const;

export const onRequestGet: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const version = parseInt(new URL(request.url).searchParams.get('version') ?? '', 10);
  if (!Number.isInteger(version) || version < 1) {
    return json({ error: { code: 'VALIDATION', message: 'version query param must be a positive integer' } }, { status: 400 });
  }

  const row = await first<{ r2_key: string; file_name: string; mime: string }>(
    env,
    'SELECT v.r2_key, v.file_name, v.mime FROM knowledge_versions v WHERE v.document_id = ? AND v.version = ?',
    params.id,
    version,
  );
  if (!row) {
    return json({ error: { code: 'NOT_FOUND', message: 'version not found' } }, { status: 404 });
  }

  const obj = await env.UPLOADS.get(row.r2_key);
  if (!obj) {
    return json({ error: { code: 'NOT_FOUND', message: 'file missing in storage' } }, { status: 404 });
  }

  return new Response(obj.body, {
    headers: {
      'content-type': row.mime,
      'content-disposition': `inline; filename="${safeFilename(row.file_name)}"`,
      'cache-control': 'private, no-store',
    },
  });
};
