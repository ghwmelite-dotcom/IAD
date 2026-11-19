import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Hero } from '@/components/home/hero';

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}));


let reducedMotion = false;
let pageHidden = false;
beforeEach(() => {
  vi.useFakeTimers();
  reducedMotion = false;
  pageHidden = false;
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: reducedMotion,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })));
  vi.spyOn(document, 'hidden', 'get').mockImplementation(() => pageHidden);
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Hero', () => {
  it('renders the eyebrow text', () => {
    render(<Hero />);
    expect(screen.getByText(/Republic of Ghana/)).toBeDefined();
  });

  it('renders the assurance headline', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: /Independent Assurance/i })).toBeDefined();
  });

  it('renders both CTA buttons', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Report Fraud or Waste/ })).toBeDefined();
    expect(screen.getByRole('link', { name: /Explore Audit Units/ })).toBeDefined();
  });

  it('links the fraud CTA to the whistleblowing form', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /Report Fraud or Waste/ });
    expect(link.getAttribute('href')).toBe('/services/report-fraud');
  });

  it('states the HQ-of-audit-units mandate', () => {
    render(<Hero />);
    expect(screen.getByText(/headquarters of internal audit/i)).toBeDefined();
  });

  it('renders decorative elements as aria-hidden', () => {
    const { container } = render(<Hero />);
    const decorative = container.querySelectorAll('[aria-hidden="true"]');
    expect(decorative.length).toBeGreaterThanOrEqual(4);
  });
});

describe('Hero slideshow controls', () => {
  it('cycles forward and backward with matching content and destination', () => {
    render(<Hero />);
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stronger skills');
    expect(screen.getByRole('link', { name: /Publications/ })).toHaveAttribute('href', '/publications');
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Independent Assurance');
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Serving a stronger Civil Service');
    expect(screen.getByText('Photo supplied for the IAD platform')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Accountability that everyone can see');
  });

  it('rotates every eight seconds and pauses on request', () => {
    render(<Hero />);
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stronger skills');
    fireEvent.click(screen.getByRole('button', { name: 'Pause slideshow' }));
    act(() => vi.advanceTimersByTime(16000));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stronger skills');
    fireEvent.click(screen.getByRole('button', { name: 'Play slideshow' }));
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Accountability that everyone can see');
  });

  it('keeps a manually selected slide in place', () => {
    render(<Hero />);
    fireEvent.click(screen.getByRole('button', { name: 'Slide 3: Public accountability' }));
    act(() => vi.advanceTimersByTime(24000));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Accountability that everyone can see');
    expect(screen.getByRole('button', { name: 'Slide 3: Public accountability' })).toHaveAttribute('aria-current', 'true');
  });

  it('supports arrow-key navigation', () => {
    render(<Hero />);
    fireEvent.keyDown(screen.getByRole('region', { name: 'Hero' }), { key: 'ArrowRight' });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stronger skills');
  });

  it('temporarily pauses while hovered or the page is hidden', () => {
    render(<Hero />);
    const hero = screen.getByRole('region', { name: 'Hero' });
    fireEvent.mouseEnter(hero);
    act(() => vi.advanceTimersByTime(16000));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Independent Assurance');
    fireEvent.mouseLeave(hero);
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stronger skills');
    pageHidden = true;
    fireEvent(document, new Event('visibilitychange'));
    act(() => vi.advanceTimersByTime(16000));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stronger skills');
  });

  it('disables automatic movement for reduced motion, while retaining manual controls', () => {
    reducedMotion = true;
    render(<Hero />);
    expect(screen.getByRole('button', { name: /Automatic playback is off/ })).toBeDisabled();
    act(() => vi.advanceTimersByTime(16000));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Independent Assurance');
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Stronger skills');
  });
});
