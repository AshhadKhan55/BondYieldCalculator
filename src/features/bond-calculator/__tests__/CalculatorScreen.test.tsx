import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CalculatorScreen } from '../screens/CalculatorScreen';

// Mock dependencies
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => <>{children}</>,
}));

describe('CalculatorScreen', () => {
  it('renders the initial form', () => {
    const { getByText, queryByText } = render(<CalculatorScreen />);
    
    expect(getByText('Bond Calculator')).toBeTruthy();
    expect(getByText('Input Variables')).toBeTruthy();
    
    // Outputs should not be visible initially
    expect(queryByText('Yield Outputs')).toBeNull();
    expect(queryByText('Cash Flow Schedule')).toBeNull();
  });

  it('calculates and shows results when valid data is submitted', () => {
    const { getByText } = render(<CalculatorScreen />);
    
    // Wait for the button and press calculate with default inputs
    fireEvent.press(getByText('Calculate Yields'));
    
    // Output sections should appear
    expect(getByText('Yield Outputs')).toBeTruthy();
    expect(getByText('Cash Flow Schedule')).toBeTruthy();
    
    // Basic checks for expected result from defaults (1000 face, 5% coupon, 950 price, 10 yrs)
    expect(getByText('Discount')).toBeTruthy();
  });

  it('handles bad input gracefully by treating empty strings as 0 during calculation', () => {
    const { getByText, getByDisplayValue } = render(<CalculatorScreen />);
    
    fireEvent.changeText(getByDisplayValue('1000'), '');
    fireEvent.press(getByText('Calculate Yields'));
    
    expect(getByText('Yield Outputs')).toBeTruthy();
  });
});
