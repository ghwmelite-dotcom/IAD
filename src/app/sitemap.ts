import type { MetadataRoute } from 'next';
import { fetchRegistryAtBuild } from '@/lib/public-api-build';
import { pageCount } from '@/lib/registry-pagination';
import { buildSitemapEntries } from '@/lib/seo';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await fetchRegistryAtBuild();
  return buildSitemapEntries({
    registrySlugs: (entries ?? []).map((e) => e.public_slug),
    registryPageCount: pageCount(entries?.length ?? 0),
    now: new Date(),
  });
}
