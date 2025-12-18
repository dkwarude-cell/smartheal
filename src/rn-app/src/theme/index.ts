/**
 * Theme Index
 * SmartHeal App Design System
 */

export { colors } from './colors';
export { spacing, borderRadius, shadows } from './spacing';
export { typography } from './typography';

export const theme = {
  colors: require('./colors').colors,
  spacing: require('./spacing').spacing,
  borderRadius: require('./spacing').borderRadius,
  shadows: require('./spacing').shadows,
  typography: require('./typography').typography,
};

export type Theme = typeof theme;
