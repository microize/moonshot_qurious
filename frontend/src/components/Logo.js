import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ onLogoClick, isCollapsed }) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
              ? 'bg-gradient-to-br from-amber-400 to-amber-600 rotate-6 scale-110 shadow-glow'
              : 'bg-gradient-to-br from-amber-500 to-amber-600 shadow-sm'
          }`}
        >
          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-2xl bg-amber-400 opacity-0 blur-xl transition-opacity duration-300 ${
              isHovered ? 'opacity-30' : 'opacity-0'
            }`}
          ></div>
          {/* Infinity SVG */}
          <svg
            viewBox="0 0 24 24"
            className={`w-6 h-6 transition-all duration-300 z-10 ${
              isHovered ? 'text-white transform rotate-12' : 'text-white'
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
          <div className="flex flex-col justify-center items-start text-left overflow-hidden">
            {/* Main title */}
            <span
              className={`text-black dark:text-gray-200 text-xl font-semibold transition-all duration-300 ${
                isHovered ? 'tracking-wider' : ''
              }`}
            >
              Qurius.ai
            </span>
            {/* Tagline */}
            <span
              className={`text-xs text-black dark:text-gray-300 font-medium transition-all duration-300 ease-in-out ${
                isHovered ? 'opacity-100 max-h-6 mt-0' : 'opacity-0 max-h-0 -mt-1'
              } overflow-hidden`}
            >
              Learn. Practise. Apply.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;