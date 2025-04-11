// src/components/Card.js
import React from 'react';

/**
 * Card component for consistent card styling throughout the application
 * Can be used for any content that needs to be displayed in a card format
 */
const Card = ({ 
  children, 
  title, 
  icon: Icon, 
  action, 
  onActionClick,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Card header with title and optional action */}
      {(title || action) && (
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            {Icon && (
              <Icon 
                size={18} 
                className="mr-2 text-cobalt-500 dark:text-cobalt-400"
              />
            )}
            <h3 className="font-medium text-gray-800 dark:text-white">{title}</h3>
          </div>
          
          {action && onActionClick && (
            <button 
              className="text-sm text-cobalt-600 dark:text-cobalt-400 hover:text-cobalt-700 dark:hover:text-cobalt-300"
              onClick={onActionClick}
            >
              {action}
            </button>
          )}
        </div>
      )}
      
      {/* Card content */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;