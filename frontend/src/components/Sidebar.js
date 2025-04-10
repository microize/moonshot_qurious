// components/Sidebar.js - Updated with new color scheme
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ClipboardCheck, BarChart2, Users, Settings, Moon, Sun, X, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const Sidebar = ({ onNavigate }) => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Determine active item based on current path
  const getActiveItemFromPath = (path) => {
    if (path === '/') return 'home';
    return path.split('/')[1] || 'home';
  };

  const [activeItem, setActiveItem] = useState(getActiveItemFromPath(location.pathname));

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'courses', icon: BookOpen, label: 'Courses', path: '/courses' },
    { id: 'assessments', icon: ClipboardCheck, label: 'Assessments', path: '/assessments' },
    { id: 'leaderboard', icon: BarChart2, label: 'Leaderboard', path: '/leaderboard' },
    { id: 'community', icon: Users, label: 'Community', path: '/community' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
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
          className="p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-md text-primary-600 dark:text-primary-400"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar - Desktop always visible, Mobile conditionally visible */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-50 dark:bg-slate-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
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
              <Link
                key={item.id}
                to={item.path}
                onClick={() => handleNavItemClick(item.id)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeItem === item.id
                    ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <item.icon 
                  size={18} 
                  className={`transition-transform duration-200 ${
                    activeItem === item.id ? 'scale-110 text-primary-600 dark:text-primary-400' : ''
                  }`} 
                />
                <span className={`ml-4 text-sm font-medium transition-all duration-200 ${
                  activeItem === item.id ? 'tracking-wide' : ''
                }`}>
                  {item.label}
                </span>
                {activeItem === item.id && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400"></span>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Theme Toggle */}
          <div className="p-4 mt-auto border-t border-slate-200 dark:border-slate-800/30">
            <button 
              onClick={toggleTheme}
              className="flex items-center space-x-3 w-full px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl transition-all duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun size={18} className="text-amber-500 dark:text-amber-400" />
              ) : (
                <Moon size={18} className="text-primary-500" />
              )}
              <span className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
          
          {/* Version info & attribution - adds professionalism */}
          <div className="px-6 py-4 text-center text-xs text-neutral-500 dark:text-neutral-600">
            <p>Quriousity v0.1.0</p>
            <p className="mt-1">© 2025 Quriousity Learning</p>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar;