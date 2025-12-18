import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OTPScreen from '../screens/OTPScreen';
import ProfileTypeSelectionScreen from '../screens/ProfileTypeSelectionScreen';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';
import InterestsSelectionScreen from '../screens/InterestsSelectionScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import BasicInfoScreen from '../screens/BasicInfoScreen';
import DeviceConnectionScreen from '../screens/DeviceConnectionScreen';
import ConnectionSuccessScreen from '../screens/ConnectionSuccessScreen';

// Main App
import { MainTabNavigator } from './MainTabNavigator';

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Signup: undefined;
  OTP: { email: string };
  ProfileType: undefined;
  ProfileDetails: { profileType: 'athlete' | 'health' | 'coach' };
  Interests: { profileType: 'athlete' | 'health' | 'coach' };
  BasicInfo: undefined;
  Welcome: undefined;
  DeviceConnection: undefined;
  ConnectionSuccess: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#FFF5EF' },
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="ProfileType" component={ProfileTypeSelectionScreen} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
        <Stack.Screen name="Interests" component={InterestsSelectionScreen} />
        <Stack.Screen name="DeviceConnection" component={DeviceConnectionScreen} />
        <Stack.Screen name="ConnectionSuccess" component={ConnectionSuccessScreen} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
          <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
