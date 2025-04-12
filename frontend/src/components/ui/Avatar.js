// src/components/ui/Avatar.js
import React, { useState, useEffect } from 'react';
import { classNames } from '../../utils/styleUtils';
import { avatarStyles } from '../../styles/components';

/**
 * Avatar component for user profile images
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {string} [props.size='md'] - Avatar size (xs, sm, md, lg, xl, 2xl)
 * @param {boolean} [props.isOnline] - Whether to show online status indicator
 * @param {boolean} [props.withBorder=false] - Whether to add a border
 * @param {string} [props.borderStyle='default'] - Border style (none, thin, default, thick)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 */
const Avatar = ({
  src,
  alt,
  size = 'md',
  isOnline,
  withBorder = false,
  borderStyle = 'default',
  className = '',
  onClick,
}) => {
  const [error, setError] = useState(false);
  const [seed, setSeed] = useState(1);
  
  // Get appropriate classes based on size
  const baseClasses = avatarStyles.base;
  const sizeClasses = avatarStyles.sizes[size] || avatarStyles.sizes.md;
  const borderClasses = withBorder ? avatarStyles.border[borderStyle] || avatarStyles.border.default : '';
  
  // Generate initials from name (alt text)
  const getInitials = () => {
    if (!alt) return '?';
    
    return alt
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Generate gradient colors based on name (consistent for the same name)
  const getGradientColors = () => {
    if (!alt) return ['from-cobalt-400', 'to-cobalt-600'];
    
    // Simple hash function to get consistent colors
    const hash = alt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Gradient combinations 
    const gradients = [
      ['from-cobalt-400', 'to-cobalt-600'],      // Blue
      ['from-emerald-400', 'to-emerald-600'],    // Green
      ['from-amber-400', 'to-amber-600'],        // Amber
      ['from-rose-400', 'to-rose-600'],          // Rose
      ['from-violet-400', 'to-violet-600'],      // Violet
      ['from-cyan-400', 'to-cyan-600'],          // Cyan
      ['from-indigo-400', 'to-indigo-600'],      // Indigo
      ['from-pink-400', 'to-pink-600']           // Pink
    ];
    
    return gradients[hash % gradients.length]; 
  };
  
  // Generate a new seed for gradient variation when avatar fails
  useEffect(() => {
    if (error) {
      setSeed(Math.floor(Math.random() * 8) + 1);
    }
  }, [error]);
  
  // Get gradient classes based on name and seed
  const [gradientStart, gradientEnd] = getGradientColors();
  
  // Combine all classes
  const avatarClasses = classNames(
    baseClasses,
    sizeClasses,
    borderClasses,
    onClick ? 'cursor-pointer' : '',
    className
  );

  return (
    <div className="relative flex-shrink-0">
      {/* Show actual avatar if we have one */}
      {src && !error ? (
        <img 
          src={src}
          alt={alt || 'User avatar'}
          className={avatarClasses}
          onError={() => setError(true)}
          onClick={onClick}
        />
      ) : (
        // Show initials with gradient background as fallback
        <div 
          className={classNames(
            avatarClasses,
            `flex items-center justify-center text-white bg-gradient-to-br ${gradientStart} ${gradientEnd}`
          )}
          onClick={onClick}
        >
          {getInitials()}
        </div>
      )}
      
      {/* Online status indicator */}
      {isOnline !== undefined && (
        <span 
          className={classNames(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-800',
            isOnline ? 'bg-green-500' : 'bg-gray-400',
            size === 'xs' ? 'w-1.5 h-1.5' : 
            size === 'sm' ? 'w-2 h-2' : 
            size === 'md' ? 'w-2.5 h-2.5' : 
            size === 'lg' ? 'w-3 h-3' : 
            size === 'xl' ? 'w-3.5 h-3.5' : 'w-4 h-4'
          )}
        />
      )}
    </div>
  );
};

export default Avatar;