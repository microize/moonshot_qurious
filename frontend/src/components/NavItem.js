// components/NavItem.js
import React from 'react';

const NavItem = ({ Icon, label, active = false }) => {
  return (
    <div className={`px-4 py-3 flex items-center space-x-3 cursor-pointer transition-colors
      ${active 
        ? 'bg-purple-200 dark:bg-purple-700 text-purple-700 dark:text-purple-200' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-purple-200 dark:hover:bg-purple-700'
      }`}>
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
};

export default NavItem;