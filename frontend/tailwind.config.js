/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary amber color palette
        amber: {
          50: '#FFF9F2',
          100: '#FFF0E0',
          200: '#FFE1C2',
          300: '#FFD1A3',
          400: '#FFC285',
          500: '#FF9525',  // Your primary color
          600: '#FA8A20',
          700: '#E67A15',
          800: '#D16A10',
          900: '#B8560C',
          950: '#9A4509',
        },
        // Also update cobalt to match the new scheme
        cobalt: {
          50: '#FFF5F7',
          100: '#FFE6EB',
          200: '#FFD0D9',
          300: '#FFBBC7',
          400: '#FFA6B5',
          500: '#FF94AE',  // Secondary brand color (rose shade)
          600: '#FF758F',
          700: '#FF5677',
          800: '#FF385F',
          900: '#FF1947',
          950: '#FF0035',
        },
        // Secondary/accent color palette - cobalt blue for contrast when needed
        secondary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C1FF',
          300: '#66A3FF',
          400: '#3384FF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
          950: '#000D1F',
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
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'pulse-gentle': 'pulse-gentle 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
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
        'slide-in': {
          '0%': {
            transform: 'translateY(10px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0) 100%)',
        'hero-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'card-gradient': 'linear-gradient(145deg, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        'soft': '0 2px 8px -1px rgba(0, 0, 0, 0.05), 0 3px 6px -1px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        'soft-xl': '0 20px 40px -10px rgba(0, 0, 0, 0.07), 0 12px 20px -8px rgba(0, 0, 0, 0.03)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(255, 193, 7, 0.3)',
        'glow-lg': '0 0 30px rgba(255, 193, 7, 0.4)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      scale: {
        '98': '.98',
        '102': '1.02',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.65rem', // Extra-extra small
      },
    },
  },
  plugins: [],
}