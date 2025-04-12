// src/utils/styleUtils.js
// Utility functions for handling styles and class generation

import { courseBadgeStyles } from '../styles/components';

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
  return courseBadgeStyles[type] || courseBadgeStyles.default;
};

/**
 * Get status color based on status value
 * @param {string} status - Status value (active, pending, inactive, etc.)
 * @returns {string} - CSS color class
 */
export const getStatusColor = (status) => {
  switch(status) {
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

export default {
  classNames,
  getCourseBadgeStyle,
  getStatusColor,
  getGradientClasses,
  getVariantClasses,
  getSizeClasses,
  getHoverClasses,
  getResponsiveClasses,
};