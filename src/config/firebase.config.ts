/**
 * Firebase Configuration
 * SmartHeal (RunVerve) - Firebase & Vertex AI Integration
 * 
 * ⚠️ DEVELOPMENT MODE: Firebase SDK not required
 * This file will work without Firebase installed
 * 
 * Setup Instructions (when ready):
 * 1. Run: npm install firebase
 * 2. Create a Firebase project at https://console.firebase.google.com
 * 3. Enable Authentication (Email/Password and Google Sign-In)
 * 4. Create a Firestore database
 * 5. Add your Firebase config to .env file
 * 6. Enable Vertex AI in Google Cloud Console
 */

// Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
};

// Vertex AI Configuration
export const vertexAIConfig = {
  projectId: import.meta.env.VITE_GCP_PROJECT_ID || firebaseConfig.projectId,
  location: import.meta.env.VITE_VERTEX_AI_LOCATION || "us-central1",
  model: import.meta.env.VITE_VERTEX_AI_MODEL || "gemini-pro",
  endpoint: import.meta.env.VITE_VERTEX_AI_ENDPOINT || ""
};

// Mock Firebase instances for development
let app: any = null;
let auth: any = null;
let firestore: any = null;
let functions: any = null;

// Initialize Firebase (only if Firebase SDK is installed)
export const initializeFirebase = async () => {
  try {
    // Try to dynamically import Firebase (won't crash if not installed)
    const { initializeApp, getApps, getApp } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');
    const { getFirestore } = await import('firebase/firestore');
    const { getFunctions } = await import('firebase/functions');

    // Check if Firebase is already initialized
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
      console.log('✅ Firebase initialized successfully');
    } else {
      app = getApp();
      console.log('✅ Firebase already initialized');
    }

    // Initialize services
    auth = getAuth(app);
    firestore = getFirestore(app);
    functions = getFunctions(app);

    return { app, auth, firestore, functions };
  } catch (error) {
    console.log('ℹ️ Firebase SDK not installed - running in development mode');
    console.log('ℹ️ To enable Firebase: npm install firebase');
    return { app: null, auth: null, firestore: null, functions: null };
  }
};

// Export initialized instances (safe fallbacks)
export const getFirebaseApp = () => app;
export const getFirebaseAuth = () => auth;
export const getFirebaseFirestore = () => firestore;
export const getFirebaseFunctions = () => functions;

// Development mode check
export const isDevelopmentMode = () => {
  return import.meta.env.DEV || firebaseConfig.apiKey === "YOUR_API_KEY_HERE" || !app;
};

// Firebase status check
export const checkFirebaseConfig = () => {
  const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" && app !== null;
  
  if (!isConfigured) {
    console.log('ℹ️ Running in development mode without Firebase');
  }
  
  return {
    isConfigured,
    isDevelopment: isDevelopmentMode(),
    projectId: firebaseConfig.projectId,
    isInstalled: app !== null
  };
};

export default firebaseConfig;
