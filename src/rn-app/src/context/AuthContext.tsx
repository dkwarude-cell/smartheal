/**
 * Authentication Context
 * SmartHeal App - Global Auth State Management
 */

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../types/user.types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<UserProfile>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from AsyncStorage on app start
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem('@smartheal:user');
      if (userJson) {
        const userData = JSON.parse(userJson);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: UserProfile) => {
    try {
      await AsyncStorage.setItem('@smartheal:user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@smartheal:user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const updateUser = async (userData: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const updatedUser = {
        ...user,
        ...userData,
        updatedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem('@smartheal:user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    await loadUser();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
