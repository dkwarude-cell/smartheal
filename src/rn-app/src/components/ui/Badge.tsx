/**
 * Badge Component
 * SmartHeal App - Status Badge
 */

import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  style,
}) => {
  return (
    <View style={[styles.badge, styles[`${variant}Badge`], style]}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  defaultBadge: {
    backgroundColor: colors.background.tertiary,
  },
  successBadge: {
    backgroundColor: colors.success,
  },
  warningBadge: {
    backgroundColor: colors.warning,
  },
  errorBadge: {
    backgroundColor: colors.error,
  },
  infoBadge: {
    backgroundColor: colors.info,
  },
  text: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  defaultText: {
    color: colors.text.secondary,
  },
  successText: {
    color: colors.text.primary,
  },
  warningText: {
    color: colors.text.dark,
  },
  errorText: {
    color: colors.text.primary,
  },
  infoText: {
    color: colors.text.primary,
  },
});
