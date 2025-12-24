/**
 * User Types and Interfaces
 * SmartHeal (RunVerve) - Type Definitions
 */

export interface HealthProfile {
  age: number;
  weight: number; // in kg
  height: number; // in cm
  medicalConditions: string[];
  goals: string[];
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  painAreas?: string[];
  injuries?: string[];
  medications?: string[];
}

export interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  therapyIntensity?: 'low' | 'medium' | 'high';
  sessionDuration?: number; // in minutes
  reminderTime?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  healthProfile: HealthProfile;
  preferences: UserPreferences;
  deviceId?: string;
  lastActive?: string;
  subscription?: {
    plan: 'free' | 'pro' | 'premium';
    status: 'active' | 'inactive' | 'trial';
    expiresAt?: string;
  };
}

export interface TherapySession {
  id: string;
  userId: string;
  deviceId: string;
  mode: 'pro' | 'guided';
  startTime: string;
  endTime?: string;
  duration: number; // in seconds
  intensity: number; // 1-10
  targetArea: string;
  painBefore?: number; // 1-10
  painAfter?: number; // 1-10
  calories?: number;
  completed: boolean;
  notes?: string;
  aiRecommendations?: string[];
}

export interface HealthData {
  id: string;
  userId: string;
  timestamp: string;
  type: 'session' | 'pain_level' | 'recovery' | 'fitness';
  data: {
    [key: string]: any;
  };
  source: 'smartHeal' | 'googleFit' | 'fitbit' | 'manual';
}

export interface AIAnalysis {
  id: string;
  userId: string;
  timestamp: string;
  type: 'health_insight' | 'recommendation' | 'prediction' | 'image_analysis';
  input: {
    type: string;
    data: any;
  };
  output: {
    insights: string[];
    recommendations: string[];
    confidence: number;
    reasoning?: string;
  };
  metadata?: {
    modelVersion: string;
    processingTime: number;
    tokens?: number;
  };
}

export interface DeviceInfo {
  id: string;
  userId: string;
  deviceId: string;
  name: string;
  model: string;
  firmware: string;
  batteryLevel: number;
  isConnected: boolean;
  lastConnected: string;
  totalSessions: number;
  totalDuration: number; // in seconds
}

// Multi-profile base types
export type ProfileType = 'athlete' | 'coach' | 'health';

export interface BaseUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  profileType: ProfileType;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
