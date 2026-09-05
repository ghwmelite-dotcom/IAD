import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { AUDIT_UNITS } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return AUDIT_UNITS.map((unit) => ({ slug: unit.slug }));
}

export default async function AuditUnitDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const unit = AUDIT_UNITS.find((u) => u.slug === slug);

  if (!unit) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={unit.name}
        subtitle={unit.description.length > 160 ? unit.description.slice(0, 160) + '…' : unit.description}
        breadcrumbs={[
          { label: 'Audit Units', href: '/audit-units' },
          { label: unit.shortName },
        ]}
        accent="green"
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl">
          <span className="text-sm font-bold text-accent uppercase tracking-wider block mb-3">
            {unit.shortName}
          </span>

          <div className="space-y-6 text-lg text-text-muted leading-relaxed">
            <p>{unit.description}</p>
            <p>
              This Internal Audit Unit is co-ordinated and monitored by the Internal Audit
              Department of the Office of the Head of the Civil Service, which also manages
              postings, secondment, and training for its officers.
            </p>
            {/* TODO(rebrand): add unit head, contact details, and recent reports. */}
          </div>
        </div>
      </div>
    </>
  );
}
