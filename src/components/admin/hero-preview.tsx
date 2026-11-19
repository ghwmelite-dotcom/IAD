'use client';
import { useEffect, useRef, useState } from 'react';
import { HeroSlideImage, HeroOverlay } from '@/components/home/hero-slide-image';
import type { HeroSlide } from '@/lib/hero-slides';
export function HeroPreview({
  slide,
  mode,
  language,
}: {
  slide: HeroSlide;
  mode: 'desktop' | 'mobile';
  language: 'en' | 'fr';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => setWidth(entries[0]?.contentRect.width ?? 0));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const virtualWidth = mode === 'mobile' ? 390 : 1440;
  const height = mode === 'mobile' ? 800 : 700;
  const copy = slide.copy[language] ?? slide.copy.en;
  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-xl bg-ink"
      style={{ aspectRatio: `${virtualWidth}/${height}` }}
      aria-label={`${mode} slide preview`}
    >
      <div
        className="absolute left-0 top-0 isolate overflow-hidden bg-ink text-white"
        style={{
          width: virtualWidth,
          height,
          transform: `scale(${width / virtualWidth})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="absolute inset-0 -z-20">
          <HeroSlideImage slide={slide} mode={mode} />
        </div>
        <HeroOverlay />
        <div
          style={{
            padding: mode === 'mobile' ? '56px 24px' : '96px 104px',
            maxWidth: mode === 'mobile' ? 390 : 940,
          }}
        >
          <p className="mb-7 font-brand text-xs text-white/90">
            Republic of Ghana — Internal Audit Department (IAD)
          </p>
          <p className="mb-4 font-brand text-sm font-semibold text-brand-on-dark">{copy.label}</p>
          <p
            className="font-display font-bold leading-[1.12] tracking-[-0.025em]"
            style={{ fontSize: mode === 'mobile' ? 36 : 60 }}
          >
            {copy.title}
          </p>
          <p
            className="mt-6 max-w-[610px] leading-[1.8] text-white/90"
            style={{ fontSize: mode === 'mobile' ? 15 : 16 }}
          >
            {copy.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-brand text-sm font-semibold">
            <span className="rounded-lg bg-white px-5 py-3 text-primary-dark">
              {copy.buttonText}
            </span>
            {slide.secondaryHref && copy.secondaryText && (
              <span className="rounded-lg border border-white/70 px-5 py-3">
                {copy.secondaryText}
              </span>
            )}
          </div>
        </div>
        <p className="absolute bottom-6 left-6 font-brand text-[10px] text-white/75">
          {slide.credit}
        </p>
      </div>
    </div>
  );
}
