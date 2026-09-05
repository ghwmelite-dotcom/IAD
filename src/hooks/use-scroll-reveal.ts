'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Callback-ref scroll reveal: the observer attaches whenever the target node
 * mounts — including when it mounts *after* the component (e.g. behind a
 * loading state), which a plain useRef + useEffect observer misses.
 */
export function useScrollReveal(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (!node) return;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold },
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [threshold],
  );

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return { ref, isVisible };
}
