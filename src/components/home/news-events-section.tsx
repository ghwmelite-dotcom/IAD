'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, MapPin } from 'lucide-react';
import { SAMPLE_NEWS, SAMPLE_EVENTS } from '@/lib/sample-content';
import { formatDateShort } from '@/lib/utils';

export function NewsEventsSection() {
  const featured = SAMPLE_NEWS[0];
  if (!featured) return null;

  return (
    <section aria-labelledby="news-events-heading" className="bg-white py-16 sm:py-20 lg:py-24" data-home-section="news">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid items-end gap-5 lg:grid-cols-2 lg:gap-20">
          <h2 id="news-events-heading" className="font-display text-3xl font-semibold leading-tight text-home-ink sm:text-4xl lg:text-5xl">News & Events</h2>
          <p className="max-w-xl text-sm leading-relaxed text-home-muted">Sample news and events demonstrate the editorial layout. Confirmed departmental announcements will replace these examples.</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-brand text-base font-semibold text-home-ink">Sample News</h3>
              <Link href="/news" className="inline-flex min-h-11 items-center gap-3 font-brand text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">View all <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <article className="overflow-hidden rounded-3xl border border-home-border bg-white">
              <figure className="relative">
                <div className="relative aspect-[16/9] overflow-hidden bg-home-canvas">
                  <Image src="/images/hero/audit-training.jpg" alt="Archive photograph of an Internal Audit Agency training session" fill className="object-cover" sizes="(max-width: 1023px) 100vw, 58vw" />
                </div>
                <figcaption className="border-b border-home-border px-6 py-2 font-brand text-xs leading-relaxed text-home-muted">Archive photograph: Internal Audit Agency. Article below is sample content.</figcaption>
              </figure>
              <Link href={'/news/' + featured.slug} className="group block p-6 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary sm:p-8">
                <time dateTime={featured.publishedAt ?? undefined} className="font-brand text-xs text-home-gold">{featured.publishedAt ? formatDateShort(featured.publishedAt) : ''}</time>
                <h4 className="mt-3 font-display text-xl font-semibold leading-snug text-home-ink transition-colors duration-200 group-hover:text-primary sm:text-2xl">{featured.title.replace(/^Sample:\s*/, '')}</h4>
                <p className="mt-4 text-sm leading-relaxed text-home-muted">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-4 font-brand text-sm font-semibold text-primary">Read the story <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            </article>
          </div>
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-brand text-base font-semibold text-home-ink">Sample Events</h3>
              <Link href="/events" className="inline-flex min-h-11 items-center gap-3 font-brand text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">View all <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="border-t border-home-border">
              {SAMPLE_EVENTS.map((event) => {
                const date = new Date(event.startDate);
                return (
                  <Link key={event.id} href={'/events/' + event.slug} className="group flex items-start gap-4 border-b border-home-border py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:gap-6">
                    <time dateTime={event.startDate} className="flex w-12 shrink-0 flex-col font-brand text-home-gold sm:w-14">
                      <span className="text-3xl font-medium leading-none tracking-tight">{date.getUTCDate().toString().padStart(2, '0')}</span>
                      <span className="mt-2 text-xs">{date.toLocaleDateString('en-GH', { month: 'short', timeZone: 'UTC' })}</span>
                    </time>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-brand text-base font-semibold leading-relaxed text-home-ink transition-colors duration-200 group-hover:text-primary">{event.title.replace(/^Sample:\s*/, '')}</h4>
                      <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-home-muted"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{event.location}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-home-muted transition-colors duration-200 group-hover:text-primary" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
            <div className="mt-8">
              <h3 className="mb-4 font-brand text-base font-semibold text-home-ink">Also in the news</h3>
              {SAMPLE_NEWS.slice(1).map((article) => (
                <Link key={article.id} href={'/news/' + article.slug} className="group flex items-start gap-5 border-t border-home-border py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  <div className="min-w-0 flex-1">
                    <time dateTime={article.publishedAt ?? undefined} className="font-brand text-xs text-home-gold">{article.publishedAt ? formatDateShort(article.publishedAt) : ''}</time>
                    <h4 className="mt-3 font-display text-lg font-semibold leading-snug text-home-ink transition-colors duration-200 group-hover:text-primary">{article.title.replace(/^Sample:\s*/, '')}</h4>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-home-muted" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
