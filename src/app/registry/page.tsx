import { BadgeCheck, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { RegistryDirectory } from '@/components/registry/registry-directory';
import { fetchRegistryAtBuild } from '@/lib/public-api-build';
import { pageCount } from '@/lib/registry-pagination';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Internal Audit Class Registry',
  description:
    "The public register of verified Internal Audit Class officers serving across Ghana's Civil Service — search by name or MDA and view verified credentials, CPD standing, and certificates.",
  openGraph: {
    title: 'Internal Audit Class Registry',
    description:
      "The public register of verified Internal Audit Class officers serving across Ghana's Civil Service.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function RegistryPage() {
  const entries = await fetchRegistryAtBuild();
  const staticPageCount = pageCount(entries?.length ?? 0);

  return (
    <>
      <PageHero
        title="Internal Audit Class Registry"
        subtitle="The public register of verified Internal Audit Class officers serving across Ghana's Civil Service."
        breadcrumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Registry' }]}
        accent="green"
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <BadgeCheck className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Verified officers only</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Credentials checked by the department</span>
          </div>
        </div>
      </PageHero>

      <KenteSectionDivider />

      <RegistryDirectory
        initialEntries={entries}
        page={1}
        staticPageCount={staticPageCount}
        staticSlugs={(entries ?? []).map((e) => e.public_slug)}
      />
    </>
  );
}
