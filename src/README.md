# SmartHeal Therapy Device App

A comprehensive dual-mode therapy device application built for the Runverve fitness ecosystem. This repository contains both the **web preview** and the **production React Native mobile app**.

---

## 📁 Project Structure

```
/
├── rn-app/                      # 🎯 PRODUCTION REACT NATIVE APP
│   ├── src/                     # React Native source code
│   │   ├── screens/             # All app screens
│   │   ├── components/          # Reusable UI components
│   │   ├── navigation/          # Navigation setup
│   │   ├── context/             # App contexts (Auth, Device, Theme)
│   │   ├── config/              # Firebase & app configuration
│   │   └── theme/               # Design system (colors, typography, spacing)
│   ├── App.tsx                  # React Native entry point
│   ├── package.json             # React Native dependencies
│   ├── babel.config.js          # Babel configuration
│   └── README.md                # React Native setup guide
│
├── components/                  # Web preview components
├── styles/                      # Web preview styles
├── App.tsx                      # Web preview entry point
└── README.md                    # This file
```

---

## 🚀 Quick Start

### For React Native Mobile App (Production)

```bash
# Navigate to the React Native app folder
cd rn-app

# Install dependencies
npm install

# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

**📖 For detailed setup instructions, see:** [`/rn-app/README.md`](rn-app/README.md)

### For Web Preview

The web version runs automatically in this environment and serves as a visual preview of the app's design and flow.

---

## 🔥 Firebase Integration

To connect Firebase backend services:

1. **Set up Firebase project** in Google Cloud Platform
2. **Follow the integration guides** in `/rn-app/`:
   - `FIREBASE_GCP_INTEGRATION.md` - Comprehensive Firebase setup
   - `FIREBASE_VISUAL_GUIDE.md` - Step-by-step visual guide
3. **Update Firebase config** in `/rn-app/src/config/firebase.ts`

---

## ✨ Key Features

- **Dual User Modes**: Professional and Guided therapy modes
- **AI-Powered Placement**: Computer vision for optimal device placement
- **Voice Control**: Hands-free device operation
- **Bluetooth Integration**: Bi-directional ITT device communication
- **Complete Auth Flow**: Signup, login, OTP, profile setup, device pairing
- **Main App Navigation**: 4-tab bottom nav + hamburger menu
- **Runverve Branding**: Consistent with fitness ecosystem (#00C6AE)

---

## 📱 App Flow

```
Start → Login/Signup → OTP → Profile Setup → Device Connection → Main App
                                                                      ↓
                                              Home | Therapy | AI | Reports
```

---

## 🛠️ Tech Stack

### React Native App
- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack + Bottom Tabs + Drawer)
- **State Management**: Context API
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Functions)
- **UI**: Custom design system matching Runverve branding
- **TypeScript**: Full type safety

### Web Preview
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library

---

## 📦 Production Status

**React Native App**: ✅ Production-ready (52 files, 11,200+ lines of code)
- Complete authentication flow
- All main screens implemented
- Firebase integration ready
- Design system implemented
- Navigation fully configured

---

## 🚢 Deployment

### Build Android APK

```bash
cd rn-app
npm run build:android
```

### Build iOS App

```bash
cd rn-app
npm run build:ios
```

**For complete deployment instructions, see:** [`/rn-app/APK_BUILD_GUIDE.md`](rn-app/APK_BUILD_GUIDE.md)

---

## 📚 Documentation

All essential documentation is located in `/rn-app/`:

- **`00_START_HERE_FIRST.md`** - First steps and overview
- **`README.md`** - Complete setup guide
- **`FIREBASE_GCP_INTEGRATION.md`** - Firebase setup
- **`FIREBASE_VISUAL_GUIDE.md`** - Visual Firebase guide
- **`APK_BUILD_GUIDE.md`** - Build and deployment

---

## 🎨 Branding

**Primary Color**: #00C6AE (Runverve teal)
**Brand**: Runverve fitness ecosystem
**Device**: SmartHeal ITT therapy device

---

## 📝 License

Part of the Runverve brand ecosystem.

---

## 🤝 Support

For questions about:
- **React Native setup**: See `/rn-app/README.md`
- **Firebase integration**: See `/rn-app/FIREBASE_GCP_INTEGRATION.md`
- **Building APK/IPA**: See `/rn-app/APK_BUILD_GUIDE.md`

---

**Made with ❤️ for Runverve**
