'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Search, Users, SearchX } from 'lucide-react';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { Skeleton } from '@/components/ui/skeleton';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import { searchRegistry } from '@/lib/public-api';
import type { RegistryEntry } from '@/lib/public-api';
import { RegistryCard } from '@/components/registry/registry-card';
import { PublishingSoon } from '@/components/transparency/publishing-soon';

type Status = 'loading' | 'ready' | 'unavailable';

export function RegistryDirectory() {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<RegistryEntry[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const requestId = useRef(0);
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  const load = useCallback(async (q: string) => {
    const id = ++requestId.current;
    setStatus('loading');
    try {
      const data = await searchRegistry(q);
      if (id !== requestId.current) return; // superseded by a newer search
      setEntries(data);
      setStatus('ready');
    } catch {
      if (id !== requestId.current) return;
      setStatus('unavailable');
    }
  }, []);

  // Initial load + debounced search
  useEffect(() => {
    const timer = setTimeout(() => void load(query), query ? 300 : 0);
    return () => clearTimeout(timer);
  }, [query, load]);

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
              {entries.length} verified {entries.length === 1 ? 'officer' : 'officers'}
              {query && ` matching “${query}”`}
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
        ) : entries.length === 0 ? (
          <div className="text-center py-16">
            <SearchX className="h-12 w-12 text-text-muted/30 mx-auto mb-4" aria-hidden="true" />
            <h3 className="font-semibold text-lg text-text-muted mb-2">
              No verified officers found
            </h3>
            <p className="text-base text-text-muted/60 max-w-md mx-auto">
              {query
                ? 'Try a different name or MDA. Only verified Internal Audit Class officers appear in the public registry.'
                : 'Verified officers will appear here once registry verification begins.'}
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className={cn(
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
              gridVisible && 'animate-[reveal_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]',
              !gridVisible && 'opacity-0',
            )}
          >
            {entries.map((entry) => (
              <RegistryCard key={entry.public_slug} entry={entry} />
            ))}
          </div>
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
