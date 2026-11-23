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
        theme="knowledge"
        title="Knowledge Hub"
        subtitle="A resource catalogue preview supporting audit practice and officer development. Use the official OHCS downloads catalogue for published documents."
        breadcrumbs={[{ label: 'Knowledge Hub' }]}
        accent="gold"
      >
        <div className="flex flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
            <BookOpen className="h-4 w-4 text-home-gold" aria-hidden="true" />
            <span className="text-sm text-text-muted">Publication approval pending</span>
          </div>
          <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
            <Download className="h-4 w-4 text-home-gold" aria-hidden="true" />
            <span className="text-sm text-text-muted">Free to download</span>
          </div>
        </div>
      </PageHero>

      <KenteSectionDivider />

      <JsonLd data={knowledgeHubSchema()} />

      <KnowledgeBrowser mode="public" initial={initial} />
    </>
  );
}
