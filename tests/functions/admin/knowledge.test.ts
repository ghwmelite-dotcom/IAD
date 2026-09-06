// @vitest-environment node
// Multipart endpoints need the Workers/node Request.formData(); jsdom's
// Request does not support it (same convention as applications/documents).
import { describe, it, expect, vi } from 'vitest';
import { onRequestGet as listKnowledge, onRequestPost as createKnowledge } from '../../../functions/api/admin/knowledge/index';
import { onRequestPatch as patchKnowledge, onRequestDelete as deleteKnowledge } from '../../../functions/api/admin/knowledge/[id]';
import { onRequestPost as addVersion } from '../../../functions/api/admin/knowledge/[id]/versions';
import { onRequestGet as getFile } from '../../../functions/api/admin/knowledge/[id]/file';
import { mockEnv } from '../_helpers/mock-env';
import { makeD1 } from '../_helpers/d1-mock';
import type { Env } from '../../../functions/_shared/types';

const SESSION_SELECT =
  'SELECT s.session_id, s.created_at, s.expires_at, u.id AS user_id, u.email, u.name, u.role, u.mda_id FROM admin_sessions s JOIN users u ON u.email = s.email WHERE s.session_id = ? AND s.expires_at > ? AND u.active = 1';
const SESSION_SLIDE =
  'UPDATE admin_sessions SET last_used_at = ?, expires_at = ? WHERE session_id = ?';

function sessionScripts(role = 'admin') {
  const now = Date.now();
  return [
    {
      sql: SESSION_SELECT,
      first: {
        session_id: 'sess-1',
        created_at: now - 1000,
        expires_at: now + 60_000,
        user_id: 'u-admin',
        email: 'admin@iad.gov.gh',
        name: 'Admin',
        role,
        mda_id: null,
      },
    },
    { sql: SESSION_SLIDE, run: {} },
  ];
}

const AUDIT_INSERT =
  'INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';

const ADMIN_SELECT = `
  SELECT d.id, d.slug, d.title, d.summary, d.category, d.audience, d.status, d.tags,
         d.download_count, d.created_by, d.created_at, d.updated_at, d.published_at,
         (SELECT COUNT(*) FROM knowledge_versions kv WHERE kv.document_id = d.id) AS version_count,
         v.version AS cur_version, v.file_name AS cur_file_name, v.file_size AS cur_file_size, v.mime AS cur_mime
  FROM knowledge_documents d
  LEFT JOIN knowledge_versions v ON v.id = (
    SELECT v2.id FROM knowledge_versions v2 WHERE v2.document_id = d.id ORDER BY v2.version DESC LIMIT 1
  )`;

const PDF_BYTES = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a]);

function makeR2() {
  return {
    put: vi.fn(async () => ({}) as R2Object),
    get: vi.fn(async () => ({ body: 'FILE-BYTES' })),
    delete: vi.fn(async () => undefined),
  } as unknown as R2Bucket;
}

function ctx(req: Request, params: Record<string, string> = {}, db: D1Database, envOverrides?: Partial<Env>) {
  return {
    request: req,
    env: { ...mockEnv({ db }), ...envOverrides },
    params,
    waitUntil: () => {},
    data: {},
  };
}

function authed(url: string, init: RequestInit = {}): Request {
  return new Request(url, {
    ...init,
    headers: { Cookie: 'admin_session=sess-1', ...(init.headers ?? {}) },
  });
}

function uploadRequest(fields: Record<string, string>, file?: { bytes: Uint8Array; mime: string; name: string }): Request {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.append(k, v);
  if (file) fd.append('file', new Blob([file.bytes as BlobPart], { type: file.mime }), file.name);
  return authed('https://x/api/admin/knowledge', { method: 'POST', body: fd });
}

describe('GET /api/admin/knowledge', () => {
  it('rejects unauthenticated requests with 401', async () => {
    const res = await listKnowledge(ctx(new Request('https://x/api/admin/knowledge'), {}, makeD1([])));
    expect(res.status).toBe(401);
  });

  it('rejects non-admin roles with 403', async () => {
    const db = makeD1(sessionScripts('auditor'));
    const res = await listKnowledge(ctx(authed('https://x/api/admin/knowledge'), {}, db));
    expect(res.status).toBe(403);
  });

  it('lists all docs with filters, version_count and current_file', async () => {
    const where = '1=1 AND d.category = ? AND d.status = ? AND d.audience = ?';
    const db = makeD1([
      ...sessionScripts(),
      {
        sql: `SELECT COUNT(*) AS total FROM knowledge_documents d WHERE ${where}`,
        binds: ['manual', 'draft', 'mda'],
        first: { total: 1 },
      },
      {
        sql: `${ADMIN_SELECT} WHERE ${where} ORDER BY d.created_at DESC LIMIT ? OFFSET ?`,
        binds: ['manual', 'draft', 'mda', 20, 0],
        all: {
          results: [
            {
              id: 'kd-1',
              slug: 'manual-abc12345',
              title: 'Manual',
              summary: null,
              category: 'manual',
              audience: 'mda',
              status: 'draft',
              tags: 'a,b',
              download_count: 0,
              created_by: 'u-admin',
              created_at: '2026-01-01T00:00:00.000Z',
              updated_at: '2026-01-01T00:00:00.000Z',
              published_at: null,
              version_count: 2,
              cur_version: 2,
              cur_file_name: 'm.pdf',
              cur_file_size: 99,
              cur_mime: 'application/pdf',
            },
          ],
        },
      },
    ]);
    const res = await listKnowledge(
      ctx(authed('https://x/api/admin/knowledge?category=manual&status=draft&audience=mda'), {}, db),
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      data: { version_count: number; tags: string[]; current_file: { version: number } | null }[];
      meta: { page: number; pageSize: number; total: number };
    };
    expect(body.meta).toEqual({ page: 1, pageSize: 20, total: 1 });
    expect(body.data[0]?.version_count).toBe(2);
    expect(body.data[0]?.tags).toEqual(['a', 'b']);
    expect(body.data[0]?.current_file?.version).toBe(2);
  });
});

describe('POST /api/admin/knowledge', () => {
  const INSERT_DOC =
    'INSERT INTO knowledge_documents (id, slug, title, summary, category, audience, status, tags, download_count, created_by, created_at, updated_at, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?)';
  const SLUG_CHECK = 'SELECT id FROM knowledge_documents WHERE slug = ?';
  const INSERT_VERSION =
    'INSERT INTO knowledge_versions (id, document_id, version, r2_key, file_name, file_size, mime, change_note, uploaded_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  it('creates a metadata-only document when no file is attached', async () => {
    const db = makeD1([
      ...sessionScripts(),
      { sql: SLUG_CHECK, first: null },
      { sql: INSERT_DOC, run: {} },
      { sql: AUDIT_INSERT, run: {} },
    ]);
    const r2 = makeR2();
    const res = await createKnowledge(
      ctx(uploadRequest({ title: 'Upcoming Standard', category: 'standard', status: 'draft' }), {}, db, { UPLOADS: r2 }),
    );
    expect(res.status).toBe(201);
    const body = (await res.json()) as { data: { id: string; slug: string; version: number | null; r2_key: string | null } };
    expect(body.data.version).toBeNull();
    expect(body.data.r2_key).toBeNull();
    expect(body.data.slug).toMatch(/^upcoming-standard-[0-9a-f]{8}$/);
    expect(r2.put).not.toHaveBeenCalled();
  });

  it('creates the document plus version 1 when a file is attached', async () => {
    const db = makeD1([
      ...sessionScripts(),
      { sql: SLUG_CHECK, first: null },
      { sql: INSERT_DOC, run: {} },
      { sql: INSERT_VERSION, run: {} },
      { sql: AUDIT_INSERT, run: {} },
    ]);
    const r2 = makeR2();
    const res = await createKnowledge(
      ctx(
        uploadRequest(
          { title: 'Audit Manual', category: 'manual', status: 'published', change_note: 'initial' },
          { bytes: PDF_BYTES, mime: 'application/pdf', name: 'manual.pdf' },
        ),
        {},
        db,
        { UPLOADS: r2 },
      ),
    );
    expect(res.status).toBe(201);
    const body = (await res.json()) as { data: { id: string; version: number; r2_key: string } };
    expect(body.data.version).toBe(1);
    expect(body.data.r2_key).toBe(`knowledge/${body.data.id}/v1.pdf`);
    expect(r2.put).toHaveBeenCalledWith(
      `knowledge/${body.data.id}/v1.pdf`,
      expect.any(Uint8Array),
      { httpMetadata: { contentType: 'application/pdf' } },
    );
  });

  it('rejects an unsupported mime with 400', async () => {
    const db = makeD1(sessionScripts());
    const res = await createKnowledge(
      ctx(
        uploadRequest({ title: 'X', category: 'form' }, { bytes: PDF_BYTES, mime: 'image/gif', name: 'x.gif' }),
        {},
        db,
        { UPLOADS: makeR2() },
      ),
    );
    expect(res.status).toBe(400);
  });

  it('rejects a missing category with 400', async () => {
    const db = makeD1(sessionScripts());
    const res = await createKnowledge(ctx(uploadRequest({ title: 'X' }), {}, db, { UPLOADS: makeR2() }));
    expect(res.status).toBe(400);
  });
});

describe('PATCH /api/admin/knowledge/:id', () => {
  const EXISTING = 'SELECT id, status, published_at FROM knowledge_documents WHERE id = ?';

  it('stamps published_at on first transition to published', async () => {
    const db = makeD1([
      ...sessionScripts(),
      { sql: EXISTING, binds: ['kd-1'], first: { id: 'kd-1', status: 'draft', published_at: null } },
      {
        sql: 'UPDATE knowledge_documents SET status = ?, published_at = ?, updated_at = ? WHERE id = ?',
        run: {},
      },
      { sql: AUDIT_INSERT, run: {} },
    ]);
    const res = await patchKnowledge(
      ctx(
        authed('https://x/api/admin/knowledge/kd-1', {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ status: 'published' }),
        }),
        { id: 'kd-1' },
        db,
      ),
    );
    expect(res.status).toBe(200);
  });

  it('does not restamp published_at when already set', async () => {
    const db = makeD1([
      ...sessionScripts(),
      {
        sql: EXISTING,
        binds: ['kd-1'],
        first: { id: 'kd-1', status: 'published', published_at: '2026-01-01T00:00:00.000Z' },
      },
      { sql: 'UPDATE knowledge_documents SET title = ?, updated_at = ? WHERE id = ?', run: {} },
      { sql: AUDIT_INSERT, run: {} },
    ]);
    const res = await patchKnowledge(
      ctx(
        authed('https://x/api/admin/knowledge/kd-1', {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ title: 'Renamed' }),
        }),
        { id: 'kd-1' },
        db,
      ),
    );
    expect(res.status).toBe(200);
  });

  it('returns 404 for an unknown document', async () => {
    const db = makeD1([...sessionScripts(), { sql: EXISTING, binds: ['ghost'], first: null }]);
    const res = await patchKnowledge(
      ctx(
        authed('https://x/api/admin/knowledge/ghost', {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ title: 'X' }),
        }),
        { id: 'ghost' },
        db,
      ),
    );
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/admin/knowledge/:id', () => {
  it('deletes R2 objects, version rows and the document', async () => {
    const db = makeD1([
      ...sessionScripts(),
      {
        sql: 'SELECT id, title FROM knowledge_documents WHERE id = ?',
        binds: ['kd-1'],
        first: { id: 'kd-1', title: 'Manual' },
      },
      {
        sql: 'SELECT r2_key FROM knowledge_versions WHERE document_id = ?',
        binds: ['kd-1'],
        all: { results: [{ r2_key: 'knowledge/kd-1/v1.pdf' }, { r2_key: 'knowledge/kd-1/v2.pdf' }] },
      },
      { sql: 'DELETE FROM knowledge_versions WHERE document_id = ?', binds: ['kd-1'], run: {} },
      { sql: 'DELETE FROM knowledge_documents WHERE id = ?', binds: ['kd-1'], run: {} },
      { sql: AUDIT_INSERT, run: {} },
    ]);
    const r2 = makeR2();
    const res = await deleteKnowledge(
      ctx(authed('https://x/api/admin/knowledge/kd-1', { method: 'DELETE' }), { id: 'kd-1' }, db, { UPLOADS: r2 }),
    );
    expect(res.status).toBe(200);
    expect(r2.delete).toHaveBeenCalledTimes(2);
    expect(r2.delete).toHaveBeenCalledWith('knowledge/kd-1/v1.pdf');
    expect(r2.delete).toHaveBeenCalledWith('knowledge/kd-1/v2.pdf');
    const body = (await res.json()) as { data: { deleted_versions: number } };
    expect(body.data.deleted_versions).toBe(2);
  });
});

describe('POST /api/admin/knowledge/:id/versions', () => {
  const DOC_CHECK = 'SELECT id FROM knowledge_documents WHERE id = ?';
  const MAX_VERSION = 'SELECT COALESCE(MAX(version), 0) AS max_version FROM knowledge_versions WHERE document_id = ?';
  const INSERT_VERSION =
    'INSERT INTO knowledge_versions (id, document_id, version, r2_key, file_name, file_size, mime, change_note, uploaded_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const BUMP = 'UPDATE knowledge_documents SET updated_at = ? WHERE id = ?';

  it('adds version n+1 and bumps updated_at', async () => {
    const db = makeD1([
      ...sessionScripts(),
      { sql: DOC_CHECK, binds: ['kd-1'], first: { id: 'kd-1' } },
      { sql: MAX_VERSION, binds: ['kd-1'], first: { max_version: 1 } },
      { sql: INSERT_VERSION, run: {} },
      { sql: BUMP, run: {} },
      { sql: AUDIT_INSERT, run: {} },
    ]);
    const r2 = makeR2();
    const fd = new FormData();
    fd.append('change_note', 'fixed typos');
    fd.append('file', new Blob([PDF_BYTES as BlobPart], { type: 'application/pdf' }), 'manual-v2.pdf');
    const res = await addVersion(
      ctx(authed('https://x/api/admin/knowledge/kd-1/versions', { method: 'POST', body: fd }), { id: 'kd-1' }, db, {
        UPLOADS: r2,
      }),
    );
    expect(res.status).toBe(201);
    const body = (await res.json()) as { data: { version: number; r2_key: string } };
    expect(body.data.version).toBe(2);
    expect(body.data.r2_key).toBe('knowledge/kd-1/v2.pdf');
    expect(r2.put).toHaveBeenCalledWith('knowledge/kd-1/v2.pdf', expect.any(Uint8Array), {
      httpMetadata: { contentType: 'application/pdf' },
    });
  });

  it('returns 404 when the document does not exist', async () => {
    const db = makeD1([...sessionScripts(), { sql: DOC_CHECK, binds: ['ghost'], first: null }]);
    const fd = new FormData();
    fd.append('file', new Blob([PDF_BYTES as BlobPart], { type: 'application/pdf' }), 'x.pdf');
    const res = await addVersion(
      ctx(authed('https://x/api/admin/knowledge/ghost/versions', { method: 'POST', body: fd }), { id: 'ghost' }, db),
    );
    expect(res.status).toBe(404);
  });

  it('returns 400 when no file is attached', async () => {
    const db = makeD1([...sessionScripts(), { sql: DOC_CHECK, binds: ['kd-1'], first: { id: 'kd-1' } }]);
    const fd = new FormData();
    fd.append('change_note', 'no file here');
    const res = await addVersion(
      ctx(authed('https://x/api/admin/knowledge/kd-1/versions', { method: 'POST', body: fd }), { id: 'kd-1' }, db),
    );
    expect(res.status).toBe(400);
  });
});

describe('GET /api/admin/knowledge/:id/file', () => {
  const VERSION_SQL =
    'SELECT v.r2_key, v.file_name, v.mime FROM knowledge_versions v WHERE v.document_id = ? AND v.version = ?';

  it('streams the requested version inline', async () => {
    const db = makeD1([
      ...sessionScripts(),
      {
        sql: VERSION_SQL,
        binds: ['kd-1', 2],
        first: { r2_key: 'knowledge/kd-1/v2.pdf', file_name: 'manual-v2.pdf', mime: 'application/pdf' },
      },
    ]);
    const res = await getFile(
      ctx(authed('https://x/api/admin/knowledge/kd-1/file?version=2'), { id: 'kd-1' }, db, { UPLOADS: makeR2() }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get('content-disposition')).toBe('inline; filename="manual-v2.pdf"');
    expect(res.headers.get('cache-control')).toBe('private, no-store');
    expect(await res.text()).toBe('FILE-BYTES');
  });

  it('returns 404 for an unknown version', async () => {
    const db = makeD1([...sessionScripts(), { sql: VERSION_SQL, binds: ['kd-1', 9], first: null }]);
    const res = await getFile(ctx(authed('https://x/api/admin/knowledge/kd-1/file?version=9'), { id: 'kd-1' }, db));
    expect(res.status).toBe(404);
  });

  it('returns 400 when version is missing or invalid', async () => {
    const db = makeD1(sessionScripts());
    const res = await getFile(ctx(authed('https://x/api/admin/knowledge/kd-1/file'), { id: 'kd-1' }, db));
    expect(res.status).toBe(400);
  });
});
