// src/utils/styleUtils.js
// Utility functions for handling styles and class generation

/**
 * Combines class names, filtering out falsy values
 * @param {...string} classes - Class names to combine
 * @returns {string} - Combined class string
 */
export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  
  /**
   * Get badge style for a course type
   * @param {string} type - Course type (Course, Pathway, Workshop)
   * @returns {string} - CSS classes for the badge
   */
  export const getCourseBadgeStyle = (type) => {
    switch (type) {
      case 'Course': 
        return 'bg-cobalt-100 dark:bg-cobalt-900/30 text-cobalt-600 dark:text-cobalt-300 border border-cobalt-200 dark:border-cobalt-800/60';
      case 'Pathway': 
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60';
      case 'Workshop': 
        return 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-300 border border-accent-200 dark:border-accent-800/60';
      default: 
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
    }
  };
  
  /**
   * Get status color based on status value
   * @param {string} status - Status value (active, pending, inactive, etc.)
   * @returns {string} - CSS color class
   */
  export const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'success':
        return 'text-green-500 dark:text-green-400';
      case 'pending':
      case 'in-progress':
      case 'warning':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'inactive':
      case 'failed':
      case 'error':
        return 'text-red-500 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };
  
  /**
   * Generates gradient classes based on parameters
   * @param {string} from - From color (e.g., 'cobalt-400')
   * @param {string} to - To color (e.g., 'cobalt-600')
   * @param {string} direction - Direction (r, l, t, b, etc.)
   * @returns {string} - CSS gradient classes
   */
  export const getGradientClasses = (from, to, direction = 'r') => {
    return `bg-gradient-to-${direction} from-${from} to-${to}`;
  };
  
  /**
   * Get component variation classes (for buttons, cards, etc.)
   * @param {string} variant - Variant name
   * @param {Object} variants - Object with variant classes
   * @param {string} defaultVariant - Default variant name
   * @returns {string} - CSS classes for the variant
   */
  export const getVariantClasses = (variant, variants, defaultVariant = 'default') => {
    return variants[variant] || variants[defaultVariant];
  };
  
  /**
   * Get size classes (for buttons, avatars, etc.)
   * @param {string} size - Size name (sm, md, lg, etc.)
   * @param {Object} sizes - Object with size classes
   * @param {string} defaultSize - Default size name
   * @returns {string} - CSS classes for the size
   */
  export const getSizeClasses = (size, sizes, defaultSize = 'md') => {
    return sizes[size] || sizes[defaultSize];
  };
  
  /**
   * Get conditional hover classes
   * @param {boolean} isHovered - Whether element is hovered
   * @param {string} hoveredClasses - Classes to apply when hovered
   * @param {string} normalClasses - Classes to apply when not hovered
   * @returns {string} - CSS classes based on hover state
   */
  export const getHoverClasses = (isHovered, hoveredClasses, normalClasses = '') => {
    return isHovered ? hoveredClasses : normalClasses;
  };
  
  /**
   * Get conditional pressed classes
   * @param {boolean} isPressed - Whether element is pressed
   * @param {string} pressedClasses - Classes to apply when pressed
   * @param {string} normalClasses - Classes to apply when not pressed
   * @returns {string} - CSS classes based on pressed state
   */
  export const getPressedClasses = (isPressed, pressedClasses, normalClasses = '') => {
    return isPressed ? pressedClasses : normalClasses;
  };
  
  /**
   * Creates a responsive class with different values for different breakpoints
   * @param {Object} breakpoints - Object with breakpoint values
   * @param {string} property - CSS property name
   * @returns {string} - Responsive CSS classes
   */
  export const getResponsiveClasses = (breakpoints, property) => {
    const result = [];
    
    if (breakpoints.base) {
      result.push(`${property}-${breakpoints.base}`);
    }
    
    if (breakpoints.sm) {
      result.push(`sm:${property}-${breakpoints.sm}`);
    }
    
    if (breakpoints.md) {
      result.push(`md:${property}-${breakpoints.md}`);
    }
    
    if (breakpoints.lg) {
      result.push(`lg:${property}-${breakpoints.lg}`);
    }
    
    if (breakpoints.xl) {
      result.push(`xl:${property}-${breakpoints.xl}`);
    }
    
    return result.join(' ');
  };
  
  /**
   * Format a date string to a localized format
   * @param {string|Date} date - Date to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string} - Formatted date string
   */
  export const formatDate = (date, options = {}) => {
    if (!date) return '';
    
    const defaultOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    try {
      return new Intl.DateTimeFormat('en-US', {...defaultOptions, ...options}).format(dateObj);
    } catch (e) {
      console.error('Error formatting date:', e);
      return '';
    }
  };
  
  /**
   * Get animation classes for micro-interactions
   * @param {Object} states - Object containing UI states
   * @returns {string} - Combined animation classes
   */
  export const getAnimationClasses = ({ isHovered, isPressed, isLoading, isActive }) => {
    const classes = [];
    
    if (isLoading) classes.push('animate-pulse');
    if (isHovered) classes.push('hover:shadow-md');
    if (isPressed) classes.push('scale-98');
    if (isActive) classes.push('ring-2 ring-cobalt-500');
    
    return classes.join(' ');
  };
  
  // Create a named export object
  const styleUtils = {
    classNames,
    getCourseBadgeStyle,
    getStatusColor,
    getGradientClasses,
    getVariantClasses,
    getSizeClasses,
    getHoverClasses,
    getPressedClasses,
    getResponsiveClasses,
    formatDate,
    getAnimationClasses
  };
  
  export default styleUtils;