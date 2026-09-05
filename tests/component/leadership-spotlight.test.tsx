import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LeadershipSpotlight } from '@/components/home/leadership-spotlight';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, priority: _priority, alt, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={typeof alt === 'string' ? alt : ''} {...rest} />;
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}));

vi.mock('@/hooks/use-scroll-reveal', () => ({
  useScrollReveal: () => ({ ref: { current: null }, isVisible: true }),
}));

describe('LeadershipSpotlight', () => {
  it('renders the section heading', () => {
    render(<LeadershipSpotlight />);
    expect(screen.getByRole('heading', { name: /Our Leadership/i })).toBeDefined();
  });

  it('renders the Director name', () => {
    render(<LeadershipSpotlight />);
    expect(screen.getByText('Solomon Wemegah')).toBeDefined();
  });

  it('renders the Director title', () => {
    render(<LeadershipSpotlight />);
    expect(screen.getByText(/Director, Internal Audit Department/i)).toBeDefined();
  });

  it('does not name the retired Director', () => {
    render(<LeadershipSpotlight />);
    expect(screen.queryByText(/Nartey/i)).toBeNull();
  });

  it('renders the View all leadership link', () => {
    render(<LeadershipSpotlight />);
    const link = screen.getByRole('link', { name: /View all leadership/i });
    expect(link.getAttribute('href')).toBe('/about/leadership');
  });

  it('renders the Director portrait', () => {
    render(<LeadershipSpotlight />);
    expect(screen.getByAltText('Solomon Wemegah')).toBeDefined();
  });
});
