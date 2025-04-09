// context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize state from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    // Try to get the theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // If no saved preference, use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme to document when component mounts or darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if no user preference is saved
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };
    
    // Add event listener with modern API
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle theme with explicit function (for better memoization)
  const toggleTheme = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  // Set a specific theme
  const setTheme = useCallback((isDark) => {
    setDarkMode(isDark);
  }, []);

  // Reset to system preference
  const resetToSystemTheme = useCallback(() => {
    localStorage.removeItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(systemPrefersDark);
  }, []);

  const contextValue = {
    darkMode,
    toggleTheme,
    setTheme,
    resetToSystemTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
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