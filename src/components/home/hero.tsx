'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { defaultHeroSlides, heroManifestSchema, type HeroSlide } from '@/lib/hero-slides';
import { HeroSlideImage, HeroOverlay } from './hero-slide-image';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/layout/language-context';

const SLIDE_INTERVAL_MS = 8000;
const SWIPE_THRESHOLD_PX = 50;
const DEFAULT_SLIDES = defaultHeroSlides();

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
const CONTROL =
  'inline-flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

export function Hero() {
  const { dict, lang } = useLanguage();
  const [remoteSlides, setRemoteSlides] = useState<HeroSlide[] | null>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerPaused);
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, getServerPaused);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const rotating = playing && !hovered && !hidden && !reducedMotion && inView;

  const slides = (remoteSlides ?? DEFAULT_SLIDES).filter((s) => s.enabled);
  const activeIndex = active % slides.length;
  const photo = slides[activeIndex]!;
  const copyFor = (slide: HeroSlide) => slide.copy[lang] ?? slide.copy.en;

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    let visible = false;
    let started = false;
    const revealAfterTransition = () => {
      if (started || !visible || document.querySelector('[data-page-loader]')) return;
      started = true;
      setContentReady(true);
      transition.disconnect();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        setInView(visible);
        revealAfterTransition();
      },
      { threshold: 0.1 },
    );
    const transition = new MutationObserver(revealAfterTransition);
    observer.observe(node);
    transition.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      transition.disconnect();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let fetching = false;
    const refresh = async () => {
      if (document.hidden || fetching) return;
      fetching = true;
      try {
        const response = await fetch('/api/public/hero', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) return;
        const body = (await response.json()) as { data: unknown };
        const parsed = heroManifestSchema.safeParse(body.data);
        if (parsed.success && parsed.data.some((s) => s.enabled))
          setRemoteSlides((previous) =>
            JSON.stringify(previous) === JSON.stringify(parsed.data) ? previous : parsed.data,
          );
      } catch {
        /* Keep the last good manifest; bundled slides cover first-load outages. */
      } finally {
        fetching = false;
      }
    };
    void refresh();
    const timer = window.setInterval(() => {
      void refresh();
    }, 60000);
    const onReturn = () => {
      void refresh();
    };
    window.addEventListener('focus', onReturn);
    document.addEventListener('visibilitychange', onReturn);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      window.removeEventListener('focus', onReturn);
      document.removeEventListener('visibilitychange', onReturn);
    };
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [rotating, slides.length]);

  function selectSlide(index: number) {
    setActive((index + slides.length) % slides.length);
    setPlaying(false);
  }

  return (
    <section
      ref={heroRef}
      data-hero-playing={rotating}
      aria-label="Hero"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-ink text-white touch-pan-y"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (event.target.matches(':focus-visible')) setPlaying(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          selectSlide(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
        }
      }}
      onPointerDown={(event) => {
        if (event.pointerType === 'touch') gesture.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerCancel={() => {
        gesture.current = null;
      }}
      onPointerUp={(event) => {
        const start = gesture.current;
        gesture.current = null;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) >= SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy))
          selectSlide(activeIndex + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="absolute inset-0 -z-20">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== activeIndex}
            className={cn(
              'absolute inset-0 pointer-events-none',
              // The incoming image is opaque beneath the fading outgoing image,
              // preserving brightness even when wrapping from last to first.
              index === activeIndex
                ? 'z-0 opacity-100 transition-none'
                : 'z-10 opacity-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none',
            )}
          >
            <div
              className="hero-photo-motion absolute inset-0"
              data-active={index === activeIndex}
              data-direction={index % 2 === 0 ? 'in' : 'out'}
              style={
                {
                  '--hero-photo-origin-mobile': `${slide.mobileX}% ${slide.mobileY}%`,
                  '--hero-photo-origin-desktop': `${slide.desktopX}% ${slide.desktopY}%`,
                  '--hero-photo-pan-mobile': slide.mobileX >= 50 ? '0.35%' : '-0.35%',
                  '--hero-photo-pan-desktop': slide.desktopX >= 50 ? '0.35%' : '-0.35%',
                } as CSSProperties
              }
            >
              <HeroSlideImage slide={slide} preload={index === 0} />
            </div>
          </div>
        ))}
      </div>
      <HeroOverlay />

      <div className="mx-auto flex min-h-[650px] max-w-[1280px] flex-col justify-between px-6 pb-6 pt-14 sm:min-h-[660px] sm:px-10 sm:pt-20 lg:min-h-[680px] lg:px-8 lg:pt-24">
        <div className="max-w-[760px]" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true">
          <p className="mb-7 flex items-center gap-3 font-brand text-xs font-semibold leading-relaxed tracking-wide text-white/90">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-brand-lime" />
            {dict.hero.eyebrow}
          </p>
          <div className="grid">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${dict.hero.slide} ${index + 1} / ${slides.length}`}
                aria-hidden={index !== activeIndex}
                inert={index !== activeIndex}
                data-copy-active={index === activeIndex && contentReady}
                className={cn(
                  'hero-copy-slide col-start-1 row-start-1 min-w-0',
                  index === activeIndex ? 'visible' : 'invisible',
                )}
              >
                <p
                  data-hero-copy="label"
                  className="mb-4 font-brand text-sm font-semibold text-brand-on-dark"
                >
                  {copyFor(slide).label}
                </p>
                {index === activeIndex ? (
                  <h1
                    data-hero-copy="heading"
                    className="max-w-[730px] font-display text-[clamp(2.25rem,4.2vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white"
                  >
                    {copyFor(slide).title}
                  </h1>
                ) : (
                  <p
                    data-hero-copy="heading"
                    className="max-w-[730px] font-display text-[clamp(2.25rem,4.2vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-white"
                  >
                    {copyFor(slide).title}
                  </p>
                )}
                <p
                  data-hero-copy="description"
                  className="mt-6 max-w-[610px] text-[15px] leading-[1.8] text-white/90 sm:text-base"
                >
                  {copyFor(slide).body}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    data-hero-copy="primary"
                    href={slide.buttonHref}
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-white px-5 py-3 font-brand text-sm font-bold text-primary-dark transition-colors hover:bg-brand-on-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {copyFor(slide).buttonText}{' '}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {slide.secondaryHref && copyFor(slide).secondaryText && (
                    <Link
                      data-hero-copy="secondary"
                      href={slide.secondaryHref}
                      className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/70 px-5 py-3 font-brand text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      {copyFor(slide).secondaryText}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/30 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-0 sm:gap-6">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`${dict.hero.slide} ${index + 1}: ${copyFor(slide).label}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => selectSlide(index)}
                  className={cn(
                    'inline-flex min-h-11 min-w-11 items-center gap-3 rounded-md px-1 sm:min-h-12 sm:px-2 font-brand text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                    index === activeIndex ? 'text-white' : 'text-white/65 hover:text-white',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                      index === activeIndex
                        ? 'border-brand-lime bg-brand-lime text-ink'
                        : 'border-white/50',
                    )}
                  >
                    0{index + 1}
                  </span>
                  <span className="hidden lg:inline">{copyFor(slide).label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={CONTROL}
                onClick={() => selectSlide(active - 1)}
                aria-label={dict.hero.previousSlide}
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={cn(
                  CONTROL,
                  'disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-white',
                )}
                onClick={() => setPlaying((value) => !value)}
                disabled={reducedMotion}
                aria-label={
                  reducedMotion
                    ? dict.hero.reducedMotion
                    : playing
                      ? dict.hero.pauseSlides
                      : dict.hero.playSlides
                }
              >
                {playing && !reducedMotion ? (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                className={CONTROL}
                onClick={() => selectSlide(activeIndex + 1)}
                aria-label={dict.hero.nextSlide}
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-3 min-h-4 font-brand text-[10px] leading-relaxed text-white/75">
            {photo.creditUrl ? (
              <a
                href={photo.creditUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {photo.credit}
              </a>
            ) : (
              <span className="block">{photo.credit}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
