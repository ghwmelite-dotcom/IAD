// Site-wide SEO constants and the sitemap URL assembly (pure, unit-tested).
// src/app/sitemap.ts feeds build-time data into buildSitemapEntries.

import type { MetadataRoute } from 'next';
import { AUDIT_UNITS } from '@/lib/constants';
import { SAMPLE_NEWS, SAMPLE_EVENTS } from '@/lib/sample-content';

/** Canonical production origin (independent of SITE_URL's metadataBase). */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://iad.ohcsghana.org';

export const DEFAULT_OG_IMAGE = '/images/coat-of-arms.png';

export interface SitemapInput {
  registrySlugs: string[];
  registryPageCount: number;
  /** e.g. '2026-04-15T10:00:00Z' — used as lastModified where known. */
  now?: Date;
}

function entry(
  path: string,
  lastModified: Date | undefined,
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_ORIGIN}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export function buildSitemapEntries(input: SitemapInput): MetadataRoute.Sitemap {
  const now = input.now;
  const entries: MetadataRoute.Sitemap = [];

  // Core pages
  entries.push(entry('/', now, 'weekly', 1));
  entries.push(entry('/transparency', now, 'daily', 0.9));
  entries.push(entry('/registry', now, 'daily', 0.9));
  entries.push(entry('/verify', now, 'monthly', 0.8));

  for (const path of [
    '/about',
    '/about/vision',
    '/about/functions',
    '/about/leadership',
    '/about/structure',
    '/audit-units',
    '/services',
    '/services/special-audit',
    '/services/consultancy',
    '/services/report-fraud',
    '/services/rti',
    '/services/feedback',
    '/publications',
    '/news',
    '/events',
    '/contact',
    '/track',
  ]) {
    entries.push(entry(path, now, 'monthly', 0.7));
  }

  // Audit unit detail pages
  for (const unit of AUDIT_UNITS) {
    entries.push(entry(`/audit-units/${unit.slug}`, now, 'monthly', 0.6));
  }

  // News & events detail pages
  for (const article of SAMPLE_NEWS) {
    entries.push(
      entry(
        `/news/${article.slug}`,
        article.publishedAt ? new Date(article.publishedAt) : now,
        'yearly',
        0.6,
      ),
    );
  }
  for (const event of SAMPLE_EVENTS) {
    entries.push(
      entry(
        `/events/${event.slug}`,
        event.startDate ? new Date(event.startDate) : now,
        'monthly',
        0.5,
      ),
    );
  }

  // Registry: paginated directory + one profile per verified officer
  for (let page = 2; page <= input.registryPageCount; page++) {
    entries.push(entry(`/registry/page/${page}`, now, 'daily', 0.7));
  }
  for (const slug of input.registrySlugs) {
    entries.push(entry(`/registry/${slug}`, now, 'weekly', 0.8));
  }

  return entries;
}
