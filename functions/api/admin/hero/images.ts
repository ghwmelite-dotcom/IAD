import type { PagesFunction } from '../../../_shared/types';
import { heroAdmin, heroError } from '../../../_shared/hero';
import { json } from '../../../_shared/json';
import { HERO_MAX_BYTES } from '../../../../src/lib/hero-slides';
import { sniffMime } from '../../../_shared/file-validate';

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const auth = await heroAdmin(request, env);
  if (!auth.ok) return auth.response;
  if (Number(request.headers.get('content-length') ?? 0) > HERO_MAX_BYTES + 65536)
    return heroError('Images must be 6 MB or smaller.', 413);
  const recent = await env.DB.prepare(
    'SELECT COUNT(*) AS total FROM hero_uploads WHERE uploaded_by = ? AND created_at > ?',
  )
    .bind(auth.user.email, new Date(Date.now() - 3600000).toISOString())
    .first<{ total: number }>();
  if ((recent?.total ?? 0) >= 40)
    return heroError('Upload limit reached. Please try again in an hour.', 429);
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return heroError('Upload an image using multipart form data.');
  }
  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) return heroError('Choose a non-empty image.');
  if (file.size > HERO_MAX_BYTES) return heroError('Images must be 6 MB or smaller.', 413);
  const bytes = new Uint8Array(await file.arrayBuffer());
  const webp =
    bytes.length >= 12 &&
    new TextDecoder().decode(bytes.slice(0, 4)) === 'RIFF' &&
    new TextDecoder().decode(bytes.slice(8, 12)) === 'WEBP';
  const mime = webp ? 'image/webp' : sniffMime(bytes.slice(0, 16));
  if (!mime || !['image/jpeg', 'image/png', 'image/webp'].includes(mime) || file.type !== mime)
    return heroError('Only genuine JPEG, PNG or WebP images are accepted.');
  const id = crypto.randomUUID();
  const ext = mime === 'image/jpeg' ? 'jpg' : mime === 'image/png' ? 'png' : 'webp';
  const key = `hero/${id}.${ext}`;
  await env.UPLOADS.put(key, bytes, {
    httpMetadata: { contentType: mime, cacheControl: 'public, max-age=31536000, immutable' },
  });
  try {
    await env.DB.batch([
      env.DB.prepare(
        'INSERT INTO hero_uploads (id, r2_key, uploaded_by, created_at) VALUES (?, ?, ?, ?)',
      ).bind(id, key, auth.user.email, new Date().toISOString()),
      env.DB.prepare(
        "INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) VALUES (?, ?, 'upload', 'hero', ?, ?, ?)",
      ).bind(
        crypto.randomUUID(),
        auth.user.email,
        id,
        JSON.stringify({ mime, bytes: file.size }),
        new Date().toISOString(),
      ),
    ]);
  } catch (error) {
    await env.UPLOADS.delete(key);
    throw error;
  }
  return json(
    { data: { image: `/api/public/hero-images/${id}.${ext}`, bytes: file.size } },
    { status: 201 },
  );
};
