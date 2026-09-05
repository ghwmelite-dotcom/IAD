import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BadgeCheck, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { KenteSectionDivider } from '@/components/kente/kente-section-divider';
import { RegistryDirectory } from '@/components/registry/registry-directory';
import { fetchRegistryAtBuild } from '@/lib/public-api-build';
import { isValidPage, pageCount, registryPageHref } from '@/lib/registry-pagination';

interface PageProps {
  params: Promise<{ n: string }>;
}

// Static pages 2..N over the build-time directory snapshot. Page 1 is
// /registry itself. Next 16 forbids a dynamic route with zero prerendered
// paths under output:'export', so when the directory fits on one page we
// emit a placeholder page-2 (renders notFound(), excluded from the sitemap)
// rather than failing the build. Real pages appear automatically once the
// registry grows past REGISTRY_PAGE_SIZE.
export async function generateStaticParams() {
  const entries = await fetchRegistryAtBuild();
  const count = pageCount(entries?.length ?? 0);
  if (count < 2) return [{ n: '2' }];
  return Array.from({ length: count - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { n } = await params;
  const page = Number.parseInt(n, 10);
  return {
    title: `Internal Audit Class Registry — Page ${page}`,
    description: `Page ${page} of the public register of verified Internal Audit Class officers in Ghana's Civil Service.`,
    alternates: { canonical: registryPageHref(page) },
  };
}

export default async function RegistryPageN({ params }: PageProps) {
  const { n } = await params;
  const page = Number.parseInt(n, 10);

  const entries = await fetchRegistryAtBuild();
  const total = entries?.length ?? 0;

  // Pages outside the static set are not generated; guard stale builds too.
  if (!entries || !isValidPage(page, total) || page === 1) {
    notFound();
  }

  return (
    <>
      <PageHero
        title="Internal Audit Class Registry"
        subtitle={`Verified Internal Audit Class officers — page ${page} of ${pageCount(total)}.`}
        breadcrumbs={[
          { label: 'Transparency', href: '/transparency' },
          { label: 'Registry', href: '/registry' },
          { label: `Page ${page}` },
        ]}
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
        page={page}
        staticPageCount={pageCount(total)}
        staticSlugs={entries.map((e) => e.public_slug)}
      />
    </>
  );
}
