const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

// Workaround for Windows filesystem limitations (colons in cache paths like `node:sea`)
process.env.EXPO_NO_METRO_LAZY = '1';

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = Array.from(new Set([...(config.resolver.sourceExts ?? []), 'cjs']));

config.resolver.extraNodeModules = {
	...(config.resolver.extraNodeModules ?? {}),
	'node:sea': path.resolve(__dirname, 'metro-node-sea-shim.js'),
};

module.exports = config;
