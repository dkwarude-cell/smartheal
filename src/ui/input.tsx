import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, radius, spacing } from './theme';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  helperText?: string;
};

export const Input: React.FC<InputProps> = ({ label, error, helperText, style, ...rest }) => {
  const hasError = Boolean(error);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...rest}
        style={[
          styles.input,
          hasError ? styles.inputError : undefined,
          style as any,
        ]}
        placeholderTextColor={colors.muted}
      />
      {hasError ? <Text style={styles.error}>{error}</Text> : null}
      {!hasError && helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    color: colors.text,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.destructive,
  },
  error: {
    color: colors.destructive,
    fontSize: 12,
  },
  helper: {
    color: colors.muted,
    fontSize: 12,
  },
});

export default Input;
