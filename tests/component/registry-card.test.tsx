import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RegistryCard } from '@/components/registry/registry-card';
import type { RegistryEntry } from '@/lib/public-api';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>{children as React.ReactNode}</a>
  ),
}));

const ENTRY: RegistryEntry = {
  name: 'Yaw Osei Frimpong',
  grade: 'Principal Internal Auditor',
  mda_name: 'Ministry of Finance',
  public_slug: 'yaw-osei-frimpong',
  verified: true,
  credentials: [{ body: 'FCCA' }, { body: 'CITG' }],
};

describe('RegistryCard', () => {
  it('renders the officer name, grade and MDA', () => {
    render(<RegistryCard entry={ENTRY} />);
    expect(screen.getByText('Yaw Osei Frimpong')).toBeDefined();
    expect(screen.getByText('Principal Internal Auditor')).toBeDefined();
    expect(screen.getByText('Ministry of Finance')).toBeDefined();
  });

  it('shows a verified badge for verified officers', () => {
    render(<RegistryCard entry={ENTRY} />);
    expect(screen.getByText('Verified')).toBeDefined();
  });

  it('renders credential badges when credentials are present', () => {
    render(<RegistryCard entry={ENTRY} />);
    expect(screen.getByText('FCCA')).toBeDefined();
    expect(screen.getByText('CITG')).toBeDefined();
  });

  it('links to the profile page with the slug as a query param', () => {
    render(<RegistryCard entry={ENTRY} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/registry/profile?s=yaw-osei-frimpong');
  });

  it('omits the verified badge and credentials section when absent', () => {
    render(
      <RegistryCard
        entry={{ name: 'Test Officer', grade: null, mda_name: null, public_slug: 'test', verified: false }}
      />,
    );
    expect(screen.queryByText('Verified')).toBeNull();
  });
});
