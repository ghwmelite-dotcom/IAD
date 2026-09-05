import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { MapPin, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { SAMPLE_EVENTS } from '@/lib/sample-content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SAMPLE_EVENTS.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = SAMPLE_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={event.title}
        subtitle={event.location}
        breadcrumbs={[{ label: 'Events', href: '/events' }, { label: event.title }]}
        accent="gold"
      />

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-6 mb-10">
            <p className="flex items-center gap-2 text-base text-text-muted">
              <Calendar className="h-5 w-5 text-accent" aria-hidden="true" />
              {formatDate(event.startDate)}
              {event.endDate && event.endDate !== event.startDate
                ? ` – ${formatDate(event.endDate)}`
                : ''}
            </p>
            <p className="flex items-center gap-2 text-base text-text-muted">
              <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
              {event.location}
            </p>
          </div>

          <div className="space-y-6 text-lg text-text-muted leading-relaxed">
            {event.description ? <p>{event.description}</p> : (
              <p className="text-base italic text-text-muted/70">
                Full event details will be published here soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
