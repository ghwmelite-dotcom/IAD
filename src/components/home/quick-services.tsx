'use client';

import Link from 'next/link';
import { FileSearch, ShieldAlert, FileText, Download, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/layout/language-context';
import type { Dictionary } from '@/lib/i18n';

const services: {
  icon: typeof FileSearch;
  key: keyof Dictionary['quickServices']['cards'];
  href: string;
}[] = [
  { icon: FileSearch, key: 'specialAudit', href: '/services/special-audit' },
  { icon: ShieldAlert, key: 'reportFraud', href: '/services/report-fraud' },
  { icon: FileText, key: 'rti', href: '/services/rti' },
  { icon: Download, key: 'publications', href: '/publications' },
];

export function QuickServices() {
  const { dict } = useLanguage();

  return (
    <section aria-labelledby="services-heading" className="bg-home-canvas pt-16 sm:pt-20 lg:pt-24" data-home-section="services">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid items-end gap-5 lg:grid-cols-2 lg:gap-20">
          <h2 id="services-heading" className="max-w-xl font-display text-3xl font-semibold leading-tight text-home-ink sm:text-4xl lg:text-5xl">
            {dict.quickServices.titleA} {dict.quickServices.titleAccent}?
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-home-muted lg:pb-1">{dict.quickServices.subtitle}</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-home-border bg-home-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, key, href }) => (
            <Link key={href} href={href} className="group grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 bg-white p-6 transition-colors duration-200 hover:bg-home-canvas focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary lg:flex lg:flex-col lg:p-8">
              <Icon className="mt-1 h-6 w-6 shrink-0 text-home-gold lg:mb-8" strokeWidth={1.5} aria-hidden="true" />
              <div className="lg:flex-1">
                <h3 className="mb-3 font-brand text-lg font-semibold leading-snug text-home-ink lg:text-xl">{dict.quickServices.cards[key].title}</h3>
                <p className="text-sm leading-relaxed text-home-muted">{dict.quickServices.cards[key].description}</p>
              </div>
              <span className="mt-1 inline-flex items-center gap-3 font-brand text-sm font-semibold text-primary lg:mt-7">
                <span className="sr-only lg:not-sr-only">{dict.quickServices.getStarted}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
