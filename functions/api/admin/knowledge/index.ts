//
// GET|POST /api/admin/knowledge
// Knowledge Hub admin: list all documents (any status/audience) with
// version count + current_file, and create documents (multipart/form-data,
// optional initial file → version 1). Session-gated to admin/director,
// mirroring the other /api/admin/* endpoints.

import type { PagesFunction, Env } from '../../../_shared/types';
import { json } from '../../../_shared/json';
import { all, first, run } from '../../../_shared/db';
import { requireSession } from '../../../_shared/session-auth';
import { validateFile } from '../../../_shared/file-validate';
import { extensionForMime } from '../../../_shared/r2-keys';
import { writeAuditLog } from '../../../_shared/audit-log';
import { nowIso } from '../../../_shared/time';
import {
  KNOWLEDGE_CATEGORIES,
  KNOWLEDGE_AUDIENCES,
  KNOWLEDGE_STATUSES,
  KNOWLEDGE_MIMES,
  KNOWLEDGE_MAX_BYTES,
  parsePageParams,
  slugify,
} from '../../../_shared/knowledge';

const ROLES = ['admin', 'director'] as const;

interface AdminListRow {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  category: string;
  audience: string;
  status: string;
  tags: string | null;
  download_count: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  version_count: number;
  cur_version: number | null;
  cur_file_name: string | null;
  cur_file_size: number | null;
  cur_mime: string | null;
}

const ADMIN_SELECT = `
  SELECT d.id, d.slug, d.title, d.summary, d.category, d.audience, d.status, d.tags,
         d.download_count, d.created_by, d.created_at, d.updated_at, d.published_at,
         (SELECT COUNT(*) FROM knowledge_versions kv WHERE kv.document_id = d.id) AS version_count,
         v.version AS cur_version, v.file_name AS cur_file_name, v.file_size AS cur_file_size, v.mime AS cur_mime
  FROM knowledge_documents d
  LEFT JOIN knowledge_versions v ON v.id = (
    SELECT v2.id FROM knowledge_versions v2 WHERE v2.document_id = d.id ORDER BY v2.version DESC LIMIT 1
  )`;

function toAdminItem(row: AdminListRow) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    category: row.category,
    audience: row.audience,
    status: row.status,
    tags: row.tags ? row.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    download_count: row.download_count,
    created_by: row.created_by,
    created_at: row.created_at,
    updated_at: row.updated_at,
    published_at: row.published_at,
    version_count: row.version_count,
    current_file:
      row.cur_version !== null
        ? {
            version: row.cur_version,
            file_name: row.cur_file_name,
            file_size: row.cur_file_size,
            mime: row.cur_mime,
          }
        : null,
  };
}

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  const url = new URL(request.url);
  const { page, pageSize } = parsePageParams(url, { pageSize: 20, maxPageSize: 100 });

  const where: string[] = ['1=1'];
  const binds: unknown[] = [];
  const category = (url.searchParams.get('category') ?? '').trim();
  const status = (url.searchParams.get('status') ?? '').trim();
  const audience = (url.searchParams.get('audience') ?? '').trim();
  const q = (url.searchParams.get('q') ?? '').trim();
  if (category) {
    where.push('d.category = ?');
    binds.push(category);
  }
  if (status) {
    where.push('d.status = ?');
    binds.push(status);
  }
  if (audience) {
    where.push('d.audience = ?');
    binds.push(audience);
  }
  if (q) {
    where.push('(d.title LIKE ? OR d.summary LIKE ? OR d.tags LIKE ?)');
    const like = `%${q}%`;
    binds.push(like, like, like);
  }
  const whereSql = where.join(' AND ');

  const totalRow = await first<{ total: number }>(
    env,
    `SELECT COUNT(*) AS total FROM knowledge_documents d WHERE ${whereSql}`,
    ...binds,
  );
  const rows = await all<AdminListRow>(
    env,
    `${ADMIN_SELECT} WHERE ${whereSql} ORDER BY d.created_at DESC LIMIT ? OFFSET ?`,
    ...binds,
    pageSize,
    (page - 1) * pageSize,
  );

  return json({ data: rows.map(toAdminItem), meta: { page, pageSize, total: totalRow?.total ?? 0 } });
};

function str(form: FormData, key: string): string | null {
  const v = form.get(key);
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : null;
}

async function uniqueSlug(env: Env, title: string): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = `${slugify(title)}-${crypto.randomUUID().slice(0, 8)}`;
    const clash = await first<{ id: string }>(
      env,
      'SELECT id FROM knowledge_documents WHERE slug = ?',
      candidate,
    );
    if (!clash) return candidate;
  }
  // Effectively unreachable: 8 hex-char suffix per attempt.
  return `${slugify(title)}-${crypto.randomUUID()}`;
}

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const auth = await requireSession(request, env, ROLES);
  if (auth.kind === 'reject') return auth.response;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: { code: 'VALIDATION', message: 'multipart form-data required' } }, { status: 400 });
  }

  const title = str(form, 'title');
  const category = str(form, 'category');
  if (!title || title.length > 300) {
    return json({ error: { code: 'VALIDATION', message: 'title is required (max 300 chars)' } }, { status: 400 });
  }
  if (!category || !(KNOWLEDGE_CATEGORIES as readonly string[]).includes(category)) {
    return json(
      { error: { code: 'VALIDATION', message: `category must be one of ${KNOWLEDGE_CATEGORIES.join(', ')}` } },
      { status: 400 },
    );
  }
  const audience = str(form, 'audience') ?? 'public';
  if (!(KNOWLEDGE_AUDIENCES as readonly string[]).includes(audience)) {
    return json({ error: { code: 'VALIDATION', message: "audience must be 'public' or 'mda'" } }, { status: 400 });
  }
  const status = str(form, 'status') ?? 'draft';
  if (!(KNOWLEDGE_STATUSES as readonly string[]).includes(status)) {
    return json(
      { error: { code: 'VALIDATION', message: `status must be one of ${KNOWLEDGE_STATUSES.join(', ')}` } },
      { status: 400 },
    );
  }
  const summary = str(form, 'summary');
  const tags = str(form, 'tags');
  const changeNote = str(form, 'change_note');

  const file = form.get('file');
  let buf: Uint8Array | null = null;
  if (file instanceof File && file.size > 0) {
    buf = new Uint8Array(await file.arrayBuffer());
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
  } else if (file !== null) {
    return json({ error: { code: 'VALIDATION', message: 'file must be a non-empty file' } }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const slug = await uniqueSlug(env, title);
  const now = nowIso();

  await run(
    env,
    'INSERT INTO knowledge_documents (id, slug, title, summary, category, audience, status, tags, download_count, created_by, created_at, updated_at, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?)',
    id,
    slug,
    title,
    summary,
    category,
    audience,
    status,
    tags,
    auth.user.id,
    now,
    now,
    status === 'published' ? now : null,
  );

  let version: number | null = null;
  let r2Key: string | null = null;
  if (buf && file instanceof File) {
    version = 1;
    r2Key = `knowledge/${id}/v1.${extensionForMime(file.type)}`;
    await env.UPLOADS.put(r2Key, buf, { httpMetadata: { contentType: file.type } });
    await run(
      env,
      'INSERT INTO knowledge_versions (id, document_id, version, r2_key, file_name, file_size, mime, change_note, uploaded_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      crypto.randomUUID(),
      id,
      1,
      r2Key,
      file.name || `v1.${extensionForMime(file.type)}`,
      buf.byteLength,
      file.type,
      changeNote,
      auth.user.id,
      now,
    );
  }

  await writeAuditLog(env, {
    userId: auth.user.id,
    action: 'create',
    entity: 'knowledge_document',
    entityId: id,
    meta: { slug, title, category, audience, status, r2_key: r2Key },
  });

  return json({ data: { id, slug, version, r2_key: r2Key } }, { status: 201 });
};
