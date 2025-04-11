// src/components/PageContainer.js
import React from 'react';

/**
 * PageContainer component to provide consistent layout and styling for all pages
 * This creates a unified look and feel across the application
 */
const PageContainer = ({ 
  children, 
  title, 
  subtitle,
  action,
  onActionClick,
  fullWidth = false
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header section with title and optional action button */}
      {title && (
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          {action && onActionClick && (
            <button 
              onClick={onActionClick}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors"
            >
              {action}
            </button>
          )}
        </div>
      )}
      
      {/* Main content container */}
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;