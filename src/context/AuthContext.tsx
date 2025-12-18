import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseAuthService } from '../services/firebase-auth.service';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  profileType?: 'athlete' | 'health' | 'coach';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const authService = new FirebaseAuthService();

  useEffect(() => {
    // Load user from storage
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('@user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Subscribe to auth state changes
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        setUser(userData);
        AsyncStorage.setItem('@user', JSON.stringify(userData));
      } else {
        setUser(null);
        AsyncStorage.removeItem('@user');
      }
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await authService.signInWithEmail(email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await authService.signUpWithEmail(email, password);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      await AsyncStorage.clear();
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
