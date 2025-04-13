// src/components/Sidebar/Sidebar.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ClipboardCheck, BarChart2, Users, Settings, Moon, Sun, X, Menu, Shield } from 'lucide-react';
import { SidebarContext } from '../../App';
// Import the animated Logo component
import Logo from '../Logo/Logo';

// Simple utility function to combine class names
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Sidebar = () => {
  // Get sidebar state from context
  const { isCollapsed, toggleSidebar } = useContext(SidebarContext);
  
  // Local state for dark mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  // We no longer need the shortcuts tooltip state
  // const [showShortcutsTooltip, setShowShortcutsTooltip] = useState(false);
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

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle shortcuts if Alt key is pressed
      if (e.altKey) {
        switch (e.key) {
          case 'h': // Home
            navigateTo('home', '/');
            break;
          case 'c': // Courses
            navigateTo('courses', '/courses');
            break;
          case 'a': // Assessments
            navigateTo('assessments', '/assessments');
            break;
          case 'l': // Leaderboard
            navigateTo('leaderboard', '/leaderboard');
            break;
          case 'm': // Community
            navigateTo('community', '/community');
            break;
          case 's': // Settings
            navigateTo('settings', '/settings');
            break;
          case 'd': // Toggle dark mode
            toggleTheme();
            break;
          case 'x': // Toggle admin mode
            toggleAdminMode();
            break;
          // Removed keyboard shortcut tooltip toggle
          // case 'k': 
          //   setShowShortcutsTooltip(!showShortcutsTooltip);
          //   break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem]);

  const navigateTo = (id, path) => {
    setActiveItem(id);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    window.location.href = path;
  };

  // Base navigation items with keyboard shortcuts
  const baseNavItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/', shortcut: 'Alt+H' },
    { id: 'courses', icon: BookOpen, label: 'Courses', path: '/courses', shortcut: 'Alt+C' },
    { id: 'assessments', icon: ClipboardCheck, label: 'Assessments', path: '/assessments', shortcut: 'Alt+A' },
    { id: 'leaderboard', icon: BarChart2, label: 'Leaderboard', path: '/leaderboard', shortcut: 'Alt+L' },
    { id: 'community', icon: Users, label: 'Community', path: '/community', shortcut: 'Alt+M' },
  ];
  
  // Admin-only navigation items
  const adminNavItems = [
    { id: 'hranalytics', icon: BarChart2, label: 'HR Analytics', path: '/hranalytics', shortcut: 'Alt+R' },
  ];
  
  // Settings item (moved to bottom)
  const settingsItem = { id: 'settings', icon: Settings, label: 'Settings', path: '/settings', shortcut: 'Alt+S' };
  
  // Combine navigation items based on admin status
  const navItems = isAdmin 
    ? [...baseNavItems, ...adminNavItems] 
    : baseNavItems;

  const handleNavItemClick = (itemId) => {
    setActiveItem(itemId);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // No longer needed
  // const toggleShortcutsTooltip = () => {
  //   setShowShortcutsTooltip(!showShortcutsTooltip);
  // };

  return (
    <>
      {/* Mobile Menu Button with Improved Accessibility */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl ring-1 ring-gray-100 dark:ring-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="sidebar-menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar with proper ARIA roles */}
      <div
        id="sidebar-menu"
        role="navigation"
        aria-label="Main Navigation"
        className={`h-full bg-white dark:bg-gray-900 shadow-xl transition-all duration-300 ease-in-out backdrop-blur-lg
        lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`px-4 py-4 flex items-center ${isCollapsed ? 'justify-center' : 'lg:justify-between'}`}>
            <Logo onLogoClick={toggleSidebar} isCollapsed={isCollapsed} />
          </div>

          {/* Removed keyboard shortcuts tooltip panel */}

          {/* Added spacing with dashed line between logo and menu */}
          <div className="px-3 py-2">
            <div className="border-t border-dashed border-gray-300 dark:border-gray-700 w-full"></div>
          </div>

          {/* Main Navigation - Flexbox with flex-1 to push admin section to bottom*/}
          <nav className="flex-1 px-3 mt-2 space-y-1.5 overflow-y-auto overflow-x-hidden">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => handleNavItemClick(item.id)}
                className={`flex ${isCollapsed ? 'justify-center' : 'items-center'} px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  activeItem === item.id
                    ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium shadow-md dark:shadow-lg dark:shadow-gray-800/50'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
                }`}
                aria-current={activeItem === item.id ? 'page' : undefined}
                role="menuitem"
                aria-label={`${item.label} ${item.shortcut ? `(Shortcut: ${item.shortcut})` : ''}`}
              >
                <div className={`${isCollapsed ? 'flex justify-center w-full' : ''}`}>
                  <item.icon
                    size={18}
                    className={`${isCollapsed ? 'mx-auto' : 'mr-3'} transition-all duration-300 ${
                      activeItem === item.id ? 'text-amber-600 dark:text-amber-400 drop-shadow-md' : 'text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-medium transition-all duration-200 flex-1">
                    {item.label}
                  </span>
                )}
                {!isCollapsed && item.shortcut && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 px-1.5 py-0.5 bg-gray-50 dark:bg-gray-800 rounded">
                    {item.shortcut}
                  </span>
                )}
                {/* Remove orange indicator bar */}
              </Link>
            ))}
          </nav>

          {/* Bottom Section without any borders or dividers */}
          <div className="px-3 pt-3">
            {/* Admin Mode Toggle */}
            <div className="mb-1.5">
              <button
                onClick={toggleAdminMode}
                className={`w-full flex ${isCollapsed ? 'justify-center' : 'items-center'} px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isAdmin
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 shadow-md dark:shadow-lg shadow-amber-500/10 dark:shadow-amber-400/10'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
                }`}
                aria-label="Toggle admin mode"
                aria-pressed={isAdmin}
                title="Admin Mode (Alt+X)"
              >
                <Shield
                  size={18}
                  className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                    isAdmin ? 'text-amber-600 dark:text-amber-400 drop-shadow-md' : 'text-gray-500 dark:text-gray-500'
                  }`}
                  aria-hidden="true"
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
            <div className="mb-1.5">
              <Link
                to={settingsItem.path}
                onClick={() => handleNavItemClick(settingsItem.id)}
                className={`flex ${isCollapsed ? 'justify-center' : 'items-center'} px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  activeItem === settingsItem.id
                    ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-medium shadow-md dark:shadow-lg dark:shadow-gray-800/50'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
                }`}
                aria-current={activeItem === settingsItem.id ? 'page' : undefined}
                role="menuitem"
                aria-label={`${settingsItem.label} (${settingsItem.shortcut})`}
              >
                <div className={`${isCollapsed ? 'flex justify-center w-full' : ''}`}>
                  <settingsItem.icon
                    size={18}
                    className={`${isCollapsed ? 'mx-auto' : 'mr-3'} transition-all duration-200 ${
                      activeItem === settingsItem.id ? 'text-amber-600 dark:text-amber-400 drop-shadow-md' : 'text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                
                {/* Only show text when not collapsed */}
                {!isCollapsed && (
                  <span className="text-sm font-medium">
                    {settingsItem.label}
                  </span>
                )}
                
                {/* Remove orange indicator bar */}
              </Link>
            </div>

            {/* Theme Toggle - Fixed to correctly align icon and text */}
            <div className="mb-2.5">
              <button
                onClick={toggleTheme}
                className={`w-full flex ${isCollapsed ? 'justify-center' : 'items-center'} px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:shadow-md`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={darkMode}
                title={`${darkMode ? "Light Mode" : "Dark Mode"} (Alt+D)`}
              >
                <div className={`${isCollapsed ? 'flex justify-center w-full' : 'mr-3'}`}>
                  {darkMode ? (
                    <Sun size={18} className="text-amber-500 drop-shadow-md" aria-hidden="true" />
                  ) : (
                    <Moon size={18} className="text-amber-500 drop-shadow-md" aria-hidden="true" />
                  )}
                </div>
                
                {!isCollapsed && (
                  <span className="text-sm font-medium">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                )}
              </button>
            </div>

            {!isCollapsed && (
              <div className="px-3 py-2">
              <div className="border-t border-dashed border-gray-300 dark:border-gray-700 w-full"></div>
            </div>
            )}
          
            {/* Version Info - No border */}
            {!isCollapsed && (
              <div className="px-4 py-2 text-left text-xs text-gray-400 dark:text-gray-500">
                <p className="mt-1">© 2025 Qurious.ai</p>
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
          role="presentation"
          aria-hidden="true"
        ></div>
      )}

      {/* Skip navigation link for accessibility (visually hidden but available to screen readers) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 p-3 z-50 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg shadow-lg"
      >
        Skip to main content
      </a>
    </>
  );
};

export default Sidebar;