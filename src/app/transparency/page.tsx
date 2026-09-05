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
    "Live, aggregate statistics on audit findings raised and resolved across Ghana's Ministries, Departments and Agencies — resolution rates, severity and category breakdowns, 12-month trends, and a risk heat map.",
  openGraph: {
    title: 'Public Audit Findings Tracker',
    description:
      "Live, aggregate statistics on audit findings raised and resolved across Ghana's MDAs.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function TransparencyPage() {
  const buildData = await fetchTransparencyAtBuild();

  return (
    <>
      <JsonLd data={transparencyDatasetSchema(buildData?.summary ?? null)} />

      <PageHero
        title="Public Audit Findings Tracker"
        subtitle="Live, aggregate statistics on audit findings raised and resolved across Ghana's MDAs — because accountability should be visible."
        breadcrumbs={[{ label: 'Transparency' }]}
        accent="gold"
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <BarChart3 className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Aggregates only — no sensitive detail</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <Landmark className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Every covered MDA, side by side</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Refreshed automatically</span>
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
