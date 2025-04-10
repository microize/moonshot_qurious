// Enhanced Logo.js with microstimuli and new color scheme
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  
  // Occasionally pulse the logo to draw attention
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1000);
      }
    }, 15000); // Pulse every 15 seconds
    
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <Link to="/" className="inline-block">
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Icon Container */}
        <div 
          className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
            isHovered 
              ? 'bg-primary-400 dark:bg-primary-500 rotate-6 scale-110' 
              : isPulsing
                ? 'bg-primary-300 dark:bg-primary-600 scale-105'
                : 'bg-primary-300 dark:bg-primary-600'
          }`}
        >
          {/* Logo Icon */}
          <Lightbulb 
            size={20} 
            className={`transition-all duration-300 ${
              isHovered 
                ? 'text-white transform rotate-12' 
                : isPulsing
                  ? 'text-primary-700 dark:text-primary-200'
                  : 'text-primary-700 dark:text-primary-200'
            }`}
          />
        </div>
        
        {/* Logo Text */}
        <div className="relative">
          <span className={`text-primary-600 dark:text-primary-300 text-xl font-semibold transition-all duration-300 ${
            isHovered ? 'tracking-wider' : ''
          }`}>
            Quriousity
          </span>
          
          {/* Tagline that appears on hover */}
          {isHovered && (
            <span className="absolute -top-2 -right-2 text-xs text-primary-500 dark:text-primary-300 opacity-80">
              Learn daily
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Logo;