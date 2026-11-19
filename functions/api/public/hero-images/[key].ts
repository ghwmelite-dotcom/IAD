import type { PagesFunction } from '../../../_shared/types';
import { heroAdmin, heroError, readHeroRow, parseHeroJson } from '../../../_shared/hero';
import { HERO_IMAGE_KEY } from '../../../../src/lib/hero-slides';
export const onRequestGet: PagesFunction = async ({ request, env, params }) => {
  const key = params.key ?? '';
  if (!HERO_IMAGE_KEY.test(key)) return heroError('Image not found.', 404);
  const path = `/api/public/hero-images/${key}`;
  const row = await readHeroRow(env);
  const published =
    row && parseHeroJson(row.published_json).some((s) => s.enabled && s.image === path);
  if (!published) {
    const auth = await heroAdmin(request, env);
    if (!auth.ok) return heroError('Image not found.', 404);
  }
  const object = await env.UPLOADS.get(`hero/${key}`);
  if (!object) return heroError('Image not found.', 404);
  const headers = new Headers({
    'Content-Type': key.endsWith('.jpg')
      ? 'image/jpeg'
      : key.endsWith('.png')
        ? 'image/png'
        : 'image/webp',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': published ? 'public, max-age=31536000, immutable' : 'private, no-store',
  });
  if (object.httpEtag) headers.set('ETag', object.httpEtag);
  return new Response(object.body, { headers });
};
