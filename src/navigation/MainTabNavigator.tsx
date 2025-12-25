import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Tab Screens
import HomeScreen from '../screens/HomeScreen';
import TherapyScreen from '../screens/TherapyScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import ReportsScreen from '../screens/ReportsScreen';
import CoachHomeScreen from '../screens/CoachHomeScreen';
import HealthHomeScreen from '../screens/HealthHomeScreen';
import VoiceAssistantScreen from '../screens/VoiceAssistantScreen';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

// Custom Tab Icon with background for active state
const TabIcon = ({ focused, iconName, label }: { focused: boolean; iconName: string; label: string }) => (
  <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
    <Icon 
      name={iconName} 
      size={24} 
      color={focused ? '#F52E32' : '#9CA3AF'} 
    />
  </View>
);

export const MainTabNavigator = () => {
  const { user } = useAuth();
  const profileType = user?.profileType ?? 'athlete';
  const RoleHome = profileType === 'coach' ? CoachHomeScreen : profileType === 'health' ? HealthHomeScreen : HomeScreen;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 16,
          paddingTop: 12,
          paddingHorizontal: 8,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: '#F52E32',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={RoleHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home-outline" label="Home" />
          ),
        }}
      />
      <Tab.Screen
        name="Therapy"
        component={TherapyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="pulse" label="Therapy" />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="chart-bar" label="Reports" />
          ),
        }}
      />
      <Tab.Screen
        name="AI"
        component={AIAssistantScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="robot-outline" label="AI" />
          ),
        }}
      />

      <Tab.Screen
        name="Voice"
        component={VoiceAssistantScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="microphone-outline" label="Voice" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 48,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconActive: {
    backgroundColor: '#FEE2E2',
  },
});
