// components/Sidebar.js - Updated with consistent purple theme
import React, { useState } from 'react';
import { Home, BookOpen, ClipboardCheck, BarChart2, Users, Settings, Moon, Sun, X, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const Sidebar = ({ onNavigate }) => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'assessments', icon: ClipboardCheck, label: 'Assessments' },
    { id: 'leaderboard', icon: BarChart2, label: 'Leaderboard' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    if (onNavigate) {
      onNavigate(itemId);
    }
    // Close mobile menu when an item is clicked
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-full bg-white dark:bg-gray-900 shadow-md text-purple-600 dark:text-purple-400"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar - Desktop always visible, Mobile conditionally visible */}
      <div 
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-purple-50 dark:bg-purple-900/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="px-6 py-6">
            <Logo />
          </div>
          
          {/* Navigation Items */}
          <nav className="flex-1 px-4 mt-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeItem === item.id
                    ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-900/60'
                }`}
              >
                <item.icon 
                  size={18} 
                  className={`transition-transform duration-200 ${
                    activeItem === item.id ? 'scale-110 text-purple-600 dark:text-purple-400' : ''
                  }`} 
                />
                <span className={`ml-4 text-sm font-medium transition-all duration-200 ${
                  activeItem === item.id ? 'tracking-wide' : ''
                }`}>
                  {item.label}
                </span>
                {activeItem === item.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400"></span>
                )}
              </button>
            ))}
          </nav>
          
          {/* Theme Toggle */}
          <div className="p-4 mt-auto border-t border-purple-100 dark:border-purple-800/30">
            <button 
              onClick={toggleTheme}
              className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-900/60 rounded-xl transition-all duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun size={18} className="text-amber-500 dark:text-amber-400" />
              ) : (
                <Moon size={18} className="text-purple-500" />
              )}
              <span className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar;