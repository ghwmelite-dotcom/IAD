'use client';

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollRegion } from '@/components/ui/scroll-region';
import type { MdaTransparency } from '@/lib/public-api';

type SortKey = 'mda_name' | 'findings' | 'closed' | 'resolutionRate' | 'openHigh';

interface MdaTableProps {
  rows: MdaTransparency[];
}

const COLUMNS: { key: SortKey; label: string; numeric: boolean }[] = [
  { key: 'mda_name', label: 'MDA', numeric: false },
  { key: 'findings', label: 'Findings', numeric: true },
  { key: 'closed', label: 'Closed', numeric: true },
  { key: 'resolutionRate', label: 'Resolution Rate', numeric: true },
  { key: 'openHigh', label: 'Open High-Severity', numeric: true },
];

export function MdaTable({ rows }: MdaTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('findings');
  const [ascending, setAscending] = useState(false);

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === 'string' && typeof bv === 'string'
          ? av.localeCompare(bv)
          : (av as number) - (bv as number);
      return ascending ? cmp : -cmp;
    });
    return copy;
  }, [rows, sortKey, ascending]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setAscending((prev) => !prev);
    } else {
      setSortKey(key);
      setAscending(key === 'mda_name');
    }
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-border/40 shadow-sm overflow-hidden">
      <ScrollRegion>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-border/40 bg-primary/[0.03]">
              {COLUMNS.map((col) => {
                const active = sortKey === col.key;
                const Icon = active ? (ascending ? ArrowUp : ArrowDown) : ArrowUpDown;
                return (
                  <th
                    key={col.key}
                    aria-sort={active ? (ascending ? 'ascending' : 'descending') : undefined}
                    className={cn('px-5 py-4', col.numeric ? 'text-right' : 'text-left')}
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className={cn(
                        'inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded',
                        active ? 'text-primary' : 'text-text-muted/70 hover:text-primary',
                      )}
                    >
                      {col.label}
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={row.mda_name}
                className="border-b border-border/30 last:border-0 hover:bg-primary/[0.02] transition-colors"
              >
                <td className="px-5 py-4 font-semibold text-primary-dark">
                  {row.mda_name}
                </td>
                <td className="px-5 py-4 text-right tabular-nums text-text-muted">
                  {row.findings}
                </td>
                <td className="px-5 py-4 text-right tabular-nums text-text-muted">
                  {row.closed}
                </td>
                <td className="px-5 py-4 text-right">
                  <span
                    className={cn(
                      'inline-block px-2.5 py-1 rounded-lg text-xs font-bold tabular-nums',
                      row.resolutionRate >= 75
                        ? 'bg-green-100 text-green-800'
                        : row.resolutionRate >= 50
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800',
                    )}
                  >
                    {row.resolutionRate}%
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  {row.openHigh > 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-100 text-red-800 text-xs font-bold tabular-nums">
                      <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                      {row.openHigh}
                    </span>
                  ) : (
                    <span className="text-xs text-text-muted/50">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollRegion>
    </div>
  );
}
