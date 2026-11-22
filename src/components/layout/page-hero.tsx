import { Breadcrumb } from '@/components/layout/breadcrumb';
import { PageHeroVisual, type PageHeroTheme } from '@/components/layout/page-hero-visual';
import type { ReactNode } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  accent?: 'green' | 'gold' | 'warm';
  theme?: PageHeroTheme;
  children?: ReactNode;
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  accent = 'green',
  theme = 'institution',
  children,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden border-b border-border bg-surface"
      data-page-hero
      data-hero-theme={theme}
    >
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 text-sm text-text-muted [&_a]:opacity-100 [&_a:hover]:text-primary [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-primary [&_[aria-current]]:text-text">
          <Breadcrumb items={breadcrumbs} />
        </div>
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14">
          <div>
            <div
              aria-hidden="true"
              className={`mb-6 h-0.5 w-12 ${accent === 'green' ? 'bg-primary' : 'bg-home-gold'}`}
            />
            <h1 className="max-w-4xl break-words font-display text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl xl:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg lg:text-xl">
                {subtitle}
              </p>
            )}
          </div>
          <div className="h-28 min-w-0 sm:h-36 md:h-56 lg:h-64">
            <PageHeroVisual theme={theme} />
          </div>
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
      <div
        aria-hidden="true"
        className="h-1 w-full bg-[linear-gradient(90deg,var(--color-kente-red)_0%,var(--color-kente-red)_33.33%,var(--color-accent)_33.33%,var(--color-accent)_66.66%,var(--color-primary)_66.66%)]"
      />
    </section>
  );
}
