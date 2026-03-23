import React from 'react';
import { render } from '@testing-library/react-native';
import { BondResults } from '../components/BondResults';
import { BondOutputs } from '../types';

describe('BondResults', () => {
  const mockResults: BondOutputs = {
    currentYield: 5.26315,
    yieldToMaturity: 5.684,
    parityIndicator: 'Discount',
    totalInterestEarned: 500,
    cashFlowSchedule: [],
  };

  it('renders yield outputs properly formatted', () => {
    const { getByText } = render(<BondResults results={mockResults} />);
    
    expect(getByText('Yield Outputs')).toBeTruthy();
    expect(getByText('5.263%')).toBeTruthy();
    expect(getByText('5.684%')).toBeTruthy();
    expect(getByText('Discount')).toBeTruthy();
    expect(getByText('$500.00')).toBeTruthy();
  });

  it('renders Parity Indicator as Premium correctly', () => {
    const premiumResults = { ...mockResults, parityIndicator: 'Premium' as const };
    const { getByText } = render(<BondResults results={premiumResults} />);
    expect(getByText('Premium')).toBeTruthy();
  });

  it('renders Parity Indicator as Par correctly', () => {
    const parResults = { ...mockResults, parityIndicator: 'Par' as const };
    const { getByText } = render(<BondResults results={parResults} />);
    expect(getByText('Par')).toBeTruthy();
  });
});
