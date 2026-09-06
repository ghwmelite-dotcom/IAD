//
// POST /api/admin/knowledge/:id/versions
// Adds a new file version (multipart/form-data: file + change_note). The
// version number is max(existing)+1; the R2 object lands at
// knowledge/<doc_id>/v<n>.<ext>; the document's updated_at bumps.
// Session-gated to admin/director.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { first, run } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import { validateFile } from '../../../../_shared/file-validate';
import { extensionForMime } from '../../../../_shared/r2-keys';
import { writeAuditLog } from '../../../../_shared/audit-log';
import { nowIso } from '../../../../_shared/time';
import { KNOWLEDGE_MIMES, KNOWLEDGE_MAX_BYTES } from '../../../../_shared/knowledge';

const ROLES = ['admin', 'director'] as const;

export const onRequestPost: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const doc = await first<{ id: string }>(
    env,
    'SELECT id FROM knowledge_documents WHERE id = ?',
    params.id,
  );
  if (!doc) {
    return json({ error: { code: 'NOT_FOUND', message: 'document not found' } }, { status: 404 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: { code: 'VALIDATION', message: 'multipart form-data required' } }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return json({ error: { code: 'VALIDATION', message: 'file is required' } }, { status: 400 });
  }
  const changeNoteRaw = form.get('change_note');
  const changeNote = typeof changeNoteRaw === 'string' && changeNoteRaw.trim().length > 0 ? changeNoteRaw.trim() : null;

  const buf = new Uint8Array(await file.arrayBuffer());
  const verdict = validateFile({
    claimedMime: file.type,
    sizeBytes: buf.byteLength,
    acceptedMimes: KNOWLEDGE_MIMES,
    maxBytes: KNOWLEDGE_MAX_BYTES,
    head: buf.slice(0, 16),
  });
  if (verdict.kind === 'reject') {
    return json({ error: { code: 'VALIDATION', message: verdict.reason } }, { status: 400 });
  }

  const maxRow = await first<{ max_version: number }>(
    env,
    'SELECT COALESCE(MAX(version), 0) AS max_version FROM knowledge_versions WHERE document_id = ?',
    params.id,
  );
  const version = (maxRow?.max_version ?? 0) + 1;

  const r2Key = `knowledge/${params.id}/v${version}.${extensionForMime(file.type)}`;
  await env.UPLOADS.put(r2Key, buf, { httpMetadata: { contentType: file.type } });

  const now = nowIso();
  await run(
    env,
    'INSERT INTO knowledge_versions (id, document_id, version, r2_key, file_name, file_size, mime, change_note, uploaded_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    crypto.randomUUID(),
    params.id,
    version,
    r2Key,
    file.name || `v${version}.${extensionForMime(file.type)}`,
    buf.byteLength,
    file.type,
    changeNote,
    auth.user.id,
    now,
  );
  await run(env, 'UPDATE knowledge_documents SET updated_at = ? WHERE id = ?', now, params.id);

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'knowledge_version',
    entityId: params.id,
    meta: { version, r2_key: r2Key, change_note: changeNote },
  });

  return json({ data: { document_id: params.id, version, r2_key: r2Key } }, { status: 201 });
};
