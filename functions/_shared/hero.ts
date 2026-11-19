import { parseAdminSessionId } from './admin-cookies';
import { readAdminSession } from './admin-session';
import { first } from './db';
import { json } from './json';
import type { Env } from './types';
import {
  defaultHeroSlides,
  HERO_EDITOR_ROLES,
  heroManifestSchema,
  type HeroEditorState,
  type HeroSlide,
} from '../../src/lib/hero-slides';

export interface HeroRow {
  draft_json: string;
  published_json: string;
  revision: number;
  published_revision: number;
  updated_at: string;
  published_at: string | null;
}
export function heroError(message: string, status = 400) {
  return json({ error: { message } }, { status });
}
export async function heroAdmin(request: Request, env: Env) {
  const id = parseAdminSessionId(request);
  const user = id ? await readAdminSession(env, id) : null;
  if (!user)
    return {
      ok: false as const,
      response: heroError(
        'A real admin sign-in is required. Demo accounts cannot publish hero slides.',
        401,
      ),
    };
  if (!(HERO_EDITOR_ROLES as readonly string[]).includes(user.role))
    return {
      ok: false as const,
      response: heroError('You do not have permission to manage hero slides.', 403),
    };
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const origin = request.headers.get('Origin');
    if (
      request.headers.get('X-IAD-Admin') !== '1' ||
      (origin && origin !== new URL(request.url).origin) ||
      request.headers.get('Sec-Fetch-Site') === 'cross-site'
    )
      return {
        ok: false as const,
        response: heroError('Use the same-origin admin editor to make changes.', 403),
      };
  }
  return { ok: true as const, user };
}
export async function readHeroRow(env: Env) {
  return first<HeroRow>(
    env,
    'SELECT draft_json, published_json, revision, published_revision, updated_at, published_at FROM hero_content WHERE id = 1',
  );
}
export function parseHeroJson(raw: string): HeroSlide[] {
  return heroManifestSchema.parse(JSON.parse(raw));
}
export async function heroState(env: Env): Promise<HeroEditorState> {
  const row = await readHeroRow(env);
  return row
    ? {
        draft: parseHeroJson(row.draft_json),
        published: parseHeroJson(row.published_json),
        revision: row.revision,
        publishedRevision: row.published_revision,
        updatedAt: row.updated_at,
        publishedAt: row.published_at,
      }
    : {
        draft: defaultHeroSlides(),
        published: defaultHeroSlides(),
        revision: 0,
        publishedRevision: 0,
        updatedAt: null,
        publishedAt: null,
      };
}
