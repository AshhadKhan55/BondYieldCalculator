export const colors = {
  background: '#0F172A', // Slate 900
  card: '#1E293B',       // Slate 800
  cardHighlight: '#334155', // Slate 700
  textPrimary: '#F8FAFC', // Slate 50
  textSecondary: '#94A3B8', // Slate 400
  primary: '#3B82F6',    // Blue 500
  primaryDark: '#2563EB', // Blue 600
  success: '#10B981',    // Emerald 500
  danger: '#EF4444',     // Red 500
  border: '#334155',     // Slate 700
};

export const typography = {
  header: { fontSize: 24, fontWeight: '700' as const, color: colors.textPrimary },
  title: { fontSize: 18, fontWeight: '600' as const, color: colors.textPrimary },
  body: { fontSize: 16, color: colors.textSecondary },
  label: { fontSize: 14, fontWeight: '500' as const, color: colors.textSecondary },
  value: { fontSize: 20, fontWeight: '700' as const, color: colors.success },
};
