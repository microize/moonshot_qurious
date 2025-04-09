// components/Sidebar.js
import React from 'react';
import { Home, BookOpen, CheckSquare, Users, BarChart2, Settings, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import NavItem from './NavItem';
import Logo from './Logo';
import DailyGoal from './DailyGoal';

const Sidebar = () => {
  const { darkMode, toggleTheme } = useTheme();

  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: BookOpen, label: 'Courses', badge: 3 },
    { icon: CheckSquare, label: 'Assessments' },
    { icon: Users, label: 'Community' },
    { icon: BarChart2, label: 'Leaderboard' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-purple-100 dark:bg-purple-800 border-r border-purple-200 dark:border-purple-700 shadow-sm flex flex-col">
      <div className="p-4">
        <Logo />
      </div>
      
      <nav className="mt-6 overflow-y-auto flex-grow">
        {navItems.map((item, index) => (
          <NavItem 
            key={index}
            Icon={item.icon}
            label={item.label}
            active={item.active}
            badge={item.badge}
          />
        ))}
      </nav>
      
      <div className="p-4 mt-auto">
        <DailyGoal />
        
        <button 
          onClick={toggleTheme}
          className="mt-4 flex items-center space-x-3 w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-purple-700 rounded-md transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
  };

  export default Sidebar;