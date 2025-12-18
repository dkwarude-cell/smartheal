/**
 * Auth Navigator
 * SmartHeal App - Authentication Flow Navigation
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation.types';

// Import screens
import StartScreen from '../screens/auth/StartScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen';
import DeviceConnectionScreen from '../screens/auth/DeviceConnectionScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="DeviceConnection" component={DeviceConnectionScreen} />
    </Stack.Navigator>
  );
};
