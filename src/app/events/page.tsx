import { PageHero } from '@/components/layout/page-hero';
import type { Metadata } from 'next';
import { FloatingShapes } from '@/components/home/floating-shapes';
import { EventCard } from '@/components/events/event-card';
import { SAMPLE_EVENTS } from '@/lib/sample-content';


export const metadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming training programmes, coordination meetings, and awareness events from the Internal Audit Department.',
  openGraph: {
    title: 'Events',
    description:
      'Upcoming training programmes, coordination meetings, and awareness events from the Internal Audit Department.',
  },
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="Events"
        subtitle="Upcoming training programmes, coordination meetings, and awareness events from the Internal Audit Department."
        breadcrumbs={[{ label: 'Events' }]}
        accent="gold"
      />

      <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
        <FloatingShapes />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            {SAMPLE_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
