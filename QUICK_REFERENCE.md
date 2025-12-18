# 🚀 SmartHeal RN - Quick Reference

## Essential Commands

```bash
# Installation
npm install                    # Install all dependencies (REQUIRED FIRST)

# Development
npm start                      # Start Expo development server
npm run android                # Run on Android emulator
npm run ios                    # Run on iOS simulator (macOS only)
npm run web                    # Run in web browser

# Cleanup
npm start -- --reset-cache     # Clear Metro bundler cache

# Production
npm run build:android          # Build Android APK
npm run build:ios              # Build iOS IPA
```

## 📁 Project Structure

```
src/
├── config/
│   └── firebase.ts           # Firebase configuration
├── context/
│   ├── AuthContext.tsx       # User auth state
│   ├── ThemeContext.tsx      # App theme
│   └── DeviceContext.tsx     # Device connection
├── navigation/
│   ├── AppNavigator.tsx      # Main navigation
│   └── MainTabNavigator.tsx  # Tab navigation
├── screens/
│   ├── Auth Screens (10)     # Login, signup, profile setup
│   └── Main Screens (5)      # Home, therapy, AI, reports, profile
└── services/
    ├── firebase-auth.service.ts
    └── firestore.service.ts
```

## 🎨 Key Features

### Auth Flow

1. Start → Login/Signup → OTP
2. Profile Type → Details → Interests
3. Welcome → Device Connection → Main App

### Main App

- **Home:** Dashboard with stats and quick actions
- **Therapy:** Session control and body part selector
- **AI Assistant:** Voice commands and camera guidance
- **Reports:** Analytics and session history
- **Profile:** Settings and user info

## 🔧 Common Tasks

### Add New Screen

1. Create `src/screens/NewScreen.tsx`
2. Import in `AppNavigator.tsx`
3. Add to Stack.Navigator

### Update Colors

Edit `src/context/ThemeContext.tsx`:

```typescript
const darkColors = {
  primary: "#FF0000",
  secondary: "#00C6AE",
  // ...
};
```

### Add Firebase

1. Create Firebase project
2. Enable Auth + Firestore
3. Update `src/config/firebase.ts`
4. Replace placeholder config

## 🐛 Troubleshooting

| Issue               | Solution                               |
| ------------------- | -------------------------------------- |
| Module not found    | `npm install`                          |
| Metro bundler error | `npm start -- --reset-cache`           |
| TypeScript errors   | Normal before `npm install`            |
| Firebase errors     | App works without Firebase (mock mode) |

## 📱 Testing on Device

### Physical Device (Easiest)

1. Install "Expo Go" app from store
2. Run `npm start`
3. Scan QR code with Expo Go

### Emulator

**Android:**

- Install Android Studio
- Create emulator
- Run `npm run android`

**iOS (macOS only):**

- Install Xcode
- Run `npm run ios`

## 🎯 Production Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build
eas build --platform android
eas build --platform ios
```

## 📚 Documentation

- `CONVERSION_COMPLETE.md` - Full conversion details
- `SETUP_GUIDE.md` - Step-by-step setup
- `README_RN.md` - Complete React Native docs
- Code comments - All files documented

## ⚡ Quick Start (First Time)

```powershell
# Run automated setup
.\quick-start.ps1

# Or manually:
npm install
npm start
```

## 🎨 App Configuration

File: `app.json`

```json
{
  "expo": {
    "name": "SmartHeal",        # Change app name
    "slug": "smartheal-app",
    "version": "1.0.0",         # Update version
    // ...
  }
}
```

## 🔐 Environment Variables

Create `.env` file:

```env
FIREBASE_API_KEY=your_key
FIREBASE_PROJECT_ID=your_project
# ...
```

## 📦 Key Dependencies

- **React Native:** 0.73.2
- **Expo:** ~50.0.0
- **React Navigation:** v6
- **Firebase:** ^10.8.0
- **TypeScript:** ^5.3.3

## 🎊 Current Status

✅ 15 screens fully implemented
✅ Complete navigation setup
✅ Firebase services ready
✅ Dark theme with animations
✅ TypeScript throughout
✅ Production-ready structure

## 🤝 Need Help?

1. Check error in terminal
2. Review `SETUP_GUIDE.md`
3. Run `npm start -- --reset-cache`
4. Verify `npm install` completed

---

**Made by Runverve** | Version 1.0.0
