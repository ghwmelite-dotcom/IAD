'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

export function LeadershipSpotlight() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section ref={ref} aria-labelledby="leadership-heading" className="bg-white py-16 sm:py-20 lg:py-24" data-home-section="director">
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 sm:px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-24 lg:px-8">
        <div>
          <p className="mb-6 flex items-center gap-3 font-brand text-sm font-medium text-home-gold">
            <span aria-hidden="true" className="h-px w-8 bg-home-gold/50" />
            A welcome from the Director
          </p>
          <h2 id="leadership-heading" className="max-w-xl font-display text-3xl font-semibold leading-tight text-home-ink sm:text-4xl lg:text-5xl">
            Welcome to IAD Ghana.
          </h2>
          <blockquote className="mt-8 border-l-2 border-home-gold/40 pl-5 font-display text-xl leading-relaxed text-home-ink sm:text-2xl">
            On behalf of our team, I warmly welcome you to the official website of the Internal Audit Department (IAD), Ghana.
          </blockquote>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-home-muted">
            We support effective internal audit systems at OHCS, advise management
            and help safeguard the Office’s resources. We also manage the Civil
            Service’s Internal Audit Class through training, MDA unit coordination,
            equitable staffing support, counselling and consultancy.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-home-muted">
            Explore our work, access resources and connect with us as we advance
            a culture of integrity, accountability and service to Ghana.
          </p>
          <Link href="/about/leadership" className="group mt-8 inline-flex min-h-12 items-center gap-6 rounded-full border border-home-border px-6 py-3 font-brand text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary hover:bg-home-canvas focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            Meet the Director
            <ArrowUpRight className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        <figure className={cn('mx-auto w-full max-w-md', isVisible && 'motion-safe:animate-[reveal_300ms_ease-out_backwards]')}>
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-2 rounded-[2rem] border border-home-gold/20 sm:-inset-3" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-home-canvas">
              <Image
                src="/images/leadership/solomon-wemegah-iaa-2026.jpeg"
                alt="Solomon Wemegah, Director of the Internal Audit Department"
                fill
                className="object-cover object-[42%_50%]"
                sizes="(max-width: 767px) min(100vw - 48px, 448px), (max-width: 1200px) 42vw, 448px"
              />
            </div>
            <figcaption className="relative mx-4 -mt-16 rounded-2xl border border-home-border bg-white px-5 py-5 shadow-lg shadow-home-ink/5 sm:mx-6 sm:px-7">
              <h3 className="font-display text-2xl font-semibold text-home-ink">Solomon Wemegah</h3>
              <p className="mt-1 font-brand text-sm leading-relaxed text-home-muted">Director, Internal Audit Department</p>
              <span aria-hidden="true" className="mt-4 block h-0.5 w-10 bg-home-gold" />
            </figcaption>
          </div>
          <a
            href="https://iaa.gov.gh/2026/10/30/iaa-inaugurates-audit-committee-of-data-protection-commission/"
            className="mt-5 inline-flex min-h-11 items-center font-brand text-xs text-home-muted underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Photograph: Internal Audit Agency, October 2026
          </a>
        </figure>
      </div>
    </section>
  );
}
