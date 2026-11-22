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
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let visible = false;
    let started = false;

    const startWhenVisible = () => {
      if (started || !visible || document.hidden || document.querySelector('[data-page-loader]'))
        return;
      started = true;
      setReady(true);
      transition.disconnect();
    };
    const syncPlayback = () => {
      setPlaying(visible && !document.hidden);
      startWhenVisible();
    };
    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        syncPlayback();
      },
      { threshold: 0.2 },
    );
    const transition = new MutationObserver(startWhenVisible);

    visibility.observe(node);
    transition.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      visibility.disconnect();
      transition.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`hero-illustration-motion h-full w-full${ready ? ' is-ready' : ''}${playing ? '' : ' is-paused'}`}
      data-motion-theme={theme}
    >
      <div className="hero-illustration-entrance h-full w-full">
        <div className="hero-illustration-drift h-full w-full">{children}</div>
      </div>
    </div>
  );
}
