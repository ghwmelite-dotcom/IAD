import { describe, it, expect, vi } from 'vitest';
import { onRequestGet as listKnowledge } from '../../../functions/api/portal/knowledge/index';
import { onRequestGet as downloadKnowledge } from '../../../functions/api/portal/knowledge/[id]/download';
import { mockEnv } from '../_helpers/mock-env';
import { makeD1 } from '../_helpers/d1-mock';
import type { Env } from '../../../functions/_shared/types';

const SESSION_SELECT =
  'SELECT s.session_id, s.created_at, s.expires_at, u.id AS user_id, u.email, u.name, u.role, u.mda_id FROM admin_sessions s JOIN users u ON u.email = s.email WHERE s.session_id = ? AND s.expires_at > ? AND u.active = 1';
const SESSION_SLIDE =
  'UPDATE admin_sessions SET last_used_at = ?, expires_at = ? WHERE session_id = ?';

function sessionScripts(role = 'auditor') {
  const now = Date.now();
  return [
    {
      sql: SESSION_SELECT,
      first: {
        session_id: 'sess-1',
        created_at: now - 1000,
        expires_at: now + 60_000,
        user_id: 'u1',
        email: 'auditor@iad.gov.gh',
        name: 'Auditor',
        role,
        mda_id: null,
      },
    },
    { sql: SESSION_SLIDE, run: {} },
  ];
}

const LIST_SELECT = `
  SELECT d.id, d.slug, d.title, d.summary, d.category, d.tags, d.download_count, d.published_at,
         v.version AS cur_version, v.file_name AS cur_file_name, v.file_size AS cur_file_size, v.mime AS cur_mime
  FROM knowledge_documents d
  LEFT JOIN knowledge_versions v ON v.id = (
    SELECT v2.id FROM knowledge_versions v2 WHERE v2.document_id = d.id ORDER BY v2.version DESC LIMIT 1
  )`;

const PORTAL_WHERE = "d.status = 'published'";
const COUNT_SQL = `SELECT COUNT(*) AS total FROM knowledge_documents d WHERE ${PORTAL_WHERE}`;
const LIST_SQL = `${LIST_SELECT} WHERE ${PORTAL_WHERE} ORDER BY d.published_at DESC, d.created_at DESC LIMIT ? OFFSET ?`;

const DOWNLOAD_SQL = `SELECT d.id, v.r2_key, v.file_name, v.mime
     FROM knowledge_documents d
     JOIN knowledge_versions v ON v.id = (
       SELECT v2.id FROM knowledge_versions v2 WHERE v2.document_id = d.id ORDER BY v2.version DESC LIMIT 1
     )
     WHERE d.id = ? AND d.status = 'published'`;
const INCREMENT_SQL = 'UPDATE knowledge_documents SET download_count = download_count + 1 WHERE id = ?';

function ctx(db: D1Database, url: string, params: Record<string, string> = {}, cookie?: string, envOverrides?: Partial<Env>) {
  return {
    request: new Request(url, { headers: cookie ? { Cookie: `admin_session=${cookie}` } : {} }),
    env: { ...mockEnv({ db }), ...envOverrides },
    params,
    waitUntil: () => {},
    data: {},
  };
}

describe('GET /api/portal/knowledge', () => {
  it('rejects unauthenticated requests with 401', async () => {
    const res = await listKnowledge(ctx(makeD1([]), 'https://x/api/portal/knowledge'));
    expect(res.status).toBe(401);
  });

  it('lists published docs including audience=mda for any portal role', async () => {
    const db = makeD1([
      ...sessionScripts('mda_liaison'),
      { sql: COUNT_SQL, first: { total: 1 } },
      {
        sql: LIST_SQL,
        binds: [12, 0],
        all: {
          results: [
            {
              id: 'kd-mda',
              slug: 'mda-guideline-abc12345',
              title: 'MDA Response Guideline',
              summary: 'For MDAs',
              category: 'guideline',
              tags: 'mda',
              download_count: 3,
              published_at: '2026-01-08T00:00:00.000Z',
              cur_version: 1,
              cur_file_name: 'guide.pdf',
              cur_file_size: 512,
              cur_mime: 'application/pdf',
            },
          ],
        },
      },
    ]);
    const res = await listKnowledge(ctx(db, 'https://x/api/portal/knowledge', {}, 'sess-1'));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { data: { id: string }[]; meta: { total: number } };
    expect(body.meta.total).toBe(1);
    expect(body.data[0]?.id).toBe('kd-mda');
  });
});

describe('GET /api/portal/knowledge/:id/download', () => {
  it('rejects unauthenticated requests with 401', async () => {
    const res = await downloadKnowledge(ctx(makeD1([]), 'https://x/api/portal/knowledge/kd-1/download', { id: 'kd-1' }));
    expect(res.status).toBe(401);
  });

  it('streams audience=mda documents to authenticated portal users', async () => {
    const db = makeD1([
      ...sessionScripts(),
      {
        sql: DOWNLOAD_SQL,
        binds: ['kd-mda'],
        first: { id: 'kd-mda', r2_key: 'knowledge/kd-mda/v1.pdf', file_name: 'guide.pdf', mime: 'application/pdf' },
      },
      { sql: INCREMENT_SQL, binds: ['kd-mda'], run: {} },
    ]);
    const uploads = { get: vi.fn(async () => ({ body: 'MDA-PDF' })) } as unknown as R2Bucket;
    const res = await downloadKnowledge(
      ctx(db, 'https://x/api/portal/knowledge/kd-mda/download', { id: 'kd-mda' }, 'sess-1', { UPLOADS: uploads }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get('content-disposition')).toBe('attachment; filename="guide.pdf"');
    expect(res.headers.get('cache-control')).toBe('private, no-store');
    expect(await res.text()).toBe('MDA-PDF');
  });

  it('returns 404 for drafts and unknown ids', async () => {
    const db = makeD1([...sessionScripts(), { sql: DOWNLOAD_SQL, binds: ['kd-draft'], first: null }]);
    const res = await downloadKnowledge(
      ctx(db, 'https://x/api/portal/knowledge/kd-draft/download', { id: 'kd-draft' }, 'sess-1'),
    );
    expect(res.status).toBe(404);
  });
});
