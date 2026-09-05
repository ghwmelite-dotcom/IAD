import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/home/hero';

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}));

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
