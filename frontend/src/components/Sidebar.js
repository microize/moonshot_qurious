// Refined Sidebar.js with elegant design system
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ClipboardCheck, BarChart2, Users, Settings, Moon, Sun, X, Menu, BarChart, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SidebarContext } from '../App';
import Logo from './Logo';

const Sidebar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();
  
  // Use the sidebar context instead of local state
  const { isCollapsed, toggleSidebar } = useContext(SidebarContext);
  
  // Admin mode state with toggle function
  const [isAdmin, setIsAdmin] = useState(false);
  const toggleAdminMode = () => setIsAdmin(!isAdmin);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveItem('home');
    else setActiveItem(path.split('/')[1] || 'home');
  }, [location]);

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
    { id: 'hranalytics', icon: BarChart, label: 'HR Analytics', path: '/hranalytics' },
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
                      activeItem === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}
                  />
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-medium transition-all duration-200">
                    {item.label}
                  </span>
                )}
                {activeItem === item.id && !isCollapsed && (
                  <span className="ml-auto w-1 h-5 rounded-full bg-indigo-500 dark:bg-indigo-400 opacity-80"></span>
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
                      activeItem === settingsItem.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
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
                  <span className="ml-auto w-1 h-5 rounded-full bg-indigo-500 dark:bg-indigo-400 opacity-80"></span>
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
                  <Moon size={18} className="text-indigo-500" />
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