// src/components/UserAvatar.js - Enhanced with Apple-style design
import React, { useState, useEffect } from 'react';

/**
 * UserAvatar component that handles various display modes:
 * - API: Fetches avatar from the API
 * - Initials: Shows user's initials when no avatar is available
 * - Fallback: Shows a gradient background if neither of the above works
 */
const UserAvatar = ({ 
  userId, 
  name = '', 
  size = 'md', 
  isOnline, 
  showStatus = false,
  className = '',
  onClick,
  withBorder = true
}) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [error, setError] = useState(false);
  const [seed, setSeed] = useState(1);

  // Size mappings
  const sizeClasses = {
    'xs': 'w-6 h-6 text-xs',
    'sm': 'w-8 h-8 text-sm',
    'md': 'w-10 h-10 text-base',
    'lg': 'w-12 h-12 text-lg',
    'xl': 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-2xl'
  };

  // Border size based on avatar size
  const borderClasses = {
    'xs': 'border',
    'sm': 'border-2',
    'md': 'border-2',
    'lg': 'border-3',
    'xl': 'border-4',
    '2xl': 'border-4'
  };

  // Generate initials from name
  const getInitials = () => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Generate gradient colors based on name (consistent for the same name)
  const getGradientColors = () => {
    if (!name) return ['from-cobalt-400', 'to-cobalt-600'];
    
    // Simple hash function to get consistent colors
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
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

// Set default avatar URL
useEffect(() => {
  setAvatarUrl('/api/placeholder/150/150'); // Use your app's placeholder API endpoint
}, []);

  // Generate a new seed for gradient variation when avatar fails
  useEffect(() => {
    if (error) {
      setSeed(Math.floor(Math.random() * 8) + 1);
    }
  }, [error]);

  // Get gradient classes based on name and seed
  const [gradientStart, gradientEnd] = getGradientColors();



  return (
    <div 
      className={`relative flex-shrink-0 ${className}`}
      onClick={onClick}
    >
      {/* Show actual avatar if we have one */}
      {avatarUrl && !error ? (
        <img 
          src={avatarUrl}
          alt={name || 'User avatar'}
          className={`${sizeClasses[size]} rounded-full object-cover ${withBorder ? `${borderClasses[size]} border-white dark:border-gray-800` : ''} ${onClick ? 'cursor-pointer' : ''}`}
          onError={() => setError(true)}
        />
      ) : (
        // Show initials with gradient background as fallback
        <div 
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white bg-gradient-to-br ${gradientStart} ${gradientEnd} ${onClick ? 'cursor-pointer' : ''}`}
        >
          {getInitials()}
        </div>
      )}
      
      {/* Online status indicator */}
      {showStatus && isOnline !== undefined && (
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${isOnline ? 'bg-emerald-500' : 'bg-gray-400'} border-2 border-white dark:border-gray-800 rounded-full ${isOnline ? 'shadow-glow' : ''}`}></span>
      )}
    </div>
  );
};

export default UserAvatar;