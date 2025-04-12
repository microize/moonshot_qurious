// src/components/ui/Button.js
import React from 'react';
import { classNames } from '../../utils/styleUtils';

/**
 * Button component with different variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Button style variant
 * @param {string} [props.size='md'] - Button size
 * @param {boolean} [props.fullWidth=false] - Whether button takes full width
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {boolean} [props.loading=false] - Whether button is in loading state
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.type='button'] - Button type attribute
 * @param {React.ElementType} [props.as='button'] - Component to render as
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
  // Button base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  // Button variants
  const variants = {
    primary: 'bg-cobalt-500 hover:bg-cobalt-600 text-white focus:ring-cobalt-400',
    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-400',
    outline: 'border border-cobalt-300 dark:border-cobalt-700 text-cobalt-600 dark:text-cobalt-400 hover:bg-cobalt-50 dark:hover:bg-cobalt-900/20 focus:ring-cobalt-400',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white focus:ring-accent-400',
    success: 'bg-success-500 hover:bg-success-600 text-white focus:ring-success-400',
    danger: 'bg-error-500 hover:bg-error-600 text-white focus:ring-error-400',
    text: 'text-cobalt-600 dark:text-cobalt-400 hover:bg-cobalt-50 dark:hover:bg-cobalt-900/20',
  };
  
  // Button sizes
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-5 py-2.5 text-lg',
    xl: 'px-6 py-3 text-xl',
  };
  
  // Button states
  const states = {
    disabled: 'opacity-50 cursor-not-allowed',
    loading: 'relative text-transparent transition-none hover:text-transparent',
  };
  
  // Combine all classes
  const buttonClasses = classNames(
    baseClasses,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth ? 'w-full' : '',
    (disabled || loading) ? states.disabled : '',
    loading ? states.loading : '',
    className
  );

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={!disabled && !loading ? onClick : undefined}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      {children}
    </Component>
  );
};

export default Button;