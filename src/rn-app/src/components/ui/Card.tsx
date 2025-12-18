/**
 * Card Component
 * SmartHeal App - Reusable Card Container
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius, shadows } from '../../theme/spacing';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: keyof typeof spacing;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  style,
}) => {
  return (
    <View
      style={[
        styles.card,
        styles[`${variant}Card`],
        { padding: spacing[padding] },
        variant === 'elevated' && shadows.md,
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => {
  return <View style={[styles.header, style]}>{children}</View>;
};

interface CardContentProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const CardContent: React.FC<CardContentProps> = ({ children, style }) => {
  return <View style={[styles.content, style]}>{children}</View>;
};

interface CardFooterProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => {
  return <View style={[styles.footer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  defaultCard: {
    backgroundColor: colors.background.secondary,
  },
  glassCard: {
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  elevatedCard: {
    backgroundColor: colors.background.secondary,
  },
  header: {
    marginBottom: spacing.md,
  },
  content: {
    flex: 1,
  },
  footer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderDark,
  },
});
