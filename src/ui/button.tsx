import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, radius, spacing } from './theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const variants: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
  primary: { container: { backgroundColor: colors.primary }, text: { color: colors.primaryText } },
  secondary: { container: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }, text: { color: colors.text } },
  outline: { container: { backgroundColor: 'transparent', borderColor: colors.border, borderWidth: 1 }, text: { color: colors.text } },
  ghost: { container: { backgroundColor: 'transparent' }, text: { color: colors.text } },
  destructive: { container: { backgroundColor: colors.destructive }, text: { color: '#FFFFFF' } },
};

const sizes: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, fontSize: 14 },
  md: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, fontSize: 16 },
  lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, fontSize: 18 },
};

export const Button: React.FC<Props> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onPress,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles.container,
        {
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          opacity: isDisabled ? 0.6 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color as string} />
      ) : (
        <Text style={[styles.text, variantStyles.text, { fontSize: sizeStyles.fontSize }, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});

export default Button;
