// src/components/ui/Card.js - Updated with amber for highlight elements
import React from 'react';
import { classNames } from '../../utils/styleUtils';

/**
 * Card component for consistent card styling throughout the application
 * Updated to use amber for highlight elements while keeping content text black
 */
const Card = ({
  children,
  title,
  icon: Icon,
  action,
  onActionClick,
  variant = 'default',
  withHeader = false,
  withFooter = false,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
}) => {
  // Card variants 
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm',
    elevated: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md',
    flat: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg',
    branded: 'bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg',
  };
  
  // Header, body, and footer styles
  const partStyles = {
    header: 'px-5 py-4 border-b border-gray-100 dark:border-gray-700',
    body: 'p-5',
    footer: 'px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750',
  };
  
  // Determine if header should be shown
  const showHeader = title || action || withHeader;
  
  // Combine variant classes with custom class
  const cardClasses = classNames(
    variants[variant] || variants.default,
    className
  );

  return (
    <div className={cardClasses}>
      {/* Card header with title and optional action */}
      {showHeader && (
        <div className={classNames(partStyles.header, headerClassName)}>
          <div className="flex items-center justify-between">
            {title && (
              <div className="flex items-center">
                {Icon && (
                  <Icon 
                    size={18} 
                    className="mr-2 text-amber-500 dark:text-amber-400"
                  />
                )}
                <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
              </div>
            )}
            
            {action && onActionClick && (
              <button 
                className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                onClick={onActionClick}
              >
                {action}
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Card content */}
      <div className={classNames(partStyles.body, bodyClassName)}>
        {children}
      </div>
      
      {/* Card footer */}
      {withFooter && (
        <div className={classNames(partStyles.footer, footerClassName)}>
          {/* Footer content - can be passed as a prop in the future if needed */}
        </div>
      )}
    </div>
  );
};

export default Card;