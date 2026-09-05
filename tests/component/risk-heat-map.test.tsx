import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RiskHeatMap } from '@/components/portal/risk-heat-map';

describe('RiskHeatMap', () => {
  it('renders a 5×5 grid of cells', () => {
    render(<RiskHeatMap entries={[]} />);
    for (let l = 1; l <= 5; l++) {
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByTestId(`heat-cell-${l}-${i}`)).toBeDefined();
      }
    }
  });

  it('shows counts at the correct likelihood/impact coordinate', () => {
    render(
      <RiskHeatMap
        entries={[
          { risk_likelihood: 4, risk_impact: 5 },
          { risk_likelihood: 4, risk_impact: 5 },
          { risk_likelihood: 1, risk_impact: 2 },
        ]}
      />,
    );
    expect(screen.getByTestId('heat-cell-4-5').textContent).toBe('2');
    expect(screen.getByTestId('heat-cell-1-2').textContent).toBe('1');
    expect(screen.getByTestId('heat-cell-3-3').textContent).toBe('');
  });

  it('labels axes', () => {
    render(<RiskHeatMap entries={[]} />);
    expect(screen.getByText(/Impact/)).toBeDefined();
    expect(screen.getByText(/Likelihood/)).toBeDefined();
  });
});
