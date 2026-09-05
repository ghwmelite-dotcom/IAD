'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Award,
  BadgeCheck,
  CalendarDays,
  GraduationCap,
  Landmark,
  SearchX,
  TrendingUp,
  UserRound,
} from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { Skeleton } from '@/components/ui/skeleton';
import {
  PublicApiError,
  fetchRegistryProfile,
  formatDate,
} from '@/lib/public-api';
import type { RegistryProfile } from '@/lib/public-api';

type Status = 'loading' | 'ready' | 'not-found' | 'unavailable';

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

  const summaryTiles = [
    { icon: GraduationCap, label: 'Grade', value: profile.grade ?? '—' },
    { icon: Landmark, label: 'MDA', value: profile.mda_name ?? '—' },
    { icon: TrendingUp, label: 'CPD Points', value: String(profile.cpdPoints) },
    {
      icon: CalendarDays,
      label: 'Member Since',
      value: formatDate(profile.memberSince),
    },
  ];

  return (
    <>
      <PageHero
        title={profile.name}
        subtitle={profile.grade ?? undefined}
        breadcrumbs={[
          { label: 'Transparency', href: '/transparency' },
          { label: 'Registry', href: '/registry' },
          { label: profile.name },
        ]}
        accent="green"
      >
        {profile.verified && (
          <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mt-2">
            <BadgeCheck className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">
              Verified Internal Audit Class officer
            </span>
          </div>
        )}
      </PageHero>

      <KenteSectionDivider />

      <section className="py-16 lg:py-20 relative overflow-hidden" style={{ backgroundColor: '#F0F7F1' }}>
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {/* Summary tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {summaryTiles.map((tile) => (
              <div
                key={tile.label}
                className="bg-white rounded-2xl border-2 border-border/40 p-5"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <tile.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted/70">
                    {tile.label}
                  </span>
                </div>
                <p className="font-semibold text-primary-dark leading-snug">{tile.value}</p>
              </div>
            ))}
          </div>

          {/* Verified credentials */}
          <div className="bg-white rounded-2xl border-2 border-border/40 shadow-sm overflow-hidden mb-10">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-border/30">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
                <BadgeCheck className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-primary-dark">
                  Verified Credentials
                </h2>
                <p className="text-sm text-text-muted">
                  Professional qualifications confirmed by the department.
                </p>
              </div>
            </div>
            {profile.credentials.length === 0 ? (
              <p className="px-6 py-6 text-sm text-text-muted">
                No verified credentials are published for this officer yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-border/40 bg-primary/[0.03]">
                      <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-text-muted/70">
                        Body
                      </th>
                      <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-text-muted/70">
                        Designation
                      </th>
                      <th className="px-6 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-text-muted/70">
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.credentials.map((cred) => (
                      <tr
                        key={`${cred.body}-${cred.year ?? 'na'}`}
                        className="border-b border-border/30 last:border-0"
                      >
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10 text-xs font-bold text-primary">
                            {cred.body}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-text-muted">{cred.designation}</td>
                        <td className="px-6 py-4 text-right tabular-nums text-text-muted">
                          {cred.year ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Linked certificates — only rendered when the API exposes them */}
          {profile.certificates && profile.certificates.length > 0 && (
            <div className="bg-white rounded-2xl border-2 border-border/40 shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-5 border-b border-border/30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-sm">
                  <Award className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-primary-dark">
                    Certificates
                  </h2>
                  <p className="text-sm text-text-muted">
                    IAD-issued certificates — anyone can confirm them with the verify code.
                  </p>
                </div>
              </div>
              <div className="divide-y divide-border/30">
                {profile.certificates.map((cert) => (
                  <div
                    key={cert.serial}
                    className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-primary-dark">{cert.title}</p>
                      <p className="text-sm text-text-muted mt-0.5">
                        Serial {cert.serial} · Issued {formatDate(cert.issuedAt)}
                      </p>
                    </div>
                    <Link
                      href={`/verify?code=${encodeURIComponent(cert.verifyCode)}`}
                      className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/5 border-2 border-primary/10 text-sm font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                    >
                      <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                      Verify {cert.verifyCode}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="mt-10 flex items-start gap-3 text-sm text-text-muted">
            <UserRound className="h-4 w-4 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <p>
              This profile shows only information the officer and the department have
              agreed to make public. To report a concern about this listing,{' '}
              <Link href="/contact" className="font-semibold text-primary hover:underline">
                contact the department
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
