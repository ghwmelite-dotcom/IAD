'use client';

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

export function StatsBanner() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-20 lg:py-24 bg-surface border-y border-border overflow-hidden">
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
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'group bg-white border border-border rounded-2xl p-7 text-center',
                'hover:border-primary/30 hover:-translate-y-1 transition-all duration-300',
                isVisible && 'animate-[reveal_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]',
                !isVisible && 'opacity-0',
              )}
              style={isVisible ? { animationDelay: `${i * 80}ms` } : undefined}
            >
              <div className={cn(
                'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-5 shadow-lg',
                'group-hover:scale-110 transition-transform duration-300',
                stat.gradient,
              )}>
                <stat.icon className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-primary leading-none mb-2 font-display">{stat.number}</p>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.15em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
