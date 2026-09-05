import { describe, it, expect } from 'vitest';
import { buildSitemapEntries, SITE_ORIGIN } from '@/lib/seo';
import { AUDIT_UNITS } from '@/lib/constants';
import { SAMPLE_NEWS, SAMPLE_EVENTS } from '@/lib/sample-content';

const entries = buildSitemapEntries({
  registrySlugs: ['yaw-osei-frimpong', 'akosua-mensima-asante'],
  registryPageCount: 3,
  now: new Date('2026-05-01T00:00:00Z'),
});
const urls = entries.map((e) => e.url);

describe('buildSitemapEntries', () => {
  it('includes the core public routes', () => {
    for (const path of ['/', '/transparency', '/registry', '/verify', '/about', '/services', '/news', '/events', '/contact', '/track']) {
      expect(urls).toContain(`${SITE_ORIGIN}${path}`);
    }
  });

  it('includes every audit unit detail page', () => {
    for (const unit of AUDIT_UNITS) {
      expect(urls).toContain(`${SITE_ORIGIN}/audit-units/${unit.slug}`);
    }
  });

  it('includes every news and events detail page', () => {
    for (const article of SAMPLE_NEWS) {
      expect(urls).toContain(`${SITE_ORIGIN}/news/${article.slug}`);
    }
    for (const event of SAMPLE_EVENTS) {
      expect(urls).toContain(`${SITE_ORIGIN}/events/${event.slug}`);
    }
  });

  it('includes registry profile pages for each officer slug', () => {
    expect(urls).toContain(`${SITE_ORIGIN}/registry/yaw-osei-frimpong`);
    expect(urls).toContain(`${SITE_ORIGIN}/registry/akosua-mensima-asante`);
  });

  it('includes paginated registry pages 2..N but not page 1', () => {
    expect(urls).toContain(`${SITE_ORIGIN}/registry/page/2`);
    expect(urls).toContain(`${SITE_ORIGIN}/registry/page/3`);
    expect(urls).not.toContain(`${SITE_ORIGIN}/registry/page/1`);
  });

  it('produces absolute URLs with no duplicates', () => {
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(url.startsWith('https://')).toBe(true);
    }
  });

  it('uses article publishedAt as lastModified for news entries', () => {
    const news = entries.find((e) => e.url.endsWith('/news/risk-based-audit-planning-workshop'));
    expect(news?.lastModified).toEqual(new Date('2026-04-15T10:00:00Z'));
  });
});
