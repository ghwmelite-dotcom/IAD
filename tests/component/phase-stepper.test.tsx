import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PhaseStepper } from '@/components/portal/phase-stepper';

describe('PhaseStepper', () => {
  it('renders all five phases', () => {
    render(<PhaseStepper phase="planning" />);
    for (const label of ['Planning', 'Fieldwork', 'Reporting', 'Follow-up', 'Closed']) {
      expect(screen.getByText(label)).toBeDefined();
    }
  });

  it('marks the current phase as the current step', () => {
    render(<PhaseStepper phase="reporting" />);
    const current = screen.getByText('Reporting').previousSibling as HTMLElement;
    expect(current.getAttribute('aria-current')).toBe('step');
  });

  it('marks earlier phases complete with a check', () => {
    const { container } = render(<PhaseStepper phase="follow_up" />);
    // Planning, fieldwork, reporting are done → three check icons.
    const checks = container.querySelectorAll('svg');
    expect(checks.length).toBe(3);
  });
});
