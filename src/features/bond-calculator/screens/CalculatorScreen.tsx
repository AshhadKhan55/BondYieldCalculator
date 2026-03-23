import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { colors, typography } from '../../../shared/theme/theme';
import { calculateBondMetrics } from '../utils/bondMath';
import { BondInputs, BondOutputs } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

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

        <Card>
          <Text style={styles.sectionTitle}>Input Variables</Text>
          <Input label="Face Value ($)" value={faceValue} onChangeText={setFaceValue} />
          <Input label="Annual Coupon Rate (%)" value={couponRate} onChangeText={setCouponRate} />
          <Input label="Market Price ($)" value={marketPrice} onChangeText={setMarketPrice} />
          <Input label="Years to Maturity" value={years} onChangeText={setYears} />
          
          <View style={styles.frequencyContainer}>
            <Text style={styles.freqLabel}>FREQUENCY</Text>
            <View style={styles.toggleRow}>
               <TouchableOpacity 
                 activeOpacity={0.8}
                 onPress={() => setFrequency('annual')} 
                 style={[styles.toggleBtn, frequency === 'annual' && styles.toggleActive]}
               >
                 <Text style={[styles.toggleText, frequency === 'annual' && styles.toggleTextActive]}>Annual</Text>
               </TouchableOpacity>
               <TouchableOpacity 
                 activeOpacity={0.8}
                 onPress={() => setFrequency('semi-annual')} 
                 style={[styles.toggleBtn, frequency === 'semi-annual' && styles.toggleActive]}
               >
                 <Text style={[styles.toggleText, frequency === 'semi-annual' && styles.toggleTextActive]}>Semi-Annual</Text>
               </TouchableOpacity>
            </View>
          </View>
        </Card>

        <Button title="Calculate Yields" onPress={handleCalculate} />

        {results && (
          <>
            <Card>
              <Text style={styles.sectionTitle}>Yield Outputs</Text>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Current Yield</Text>
                <Text style={styles.resultValue}>{results.currentYield.toFixed(3)}%</Text>
              </View>
              <View style={styles.divider} />
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Yield to Maturity (Approx)</Text>
                <Text style={styles.resultValue}>{results.yieldToMaturity.toFixed(3)}%</Text>
              </View>
              <View style={styles.divider} />
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Parity Indicator</Text>
                <Text style={[
                  styles.resultValue, 
                  { color: results.parityIndicator === 'Discount' ? colors.danger : results.parityIndicator === 'Premium' ? colors.success : colors.primary }
                ]}>
                  {results.parityIndicator}
                </Text>
              </View>
              <View style={styles.divider} />

              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Total Interest Earned</Text>
                <Text style={styles.resultValue}>${results.totalInterestEarned.toFixed(2)}</Text>
              </View>
            </Card>

            <Card>
              <Text style={styles.sectionTitle}>Cash Flow Schedule</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ minWidth: 700 }}>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.colObj, styles.flex1]}>Period</Text>
                    <Text style={[styles.colObj, styles.flex2]}>Payment Date</Text>
                    <Text style={[styles.colObj, styles.flex2]}>Coupon Payment</Text>
                    <Text style={[styles.colObj, { flex: 2.5 }]}>Cumulative Interest</Text>
                    <Text style={[styles.colObj, { flex: 2.5 }]}>Remaining Principal</Text>
                  </View>
                  <View style={styles.divider} />
                  {results.cashFlowSchedule.map((row, idx) => (
                    <View key={idx.toString()} style={styles.tableRow}>
                      <Text style={[styles.tableCell, styles.flex1]}>{row.period}</Text>
                      <Text style={[styles.tableCell, styles.flex2]}>{row.paymentDate}</Text>
                      <Text style={[styles.tableCell, styles.flex2]}>${row.couponPayment.toFixed(2)}</Text>
                      <Text style={[styles.tableCell, { flex: 2.5 }]}>${row.cumulativeInterest.toFixed(2)}</Text>
                      <Text style={[styles.tableCell, { flex: 2.5 }]}>${row.remainingPrincipal.toFixed(2)}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </Card>
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
  sectionTitle: {
    ...typography.title,
    marginBottom: 16,
    color: colors.primary,
  },
  frequencyContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  freqLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardHighlight,
    borderRadius: 8,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: colors.textPrimary,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  resultLabel: {
    ...typography.body,
    fontWeight: '500',
  },
  resultValue: {
    ...typography.value,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  colObj: {
    color: colors.textSecondary,
    fontWeight: '700',
    fontSize: 13,
  },
  tableCell: {
    color: colors.textPrimary,
    fontSize: 13,
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
});
