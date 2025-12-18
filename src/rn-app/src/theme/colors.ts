/**
 * Color Theme - Runverve Brand Colors
 * SmartHeal App Design System
 */

export const colors = {
  // Primary Brand Colors
  primary: '#00C6AE',
  primaryDark: '#00A896',
  primaryLight: '#33D4BF',
  
  // Secondary Colors
  secondary: '#FF6B6B',
  secondaryDark: '#EE5A52',
  secondaryLight: '#FF8585',
  
  // Background Colors
  background: {
    primary: '#0A0F1E',
    secondary: '#1A1F2E',
    tertiary: '#2A2F3E',
    light: '#F5F7FA',
    white: '#FFFFFF',
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B8C8',
    tertiary: '#6B7280',
    dark: '#1F2937',
    light: '#F9FAFB',
    muted: '#9CA3AF',
  },
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Accent Colors
  accent: {
    purple: '#8B5CF6',
    pink: '#EC4899',
    orange: '#F97316',
    yellow: '#FBBF24',
    green: '#10B981',
    blue: '#3B82F6',
  },
  
  // Therapy Mode Colors
  therapy: {
    pro: '#8B5CF6',
    guided: '#3B82F6',
  },
  
  // UI Colors
  border: '#E5E7EB',
  borderDark: '#374151',
  divider: '#E5E7EB',
  shadow: '#000000',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(10, 15, 30, 0.8)',
  },
  
  // Gradients
  gradients: {
    primary: ['#00C6AE', '#00A896'],
    secondary: ['#FF6B6B', '#EE5A52'],
    dark: ['#0A0F1E', '#1A1F2E'],
    purple: ['#8B5CF6', '#7C3AED'],
    blue: ['#3B82F6', '#2563EB'],
    warm: ['#F97316', '#FBBF24'],
  },
};

export type Colors = typeof colors;
