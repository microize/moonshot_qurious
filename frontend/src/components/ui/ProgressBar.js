// src/components/ui/ProgressBar.js
import React from 'react';
import { classNames } from '../../utils/styleUtils';
import { progressStyles } from '../../styles/components';

/**
 * ProgressBar component for displaying progress
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Current progress value (0-100)
 * @param {number} [props.max=100] - Maximum value
 * @param {string} [props.variant='default'] - Progress bar style variant
 * @param {boolean} [props.showLabel=false] - Whether to show percentage label
 * @param {string} [props.labelPosition='right'] - Position of label (right, inside, top)
 * @param {string} [props.size='default'] - Size of the progress bar (sm, default, lg)
 * @param {boolean} [props.animated=false] - Whether to show animation
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.label] - Custom label (if not provided, percentage will be shown)
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
  
  // Get appropriate classes based on variant
  const baseClasses = progressStyles.base;
  const indicatorClasses = progressStyles.indicator[variant] || progressStyles.indicator.default;
  
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
  
  // Combine all classes
  const progressClasses = classNames(
    baseClasses,
    sizeClasses[size] || sizeClasses.default,
    className
  );
  
  // Indicator classes
  const indicatorFinalClasses = classNames(
    indicatorClasses,
    animationClass
  );

  return (
    <div className="w-full">
      {/* Top label */}
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600 dark:text-gray-300">Progress</span>
          <span className="text-cobalt-600 dark:text-cobalt-400">{label}</span>
        </div>
      )}
      
      {/* Progress bar container */}
      <div className={progressClasses}>
        {/* Progress indicator */}
        <div 
          className={indicatorFinalClasses}
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
        <div className="ml-2 inline-block text-xs text-cobalt-600 dark:text-cobalt-400">
          {label}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;