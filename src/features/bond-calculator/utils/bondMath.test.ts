import { calculateBondMetrics } from './bondMath';
import { BondInputs } from '../types';

describe('Bond Math Calculations', () => {
  const defaultInputs: BondInputs = {
    faceValue: 1000,
    annualCouponRate: 5, // 5%
    marketPrice: 950,
    yearsToMaturity: 10,
    frequency: 'annual',
  };

  it('calculates current yield correctly', () => {
    const outputs = calculateBondMetrics(defaultInputs);
    // Annual coupon = 1000 * 5% = 50. Current Yield = 50 / 950 = 5.26%
    expect(outputs.currentYield).toBeCloseTo(5.263, 3);
  });

  it('determines parity correctly', () => {
    const outputsDiscount = calculateBondMetrics(defaultInputs);
    expect(outputsDiscount.parityIndicator).toBe('Discount');

    const outputsPremium = calculateBondMetrics({ ...defaultInputs, marketPrice: 1050 });
    expect(outputsPremium.parityIndicator).toBe('Premium');

    const outputsPar = calculateBondMetrics({ ...defaultInputs, marketPrice: 1000 });
    expect(outputsPar.parityIndicator).toBe('Par');
  });

  it('calculates total interest correctly', () => {
    const outputs = calculateBondMetrics(defaultInputs);
    // 50 * 10 years = 500
    expect(outputs.totalInterestEarned).toBeCloseTo(500, 2);
  });

  it('generates a cash flow schedule', () => {
    const outputs = calculateBondMetrics({
      ...defaultInputs,
      yearsToMaturity: 2,
    });
    const schedule = outputs.cashFlowSchedule;
    expect(schedule.length).toBe(2);
    expect(schedule[0].period).toBe(1);
    expect(schedule[0].couponPayment).toBe(50);
    expect(schedule[0].cumulativeInterest).toBe(50);
    expect(schedule[1].cumulativeInterest).toBe(100);
    // Principal repays at the end
    expect(schedule[0].remainingPrincipal).toBe(1000);
    expect(schedule[1].remainingPrincipal).toBe(0);
  });

  it('calculates approximate YTM correctly for annual', () => {
    // YTM approximation = (C + (F - P)/n) / ((F + P)/2)
    // C = 50, F = 1000, P = 950, n = 10
    // Num = 50 + (50)/10 = 55
    // Den = 1950 / 2 = 975
    // YTM ≈ 55 / 975 = 5.641%
    const outputs = calculateBondMetrics(defaultInputs);
    expect(outputs.yieldToMaturity).toBeCloseTo(5.641, 3);
  });
  
  it('handles semi-annual frequency correctly', () => {
    const outputs = calculateBondMetrics({
      ...defaultInputs,
      frequency: 'semi-annual',
      yearsToMaturity: 2,
    });
    // Total periods = 4
    // C per period = 25
    expect(outputs.totalInterestEarned).toBe(100);
    expect(outputs.cashFlowSchedule.length).toBe(4);
    expect(outputs.cashFlowSchedule[0].couponPayment).toBe(25);
  });
});
