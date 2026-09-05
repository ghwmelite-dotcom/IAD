import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FindingsTable } from '@/components/portal/findings-table';
import type { Finding } from '@/lib/portal-api';

function makeFinding(overrides: Partial<Finding>): Finding {
  return {
    id: 'f-1',
    engagement_id: 'e-1',
    universe_id: 'u-1',
    title: 'Unreconciled bank statements',
    description: 'Bank reconciliations were not performed.',
    category: 'Financial controls',
    severity: 'high',
    condition: null,
    criteria: null,
    cause: null,
    effect: null,
    status: 'open',
    closed_at: null,
    created_at: new Date().toISOString(),
    mda_name: 'Ministry of Health',
    unit_name: 'Finance Directorate',
    engagement_code: 'ENG-2026-001',
    ...overrides,
  };
}

const FINDINGS: Finding[] = [
  makeFinding({ id: 'f-1', severity: 'high', status: 'open', mda_name: 'Ministry of Health' }),
  makeFinding({ id: 'f-2', severity: 'low', status: 'closed', title: 'Missing asset register', category: 'Stores', mda_name: 'Ministry of Education', engagement_code: 'ENG-2026-002' }),
];

describe('FindingsTable', () => {
  it('renders all findings by default', () => {
    render(<FindingsTable findings={FINDINGS} />);
    expect(screen.getByText('Unreconciled bank statements')).toBeDefined();
    expect(screen.getByText('Missing asset register')).toBeDefined();
    expect(screen.getByText(`Showing 2 of 2 findings`)).toBeDefined();
  });

  it('filters by severity', () => {
    render(<FindingsTable findings={FINDINGS} />);
    fireEvent.change(screen.getByLabelText('Filter by severity'), { target: { value: 'high' } });
    expect(screen.getByText('Unreconciled bank statements')).toBeDefined();
    expect(screen.queryByText('Missing asset register')).toBeNull();
    expect(screen.getByText('Showing 1 of 2 findings')).toBeDefined();
  });

  it('filters by status and search text together', () => {
    render(<FindingsTable findings={FINDINGS} />);
    fireEvent.change(screen.getByLabelText('Filter by status'), { target: { value: 'closed' } });
    fireEvent.change(screen.getByLabelText('Search findings'), { target: { value: 'asset' } });
    expect(screen.queryByText('Unreconciled bank statements')).toBeNull();
    expect(screen.getByText('Missing asset register')).toBeDefined();
  });

  it('hides the MDA filter and column when hideMda is set', () => {
    render(<FindingsTable findings={FINDINGS} hideMda />);
    expect(screen.queryByLabelText('Filter by MDA')).toBeNull();
    expect(screen.queryByRole('columnheader', { name: 'MDA' })).toBeNull();
  });

  it('shows an empty state when filters match nothing', () => {
    render(<FindingsTable findings={FINDINGS} />);
    fireEvent.change(screen.getByLabelText('Search findings'), { target: { value: 'zzz-no-match' } });
    expect(screen.getByText('No findings match the current filters.')).toBeDefined();
  });
});
