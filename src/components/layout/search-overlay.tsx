'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchSite, type SearchEntry, type SearchGroup } from '@/lib/search-index';
import { useLanguage } from '@/components/layout/language-context';

const GROUP_ORDER: SearchGroup[] = ['pages', 'services', 'audit-units', 'publications'];

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const { dict } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchSite(query), [query]);
  const grouped = useMemo(() => {
    const byGroup = new Map<SearchGroup, SearchEntry[]>();
    for (const group of GROUP_ORDER) {
      const items = results.filter((r) => r.group === group);
      if (items.length > 0) byGroup.set(group, items);
    }
    return byGroup;
  }, [results]);

  // Flat list in display order, for arrow-key navigation.
  const flatResults = useMemo(
    () => GROUP_ORDER.flatMap((g) => grouped.get(g) ?? []),
    [grouped],
  );

  // Reset state whenever the overlay opens, and focus the input.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Esc closes from anywhere while open.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Keep the active option in view while arrow-navigating.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(`#search-option-${activeIndex}`);
    el?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex, open]);

  if (!open) return null;

  function goTo(entry: SearchEntry) {
    onClose();
    router.push(entry.href);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (flatResults.length ? (i + 1) % flatResults.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) =>
        flatResults.length ? (i - 1 + flatResults.length) % flatResults.length : 0,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const entry = flatResults[activeIndex];
      if (entry) goTo(entry);
    }
  }

  const groupLabels = dict.search.groups;
  let optionIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[12vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={dict.search.dialogLabel}
        className={cn(
          'w-full max-w-xl bg-white rounded-2xl border border-border/40 shadow-card overflow-hidden',
          'motion-safe:animate-[reveal_0.2s_ease-out]',
        )}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40">
          <Search aria-hidden="true" className="w-5 h-5 text-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={flatResults.length > 0}
            aria-controls="search-results"
            aria-activedescendant={
              flatResults.length > 0 ? `search-option-${activeIndex}` : undefined
            }
            aria-label={dict.search.dialogLabel}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder={dict.search.placeholder}
            className="flex-1 bg-transparent text-base text-text placeholder:text-text-muted/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.search.closeLabel}
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-lg shrink-0',
              'text-text-muted hover:text-primary hover:bg-primary/5 transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
            )}
          >
            <X aria-hidden="true" className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto">
          {query.trim() && flatResults.length === 0 && (
            <p className="px-5 py-8 text-sm text-text-muted text-center">
              {dict.search.noResults.replace('{query}', query.trim())}
            </p>
          )}

          {flatResults.length > 0 && (
            <ul id="search-results" role="listbox" aria-label={dict.search.dialogLabel} className="py-2">
              {GROUP_ORDER.map((group) => {
                const items = grouped.get(group);
                if (!items) return null;
                return (
                  <li key={group} role="presentation">
                    <p className="px-5 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                      {groupLabels[group === 'audit-units' ? 'auditUnits' : group]}
                    </p>
                    <ul role="group" aria-label={groupLabels[group === 'audit-units' ? 'auditUnits' : group]}>
                      {items.map((entry) => {
                        optionIndex += 1;
                        const index = optionIndex;
                        const isActive = index === activeIndex;
                        return (
                          <li
                            key={`${entry.href}|${entry.title}`}
                            id={`search-option-${index}`}
                            role="option"
                            aria-selected={isActive}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => goTo(entry)}
                            className={cn(
                              'group/result flex items-start gap-3 px-5 py-3 cursor-pointer',
                              'transition-colors duration-100',
                              isActive ? 'bg-primary/5' : 'bg-transparent',
                            )}
                          >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                              <FileText aria-hidden="true" className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  'text-sm font-semibold truncate transition-colors duration-100',
                                  isActive ? 'text-primary' : 'text-text',
                                )}
                              >
                                {entry.title}
                              </p>
                              <p className="text-xs text-text-muted leading-relaxed mt-0.5 line-clamp-2">
                                {entry.description}
                              </p>
                            </div>
                            <ArrowRight
                              aria-hidden="true"
                              className={cn(
                                'w-4 h-4 mt-1.5 shrink-0 transition-opacity duration-100',
                                isActive ? 'opacity-100 text-primary' : 'opacity-0',
                              )}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
