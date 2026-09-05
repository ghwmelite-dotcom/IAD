import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchOverlay } from '@/components/layout/search-overlay';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

function renderOverlay(onClose = vi.fn()) {
  render(<SearchOverlay open={true} onClose={onClose} />);
  const input = screen.getByRole('combobox');
  return { input, onClose };
}

describe('SearchOverlay', () => {
  it('renders a dialog with an autofocused combobox input', () => {
    renderOverlay();
    expect(screen.getByRole('dialog', { name: /site search/i })).toBeDefined();
    expect(screen.getByRole('combobox')).toBeDefined();
  });

  it('filters results case-insensitively across title, description and keywords', () => {
    const { input } = renderOverlay();
    fireEvent.change(input, { target: { value: 'FRAUD' } });
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
    expect(screen.getByText('Report Fraud / Whistleblowing')).toBeDefined();
  });

  it('matches audit units by keyword', () => {
    const { input } = renderOverlay();
    fireEvent.change(input, { target: { value: 'ministry of finance' } });
    expect(screen.getByText('Ministry of Finance Internal Audit Unit')).toBeDefined();
  });

  it('groups results under section headings', () => {
    const { input } = renderOverlay();
    fireEvent.change(input, { target: { value: 'audit' } });
    expect(screen.getByRole('group', { name: 'Pages' })).toBeDefined();
    expect(screen.getByRole('group', { name: 'Audit Units' })).toBeDefined();
  });

  it('shows an empty state with suggestions for unknown queries', () => {
    const { input } = renderOverlay();
    fireEvent.change(input, { target: { value: 'zzzzqqq' } });
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByText(/No results for/)).toBeDefined();
    expect(screen.getByText(/'fraud'/)).toBeDefined();
  });

  it('navigates with arrow keys and Enter', () => {
    push.mockClear();
    const { input } = renderOverlay();
    fireEvent.change(input, { target: { value: 'certificate' } });
    const options = screen.getAllByRole('option');
    expect(options[0]?.getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getAllByRole('option')[1]?.getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(screen.getAllByRole('option')[0]?.getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(push).toHaveBeenCalledWith('/verify');
  });

  it('closes on Escape', () => {
    const { onClose } = renderOverlay();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('renders nothing when closed', () => {
    render(<SearchOverlay open={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
