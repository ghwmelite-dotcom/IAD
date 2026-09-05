import { PageHero } from '@/components/layout/page-hero';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { NewsCard } from '@/components/news/news-card';
import { SAMPLE_NEWS } from '@/lib/sample-content';

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="News"
        subtitle="Announcements, updates, and stories from the Internal Audit Department."
        breadcrumbs={[{ label: 'News' }]}
        accent="green"
      />

      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            {SAMPLE_NEWS.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
