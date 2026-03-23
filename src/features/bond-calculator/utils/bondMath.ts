import { BondInputs, BondOutputs, CashFlowRow } from '../types';

export const calculateBondMetrics = (inputs: BondInputs): BondOutputs => {
  const { faceValue, annualCouponRate, marketPrice, yearsToMaturity, frequency } = inputs;

  const annualCouponPayment = faceValue * (annualCouponRate / 100);
  const currentYield = (annualCouponPayment / marketPrice) * 100;

  const isPar = Math.abs(marketPrice - faceValue) < 0.0001;
  const parityIndicator = isPar ? 'Par' : marketPrice > faceValue ? 'Premium' : 'Discount';

  const periodsPerYear = frequency === 'semi-annual' ? 2 : 1;
  const totalPeriods = yearsToMaturity * periodsPerYear;
  const paymentPerPeriod = annualCouponPayment / periodsPerYear;
  const totalInterestEarned = paymentPerPeriod * totalPeriods;

  // Approximate Yield to Maturity (YTM) formula
  // C = annual coupon payment
  // F = face value
  // P = price
  // n = years to maturity
  // Approximation: (C + (F-P)/n) / ((F+P)/2)
  // For semi annual, C -> payment per period, n -> total periods. Result gets multiplied by periodsPerYear
  const yieldToMaturityApprox =
    ((paymentPerPeriod + (faceValue - marketPrice) / totalPeriods) /
      ((faceValue + marketPrice) / 2)) * periodsPerYear * 100;

  let cumulativeInterest = 0;
  const cashFlowSchedule: CashFlowRow[] = [];

  for (let i = 1; i <= totalPeriods; i++) {
    cumulativeInterest += paymentPerPeriod;
    const isLastPeriod = i === totalPeriods;
    cashFlowSchedule.push({
      period: i,
      paymentDate: `Period ${i}`, // Usually determined by real dates, defaulting to sequence
      couponPayment: paymentPerPeriod,
      cumulativeInterest: cumulativeInterest,
      remainingPrincipal: isLastPeriod ? 0 : faceValue,
    });
  }

  return {
    currentYield,
    yieldToMaturity: yieldToMaturityApprox,
    totalInterestEarned,
    parityIndicator,
    cashFlowSchedule,
  };
};
