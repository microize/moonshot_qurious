// components/Sidebar.js
import React from 'react';
import { Home, BookOpen, CheckSquare, Users, BarChart2, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import NavItem from './NavItem';
import Logo from './Logo';

const Sidebar = () => {
  const { darkMode, toggleTheme } = useTheme();

  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: BookOpen, label: 'Courses' },
    { icon: CheckSquare, label: 'Assessments' },
    { icon: Users, label: 'Community' },
    { icon: BarChart2, label: 'Leaderboard' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-purple-100 dark:bg-purple-800 border-r border-purple-200 dark:border-purple-700 shadow-sm">
      <div className="p-4">
        <Logo />
      </div>
      
      <nav className="mt-6">
        {navItems.map((item, index) => (
          <NavItem 
            key={index}
            Icon={item.icon}
            label={item.label}
            active={index === 0}
          />
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-0 w-64 px-4">
        <button 
          onClick={toggleTheme}
          className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-purple-700 rounded-md transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;