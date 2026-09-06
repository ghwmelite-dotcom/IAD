'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Search,
  SearchX,
  Download,
  Calendar,
  FileIcon,
  Lock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/public-api';
import {
  fetchPublicKnowledge,
  fetchPortalKnowledge,
  publicKnowledgeDownloadUrl,
  portalKnowledgeDownloadUrl,
  KNOWLEDGE_CATEGORIES,
  KNOWLEDGE_CATEGORY_LABELS,
  KNOWLEDGE_CATEGORY_COLORS,
  KNOWLEDGE_PAGE_SIZE,
  formatFileSize,
  fileTypeLabel,
  type KnowledgeCategory,
  type KnowledgeItem,
  type KnowledgeListResult,
} from '@/lib/knowledge-api';

type Status = 'loading' | 'ready' | 'error';

interface KnowledgeBrowserProps {
  /** public → /api/public/knowledge; portal → /api/portal/knowledge (session cookie). */
  mode: 'public' | 'portal';
  /** Build-time snapshot (public mode only) — rendered instantly, refreshed live on mount. */
  initial?: KnowledgeListResult | null;
}

export function KnowledgeBrowser({ mode, initial = null }: KnowledgeBrowserProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<KnowledgeCategory | 'all'>('all');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<KnowledgeListResult | null>(initial);
  const [status, setStatus] = useState<Status>(initial ? 'ready' : 'loading');
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);
  const topRef = useRef<HTMLDivElement>(null);

  const load = useCallback(
    async (q: string, cat: KnowledgeCategory | 'all', pg: number) => {
      const id = ++requestId.current;
      try {
        const params = { q, category: cat, page: pg, pageSize: KNOWLEDGE_PAGE_SIZE };
        const data =
          mode === 'portal'
            ? await fetchPortalKnowledge(params)
            : await fetchPublicKnowledge(params);
        if (id !== requestId.current) return; // superseded by a newer request
        setResult(data);
        setStatus('ready');
        setError(null);
      } catch (err) {
        if (id !== requestId.current) return;
        // Keep showing stale data if we have it; only degrade to the error
        // state when there is nothing at all to show.
        setStatus((prev) => (prev === 'ready' ? prev : 'error'));
        setError(err instanceof Error ? err.message : 'Failed to load documents.');
      }
    },
    [mode],
  );

  // Live refresh + debounced search (debounce only applies to free text).
  useEffect(() => {
    const timer = setTimeout(
      () => void load(query, category, page),
      query.trim() ? 300 : 0,
    );
    return () => clearTimeout(timer);
  }, [query, category, page, load]);

  function handleCategoryChange(cat: KnowledgeCategory | 'all') {
    setCategory(cat);
    setPage(1);
  }

  function handlePageChange(pg: number) {
    setPage(pg);
    topRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  }

  const items = result?.items ?? [];
  const meta = result?.meta ?? { page: 1, pageSize: KNOWLEDGE_PAGE_SIZE, total: 0 };
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.pageSize));
  const downloadUrl =
    mode === 'portal' ? portalKnowledgeDownloadUrl : publicKnowledgeDownloadUrl;

  const body = (
    <>
      {/* ── Search + category filter ── */}
      <div ref={topRef} className="mb-10 scroll-mt-24">
        <div className="relative max-w-xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted/40"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search documents by title or keyword..."
            aria-label="Search the knowledge hub"
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border/60 bg-white text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setPage(1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-text-muted hover:text-primary-dark transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-5" role="group" aria-label="Filter by category">
          <CategoryPill
            label="All Documents"
            active={category === 'all'}
            onClick={() => handleCategoryChange('all')}
          />
          {KNOWLEDGE_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={KNOWLEDGE_CATEGORY_LABELS[cat]}
              active={category === cat}
              onClick={() => handleCategoryChange(cat)}
            />
          ))}
        </div>

        {status === 'ready' && (
          <p className="text-sm text-text-muted mt-4" role="status">
            {meta.total === 0
              ? 'No documents'
              : `Showing ${(meta.page - 1) * meta.pageSize + 1}–${Math.min(
                  meta.page * meta.pageSize,
                  meta.total,
                )} of ${meta.total} document${meta.total === 1 ? '' : 's'}`}
            {category !== 'all' && ` in ${KNOWLEDGE_CATEGORY_LABELS[category]}`}
            {totalPages > 1 && ` • Page ${meta.page} of ${totalPages}`}
          </p>
        )}
      </div>

      {status === 'loading' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Loading">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : status === 'error' ? (
        <div
          className="bg-white rounded-2xl border-2 border-red-200 p-10 text-center max-w-lg mx-auto"
          role="alert"
        >
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-4" aria-hidden="true" />
          <h3 className="font-semibold text-lg text-primary-dark mb-2">
            Documents could not be loaded
          </h3>
          <p className="text-sm text-text-muted mb-5">{error ?? 'Something went wrong.'}</p>
          <button
            type="button"
            onClick={() => void load(query, category, page)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-colors"
          >
            Try again
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          {query.trim() || category !== 'all' ? (
            <SearchX className="h-12 w-12 text-text-muted/30 mx-auto mb-4" aria-hidden="true" />
          ) : (
            <FolderOpen className="h-12 w-12 text-text-muted/30 mx-auto mb-4" aria-hidden="true" />
          )}
          <h3 className="font-semibold text-lg text-text-muted mb-2">No documents found</h3>
          <p className="text-base text-text-muted/60 max-w-md mx-auto">
            {query.trim() || category !== 'all'
              ? 'Try adjusting your search or category filter.'
              : 'Documents published by the department will appear here.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <KnowledgeCard
                key={item.id}
                item={item}
                downloadUrl={downloadUrl(item.id)}
                showAudience={mode === 'portal'}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Knowledge hub pages"
              className="flex items-center justify-center gap-2 pt-10"
            >
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                  page === 1
                    ? 'text-text-muted/30 cursor-not-allowed'
                    : 'text-primary hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30',
                )}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, i, arr) => {
                  const prev = arr[i - 1];
                  const showEllipsis = prev !== undefined && p - prev > 1;
                  return (
                    <span key={p} className="flex items-center gap-2">
                      {showEllipsis && <span className="text-text-muted/30 px-1">...</span>}
                      <button
                        type="button"
                        onClick={() => handlePageChange(p)}
                        aria-current={p === page ? 'page' : undefined}
                        className={cn(
                          'w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200',
                          p === page
                            ? 'bg-primary text-white shadow-md'
                            : 'text-text-muted hover:bg-primary/5 border-2 border-border/40 hover:border-primary/20 bg-white',
                        )}
                      >
                        {p}
                      </button>
                    </span>
                  );
                })}

              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                  page === totalPages
                    ? 'text-text-muted/30 cursor-not-allowed'
                    : 'text-primary hover:bg-primary/5 border-2 border-primary/10 hover:border-primary/30',
                )}
              >
                Next
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          )}
        </>
      )}
    </>
  );

  if (mode === 'portal') {
    return <div>{body}</div>;
  }

  return (
    <section
      className="py-16 lg:py-20 relative overflow-hidden"
      style={{ backgroundColor: '#FFF8F0' }}
    >
      <FloatingShapes />
      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">{body}</div>
    </section>
  );
}

// ─── Category pill ──────────────────────────────────────────────────────────

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200',
        active
          ? 'bg-primary text-white border-primary shadow-sm'
          : 'bg-white text-text-muted border-border/40 hover:border-primary/30 hover:text-primary',
      )}
    >
      {label}
    </button>
  );
}

// ─── Document card ──────────────────────────────────────────────────────────

function KnowledgeCard({
  item,
  downloadUrl,
  showAudience,
}: {
  item: KnowledgeItem;
  downloadUrl: string;
  showAudience: boolean;
}) {
  const fileType = fileTypeLabel(item.current_file);
  const categoryLabel =
    KNOWLEDGE_CATEGORY_LABELS[item.category] ?? item.category;
  const categoryColor =
    KNOWLEDGE_CATEGORY_COLORS[item.category] ?? 'bg-gray-100 text-gray-700';

  return (
    <article className="group bg-white rounded-2xl border-2 border-border/40 p-6 flex flex-col hover:border-primary/20 hover:shadow-lg transition-all duration-300">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className={cn(
            'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md',
            categoryColor,
          )}
        >
          {categoryLabel}
        </span>
        {showAudience && item.audience === 'mda' && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary-dark/5 text-primary-dark border border-primary-dark/10">
            <Lock className="h-3 w-3" aria-hidden="true" />
            MDA only
          </span>
        )}
        {item.current_file && (
          <span className="text-[10px] font-semibold text-text-muted/50 uppercase tracking-wider">
            v{item.current_file.version}
          </span>
        )}
      </div>

      {/* Title + summary */}
      <h3 className="font-semibold text-base text-primary-dark mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
        {item.title}
      </h3>
      <p className="text-sm text-text-muted line-clamp-3 leading-relaxed flex-1">
        {item.summary}
      </p>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium text-text-muted/70 bg-surface px-2 py-0.5 rounded-full border border-border/30"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-xs text-text-muted/60">
        {fileType && item.current_file && (
          <span className="inline-flex items-center gap-1 font-semibold text-text-muted">
            <FileIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {fileType} • {formatFileSize(item.current_file.file_size)}
          </span>
        )}
        {item.published_at && (
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(item.published_at)}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          {item.download_count} download{item.download_count === 1 ? '' : 's'}
        </span>
      </div>

      {/* Download */}
      <div className="mt-5 pt-4 border-t border-border/30">
        {item.current_file ? (
          <a
            href={downloadUrl}
            className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-primary/5 border-2 border-primary/10 text-sm font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gray-50 border-2 border-border/30 text-sm font-semibold text-text-muted/40 cursor-not-allowed"
          >
            <FileIcon className="h-4 w-4" aria-hidden="true" />
            File coming soon
          </span>
        )}
      </div>
    </article>
  );
}
