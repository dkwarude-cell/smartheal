/**
 * Lightweight auth service without Firebase
 * Uses AsyncStorage for persistence only.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export type MinimalUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
};

const STORAGE_KEY = '@user';

export class FirebaseAuthService {
  async signUpWithEmail(email: string, _password: string, displayName?: string) {
    const user: MinimalUser = {
      uid: `local-${Date.now()}`,
      email,
      displayName: displayName || null,
      photoURL: null,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user as any;
  }

  async signInWithEmail(email: string, _password: string) {
    // Simulate sign-in by loading stored user or creating a temp one
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as any;
    const user: MinimalUser = {
      uid: `local-${Date.now()}`,
      email,
      displayName: null,
      photoURL: null,
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user as any;
  }

  async signOut() {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  onAuthStateChanged(callback: (user: any | null) => void) {
    // Immediately emit stored user once; return unsubscribe no-op
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      callback(stored ? JSON.parse(stored) : null);
    })();
    return () => {};
  }

  getCurrentUser() {
    // Not used by callers directly; provide null
    return null;
  }

  async updateUserProfile(updates: { displayName?: string; photoURL?: string }) {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    const user: MinimalUser = JSON.parse(stored);
    const updated = { ...user, ...updates };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated as any;
  }
}

export default new FirebaseAuthService();
