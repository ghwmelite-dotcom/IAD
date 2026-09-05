'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollRegionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Horizontal-scroll wrapper with a mobile affordance: a right fade edge
 * while more content is hidden, plus a "swipe" caption on small screens.
 */
export function ScrollRegion({ children, className }: ScrollRegionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanScroll(el.scrollWidth > el.clientWidth + 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(update);
      observer.observe(el);
      window.addEventListener('resize', update);
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', update);
      };
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
        }}
        className={cn('overflow-x-auto', className)}
      >
        {children}
      </div>

      {/* Right fade edge — visible only while more content is hidden */}
      {canScroll && !atEnd && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/70 to-transparent rounded-r-2xl"
        />
      )}

      {/* Swipe caption — small screens only */}
      {canScroll && !atEnd && (
        <p className="sm:hidden mt-2 flex items-center justify-end gap-1.5 text-xs font-medium text-text-muted/70">
          <MoveHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          Swipe for more
        </p>
      )}
    </div>
  );
}
