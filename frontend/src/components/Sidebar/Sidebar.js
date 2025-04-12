// src/components/Sidebar/Sidebar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ClipboardCheck, BarChart2, Users, Settings, Moon, Sun, X, Menu, Shield } from 'lucide-react';

// Simple utility function to combine class names
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Sidebar = () => {
  // Since we don't have access to ThemeContext, let's create a local state for dark mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false); // Local state instead of context
  const location = useLocation();
  
  // Admin mode state with toggle function
  const [isAdmin, setIsAdmin] = useState(false);
  const toggleAdminMode = () => setIsAdmin(!isAdmin);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveItem('home');
    else setActiveItem(path.split('/')[1] || 'home');
  }, [location]);

  // Apply dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Base navigation items
  const baseNavItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'courses', icon: BookOpen, label: 'Courses', path: '/courses' },
    { id: 'assessments', icon: ClipboardCheck, label: 'Assessments', path: '/assessments' },
    { id: 'leaderboard', icon: BarChart2, label: 'Leaderboard', path: '/leaderboard' },
    { id: 'community', icon: Users, label: 'Community', path: '/community' },
  ];
  
  // Admin-only navigation items
  const adminNavItems = [
    { id: 'hranalytics', icon: BarChart2, label: 'HR Analytics', path: '/hranalytics' },
  ];
  
  // Settings item (moved to bottom)
  const settingsItem = { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' };
  
  // Combine navigation items based on admin status
  const navItems = isAdmin 
    ? [...baseNavItems, ...adminNavItems] 
    : baseNavItems;

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Simple Logo component to replace the imported one
  const Logo = ({ onLogoClick, isCollapsed }) => (
    <div onClick={onLogoClick} className="cursor-pointer inline-block">
      <div className="flex items-center space-x-3 group">
        {/* Logo Icon Container */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-sm">
          {/* Infinity SVG */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 12c0-1.657-1.343-3-3-3-2.5 0-5 6-7.5 6-1.657 0-3-1.343-3-3s1.343-3 3-3c2.5 0 5 6 7.5 6 1.657 0 3-1.343 3-3z" />
          </svg>
        </div>
        {/* Logo Text (Conditionally Rendered) */}
        {!isCollapsed && (
          <div className="flex flex-col justify-center">
            <span className="text-black dark:text-gray-200 text-xl font-semibold">
              Qurius.ai
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 ${isCollapsed ? 'w-16' : 'w-64'}
        bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out
        lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`px-4 py-6 flex items-center ${isCollapsed ? 'justify-center' : 'lg:justify-between'} border-b border-gray-100 dark:border-gray-800`}>
            <Logo onLogoClick={toggleSidebar} isCollapsed={isCollapsed} />
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto overflow-x-hidden">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => handleNavItemClick(item.id)}
                className={`flex ${isCollapsed ? 'justify-center' : 'items-center'} px-3 py-3 rounded-lg transition-all duration-200 group ${
                  activeItem === item.id
                    ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className={`${isCollapsed ? 'flex justify-center w-full' : ''}`}>
                  <item.icon
                    size={18}
                    className={`${isCollapsed ? 'mx-auto' : 'mr-3'} transition-all duration-300 ${
                      activeItem === item.id ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                    }`}
                  />
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-medium transition-all duration-200">
                    {item.label}
                  </span>
                )}
                {activeItem === item.id && !isCollapsed && (
                  <span className="ml-auto w-1 h-5 rounded-full bg-amber-500 dark:bg-amber-400 opacity-80"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-4">
            {/* Admin Mode Toggle */}
            <div className="px-3 mb-3">
              <button
                onClick={toggleAdminMode}
                className={`w-full flex ${isCollapsed ? 'justify-center' : 'items-center'} px-3 py-3 rounded-lg transition-all duration-200 ${
                  isAdmin
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
                aria-label="Toggle admin mode"
                title={isAdmin ? "Admin Mode: ON" : "Admin Mode: OFF"}
              >
                <Shield
                  size={18}
                  className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                    isAdmin ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-500'
                  }`}
                />
                
                {/* Only show text when not collapsed */}
                {!isCollapsed && (
                  <span className="text-sm font-medium">
                    {isAdmin ? 'Admin Mode: ON' : 'Admin Mode'}
                  </span>
                )}
              </button>
            </div>

            {/* Settings */}
            <div className="px-3 mb-3">
              <Link
                to={settingsItem.path}
                onClick={() => handleNavItemClick(settingsItem.id)}
                className={`flex ${isCollapsed ? 'justify-center' : 'items-center'} px-3 py-3 rounded-lg transition-all duration-200 group ${
                  activeItem === settingsItem.id
                    ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className={`${isCollapsed ? 'flex justify-center w-full' : ''}`}>
                  <settingsItem.icon
                    size={18}
                    className={`${isCollapsed ? 'mx-auto' : 'mr-3'} transition-all duration-200 ${
                      activeItem === settingsItem.id ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                    }`}
                  />
                </div>
                
                {/* Only show text when not collapsed */}
                {!isCollapsed && (
                  <span className="text-sm font-medium">
                    {settingsItem.label}
                  </span>
                )}
                
                {activeItem === settingsItem.id && !isCollapsed && (
                  <span className="ml-auto w-1 h-5 rounded-full bg-amber-500 dark:bg-amber-400 opacity-80"></span>
                )}
              </Link>
            </div>

            {/* Theme Toggle */}
            <div className="px-3 mb-4">
              <button
                onClick={toggleTheme}
                className={`w-full flex ${isCollapsed ? 'justify-center' : 'items-center justify-between'} px-3 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                title={darkMode ? "Light Mode" : "Dark Mode"}
              >
                {!isCollapsed && <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
                
                {darkMode ? (
                  <Sun size={18} className="text-amber-500" />
                ) : (
                  <Moon size={18} className="text-amber-500" />
                )}
              </button>
            </div>

            {/* Version Info */}
            {!isCollapsed && (
              <div className="px-4 py-3 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800">
                <p>Quriousity v1.0.0</p>
                <p className="mt-1">© 2025 Quriousity Learning</p>
              </div>
            )}

            {/* Mini Version Info for collapsed state */}
            {isCollapsed && (
              <div className="px-4 py-3 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800">
                <p>v1.0</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar;