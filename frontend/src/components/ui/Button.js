// src/components/ui/Button.js
import React from 'react';
import { classNames } from '../../utils/styleUtils';
import { buttonStyles } from '../../styles/components';

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
  // Get appropriate classes based on variant and size
  const baseClasses = buttonStyles.base;
  const variantClasses = buttonStyles.variants[variant] || buttonStyles.variants.primary;
  const sizeClasses = buttonStyles.sizes[size] || buttonStyles.sizes.md;
  
  // Combine all classes
  const buttonClasses = classNames(
    baseClasses,
    variantClasses,
    sizeClasses,
    fullWidth ? 'w-full' : '',
    disabled || loading ? buttonStyles.states.disabled : '',
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