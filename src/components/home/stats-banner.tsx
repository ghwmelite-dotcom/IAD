'use client';

import { useEffect, useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import { Landmark, ClipboardCheck, BadgeCheck, GraduationCap, ShieldCheck } from 'lucide-react';

// TODO(rebrand): replace with verified departmental figures.
const STATS = [
  { icon: Landmark, number: '40+', label: 'MDAs Covered', gradient: 'from-primary-light to-primary' },
  { icon: ClipboardCheck, number: '120+', label: 'Audits Completed', gradient: 'from-blue-500 to-indigo-600' },
  { icon: BadgeCheck, number: '85%', label: 'Findings Resolved', gradient: 'from-purple-500 to-violet-600' },
  { icon: GraduationCap, number: '300+', label: 'Auditors Trained', gradient: 'from-teal-500 to-cyan-600' },
  { icon: ShieldCheck, number: '10', label: 'Audit Units Coordinated', gradient: 'from-rose-500 to-pink-600' },
];

const COUNT_DURATION_MS = 1200;
const CARD_STAGGER_MS = 60;

function StatCard({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  // Observe each card so the lower rows on phones animate only when reached.
  const { ref, isVisible } = useScrollReveal(0.25);
  const numberRef = useRef<HTMLSpanElement>(null);
  const delay = index * CARD_STAGGER_MS;

  useEffect(() => {
    const node = numberRef.current;
    if (!isVisible || !node) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;

    const target = Number.parseInt(stat.number, 10);
    const suffix = stat.number.replace(/^\d+/, '');
    const start = performance.now() + delay;
    let frame = 0;

    const finish = () => {
      cancelAnimationFrame(frame);
      node.textContent = stat.number;
    };
    const onPreferenceChange = () => {
      if (preference.matches) finish();
    };
    const tick = (now: number) => {
      const progress = Math.min(Math.max((now - start) / COUNT_DURATION_MS, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    node.textContent = `0${suffix}`;
    frame = requestAnimationFrame(tick);
    preference.addEventListener('change', onPreferenceChange);
    return () => {
      finish();
      preference.removeEventListener('change', onPreferenceChange);
    };
  }, [isVisible, stat.number, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'group bg-white border border-border rounded-2xl p-7 text-center',
        'hover:border-primary/30 motion-safe:hover:-translate-y-1 transition-all duration-300',
        isVisible && 'motion-safe:animate-[reveal_300ms_cubic-bezier(0.16,1,0.3,1)_backwards]',
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-5 shadow-lg',
        'motion-safe:group-hover:scale-110 transition-transform duration-300',
        stat.gradient,
      )}>
        <stat.icon className="h-7 w-7 text-white" aria-hidden="true" />
      </div>
      <p className="text-3xl lg:text-4xl font-bold text-primary leading-none mb-2 font-display tabular-nums">
        <span className="sr-only">{stat.number}</span>
        <span aria-hidden="true" className="inline-grid">
          <span className="invisible col-start-1 row-start-1">{stat.number}</span>
          <span ref={numberRef} className="col-start-1 row-start-1">{stat.number}</span>
        </span>
      </p>
      <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.15em]">{stat.label}</p>
    </div>
  );
}

export function StatsBanner() {

  return (
    <section className="relative py-20 lg:py-24 bg-home-canvas border-y border-border overflow-hidden">
      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-sm font-semibold text-primary tracking-wide">By the Numbers</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-text">
            Internal Audit at a{' '}
            <span className="relative inline-block">
              Glance
              <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/30 rounded-sm -z-10" />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
