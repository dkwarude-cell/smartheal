import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof darkColors;
}

const darkColors = {
  primary: '#FF0000',
  secondary: '#00C6AE',
  background: '#000000',
  surface: '#1A1A1A',
  card: '#2A2A2A',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#333333',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#007AFF',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark] = useState(true); // Always dark theme for now

  const toggleTheme = () => {
    // Future implementation for light theme
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors: darkColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
