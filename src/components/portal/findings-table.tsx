'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { Finding, FindingSeverity, FindingStatus } from '@/lib/portal-api';
import { findingAgeDays } from '@/lib/portal-api';
import { formatDateShort, cn } from '@/lib/utils';
import { SeverityBadge, FindingStatusBadge } from '@/components/portal/badges';

const STATUSES: FindingStatus[] = ['open', 'responded', 'in_progress', 'closed', 'verified'];
const SEVERITIES: FindingSeverity[] = ['high', 'medium', 'low'];

interface FindingsTableProps {
  findings: Finding[];
  /** Hide the MDA column/filter (e.g. on the My MDA page). */
  hideMda?: boolean;
}

const selectClasses =
  'h-10 px-3 rounded-md border border-border bg-surface-card text-sm text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary';

function agingClasses(days: number, closed: boolean): string {
  if (closed) return 'text-text-muted';
  if (days > 90) return 'text-error font-bold';
  if (days > 30) return 'text-warning font-semibold';
  return 'text-text';
}

export function FindingsTable({ findings, hideMda = false }: FindingsTableProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [severity, setSeverity] = useState('');
  const [mda, setMda] = useState('');
  const [category, setCategory] = useState('');

  const mdas = useMemo(
    () => [...new Set(findings.map((f) => f.mda_name))].sort(),
    [findings],
  );
  const categories = useMemo(
    () => [...new Set(findings.map((f) => f.category))].sort(),
    [findings],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return findings.filter((f) => {
      if (status && f.status !== status) return false;
      if (severity && f.severity !== severity) return false;
      if (mda && f.mda_name !== mda) return false;
      if (category && f.category !== category) return false;
      if (
        q &&
        !f.title.toLowerCase().includes(q) &&
        !f.engagement_code.toLowerCase().includes(q) &&
        !f.mda_name.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [findings, query, status, severity, mda, category]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, engagement code…"
            aria-label="Search findings"
            className={cn(selectClasses, 'w-full pl-9')}
          />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className={selectClasses}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <select value={severity} onChange={(e) => setSeverity(e.target.value)} aria-label="Filter by severity" className={selectClasses}>
          <option value="">All severities</option>
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {!hideMda && (
          <select value={mda} onChange={(e) => setMda(e.target.value)} aria-label="Filter by MDA" className={selectClasses}>
            <option value="">All MDAs</option>
            {mdas.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        )}
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category" className={selectClasses}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface-card rounded-xl border border-border/60 shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left">
              <th className="px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Finding</th>
              <th className="px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Engagement</th>
              {!hideMda && (
                <th className="px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">MDA</th>
              )}
              <th className="px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Severity</th>
              <th className="px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider text-right">Days open</th>
              <th className="px-4 py-3 font-semibold text-text-muted text-xs uppercase tracking-wider">Raised</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => {
              const days = findingAgeDays(f);
              const closed = f.status === 'closed' || f.status === 'verified';
              return (
                <tr key={f.id} className="border-b border-border/40 last:border-0 hover:bg-primary/[0.03] transition-colors">
                  <td className="px-4 py-3 max-w-72">
                    <Link
                      href={`/portal/findings/detail/?id=${f.id}`}
                      className="font-medium text-primary hover:underline line-clamp-2"
                    >
                      {f.title}
                    </Link>
                    <span className="block text-xs text-text-muted mt-0.5">{f.category}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-xs">{f.engagement_code}</td>
                  {!hideMda && <td className="px-4 py-3 max-w-48 truncate">{f.mda_name}</td>}
                  <td className="px-4 py-3"><SeverityBadge severity={f.severity} /></td>
                  <td className="px-4 py-3"><FindingStatusBadge status={f.status} /></td>
                  <td className={cn('px-4 py-3 text-right tabular-nums', agingClasses(days, closed))}>
                    {days}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-text-muted">{formatDateShort(f.created_at)}</td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={hideMda ? 6 : 7} className="px-4 py-10 text-center text-text-muted">
                  No findings match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-text-muted mt-2">
        Showing {filtered.length} of {findings.length} findings
      </p>
    </div>
  );
}
