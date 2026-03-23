import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../../shared/components/Card';
import { colors, typography } from '../../../shared/theme/theme';
import { CashFlowRow } from '../types';

interface CashFlowTableProps {
  schedule: CashFlowRow[];
}

export const CashFlowTable: React.FC<CashFlowTableProps> = ({ schedule }) => {
  return (
    <Card>
      <Text style={styles.sectionTitle}>Cash Flow Schedule</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.scrollContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colObj, styles.colPeriod]}>Period</Text>
            <Text style={[styles.colObj, styles.colPaymentDate]}>Payment Date</Text>
            <Text style={[styles.colObj, styles.colCouponPayment]}>Coupon Payment</Text>
            <Text style={[styles.colObj, styles.colCumulativeInterest]}>Cumulative Interest</Text>
            <Text style={[styles.colObj, styles.colRemainingPrincipal]}>Remaining Principal</Text>
          </View>
          <View style={styles.divider} />
          {schedule.map((row) => (
            <View key={row.period.toString()} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colPeriod]}>{row.period}</Text>
              <Text style={[styles.tableCell, styles.colPaymentDate]}>{row.paymentDate}</Text>
              <Text style={[styles.tableCell, styles.colCouponPayment]}>${row.couponPayment.toFixed(2)}</Text>
              <Text style={[styles.tableCell, styles.colCumulativeInterest]}>${row.cumulativeInterest.toFixed(2)}</Text>
              <Text style={[styles.tableCell, styles.colRemainingPrincipal]}>${row.remainingPrincipal.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    ...typography.title,
    marginBottom: 16,
    color: colors.primary,
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
  scrollContainer: {
    minWidth: 700,
  },
  colPeriod: {
    width: 80,
    textAlign: 'center',
  },
  colPaymentDate: {
    width: 120,
    textAlign: 'left',
  },
  colCouponPayment: {
    width: 150,
    textAlign: 'right',
  },
  colCumulativeInterest: {
    width: 175,
    textAlign: 'right',
  },
  colRemainingPrincipal: {
    width: 175,
    textAlign: 'right',
  },
});
