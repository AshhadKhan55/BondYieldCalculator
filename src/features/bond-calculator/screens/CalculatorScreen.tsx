import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/theme/theme';
import { calculateBondMetrics } from '../utils/bondMath';
import { BondInputs, BondOutputs } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BondForm } from '../components/BondForm';
import { BondResults } from '../components/BondResults';
import { CashFlowTable } from '../components/CashFlowTable';

export const CalculatorScreen = () => {
  const [faceValue, setFaceValue] = useState('1000');
  const [couponRate, setCouponRate] = useState('5');
  const [marketPrice, setMarketPrice] = useState('950');
  const [years, setYears] = useState('10');
  const [frequency, setFrequency] = useState<'annual' | 'semi-annual'>('annual');
  const [results, setResults] = useState<BondOutputs | null>(null);

  const handleCalculate = () => {
    const inputs: BondInputs = {
      faceValue: parseFloat(faceValue) || 0,
      annualCouponRate: parseFloat(couponRate) || 0,
      marketPrice: parseFloat(marketPrice) || 0,
      yearsToMaturity: parseFloat(years) || 0,
      frequency,
    };
    const outputs = calculateBondMetrics(inputs);
    setResults(outputs);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.headerTitle}>Bond Calculator</Text>

        <BondForm 
          faceValue={faceValue} setFaceValue={setFaceValue}
          couponRate={couponRate} setCouponRate={setCouponRate}
          marketPrice={marketPrice} setMarketPrice={setMarketPrice}
          years={years} setYears={setYears}
          frequency={frequency} setFrequency={setFrequency}
          onCalculate={handleCalculate}
        />

        {results && (
          <>
            <BondResults results={results} />
            <CashFlowTable schedule={results.cashFlowSchedule} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  headerTitle: {
    ...typography.header,
    marginBottom: 24,
    marginTop: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
