'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Building2 } from 'lucide-react';
import { AUDIT_UNITS } from '@/lib/constants';

export function AuditUnitsGrid() {
  return (
    <section aria-labelledby="audit-units-heading" className="bg-white py-16 sm:py-20 lg:py-24" data-home-section="units">
      <div className="mx-auto grid max-w-content gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.65fr)] lg:gap-20 lg:px-8">
        <div>
          <span className="mb-6 inline-flex items-center rounded-full border border-home-gold/20 bg-home-canvas px-3 py-1.5 font-brand text-xs font-medium text-home-gold">Illustrative directory</span>
          <h2 id="audit-units-heading" className="font-display text-3xl font-semibold leading-tight text-home-ink sm:text-4xl lg:text-5xl">Internal Audit Units</h2>
          <p className="mt-6 text-base leading-relaxed text-home-muted">IAD co-ordinates and monitors Internal Audit Units in MDAs, supports equitable staffing and provides training, counselling and consultancy for the Internal Audit Class.</p>
          <p className="mt-4 text-sm leading-relaxed text-home-muted">These example entries demonstrate the directory. An approved, current unit list will replace them.</p>
          <Link href="/audit-units" className="mt-7 inline-flex min-h-12 items-center gap-5 font-brand text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            View all audit units <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-home-border bg-home-border sm:grid-cols-2">
          {AUDIT_UNITS.map((unit) => (
            <Link key={unit.slug} href={'/audit-units/' + unit.slug} className="group flex min-w-0 items-center gap-4 bg-white px-5 py-5 transition-colors duration-200 hover:bg-home-canvas focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary sm:px-6">
              <Building2 className="h-5 w-5 shrink-0 text-home-gold" strokeWidth={1.5} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <span className="mb-1 block font-brand text-xs text-home-muted">{unit.shortName}</span>
                <h3 className="font-brand text-sm font-medium leading-relaxed text-home-ink">{unit.name}</h3>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-home-muted/70 transition-colors duration-200 group-hover:text-primary" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
