import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuditUnitsGrid } from '@/components/home/audit-units-grid';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}));

vi.mock('@/hooks/use-scroll-reveal', () => ({
  useScrollReveal: () => ({ ref: { current: null }, isVisible: true }),
}));

describe('AuditUnitsGrid', () => {
  it('renders the section heading', () => {
    render(<AuditUnitsGrid />);
    expect(screen.getByRole('heading', { name: /Audit Units/i })).toBeDefined();
  });

  it('renders audit unit cards', () => {
    render(<AuditUnitsGrid />);
    expect(screen.getByText(/Ministry of Finance Internal Audit Unit/)).toBeDefined();
    expect(screen.getByText(/Ministry of Health Internal Audit Unit/)).toBeDefined();
    expect(screen.getByText(/Ministry of Education Internal Audit Unit/)).toBeDefined();
  });

  it('renders short names', () => {
    render(<AuditUnitsGrid />);
    expect(screen.getByText('MoF IAU')).toBeDefined();
    expect(screen.getByText('MoH IAU')).toBeDefined();
  });

  it('links each card to the audit unit page', () => {
    render(<AuditUnitsGrid />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/audit-units/ministry-of-finance-iau');
    expect(hrefs).toContain('/audit-units/ministry-of-health-iau');
  });

  it('renders the View all link', () => {
    render(<AuditUnitsGrid />);
    const link = screen.getByRole('link', { name: /View all/i });
    expect(link.getAttribute('href')).toBe('/audit-units');
  });

  it('has an accessible section with aria-labelledby', () => {
    const { container } = render(<AuditUnitsGrid />);
    const section = container.querySelector('section');
    expect(section?.getAttribute('aria-labelledby')).toBe('audit-units-heading');
  });
});
