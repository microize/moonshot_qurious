// components/UserHeader.js
import React from 'react';

const UserHeader = () => {
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center">
        <div className="mr-3 text-right">
          <div className="text-sm font-medium text-gray-800 dark:text-white">Sripathi</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Data Engineer</div>
          <div className="text-xs text-purple-500">440 Points</div>
        </div>
        <img 
          src="/api/placeholder/50/50" 
          alt="User Avatar" 
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <div>Current Streak: <span className="font-medium text-purple-500">8 days</span></div>
        <div>Longest Streak: <span className="font-medium text-purple-500">23 days</span></div>
      </div>
    </div>
  );
};

export default UserHeader;