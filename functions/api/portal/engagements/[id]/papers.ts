//
// POST /api/portal/engagements/:id/papers
// Working paper upload (multipart/form-data: title + file). Stored in R2
// under working-papers/<engagement_id>/<uuid>.<ext>; metadata lands in
// working_papers. Access: full-access roles, or auditors on the engagement.

import type { PagesFunction, Env } from '../../../../_shared/types';
import { json } from '../../../../_shared/json';
import { first, run } from '../../../../_shared/db';
import { requireSession } from '../../../../_shared/session-auth';
import { canAccessEngagement } from '../../../../_shared/portal-access';
import { validateFile } from '../../../../_shared/file-validate';
import { extensionForMime } from '../../../../_shared/r2-keys';
import { writeAuditLog } from '../../../../_shared/audit-log';
import { nowIso } from '../../../../_shared/time';

const ROLES = ['admin', 'director', 'manager', 'auditor'] as const;
const ACCEPTED_MIMES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export const onRequestPost: PagesFunction<Env, 'id'> = async ({ request, env, params }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const engagement = await first<{ id: string }>(
    env,
    'SELECT id FROM engagements WHERE id = ?',
    params.id,
  );
  if (!engagement) {
    return json({ error: { code: 'NOT_FOUND', message: 'engagement not found' } }, { status: 404 });
  }
  if (!(await canAccessEngagement(env, auth.user, params.id))) {
    return json({ error: { code: 'AUTH_FORBIDDEN', message: 'no access to this engagement' } }, { status: 403 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: { code: 'VALIDATION', message: 'multipart form-data required' } }, { status: 400 });
  }

  const title = form.get('title');
  const file = form.get('file');
  if (typeof title !== 'string' || title.trim().length === 0 || title.length > 300) {
    return json({ error: { code: 'VALIDATION', message: 'title is required (max 300 chars)' } }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return json({ error: { code: 'VALIDATION', message: 'file is required' } }, { status: 400 });
  }

  const buf = new Uint8Array(await file.arrayBuffer());
  const verdict = validateFile({
    claimedMime: file.type,
    sizeBytes: buf.byteLength,
    acceptedMimes: ACCEPTED_MIMES,
    maxBytes: MAX_BYTES,
    head: buf.slice(0, 16),
  });
  if (verdict.kind === 'reject') {
    return json({ error: { code: 'VALIDATION', message: verdict.reason } }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const r2Key = `working-papers/${params.id}/${id}.${extensionForMime(file.type)}`;
  await env.UPLOADS.put(r2Key, buf, { httpMetadata: { contentType: file.type } });

  await run(
    env,
    'INSERT INTO working_papers (id, engagement_id, title, r2_key, uploaded_by, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    id,
    params.id,
    title.trim(),
    r2Key,
    auth.user.id,
    nowIso(),
  );

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'working_paper',
    entityId: id,
    meta: { engagement_id: params.id, r2_key: r2Key },
  });

  return json({ data: { id, r2_key: r2Key } }, { status: 201 });
};
