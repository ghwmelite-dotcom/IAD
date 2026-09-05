import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MdaTable } from '@/components/transparency/mda-table';
import type { MdaTransparency } from '@/lib/public-api';

const ROWS: MdaTransparency[] = [
  { mda_name: 'Ministry of Finance', findings: 10, closed: 8, resolutionRate: 80, openHigh: 1 },
  { mda_name: 'Ministry of Health', findings: 20, closed: 10, resolutionRate: 50, openHigh: 3 },
  { mda_name: 'Ministry of Education', findings: 5, closed: 2, resolutionRate: 40, openHigh: 0 },
];

function renderedMdaOrder(): string[] {
  const table = screen.getByRole('table');
  return within(table)
    .getAllByRole('row')
    .slice(1) // skip header
    .map((row) => (row as HTMLTableRowElement).cells[0]?.textContent ?? '');
}

describe('MdaTable', () => {
  it('renders all MDA rows with their figures', () => {
    render(<MdaTable rows={ROWS} />);
    expect(screen.getByText('Ministry of Finance')).toBeDefined();
    expect(screen.getByText('Ministry of Health')).toBeDefined();
    expect(screen.getByText('Ministry of Education')).toBeDefined();
    expect(screen.getByText('80%')).toBeDefined();
  });

  it('sorts by findings descending by default', () => {
    render(<MdaTable rows={ROWS} />);
    expect(renderedMdaOrder()).toEqual([
      'Ministry of Health',
      'Ministry of Finance',
      'Ministry of Education',
    ]);
  });

  it('re-sorts when a column header is clicked', () => {
    render(<MdaTable rows={ROWS} />);
    fireEvent.click(screen.getByRole('button', { name: /MDA/i }));
    expect(renderedMdaOrder()).toEqual([
      'Ministry of Education',
      'Ministry of Finance',
      'Ministry of Health',
    ]);
  });

  it('toggles direction when the active column is clicked again', () => {
    render(<MdaTable rows={ROWS} />);
    const findingsHeader = screen.getByRole('button', { name: /^Findings$/i });
    fireEvent.click(findingsHeader); // ascending
    expect(renderedMdaOrder()[0]).toBe('Ministry of Education');
  });

  it('shows a dash when an MDA has no open high-severity findings', () => {
    render(<MdaTable rows={ROWS} />);
    const eduRow = screen.getByText('Ministry of Education').closest('tr');
    expect(eduRow && within(eduRow as HTMLElement).getByText('—')).toBeTruthy();
  });
});
