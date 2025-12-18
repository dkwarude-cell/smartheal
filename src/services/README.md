# SmartHeal Services Documentation

This directory contains all backend services for the SmartHeal (RunVerve) application.

---

## 📁 Services Overview

### 1. Firebase Auth Service (`firebase-auth.service.ts`)

Handles all authentication operations.

#### Methods

**`signUpWithEmail(email, password, displayName, phone)`**
- Creates new user account
- Sends verification email
- Creates Firestore profile
- Returns: `{ user, profile }`

**`signInWithEmail(email, password)`**
- Authenticates existing user
- Retrieves user profile
- Returns: `{ user, profile }`

**`signInWithGoogle()`**
- OAuth Google sign-in
- Creates profile if first time
- Returns: `{ user, profile }`

**`signOut()`**
- Signs out current user
- Clears session

**`resetPassword(email)`**
- Sends password reset email

**`getCurrentUser()`**
- Returns current user or null

**`onAuthStateChange(callback)`**
- Listens to auth state changes
- Returns unsubscribe function

#### Example

```typescript
import { firebaseAuthService } from './services/firebase-auth.service';

// Sign up
const { user, profile } = await firebaseAuthService.signUpWithEmail(
  'user@example.com',
  'password123',
  'John Doe',
  '+1234567890'
);

// Sign in
const { user, profile } = await firebaseAuthService.signInWithEmail(
  'user@example.com',
  'password123'
);

// Google sign-in
const { user, profile } = await firebaseAuthService.signInWithGoogle();

// Sign out
await firebaseAuthService.signOut();
```

---

### 2. Firestore Service (`firestore.service.ts`)

Handles all database operations.

#### User Profile Methods

**`createUserProfile(uid, profile)`**
- Creates user profile in Firestore
- Called automatically on signup

**`getUserProfile(uid)`**
- Retrieves user profile
- Returns: `UserProfile | null`

**`updateUserProfile(uid, updates)`**
- Updates user profile fields
- Merges with existing data

#### Therapy Session Methods

**`createTherapySession(session)`**
- Saves therapy session
- Returns: session ID

**`getUserSessions(userId, limit)`**
- Gets user's therapy sessions
- Returns: `TherapySession[]`

**`updateTherapySession(sessionId, updates)`**
- Updates session data

#### Health Data Methods

**`saveHealthData(data)`**
- Saves health metrics
- Returns: data ID

**`getUserHealthData(userId, limit)`**
- Gets user's health data
- Returns: `HealthData[]`

#### AI Analysis Methods

**`saveAIAnalysis(analysis)`**
- Saves AI insights
- Returns: analysis ID

**`getUserAIAnalyses(userId, limit)`**
- Gets user's AI analyses
- Returns: `AIAnalysis[]`

#### Device Methods

**`saveDeviceInfo(device)`**
- Saves device information

**`getUserDevices(userId)`**
- Gets user's devices
- Returns: `DeviceInfo[]`

#### Example

```typescript
import { firestoreService } from './services/firestore.service';

// Create therapy session
const sessionId = await firestoreService.createTherapySession({
  userId: 'user-123',
  deviceId: 'device-456',
  mode: 'guided',
  startTime: new Date().toISOString(),
  duration: 1200,
  intensity: 5,
  targetArea: 'lower back',
  painBefore: 7,
  painAfter: 3,
  completed: true
});

// Get user sessions
const sessions = await firestoreService.getUserSessions('user-123', 50);

// Update user profile
await firestoreService.updateUserProfile('user-123', {
  healthProfile: {
    ...profile.healthProfile,
    weight: 75
  }
});

// Save health data
await firestoreService.saveHealthData({
  userId: 'user-123',
  timestamp: new Date().toISOString(),
  type: 'session',
  data: { heartRate: 72, calories: 150 },
  source: 'smartHeal'
});
```

---

### 3. Vertex AI Service (`vertex-ai.service.ts`)

Handles all AI interactions through Firebase Cloud Functions.

#### Methods

**`getHealthInsights(userId, healthProfile, recentSessions)`**
- Analyzes health data
- Provides personalized insights
- Returns: `AIResponse`

**`getTherapyRecommendations(userId, painLevel, targetArea, context)`**
- Generates therapy recommendations
- Based on pain and target area
- Returns: `AIResponse`

**`analyzeBodyPlacement(userId, imageBase64, targetArea)`**
- Computer vision analysis
- Validates electrode placement
- Returns: `AIResponse`

**`chatWithAI(userId, message, conversationHistory)`**
- Conversational AI
- Context-aware responses
- Returns: `AIResponse`

**`predictRecovery(userId, condition, currentProgress)`**
- Recovery timeline prediction
- Milestone tracking
- Returns: `AIResponse`

#### AIResponse Type

```typescript
interface AIResponse {
  success: boolean;
  data?: {
    insights: string[];
    recommendations: string[];
    confidence: number;
    reasoning?: string;
  };
  error?: string;
  metadata?: {
    modelVersion: string;
    processingTime: number;
    tokens?: number;
  };
}
```

#### Example

```typescript
import { vertexAIService } from './services/vertex-ai.service';

// Get health insights
const insights = await vertexAIService.getHealthInsights(
  'user-123',
  {
    age: 30,
    weight: 70,
    height: 175,
    medicalConditions: ['Back pain'],
    goals: ['Pain relief']
  },
  recentSessions
);

console.log('Insights:', insights.data.insights);
console.log('Recommendations:', insights.data.recommendations);
console.log('Confidence:', insights.data.confidence);

// Get therapy recommendations
const recs = await vertexAIService.getTherapyRecommendations(
  'user-123',
  7, // pain level
  'lower back'
);

// Analyze body placement
const analysis = await vertexAIService.analyzeBodyPlacement(
  'user-123',
  'data:image/jpeg;base64,/9j/4AAQ...',
  'lower back'
);

// Chat with AI
const response = await vertexAIService.chatWithAI(
  'user-123',
  'What intensity should I use for back pain?',
  []
);

// Predict recovery
const prediction = await vertexAIService.predictRecovery(
  'user-123',
  'Lower back strain',
  { weeksInTherapy: 2, improvementPercent: 30 }
);
```

---

## 🔧 Development Mode

All services support **development mode** for testing without Firebase:

```typescript
import { isDevelopmentMode } from '../config/firebase.config';

if (isDevelopmentMode()) {
  // Use mock data
  // Use localStorage
  // Simulate responses
}
```

### Enable Development Mode

**Option 1:** Don't configure Firebase (automatic)

**Option 2:** Set environment variable:
```bash
VITE_DEV_MODE=true
```

### Development Mode Features

- ✅ **Mock Authentication:** Instant user creation
- ✅ **LocalStorage:** Data persists locally
- ✅ **Simulated AI:** Intelligent mock responses
- ✅ **No Costs:** No Firebase/Vertex AI calls
- ✅ **Fast Testing:** No network latency

---

## 🔒 Security

### Authentication
- All database operations require authentication
- User can only access their own data
- Passwords are hashed (Firebase handles)
- Tokens auto-refresh

### Database Rules

Firestore security rules ensure users can only access their own data:

```javascript
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}

match /therapy_sessions/{sessionId} {
  allow read, write: if resource.data.userId == request.auth.uid;
}
```

### Cloud Functions

All Cloud Functions verify authentication:

```typescript
if (!context.auth) {
  throw new HttpsError('unauthenticated', 'Must be authenticated');
}
```

---

## 📊 Data Flow

### User Signup
```
1. signUpWithEmail() called
2. Firebase creates user account
3. createUserProfile() creates Firestore document
4. User profile returned
```

### Therapy Session
```
1. createTherapySession() called
2. Session saved to Firestore
3. Cloud Function analyzes session (optional)
4. AI insights generated
5. Insights saved to ai_analysis collection
```

### AI Chat
```
1. chatWithAI() called
2. Cloud Function invoked
3. Vertex AI generates response
4. Response saved to Firestore
5. Response returned to client
```

---

## 🧪 Testing

### Test Authentication
```typescript
// Test signup
const { user } = await firebaseAuthService.signUpWithEmail(
  'test@test.com',
  'password123',
  'Test User',
  '+1234567890'
);

expect(user.email).toBe('test@test.com');
```

### Test Database
```typescript
// Test session creation
const sessionId = await firestoreService.createTherapySession({
  userId: 'test-user',
  deviceId: 'test-device',
  mode: 'guided',
  duration: 1200,
  intensity: 5,
  targetArea: 'back'
});

expect(sessionId).toBeTruthy();

// Test session retrieval
const sessions = await firestoreService.getUserSessions('test-user');
expect(sessions.length).toBeGreaterThan(0);
```

### Test AI
```typescript
// Test health insights
const response = await vertexAIService.getHealthInsights(
  'test-user',
  mockHealthProfile,
  []
);

expect(response.success).toBe(true);
expect(response.data.insights).toBeDefined();
expect(response.data.insights.length).toBeGreaterThan(0);
```

---

## 🐛 Error Handling

All services implement comprehensive error handling:

```typescript
try {
  const result = await firebaseAuthService.signInWithEmail(email, password);
} catch (error) {
  // error.message contains user-friendly error
  console.error('Login failed:', error.message);
  
  // Common errors:
  // - "Invalid email address"
  // - "Incorrect password"
  // - "No account found with this email"
  // - "Too many failed attempts. Please try again later."
}
```

### Error Types

**Authentication Errors:**
- `auth/email-already-in-use`
- `auth/invalid-email`
- `auth/weak-password`
- `auth/user-not-found`
- `auth/wrong-password`

**Database Errors:**
- `permission-denied`
- `not-found`
- `already-exists`

**AI Errors:**
- `unauthenticated`
- `internal`
- `quota-exceeded`

---

## 💡 Best Practices

### 1. Always Handle Errors

```typescript
try {
  const result = await service.method();
} catch (error) {
  toast.error(error.message);
  // Handle error appropriately
}
```

### 2. Use Loading States

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleAction = async () => {
  setIsLoading(true);
  try {
    await service.method();
  } finally {
    setIsLoading(false);
  }
};
```

### 3. Validate Input

```typescript
if (!email || !password) {
  toast.error('Please fill all fields');
  return;
}

if (password.length < 6) {
  toast.error('Password must be at least 6 characters');
  return;
}
```

### 4. Cache When Appropriate

```typescript
const [cachedData, setCachedData] = useState(null);

const getData = async () => {
  if (cachedData) return cachedData;
  
  const data = await service.getData();
  setCachedData(data);
  return data;
};
```

---

## 📚 Additional Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Cloud Functions Documentation](https://firebase.google.com/docs/functions)

---

## ✅ Service Status

| Service | Status | Features | Tests |
|---------|--------|----------|-------|
| Firebase Auth | ✅ Ready | Email, Google OAuth | ✅ Tested |
| Firestore | ✅ Ready | Full CRUD | ✅ Tested |
| Vertex AI | ✅ Ready | 5 AI features | ✅ Tested |
| Development Mode | ✅ Ready | Mock services | ✅ Tested |

---

**All services are production-ready and fully documented!** 🚀

