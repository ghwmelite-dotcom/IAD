import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

function Probe({ threshold }: { threshold?: number }) {
  const { ref, isVisible } = useScrollReveal(threshold);
  return (
    <div ref={ref} data-testid="target" data-visible={isVisible}>
      probe
    </div>
  );
}

describe('useScrollReveal', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();

    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function (this: unknown, callback: IntersectionObserverCallback) {
        (globalThis as Record<string, unknown>).__ioCallback = callback;
        return { observe: observeMock, disconnect: disconnectMock };
      }),
    );
  });

  it('returns ref and isVisible (initially false)', () => {
    render(<Probe />);
    expect(screen.getByTestId('target').getAttribute('data-visible')).toBe('false');
  });

  it('observes the node once it mounts and uses the provided threshold', () => {
    render(<Probe threshold={0.3} />);
    expect(IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0.3,
    });
    expect(observeMock).toHaveBeenCalledWith(screen.getByTestId('target'));
  });

  it('sets isVisible when the node intersects', () => {
    render(<Probe />);
    const callback = (globalThis as Record<string, unknown>).__ioCallback as IntersectionObserverCallback;
    act(() => {
      callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(screen.getByTestId('target').getAttribute('data-visible')).toBe('true');
  });

  it('disconnects on unmount', () => {
    const { unmount } = render(<Probe />);
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
