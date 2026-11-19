import { z } from 'zod';
import type { PagesFunction } from '../../../_shared/types';
import { heroAdmin, heroError, heroState } from '../../../_shared/hero';
import { json } from '../../../_shared/json';
import { defaultHeroSlides, heroManifestSchema } from '../../../../src/lib/hero-slides';

export const onRequestGet: PagesFunction = async ({ request, env }) => {
  const auth = await heroAdmin(request, env);
  if (!auth.ok) return auth.response;
  return json({ data: await heroState(env) });
};
const bodySchema = z
  .object({
    action: z.enum(['save', 'publish']),
    revision: z.number().int().min(0),
    slides: heroManifestSchema,
  })
  .strict();
export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const auth = await heroAdmin(request, env);
  if (!auth.ok) return auth.response;
  if (Number(request.headers.get('content-length') ?? 0) > 128 * 1024)
    return heroError('Content is too large.', 413);
  let input: unknown;
  try {
    const text = await request.text();
    if (text.length > 128 * 1024) return heroError('Content is too large.', 413);
    input = JSON.parse(text);
  } catch {
    return heroError('Valid JSON is required.');
  }
  const parsed = bodySchema.safeParse(input);
  if (!parsed.success) return heroError(parsed.error.issues[0]?.message ?? 'Invalid slides.');
  const { action, revision, slides } = parsed.data;
  if (action === 'publish' && !slides.some((s) => s.enabled))
    return heroError('Keep at least one slide enabled before publishing.');
  // Uploaded image references must belong to this application, not arbitrary R2 objects.
  for (const slide of slides) {
    if (slide.image.startsWith('/api/public/hero-images/')) {
      const key = 'hero/' + slide.image.split('/').pop();
      const file = await env.DB.prepare('SELECT id FROM hero_uploads WHERE r2_key = ?')
        .bind(key)
        .first();
      if (!file) return heroError('An uploaded image no longer exists. Choose another image.');
    }
  }
  const now = new Date().toISOString();
  const defaults = JSON.stringify(defaultHeroSlides());
  await env.DB.prepare(
    'INSERT OR IGNORE INTO hero_content (id, draft_json, published_json, revision, published_revision, updated_at) VALUES (1, ?, ?, 0, 0, ?)',
  )
    .bind(defaults, defaults, now)
    .run();
  const token = crypto.randomUUID();
  const encoded = JSON.stringify(slides);
  const statement =
    action === 'publish'
      ? env.DB.prepare(
          'UPDATE hero_content SET draft_json = ?, published_json = ?, revision = revision + 1, published_revision = revision + 1, updated_at = ?, published_at = ?, last_change = ? WHERE id = 1 AND revision = ?',
        ).bind(encoded, encoded, now, now, token, revision)
      : env.DB.prepare(
          'UPDATE hero_content SET draft_json = ?, revision = revision + 1, updated_at = ?, last_change = ? WHERE id = 1 AND revision = ?',
        ).bind(encoded, now, token, revision);
  const audit = env.DB.prepare(
    "INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) SELECT ?, ?, ?, 'hero', 'homepage', ?, ? WHERE EXISTS (SELECT 1 FROM hero_content WHERE id = 1 AND last_change = ?)",
  ).bind(
    crypto.randomUUID(),
    auth.user.email,
    action,
    JSON.stringify({ revision: revision + 1, count: slides.length }),
    now,
    token,
  );
  const result = await env.DB.batch([statement, audit]);
  if (!result[0]?.meta.changes)
    return heroError(
      'Another editor saved changes. Reload the latest version before saving again.',
      409,
    );
  return json({ data: await heroState(env) });
};
