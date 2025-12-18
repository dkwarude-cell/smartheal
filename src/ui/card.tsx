import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, radius, spacing, shadow } from './theme';

type SectionProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

type TitleProps = {
  children: React.ReactNode;
  style?: TextStyle;
};

export const Card: React.FC<SectionProps> = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

export const CardHeader: React.FC<SectionProps> = ({ children, style }) => (
  <View style={[styles.header, style]}>{children}</View>
);

export const CardTitle: React.FC<TitleProps> = ({ children, style }) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

export const CardDescription: React.FC<TitleProps> = ({ children, style }) => (
  <Text style={[styles.description, style]}>{children}</Text>
);

export const CardAction: React.FC<SectionProps> = ({ children, style }) => (
  <View style={[styles.action, style]}>{children}</View>
);

export const CardContent: React.FC<SectionProps> = ({ children, style }) => (
  <View style={[styles.content, style]}>{children}</View>
);

export const CardFooter: React.FC<SectionProps> = ({ children, style }) => (
  <View style={[styles.footer, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadow.card,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 14,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  content: {
    gap: spacing.sm,
  },
  footer: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
});

export default Card;
