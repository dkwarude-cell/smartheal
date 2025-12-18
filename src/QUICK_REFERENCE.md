# 🚀 SmartHeal - Quick Reference Guide

## 📌 TL;DR - What You Need to Know

### Two Versions in This Repo:

| Version | Location | Purpose | Status |
|---------|----------|---------|--------|
| **Web Preview** | Root (`/App.tsx`, `/components/`) | Browser demo | ✅ Working now |
| **React Native** | `/rn-app/` folder | Production mobile app | ✅ Ready for VS Code |

---

## 🎯 Quick Actions

### Want to See It Working?
👉 **The web preview is already running in your browser!**

### Want to Develop the Mobile App?
```bash
# 1. Copy this folder to your computer
cp -r rn-app ~/your-projects/

# 2. Install dependencies
cd ~/your-projects/rn-app
npm install

# 3. Start development
npm start

# 4. Run on device
npm run android  # or npm run ios
```

---

## 📂 Where Is Everything?

### React Native Production Code
```
📁 rn-app/
├── 📄 App.tsx           # Start here
├── 📁 src/
│   ├── 📁 screens/      # 17 screens (auth + main + settings)
│   ├── 📁 components/   # 5 UI components
│   ├── 📁 navigation/   # Navigation setup
│   ├── 📁 context/      # State management
│   ├── 📁 theme/        # Design system
│   └── 📁 config/       # Firebase config
└── 📁 Documentation/    # Setup guides
```

### Documentation
```
📁 Root Documentation
├── README.md                   # Main overview
├── PROJECT_OVERVIEW.md         # What's where
├── CODEBASE_SUMMARY.md         # Cleanup details
└── QUICK_REFERENCE.md          # This file

📁 React Native Documentation (/rn-app/)
├── 00_START_HERE_FIRST.md      # First steps
├── README.md                   # Complete setup
├── PROJECT_STRUCTURE.md        # File structure
├── FIREBASE_GCP_INTEGRATION.md # Firebase guide
├── FIREBASE_VISUAL_GUIDE.md    # Visual Firebase
└── APK_BUILD_GUIDE.md          # Build & deploy
```

---

## 🔥 Firebase Setup (5 Steps)

1. **Create Firebase Project** - Go to Firebase Console
2. **Get Config** - Project Settings → Your apps → Config object
3. **Update File** - Edit `/rn-app/src/config/firebase.ts`
4. **Enable Services** - Turn on Auth, Firestore, Storage
5. **Test** - Run `npm start` and test login

**Detailed Guide**: `/rn-app/FIREBASE_GCP_INTEGRATION.md`

---

## 📱 App Features Quick List

### 🔐 Authentication (7 Screens)
- Start → Login → Signup → OTP → Profile → Welcome → Device Pairing

### 🏠 Main App (4 Tabs)
- **Home** - Dashboard & stats
- **Therapy** - Pro/Guided modes
- **AI** - Device placement assistant
- **Reports** - Session history

### ⚙️ Settings (Drawer Menu)
- Profile, Bluetooth, Therapy Settings, Notifications

---

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Primary Color** | #00C6AE (Runverve teal) |
| **Brand** | Runverve fitness ecosystem |
| **Device** | SmartHeal ITT therapy |
| **Platform** | iOS + Android (React Native) |

**Theme Files**:
- Colors: `/rn-app/src/theme/colors.ts`
- Typography: `/rn-app/src/theme/typography.ts`
- Spacing: `/rn-app/src/theme/spacing.ts`

---

## 🛠️ Common Commands

### Development
```bash
npm install          # Install dependencies
npm start            # Start Metro bundler
npm run android      # Run on Android
npm run ios          # Run on iOS
npm run web          # Run on web (limited)
```

### Troubleshooting
```bash
npm start -- --reset-cache    # Clear Metro cache
rm -rf node_modules && npm install  # Reinstall deps
```

### Building
```bash
# See APK_BUILD_GUIDE.md for complete instructions
expo build:android    # Build Android APK
expo build:ios        # Build iOS IPA
```

---

## 📊 Code Stats

| Metric | Value |
|--------|-------|
| **Total Screens** | 17 |
| **Total Components** | 5 |
| **Total Files (RN)** | 43 |
| **Lines of Code (RN)** | 11,200+ |
| **Navigation Layers** | 3 (App, Auth, MainTab) |
| **Context Providers** | 3 (Auth, Device, Theme) |

---

## ✅ Pre-Flight Checklist

Before you start developing:

- [ ] Node.js installed (v14+)
- [ ] npm or yarn installed
- [ ] VS Code or your preferred editor
- [ ] Android Studio (for Android dev)
- [ ] Xcode (for iOS dev, Mac only)
- [ ] Firebase account created
- [ ] `/rn-app/` folder copied to your machine

---

## 🚨 Important Notes

### ✅ What's Complete
- All screens implemented
- Navigation fully configured
- Design system ready
- TypeScript throughout
- Firebase integration ready
- Build configuration set

### ⚠️ What You Need to Do
- Configure Firebase credentials
- Test on real device/emulator
- Customize branding if needed
- Set up app store accounts (for publishing)

---

## 🎓 Learning Path

### Day 1: Setup
1. Read `/rn-app/00_START_HERE_FIRST.md`
2. Read `/rn-app/README.md`
3. Copy `/rn-app/` to VS Code
4. Run `npm install`
5. Run `npm start` and test

### Day 2: Firebase
1. Read `/rn-app/FIREBASE_GCP_INTEGRATION.md`
2. Create Firebase project
3. Configure `/rn-app/src/config/firebase.ts`
4. Test authentication flow

### Day 3: Customize
1. Review design system files
2. Test all screens
3. Customize branding if needed
4. Add any app-specific features

### Day 4: Deploy
1. Read `/rn-app/APK_BUILD_GUIDE.md`
2. Build APK/IPA
3. Test on physical devices
4. Prepare for app store submission

---

## 📞 Need Help?

### Check These First:
1. `/rn-app/README.md` - Setup issues
2. `/rn-app/FIREBASE_GCP_INTEGRATION.md` - Firebase issues
3. `/rn-app/APK_BUILD_GUIDE.md` - Build issues
4. `/CODEBASE_SUMMARY.md` - Code organization

### Common Issues:

**"Babel error"**
✅ Fixed - `babel-plugin-module-resolver` added

**"Firebase not working"**
→ Configure `/rn-app/src/config/firebase.ts`

**"Metro bundler error"**
→ Run `npm start -- --reset-cache`

**"Module not found"**
→ Delete `node_modules`, run `npm install`

---

## 🎯 Goal Hierarchy

```
📱 SmartHeal App
│
├── 🌐 Level 1: Preview (DONE)
│   └── Web preview working ✅
│
├── 💻 Level 2: Development Setup
│   ├── Copy to VS Code
│   ├── npm install
│   └── npm start ✅
│
├── 🔥 Level 3: Firebase Integration
│   ├── Create Firebase project
│   ├── Configure credentials
│   └── Test authentication
│
├── 🧪 Level 4: Testing
│   ├── Test on emulator
│   ├── Test on physical device
│   └── Fix any issues
│
└── 🚀 Level 5: Production
    ├── Build APK/IPA
    ├── Test production build
    └── Submit to app stores
```

---

## 🏁 Quick Start Checklist

**For Development** (Copy to VS Code):
```
✅ 1. Copy /rn-app/ folder
✅ 2. cd rn-app
✅ 3. npm install
✅ 4. Configure Firebase
✅ 5. npm start
✅ 6. npm run android/ios
```

**For Preview** (Current Environment):
```
✅ Already working - just interact with it!
```

---

## 💡 Pro Tips

- **Start with web preview** to understand the flow
- **Copy only `/rn-app/`** to VS Code (it's self-contained)
- **Use Expo Go app** for quickest testing on real devices
- **Read documentation in order** (00_START_HERE_FIRST → README → others)
- **Set up Firebase early** to test authentication
- **Keep the web preview** for quick design iterations

---

**Everything you need is organized and ready! 🎉**

Choose your path:
- 👀 **Preview**: Already running!
- 💻 **Develop**: Copy `/rn-app/` to VS Code
- 🔥 **Firebase**: See `FIREBASE_GCP_INTEGRATION.md`
- 📦 **Deploy**: See `APK_BUILD_GUIDE.md`

---

**Made with ❤️ for Runverve**
