//
// Shared Knowledge Hub logic (migration 0015). Used by the public, portal
// and admin endpoints so list filtering, the latest-version join, tag
// splitting and the download stream behave identically everywhere.

import type { Env } from './types';
import { json } from './json';
import { all, first, run } from './db';

export const KNOWLEDGE_CATEGORIES = [
  'manual',
  'template',
  'standard',
  'circular',
  'guideline',
  'report',
  'form',
  'policy',
] as const;
export type KnowledgeCategory = (typeof KNOWLEDGE_CATEGORIES)[number];

export const KNOWLEDGE_AUDIENCES = ['public', 'mda'] as const;
export const KNOWLEDGE_STATUSES = ['draft', 'published', 'archived'] as const;

export const KNOWLEDGE_MIMES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];
export const KNOWLEDGE_MAX_BYTES = 25 * 1024 * 1024; // 25 MB

export interface KnowledgeListRow {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  category: string;
  tags: string | null;
  download_count: number;
  published_at: string | null;
  cur_version: number | null;
  cur_file_name: string | null;
  cur_file_size: number | null;
  cur_mime: string | null;
}

// Latest-version join: LEFT JOIN so metadata-only documents (zero versions)
// still list, with cur_* columns NULL.
const LIST_SELECT = `
  SELECT d.id, d.slug, d.title, d.summary, d.category, d.tags, d.download_count, d.published_at,
         v.version AS cur_version, v.file_name AS cur_file_name, v.file_size AS cur_file_size, v.mime AS cur_mime
  FROM knowledge_documents d
  LEFT JOIN knowledge_versions v ON v.id = (
    SELECT v2.id FROM knowledge_versions v2 WHERE v2.document_id = d.id ORDER BY v2.version DESC LIMIT 1
  )`;

export interface ListOptions {
  q: string;
  category: string;
  includeMda: boolean;
  page: number;
  pageSize: number;
}

export interface ListResult {
  rows: KnowledgeListRow[];
  total: number;
}

export async function listPublishedKnowledge(env: Env, opts: ListOptions): Promise<ListResult> {
  const where: string[] = ["d.status = 'published'"];
  const binds: unknown[] = [];
  if (!opts.includeMda) where.push("d.audience = 'public'");
  if (opts.category) {
    where.push('d.category = ?');
    binds.push(opts.category);
  }
  if (opts.q) {
    where.push('(d.title LIKE ? OR d.summary LIKE ? OR d.tags LIKE ?)');
    const like = `%${opts.q}%`;
    binds.push(like, like, like);
  }
  const whereSql = where.join(' AND ');

  const totalRow = await first<{ total: number }>(
    env,
    `SELECT COUNT(*) AS total FROM knowledge_documents d WHERE ${whereSql}`,
    ...binds,
  );
  const rows = await all<KnowledgeListRow>(
    env,
    `${LIST_SELECT} WHERE ${whereSql} ORDER BY d.published_at DESC, d.created_at DESC LIMIT ? OFFSET ?`,
    ...binds,
    opts.pageSize,
    (opts.page - 1) * opts.pageSize,
  );
  return { rows, total: totalRow?.total ?? 0 };
}

export function toListItem(row: KnowledgeListRow) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    category: row.category,
    tags: row.tags ? row.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    download_count: row.download_count,
    published_at: row.published_at,
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

// Header-injection guard for Content-Disposition filenames.
export function safeFilename(name: string): string {
  return name.replace(/["\\\r\n]/g, '_');
}

export async function streamLatestVersion(
  env: Env,
  docId: string,
  opts: { includeMda: boolean },
): Promise<Response> {
  const audienceCond = opts.includeMda ? '' : " AND d.audience = 'public'";
  const row = await first<{ id: string; r2_key: string; file_name: string; mime: string }>(
    env,
    `SELECT d.id, v.r2_key, v.file_name, v.mime
     FROM knowledge_documents d
     JOIN knowledge_versions v ON v.id = (
       SELECT v2.id FROM knowledge_versions v2 WHERE v2.document_id = d.id ORDER BY v2.version DESC LIMIT 1
     )
     WHERE d.id = ? AND d.status = 'published'${audienceCond}`,
    docId,
  );
  if (!row) {
    return json({ error: { code: 'NOT_FOUND', message: 'document not found' } }, { status: 404 });
  }

  const obj = await env.UPLOADS.get(row.r2_key);
  if (!obj) {
    return json({ error: { code: 'NOT_FOUND', message: 'file missing in storage' } }, { status: 404 });
  }

  await run(env, 'UPDATE knowledge_documents SET download_count = download_count + 1 WHERE id = ?', row.id);

  return new Response(obj.body, {
    headers: {
      'content-type': row.mime,
      'content-disposition': `attachment; filename="${safeFilename(row.file_name)}"`,
      'cache-control': opts.includeMda ? 'private, no-store' : 'public, max-age=300',
    },
  });
}

export function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return base || 'document';
}

export function parsePageParams(
  url: URL,
  defaults: { pageSize: number; maxPageSize: number },
): { page: number; pageSize: number } {
  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10) || 1);
  const raw = parseInt(url.searchParams.get('pageSize') ?? String(defaults.pageSize), 10) || defaults.pageSize;
  const pageSize = Math.min(Math.max(1, raw), defaults.maxPageSize);
  return { page, pageSize };
}
