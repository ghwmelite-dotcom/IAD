'use client';

import Link from 'next/link';
import { TrendingUp, BadgeCheck, ShieldCheck, ArrowUpRight } from 'lucide-react';

const FEATURES = [
  {
    icon: TrendingUp,
    title: 'Public Audit Findings Tracker',
    description: 'Explore how approved, aggregated findings could be presented and followed through.',
    href: '/transparency',
    cta: 'Explore the dashboard',
  },
  {
    icon: BadgeCheck,
    title: 'Internal Audit Class Registry',
    description: 'A prototype directory for Class information, profiles and professional credentials.',
    href: '/registry',
    cta: 'Search the registry',
  },
  {
    icon: ShieldCheck,
    title: 'Certificate Verification',
    description: 'Preview a certificate record lookup. Official validity requires departmental confirmation.',
    href: '/verify',
    cta: 'Preview the checker',
  },
];

export function TransparencyShowcase() {
  return (
    <section aria-labelledby="transparency-heading" className="bg-home-canvas py-16 sm:py-20 lg:py-24" data-home-section="digital">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl bg-home-dark lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
          <div className="flex flex-col px-6 py-8 sm:p-10 lg:p-12">
            <p className="mb-7 flex items-center gap-3 font-brand text-sm font-medium text-accent-light"><span aria-hidden="true" className="h-px w-8 bg-accent-light/50" />Digital service previews</p>
            <h2 id="transparency-heading" className="max-w-lg font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">Exploring Better Digital Services</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">Tools designed around professional practice, clearer records and public accountability.</p>
            <div className="mt-8 border-t border-white/15 pt-6 lg:mt-auto lg:pt-8">
              <span className="font-brand text-xs font-medium text-accent-light">Prototype tools</span>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/70">Displayed data and credentials require institutional validation and permission to publish before official use.</p>
            </div>
          </div>
          <div className="border-t border-white/15 px-6 sm:px-10 lg:my-10 lg:border-t-0 lg:border-l lg:pr-12">
            {FEATURES.map(({ icon: Icon, title, description, href, cta }) => (
              <Link key={href} href={href} className="group flex items-start gap-4 border-b border-white/15 py-7 last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-light sm:gap-6">
                <Icon className="mt-1 h-6 w-6 shrink-0 text-accent-light" strokeWidth={1.5} aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-brand text-lg font-semibold leading-snug text-white sm:text-xl">{title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-3 font-brand text-xs font-semibold text-accent-light">{cta}<ArrowUpRight className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
