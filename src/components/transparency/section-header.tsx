interface SectionHeaderProps {
  pill: string;
  title: string;
  /** Word rendered with the gold underline swash, appended after `title`. */
  highlight?: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({
  pill,
  title,
  highlight,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'text-center mb-14' : 'mb-10'}>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
        <span className="text-sm font-semibold text-primary tracking-wide">{pill}</span>
      </div>
      <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-dark mb-4">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="relative inline-block">
              {highlight}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-3 bg-accent/30 rounded-sm -z-10"
              />
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={
            centered
              ? 'text-lg text-text-muted max-w-2xl mx-auto leading-relaxed'
              : 'text-lg text-text-muted max-w-2xl leading-relaxed'
          }
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
