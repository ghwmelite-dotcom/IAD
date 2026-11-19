// @vitest-environment node
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { onRequestGet as publicHero } from '../../../functions/api/public/hero';
import {
  onRequestGet as adminHero,
  onRequestPost as saveHero,
} from '../../../functions/api/admin/hero/index';
import { onRequestPost as uploadImage } from '../../../functions/api/admin/hero/images';
import { onRequestGet as serveImage } from '../../../functions/api/public/hero-images/[key]';
import {
  defaultHeroSlides,
  heroManifestSchema,
  safeHeroLink,
  type HeroSlide,
} from '../../../src/lib/hero-slides';
import { mockEnv } from '../_helpers/mock-env';
import type { PagesFunction } from '../../../functions/_shared/types';

let authRole: string | null = 'super_admin';
vi.mock('../../../functions/_shared/admin-session', () => ({
  readAdminSession: vi.fn(async () =>
    authRole ? { email: 'editor@example.com', role: authRole } : null,
  ),
}));
interface SqlDb {
  exec(sql: string): void;
  close(): void;
  prepare(sql: string): {
    all(...args: unknown[]): Record<string, unknown>[];
    get(...args: unknown[]): Record<string, unknown> | undefined;
    run(...args: unknown[]): { changes: number };
  };
}
// The deployment workspace runs Node 24. Keep this test-only adapter independent
// of @types/node 20, which does not yet declare the built-in SQLite module.
const sqliteModule = 'node:sqlite';
const { DatabaseSync } = (await import(sqliteModule)) as {
  DatabaseSync: new (path: string) => SqlDb;
};
let sql: SqlDb;
let db: D1Database;
let objects: Map<string, Uint8Array>;
let bucket: R2Bucket;
function makeDb(): D1Database {
  return {
    prepare(query: string) {
      let args: unknown[] = [];
      const statement = {
        bind(...values: unknown[]) {
          args = values;
          return statement;
        },
        async first() {
          return sql.prepare(query).get(...args) ?? null;
        },
        async all() {
          return { results: sql.prepare(query).all(...args) };
        },
        async run() {
          return { meta: { changes: Number(sql.prepare(query).run(...args).changes) } };
        },
      };
      return statement;
    },
    async batch(statements: { run(): Promise<unknown> }[]) {
      sql.exec('BEGIN');
      try {
        const results = [];
        for (const s of statements) results.push(await s.run());
        sql.exec('COMMIT');
        return results;
      } catch (e) {
        sql.exec('ROLLBACK');
        throw e;
      }
    },
  } as unknown as D1Database;
}
function context(
  request: Request,
  params: Record<string, string> = {},
): Parameters<PagesFunction>[0] {
  return {
    request,
    params,
    env: { ...mockEnv({ db }), UPLOADS: bucket },
    waitUntil: () => {},
    data: {},
  };
}
function request(path: string, init: RequestInit = {}) {
  return new Request(`https://iad.example${path}`, {
    ...init,
    headers: { Cookie: 'admin_session=real-session', 'X-IAD-Admin': '1', ...init.headers },
  });
}
async function save(slides: HeroSlide[], revision = 0, action = 'save') {
  return saveHero(
    context(
      request('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides, revision, action }),
      }),
    ),
  );
}
async function dataOf(response: Response) {
  return (await response.json()) as { data: HeroSlide[] };
}
async function upload(bytes: Uint8Array, type = 'image/jpeg') {
  const form = new FormData();
  form.append('file', new Blob([bytes as BlobPart], { type }), 'image.jpg');
  return uploadImage(context(request('/api/admin/hero/images', { method: 'POST', body: form })));
}
beforeEach(() => {
  authRole = 'super_admin';
  sql = new DatabaseSync(':memory:');
  sql.exec(readFileSync('migrations/0016_hero_content.sql', 'utf8'));
  sql.exec(
    'CREATE TABLE audit_log (id TEXT PRIMARY KEY, user_id TEXT, action TEXT, entity TEXT, entity_id TEXT, meta_json TEXT, created_at TEXT)',
  );
  db = makeDb();
  objects = new Map();
  bucket = {
    put: vi.fn(async (key: string, bytes: Uint8Array) => {
      objects.set(key, bytes);
      return {};
    }),
    get: vi.fn(async (key: string) => {
      const b = objects.get(key);
      return b ? { body: b, httpEtag: 'test-etag' } : null;
    }),
    delete: vi.fn(async (key: string) => {
      objects.delete(key);
    }),
  } as unknown as R2Bucket;
});
afterEach(() => sql.close());

describe('Hero publishing with real SQLite', () => {
  it('preserves all four current slides before the first edit', async () => {
    const body = await dataOf(await publicHero(context(request('/api/public/hero'))));
    expect(body.data).toEqual(defaultHeroSlides());
  });
  it.each(['super_admin', 'content_manager', 'admin', 'director'])(
    'permits a real %s session',
    async (role) => {
      authRole = role;
      expect((await adminHero(context(request('/api/admin/hero')))).status).toBe(200);
    },
  );
  it.each(['viewer', 'auditor', 'manager', 'mda_liaison'])('rejects the %s role', async (role) => {
    authRole = role;
    expect((await adminHero(context(request('/api/admin/hero')))).status).toBe(403);
  });
  it('rejects demo headers without a real session', async () => {
    authRole = null;
    const r = new Request('https://iad.example/api/admin/hero', {
      headers: { 'X-Admin-User-Email': 'fake@example.com', 'X-Admin-User-Role': 'super_admin' },
    });
    expect((await adminHero(context(r))).status).toBe(401);
  });
  it('rejects cross-site mutations and missing custom headers', async () => {
    expect(
      (
        await saveHero(
          context(
            request('/api/admin/hero', {
              method: 'POST',
              headers: { Origin: 'https://evil.example' },
              body: '{}',
            }),
          ),
        )
      ).status,
    ).toBe(403);
    expect(
      (
        await saveHero(
          context(
            new Request('https://iad.example/api/admin/hero', {
              method: 'POST',
              headers: { Cookie: 'admin_session=real-session' },
              body: '{}',
            }),
          ),
        )
      ).status,
    ).toBe(403);
  });
  it('isolates saved drafts, then atomically publishes them with an audit trail', async () => {
    const slides = defaultHeroSlides();
    slides[0]!.copy.en.title = 'Prepared privately';
    expect((await save(slides)).status).toBe(200);
    expect(
      (await dataOf(await publicHero(context(request('/api/public/hero'))))).data[0]!.copy.en.title,
    ).not.toBe('Prepared privately');
    expect((await save(slides, 1, 'publish')).status).toBe(200);
    expect(
      (await dataOf(await publicHero(context(request('/api/public/hero'))))).data[0]!.copy.en.title,
    ).toBe('Prepared privately');
    expect(sql.prepare('SELECT COUNT(*) AS total FROM audit_log').get()!.total).toBe(2);
  });
  it('rejects a stale revision without overwriting content or logging a false success', async () => {
    const first = defaultHeroSlides();
    first[0]!.copy.en.title = 'Editor one';
    await save(first);
    const second = defaultHeroSlides();
    second[0]!.copy.en.title = 'Editor two';
    expect((await save(second, 0, 'publish')).status).toBe(409);
    expect(
      JSON.parse(sql.prepare('SELECT draft_json FROM hero_content').get()!.draft_json as string)[0]
        .copy.en.title,
    ).toBe('Editor one');
    expect(sql.prepare('SELECT COUNT(*) AS total FROM audit_log').get()!.total).toBe(1);
  });
  it('rolls back the content update when its audit insert fails', async () => {
    await save(defaultHeroSlides());
    sql.exec(
      "CREATE TRIGGER fail_audit BEFORE INSERT ON audit_log BEGIN SELECT RAISE(ABORT, 'audit unavailable'); END;",
    );
    await expect(save(defaultHeroSlides(), 1, 'publish')).rejects.toThrow('audit unavailable');
    expect(
      sql.prepare('SELECT revision, published_revision FROM hero_content').get(),
    ).toMatchObject({ revision: 1, published_revision: 0 });
  });
  it('publishes ordering and filters disabled slides', async () => {
    const slides = defaultHeroSlides().reverse();
    slides[1]!.enabled = false;
    await save(slides, 0, 'publish');
    expect(
      (await dataOf(await publicHero(context(request('/api/public/hero'))))).data.map((s) => s.id),
    ).toEqual(slides.filter((s) => s.enabled).map((s) => s.id));
  });
  it('refuses an empty public carousel', async () => {
    const slides = defaultHeroSlides().map((s) => ({ ...s, enabled: false }));
    expect((await save(slides, 0, 'publish')).status).toBe(400);
    expect(
      (await dataOf(await publicHero(context(request('/api/public/hero'))))).data,
    ).toHaveLength(4);
  });
  it('rejects unregistered upload references', async () => {
    const slides = defaultHeroSlides();
    slides[0]!.image = '/api/public/hero-images/12345678-1234-4123-8123-123456789abc.jpg';
    expect((await save(slides)).status).toBe(400);
  });
  it('serves manifests with no-store caching', async () => {
    expect(
      (await publicHero(context(request('/api/public/hero')))).headers.get('Cache-Control'),
    ).toBe('no-store');
  });
});

describe('Hero image uploads', () => {
  it('rejects HTML disguised as JPEG', async () => {
    expect((await upload(new TextEncoder().encode('<script>alert(1)</script>'))).status).toBe(400);
    expect(objects.size).toBe(0);
  });
  it('rejects SVG and oversized uploads', async () => {
    expect((await upload(new TextEncoder().encode('<svg/>'), 'image/svg+xml')).status).toBe(400);
    expect((await upload(new Uint8Array(6 * 1024 * 1024 + 1))).status).toBe(413);
  });
  it('keeps uploads private until referenced in a published slide', async () => {
    const bytes = new Uint8Array(readFileSync('public/images/hero/civil-service-office.jpg'));
    const response = await upload(bytes);
    expect(response.status).toBe(201);
    const body = (await response.json()) as { data: { image: string } };
    const key = body.data.image.split('/').pop()!;
    const anonymous = new Request(`https://iad.example${body.data.image}`);
    expect((await serveImage(context(anonymous, { key }))).status).toBe(404);
    const preview = await serveImage(context(request(body.data.image), { key }));
    expect(preview.status).toBe(200);
    expect(preview.headers.get('Cache-Control')).toBe('private, no-store');
    const slides = defaultHeroSlides();
    slides[0]!.image = body.data.image;
    await save(slides, 0, 'publish');
    const live = await serveImage(context(anonymous, { key }));
    expect(live.status).toBe(200);
    expect(live.headers.get('Content-Type')).toBe('image/jpeg');
    expect(live.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(new Uint8Array(await live.arrayBuffer())).toEqual(bytes);
  });
  it('rejects traversal keys', async () => {
    expect(
      (await serveImage(context(request('/api/public/hero-images/test'), { key: '../../private' })))
        .status,
    ).toBe(404);
  });
});

describe('Hero manifest validation', () => {
  it.each([
    'javascript:alert(1)',
    'https://user:password@example.com',
    '//evil.example',
    '/\\\\evil.example',
    'data:text/html,bad',
  ])('rejects unsafe CTA %s', (value) => {
    expect(safeHeroLink(value)).toBe(false);
  });
  it('rejects duplicate ids, empty collections, unsafe images and out-of-range framing', () => {
    const slides = defaultHeroSlides();
    expect(heroManifestSchema.safeParse([]).success).toBe(false);
    expect(heroManifestSchema.safeParse([slides[0], slides[0]]).success).toBe(false);
    slides[0]!.desktopX = 101;
    expect(heroManifestSchema.safeParse(slides).success).toBe(false);
    slides[0]!.desktopX = 50;
    slides[0]!.image = 'https://evil.example/file.svg';
    expect(heroManifestSchema.safeParse(slides).success).toBe(false);
  });
});
