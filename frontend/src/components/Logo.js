// components/Logo.js
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-purple-300 dark:bg-purple-600 p-2 rounded-md">
        <svg viewBox="0 0 24 24" width="24" height="24" className="text-purple-600 dark:text-purple-300">
          <path fill="currentColor" d="M12,15a4,4,0,0,0,4-4,1,1,0,0,0-2,0,2,2,0,0,1-4,0,1,1,0,0,0-2,0A4,4,0,0,0,12,15Z M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
          <path fill="currentColor" d="M16,11a1,1,0,1,0-1-1A1,1,0,0,0,16,11Z M8,11a1,1,0,1,0-1-1A1,1,0,0,0,8,11Z M12,8a4,4,0,0,0-4,4,1,1,0,0,0,2,0,2,2,0,0,1,4,0,1,1,0,0,0,2,0A4,4,0,0,0,12,8Z" />
        </svg>
      </div>
      <span className="text-purple-600 dark:text-purple-300 text-xl font-semibold">Quriousity</span>
    </div>
  );
};

export default Logo;