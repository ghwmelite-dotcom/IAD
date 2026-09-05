'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import { FloatingShapes } from '@/components/home/floating-shapes';

// TODO(content): add the Director's official portrait when available
// (set photoUrl — the monogram placeholder shows until then).
const LEADERS = [
  {
    name: 'Solomon Wemegah',
    title: 'Director, Internal Audit Department',
    bio: 'Director of the Internal Audit Department since April 2025, coordinating the work of Internal Audit Units across all MDAs of the Civil Service. A Fellow of the Association of Chartered Certified Accountants (FCCA) with over 30 years in public and private sector audit and finance, including more than a decade as Director of Internal Audit & Inspectorate at the Ministry of Foreign Affairs and Regional Integration.',
    photoUrl: '/images/leadership/solomon-wemegah.jpg',
    imagePosition: '50% 30%',
    imageScale: 'scale-100',
  },
];

export function LeadershipSpotlight() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} aria-labelledby="leadership-heading" className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: '#F0F7F1' }}>
      <FloatingShapes />
      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — centered */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-sm font-semibold text-primary tracking-wide">
              Meet the Team
            </span>
          </div>
          <h2
            id="leadership-heading"
            className="font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-5"
          >
            Our{' '}
            <span className="relative inline-block">
              Leadership
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/15 rounded-sm -z-10"
              />
            </span>
          </h2>
        </div>

        <div className="flex justify-center mb-14">
          <Link
            href="/about/leadership"
            className="text-sm font-medium text-primary flex items-center gap-1.5 hover:gap-2.5 transition-all px-4 py-2 rounded-full bg-primary/5 border border-primary/10 hover:border-primary/30"
          >
            View all leadership <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div
          className={cn(
            'max-w-3xl mx-auto',
            isVisible && 'animate-[reveal_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]',
            !isVisible && 'opacity-0',
          )}
        >
          {LEADERS.map((leader) => (
            <div
              key={leader.name}
              className="group relative rounded-2xl overflow-hidden bg-primary-dark shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              {/* Gold top accent line */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-1 z-10"
                style={{
                  background: 'linear-gradient(90deg, #D4A017, #E8C547 50%, #D4A017)',
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Portrait — cropped to the person, or monogram placeholder */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  {leader.photoUrl ? (
                    <Image
                      src={leader.photoUrl}
                      alt={leader.name}
                      fill
                      className={cn('object-cover', leader.imageScale)}
                      style={{ objectPosition: leader.imagePosition }}
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-primary"
                    >
                      <span className="font-display text-6xl font-extrabold tracking-[4px] text-accent/70">
                        IAD
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 hidden sm:block"
                    style={{
                      background: 'linear-gradient(to right, transparent 50%, rgba(13,59,19,1) 100%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 sm:hidden"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 40%, rgba(13,59,19,1) 100%)',
                    }}
                  />
                </div>

                {/* Text panel */}
                <div className="p-6 lg:p-8 flex flex-col justify-center relative">
                  {/* Subtle Kente pattern in the background */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: [
                        'repeating-linear-gradient(0deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 32px)',
                        'repeating-linear-gradient(90deg, #D4A017 0px, #D4A017 1px, transparent 1px, transparent 32px)',
                      ].join(', '),
                    }}
                  />

                  {/* Gold accent bar */}
                  <div
                    aria-hidden="true"
                    className="w-12 h-1 rounded-full mb-5"
                    style={{
                      background: 'linear-gradient(90deg, #D4A017, #E8C547)',
                    }}
                  />

                  {/* Title label */}
                  <p className="text-accent text-xs font-semibold uppercase tracking-[0.15em] mb-2">
                    {leader.title}
                  </p>

                  {/* Name */}
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-3 leading-tight">
                    {leader.name}
                  </h3>

                  {/* Thin gold divider */}
                  <div
                    aria-hidden="true"
                    className="w-full h-px mb-5"
                    style={{
                      background: 'linear-gradient(90deg, rgba(212,160,23,0.4), transparent 70%)',
                    }}
                  />

                  {/* Bio */}
                  <p className="text-white/75 text-base leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>

              {/* Gold bottom accent line */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.3) 30%, rgba(212,160,23,0.3) 70%, transparent)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
