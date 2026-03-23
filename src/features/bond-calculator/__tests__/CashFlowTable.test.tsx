import React from 'react';
import { render } from '@testing-library/react-native';
import { CashFlowTable } from '../components/CashFlowTable';

describe('CashFlowTable', () => {
  const mockSchedule = [
    {
      period: 1,
      paymentDate: 'Period 1',
      couponPayment: 50,
      cumulativeInterest: 50,
      remainingPrincipal: 1000,
    },
    {
      period: 2,
      paymentDate: 'Period 2',
      couponPayment: 50,
      cumulativeInterest: 100,
      remainingPrincipal: 1000,
    }
  ];

  it('renders the cash flow table headers', () => {
    const { getByText } = render(<CashFlowTable schedule={mockSchedule} />);
    
    expect(getByText('Cash Flow Schedule')).toBeTruthy();
    expect(getByText('Period')).toBeTruthy();
    expect(getByText('Payment Date')).toBeTruthy();
    expect(getByText('Coupon Payment')).toBeTruthy();
    expect(getByText('Cumulative Interest')).toBeTruthy();
    expect(getByText('Remaining Principal')).toBeTruthy();
  });

  it('renders rows correctly from schedule', () => {
    const { getByText, getAllByText } = render(<CashFlowTable schedule={mockSchedule} />);
    
    expect(getByText('1')).toBeTruthy();
    expect(getByText('Period 1')).toBeTruthy();
    
    expect(getByText('2')).toBeTruthy();
    expect(getByText('Period 2')).toBeTruthy();
    
    // Check formatted values
    expect(getAllByText('$50.00').length).toBeGreaterThan(0);
    expect(getByText('$100.00')).toBeTruthy();
    expect(getAllByText('$1000.00').length).toBe(2);
  });
  
  it('renders empty when schedule is empty', () => {
    const { queryByText } = render(<CashFlowTable schedule={[]} />);
    expect(queryByText('1')).toBeNull();
  });
});
