# SmartHeal APK Build Guide

## Complete Guide to Building Android APK

This guide will walk you through building a production-ready APK for the SmartHeal therapy device app.

## Prerequisites

### Required Software

1. **Node.js** (v16+)
   ```bash
   node --version  # Should be 16.0.0 or higher
   ```

2. **Java Development Kit (JDK)**
   ```bash
   java -version  # Should be JDK 11 or higher
   ```

3. **Android Studio** with Android SDK
   - Download from: https://developer.android.com/studio
   - Install Android SDK (API Level 33 or higher)
   - Set up ANDROID_HOME environment variable

4. **Expo CLI**
   ```bash
   npm install -g expo-cli eas-cli
   ```

## Method 1: EAS Build (Recommended - Easiest)

EAS (Expo Application Services) is the recommended way to build production-ready APKs.

### Step 1: Install Dependencies

```bash
cd rn-app
npm install
```

### Step 2: Login to Expo

```bash
eas login
```

If you don't have an Expo account, create one at https://expo.dev/signup

### Step 3: Configure EAS

```bash
eas build:configure
```

This will create an `eas.json` file. Update it with the following:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### Step 4: Build Preview APK (for testing)

```bash
eas build --platform android --profile preview
```

This will:
- Upload your code to Expo servers
- Build the APK in the cloud
- Provide a download link when complete (usually 10-20 minutes)

### Step 5: Build Production APK/AAB

```bash
# For APK (direct install)
eas build --platform android --profile preview

# For AAB (Google Play Store)
eas build --platform android --profile production
```

### Step 6: Download and Install

Once the build completes, you'll receive a download link. Download the APK and:

**On Device:**
1. Transfer APK to your Android device
2. Enable "Install from Unknown Sources" in Settings
3. Tap the APK file to install

**Or use ADB:**
```bash
adb install path/to/your-app.apk
```

## Method 2: Local Build with Expo

### Step 1: Prebuild Android Project

```bash
cd rn-app
expo prebuild --platform android
```

This generates the `android/` folder with native code.

### Step 2: Configure Gradle (if needed)

Edit `android/gradle.properties` and add:

```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
android.useAndroidX=true
android.enableJetifier=true
```

### Step 3: Build APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be located at:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Step 4: Sign the APK (Required for Production)

Generate a keystore:

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Add to `android/app/build.gradle`:

```gradle
signingConfigs {
    release {
        storeFile file("my-release-key.keystore")
        storePassword "your-password"
        keyAlias "my-key-alias"
        keyPassword "your-password"
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

Rebuild:
```bash
./gradlew assembleRelease
```

## Method 3: React Native CLI (No Expo)

If you want to eject from Expo:

### Step 1: Eject from Expo

```bash
expo eject
```

Choose "Bare workflow" when prompted.

### Step 2: Install Dependencies

```bash
cd android
./gradlew clean
cd ..
npm install
```

### Step 3: Run Metro Bundler

```bash
npx react-native start
```

### Step 4: Build APK (in another terminal)

```bash
cd android
./gradlew assembleRelease
```

## Configuration Before Building

### 1. Update app.json

```json
{
  "expo": {
    "name": "SmartHeal",
    "slug": "smartheal-app",
    "version": "1.0.0",
    "android": {
      "package": "com.runverve.smartheal",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#00C6AE"
      },
      "permissions": [
        "CAMERA",
        "BLUETOOTH",
        "BLUETOOTH_ADMIN",
        "ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

### 2. Set up Firebase (if using Firebase features)

Create `.env` file:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### 3. Create App Icons

Place app icons in:
- `assets/icon.png` (1024x1024)
- `assets/adaptive-icon.png` (1024x1024)
- `assets/splash.png` (1284x2778 for iOS, will be resized for Android)

## Troubleshooting

### Build Fails with "Out of Memory"

Edit `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx8192m
```

### Permission Errors

Make gradlew executable:
```bash
chmod +x android/gradlew
```

### SDK Not Found

Set ANDROID_HOME:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Build Takes Too Long

Use EAS Build instead - it's faster and uses cloud resources.

## Testing the APK

### On Emulator

```bash
# List emulators
emulator -list-avds

# Start emulator
emulator -avd Pixel_5_API_33

# Install APK
adb install path/to/app-release.apk
```

### On Physical Device

1. Enable Developer Mode on Android device
2. Enable USB Debugging
3. Connect device via USB
4. Run:
   ```bash
   adb devices  # Verify device is connected
   adb install path/to/app-release.apk
   ```

## Optimizing APK Size

### 1. Enable Proguard

In `android/app/build.gradle`:

```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
    }
}
```

### 2. Enable App Bundles (AAB)

For Google Play Store, use AAB instead of APK:

```bash
eas build --platform android --profile production
```

This reduces app size by 35-50% on average.

### 3. Remove Unused Resources

Use `react-native-clean-project`:

```bash
npm install --save-dev react-native-clean-project
npx react-native clean-project
```

## Publishing to Google Play Store

### 1. Create Google Play Developer Account

- Go to https://play.google.com/console
- Pay $25 one-time registration fee
- Complete account setup

### 2. Prepare Store Listing

You'll need:
- App title: "SmartHeal"
- Short description (80 chars)
- Full description (4000 chars)
- Screenshots (minimum 2, recommended 8)
- Feature graphic (1024x500)
- App icon (512x512)
- Privacy policy URL
- Content rating questionnaire

### 3. Build Production AAB

```bash
eas build --platform android --profile production
```

### 4. Upload to Google Play Console

1. Create new app in Play Console
2. Upload AAB file
3. Complete store listing
4. Set pricing & distribution
5. Submit for review

## Final Checklist

Before building production APK:

- [ ] All features tested and working
- [ ] Firebase configured with production credentials
- [ ] App icons created and placed
- [ ] Version numbers updated in app.json
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] App signed with release keystore
- [ ] Proguard rules configured
- [ ] Tested on multiple devices
- [ ] Performance optimized
- [ ] Crash reporting set up (e.g., Sentry, Firebase Crashlytics)
- [ ] Analytics configured
- [ ] Deep linking tested (if applicable)

## Build Time Estimates

- **EAS Build**: 10-20 minutes
- **Local Build**: 5-10 minutes
- **Full Clean Build**: 15-30 minutes

## Support & Resources

- Expo Documentation: https://docs.expo.dev
- EAS Build: https://docs.expo.dev/build/introduction/
- React Native: https://reactnative.dev/docs/signed-apk-android
- Android Developer: https://developer.android.com/studio/publish

---

**Version:** 1.0  
**Last Updated:** October 16, 2025  
**Ready for:** Production APK Build
