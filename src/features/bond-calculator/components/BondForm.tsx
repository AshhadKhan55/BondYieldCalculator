import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { colors, typography } from '../../../shared/theme/theme';

interface BondFormProps {
  faceValue: string;
  setFaceValue: (val: string) => void;
  couponRate: string;
  setCouponRate: (val: string) => void;
  marketPrice: string;
  setMarketPrice: (val: string) => void;
  years: string;
  setYears: (val: string) => void;
  frequency: 'annual' | 'semi-annual';
  setFrequency: (val: 'annual' | 'semi-annual') => void;
  onCalculate: () => void;
}

export const BondForm: React.FC<BondFormProps> = ({
  faceValue, setFaceValue,
  couponRate, setCouponRate,
  marketPrice, setMarketPrice,
  years, setYears,
  frequency, setFrequency,
  onCalculate,
}) => {
  return (
    <>
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
      <Button title="Calculate Yields" onPress={onCalculate} />
    </>
  );
};

const styles = StyleSheet.create({
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
});
