// src/components/ui/Button.js - Updated with amber color scheme
import React from 'react';
import { classNames } from '../../utils/styleUtils';

/**
 * Button component with different variants and sizes
 * Updated to use amber as the primary color
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  as: Component = 'button',
  ...props
}) => {
  // Button variants with amber as primary color
  const variants = {
    primary: `bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700 focus:ring-amber-400`,
    secondary: `bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 focus:ring-gray-400`,
    outline: `border border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20 focus:ring-amber-400`,
    text: `text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20`,
    success: `bg-success-500 hover:bg-success-600 text-white focus:ring-success-400`,
    danger: `bg-error-500 hover:bg-error-600 text-white focus:ring-error-400`,
  };
  
  // Button sizes
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5 text-lg',
    xl: 'px-6 py-3 text-xl',
  };
  
  // Combine all classes
  const buttonClasses = classNames(
    // Base styles
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50',
    // Variant styles
    variants[variant] || variants.primary,
    // Size styles
    sizes[size] || sizes.md,
    // Width style
    fullWidth ? 'w-full' : '',
    // Disabled/loading state
    disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
    // Additional custom classes
    className
  );

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{typeof children === 'string' ? children : 'Loading...'}</span>
        </div>
      ) : children}
    </Component>
  );
};

export default Button;