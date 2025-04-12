// src/components/LoadingSpinner.js
import React from 'react';
import { classNames } from '../utils/styleUtils';

/**
 * LoadingSpinner component for displaying loading states
 * 
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Spinner size (sm, md, lg, xl)
 * @param {string} [props.color='primary'] - Spinner color (primary, secondary, white)
 * @param {boolean} [props.fullPage=false] - Whether spinner should be centered on full page
 * @param {string} [props.text] - Optional text to display below spinner
 * @param {string} [props.className=''] - Additional CSS classes
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  fullPage = false,
  text,
  className = ''
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'border-gray-200 dark:border-gray-700 border-t-cobalt-500 dark:border-t-cobalt-400',
    secondary: 'border-gray-200 dark:border-gray-700 border-t-gray-500 dark:border-t-gray-400',
    white: 'border-white/30 border-t-white'
  };
  
  const spinnerClasses = classNames(
    'animate-spin rounded-full',
    sizeClasses[size] || sizeClasses.md,
    colorClasses[color] || colorClasses.primary,
    className
  );
  
  // If fullPage is true, center in viewport
  if (fullPage) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center">
          <div className={spinnerClasses}></div>
          {text && (
            <div className="mt-4 text-center text-cobalt-600 dark:text-cobalt-400 font-medium">
              {text}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Regular spinner
  return (
    <div className="flex flex-col items-center">
      <div className={spinnerClasses}></div>
      {text && (
        <div className="mt-2 text-sm text-cobalt-600 dark:text-cobalt-400">
          {text}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;