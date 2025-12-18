/**
 * App Constants
 * SmartHeal App Configuration
 */

export const APP_CONFIG = {
  APP_NAME: 'SmartHeal',
  BRAND_NAME: 'Runverve',
  VERSION: '1.0.0',
  BUILD_NUMBER: 1,
};

export const THERAPY_CONFIG = {
  MIN_SESSION_DURATION: 5, // minutes
  MAX_SESSION_DURATION: 60, // minutes
  DEFAULT_SESSION_DURATION: 20, // minutes
  MIN_INTENSITY: 1,
  MAX_INTENSITY: 10,
  DEFAULT_INTENSITY: 5,
};

export const BODY_PARTS = [
  { id: 'neck', name: 'Neck', category: 'upper' },
  { id: 'shoulder_left', name: 'Left Shoulder', category: 'upper' },
  { id: 'shoulder_right', name: 'Right Shoulder', category: 'upper' },
  { id: 'upper_back', name: 'Upper Back', category: 'upper' },
  { id: 'lower_back', name: 'Lower Back', category: 'lower' },
  { id: 'elbow_left', name: 'Left Elbow', category: 'upper' },
  { id: 'elbow_right', name: 'Right Elbow', category: 'upper' },
  { id: 'wrist_left', name: 'Left Wrist', category: 'upper' },
  { id: 'wrist_right', name: 'Right Wrist', category: 'upper' },
  { id: 'hip_left', name: 'Left Hip', category: 'lower' },
  { id: 'hip_right', name: 'Right Hip', category: 'lower' },
  { id: 'knee_left', name: 'Left Knee', category: 'lower' },
  { id: 'knee_right', name: 'Right Knee', category: 'lower' },
  { id: 'ankle_left', name: 'Left Ankle', category: 'lower' },
  { id: 'ankle_right', name: 'Right Ankle', category: 'lower' },
  { id: 'foot_left', name: 'Left Foot', category: 'lower' },
  { id: 'foot_right', name: 'Right Foot', category: 'lower' },
  { id: 'quad_left', name: 'Left Quadriceps', category: 'lower' },
  { id: 'quad_right', name: 'Right Quadriceps', category: 'lower' },
  { id: 'hamstring_left', name: 'Left Hamstring', category: 'lower' },
  { id: 'hamstring_right', name: 'Right Hamstring', category: 'lower' },
  { id: 'calf_left', name: 'Left Calf', category: 'lower' },
  { id: 'calf_right', name: 'Right Calf', category: 'lower' },
];

export const MEDICAL_CONDITIONS = [
  'Arthritis',
  'Chronic Pain',
  'Fibromyalgia',
  'Sports Injury',
  'Post-Surgery Recovery',
  'Muscle Strain',
  'Joint Pain',
  'Back Pain',
  'Neck Pain',
  'Carpal Tunnel',
  'Tendonitis',
  'Bursitis',
  'Sciatica',
  'Plantar Fasciitis',
  'Other',
];

export const THERAPY_GOALS = [
  'Pain Relief',
  'Muscle Recovery',
  'Injury Rehabilitation',
  'Flexibility Improvement',
  'Stress Reduction',
  'Performance Enhancement',
  'Post-Workout Recovery',
  'Chronic Condition Management',
];

export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary (Little or no exercise)' },
  { value: 'light', label: 'Light (Exercise 1-3 days/week)' },
  { value: 'moderate', label: 'Moderate (Exercise 3-5 days/week)' },
  { value: 'active', label: 'Active (Exercise 6-7 days/week)' },
  { value: 'very_active', label: 'Very Active (Physical job + exercise)' },
];

export const BLUETOOTH_CONFIG = {
  SCAN_DURATION: 10000, // 10 seconds
  CONNECTION_TIMEOUT: 30000, // 30 seconds
  DEVICE_NAME_PREFIX: 'SmartHeal',
};

export const AI_CONFIG = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_FORMATS: ['jpg', 'jpeg', 'png'],
  ANALYSIS_TIMEOUT: 30000, // 30 seconds
};

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  AGE_MIN: 13,
  AGE_MAX: 120,
  WEIGHT_MIN: 20, // kg
  WEIGHT_MAX: 300, // kg
  HEIGHT_MIN: 50, // cm
  HEIGHT_MAX: 250, // cm
};
