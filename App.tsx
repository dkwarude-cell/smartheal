/**
 * SmartHeal App - Main Entry Point
 * React Native Application
 * 
 * @author Runverve
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Context Providers
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { DeviceProvider } from './src/context/DeviceContext';

// Navigation
import { AppNavigator } from './src/navigation/AppNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Prepare app resources
    const prepareApp = async () => {
      try {
        // Load any resources or data here
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn('Error loading app resources:', e);
      } finally {
        setAppIsReady(true);
        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF5EF' }} edges={['left', 'right']}>
          <AuthProvider>
            <ThemeProvider>
              <DeviceProvider>
                <StatusBar style="light" backgroundColor="transparent" translucent={true} />
                <AppNavigator />
              </DeviceProvider>
            </ThemeProvider>
          </AuthProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
