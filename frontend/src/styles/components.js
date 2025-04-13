// src/styles/components.js
// Component-specific styles derived from the theme
// Use these to ensure consistent styling across the app

import { colors } from './theme';

// Button variations
export const buttonStyles = {
  // Base styles applied to all buttons
  base: 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50',
  
  // Button variants
  variants: {
    primary: `bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400`,
    secondary: `bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400`,
    outline: `border border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:ring-amber-400`,
    accent: `bg-accent-500 hover:bg-accent-600 text-white focus:ring-accent-400`,
    success: `bg-success-500 hover:bg-success-600 text-white focus:ring-success-400`,
    danger: `bg-error-500 hover:bg-error-600 text-white focus:ring-error-400`,
    text: `text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20`,
  },
  
  // Button sizes
  sizes: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5 text-lg',
    xl: 'px-6 py-3 text-xl',
  },
  
  // Button states
  states: {
    disabled: 'opacity-50 cursor-not-allowed',
    loading: 'opacity-75 cursor-wait',
  }
};

// Card variations
export const cardStyles = {
  // Base styles applied to all cards
  base: 'bg-white dark:bg-gray-800 overflow-hidden',
  
  // Card variants
  variants: {
    default: 'rounded-lg shadow-sm border border-gray-100 dark:border-gray-700',
    elevated: 'rounded-xl shadow-md border border-gray-100 dark:border-gray-700', 
    flat: 'rounded-lg border border-gray-200 dark:border-gray-700',
    branded: `rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800`,
  },
  
  // Card parts
  parts: {
    header: 'px-5 py-4 border-b border-gray-100 dark:border-gray-700',
    body: 'p-5',
    footer: 'px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750',
  }
};

// Badge variations
export const badgeStyles = {
  // Base styles
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  
  // Badge variants by color
  variants: {
    primary: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300',
    success: 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300',
    warning: 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300',
    error: 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-300',
  },
  
  // Badge sizes
  sizes: {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  }
};

// Input field variations
export const inputStyles = {
  // Base styles
  base: 'w-full border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors',
  
  // Variants
  variants: {
    default: 'border-gray-300 dark:border-gray-600 focus:border-amber-300 dark:focus:border-amber-700 focus:ring-amber-500/20',
    error: 'border-error-300 dark:border-error-700 focus:border-error-500 focus:ring-error-500/20',
    success: 'border-success-300 dark:border-success-700 focus:border-success-500 focus:ring-success-500/20',
  },
  
  // Sizes
  sizes: {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2',
    lg: 'px-4 py-3 text-lg',
  },
  
  // States
  states: {
    disabled: 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800',
    readOnly: 'bg-gray-50 dark:bg-gray-800 cursor-default',
  }
};

// Form label styles
export const labelStyles = {
  base: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1',
};

// Progress bar styles
export const progressStyles = {
  // Base container
  base: 'w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden',
  
  // Progress indicator
  indicator: {
    default: 'h-full bg-amber-500 rounded-full transition-all duration-500 ease-out',
    success: 'h-full bg-success-500 rounded-full transition-all duration-500 ease-out',
    warning: 'h-full bg-warning-500 rounded-full transition-all duration-500 ease-out',
    error: 'h-full bg-error-500 rounded-full transition-all duration-500 ease-out',
    gradient: 'h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500 ease-out',
  }
};

// Alert/notification styles
export const alertStyles = {
  base: 'p-4 rounded-lg border',
  variants: {
    info: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-300',
    success: 'bg-success-50 dark:bg-success-900/20 border-success-100 dark:border-success-800 text-success-700 dark:text-success-300',
    warning: 'bg-warning-50 dark:bg-warning-900/20 border-warning-100 dark:border-warning-800 text-warning-700 dark:text-warning-300',
    error: 'bg-error-50 dark:bg-error-900/20 border-error-100 dark:border-error-800 text-error-700 dark:text-error-300',
  }
};

// Avatar styles
export const avatarStyles = {
  base: 'rounded-full object-cover',
  sizes: {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-24 h-24',
  },
  border: {
    none: '',
    thin: 'border border-white dark:border-gray-800',
    default: 'border-2 border-white dark:border-gray-800',
    thick: 'border-4 border-white dark:border-gray-800',
  }
};

// Course types badge colors
export const courseBadgeStyles = {
  Course: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60',
  Pathway: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60',
  Workshop: 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-300 border border-accent-200 dark:border-accent-800/60',
  default: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
};

// Sidebar styles
export const sidebarStyles = {
  container: 'fixed inset-y-0 left-0 z-40 bg-gray-50 dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out',
  collapsed: 'w-16',
  expanded: 'w-64',
  navItem: {
    base: 'flex px-3 py-2.5 rounded-md transition-all duration-300 group',
    active: 'bg-amber-50 dark:bg-amber-900 text-amber-700 dark:text-amber-300 font-semibold',
    inactive: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
  }
};

// Export all component styles
export default {
  buttonStyles,
  cardStyles,
  badgeStyles,
  inputStyles,
  labelStyles,
  progressStyles,
  alertStyles,
  avatarStyles,
  courseBadgeStyles,
  sidebarStyles,
};