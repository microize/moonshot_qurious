// components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen w-full bg-purple-50 dark:bg-gray-950">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <div className="mt-4 text-center text-purple-600 dark:text-purple-400 font-medium">
        Loading...
      </div>
    </div>
  </div>
);

export default LoadingSpinner;