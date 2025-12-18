# SmartHeal React Native App - Project Structure

## 📁 Complete File Structure

```
rn-app/
│
├── 📄 App.tsx                          # Main entry point
├── 📄 index.js                         # Root entry file
├── 📄 app.json                         # Expo configuration
├── 📄 package.json                     # Dependencies
├── 📄 babel.config.js                  # Babel configuration
├── 📄 metro.config.js                  # Metro bundler config
├── 📄 tsconfig.json                    # TypeScript config
│
├── 📁 src/
│   │
│   ├── 📁 components/ui/               # Reusable UI Components
│   │   ├── Badge.tsx                   # Badge component
│   │   ├── Button.tsx                  # Button component
│   │   ├── Card.tsx                    # Card component
│   │   ├── Input.tsx                   # Input component
│   │   └── Progress.tsx                # Progress bar component
│   │
│   ├── 📁 config/                      # Configuration
│   │   ├── constants.ts                # App constants
│   │   └── firebase.ts                 # Firebase configuration
│   │
│   ├── 📁 context/                     # React Contexts
│   │   ├── AuthContext.tsx             # Authentication state
│   │   ├── DeviceContext.tsx           # Device connection state
│   │   └── ThemeContext.tsx            # Theme state
│   │
│   ├── 📁 navigation/                  # Navigation Setup
│   │   ├── AppNavigator.tsx            # Root navigator
│   │   ├── AuthNavigator.tsx           # Auth flow navigator
│   │   └── MainTabNavigator.tsx        # Main app tab navigation
│   │
│   ├── 📁 screens/
│   │   │
│   │   ├── 📁 auth/                    # Authentication Screens
│   │   │   ├── StartScreen.tsx         # App start screen
│   │   │   ├── LoginScreen.tsx         # Login screen
│   │   │   ├── SignupScreen.tsx        # Signup screen
│   │   │   ├── OTPScreen.tsx           # OTP verification
│   │   │   ├── ProfileSetupScreen.tsx  # Profile setup
│   │   │   ├── WelcomeScreen.tsx       # Welcome after signup
│   │   │   └── DeviceConnectionScreen.tsx # Device pairing
│   │   │
│   │   ├── 📁 main/                    # Main App Screens
│   │   │   ├── HomeScreen.tsx          # Home dashboard
│   │   │   ├── TherapyScreen.tsx       # Therapy mode selection
│   │   │   ├── AIScreen.tsx            # AI placement assistant
│   │   │   └── ReportsScreen.tsx       # Reports and analytics
│   │   │
│   │   └── 📁 settings/                # Settings Screens
│   │       ├── SettingsScreen.tsx      # Main settings
│   │       ├── ProfileScreen.tsx       # User profile
│   │       ├── ProfileSettingsScreen.tsx # Profile edit
│   │       ├── BluetoothSettingsScreen.tsx # Bluetooth settings
│   │       ├── TherapySettingsScreen.tsx # Therapy preferences
│   │       └── NotificationsScreen.tsx # Notification settings
│   │
│   ├── 📁 theme/                       # Design System
│   │   ├── colors.ts                   # Color palette
│   │   ├── typography.ts               # Font styles
│   │   ├── spacing.ts                  # Spacing system
│   │   └── index.ts                    # Theme exports
│   │
│   └── 📁 types/                       # TypeScript Types
│       ├── navigation.types.ts         # Navigation types
│       └── user.types.ts               # User data types
│
└── 📁 Documentation/
    ├── 00_START_HERE_FIRST.md          # Getting started guide
    ├── README.md                        # Setup instructions
    ├── FIREBASE_GCP_INTEGRATION.md     # Firebase setup guide
    ├── FIREBASE_VISUAL_GUIDE.md        # Visual Firebase guide
    └── APK_BUILD_GUIDE.md              # Build & deployment guide
```

---

## 📊 Project Statistics

- **Total Files**: 43 production files
- **Total Lines**: 11,200+ lines of code
- **Screens**: 17 screens
- **Components**: 5 reusable UI components
- **Contexts**: 3 context providers
- **Navigation**: 3 navigator configurations

---

## 🎯 Key Directories Explained

### `/src/screens/auth/`
Complete authentication flow from start to device connection:
- Start → Login/Signup → OTP → Profile Setup → Welcome → Device Connection

### `/src/screens/main/`
Main application tabs (bottom navigation):
- **Home**: Dashboard with stats and quick actions
- **Therapy**: Pro/Guided mode selection and therapy controls
- **AI**: AI-powered device placement guidance
- **Reports**: Session history and analytics

### `/src/screens/settings/`
Accessible via hamburger menu in main app:
- User profile management
- Bluetooth device settings
- Therapy preferences
- Notification settings

### `/src/navigation/`
Navigation structure:
- **AppNavigator**: Root navigator (Auth vs Main App)
- **AuthNavigator**: Stack navigation for auth flow
- **MainTabNavigator**: Bottom tabs + drawer for main app

### `/src/context/`
Global state management:
- **AuthContext**: User authentication state
- **DeviceContext**: SmartHeal device connection status
- **ThemeContext**: App theme (dark/light mode support)

### `/src/theme/`
Design system following Runverve branding:
- **Primary Color**: #00C6AE (Runverve teal)
- Typography scale
- Spacing system
- Consistent styling across all screens

---

## 🔄 App Flow

```
AppNavigator (Root)
│
├─> AuthNavigator (Not authenticated)
│   └─> StartScreen
│   └─> LoginScreen
│   └─> SignupScreen
│   └─> OTPScreen
│   └─> ProfileSetupScreen
│   └─> WelcomeScreen
│   └─> DeviceConnectionScreen
│
└─> MainTabNavigator (Authenticated + Device Connected)
    │
    ├─> HomeTab
    ├─> TherapyTab
    ├─> AITab
    ├─> ReportsTab
    │
    └─> Drawer Menu
        ├─> Settings
        ├─> Profile
        ├─> Bluetooth Settings
        ├─> Therapy Settings
        └─> Notifications
```

---

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## 🔥 Firebase Integration

The app is configured to use Firebase for:
- **Authentication**: Phone/Email auth with OTP
- **Firestore**: User profiles, therapy sessions, reports
- **Cloud Functions**: Backend business logic
- **Storage**: User images, therapy session data

See `FIREBASE_GCP_INTEGRATION.md` for setup instructions.

---

## 📱 Supported Platforms

- ✅ Android (Expo)
- ✅ iOS (Expo)
- ⚠️ Web (Limited - optimized for mobile)

---

## 🎨 Design System

Brand colors defined in `/src/theme/colors.ts`:
- **Primary**: #00C6AE (Runverve teal)
- **Secondary**: Complementary palette
- **System**: Success, warning, error, info states

Typography system in `/src/theme/typography.ts`:
- Heading scales (h1-h6)
- Body text styles
- Button text styles
- Input text styles

---

## 📝 Notes

- All screens are fully implemented
- Firebase integration is ready but requires configuration
- Design follows Runverve brand guidelines
- TypeScript ensures type safety throughout
- Optimized for mobile (responsive design)

---

**Last Updated**: React Native conversion completed with 43 production files
