'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { PageHeroTheme } from './page-hero-visual';

/** Begin once the page transition ends and the artwork enters the viewport. */
export function HeroIllustrationMotion({
  theme,
  children,
}: {
  theme: PageHeroTheme;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let visible = false;
    let started = false;

    const startWhenVisible = () => {
      if (started || !visible || document.querySelector('[data-page-loader]')) return;
      started = true;
      setReady(true);
      visibility.disconnect();
      transition.disconnect();
    };
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        startWhenVisible();
      },
      { threshold: 0.2 },
    );
    const transition = new MutationObserver(startWhenVisible);

    visibility.observe(node);
    transition.observe(document.body, { childList: true, subtree: true });
    return () => {
      visibility.disconnect();
      transition.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`hero-illustration-motion h-full w-full${ready ? ' is-ready' : ''}`}
      data-motion-theme={theme}
    >
      {children}
    </div>
  );
}
