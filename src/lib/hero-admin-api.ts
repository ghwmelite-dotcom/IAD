import type { HeroEditorState, HeroSlide } from './hero-slides';
export async function heroRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'include',
    cache: 'no-store',
    headers: { 'X-IAD-Admin': '1', ...init.headers },
  });
  const body = (await response.json()) as { data: T; error?: { message?: string } };
  if (!response.ok) throw new Error(body.error?.message ?? 'The request failed. Please try again.');
  return body.data;
}
export const loadHeroEditor = () => heroRequest<HeroEditorState>('/api/admin/hero');
export const saveHeroEditor = (slides: HeroSlide[], revision: number, action: 'save' | 'publish') =>
  heroRequest<HeroEditorState>('/api/admin/hero', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slides, revision, action }),
  });
export async function uploadHeroImage(file: File): Promise<string> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
    throw new Error('Choose a JPEG, PNG or WebP image.');
  if (file.size > 20 * 1024 * 1024) throw new Error('Choose an image smaller than 20 MB.');
  const bitmap = await createImageBitmap(file);
  let blob: Blob | null;
  try {
    if (bitmap.width > 16000 || bitmap.height > 16000 || bitmap.width * bitmap.height > 80000000)
      throw new Error('This image is too large. Resize it before uploading.');
    const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not prepare the image.');
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.86));
  } finally {
    bitmap.close();
  }
  if (!blob || blob.size > 6 * 1024 * 1024)
    throw new Error('Unable to prepare an image smaller than 6 MB. Try a smaller file.');
  const form = new FormData();
  form.append('file', blob, 'hero.webp');
  const result = await heroRequest<{ image: string }>('/api/admin/hero/images', {
    method: 'POST',
    body: form,
  });
  return result.image;
}
