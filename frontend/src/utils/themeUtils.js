// utils/themeUtils.js
/**
 * This utility provides consistent color and styling values 
 * throughout the application to ensure dark mode works properly
 * and styling is consistent.
 */

// Primary colors 
export const colors = {
    // Purple palette - primary brand color
    purple: {
      50: 'bg-purple-50 dark:bg-purple-900/10',
      100: 'bg-purple-100 dark:bg-purple-900/20',
      200: 'bg-purple-200 dark:bg-purple-900/30',
      300: 'bg-purple-300 dark:bg-purple-800',
      400: 'bg-purple-400 dark:bg-purple-700',
      500: 'bg-purple-500 dark:bg-purple-600',
      600: 'bg-purple-600 dark:bg-purple-500',
      700: 'bg-purple-700 dark:bg-purple-600',
      800: 'bg-purple-800 dark:bg-purple-700',
      900: 'bg-purple-900 dark:bg-purple-800',
    },
    
    // Gray palette - for neutral UI elements
    gray: {
      50: 'bg-gray-50 dark:bg-gray-900',
      100: 'bg-gray-100 dark:bg-gray-800',
      200: 'bg-gray-200 dark:bg-gray-700',
      300: 'bg-gray-300 dark:bg-gray-600',
      400: 'bg-gray-400 dark:bg-gray-500',
      500: 'bg-gray-500 dark:bg-gray-400',
      600: 'bg-gray-600 dark:bg-gray-300',
      700: 'bg-gray-700 dark:bg-gray-200',
      800: 'bg-gray-800 dark:bg-gray-100',
      900: 'bg-gray-900 dark:bg-gray-50',
    },
    
    // Text colors
    text: {
      primary: 'text-gray-900 dark:text-white',
      secondary: 'text-gray-700 dark:text-gray-300',
      tertiary: 'text-gray-500 dark:text-gray-400',
      purple: 'text-purple-600 dark:text-purple-400',
      inverse: 'text-white dark:text-gray-900',
    },
    
    // Border colors
    border: {
      light: 'border-gray-100 dark:border-gray-800',
      default: 'border-gray-200 dark:border-gray-700',
      medium: 'border-gray-300 dark:border-gray-600',
      purple: 'border-purple-200 dark:border-purple-800',
    },
    
    // Background and surface colors
    surface: {
      default: 'bg-white dark:bg-gray-800',
      secondary: 'bg-gray-50 dark:bg-gray-750',
      tertiary: 'bg-gray-100 dark:bg-gray-700',
      branded: 'bg-purple-50 dark:bg-purple-900/20',
      elevated: 'bg-white dark:bg-gray-800 shadow-sm',
    },
  };
  
  // Card variants
  export const cardStyles = {
    default: `${colors.surface.default} rounded-lg shadow-sm ${colors.border.light}`,
    elevated: `${colors.surface.default} rounded-xl shadow-md border ${colors.border.light}`,
    branded: `${colors.surface.branded} rounded-lg border ${colors.border.purple}`,
  };
  
  // Button variants
  export const buttonStyles = {
    primary: `bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors`,
    secondary: `bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors`,
    outline: `border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors`,
    text: `text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors`,
  };
  
  // Form element styles
  export const formStyles = {
    input: `w-full p-2 border ${colors.border.medium} rounded-lg ${colors.surface.default} ${colors.text.primary} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent`,
    select: `w-full p-2 border ${colors.border.medium} rounded-lg ${colors.surface.default} ${colors.text.primary} focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent`,
    checkbox: `rounded text-purple-500 focus:ring-purple-400`,
    label: `block text-sm font-medium ${colors.text.secondary} mb-1`,
    error: `mt-1 text-sm text-red-600 dark:text-red-400`,
  };
  
  // Animation classes
  export const animations = {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
    pulseGentle: 'animate-pulse-gentle',
    bounceSoft: 'animate-bounce-subtle',
  };
  
  // Consistent spacing
  export const spacing = {
    section: 'mb-6',
    item: 'mb-4',
    paragraph: 'mb-3',
    base: 'p-4',
    tight: 'p-2',
    loose: 'p-6',
  };
  
  export default {
    colors,
    cardStyles,
    buttonStyles,
    formStyles,
    animations,
    spacing,
  };