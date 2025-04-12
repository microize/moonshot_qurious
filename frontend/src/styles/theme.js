// src/styles/theme.js
// Central place for all theme-related constants and values
// Modify these values to change colors throughout the entire application

// Color palettes
export const colors = {
    // Primary cobalt blue color palette - CHANGE THIS TO UPDATE PRIMARY COLORS ACROSS THE APP
    cobalt: {
      50: '#FFF8E1',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFC107',  // Primary brand color
      600: '#FFB300',
      700: '#FFA000',
      800: '#FF8F00',
      900: '#FF6F00',
      950: '#E65100',
    },
    // Accent color palette - CHANGE THIS TO UPDATE ACCENT COLORS
    accent: {
      50: '#FFF1E6',
      100: '#FFE3CC',
      200: '#FFC699',
      300: '#FFA966',
      400: '#FF8C33',
      500: '#FF7000',
      600: '#CC5A00',
      700: '#994300',
      800: '#662D00',
      900: '#331600',
      950: '#190B00',
    },
    // Success, error, warning colors
    success: {
      50: '#EDFCF4',
      100: '#D3F8E4',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
    },
    error: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
    },
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
    },
    // Neutral colors for backgrounds, text, etc.
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
      950: '#030712',
    }
  };
  
  // Spacing system - used for margins, paddings, etc.
  export const spacing = {
    none: '0',
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem',  // 48px
  };
  
  // Font sizes
  export const fontSizes = {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  };
  
  // Font weights
  export const fontWeights = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };
  
  // Border radius
  export const borderRadius = {
    none: '0',
    sm: '0.125rem',     // 2px
    md: '0.375rem',     // 6px
    lg: '0.5rem',       // 8px
    xl: '0.75rem',      // 12px
    '2xl': '1rem',      // 16px
    '3xl': '1.5rem',    // 24px
    full: '9999px',
  };
  
  // Box shadows
  export const shadows = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    'soft': '0 2px 8px -1px rgba(0, 0, 0, 0.05), 0 3px 6px -1px rgba(0, 0, 0, 0.02)',
    'soft-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
  };
  
  // Z-index values
  export const zIndices = {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  };
  
  // Animation durations
  export const durations = {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  };
  
  // Transitions presets
  export const transitions = {
    default: `all ${durations.normal} ease-in-out`,
    fast: `all ${durations.fast} ease-in-out`,
    slow: `all ${durations.slow} ease-in-out`,
  };
  
  // Theme variants - use for light/dark mode styling
  export const variants = {
    light: {
      background: {
        primary: 'bg-white',
        secondary: 'bg-gray-50',
      },
      text: {
        primary: 'text-gray-900',
        secondary: 'text-gray-600',
        tertiary: 'text-gray-400',
      },
      border: {
        default: 'border-gray-200',
      }
    },
    dark: {
      background: {
        primary: 'bg-gray-800',
        secondary: 'bg-gray-750',
      },
      text: {
        primary: 'text-white',
        secondary: 'text-gray-300',
        tertiary: 'text-gray-400',
      },
      border: {
        default: 'border-gray-700',
      }
    }
  };
  
  // Export full theme object
  export default {
    colors,
    spacing,
    fontSizes,
    fontWeights,
    borderRadius,
    shadows,
    zIndices,
    durations,
    transitions,
    variants
  };