// src/components/UserAvatar.js
import React, { useState, useEffect } from 'react';
import { userService } from '../services/apiService';

/**
 * UserAvatar component that handles various display modes:
 * - API: Fetches avatar from FastAPI
 * - Initials: Shows user's initials when no avatar is available
 * - Fallback: Shows a placeholder if neither of the above works
 */
const UserAvatar = ({ 
  userId, 
  name, 
  size = 'md', 
  isOnline, 
  showStatus = false,
  className = '',
  onClick
}) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [error, setError] = useState(false);
  
  // Size mappings
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-2xl'
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
  
  // Generate background color based on name (consistent for the same name)
  const getBackgroundColor = () => {
    if (!name) return 'bg-primary-500';
    
    // Simple hash function to get consistent color
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'bg-primary-500', 'bg-accent-500', 'bg-primary-600', 
      'bg-accent-600', 'bg-emerald-500', 'bg-indigo-500',
      'bg-rose-500', 'bg-amber-500', 'bg-cyan-500'
    ];
    
    return colors[hash % colors.length];
  };
  
  // Load avatar from API
  useEffect(() => {
    if (!userId || error) return;
    
    // Try to load the avatar
    const avatarUrl = userService.getUserAvatar(userId);
    
    // Check if the image exists
    const img = new Image();
    img.src = avatarUrl;
    
    img.onload = () => setAvatarUrl(avatarUrl);
    img.onerror = () => setError(true);
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [userId, error]);
  
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
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 ${onClick ? 'cursor-pointer' : ''}`}
          onError={() => setError(true)}
        />
      ) : (
        // Show initials avatar as fallback
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white ${getBackgroundColor()} ${onClick ? 'cursor-pointer' : ''}`}>
          {getInitials()}
        </div>
      )}
      
      {/* Online status indicator */}
      {showStatus && isOnline !== undefined && (
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${isOnline ? 'bg-success-500' : 'bg-neutral-400'} border-2 border-white dark:border-slate-800 rounded-full`}></span>
      )}
    </div>
  );
};

export default UserAvatar;