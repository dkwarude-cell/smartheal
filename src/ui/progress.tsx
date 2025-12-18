import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from './theme';

type Props = {
  value?: number; // 0-100
  trackColor?: string;
  indicatorColor?: string;
  height?: number;
};

export const Progress: React.FC<Props> = ({
  value = 0,
  trackColor = `${colors.primary}33`,
  indicatorColor = colors.primary,
  height = 8,
}) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height / 2 }]}> 
      <View
        style={{
          width: `${clamped}%`,
          backgroundColor: indicatorColor,
          borderRadius: height / 2,
          height: '100%',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
});

export default Progress;
