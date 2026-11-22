'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

export function LeadershipSpotlight() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section aria-labelledby="leadership-heading" className="bg-home-canvas py-16 lg:py-24">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid overflow-hidden rounded-2xl border border-border bg-white md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
        >
          <div className={cn(
            'relative aspect-[4/3] bg-primary/5 md:aspect-auto md:min-h-[480px]',
            isVisible && 'motion-safe:animate-[reveal_300ms_cubic-bezier(0.16,1,0.3,1)_backwards]',
          )}>
            <Image src="/images/leadership/solomon-wemegah.jpg" alt="Solomon Wemegah, Director of the Internal Audit Department" fill className="object-cover object-[50%_60%]" sizes="(max-width: 768px) 100vw, 520px" />
            <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-1.5 bg-brand-lime" />
          </div>
          <div
            className={cn(
              'flex flex-col justify-center p-7 sm:p-10 lg:p-14',
              isVisible && 'motion-safe:animate-[reveal_300ms_cubic-bezier(0.16,1,0.3,1)_backwards]',
            )}
            style={{ animationDelay: '80ms' }}
          >
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-primary">
              <span aria-hidden="true" className="h-px w-8 bg-brand-lime" />
              A welcome from the Director
            </p>
            <h2 id="leadership-heading" className="font-display text-3xl lg:text-4xl font-bold leading-tight text-text">
              Welcome to IAD Ghana.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text">
              On behalf of our team, I warmly welcome you to the official website of
              the Internal Audit Department (IAD), Ghana.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              As the headquarters of internal audit in Ghana’s Civil Service, we
              support Internal Audit Units across Ministries, Departments and Agencies
              to strengthen governance, improve controls and safeguard public resources.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              Explore our work, access resources and connect with us as we advance
              a culture of integrity, accountability and service to Ghana.
            </p>
            <div className="mt-7 border-t border-border pt-6">
              <h3 className="font-display text-xl font-bold text-text">Solomon Wemegah <span className="font-sans text-sm font-medium text-text-muted">FCCA</span></h3>
              <p className="mt-1 text-sm font-semibold text-primary">Director, Internal Audit Department</p>
            </div>
            <Link href="/about/leadership" className="group mt-6 inline-flex min-h-12 w-fit items-center gap-3 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Meet the Director <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
