'use client';

import { useEffect, useRef } from 'react';
import { Landmark, ClipboardCheck, GraduationCap, Network, CheckCheck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

// Illustrative figures authorised for this prototype on 24 November 2026.
// Replace this dataset with approved departmental results before production.
const DEMO_STATS = [
  { icon: Landmark, value: 40, suffix: '+', label: 'MDAs supported' },
  { icon: ClipboardCheck, value: 120, suffix: '+', label: 'Audits completed' },
  { icon: GraduationCap, value: 300, suffix: '+', label: 'Auditors trained' },
  { icon: Network, value: 10, suffix: '', label: 'Audit units coordinated' },
] as const;
const DEMO_RESOLUTION_RATE = 85;
const COUNT_DURATION_MS = 1100;

function AnimatedFigure({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { ref, isVisible } = useScrollReveal(0.5);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = numberRef.current;
    if (!node || !isVisible) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;

    let frame = 0;
    const started = performance.now();
    const finish = () => {
      cancelAnimationFrame(frame);
      node.textContent = String(value);
    };
    const onPreferenceChange = () => {
      if (preference.matches) finish();
    };
    const tick = (now: number) => {
      const progress = Math.min((now - started) / COUNT_DURATION_MS, 1);
      node.textContent = String(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    node.textContent = '0';
    frame = requestAnimationFrame(tick);
    preference.addEventListener('change', onPreferenceChange);
    return () => {
      finish();
      preference.removeEventListener('change', onPreferenceChange);
    };
  }, [value, isVisible]);

  return (
    <span ref={ref} className="inline-flex items-baseline" data-demo-figure>
      <span className="sr-only">{value}{suffix}</span>
      <span aria-hidden="true" className="inline-grid tabular-nums">
        <span className="invisible col-start-1 row-start-1">{value}</span>
        <span ref={numberRef} className="col-start-1 row-start-1">{value}</span>
      </span>
      {suffix && <span aria-hidden="true" className="ml-1 text-[0.6em] font-normal text-home-gold">{suffix}</span>}
    </span>
  );
}

export function StatsBanner() {
  return (
    <section aria-labelledby="audit-at-a-glance" aria-describedby="audit-figures-note" className="bg-home-canvas py-16 sm:py-20 lg:py-24" data-audit-snapshot>
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-home-border bg-white shadow-[0_12px_40px_-28px_var(--color-home-ink)]">
          <div className="grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <div className="px-6 py-8 sm:p-10 lg:p-12">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-home-gold/20 bg-home-canvas px-3 py-1.5 font-brand text-xs font-medium text-home-gold">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-home-gold" />
                Prototype figures
              </span>
              <h2 id="audit-at-a-glance" className="scroll-mt-56 max-w-xl font-display text-3xl font-semibold leading-[1.15] text-home-ink sm:text-4xl lg:text-5xl">
                Internal audit<br className="hidden sm:block" /> at a glance
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-home-muted">
                A snapshot of audit coordination, professional development and follow-through.
              </p>
            </div>

            <div className="mx-6 border-t border-home-border py-8 sm:mx-10 md:mx-0 md:my-10 md:border-t-0 md:border-l md:px-10 md:py-0 lg:my-12 lg:px-12">
              <dl>
                <dt className="flex items-center gap-2.5 font-brand text-sm font-medium text-home-muted">
                  <CheckCheck className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  Findings resolved
                </dt>
                <dd className="mt-3 font-brand text-[5rem] leading-none font-medium tracking-[-0.06em] text-primary sm:text-[6.5rem]">
                  <AnimatedFigure value={DEMO_RESOLUTION_RATE} suffix="%" />
                </dd>
              </dl>
              <div aria-hidden="true" className="mt-6 h-1 overflow-hidden rounded-full bg-home-canvas">
                <div className="h-full rounded-full bg-primary" style={{ width: `${DEMO_RESOLUTION_RATE}%` }} />
              </div>
              <p className="mt-3 font-brand text-xs leading-relaxed text-home-muted">Illustrative resolution rate</p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px border-t border-home-border bg-home-border lg:grid-cols-4">
            {DEMO_STATS.map(({ icon: Icon, value, suffix, label }) => (
              <div key={label} className="min-w-0 bg-white px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
                <dt className="flex min-h-12 items-start gap-2.5 font-brand text-sm leading-relaxed text-home-muted sm:min-h-10">
                  <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-home-gold" strokeWidth={1.5} aria-hidden="true" />
                  <span>{label}</span>
                </dt>
                <dd className="mt-3 font-brand text-4xl leading-none font-medium tracking-[-0.04em] text-home-ink sm:text-5xl">
                  <AnimatedFigure value={value} suffix={suffix} />
                </dd>
              </div>
            ))}
          </dl>

          <p id="audit-figures-note" className="w-full max-w-none border-t border-home-border bg-home-canvas/50 px-6 py-4 font-brand text-xs leading-relaxed text-home-muted sm:px-10 lg:px-12">
            Illustrative figures for demonstration. Verified departmental results will replace these values.
          </p>
        </div>
      </div>
    </section>
  );
}
