// src/components/ui/Badge.js
import React from 'react';
import { classNames } from '../../utils/styleUtils';
import { badgeStyles } from '../../styles/components';

/**
 * Badge component for displaying status, counts, or labels
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Badge content
 * @param {string} [props.variant='primary'] - Badge style variant
 * @param {string} [props.size='md'] - Badge size
 * @param {boolean} [props.pill=true] - Whether badge has pill shape (rounded full)
 * @param {ReactNode} [props.icon] - Icon component to display
 * @param {string} [props.className=''] - Additional CSS classes
 */
const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  pill = true,
  icon: Icon,
  className = '',
}) => {
  // Get appropriate classes based on variant and size
  const baseClasses = badgeStyles.base;
  const variantClasses = badgeStyles.variants[variant] || badgeStyles.variants.primary;
  const sizeClasses = badgeStyles.sizes[size] || badgeStyles.sizes.md;
  
  // Combine all classes
  const badgeClasses = classNames(
    baseClasses,
    variantClasses,
    sizeClasses,
    pill ? 'rounded-full' : 'rounded',
    className
  );

  return (
    <span className={badgeClasses}>
      {Icon && (
        <Icon size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} className="mr-1" />
      )}
      {children}
    </span>
  );
};

export default Badge;