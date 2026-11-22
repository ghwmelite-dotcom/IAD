import Image from 'next/image';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  variant?: 'header' | 'footer';
}

export function AnimatedLogo({ variant = 'header' }: AnimatedLogoProps) {
  const isFooter = variant === 'footer';

  return (
    <Link
      href="/"
      className={cn(
        'inline-flex max-w-full min-w-0 shrink-0 items-center gap-2 rounded-lg py-1 focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-3',
        isFooter ? 'focus-visible:outline-brand-lime' : 'focus-visible:outline-primary',
      )}
      aria-label={`${SITE_NAME} — Home`}
    >
      <Image
        src="/images/ohcs-crest.png"
        alt="Ghana Civil Service Crest"
        width={48}
        height={56}
        className="h-10 w-auto shrink-0 object-contain sm:h-14"
      />
      <span aria-hidden="true" className="h-11 w-px shrink-0 bg-brand-lime" />
      {/* A shared vector measure keeps both lines aligned as the wordmark scales. */}
      <svg
        viewBox="0 0 324 42"
        width={324}
        height={42}
        className="block h-auto w-[clamp(172px,47vw,216px)] shrink-0 font-brand sm:w-[300px]"
        role="img"
        aria-label={`${SITE_NAME}. Strengthening Governance & Accountability.`}
      >
        <text
          x="1"
          y="20"
          textLength="320"
          lengthAdjust="spacingAndGlyphs"
          fontSize="22"
          fontWeight="700"
          className={isFooter ? 'fill-white' : 'fill-primary-dark'}
        >
          {SITE_NAME.toUpperCase()}
        </text>
        <text
          x="1"
          y="36"
          textLength="320"
          lengthAdjust="spacingAndGlyphs"
          fontSize="17"
          fontWeight="400"
          className={isFooter ? 'fill-white/90' : 'fill-text-muted'}
        >
          Strengthening Governance &amp; Accountability
        </text>
      </svg>
    </Link>
  );
}
