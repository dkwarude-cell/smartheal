# SmartHeal - React Native App

![SmartHeal Logo](https://via.placeholder.com/800x200/FF0000/FFFFFF?text=SmartHeal+-+AI-Powered+ITT+Therapy)

**AI-Powered ITT Therapy Device App**  
_Built by Runverve_

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (installed automatically with dependencies)
- For iOS: macOS with Xcode
- For Android: Android Studio

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

```bash
# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on web (for testing)
npm run web
```

## 📱 Project Structure

```
SmartHeal/
├── App.tsx                 # Main app entry point
├── index.js                # Root entry point
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── tsconfig.json           # TypeScript configuration
├── metro.config.js         # Metro bundler configuration
├── package.json            # Dependencies
│
├── src/
│   ├── config/
│   │   └── firebase.ts     # Firebase configuration
│   │
│   ├── context/
│   │   ├── AuthContext.tsx      # Authentication context
│   │   ├── ThemeContext.tsx     # Theme management
│   │   └── DeviceContext.tsx    # Device connection context
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx     # Main navigation
│   │   └── MainTabNavigator.tsx # Tab navigation
│   │
│   ├── screens/
│   │   ├── StartScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── OTPScreen.tsx
│   │   ├── ProfileTypeSelectionScreen.tsx
│   │   ├── ProfileDetailsScreen.tsx
│   │   ├── InterestsSelectionScreen.tsx
│   │   ├── WelcomeScreen.tsx
│   │   ├── DeviceConnectionScreen.tsx
│   │   ├── ConnectionSuccessScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── TherapyScreen.tsx
│   │   ├── AIAssistantScreen.tsx
│   │   ├── ReportsScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   └── services/
│       ├── firebase-auth.service.ts
│       └── firestore.service.ts
│
└── assets/
    ├── icon.png
    ├── splash.png
    └── adaptive-icon.png
```

## ✨ Features

### Authentication Flow

- ✅ Welcome & Start Screen
- ✅ Email/Password Login & Signup
- ✅ OTP Verification
- ✅ Multi-step Profile Setup (Type, Details, Interests)
- ✅ Device Connection Flow

### Main Application

- ✅ **Home Dashboard** - Real-time stats, quick actions, device status
- ✅ **Therapy Management** - Session controls, body part selector, intensity settings
- ✅ **AI Assistant** - Voice interaction, camera guidance
- ✅ **Reports & Analytics** - Progress tracking, insights, session history
- ✅ **Profile Management** - User settings, preferences

### Technical Features

- ✅ Dark theme UI with gradients
- ✅ Offline-first architecture with AsyncStorage
- ✅ Type-safe with TypeScript
- ✅ Responsive layouts
- ✅ Firebase Authentication & Firestore
- ✅ React Navigation v6
- ✅ Context API for state management

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Download your Firebase config
5. Update `src/config/firebase.ts` with your credentials:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};
```

## 📦 Building for Production

### Android APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
npm run build:android
```

### iOS Build

```bash
# Build for iOS
npm run build:ios
```

## 🎨 Customization

### Theme Colors

Edit `src/context/ThemeContext.tsx`:

```typescript
const darkColors = {
  primary: "#FF0000", // Red
  secondary: "#00C6AE", // Teal
  background: "#000000", // Black
  // ... more colors
};
```

### Navigation

Add new screens in `src/navigation/AppNavigator.tsx` or `MainTabNavigator.tsx`.

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**

   ```bash
   npm start -- --reset-cache
   ```

2. **Pod install fails (iOS)**

   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build fails**
   - Make sure Android Studio is installed
   - Set up ANDROID_HOME environment variable

## 📄 License

Proprietary - © 2025 Runverve. All rights reserved.

## 🤝 Support

For issues and questions:

- Email: support@runverve.com
- Website: https://runverve.com

## 🎯 Roadmap

- [ ] Push notifications
- [ ] Bluetooth device pairing
- [ ] Advanced analytics
- [ ] Social features
- [ ] Offline mode improvements
- [ ] Apple Health / Google Fit integration

---

**Made with ❤️ by Runverve**
