import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { formatDateShort } from '@/lib/utils';
import { SAMPLE_NEWS } from '@/lib/sample-content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SAMPLE_NEWS.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = SAMPLE_NEWS.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt ?? undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = SAMPLE_NEWS.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={article.title}
        subtitle={article.publishedAt ? formatDateShort(article.publishedAt) : undefined}
        breadcrumbs={[{ label: 'News', href: '/news' }, { label: article.title }]}
        accent="green"
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl space-y-6 text-lg text-text-muted leading-relaxed">
          <p>{article.excerpt}</p>
          {article.content ? <p>{article.content}</p> : (
            <p className="text-base italic text-text-muted/70">
              The full article will be published here soon.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
