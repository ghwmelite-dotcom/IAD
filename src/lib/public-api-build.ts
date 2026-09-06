// Build-time (server-side) fetchers for the public API. Used by static
// prerendering (generateStaticParams, server page components, sitemap).
// Every function fails soft: on any error it logs a warning and returns
// null so `next build` NEVER breaks because the API is unreachable.

import type {
  MdaTransparency,
  RegistryEntry,
  RegistryProfile,
  TransparencySummary,
} from '@/lib/public-api';
import type {
  KnowledgeItem,
  KnowledgeListMeta,
  KnowledgeListResult,
} from '@/lib/knowledge-api';

const BUILD_API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://iad.ohcsghana.org';

async function get<T>(path: string, label: string): Promise<T | null> {
  try {
    const res = await fetch(`${BUILD_API_BASE}${path}`, {
      // NOTE: no `cache: 'no-store'` here — an uncached fetch makes the route
      // dynamic, which output:'export' rejects at prerender time. The default
      // (cacheable) fetch is exactly right for a build-time snapshot.
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.warn(`[build] ${label}: HTTP ${res.status} — falling back to client rendering`);
      return null;
    }
    const body = (await res.json()) as { data?: T };
    if (body == null || body.data === undefined) {
      console.warn(`[build] ${label}: malformed envelope — falling back to client rendering`);
      return null;
    }
    return body.data;
  } catch (err) {
    console.warn(
      `[build] ${label}: fetch failed (${err instanceof Error ? err.message : String(err)}) — falling back to client rendering`,
    );
    return null;
  }
}

/** All verified registry entries visible at build time (API caps at 50). */
export function fetchRegistryAtBuild(): Promise<RegistryEntry[] | null> {
  return get<RegistryEntry[]>('/api/public/registry', 'registry list');
}

export function fetchRegistryProfileAtBuild(
  slug: string,
): Promise<RegistryProfile | null> {
  return get<RegistryProfile>(
    `/api/public/registry/${encodeURIComponent(slug)}`,
    `registry profile "${slug}"`,
  );
}

export interface TransparencyBuildData {
  summary: TransparencySummary;
  mdas: MdaTransparency[];
}

export async function fetchTransparencyAtBuild(): Promise<TransparencyBuildData | null> {
  const [summary, mdas] = await Promise.all([
    get<TransparencySummary>('/api/public/transparency/summary', 'transparency summary'),
    get<MdaTransparency[]>('/api/public/transparency/by-mda', 'transparency by-MDA'),
  ]);
  if (!summary || !mdas) return null;
  return { summary, mdas };
}

/** First page of public Knowledge Hub documents visible at build time. */
export async function fetchKnowledgeAtBuild(): Promise<KnowledgeListResult | null> {
  try {
    const res = await fetch(
      `${BUILD_API_BASE}/api/public/knowledge?page=1&pageSize=12`,
      { signal: AbortSignal.timeout(10_000) },
    );
    if (!res.ok) {
      console.warn(`[build] knowledge list: HTTP ${res.status} — falling back to client rendering`);
      return null;
    }
    const body = (await res.json()) as {
      data?: KnowledgeItem[];
      meta?: KnowledgeListMeta;
    };
    if (!body.data || !body.meta) {
      console.warn('[build] knowledge list: malformed envelope — falling back to client rendering');
      return null;
    }
    return { items: body.data, meta: body.meta };
  } catch (err) {
    console.warn(
      `[build] knowledge list: fetch failed (${err instanceof Error ? err.message : String(err)}) — falling back to client rendering`,
    );
    return null;
  }
}
