import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BondForm } from '../components/BondForm';

describe('BondForm', () => {
  const mockProps = {
    faceValue: '1000',
    setFaceValue: jest.fn(),
    couponRate: '5',
    setCouponRate: jest.fn(),
    marketPrice: '950',
    setMarketPrice: jest.fn(),
    years: '10',
    setYears: jest.fn(),
    frequency: 'annual' as const,
    setFrequency: jest.fn(),
    onCalculate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial values', () => {
    const { getByText, getByDisplayValue } = render(<BondForm {...mockProps} />);
    
    expect(getByText('Input Variables')).toBeTruthy();
    expect(getByDisplayValue('1000')).toBeTruthy();
    expect(getByDisplayValue('5')).toBeTruthy();
    expect(getByDisplayValue('950')).toBeTruthy();
    expect(getByDisplayValue('10')).toBeTruthy();
    expect(getByText('FREQUENCY')).toBeTruthy();
  });

  it('calls set methods when text changes', () => {
    const { getByDisplayValue } = render(<BondForm {...mockProps} />);
    
    fireEvent.changeText(getByDisplayValue('1000'), '2000');
    expect(mockProps.setFaceValue).toHaveBeenCalledWith('2000');

    fireEvent.changeText(getByDisplayValue('5'), '6');
    expect(mockProps.setCouponRate).toHaveBeenCalledWith('6');

    fireEvent.changeText(getByDisplayValue('950'), '900');
    expect(mockProps.setMarketPrice).toHaveBeenCalledWith('900');

    fireEvent.changeText(getByDisplayValue('10'), '15');
    expect(mockProps.setYears).toHaveBeenCalledWith('15');
  });

  it('calls setFrequency when toggles are pressed', () => {
    const { getByText } = render(<BondForm {...mockProps} frequency="annual" />);
    
    fireEvent.press(getByText('Semi-Annual'));
    expect(mockProps.setFrequency).toHaveBeenCalledWith('semi-annual');
    
    fireEvent.press(getByText('Annual'));
    expect(mockProps.setFrequency).toHaveBeenCalledWith('annual');
  });

  it('calls onCalculate when Calculate Yields button is pressed', () => {
    const { getByText } = render(<BondForm {...mockProps} />);
    
    fireEvent.press(getByText('Calculate Yields'));
    expect(mockProps.onCalculate).toHaveBeenCalled();
  });
});
