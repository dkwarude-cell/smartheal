/**
 * Navigation Types
 * SmartHeal App - Type Definitions for Navigation
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { UserProfile } from './user.types';

// Auth Stack Navigation
export type AuthStackParamList = {
  Start: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  OTP: { phone: string; email: string };
  ProfileSetup: { user: Partial<UserProfile> };
  DeviceConnection: undefined;
};

// Main Tab Navigation
export type MainTabParamList = {
  Home: undefined;
  Therapy: undefined;
  AI: undefined;
  Reports: undefined;
};

// Settings Stack
export type SettingsStackParamList = {
  Settings: undefined;
  Profile: undefined;
  ProfileSettings: undefined;
  TherapySettings: undefined;
  Notifications: undefined;
  BluetoothSettings: undefined;
};

// AI Stack
export type AIStackParamList = {
  AIHome: undefined;
  AICamera: undefined;
  CameraCapture: undefined;
  ImagePreview: { imageUri: string };
  AnalysisResult: { imageUri: string; analysis: any };
};

// Device Stack
export type DeviceStackParamList = {
  DeviceConnection: undefined;
  DeviceAuthorization: { deviceId: string };
  DeviceFeatures: { deviceId: string };
  ConnectionSuccess: { deviceId: string };
};

// Root Stack Navigation
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
  AIStack: NavigatorScreenParams<AIStackParamList>;
  DeviceStack: NavigatorScreenParams<DeviceStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
