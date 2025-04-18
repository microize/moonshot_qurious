// src/components/ui/DashboardHeader.js
import React from 'react';

const DashboardHeader = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h1>
      {description && (
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default DashboardHeader;