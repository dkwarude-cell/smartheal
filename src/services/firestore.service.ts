/**
 * Firestore Service (Mock-Safe)
 * SmartHeal (RunVerve) - Database Layer
 * 
 * This service works in development mode without Firebase installed
 */

// Mock data storage
const mockDatabase = new Map<string, any>();

// Initialize mock collections
const initMockCollections = () => {
  if (!mockDatabase.has('users')) mockDatabase.set('users', new Map());
  if (!mockDatabase.has('therapySessions')) mockDatabase.set('therapySessions', new Map());
  if (!mockDatabase.has('devices')) mockDatabase.set('devices', new Map());
  if (!mockDatabase.has('aiAnalyses')) mockDatabase.set('aiAnalyses', new Map());
  if (!mockDatabase.has('userProgress')) mockDatabase.set('userProgress', new Map());
};

initMockCollections();

export const firestoreService = {
  // User Profile Operations
  createUserProfile: async (userId: string, profileData: any) => {
    try {
      const users = mockDatabase.get('users');
      const userProfile = {
        ...profileData,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      users.set(userId, userProfile);
      localStorage.setItem(`user_${userId}`, JSON.stringify(userProfile));

      console.log('✅ Mock user profile created:', userId);

      return {
        success: true,
        data: userProfile
      };
    } catch (error: any) {
      console.error('❌ Mock create profile error:', error);
      return {
        success: false,
        error: error.message || 'Failed to create profile'
      };
    }
  },

  getUserProfile: async (userId: string) => {
    try {
      const users = mockDatabase.get('users');
      let userProfile = users.get(userId);

      // Try localStorage if not in memory
      if (!userProfile) {
        const stored = localStorage.getItem(`user_${userId}`);
        if (stored) {
          userProfile = JSON.parse(stored);
          users.set(userId, userProfile);
        }
      }

      console.log('✅ Mock user profile retrieved:', userId);

      return {
        success: true,
        data: userProfile || null
      };
    } catch (error: any) {
      console.error('❌ Mock get profile error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get profile'
      };
    }
  },

  updateUserProfile: async (userId: string, updates: any) => {
    try {
      const users = mockDatabase.get('users');
      const existing = users.get(userId) || {};
      
      const updatedProfile = {
        ...existing,
        ...updates,
        userId,
        updatedAt: new Date().toISOString()
      };

      users.set(userId, updatedProfile);
      localStorage.setItem(`user_${userId}`, JSON.stringify(updatedProfile));

      console.log('✅ Mock user profile updated:', userId);

      return {
        success: true,
        data: updatedProfile
      };
    } catch (error: any) {
      console.error('❌ Mock update profile error:', error);
      return {
        success: false,
        error: error.message || 'Failed to update profile'
      };
    }
  },

  // Therapy Session Operations
  saveTherapySession: async (sessionData: any) => {
    try {
      const sessions = mockDatabase.get('therapySessions');
      const sessionId = `session_${Date.now()}`;
      
      const session = {
        ...sessionData,
        id: sessionId,
        createdAt: new Date().toISOString()
      };

      sessions.set(sessionId, session);

      // Save to localStorage
      const userId = sessionData.userId;
      const userSessions = JSON.parse(localStorage.getItem(`sessions_${userId}`) || '[]');
      userSessions.push(session);
      localStorage.setItem(`sessions_${userId}`, JSON.stringify(userSessions));

      console.log('✅ Mock therapy session saved:', sessionId);

      return {
        success: true,
        data: session,
        sessionId
      };
    } catch (error: any) {
      console.error('❌ Mock save session error:', error);
      return {
        success: false,
        error: error.message || 'Failed to save session'
      };
    }
  },

  getTherapySessions: async (userId: string, limit: number = 10) => {
    try {
      const userSessions = JSON.parse(localStorage.getItem(`sessions_${userId}`) || '[]');
      const sorted = userSessions.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      console.log('✅ Mock therapy sessions retrieved:', sorted.length);

      return {
        success: true,
        data: sorted.slice(0, limit)
      };
    } catch (error: any) {
      console.error('❌ Mock get sessions error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get sessions',
        data: []
      };
    }
  },

  // Device Operations
  saveDeviceConnection: async (deviceData: any) => {
    try {
      const devices = mockDatabase.get('devices');
      const deviceId = deviceData.deviceId || `device_${Date.now()}`;
      
      const device = {
        ...deviceData,
        id: deviceId,
        connectedAt: new Date().toISOString()
      };

      devices.set(deviceId, device);
      localStorage.setItem(`device_${deviceData.userId}`, JSON.stringify(device));

      console.log('✅ Mock device connection saved:', deviceId);

      return {
        success: true,
        data: device
      };
    } catch (error: any) {
      console.error('❌ Mock save device error:', error);
      return {
        success: false,
        error: error.message || 'Failed to save device'
      };
    }
  },

  getUserDevices: async (userId: string) => {
    try {
      const device = localStorage.getItem(`device_${userId}`);
      const devices = device ? [JSON.parse(device)] : [];

      console.log('✅ Mock user devices retrieved:', devices.length);

      return {
        success: true,
        data: devices
      };
    } catch (error: any) {
      console.error('❌ Mock get devices error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get devices',
        data: []
      };
    }
  },

  // AI Analysis Operations
  saveAIAnalysis: async (analysisData: any) => {
    try {
      const analyses = mockDatabase.get('aiAnalyses');
      const analysisId = `analysis_${Date.now()}`;
      
      const analysis = {
        ...analysisData,
        id: analysisId,
        createdAt: new Date().toISOString()
      };

      analyses.set(analysisId, analysis);

      // Save to localStorage
      const userId = analysisData.userId;
      const userAnalyses = JSON.parse(localStorage.getItem(`analyses_${userId}`) || '[]');
      userAnalyses.push(analysis);
      localStorage.setItem(`analyses_${userId}`, JSON.stringify(userAnalyses));

      console.log('✅ Mock AI analysis saved:', analysisId);

      return {
        success: true,
        data: analysis,
        analysisId
      };
    } catch (error: any) {
      console.error('❌ Mock save analysis error:', error);
      return {
        success: false,
        error: error.message || 'Failed to save analysis'
      };
    }
  },

  getAIAnalyses: async (userId: string, limit: number = 10) => {
    try {
      const userAnalyses = JSON.parse(localStorage.getItem(`analyses_${userId}`) || '[]');
      const sorted = userAnalyses.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      console.log('✅ Mock AI analyses retrieved:', sorted.length);

      return {
        success: true,
        data: sorted.slice(0, limit)
      };
    } catch (error: any) {
      console.error('❌ Mock get analyses error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get analyses',
        data: []
      };
    }
  },

  // User Progress Operations
  updateUserProgress: async (userId: string, progressData: any) => {
    try {
      const progress = mockDatabase.get('userProgress');
      
      const userProgress = {
        ...progressData,
        userId,
        updatedAt: new Date().toISOString()
      };

      progress.set(userId, userProgress);
      localStorage.setItem(`progress_${userId}`, JSON.stringify(userProgress));

      console.log('✅ Mock user progress updated:', userId);

      return {
        success: true,
        data: userProgress
      };
    } catch (error: any) {
      console.error('❌ Mock update progress error:', error);
      return {
        success: false,
        error: error.message || 'Failed to update progress'
      };
    }
  },

  getUserProgress: async (userId: string) => {
    try {
      const stored = localStorage.getItem(`progress_${userId}`);
      const progressData = stored ? JSON.parse(stored) : null;

      console.log('✅ Mock user progress retrieved:', userId);

      return {
        success: true,
        data: progressData
      };
    } catch (error: any) {
      console.error('❌ Mock get progress error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get progress'
      };
    }
  },

  // Batch Operations
  batchWrite: async (operations: any[]) => {
    try {
      const results = [];

      for (const op of operations) {
        const { collection, docId, data, operation } = op;
        
        if (operation === 'set' || operation === 'update') {
          const coll = mockDatabase.get(collection);
          coll.set(docId, { ...data, id: docId });
          results.push({ success: true, docId });
        }
      }

      console.log('✅ Mock batch write completed:', results.length);

      return {
        success: true,
        data: results
      };
    } catch (error: any) {
      console.error('❌ Mock batch write error:', error);
      return {
        success: false,
        error: error.message || 'Failed to execute batch write'
      };
    }
  },

  // Query Operations
  queryDocuments: async (collection: string, filters: any[]) => {
    try {
      const coll = mockDatabase.get(collection);
      const allDocs = Array.from(coll.values());
      
      // Simple filtering (basic implementation)
      let filtered = allDocs;
      for (const filter of filters) {
        const { field, operator, value } = filter;
        filtered = filtered.filter((doc: any) => {
          if (operator === '==') return doc[field] === value;
          if (operator === '>') return doc[field] > value;
          if (operator === '<') return doc[field] < value;
          if (operator === '>=') return doc[field] >= value;
          if (operator === '<=') return doc[field] <= value;
          return true;
        });
      }

      console.log('✅ Mock query completed:', filtered.length);

      return {
        success: true,
        data: filtered
      };
    } catch (error: any) {
      console.error('❌ Mock query error:', error);
      return {
        success: false,
        error: error.message || 'Failed to query documents',
        data: []
      };
    }
  }
};

export default firestoreService;
