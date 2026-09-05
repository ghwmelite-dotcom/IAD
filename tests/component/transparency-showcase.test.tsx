import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransparencyShowcase } from '@/components/home/transparency-showcase';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}));

vi.mock('@/hooks/use-scroll-reveal', () => ({
  useScrollReveal: () => ({ ref: { current: null }, isVisible: true }),
}));

describe('TransparencyShowcase', () => {
  it('renders the section heading', () => {
    render(<TransparencyShowcase />);
    expect(screen.getByRole('heading', { name: /Accountability You Can See/i })).toBeDefined();
  });

  it('renders all three Tier-1 feature cards', () => {
    render(<TransparencyShowcase />);
    expect(screen.getByText('Public Audit Findings Tracker')).toBeDefined();
    expect(screen.getByText('Internal Audit Class Registry')).toBeDefined();
    expect(screen.getByText('Certificate Verification')).toBeDefined();
  });

  it('links each card to its page', () => {
    render(<TransparencyShowcase />);
    expect(screen.getByRole('link', { name: /Findings Tracker/i }).getAttribute('href')).toBe('/transparency');
    expect(screen.getByRole('link', { name: /Audit Class Registry/i }).getAttribute('href')).toBe('/registry');
    expect(screen.getByRole('link', { name: /Certificate Verification/i }).getAttribute('href')).toBe('/verify');
  });
});
