import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { HeroSlide } from '@/lib/hero-slides';
import { cn } from '@/lib/utils';
export function HeroSlideImage({
  slide,
  preload = false,
  mode = 'responsive',
}: {
  slide: HeroSlide;
  preload?: boolean;
  mode?: 'responsive' | 'desktop' | 'mobile';
}) {
  const style = {
    '--hero-mobile-position': `${slide.mobileX}% ${slide.mobileY}%`,
    '--hero-desktop-position': `${slide.desktopX}% ${slide.desktopY}%`,
    ...(mode !== 'responsive'
      ? {
          objectPosition:
            mode === 'mobile'
              ? `${slide.mobileX}% ${slide.mobileY}%`
              : `${slide.desktopX}% ${slide.desktopY}%`,
        }
      : {}),
  } as CSSProperties;
  return (
    <Image
      src={slide.image}
      alt={slide.alt}
      fill
      sizes="100vw"
      preload={preload}
      loading={preload ? undefined : 'lazy'}
      style={style}
      className={cn(
        'object-cover',
        mode === 'responsive' &&
          '[object-position:var(--hero-mobile-position)] lg:[object-position:var(--hero-desktop-position)]',
        slide.layout === 'portrait' &&
          (mode === 'responsive'
            ? 'translate-y-[20%] [mask-image:linear-gradient(to_bottom,transparent,black_16%)] lg:translate-y-0 lg:object-contain lg:[mask-image:none]'
            : mode === 'mobile'
              ? 'translate-y-[20%] [mask-image:linear-gradient(to_bottom,transparent,black_16%)]'
              : 'object-contain'),
      )}
    />
  );
}
export function HeroOverlay() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-black/15"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(7,19,15,0.88) 0%, rgba(7,19,15,0.65) 45%, rgba(7,19,15,0.12) 100%), linear-gradient(0deg, rgba(7,19,15,0.92) 0%, transparent 75%)',
      }}
    />
  );
}
