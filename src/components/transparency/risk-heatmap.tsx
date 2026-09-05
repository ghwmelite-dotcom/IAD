'use client';

import { cn } from '@/lib/utils';
import type { RiskHeatCell } from '@/lib/public-api';

interface RiskHeatmapProps {
  cells: RiskHeatCell[];
}

const LEVELS = [
  { max: 4, bg: 'bg-green-100', text: 'text-green-800', label: 'Low' },
  { max: 9, bg: 'bg-lime-100', text: 'text-lime-800', label: 'Moderate' },
  { max: 14, bg: 'bg-amber-100', text: 'text-amber-800', label: 'Elevated' },
  { max: 19, bg: 'bg-orange-100', text: 'text-orange-800', label: 'High' },
  { max: 25, bg: 'bg-red-100', text: 'text-red-800', label: 'Very High' },
];

function levelFor(score: number) {
  return LEVELS.find((l) => score <= l.max) ?? LEVELS[LEVELS.length - 1]!;
}

export function RiskHeatmap({ cells }: RiskHeatmapProps) {
  const countAt = (likelihood: number, impact: number) =>
    cells.find((c) => c.likelihood === likelihood && c.impact === impact)?.count ?? 0;

  return (
    <div className="bg-white rounded-2xl border-2 border-border/40 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-primary-dark">
          Audit Universe Risk Heat Map
        </h3>
        <p className="text-sm text-text-muted mt-1">
          Number of audited entities at each likelihood × impact rating across the audit universe.
        </p>
      </div>

      <div className="flex gap-3">
        {/* Y axis label */}
        <div className="flex items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted/60 -rotate-90 whitespace-nowrap">
            Likelihood →
          </span>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-1.5">
            {/* Header row: impact labels */}
            <div />
            {[1, 2, 3, 4, 5].map((impact) => (
              <div
                key={`impact-${impact}`}
                className="text-center text-xs font-semibold text-text-muted/60 pb-1"
              >
                {impact}
              </div>
            ))}

            {/* Rows: likelihood 5 (top) down to 1 */}
            {[5, 4, 3, 2, 1].map((likelihood) => (
              <div key={`row-${likelihood}`} className="contents">
                <div className="flex items-center justify-end pr-2 text-xs font-semibold text-text-muted/60">
                  {likelihood}
                </div>
                {[1, 2, 3, 4, 5].map((impact) => {
                  const score = likelihood * impact;
                  const level = levelFor(score);
                  const count = countAt(likelihood, impact);
                  return (
                    <div
                      key={`${likelihood}-${impact}`}
                      title={`Likelihood ${likelihood}, Impact ${impact} — ${count} ${count === 1 ? 'entity' : 'entities'}`}
                      className={cn(
                        'aspect-[4/3] rounded-lg flex items-center justify-center',
                        'text-sm font-bold transition-transform duration-200 hover:scale-[1.04]',
                        level.bg,
                        level.text,
                      )}
                    >
                      {count > 0 ? count : ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <p className="text-center text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted/60 mt-3">
            Impact →
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-5 pt-4 border-t border-border/40">
        {LEVELS.map((level) => (
          <span key={level.label} className="flex items-center gap-1.5 text-xs text-text-muted">
            <span
              aria-hidden="true"
              className={cn('w-3 h-3 rounded-sm', level.bg, 'border border-black/10')}
            />
            {level.label} ({level.max === 25 ? '20–25' : level.max === 4 ? '1–4' : level.max === 9 ? '5–9' : level.max === 14 ? '10–14' : '15–19'})
          </span>
        ))}
      </div>
    </div>
  );
}
