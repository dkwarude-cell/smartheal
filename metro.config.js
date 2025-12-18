const { getDefaultConfig } = require('expo/metro-config');

// Disable node externals that cause issues on Windows with colons in paths
process.env.EXPO_NO_METRO_LAZY = '1';

const config = getDefaultConfig(__dirname);

// Keep Expo defaults and only adjust SVG handling
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

module.exports = config;
