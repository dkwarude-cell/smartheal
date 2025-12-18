# 🔥 Firebase GCP Integration Guide
## Complete Step-by-Step Setup for SmartHeal App

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Access Firebase from GCP](#step-1-access-firebase-from-gcp)
3. [Step 2: Create Firebase Project](#step-2-create-firebase-project)
4. [Step 3: Enable Required Services](#step-3-enable-required-services)
5. [Step 4: Get Configuration Keys](#step-4-get-configuration-keys)
6. [Step 5: Configure App](#step-5-configure-app)
7. [Step 6: Enable Vertex AI](#step-6-enable-vertex-ai)
8. [Step 7: Test Connection](#step-7-test-connection)
9. [Step 8: Deploy Functions (Optional)](#step-8-deploy-functions-optional)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

✅ **What You Need:**
- Google Cloud Platform (GCP) account
- Credit card (for GCP billing - free tier available)
- Node.js v16+ installed
- Text editor (VS Code recommended)
- Terminal access

---

## Step 1: Access Firebase from GCP

### Option A: From Google Cloud Console

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Sign in with your Google account

2. **Navigate to Firebase**
   - In the search bar at top, type "Firebase"
   - Click "Firebase" from the dropdown
   - OR visit directly: https://console.firebase.google.com

### Option B: Direct Firebase Access

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Sign in with the same Google account

---

## Step 2: Create Firebase Project

### 2.1 Create New Project

1. **Click "Add Project" or "Create a project"**

2. **Enter Project Details:**
   ```
   Project Name: SmartHeal-Therapy
   Project ID: smartheal-therapy-[auto-generated]
   ```
   
3. **Google Analytics (Optional):**
   - Toggle ON if you want analytics
   - Recommended: Enable for production apps
   - Click "Continue"

4. **Select Analytics Account:**
   - Choose "Default Account for Firebase"
   - Click "Create Project"

5. **Wait for Setup** (30-60 seconds)
   - Firebase is creating your project...
   - Click "Continue" when done

### 2.2 Verify Project Created

✅ You should see the Firebase Console dashboard with:
- Project name: "SmartHeal-Therapy"
- Project overview panel
- Left sidebar with menu options

---

## Step 3: Enable Required Services

### 3.1 Add Android App

1. **In Firebase Console, click the Android icon** (gear/settings icon)
   - Or click "Add app" → Android

2. **Register Your App:**
   ```
   Android package name: com.runverve.smartheal
   App nickname (optional): SmartHeal Therapy
   Debug signing certificate (optional): [Leave blank for now]
   ```
   
3. **Click "Register app"**

### 3.2 Download google-services.json

1. **Download the `google-services.json` file**
   - This file contains your Firebase configuration
   - Save it - you'll need it later

2. **Click "Next"** (skip the SDK instructions for now)

3. **Click "Continue to console"**

### 3.3 Enable Authentication

1. **In left sidebar, click "Build" → "Authentication"**

2. **Click "Get started"**

3. **Enable Sign-in Methods:**
   
   **A) Email/Password:**
   - Click "Email/Password"
   - Toggle "Enable"
   - Toggle "Email link (passwordless sign-in)" if desired
   - Click "Save"
   
   **B) Phone:**
   - Click "Phone"
   - Toggle "Enable"
   - Click "Save"

### 3.4 Enable Firestore Database

1. **In left sidebar, click "Build" → "Firestore Database"**

2. **Click "Create database"**

3. **Select Mode:**
   ```
   Start in test mode (for development)
   ```
   - Test mode rules expire in 30 days
   - Click "Next"

4. **Choose Location:**
   ```
   Select region closest to your users:
   - us-central1 (United States)
   - europe-west1 (Belgium)
   - asia-southeast1 (Singapore)
   ```
   - Click "Enable"

5. **Wait for creation** (30-60 seconds)

### 3.5 Enable Cloud Storage (for images)

1. **In left sidebar, click "Build" → "Storage"**

2. **Click "Get started"**

3. **Security Rules:**
   ```
   Start in test mode
   ```
   - Click "Next"

4. **Choose Location:**
   - Use same location as Firestore
   - Click "Done"

---

## Step 4: Get Configuration Keys

### 4.1 Get Firebase Config for React Native

1. **In Firebase Console:**
   - Click gear icon ⚙️ → "Project settings"

2. **Scroll down to "Your apps" section**

3. **Find your Android app**
   - You should see "SmartHeal Therapy"

4. **Click "Add app" → Web** (Yes, for React Native we use Web config)

5. **Register Web App:**
   ```
   App nickname: SmartHeal Web Config
   Also set up Firebase Hosting: [Leave unchecked]
   ```
   - Click "Register app"

6. **Copy Firebase Configuration:**
   
   You'll see code like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "smartheal-therapy.firebaseapp.com",
     projectId: "smartheal-therapy",
     storageBucket: "smartheal-therapy.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456",
     measurementId: "G-XXXXXXXXXX"
   };
   ```

7. **COPY THESE VALUES** - You'll need them in Step 5

### 4.2 Get Vertex AI Project ID

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com

2. **Select your project** "SmartHeal-Therapy" from dropdown

3. **Note your Project ID:**
   ```
   Project ID: smartheal-therapy-xxxxx
   ```
   - Find it at top of page or in project dropdown

---

## Step 5: Configure App

### 5.1 Update Firebase Config File

1. **Open your terminal:**
   ```bash
   cd rn-app
   ```

2. **Open the firebase config file:**
   ```bash
   nano src/config/firebase.ts
   # Or use VS Code: code src/config/firebase.ts
   ```

3. **Replace the placeholder config** with your actual config:

   **BEFORE:**
   ```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

   **AFTER (with your actual values):**
   ```typescript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "smartheal-therapy.firebaseapp.com",
     projectId: "smartheal-therapy",
     storageBucket: "smartheal-therapy.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456"
   };
   ```

4. **Save the file:**
   - Press `Ctrl+O` (save), then `Ctrl+X` (exit) for nano
   - Or `Cmd/Ctrl+S` in VS Code

### 5.2 Create Environment Variables (Optional - Recommended)

For better security, use environment variables:

1. **Create `.env` file in `/rn-app/`:**
   ```bash
   touch .env
   ```

2. **Add your config to `.env`:**
   ```env
   FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   FIREBASE_AUTH_DOMAIN=smartheal-therapy.firebaseapp.com
   FIREBASE_PROJECT_ID=smartheal-therapy
   FIREBASE_STORAGE_BUCKET=smartheal-therapy.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=123456789012
   FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   VERTEX_AI_PROJECT_ID=smartheal-therapy
   ```

3. **Update `firebase.ts` to use env variables:**
   ```typescript
   import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, /* etc */ } from '@env';

   const firebaseConfig = {
     apiKey: FIREBASE_API_KEY,
     authDomain: FIREBASE_AUTH_DOMAIN,
     projectId: FIREBASE_PROJECT_ID,
     storageBucket: FIREBASE_STORAGE_BUCKET,
     messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
     appId: FIREBASE_APP_ID
   };
   ```

4. **Add `.env` to `.gitignore`:**
   ```bash
   echo ".env" >> .gitignore
   ```

---

## Step 6: Enable Vertex AI

### 6.1 Enable Vertex AI API

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com

2. **Select your project** "SmartHeal-Therapy"

3. **Enable Vertex AI API:**
   - Search "Vertex AI API" in search bar
   - Click "Vertex AI API"
   - Click "ENABLE"
   - Wait 30-60 seconds

### 6.2 Enable Generative AI

1. **In GCP Console, search for "Generative AI Studio"**

2. **Click on "Generative AI Studio"**

3. **Enable the API** if prompted

### 6.3 Create Service Account for Vertex AI

1. **Go to IAM & Admin → Service Accounts:**
   - https://console.cloud.google.com/iam-admin/serviceaccounts

2. **Click "CREATE SERVICE ACCOUNT"**

3. **Enter details:**
   ```
   Service account name: smartheal-vertex-ai
   Service account ID: smartheal-vertex-ai (auto-generated)
   Description: Service account for Vertex AI integration
   ```
   - Click "CREATE AND CONTINUE"

4. **Grant roles:**
   - Click "Select a role"
   - Search and add: "Vertex AI User"
   - Click "CONTINUE"

5. **Click "DONE"**

6. **Create JSON Key:**
   - Click on the newly created service account
   - Go to "KEYS" tab
   - Click "ADD KEY" → "Create new key"
   - Select "JSON"
   - Click "CREATE"
   - **SAVE THIS JSON FILE SECURELY** (never commit to Git!)

### 6.4 Configure Vertex AI in App

1. **Add the Project ID to constants:**
   ```bash
   nano src/config/constants.ts
   ```

2. **Add Vertex AI config:**
   ```typescript
   export const VERTEX_AI_CONFIG = {
     projectId: 'smartheal-therapy', // Your project ID
     location: 'us-central1',        // Same as Firestore
     model: 'gemini-pro-vision'      // For image analysis
   };
   ```

---

## Step 7: Test Connection

### 7.1 Install Dependencies

```bash
cd rn-app
npm install
```

### 7.2 Start Development Server

```bash
npm start
```

### 7.3 Test Authentication

1. **Open app on device/emulator**

2. **Try to sign up with email/password**
   - If successful: ✅ Firebase Auth working!

3. **Check Firebase Console:**
   - Go to Authentication → Users
   - You should see your test user

### 7.4 Test Firestore

1. **In Firebase Console:**
   - Go to Firestore Database
   - Check if collections are created when you use the app

### 7.5 Test Storage

1. **Try to upload an image in the app**

2. **Check Firebase Console:**
   - Go to Storage
   - You should see uploaded files

---

## Step 8: Deploy Functions (Optional)

If you want to use Cloud Functions for backend logic:

### 8.1 Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 8.2 Login to Firebase

```bash
firebase login
```

### 8.3 Initialize Functions

```bash
cd rn-app
firebase init functions
```

**Select:**
- Use existing project: SmartHeal-Therapy
- Language: TypeScript
- ESLint: Yes
- Install dependencies: Yes

### 8.4 Deploy Functions

```bash
firebase deploy --only functions
```

---

## 🎯 Quick Reference

### Essential URLs

| Service | URL |
|---------|-----|
| Firebase Console | https://console.firebase.google.com |
| GCP Console | https://console.cloud.google.com |
| Vertex AI Studio | https://console.cloud.google.com/vertex-ai |
| Project Settings | Firebase Console → ⚙️ → Project settings |

### Configuration Checklist

✅ **Firebase Setup:**
- [ ] Project created
- [ ] Android app registered
- [ ] Web app registered (for config)
- [ ] Authentication enabled (Email + Phone)
- [ ] Firestore enabled
- [ ] Storage enabled

✅ **App Configuration:**
- [ ] `firebase.ts` updated with config
- [ ] Firebase config tested
- [ ] `.env` file created (optional)
- [ ] `.gitignore` includes `.env`

✅ **Vertex AI Setup:**
- [ ] Vertex AI API enabled
- [ ] Service account created
- [ ] JSON key downloaded
- [ ] Project ID configured in app

---

## 🔧 Troubleshooting

### Issue: "Firebase app not initialized"

**Solution:**
```typescript
// Make sure firebase.ts exports initialized app
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### Issue: "Authentication failed"

**Solutions:**
1. Check if Email/Password is enabled in Firebase Console
2. Verify API key in `firebase.ts`
3. Check network connection

### Issue: "Firestore permission denied"

**Solution:**
Update Firestore rules in Firebase Console:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Issue: "Vertex AI API not enabled"

**Solution:**
1. Go to GCP Console
2. Search "Vertex AI API"
3. Click "ENABLE"

### Issue: "Storage upload fails"

**Solution:**
Update Storage rules in Firebase Console:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📱 Next Steps

1. **Test all features:**
   - Sign up / Login
   - Profile creation
   - Image upload
   - Device connection

2. **Secure your app:**
   - Update Firestore rules
   - Update Storage rules
   - Add rate limiting

3. **Build APK:**
   - Follow `APK_BUILD_GUIDE.md`
   - Test on real device

4. **Deploy to Production:**
   - Update rules to production mode
   - Enable billing alerts
   - Set up monitoring

---

## 🎉 Success!

Your SmartHeal app is now connected to Firebase and Vertex AI!

**What's Working:**
✅ User authentication (email + phone)
✅ Firestore database for user data
✅ Cloud Storage for images
✅ Vertex AI ready for AI analysis

**Next:** Start building features and test thoroughly!

---

## 📞 Need Help?

- Firebase Documentation: https://firebase.google.com/docs
- Vertex AI Documentation: https://cloud.google.com/vertex-ai/docs
- React Native Firebase: https://rnfirebase.io
- Stack Overflow: Tag your questions with `firebase` and `react-native`

---

**Last Updated:** October 17, 2025
**Version:** 1.0
**App:** SmartHeal Therapy
