// src/components/PageContainer.js
import React from 'react';
import { classNames } from '../utils/styleUtils';

/**
 * PageContainer component to provide consistent layout and styling for all pages
 * This creates a unified look and feel across the application
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Page content
 * @param {string} [props.title] - Page title
 * @param {string} [props.subtitle] - Page subtitle
 * @param {string} [props.action] - Text for action button
 * @param {Function} [props.onActionClick] - Action button click handler
 * @param {boolean} [props.fullWidth=false] - Whether content should take full width
 * @param {string} [props.className=''] - Additional CSS classes for container
 * @param {string} [props.titleClassName=''] - Additional CSS classes for title
 * @param {ReactNode} [props.headerContent] - Additional content to display in header
 */
const PageContainer = ({ 
  children, 
  title,
  subtitle,
  action,
  onActionClick,
  fullWidth = false,
  className = '',
  titleClassName = '',
  headerContent,
}) => {
  return (
    <div className={classNames("max-w-7xl mx-auto px-4 sm:px-6 py-8", className)}>
      {/* Page header section with title and optional action button */}
      {(title || headerContent) && (
        <div className="flex justify-between items-center mb-6">
          <div>
            {title && (
              <h1 className={classNames("text-3xl font-semibold text-gray-600 dark:text-gray-300 flex items-center", titleClassName)}>
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {headerContent}
            
            {action && onActionClick && (
              <button 
                onClick={onActionClick}
                className="px-4 py-2 bg-cobalt-500 hover:bg-cobalt-600 text-white text-sm rounded-lg transition-colors"
              >
                {action}
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Main content container */}
      <div className={fullWidth ? 'w-full' : ''}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;