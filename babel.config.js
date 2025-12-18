module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@context': './src/context',
            '@services': './src/services',
            '@config': './src/config',
            '@types': './src/types',
            '@theme': './src/theme',
            '@utils': './src/utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
