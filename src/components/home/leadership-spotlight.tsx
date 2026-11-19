import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function LeadershipSpotlight() {
  return (
    <section aria-labelledby="leadership-heading" className="bg-surface py-20 lg:py-28">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-border bg-white md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="relative aspect-[4/3] bg-primary/5 md:aspect-auto md:min-h-[480px]">
            <Image src="/images/leadership/solomon-wemegah.jpg" alt="Solomon Wemegah" fill className="object-cover object-[50%_60%]" sizes="(max-width: 768px) 100vw, 520px" />
            <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-1.5 bg-brand-lime" />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-16">
            <h2 id="leadership-heading" className="mb-7 text-sm font-semibold text-primary">Our Leadership</h2>
            <h3 className="font-display text-3xl lg:text-4xl font-bold leading-tight text-text">Solomon Wemegah</h3>
            <p className="mt-3 text-base font-semibold text-primary">Director, Internal Audit Department</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted">
              Leading the headquarters of internal audit in Ghana’s Civil Service,
              coordinating Internal Audit Units across Ministries, Departments and
              Agencies with a commitment to assurance, integrity and accountability.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
              <div><dt className="text-sm text-text-muted">Professional designation</dt><dd className="mt-1 text-lg font-semibold text-text">FCCA</dd></div>
              <div><dt className="text-sm text-text-muted">Audit &amp; finance experience</dt><dd className="mt-1 text-lg font-semibold text-text">30+ years</dd></div>
            </dl>
            <Link href="/about/leadership" className="mt-8 inline-flex min-h-12 w-fit items-center gap-3 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Meet the Director <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
