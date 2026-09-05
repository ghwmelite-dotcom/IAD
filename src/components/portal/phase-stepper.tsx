import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import type { EngagementPhase } from '@/lib/portal-api';

export const PHASE_ORDER: EngagementPhase[] = [
  'planning',
  'fieldwork',
  'reporting',
  'follow_up',
  'closed',
];

const PHASE_LABELS: Record<EngagementPhase, string> = {
  planning: 'Planning',
  fieldwork: 'Fieldwork',
  reporting: 'Reporting',
  follow_up: 'Follow-up',
  closed: 'Closed',
};

interface PhaseStepperProps {
  phase: EngagementPhase;
}

export function PhaseStepper({ phase }: PhaseStepperProps) {
  const currentIndex = PHASE_ORDER.indexOf(phase);

  return (
    <ol aria-label="Engagement phase" className="flex items-center w-full">
      {PHASE_ORDER.map((step, i) => {
        const done = i < currentIndex;
        const current = i === currentIndex;
        return (
          <li key={step} className={cn('flex items-center', i < PHASE_ORDER.length - 1 && 'flex-1')}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                aria-current={current ? 'step' : undefined}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors',
                  done && 'bg-primary border-primary text-white',
                  current && 'bg-accent border-accent text-kente-black',
                  !done && !current && 'bg-surface-card border-border text-text-muted',
                )}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
              </span>
              <span
                className={cn(
                  'text-[11px] font-medium whitespace-nowrap',
                  current ? 'text-primary-dark font-bold' : done ? 'text-primary' : 'text-text-muted',
                )}
              >
                {PHASE_LABELS[step]}
              </span>
            </div>
            {i < PHASE_ORDER.length - 1 && (
              <div
                aria-hidden="true"
                className={cn('flex-1 h-0.5 mx-2 mb-5 rounded-full', i < currentIndex ? 'bg-primary' : 'bg-border')}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
