/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary color palette - more balanced teal-blue
        primary: {
          50: '#edfafa',
          100: '#d5f5f6',
          200: '#aeeeef',
          300: '#7ee0e4',
          400: '#4ac9d0',
          500: '#2cb1bb',
          600: '#238f9b',
          700: '#1e727d',
          800: '#1c5c66',
          900: '#1a4c55',
          950: '#0d3239',
        },
        // Secondary accent colors
        accent: {
          50: '#fff8ed',
          100: '#ffefd6',
          200: '#ffdbac',
          300: '#ffc176',
          400: '#ff9d3d',
          500: '#fb7c15',
          600: '#ed5f09',
          700: '#c44a0b',
          800: '#9c3b0f',
          900: '#7e3310',
          950: '#441805',
        },
        // Neutral palette for better balance
        neutral: {
          50: '#f7f9fa',
          100: '#eef1f3',
          200: '#d8dfe4',
          300: '#b6c5ce',
          400: '#8ea2af',
          500: '#6c8393',
          600: '#546979',
          700: '#435361',
          800: '#394551',
          900: '#2d3643',
          950: '#1c232c',
        },
        // Clean slate for light/dark backgrounds
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Success, error, warning colors
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          700: '#047857',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        },
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'pulse-gentle': 'pulse-gentle 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-5px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'pulse-gentle': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.7,
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0) 100%)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}