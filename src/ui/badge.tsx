import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, radius, spacing } from './theme';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

type Props = {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const Badge: React.FC<Props> = ({ label, variant = 'default', style, textStyle }) => {
  const variants: Record<BadgeVariant, { container: ViewStyle; text: TextStyle }> = {
    default: { container: { backgroundColor: colors.primary, borderColor: colors.primary }, text: { color: colors.primaryText } },
    secondary: { container: { backgroundColor: colors.surface, borderColor: colors.border }, text: { color: colors.text } },
    destructive: { container: { backgroundColor: colors.destructive, borderColor: colors.destructive }, text: { color: '#FFFFFF' } },
    outline: { container: { backgroundColor: 'transparent', borderColor: colors.border }, text: { color: colors.text } },
  };

  return (
    <View style={[styles.base, variants[variant].container, style]}>
      <Text style={[styles.text, variants[variant].text, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default Badge;
