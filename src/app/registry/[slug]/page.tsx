import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProfileDetail } from '@/components/registry/profile-detail';
import { JsonLd } from '@/components/seo/json-ld';
import { personSchema } from '@/lib/json-ld';
import {
  fetchRegistryAtBuild,
  fetchRegistryProfileAtBuild,
} from '@/lib/public-api-build';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// One static profile page per verified officer visible at build time.
// Officers verified between deploys are served by /registry/profile?s=slug.
export async function generateStaticParams() {
  const entries = await fetchRegistryAtBuild();
  return (entries ?? []).map((e) => ({ slug: e.public_slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = await fetchRegistryProfileAtBuild(slug);
  if (!profile) return {};

  const description = [
    `${profile.name} — ${profile.grade ?? 'Internal Audit Class officer'}`,
    profile.mda_name ? `at ${profile.mda_name}` : null,
    'Verified officer on the Internal Audit Class Registry.',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    title: `${profile.name} — IAC Registry`,
    description,
    openGraph: {
      title: `${profile.name} — IAC Registry`,
      description,
      type: 'profile',
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: { canonical: `/registry/${slug}/` },
  };
}

export default async function RegistrySlugPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = await fetchRegistryProfileAtBuild(slug);
  if (!profile) {
    notFound();
  }

  return (
    <>
      <JsonLd data={personSchema(profile, slug)} />
      <ProfileDetail profile={profile} />
    </>
  );
}
