import { BookOpen, Download } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { JsonLd } from '@/components/seo/json-ld';
import { KnowledgeBrowser } from '@/components/knowledge/knowledge-browser';
import { knowledgeHubSchema } from '@/lib/json-ld';
import { fetchKnowledgeAtBuild } from '@/lib/public-api-build';

export default async function PublicationsPage() {
  const initial = await fetchKnowledgeAtBuild();

  return (
    <>
      <PageHero
        title="Knowledge Hub"
        subtitle="Manuals, templates, standards, circulars, guidelines, reports, forms and policies from the Internal Audit Department — all in one place."
        breadcrumbs={[{ label: 'Knowledge Hub' }]}
        accent="gold"
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <BookOpen className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Official documents only</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <Download className="h-4 w-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white/60">Free to download</span>
          </div>
        </div>
      </PageHero>

      <KenteSectionDivider />

      <JsonLd data={knowledgeHubSchema()} />

      <KnowledgeBrowser mode="public" initial={initial} />
    </>
  );
}
