/**
 * Button Component
 * SmartHeal App - Reusable Button
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  gradient?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  gradient = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    styles[`${size}Button`],
    fullWidth && styles.fullWidth,
    !gradient && styles[`${variant}Button`],
    (disabled || loading) && styles.disabledButton,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    styles[`${variant}Text`],
    (disabled || loading) && styles.disabledText,
    textStyle,
  ];

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.text.primary}
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
        </View>
      )}
    </>
  );

  if (gradient && variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[buttonStyles, { overflow: 'hidden' }]}
      >
        <LinearGradient
          colors={colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={buttonStyles}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  smButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  mdButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  lgButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  fullWidth: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  dangerButton: {
    backgroundColor: colors.error,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontWeight: typography.fontWeight.semibold,
  },
  smText: {
    fontSize: typography.fontSize.sm,
  },
  mdText: {
    fontSize: typography.fontSize.md,
  },
  lgText: {
    fontSize: typography.fontSize.lg,
  },
  primaryText: {
    color: colors.text.primary,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.primary,
  },
  dangerText: {
    color: colors.text.primary,
  },
  disabledText: {
    opacity: 0.7,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});
