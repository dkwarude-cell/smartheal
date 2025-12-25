/**
 * Theme Index
 * SmartHeal App Design System
 */

import { colors } from './colors';
import { spacing, borderRadius, shadows } from './spacing';
import { typography } from './typography';

export { colors };
export { spacing, borderRadius, shadows };
export { typography };

export const theme = {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
};

export type Theme = typeof theme;
