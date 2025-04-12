// src/utils/colorUtils.js
// A utility to help with consistent color usage throughout the application

/**
 * Map of color replacements to standardize the UI
 * This helps ensure we're using the same colors for the same purposes
 */
export const colorMap = {
    // Primary actions, badges, indicators, and interactive elements
    primary: {
      light: {
        bg: 'bg-amber-500',
        bgHover: 'hover:bg-amber-600',
        bgActive: 'active:bg-amber-700',
        bgLight: 'bg-amber-50',
        bgLightHover: 'hover:bg-amber-100',
        text: 'text-amber-600',
        textHover: 'hover:text-amber-700',
        border: 'border-amber-300',
        borderHover: 'hover:border-amber-400',
        ring: 'ring-amber-400',
        iconColor: 'text-amber-500',
      },
      dark: {
        bg: 'dark:bg-amber-600',
        bgHover: 'dark:hover:bg-amber-700',
        bgActive: 'dark:active:bg-amber-800',
        bgLight: 'dark:bg-amber-900/20',
        bgLightHover: 'dark:hover:bg-amber-900/30',
        text: 'dark:text-amber-400',
        textHover: 'dark:hover:text-amber-300',
        border: 'dark:border-amber-700',
        borderHover: 'dark:hover:border-amber-600',
        ring: 'dark:ring-amber-500',
        iconColor: 'dark:text-amber-400',
      }
    },
    
    // Text colors for headings and body
    text: {
      light: {
        heading: 'text-gray-900',
        body: 'text-gray-700',
        secondary: 'text-gray-600',
        tertiary: 'text-gray-500',
      },
      dark: {
        heading: 'dark:text-white',
        body: 'dark:text-gray-200',
        secondary: 'dark:text-gray-300',
        tertiary: 'dark:text-gray-400',
      }
    },
    
    // Background colors
    background: {
      light: {
        primary: 'bg-white',
        secondary: 'bg-gray-50',
        tertiary: 'bg-gray-100',
        highlight: 'bg-amber-50',
      },
      dark: {
        primary: 'dark:bg-gray-800',
        secondary: 'dark:bg-gray-750',
        tertiary: 'dark:bg-gray-700',
        highlight: 'dark:bg-amber-900/20',
      }
    },
    
    // Border colors
    border: {
      light: {
        primary: 'border-gray-200',
        secondary: 'border-gray-100',
        highlight: 'border-amber-200',
      },
      dark: {
        primary: 'dark:border-gray-700',
        secondary: 'dark:border-gray-800',
        highlight: 'dark:border-amber-800',
      }
    }
  };
  
  /**
   * Helper function to generate consistent class combinations for common UI elements
   */
  export const colorClasses = {
    // Button variants
    button: {
      primary: `${colorMap.primary.light.bg} ${colorMap.primary.light.bgHover} text-white ${colorMap.primary.light.ring} ${colorMap.primary.dark.bg} ${colorMap.primary.dark.bgHover}`,
      secondary: `bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400`,
      outline: `border ${colorMap.primary.light.border} ${colorMap.primary.light.text} ${colorMap.primary.light.bgLightHover} ${colorMap.primary.dark.border} ${colorMap.primary.dark.text} ${colorMap.primary.dark.bgLightHover}`,
    },
    
    // Badge variants
    badge: {
      primary: `${colorMap.primary.light.bgLight} ${colorMap.primary.light.text} ${colorMap.primary.dark.bgLight} ${colorMap.primary.dark.text}`,
      secondary: `bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300`,
    },
    
    // Form input focus states
    input: {
      focus: `focus:border-amber-300 dark:focus:border-amber-700 focus:ring-2 focus:ring-amber-500/20`,
    },
    
    // Active state for navigation/tabs
    activeState: `${colorMap.primary.light.bgLight} ${colorMap.primary.light.text} ${colorMap.primary.dark.bgLight} ${colorMap.primary.dark.text}`,
    
    // Gradient backgrounds
    gradients: {
      primary: `from-amber-400 to-amber-600`,
      secondary: `from-amber-300 to-amber-500`,
    }
  };
  
  /**
   * Generates classes for hover, active, and focus states
   */
  export const generateInteractiveClasses = (baseClass, isActive = false) => {
    const hoverClass = isActive ? '' : `hover:${baseClass.replace('bg-', 'bg-amber-')}`;
    const activeClass = `active:${baseClass.replace('bg-', 'bg-amber-')}`;
    return `${baseClass} ${hoverClass} ${activeClass}`;
  };
  
  export default { colorMap, colorClasses, generateInteractiveClasses };