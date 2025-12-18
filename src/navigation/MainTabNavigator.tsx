import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Tab Screens
import HomeScreen from '../screens/HomeScreen';
import TherapyScreen from '../screens/TherapyScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#333333',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#FF0000',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Therapy"
        component={TherapyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="hospital-box" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AI Assistant"
        component={AIAssistantScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="robot" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-line" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
