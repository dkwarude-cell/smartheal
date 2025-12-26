module.exports = {
  expo: {
    name: "SmartHeal",
    slug: "smartheal-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "dark",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.runverve.smartheal",
      entitlements: {
        "com.apple.developer.healthkit": true,
        "com.apple.developer.healthkit.access": []
      },
      infoPlist: {
        NSCameraUsageDescription: "SmartHeal needs access to your camera to capture images for AI-powered therapy placement guidance.",
        NSMicrophoneUsageDescription: "SmartHeal needs access to your microphone for voice assistant features.",
        NSPhotoLibraryUsageDescription: "SmartHeal needs access to your photo library to save and load therapy session images.",
        NSBluetoothAlwaysUsageDescription: "SmartHeal needs Bluetooth to connect with your ITT therapy device.",
        NSHealthShareUsageDescription: "SmartHeal needs access to your health data to display your steps, active energy, sleep, and other health metrics for personalized therapy recommendations.",
        NSHealthUpdateUsageDescription: "SmartHeal may write workout and therapy session data to Apple Health."
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#000000"
      },
      package: "com.runverve.smartheal",
      permissions: [
        "CAMERA",
        "RECORD_AUDIO",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "BLUETOOTH",
        "BLUETOOTH_ADMIN",
        "BLUETOOTH_CONNECT",
        "BLUETOOTH_SCAN",
        "ACCESS_FINE_LOCATION"
      ]
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "expo-camera",
        {
          cameraPermission: "Allow SmartHeal to access your camera for therapy guidance."
        }
      ],
      "expo-splash-screen"
    ],
    experiments: {
      tsconfigPaths: true
    }
  }
};
