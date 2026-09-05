import { cn } from '@/lib/utils';
import type { UniverseEntry } from '@/lib/portal-api';

interface RiskHeatMapProps {
  entries: Array<Pick<UniverseEntry, 'risk_likelihood' | 'risk_impact'>>;
}

/** Colour ramp for risk score = likelihood × impact (1–25). */
function cellClasses(score: number, hasCounts: boolean): string {
  if (!hasCounts) return 'bg-black/[0.03] text-text-muted/50';
  if (score >= 15) return 'bg-error/80 text-white';
  if (score >= 8) return 'bg-warning/70 text-white';
  if (score >= 4) return 'bg-accent/50 text-kente-black';
  return 'bg-success/60 text-white';
}

/**
 * 5×5 audit-universe risk heat map: likelihood (rows, 5 at top) × impact
 * (columns). Cell shows the count of universe entries at that coordinate.
 */
export function RiskHeatMap({ entries }: RiskHeatMapProps) {
  const counts = new Map<string, number>();
  for (const e of entries) {
    const key = `${e.risk_likelihood}:${e.risk_impact}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return (
    <div className="w-full">
      <div className="grid" style={{ gridTemplateColumns: 'auto repeat(5, minmax(0,1fr))' }}>
        {/* Column headers: impact */}
        <div />
        {[1, 2, 3, 4, 5].map((impact) => (
          <div key={impact} className="text-center text-[11px] font-semibold text-text-muted pb-2">
            {impact}
          </div>
        ))}

        {[5, 4, 3, 2, 1].map((likelihood) => (
          <div key={likelihood} className="contents">
            <div className="flex items-center justify-end pr-2 text-[11px] font-semibold text-text-muted">
              {likelihood}
            </div>
            {[1, 2, 3, 4, 5].map((impact) => {
              const count = counts.get(`${likelihood}:${impact}`) ?? 0;
              const score = likelihood * impact;
              return (
                <div
                  key={impact}
                  data-testid={`heat-cell-${likelihood}-${impact}`}
                  title={`Likelihood ${likelihood} × Impact ${impact} (score ${score}) — ${count} ${count === 1 ? 'entry' : 'entries'}`}
                  className={cn(
                    'aspect-square m-0.5 rounded-md flex items-center justify-center text-sm font-bold transition-transform',
                    cellClasses(score, count > 0),
                    count > 0 && 'hover:scale-105',
                  )}
                >
                  {count > 0 ? count : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-[11px] text-text-muted">
        <span className="font-semibold">Impact →</span>
        <span className="font-semibold">↑ Likelihood</span>
      </div>
    </div>
  );
}
