// src/components/ui/Card.js
import React from 'react';
import { classNames } from '../../utils/styleUtils';
import { cardStyles } from '../../styles/components';

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
  // Get appropriate classes based on variant
  const baseClasses = cardStyles.base;
  const variantClasses = cardStyles.variants[variant] || cardStyles.variants.default;
  
  // Create header based on title or withHeader prop
  const showHeader = title || action || withHeader;
  
  // Combine all classes
  const cardClasses = classNames(
    baseClasses,
    variantClasses,
    className
  );

  return (
    <div className={cardClasses}>
      {/* Card header with title and optional action */}
      {showHeader && (
        <div className={classNames(cardStyles.parts.header, headerClassName)}>
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
      <div className={classNames(cardStyles.parts.body, bodyClassName)}>
        {children}
      </div>
      
      {/* Card footer */}
      {withFooter && (
        <div className={classNames(cardStyles.parts.footer, footerClassName)}>
          {/* Footer content - can be passed as a prop in the future if needed */}
        </div>
      )}
    </div>
  );
};

export default Card;