'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SearchX } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { Skeleton } from '@/components/ui/skeleton';
import { ProfileDetail } from '@/components/registry/profile-detail';
import {
  PublicApiError,
  fetchRegistryProfile,
} from '@/lib/public-api';
import type { RegistryProfile } from '@/lib/public-api';

type Status = 'loading' | 'ready' | 'not-found' | 'unavailable';

/**
 * Runtime fallback profile for officers added between deploys (whose slug has
 * no prerendered /registry/[slug] page yet). Directory cards link here only
 * for non-prerendered slugs.
 */

/*  Page wrapper — useSearchParams MUST be inside a Suspense boundary
    for the static export build to succeed (Next 16). */
export default function RegistryProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileInner />
    </Suspense>
  );
}

function ProfileSkeleton() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-5 w-96 mb-10" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </section>
  );
}

function ProfileInner() {
  const searchParams = useSearchParams();
  const slug = (searchParams.get('s') ?? '').trim();

  const [status, setStatus] = useState<Status>(slug ? 'loading' : 'not-found');
  const [profile, setProfile] = useState<RegistryProfile | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetchRegistryProfile(slug)
      .then((data) => {
        if (cancelled) return;
        setProfile(data);
        setStatus('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus(
          err instanceof PublicApiError && err.status === 404
            ? 'not-found'
            : 'unavailable',
        );
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === 'loading') {
    return <ProfileSkeleton />;
  }

  if (status === 'not-found' || status === 'unavailable') {
    return (
      <>
        <PageHero
          title="Registry Profile"
          breadcrumbs={[
            { label: 'Transparency', href: '/transparency' },
            { label: 'Registry', href: '/registry' },
            { label: 'Profile' },
          ]}
          accent="green"
        />
        <KenteSectionDivider />
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
          <FloatingShapes />
          <div className="relative max-w-xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl border-2 border-dashed border-border/50 p-12">
              <SearchX className="h-12 w-12 text-text-muted/30 mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold text-primary-dark mb-3">
                {status === 'not-found'
                  ? 'Profile not found'
                  : 'Profile unavailable right now'}
              </h2>
              <p className="text-base text-text-muted leading-relaxed mb-6">
                {status === 'not-found'
                  ? 'No verified officer matches this registry link. The officer may not yet be verified, or the link may be incorrect.'
                  : 'The registry service could not be reached. Please try again in a moment.'}
              </p>
              <Link
                href="/registry"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                Back to the Registry
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!profile) return null;

  return <ProfileDetail profile={profile} />;
}
