// Pagination math for the public registry directory.
// Page 1 lives at /registry, pages 2..N at /registry/page/[n].

export const REGISTRY_PAGE_SIZE = 24;

/** Number of pages needed for `total` entries (minimum 1). */
export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / REGISTRY_PAGE_SIZE));
}

/** 1-based slice of `entries` for `page`. Out-of-range pages return []. */
export function pageSlice<T>(entries: T[], page: number): T[] {
  if (page < 1) return [];
  const start = (page - 1) * REGISTRY_PAGE_SIZE;
  return entries.slice(start, start + REGISTRY_PAGE_SIZE);
}

/** True when `page` is a valid 1-based page for `total` entries. */
export function isValidPage(page: number, total: number): boolean {
  return Number.isInteger(page) && page >= 1 && page <= pageCount(total);
}

/** Canonical href for a directory page: page 1 → /registry/, n → /registry/page/n/. */
export function registryPageHref(page: number): string {
  return page <= 1 ? '/registry/' : `/registry/page/${page}/`;
}

/** Static profile href when prerendered, runtime fallback otherwise. */
export function registryProfileHref(slug: string, prerendered: boolean): string {
  return prerendered
    ? `/registry/${slug}/`
    : `/registry/profile?s=${encodeURIComponent(slug)}`;
}
