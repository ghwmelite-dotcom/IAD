import { describe, it, expect, vi } from 'vitest';
import { onRequestGet as listKnowledge } from '../../../functions/api/public/knowledge/index';
import { onRequestGet as downloadKnowledge } from '../../../functions/api/public/knowledge/[id]/download';
import { mockEnv } from '../_helpers/mock-env';
import { makeD1 } from '../_helpers/d1-mock';
import type { Env } from '../../../functions/_shared/types';

const LIST_SELECT = `
  SELECT d.id, d.slug, d.title, d.summary, d.category, d.tags, d.download_count, d.published_at,
         v.version AS cur_version, v.file_name AS cur_file_name, v.file_size AS cur_file_size, v.mime AS cur_mime
  FROM knowledge_documents d
  LEFT JOIN knowledge_versions v ON v.id = (
    SELECT v2.id FROM knowledge_versions v2 WHERE v2.document_id = d.id ORDER BY v2.version DESC LIMIT 1
  )`;

const PUBLIC_WHERE = "d.status = 'published' AND d.audience = 'public'";
const COUNT_SQL = `SELECT COUNT(*) AS total FROM knowledge_documents d WHERE ${PUBLIC_WHERE}`;
const LIST_SQL = `${LIST_SELECT} WHERE ${PUBLIC_WHERE} ORDER BY d.published_at DESC, d.created_at DESC LIMIT ? OFFSET ?`;

const DOWNLOAD_SQL = `SELECT d.id, v.r2_key, v.file_name, v.mime
     FROM knowledge_documents d
     JOIN knowledge_versions v ON v.id = (
       SELECT v2.id FROM knowledge_versions v2 WHERE v2.document_id = d.id ORDER BY v2.version DESC LIMIT 1
     )
     WHERE d.id = ? AND d.status = 'published' AND d.audience = 'public'`;
const INCREMENT_SQL = 'UPDATE knowledge_documents SET download_count = download_count + 1 WHERE id = ?';

function ctx(db: D1Database, url: string, params: Record<string, string> = {}, envOverrides?: Partial<Env>) {
  return {
    request: new Request(url),
    env: { ...mockEnv({ db }), ...envOverrides },
    params,
    waitUntil: () => {},
    data: {},
  };
}

function r2With(body: unknown) {
  return { get: vi.fn(async () => (body === null ? null : { body })) } as unknown as R2Bucket;
}

describe('GET /api/public/knowledge', () => {
  it('returns published public docs with tags array and current_file', async () => {
    const db = makeD1([
      { sql: COUNT_SQL, first: { total: 2 } },
      {
        sql: LIST_SQL,
        binds: [12, 0],
        all: {
          results: [
            {
              id: 'kd-1',
              slug: 'internal-audit-manual-2024-abc12345',
              title: 'Internal Audit Manual 2024',
              summary: 'The manual',
              category: 'manual',
              tags: 'manual, procedures',
              download_count: 41,
              published_at: '2026-01-10T00:00:00.000Z',
              cur_version: 2,
              cur_file_name: 'manual.pdf',
              cur_file_size: 1024,
              cur_mime: 'application/pdf',
            },
            {
              id: 'kd-2',
              slug: 'metadata-only-def67890',
              title: 'Upcoming Circular',
              summary: null,
              category: 'circular',
              tags: null,
              download_count: 0,
              published_at: '2026-01-05T00:00:00.000Z',
              cur_version: null,
              cur_file_name: null,
              cur_file_size: null,
              cur_mime: null,
            },
          ],
        },
      },
    ]);
    const res = await listKnowledge(ctx(db, 'https://x/api/public/knowledge'));
    expect(res.status).toBe(200);
    expect(res.headers.get('cache-control')).toBe('public, max-age=120');
    const body = (await res.json()) as {
      data: {
        id: string;
        tags: string[];
        current_file: { version: number; file_name: string } | null;
      }[];
      meta: { page: number; pageSize: number; total: number };
    };
    expect(body.meta).toEqual({ page: 1, pageSize: 12, total: 2 });
    expect(body.data[0]?.tags).toEqual(['manual', 'procedures']);
    expect(body.data[0]?.current_file).toEqual({
      version: 2,
      file_name: 'manual.pdf',
      file_size: 1024,
      mime: 'application/pdf',
    });
    expect(body.data[1]?.tags).toEqual([]);
    expect(body.data[1]?.current_file).toBeNull();
  });

  it('applies q and category filters with LIKE binds', async () => {
    const where = `${PUBLIC_WHERE} AND d.category = ? AND (d.title LIKE ? OR d.summary LIKE ? OR d.tags LIKE ?)`;
    const db = makeD1([
      {
        sql: `SELECT COUNT(*) AS total FROM knowledge_documents d WHERE ${where}`,
        binds: ['manual', '%risk%', '%risk%', '%risk%'],
        first: { total: 1 },
      },
      {
        sql: `${LIST_SELECT} WHERE ${where} ORDER BY d.published_at DESC, d.created_at DESC LIMIT ? OFFSET ?`,
        binds: ['manual', '%risk%', '%risk%', '%risk%', 12, 0],
        all: { results: [] },
      },
    ]);
    const res = await listKnowledge(ctx(db, 'https://x/api/public/knowledge?q=risk&category=manual'));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { meta: { total: number } };
    expect(body.meta.total).toBe(1);
  });

  it('paginates with page/pageSize offsets', async () => {
    const db = makeD1([
      { sql: COUNT_SQL, first: { total: 30 } },
      { sql: LIST_SQL, binds: [12, 24], all: { results: [] } },
    ]);
    const res = await listKnowledge(ctx(db, 'https://x/api/public/knowledge?page=3'));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { meta: { page: number; total: number } };
    expect(body.meta).toEqual({ page: 3, pageSize: 12, total: 30 });
  });
});

describe('GET /api/public/knowledge/:id/download', () => {
  it('streams the latest version as an attachment and increments download_count', async () => {
    const db = makeD1([
      {
        sql: DOWNLOAD_SQL,
        binds: ['kd-1'],
        first: { id: 'kd-1', r2_key: 'knowledge/kd-1/v2.pdf', file_name: 'manual.pdf', mime: 'application/pdf' },
      },
      { sql: INCREMENT_SQL, binds: ['kd-1'], run: {} },
    ]);
    const res = await downloadKnowledge(
      ctx(db, 'https://x/api/public/knowledge/kd-1/download', { id: 'kd-1' }, { UPLOADS: r2With('PDF-CONTENT') }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('application/pdf');
    expect(res.headers.get('content-disposition')).toBe('attachment; filename="manual.pdf"');
    expect(await res.text()).toBe('PDF-CONTENT');
  });

  it('returns 404 when the document is not published/public or has no version', async () => {
    const db = makeD1([{ sql: DOWNLOAD_SQL, binds: ['kd-9'], first: null }]);
    const res = await downloadKnowledge(
      ctx(db, 'https://x/api/public/knowledge/kd-9/download', { id: 'kd-9' }, { UPLOADS: r2With('x') }),
    );
    expect(res.status).toBe(404);
  });

  it('returns 404 when the R2 object is missing', async () => {
    const db = makeD1([
      {
        sql: DOWNLOAD_SQL,
        binds: ['kd-1'],
        first: { id: 'kd-1', r2_key: 'knowledge/kd-1/v1.pdf', file_name: 'a.pdf', mime: 'application/pdf' },
      },
    ]);
    const res = await downloadKnowledge(
      ctx(db, 'https://x/api/public/knowledge/kd-1/download', { id: 'kd-1' }, { UPLOADS: r2With(null) }),
    );
    expect(res.status).toBe(404);
  });
});
