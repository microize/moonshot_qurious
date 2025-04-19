import React, { useState, useEffect } from 'react';

const Logo = ({ onLogoClick, isCollapsed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Add subtle continuous animation for the logo
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
        {/* Logo Image Container */}
        <div
          className={`relative flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-300 overflow-hidden ${
            isHovered
              ? 'rotate-6 scale-110 shadow-md'
              : isAnimating
                ? 'shadow-sm'
                : 'shadow-sm'
          }`}
        >
          {/* Logo Image */}
          <img 
            src="/assets/images/1.png" 
            alt="Quriuz Logo" 
            className={`w-full h-full object-cover transition-all duration-7000 ${
              isHovered
                ? 'transform scale-110'
                : isAnimating
                  ? 'animate-pulse'
                  : ''
            }`}
          />
        </div>
        
        {/* Logo Text + Tagline (Conditionally Rendered) */}
        {!isCollapsed && (
          <div className="flex flex-col justify-center">
            {/* Main title - with Poppins font */}
            <span
              className={`font-poppins text-gray-800 dark:text-gray-400 text-xl font-semibold tracking-tight transition-all duration-300 ${
                isHovered ? 'translate-x-0.5' : ''
              }`}
            >
              Quriuz.ai
            </span>
            
            {/* Tagline - with gradient text */}
            <div className="h-5 overflow-hidden">
              <span
                className="font-poppins font-semibold text-sm tracking-wide block bg-gradient-to-r from-cobalt-500 to-amber-600 bg-clip-text text-transparent"
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