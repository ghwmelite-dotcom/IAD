import type { PagesFunction } from '../../_shared/types';
import { json } from '../../_shared/json';
import { readHeroRow, parseHeroJson } from '../../_shared/hero';
import { defaultHeroSlides } from '../../../src/lib/hero-slides';
export const onRequestGet: PagesFunction = async ({ env }) => {
  const row = await readHeroRow(env);
  const slides = row ? parseHeroJson(row.published_json) : defaultHeroSlides();
  return json({ data: slides.filter((s) => s.enabled), revision: row?.published_revision ?? 0 });
};
