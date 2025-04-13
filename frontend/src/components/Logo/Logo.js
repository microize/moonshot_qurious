import React, { useState, useEffect } from 'react';

const Logo = ({ onLogoClick, isCollapsed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Add subtle continuous animation for the infinity loop
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 5000);
    
    return () => clearInterval(animationInterval);
  }, []);
  
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };
  
  return (
    <div onClick={handleLogoClick} className="cursor-pointer inline-block">
      <div
        className="flex items-center space-x-3 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Icon Container */}
        <div
          className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 ${
            isHovered
              ? 'bg-gradient-to-br from-red-400 to-amber-600 rotate-6 scale-110 shadow-md'
              : isAnimating 
                ? 'bg-gradient-to-br from-red-400 to-amber-600 shadow-sm' 
                : 'bg-gradient-to-br from-red-500 to-amber-600 shadow-sm'
          }`}
        >
          {/* Infinity SVG */}
          <svg
            viewBox="0 0 24 24"
            className={`w-6 h-6 transition-all duration-700 z-10 ${
              isHovered 
                ? 'text-white transform rotate-12' 
                : isAnimating 
                  ? 'text-white animate-pulse' 
                  : 'text-white'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 12c0-1.657-1.343-3-3-3-2.5 0-5 6-7.5 6-1.657 0-3-1.343-3-3s1.343-3 3-3c2.5 0 5 6 7.5 6 1.657 0 3-1.343 3-3z" />
          </svg>
        </div>
        
        {/* Logo Text + Tagline (Conditionally Rendered) */}
        {!isCollapsed && (
          <div className="flex flex-col justify-center">
            {/* Main title - now in gray */}
            <span
              className={`text-gray-600 dark:text-gray-400 text-xl font-normal  tracking-tight transition-all duration-300 ${
                isHovered ? 'translate-x-0.5' : ''
              }`}
            >
              Qurius.ai
            </span>
            
            {/* Tagline - Always visible now */}
            <div className="h-5 overflow-hidden">
              <span
                className="text-xs text-gray-400 dark:text-gray-500 font-normal tracking-wide block"
              >
                Learn. Practice. Apply.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;