# SmartHeal React Native - Setup Guide

## 🚀 Getting Started

Your project has been successfully converted to React Native! Follow these steps to get your app running.

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- React Native & Expo
- React Navigation
- Firebase
- And all other necessary packages

## Step 2: Set Up Firebase (Optional but Recommended)

1. **Create a Firebase Project:**

   - Go to https://console.firebase.google.com
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication:**

   - In Firebase Console, go to Authentication
   - Click "Get Started"
   - Enable "Email/Password" sign-in method

3. **Create Firestore Database:**

   - Go to Firestore Database
   - Click "Create database"
   - Start in production mode (or test mode for development)

4. **Get Your Config:**

   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Select Web app (</>)
   - Copy the firebaseConfig object

5. **Update Configuration:**
   - Open `src/config/firebase.ts`
   - Replace the placeholder values with your Firebase config

## Step 3: Add App Icons (Optional)

Place your app icons in the `assets/` folder:

- `icon.png` - Main app icon (1024x1024)
- `splash.png` - Splash screen (1242x2436)
- `adaptive-icon.png` - Android adaptive icon (1024x1024)

Or use placeholder icons for now - the app will still work!

## Step 4: Start the Development Server

```bash
npm start
```

This will open the Expo Dev Tools in your browser.

## Step 5: Run on a Device

### Option A: Physical Device (Recommended for Testing)

1. **Install Expo Go:**

   - iOS: Download from App Store
   - Android: Download from Play Store

2. **Scan QR Code:**
   - Open Expo Go app
   - Scan the QR code from your terminal or browser

### Option B: Emulator/Simulator

**Android:**

```bash
npm run android
```

(Requires Android Studio and emulator setup)

**iOS (macOS only):**

```bash
npm run ios
```

(Requires Xcode)

### Option C: Web Browser (Limited Features)

```bash
npm run web
```

## 📱 What's Working

✅ **Complete app structure** - All screens and navigation
✅ **Authentication flow** - Login, signup, profile setup
✅ **Main app features** - Home, therapy, AI assistant, reports, profile
✅ **Firebase integration** - Auth and Firestore ready
✅ **Beautiful UI** - Dark theme with gradients and animations

## 🎨 Project Structure

```
SmartHeal/
├── App.tsx              # Main entry point
├── index.js             # Root file
├── app.json             # Expo config
├── src/
│   ├── screens/         # 15 screens (auth + main app)
│   ├── navigation/      # Stack & tab navigation
│   ├── context/         # Auth, theme, device contexts
│   ├── config/          # Firebase configuration
│   └── services/        # Firebase services
```

## 🔧 Common Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Clear cache
npm start -- --reset-cache

# Build for production
npm run build:android
npm run build:ios
```

## 🐛 Troubleshooting

### "Command not found" error

Make sure you're in the project directory:

```bash
cd "d:\Smartheal FF\Smart Heal (Copy) new"
```

### Metro bundler issues

Clear the cache:

```bash
npm start -- --reset-cache
```

### Firebase errors

The app will work without Firebase! Auth will use mock data.
To enable Firebase, follow Step 2 above.

### Module not found errors

Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

1. **Test the app** - Run it on a device and test all screens
2. **Add your Firebase config** - For real authentication
3. **Customize branding** - Update colors, icons, splash screen
4. **Add features** - Bluetooth, notifications, etc.
5. **Build for production** - Create APK/IPA files

## 📚 Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Firebase for React Native](https://rnfirebase.io/)

## 🤝 Need Help?

- Check the README_RN.md file
- Review the code comments
- All components are well-documented

## 🎉 You're All Set!

Run `npm start` and start developing your SmartHeal app!

---

**Made by Runverve** ❤️
