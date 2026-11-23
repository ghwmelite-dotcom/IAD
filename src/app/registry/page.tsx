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
    "Prototype Internal Audit Class registry. Displayed records and credentials are awaiting institutional validation.",
  openGraph: {
    title: 'Internal Audit Class Registry',
    description:
      "Prototype Internal Audit Class registry. Displayed records and credentials are awaiting institutional validation.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function RegistryPage() {
  const entries = await fetchRegistryAtBuild();
  const staticPageCount = pageCount(entries?.length ?? 0);

  return (
    <>
      <PageHero
        theme="registry"
        title="Internal Audit Class Registry"
        subtitle="Prototype Internal Audit Class registry. Displayed records and credentials are awaiting institutional validation."
        breadcrumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Registry' }]}
        accent="green"
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
            <BadgeCheck className="h-4 w-4 text-home-gold" aria-hidden="true" />
            <span className="text-sm text-text-muted">Platform verification status</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-home-gold" aria-hidden="true" />
            <span className="text-sm text-text-muted">Institutional validation pending</span>
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
