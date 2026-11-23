import type { Metadata } from 'next';
import { BarChart3, Landmark, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { TransparencyDashboard } from '@/components/transparency/transparency-dashboard';
import { JsonLd } from '@/components/seo/json-ld';
import { transparencyDatasetSchema } from '@/lib/json-ld';
import { fetchTransparencyAtBuild } from '@/lib/public-api-build';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Public Audit Findings Tracker',
  description:
    "Prototype audit findings dashboard showing illustrative aggregate views, pending institutional validation.",
  openGraph: {
    title: 'Public Audit Findings Tracker',
    description:
      "Prototype findings dashboard — data awaiting institutional validation.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function TransparencyPage() {
  const buildData = await fetchTransparencyAtBuild();

  return (
    <>
      <JsonLd data={transparencyDatasetSchema(buildData?.summary ?? null)} />

      <PageHero
        theme="transparency"
        title="Public Audit Findings Tracker"
        subtitle="Prototype aggregate findings dashboard. Displayed records demonstrate the interface and are not an approved statement of departmental performance."
        breadcrumbs={[{ label: 'Transparency' }]}
        accent="gold"
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
            <BarChart3 className="h-4 w-4 text-home-gold" aria-hidden="true" />
            <span className="text-sm text-text-muted">Aggregates only — no sensitive detail</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
            <Landmark className="h-4 w-4 text-home-gold" aria-hidden="true" />
            <span className="text-sm text-text-muted">Demonstration MDA comparison</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-home-gold" aria-hidden="true" />
            <span className="text-sm text-text-muted">Prototype data feed</span>
          </div>
        </div>
      </PageHero>

      <KenteSectionDivider />

      <TransparencyDashboard
        initialSummary={buildData?.summary ?? null}
        initialMdas={buildData?.mdas ?? null}
      />
    </>
  );
}
