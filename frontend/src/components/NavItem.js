// components/NavItem.js
import React from 'react';

const NavItem = ({ Icon, label, active = false, badge }) => {
  return (
    <div className={`px-4 py-3 flex items-center cursor-pointer transition-colors
      ${active 
        ? 'bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-purple-200 dark:hover:bg-purple-700'
      }`}>
      <Icon size={20} className="shrink-0" />
      <span className="ml-3 flex-grow">{label}</span>
      
      {badge && (
        <div className="ml-2 bg-purple-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </div>
      )}
    </div>
  );
};

export default NavItem;