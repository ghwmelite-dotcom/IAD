'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/layout/language-context';

const SLIDE_INTERVAL_MS = 8000;
const SWIPE_THRESHOLD_PX = 50;
const PHOTOS = [
  {
    src: '/images/hero/ohcs-audit-committee.jpg',
    alt: 'Participants at the OHCS Audit Committee inauguration in 2022',
    position: '60% 38%',
    portrait: false,
    year: '2022',
    source: 'https://iaa.gov.gh/2022/09/12/iaa-inaugurates-the-audit-committee-of-the-ohcs/',
  },
  {
    src: '/images/hero/audit-training.jpg',
    alt: 'An Internal Audit Agency working-paper management training session in 2024',
    position: '50% 35%',
    portrait: false,
    year: '2024',
    source: 'https://iaa.gov.gh/2024/07/08/training-workshop/',
  },
  {
    src: '/images/hero/audit-committee-psrs.jpeg',
    alt: 'The inauguration of the Public Sector Reforms Secretariat Audit Committee in 2025',
    position: '65% 40%',
    portrait: false,
    year: '2025',
    source: 'https://iaa.gov.gh/2025/06/13/iaa-inaugurates-the-audit-committee-of-psrs/',
  },
  {
    src: '/images/hero/civil-service-office.jpg',
    alt: 'An official seated at a desk between the Ghana and Civil Service flags',
    position: '50% 58%',
    portrait: true,
    year: null,
    source: null,
  },
] as const;

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}
const getHidden = () => document.hidden;
const getServerPaused = () => true;
const CONTROL = 'inline-flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

export function Hero() {
  const { dict } = useLanguage();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerPaused);
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, getServerPaused);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const rotating = playing && !hovered && !hidden && !reducedMotion;

  const slides = [
    { label: dict.hero.assuranceLabel, title: `${dict.hero.headlineA} ${dict.hero.headlineAccent} ${dict.hero.headlineB}`, body: dict.hero.subtitle, href: '/audit-units', cta: dict.hero.ctaUnits },
    { label: dict.hero.practiceLabel, title: dict.hero.practiceTitle, body: dict.hero.practiceBody, href: '/publications', cta: dict.nav.publications },
    { label: dict.hero.accountabilityLabel, title: dict.hero.accountabilityTitle, body: dict.hero.accountabilityBody, href: '/transparency', cta: dict.nav.transparency },
    { label: dict.hero.serviceLabel, title: dict.hero.serviceTitle, body: dict.hero.serviceBody, href: '/about', cta: dict.nav.mandate },
  ];
  const photo = PHOTOS[active]!;

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % PHOTOS.length), SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [rotating]);

  function selectSlide(index: number) {
    setActive((index + PHOTOS.length) % PHOTOS.length);
    setPlaying(false);
  }

  return (
    <section
      aria-label="Hero"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-ink text-white touch-pan-y"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={event => { if (event.target.matches(':focus-visible')) setPlaying(false); }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          selectSlide(active + (event.key === 'ArrowRight' ? 1 : -1));
        }
      }}
      onPointerDown={event => {
        if (event.pointerType === 'touch') gesture.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerCancel={() => { gesture.current = null; }}
      onPointerUp={event => {
        const start = gesture.current;
        gesture.current = null;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) >= SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) selectSlide(active + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="absolute inset-0 -z-20">
        {PHOTOS.map((item, index) => (
          <div key={item.src} aria-hidden={index !== active} className={cn('absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none', index === active ? 'opacity-100' : 'opacity-0')}>
            <Image src={item.src} alt={item.alt} fill sizes="100vw" preload={index === 0} loading={index === 0 ? undefined : 'lazy'} className={cn('object-cover', item.portrait && 'translate-y-[20%] object-[50%_58%] [mask-image:linear-gradient(to_bottom,transparent,black_16%)] lg:translate-y-0 lg:object-contain lg:object-right lg:[mask-image:none]')} style={item.portrait ? undefined : { objectPosition: item.position }} />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/15" style={{ backgroundImage: 'linear-gradient(90deg, rgba(7,19,15,0.88) 0%, rgba(7,19,15,0.65) 45%, rgba(7,19,15,0.12) 100%), linear-gradient(0deg, rgba(7,19,15,0.92) 0%, transparent 75%)' }} />

      <div className="mx-auto flex min-h-[650px] max-w-[1280px] flex-col justify-between px-6 pb-6 pt-14 sm:min-h-[660px] sm:px-10 sm:pt-20 lg:min-h-[680px] lg:px-8 lg:pt-24">
        <div className="max-w-[760px]" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true">
          <p className="mb-7 flex items-center gap-3 font-brand text-xs font-semibold leading-relaxed tracking-wide text-white/90">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-brand-lime" />
            {dict.hero.eyebrow}
          </p>
          <div className="grid">
            {slides.map((slide, index) => (
              <div
                key={slide.href}
                role="group"
                aria-roledescription="slide"
                aria-label={`${dict.hero.slide} ${index + 1} / ${PHOTOS.length}`}
                aria-hidden={index !== active}
                inert={index !== active}
                className={cn('col-start-1 row-start-1 min-w-0', index === active ? 'visible motion-safe:animate-fade-in' : 'invisible')}
              >
                <p className="mb-4 font-brand text-sm font-semibold text-brand-on-dark">{slide.label}</p>
                {index === active ? (
                  <h1 className="max-w-[730px] font-display text-[clamp(2.25rem,4.2vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white">{slide.title}</h1>
                ) : (
                  <p className="max-w-[730px] font-display text-[clamp(2.25rem,4.2vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white">{slide.title}</p>
                )}
                <p className="mt-6 max-w-[610px] text-[15px] leading-[1.8] text-white/90 sm:text-base">{slide.body}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={slide.href} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-white px-5 py-3 font-brand text-sm font-bold text-primary-dark transition-colors hover:bg-brand-on-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    {slide.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href="/services/report-fraud" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/70 px-5 py-3 font-brand text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{dict.hero.ctaFraud}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/30 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-0 sm:gap-6">
              {slides.map((slide, index) => (
                <button key={slide.href} type="button" aria-label={`${dict.hero.slide} ${index + 1}: ${slide.label}`} aria-current={index === active ? 'true' : undefined} onClick={() => selectSlide(index)} className={cn('inline-flex min-h-11 min-w-11 items-center gap-3 rounded-md px-1 sm:min-h-12 sm:px-2 font-brand text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white', index === active ? 'text-white' : 'text-white/65 hover:text-white')}>
                  <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold', index === active ? 'border-brand-lime bg-brand-lime text-ink' : 'border-white/50')}>0{index + 1}</span>
                  <span className="hidden lg:inline">{slide.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className={CONTROL} onClick={() => selectSlide(active - 1)} aria-label={dict.hero.previousSlide}><ArrowLeft className="h-5 w-5" aria-hidden="true" /></button>
              <button type="button" className={cn(CONTROL, 'disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-white')} onClick={() => setPlaying(value => !value)} disabled={reducedMotion} aria-label={reducedMotion ? dict.hero.reducedMotion : playing ? dict.hero.pauseSlides : dict.hero.playSlides}>
                {playing && !reducedMotion ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              </button>
              <button type="button" className={CONTROL} onClick={() => selectSlide(active + 1)} aria-label={dict.hero.nextSlide}><ArrowRight className="h-5 w-5" aria-hidden="true" /></button>
            </div>
          </div>
          <div className="mt-3 min-h-4 font-brand text-[10px] leading-relaxed text-white/75">
            {photo.source ? <a href={photo.source} target="_blank" rel="noreferrer" className="block rounded underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{dict.hero.photoCredit} · {photo.year}</a> : <span className="block">{dict.hero.suppliedPhoto}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
