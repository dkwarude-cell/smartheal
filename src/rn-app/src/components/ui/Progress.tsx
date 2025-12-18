/**
 * Progress Component
 * SmartHeal App - Progress Bar
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { borderRadius } from '../../theme/spacing';

interface ProgressProps {
  value: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
  style?: ViewStyle;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  color = colors.primary,
  backgroundColor = colors.background.tertiary,
  height = 8,
  style,
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, height, borderRadius: height / 2 },
        style,
      ]}
    >
      <View
        style={[
          styles.progress,
          {
            width: `${clampedValue}%`,
            backgroundColor: color,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});
