// Enhanced Logo.js with microstimuli
import React, { useState } from 'react';

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  
  // Occasionally pulse the logo to draw attention
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1000);
      }
    }, 15000); // Pulse every 15 seconds
    
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="flex items-center space-x-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`p-2 rounded-md transition-all duration-300 ${
        isHovered 
          ? 'bg-purple-400 dark:bg-purple-500 rotate-6 scale-110' 
          : isPulsing
            ? 'bg-purple-300 dark:bg-purple-600 scale-105'
            : 'bg-purple-300 dark:bg-purple-600'
      }`}>
        <svg 
          viewBox="0 0 24 24" 
          width="24" 
          height="24" 
          className={`transition-all duration-300 ${
            isHovered 
              ? 'text-white transform rotate-12' 
              : isPulsing
                ? 'text-purple-600 dark:text-purple-200'
                : 'text-purple-600 dark:text-purple-300'
          }`}
        >
          <path fill="currentColor" d="M12,15a4,4,0,0,0,4-4,1,1,0,0,0-2,0,2,2,0,0,1-4,0,1,1,0,0,0-2,0A4,4,0,0,0,12,15Z M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
          <path fill="currentColor" d="M16,11a1,1,0,1,0-1-1A1,1,0,0,0,16,11Z M8,11a1,1,0,1,0-1-1A1,1,0,0,0,8,11Z M12,8a4,4,0,0,0-4,4,1,1,0,0,0,2,0,2,2,0,0,1,4,0,1,1,0,0,0,2,0A4,4,0,0,0,12,8Z" />
        </svg>
      </div>
      <div className="relative">
        <span className={`text-purple-600 dark:text-purple-300 text-xl font-semibold transition-all duration-300 ${
          isHovered ? 'tracking-wider' : ''
        }`}>
          Quriousity
        </span>
        {isHovered && (
          <span className="absolute -top-2 -right-2 text-xs text-purple-500 dark:text-purple-300 opacity-80">
            Learn daily
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;