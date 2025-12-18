/**
 * Firebase Configuration for React Native
 * SmartHeal (Runverve) - Firebase & Vertex AI Integration
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getFunctions, Functions } from 'firebase/functions';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Firebase configuration from environment variables or Constants
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY || 'YOUR_API_KEY_HERE',
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN || 'your-app.firebaseapp.com',
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET || 'your-app.appspot.com',
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

// Vertex AI Configuration
export const vertexAIConfig = {
  projectId: Constants.expoConfig?.extra?.GCP_PROJECT_ID || firebaseConfig.projectId,
  location: Constants.expoConfig?.extra?.VERTEX_AI_LOCATION || 'us-central1',
  model: Constants.expoConfig?.extra?.VERTEX_AI_MODEL || 'gemini-pro',
  endpoint: Constants.expoConfig?.extra?.VERTEX_AI_ENDPOINT || '',
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;
let functions: Functions;
let storage: FirebaseStorage;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    
    // Initialize Auth with AsyncStorage persistence for React Native
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
    
    firestore = getFirestore(app);
    functions = getFunctions(app);
    storage = getStorage(app);
    
    console.log('✅ Firebase initialized successfully');
  } else {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
    functions = getFunctions(app);
    storage = getStorage(app);
    
    console.log('✅ Firebase already initialized');
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw error;
}

// Export initialized instances
export { app, auth, firestore, functions, storage };

// Development mode check
export const isDevelopmentMode = () => {
  return __DEV__ || firebaseConfig.apiKey === 'YOUR_API_KEY_HERE';
};

// Firebase status check
export const checkFirebaseConfig = () => {
  const isConfigured = firebaseConfig.apiKey !== 'YOUR_API_KEY_HERE';
  
  if (!isConfigured) {
    console.warn('⚠️ Firebase not configured - using development mode');
  }
  
  return {
    isConfigured,
    isDevelopment: isDevelopmentMode(),
    projectId: firebaseConfig.projectId,
  };
};

export default firebaseConfig;
