// src/components/ui/ProgressBar.js - Updated with amber color scheme
import React from 'react';
import { classNames } from '../../utils/styleUtils';

/**
 * ProgressBar component for displaying progress
 * Updated to use amber as the primary color
 */
const ProgressBar = ({
  value = 0,
  max = 100,
  variant = 'default',
  showLabel = false,
  labelPosition = 'right',
  size = 'default',
  animated = false,
  className = '',
  label: customLabel,
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Progress bar variants
  const variants = {
    default: 'bg-amber-500 dark:bg-amber-500',
    secondary: 'bg-gray-400 dark:bg-gray-600',
    success: 'bg-success-500 dark:bg-success-500',
    warning: 'bg-warning-500 dark:bg-warning-500',
    error: 'bg-error-500 dark:bg-error-500',
    gradient: 'bg-gradient-to-r from-amber-400 to-amber-500',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };
  
  // Animation class
  const animationClass = animated ? 'animate-pulse' : '';
  
  // Label to display
  const label = customLabel || `${Math.round(percentage)}%`;
  
  // Base container classes
  const baseClasses = "w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden";
  
  // Combine all classes
  const progressClasses = classNames(
    baseClasses,
    sizeClasses[size] || sizeClasses.default,
    className
  );
  
  // Indicator classes
  const indicatorClasses = classNames(
    'h-full rounded-full transition-all duration-500 ease-out',
    variants[variant] || variants.default,
    animationClass
  );

  return (
    <div className="w-full">
      {/* Top label */}
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600 dark:text-gray-300">Progress</span>
          <span className="text-amber-600 dark:text-amber-400">{label}</span>
        </div>
      )}
      
      {/* Progress bar container */}
      <div className={progressClasses}>
        {/* Progress indicator */}
        <div 
          className={indicatorClasses}
          style={{ width: `${percentage}%` }}
        >
          {/* Inside label */}
          {showLabel && labelPosition === 'inside' && percentage > 20 && (
            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
              {label}
            </span>
          )}
        </div>
      </div>
      
      {/* Right label */}
      {showLabel && labelPosition === 'right' && (
        <div className="ml-2 inline-block text-xs text-amber-600 dark:text-amber-400">
          {label}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;