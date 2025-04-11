// components/Sidebar.js - Updated to use SidebarContext
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, ClipboardCheck, BarChart2, Users, Settings, Moon, Sun, X, Menu, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SidebarContext } from '../App'; // Import the context
import Logo from './Logo';

const Sidebar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();
  
  // Use the sidebar context instead of local state
  const { isCollapsed, toggleSidebar } = useContext(SidebarContext);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveItem('home');
    else setActiveItem(path.split('/')[1] || 'home');
  }, [location]);

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
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2.5 rounded-xl bg-white dark:bg-gray-800 text-cobalt-600 dark:text-cobalt-400 shadow-soft"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 ${isCollapsed ? 'w-16' : 'w-64'}
        bg-gray-50 dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out
        lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`px-4 py-6 flex items-center ${isCollapsed ? 'justify-center' : 'lg:justify-between'}`}>
            <Logo onLogoClick={toggleSidebar} isCollapsed={isCollapsed} />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 mt-2 space-y-1 overflow-y-auto overflow-x-hidden">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => handleNavItemClick(item.id)}
                className={`flex ${isCollapsed ? 'justify-center' : 'items-center'} px-3 py-2.5 rounded-md transition-all duration-300 group ${
                  activeItem === item.id
                    ? 'bg-cobalt-50 dark:bg-cobalt-900 text-cobalt-700 dark:text-cobalt-300 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className={`${isCollapsed ? 'flex justify-center w-full' : ''}`}>
                  <item.icon
                    size={18}
                    className={`${isCollapsed ? 'mx-auto' : 'mr-2'} transition-transform duration-300 ${
                      activeItem === item.id ? 'text-cobalt-600 dark:text-cobalt-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-cobalt-600 dark:group-hover:text-cobalt-400'
                    }`}
                  />
                </div>
                <span className={`text-sm font-medium transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                  {item.label}
                </span>
                {activeItem === item.id && !isCollapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cobalt-500 dark:bg-cobalt-400"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Profile */}
          {!isCollapsed && (
            <div className="px-4 mt-4 mb-2 border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  />
                  <div className="ml-2 flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">Sripathi</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Data Engineer</p>
                  </div>
                  <div className="relative">
                    <Bell size={16} className="text-gray-500 dark:text-gray-400 hover:text-cobalt-600 dark:hover:text-cobalt-400 cursor-pointer" />
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cobalt-500"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Theme Toggle */}
          {!isCollapsed && (
            <div className="px-4 mb-4">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <div className="flex items-center">
                  {darkMode ? (
                    <Sun size={16} className="text-amber-500 mr-2" />
                  ) : (
                    <Moon size={16} className="text-cobalt-500 mr-2" />
                  )}
                  <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
                <div className="relative">
                  <div className={`w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full transition-all transform ${darkMode ? 'translate-x-4 bg-cobalt-400' : 'bg-cobalt-500'}`}></div>
                </div>
              </button>
            </div>
          )}

          {/* Collapsed Theme Toggle */}
          {isCollapsed && (
            <div className="px-2 mb-4 flex justify-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <Sun size={20} className="text-amber-500" />
                ) : (
                  <Moon size={20} className="text-cobalt-500" />
                )}
              </button>
            </div>
          )}

          {/* Version Info */}
          {!isCollapsed && (
            <div className="px-4 py-3 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800">
              <p>Quriousity v1.0.0</p>
              <p className="mt-1">© 2025 Quriousity Learning</p>
            </div>
          )}

          {/* Mini Version Info for collapsed state */}
          {isCollapsed && (
            <div className="px-4 py-3 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800">
              <p>v1.0</p>
            </div>
          )}
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