import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/Card';
import { colors, typography } from '../../../shared/theme/theme';
import { BondOutputs } from '../types';

interface BondResultsProps {
  results: BondOutputs;
}

export const BondResults: React.FC<BondResultsProps> = ({ results }) => {
  return (
    <Card>
      <Text style={styles.sectionTitle}>Yield Outputs</Text>
      
      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>Current Yield</Text>
        <Text style={styles.resultValue}>{results.currentYield.toFixed(3)}%</Text>
      </View>
      <View style={styles.divider} />
      
      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>Yield to Maturity</Text>
        <Text style={styles.resultValue}>{results.yieldToMaturity.toFixed(3)}%</Text>
      </View>
      <View style={styles.divider} />
      
      <View style={styles.resultRow}>
        <Text style={styles.resultLabel}>Parity Indicator</Text>
        <Text style={[
          styles.resultValue, 
          results.parityIndicator === 'Discount' ? styles.parityDiscount :
          results.parityIndicator === 'Premium' ? styles.parityPremium :
          styles.parityPar
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
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    ...typography.title,
    marginBottom: 16,
    color: colors.primary,
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
  parityDiscount: {
    color: colors.danger,
  },
  parityPremium: {
    color: colors.success,
  },
  parityPar: {
    color: colors.primary,
  },
});
