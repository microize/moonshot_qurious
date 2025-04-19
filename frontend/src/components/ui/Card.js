// src/components/ui/Card.js
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, X, ExternalLink } from 'lucide-react';

/**
 * Enhanced Card component with animations, gradient styling, 
 * and improved interaction patterns matching the Sidebar component
 */
const Card = ({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  actionIcon,
  onActionClick,
  onClose,
  variant = 'default',
  withHeader = false,
  withFooter = false,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '',
  collapsible = false,
  defaultCollapsed = false,
  fullWidth = false,
  hoverable = false,
  noPadding = false,
  animateIn = false,
  borderStyle = 'dashed', // 'dashed', 'solid', 'none'
  maxHeight,
  footerContent,
  headerRight,
  id,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [contentHeight, setContentHeight] = useState('auto');
  const contentRef = useRef(null);
  const cardRef = useRef(null);
  
  // Add animation and gradient styles to document head
  useEffect(() => {
    // Create styles for card component similar to sidebar
    const style = document.createElement('style');
    style.innerHTML = `
      /* Removed gradient hover effect for header title */
      
      /* Removed color change for header icon on hover */
      
      .card-collapse-transition {
        transition: max-height 0.3s ease-out, opacity 0.2s ease-out, transform 0.2s ease-out;
        overflow: hidden;
      }
      
      .card-animate-in {
        animation: card-fade-in 0.3s ease-out forwards;
      }
      
      @keyframes card-fade-in {
        0% {
          opacity: 0;
          transform: translateY(8px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .card-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Measure content height for smooth animations when collapsing/expanding
  useEffect(() => {
    if (contentRef.current && collapsible) {
      if (!isCollapsed) {
        const height = contentRef.current.scrollHeight;
        setContentHeight(`${height}px`);
      } else {
        setContentHeight('0px');
      }
    }
  }, [isCollapsed, collapsible, children]);
  
  // Handle keyboard accessibility
  const handleKeyDown = (e) => {
    if (collapsible && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsCollapsed(!isCollapsed);
    }
  };

  // Card variants with consistent styling
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm',
    elevated: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md',
    flat: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl',
    branded: 'bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/10 dark:to-gray-800 border border-amber-200 dark:border-amber-800/30 rounded-xl shadow-sm',
    subtle: 'bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-700 rounded-xl',
    success: 'bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl',
    warning: 'bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl',
    danger: 'bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl',
    info: 'bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-xl',
  };

  // Header, body, and footer styles
  const partStyles = {
    header: 'px-5 py-4',
    body: noPadding ? '' : 'p-5',
    footer: 'px-5 py-4 bg-gray-50 dark:bg-gray-750',
  };

  // Determine border styles
  const borderStyles = {
    dashed: 'border-dashed',
    solid: 'border-solid',
    none: 'border-none',
  };

  // Determine if header should be shown
  const showHeader = title || action || withHeader || headerRight;

  // Combine style classes
  const cardClasses = [
    variants[variant] || variants.default,
    borderStyles[borderStyle] || borderStyles.dashed,
    fullWidth ? 'w-full' : '',
    hoverable ? 'card-hover transition-all duration-200' : '',
    animateIn ? 'card-animate-in' : '',
    className,
  ].filter(Boolean).join(' ');

  // Handle border between header and body
  const headerBorderClass = !isCollapsed ? 'border-b border-gray-200 dark:border-gray-700' : '';
  
  // Create heading element based on importance level
  const Heading = variant === 'elevated' || variant === 'branded' ? 'h3' : 'h4';

  return (
    <div 
      className={cardClasses} 
      ref={cardRef}
      id={id}
      role="region"
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      {/* Card header with title and optional action */}
      {showHeader && (
        <div
          className={`${partStyles.header} ${headerBorderClass} ${headerClassName} ${collapsible ? 'cursor-pointer' : ''}`}
          onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
          onKeyDown={collapsible ? handleKeyDown : undefined}
          tabIndex={collapsible ? 0 : undefined}
          role={collapsible ? 'button' : undefined}
          aria-expanded={collapsible ? !isCollapsed : undefined}
        >
          <div className="flex items-center justify-between">
            {title && (
              <div className="flex items-start">
                {Icon && (
                  <Icon 
                    size={18} 
                    className="mr-2.5 mt-0.5 text-gray-800 dark:text-gray-300 card-header-icon flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
                <div>
                  <Heading id={`${id}-title`} className="font-medium text-gray-900 dark:text-white">
                    {title}
                  </Heading>
                  {subtitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-3 flex-shrink-0">
              {headerRight}
              
              {action && onActionClick && (
                <button 
                  className="text-sm px-2.5 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors flex items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onActionClick();
                  }}
                  aria-label={action}
                >
                  {actionIcon && (
                    <span className="mr-1.5">
                      {actionIcon === 'external' ? <ExternalLink size={14} /> : actionIcon}
                    </span>
                  )}
                  {action}
                </button>
              )}
              
              {onClose && (
                <button 
                  className="p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              )}
              
              {collapsible && (
                <button
                  className="p-1 text-gray-400 hover:text-amber-500 dark:text-gray-500 dark:hover:text-amber-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(!isCollapsed);
                  }}
                  aria-label={isCollapsed ? "Expand" : "Collapse"}
                  aria-expanded={!isCollapsed}
                >
                  {isCollapsed ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronUp size={16} />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Card content with smooth animation */}
      <div 
        ref={contentRef}
        className={`card-collapse-transition ${collapsible ? '' : ''}`}
        style={collapsible ? { 
          maxHeight: isCollapsed ? '0px' : contentHeight,
          opacity: isCollapsed ? 0 : 1,
          transform: isCollapsed ? 'translateY(-8px)' : 'translateY(0px)'
        } : maxHeight ? { maxHeight } : {}}
        aria-hidden={isCollapsed}
      >
        <div className={`${partStyles.body} ${bodyClassName}`}>
          {children}
        </div>
        
        {/* Card footer */}
        {withFooter && (
          <div className={`${partStyles.footer} ${footerClassName} border-t border-gray-200 dark:border-gray-700`}>
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to combine classes
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default Card;