export interface BondInputs {
  faceValue: number;
  annualCouponRate: number; // Percentage (e.g., 5 for 5%)
  marketPrice: number;
  yearsToMaturity: number;
  frequency: 'annual' | 'semi-annual';
}

export interface CashFlowRow {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface BondOutputs {
  currentYield: number;
  yieldToMaturity: number; // Based on approximation or exact IRR
  totalInterestEarned: number;
  parityIndicator: 'Premium' | 'Discount' | 'Par';
  cashFlowSchedule: CashFlowRow[];
}
