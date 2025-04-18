// src/components/ui/TabNavigation.js
import React from 'react';

const TabNavigation = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex overflow-x-auto hide-scrollbar" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                group inline-flex items-center px-4 py-3 border-b-2 font-medium text-sm
                ${isActive 
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <tab.icon 
                className={`mr-2 h-5 w-5 ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400'}`} 
                aria-hidden="true" 
              />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;