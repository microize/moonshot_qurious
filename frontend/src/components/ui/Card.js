// src/components/ui/Card.js
import React from 'react';
import { classNames } from '../../utils/styleUtils';

/**
 * Card component for consistent card styling throughout the application
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {string} [props.title] - Card title
 * @param {ReactNode} [props.icon] - Icon component to display next to title
 * @param {string} [props.action] - Text for the action button
 * @param {Function} [props.onActionClick] - Handler for action click
 * @param {string} [props.variant='default'] - Card style variant
 * @param {boolean} [props.withHeader=false] - Whether to display header section
 * @param {boolean} [props.withFooter=false] - Whether to display footer section
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.bodyClassName=''] - Additional CSS classes for the body
 * @param {string} [props.headerClassName=''] - Additional CSS classes for the header
 * @param {string} [props.footerClassName=''] - Additional CSS classes for the footer
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
  // Base card classes
  const baseClasses = 'bg-white dark:bg-gray-800 overflow-hidden';
  
  // Card variants
  const variants = {
    default: 'rounded-lg shadow-sm border border-gray-100 dark:border-gray-700',
    elevated: 'rounded-xl shadow-md border border-gray-100 dark:border-gray-700', 
    flat: 'rounded-lg border border-gray-200 dark:border-gray-700',
    branded: 'rounded-lg bg-cobalt-50 dark:bg-cobalt-900/20 border border-cobalt-100 dark:border-cobalt-800',
  };
  
  // Card parts
  const parts = {
    header: 'px-5 py-4 border-b border-gray-100 dark:border-gray-700',
    body: 'p-5',
    footer: 'px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750',
  };
  
  // Create header based on title or withHeader prop
  const showHeader = title || action || withHeader;
  
  // Combine all classes
  const cardClasses = classNames(
    baseClasses,
    variants[variant] || variants.default,
    className
  );

  return (
    <div className={cardClasses}>
      {/* Card header with title and optional action */}
      {showHeader && (
        <div className={classNames(parts.header, headerClassName)}>
          <div className="flex items-center justify-between">
            {title && (
              <div className="flex items-center">
                {Icon && (
                  <Icon 
                    size={18} 
                    className="mr-2 text-cobalt-500 dark:text-cobalt-400"
                  />
                )}
                <h3 className="font-medium text-gray-800 dark:text-white">{title}</h3>
              </div>
            )}
            
            {action && onActionClick && (
              <button 
                className="text-sm text-cobalt-600 dark:text-cobalt-400 hover:text-cobalt-700 dark:hover:text-cobalt-300"
                onClick={onActionClick}
              >
                {action}
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Card content */}
      <div className={classNames(parts.body, bodyClassName)}>
        {children}
      </div>
      
      {/* Card footer */}
      {withFooter && (
        <div className={classNames(parts.footer, footerClassName)}>
          {/* Footer content - can be passed as a prop in the future if needed */}
        </div>
      )}
    </div>
  );
};

export default Card;