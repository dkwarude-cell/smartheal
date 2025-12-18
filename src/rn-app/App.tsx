/**
 * SmartHeal App - Main Entry Point
 * React Native Application
 * 
 * @author Runverve
 * @version 1.0.0
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

// Context Providers
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { DeviceProvider } from './src/context/DeviceContext';

// Navigation
import { AppNavigator } from './src/navigation/AppNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Prepare app resources
    const prepareApp = async () => {
      try {
        // Load any resources or data here
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn('Error loading app resources:', e);
      } finally {
        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          <DeviceProvider>
            <StatusBar style="light" />
            <AppNavigator />
          </DeviceProvider>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
