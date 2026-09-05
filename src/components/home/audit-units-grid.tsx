'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Wallet,
  HeartPulse,
  GraduationCap,
  Wheat,
  Landmark,
  Building2,
  Truck,
  Shield,
  Scale,
  Zap,
} from 'lucide-react';
import { AUDIT_UNITS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Wallet,
  HeartPulse,
  GraduationCap,
  Wheat,
  Landmark,
  Building2,
  Truck,
  Shield,
  Scale,
  Zap,
};

const GRADIENTS = [
  'from-green-400 to-emerald-500',
  'from-blue-400 to-indigo-500',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-pink-500',
  'from-purple-400 to-violet-500',
];

const GLOWS = [
  'group-hover/dir:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
  'group-hover/dir:shadow-[0_0_30px_rgba(99,102,241,0.2)]',
  'group-hover/dir:shadow-[0_0_30px_rgba(245,158,11,0.2)]',
  'group-hover/dir:shadow-[0_0_30px_rgba(244,63,94,0.2)]',
  'group-hover/dir:shadow-[0_0_30px_rgba(139,92,246,0.2)]',
];

export function AuditUnitsGrid() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      aria-labelledby="audit-units-heading"
      className="py-24 lg:py-32 relative overflow-hidden bg-primary-dark"
    >
      {/* Kente mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: [
            'repeating-linear-gradient(0deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 48px)',
            'repeating-linear-gradient(90deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 48px)',
          ].join(', '),
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(46,125,50,0.15) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-sm font-semibold text-accent tracking-wide">
              Our Network
            </span>
          </div>
          <h2
            id="audit-units-heading"
            className="font-display text-4xl lg:text-5xl font-bold text-white mb-5"
          >
            Internal{' '}
            <span className="relative inline-block">
              Audit Units
              <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/30 rounded-sm -z-10" />
            </span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            The headquarters of internal audit in the Civil Service — every MDA's Internal Audit Unit, led by its own Head of Unit, answers to the Director of Internal Audit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {AUDIT_UNITS.map((unit, index) => {
            const Icon = ICON_MAP[unit.icon];
            const gradient = GRADIENTS[index % GRADIENTS.length]!;
            const glow = GLOWS[index % GLOWS.length]!;
            return (
              <Link
                key={unit.slug}
                href={`/audit-units/${unit.slug}`}
                className={cn(
                  'group/dir block relative bg-white/[0.05] backdrop-blur-sm rounded-2xl border border-white/10 p-6',
                  'hover:bg-white/[0.1] hover:border-white/20 hover:-translate-y-2 transition-all duration-400',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark',
                  glow,
                  isVisible && 'animate-[reveal_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]',
                  !isVisible && 'opacity-0',
                )}
                style={isVisible ? { animationDelay: `${index * 100}ms` } : undefined}
              >
                <div className={cn(
                  'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg',
                  'group-hover/dir:scale-110 transition-transform duration-300',
                  gradient,
                )}>
                  {Icon && <Icon className="h-7 w-7 text-white" aria-hidden="true" />}
                </div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-2">
                  {unit.shortName}
                </span>
                <h3 className="font-semibold text-base text-white leading-snug mb-2 group-hover/dir:text-accent transition-colors">
                  {unit.name}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
                  {unit.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/audit-units"
            className="inline-flex items-center gap-2 text-base font-semibold text-accent px-6 py-3 rounded-xl bg-accent/10 border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-all"
          >
            View all audit units <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
