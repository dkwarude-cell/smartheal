/**
 * App Navigator
 * SmartHeal App - Main Navigation Container
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

// Import navigators
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';

// Import screens
import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';
import ProfileSettingsScreen from '../screens/settings/ProfileSettingsScreen';
import TherapySettingsScreen from '../screens/settings/TherapySettingsScreen';
import NotificationsScreen from '../screens/settings/NotificationsScreen';
import BluetoothSettingsScreen from '../screens/settings/BluetoothSettingsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Main Drawer Navigator (contains tabs + drawer items)
const MainDrawer: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.background.primary,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text.secondary,
      }}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={MainTabNavigator}
        options={{ drawerLabel: 'Home' }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ drawerLabel: 'Settings' }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ drawerLabel: 'Profile' }}
      />
    </Drawer.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainDrawer} />
            <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
            <Stack.Screen name="TherapySettings" component={TherapySettingsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="BluetoothSettings" component={BluetoothSettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
