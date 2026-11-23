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
      'A demonstration of how approved, aggregated findings could be presented. The displayed totals are not verified departmental performance.',
    href: '/transparency',
    cta: 'Explore the dashboard',
    tag: 'Prototype',
  },
  {
    icon: BadgeCheck,
    title: 'Internal Audit Class Registry',
    description:
      'A prototype directory to explore Class information. Profiles and credentials require validation and permission before official publication.',
    href: '/registry',
    cta: 'Search the registry',
    tag: 'Prototype',
  },
  {
    icon: ShieldCheck,
    title: 'Certificate Verification',
    description:
      'A prototype record checker. Official issuance, record validation and certificate policy must be confirmed before production use.',
    href: '/verify',
    cta: 'Verify a certificate',
    tag: 'Prototype',
  },
];

export function TransparencyShowcase() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref}
      aria-labelledby="transparency-heading"
      className="relative border-y border-home-border bg-home-canvas py-20 lg:py-28"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-home-gold">
              <span aria-hidden="true" className="h-px w-10 bg-home-gold/50" />
              Digital Service Previews
            </p>
            <h2 id="transparency-heading" className="max-w-2xl font-display text-3xl font-bold leading-tight text-home-ink sm:text-4xl lg:text-5xl">
              Exploring Better Digital Services
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-home-muted lg:pb-1 lg:text-lg">
            Explore three prototype tools. Institutional validation and approval are required before these become official public services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-7">
          {FEATURES.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className={cn(
                'group/card flex flex-col rounded-2xl border border-home-border bg-white p-7 lg:p-9',
                'transition-[border-color,box-shadow,transform] duration-200 hover:border-home-gold/50 hover:shadow-lg motion-safe:hover:-translate-y-1',
                'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
                isVisible && 'motion-safe:animate-[reveal_300ms_ease-out_backwards]',
              )}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="mb-8 flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-home-border bg-home-canvas text-home-ink">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="rounded-full border border-home-border px-3 py-1 font-brand text-xs font-medium text-home-muted">
                  {feature.tag}
                </span>
              </div>
              <h3 className="mb-4 font-display text-xl font-bold leading-snug text-home-ink lg:text-2xl">
                {feature.title}
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-home-muted lg:text-base">{feature.description}</p>
              <span className="mt-auto inline-flex items-center gap-3 border-t border-home-border pt-5 font-brand text-sm font-bold text-primary">
                {feature.cta}
                <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/card:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
