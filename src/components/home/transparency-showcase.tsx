'use client';

import Link from 'next/link';
import { TrendingUp, BadgeCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    icon: TrendingUp,
    title: 'Public Audit Findings Tracker',
    description:
      'Live aggregate statistics on findings raised and resolved across every covered MDA — because accountability should be visible.',
    href: '/transparency',
    cta: 'Explore the dashboard',
    tag: 'Live Data',
  },
  {
    icon: BadgeCheck,
    title: 'Internal Audit Class Registry',
    description:
      'The public register of verified Internal Audit Class officers — grades, MDAs, and credentials checked by the department.',
    href: '/registry',
    cta: 'Search the registry',
    tag: 'Verified',
  },
  {
    icon: ShieldCheck,
    title: 'Certificate Verification',
    description:
      'Confirm any certificate presented as issued by the department against official records — free, instant, and public.',
    href: '/verify',
    cta: 'Verify a certificate',
    tag: 'Instant',
  },
];

export function TransparencyShowcase() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      aria-labelledby="transparency-heading"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(46,125,50,0.35) 0%, transparent 60%), linear-gradient(180deg, #0D3B13 0%, #0a2f0f 100%)',
      }}
    >
      {/* Kente mesh overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage: [
            'repeating-linear-gradient(0deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 32px)',
            'repeating-linear-gradient(90deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 32px)',
          ].join(', '),
        }}
      />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-sm font-semibold text-accent tracking-wide">Open by Design</span>
          </div>
          <h2
            id="transparency-heading"
            className="font-display text-4xl lg:text-5xl font-bold text-white mb-5"
          >
            Accountability You Can{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">See</span>
              <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/20 rounded-sm -z-0" />
            </span>
          </h2>
          <p className="text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
            Three public tools that open the department&apos;s work to every citizen —
            no account, no gatekeeping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className={cn(
                'group/card relative block rounded-2xl p-8 overflow-hidden',
                'bg-white/[0.04] border border-white/10 backdrop-blur-[2px]',
                'hover:bg-white/[0.07] hover:border-accent/40 hover:-translate-y-2',
                'hover:shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_0_1px_rgba(212,160,23,0.15)]',
                'transition-all duration-400',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark',
                isVisible && 'animate-[reveal_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]',
                !isVisible && 'opacity-0',
              )}
              style={isVisible ? { animationDelay: `${index * 140}ms` } : undefined}
            >
              {/* Gold corner tick */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-8 w-10 h-1 rounded-b"
                style={{ background: 'linear-gradient(90deg, #D4A017, #E8C547)' }}
              />

              {/* Tag + icon row */}
              <div className="flex items-start justify-between mb-7">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-[0_8px_20px_rgba(212,160,23,0.3)] group-hover/card:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary-dark" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[1.5px] text-accent/90 border border-accent/25 rounded-full px-3 py-1 bg-accent/[0.08]">
                  {feature.tag === 'Live Data' && (
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                    </span>
                  )}
                  {feature.tag}
                </span>
              </div>

              <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-3 leading-snug">
                {feature.title}
              </h3>
              <p className="text-white/55 text-[15px] leading-relaxed mb-7">
                {feature.description}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                {feature.cta}
                <ArrowRight
                  className="h-4 w-4 group-hover/card:translate-x-1.5 transition-transform duration-300"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
