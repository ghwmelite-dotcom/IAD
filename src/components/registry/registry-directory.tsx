'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, Users, SearchX, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import { searchRegistry } from '@/lib/public-api';
import type { RegistryEntry } from '@/lib/public-api';
import {
  REGISTRY_PAGE_SIZE,
  isValidPage,
  pageCount,
  pageSlice,
  registryPageHref,
  registryProfileHref,
} from '@/lib/registry-pagination';
import { RegistryCard } from '@/components/registry/registry-card';
import { PublishingSoon } from '@/components/transparency/publishing-soon';

type Status = 'loading' | 'ready' | 'unavailable';

interface RegistryDirectoryProps {
  /** Full directory as prerendered at build time; null when the build fetch failed. */
  initialEntries: RegistryEntry[] | null;
  /** 1-based page this route renders. */
  page: number;
  /** How many pages exist as static routes (from build-time data). */
  staticPageCount: number;
  /** Slugs that have a prerendered /registry/[slug] profile page. */
  staticSlugs: string[];
}

export function RegistryDirectory({
  initialEntries,
  page,
  staticPageCount,
  staticSlugs,
}: RegistryDirectoryProps) {
  const [query, setQuery] = useState('');
  // Live directory — starts from the build-time snapshot, refreshed on mount.
  const [entries, setEntries] = useState<RegistryEntry[]>(initialEntries ?? []);
  const [status, setStatus] = useState<Status>(initialEntries ? 'ready' : 'loading');
  // Extra pages revealed client-side when the live directory outgrows the
  // statically generated page set ("load more" overflow).
  const [revealedPages, setRevealedPages] = useState(0);
  const requestId = useRef(0);
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  const staticSlugSet = useMemo(() => new Set(staticSlugs), [staticSlugs]);

  const load = useCallback(async (q: string) => {
    const id = ++requestId.current;
    try {
      const data = await searchRegistry(q);
      if (id !== requestId.current) return; // superseded by a newer search
      setEntries(data);
      setStatus('ready');
    } catch {
      if (id !== requestId.current) return;
      // Keep showing build-time data if we have it; only degrade to the
      // "publishing soon" state when there is nothing at all to show.
      setStatus((prev) => (prev === 'ready' ? prev : 'unavailable'));
    }
  }, []);

  // Initial live refresh + debounced search
  useEffect(() => {
    const timer = setTimeout(() => void load(query), query ? 300 : 0);
    return () => clearTimeout(timer);
  }, [query, load]);

  const searching = query.trim().length > 0;
  const total = entries.length;
  const livePageCount = pageCount(total);

  // In browse mode show the slice for this route's page; in search mode show
  // everything that matched (API caps results at 50).
  const visible = searching
    ? entries
    : isValidPage(page, total)
      ? pageSlice(entries, page)
      : entries;
  // Overflow entries revealed via "load more" beyond this page's slice.
  const overflow = useMemo(() => {
    if (searching || revealedPages === 0) return [];
    const start = page * REGISTRY_PAGE_SIZE;
    return entries.slice(start, start + revealedPages * REGISTRY_PAGE_SIZE);
  }, [searching, revealedPages, entries, page]);
  const hasOverflow =
    !searching && page * REGISTRY_PAGE_SIZE + revealedPages * REGISTRY_PAGE_SIZE < total;

  function hrefFor(entry: RegistryEntry) {
    return registryProfileHref(entry.public_slug, staticSlugSet.has(entry.public_slug));
  }

  return (
    <section
      className="py-16 lg:py-20 relative overflow-hidden"
      style={{ backgroundColor: '#F0F7F1' }}
    >
      <FloatingShapes />
      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search bar */}
        <div className="mb-10">
          <div className="relative max-w-xl mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted/40"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or MDA..."
              aria-label="Search the registry"
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border/60 bg-white text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-muted hover:text-primary-dark transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          {status === 'ready' && (
            <p className="text-sm text-text-muted text-center mt-3">
              {searching
                ? `${total} verified ${total === 1 ? 'officer' : 'officers'} matching “${query.trim()}”`
                : `${total} verified ${total === 1 ? 'officer' : 'officers'}`}
            </p>
          )}
        </div>

        {status === 'loading' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          </div>
        ) : status === 'unavailable' ? (
          <PublishingSoon onRetry={() => void load(query)} />
        ) : visible.length === 0 ? (
          <div className="text-center py-16">
            <SearchX className="h-12 w-12 text-text-muted/30 mx-auto mb-4" aria-hidden="true" />
            <h3 className="font-semibold text-lg text-text-muted mb-2">
              No verified officers found
            </h3>
            <p className="text-base text-text-muted/60 max-w-md mx-auto">
              {searching
                ? 'Try a different name or MDA. Only verified Internal Audit Class officers appear in the public registry.'
                : 'Verified officers will appear here once registry verification begins.'}
            </p>
          </div>
        ) : (
          <>
            <div
              ref={gridRef}
              className={cn(
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
                gridVisible && 'animate-[reveal_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]',
                !gridVisible && 'opacity-0',
              )}
            >
              {visible.map((entry) => (
                <RegistryCard
                  key={entry.public_slug}
                  entry={entry}
                  profileHref={hrefFor(entry)}
                />
              ))}
              {overflow.map((entry) => (
                <RegistryCard
                  key={`overflow-${entry.public_slug}`}
                  entry={entry}
                  profileHref={hrefFor(entry)}
                />
              ))}
            </div>

            {/* Overflow: live directory outgrew the static page set */}
            {hasOverflow && (
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  onClick={() => setRevealedPages((n) => n + 1)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border-2 border-primary/15 text-sm font-semibold text-primary hover:border-primary/40 hover:shadow-md transition-all duration-200"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Load more officers
                </button>
              </div>
            )}

            {/* Numbered pagination — real crawlable links for static pages */}
            {!searching && livePageCount > 1 && (
              <nav aria-label="Registry pages" className="flex items-center justify-center gap-2 mt-10">
                {page > 1 && (
                  <Link
                    href={registryPageHref(page - 1)}
                    rel="prev"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-all duration-200"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Previous
                  </Link>
                )}

                {Array.from({ length: livePageCount }, (_, i) => i + 1).map((p) =>
                  p <= staticPageCount ? (
                    <Link
                      key={p}
                      href={registryPageHref(p)}
                      aria-current={p === page ? 'page' : undefined}
                      className={cn(
                        'w-10 h-10 rounded-xl text-sm font-semibold flex items-center justify-center transition-all duration-200',
                        p === page
                          ? 'bg-primary text-white shadow-md'
                          : 'text-text-muted hover:bg-primary/5 border-2 border-border/40 hover:border-primary/20 bg-white',
                      )}
                    >
                      {p}
                    </Link>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setRevealedPages((n) => Math.max(n, p - page))}
                      className="w-10 h-10 rounded-xl text-sm font-semibold text-text-muted hover:bg-primary/5 border-2 border-dashed border-border/40 hover:border-primary/20 bg-white transition-all duration-200"
                      title="Reveal these officers on this page"
                    >
                      {p}
                    </button>
                  ),
                )}

                {page < livePageCount && (
                  page + 1 <= staticPageCount ? (
                    <Link
                      href={registryPageHref(page + 1)}
                      rel="next"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-all duration-200"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setRevealedPages((n) => n + 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30 transition-all duration-200"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )
                )}
              </nav>
            )}
          </>
        )}

        {/* Registry explainer */}
        <div className="mt-14 max-w-3xl mx-auto flex items-start gap-4 bg-white rounded-2xl border-2 border-border/40 p-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-sm shrink-0">
            <Users className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            The Internal Audit Class (IAC) Registry lists officers whose
            professional standing has been verified by the Internal Audit
            Department. If an officer does not appear here, they may still be
            undergoing verification — absence from the list is not evidence of
            misconduct. Use the{' '}
            <a href="/verify" className="font-semibold text-primary hover:underline">
              certificate checker
            </a>{' '}
            to confirm any IAD-issued certificate.
          </p>
        </div>
      </div>
    </section>
  );
}
