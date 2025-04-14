import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Star, Award, BarChart2, Settings, LogOut, User, Calendar, CheckCircle } from 'lucide-react';

const UserHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Achievement Unlocked",
      message: "You've earned the 'Early Bird' badge for studying before 9 AM!",
      time: "2 hours ago",
      read: false,
      type: "achievement"
    },
    {
      id: 2,
      title: "Study Reminder",
      message: "Don't forget to review your ML flashcards today",
      time: "5 hours ago",
      read: true,
      type: "reminder"
    },
    {
      id: 3,
      title: "Streak Alert",
      message: "Keep going! You're on a 8-day learning streak",
      time: "Yesterday",
      read: true,
      type: "streak"
    }
  ];
  
  // Progress levels
  const level = {
    current: 3,
    title: "Python Explorer",
    points: 440,
    nextLevel: 500,
    progress: 88 // percentage to next level
  };
  
  // Mark all notifications as read
  const markAllAsRead = (e) => {
    e.stopPropagation();
    setUnreadCount(0);
  };
  
  // Toggle notification panel
  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    if (showDropdown) setShowDropdown(false);
  };
  
  // Toggle user dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (showNotifications) setShowNotifications(false);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Notification bell */}
      <div className="relative" ref={notificationRef}>
        <button 
          onClick={toggleNotifications}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-50 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 text-white text-xs flex items-center justify-center font-medium">
                {unreadCount}
              </span>
            </span>
          )}
        </button>
        
        {/* Notification panel */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-slide-in">
            <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-gray-800 dark:text-white">Notifications</h3>
              <button 
                className="text-xs text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-3 border-b border-gray-100 dark:border-gray-700 ${
                    !notification.read ? 'bg-amber-50 dark:bg-amber-900/10' : ''
                  } hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${
                      notification.type === 'achievement' 
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400' 
                        : notification.type === 'streak'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400'
                    }`}>
                      {notification.type === 'achievement' && <Award size={16} />}
                      {notification.type === 'streak' && <Calendar size={16} />}
                      {notification.type === 'reminder' && <Bell size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm text-gray-800 dark:text-white">
                          {notification.title}
                          {!notification.read && <span className="ml-2 inline-block w-2 h-2 bg-amber-500 rounded-full"></span>}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{notification.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-2 text-center border-t border-gray-100 dark:border-gray-700">
              <button className="text-xs text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 font-medium p-2">
                View all notifications
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* User profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div 
          className="flex items-center bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-xl cursor-pointer group transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={toggleDropdown}
        >
          <div className="mr-3 text-right hidden md:block">
            <div className="text-sm font-medium text-gray-800 dark:text-white">Sripathi</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Data Engineer</div>
          </div>
          
          <div className="relative flex items-center">
            <img 
              src="\assets\images\avatar-placeholder.png" 
              alt="User Avatar" 
              className="h-10 w-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 group-hover:border-amber-300 dark:group-hover:border-amber-700 transition-colors"
            />
            
            {/* Level badge */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-xs text-white font-bold border-2 border-white dark:border-gray-800">
              {level.current}
            </div>
            
            <ChevronDown 
              size={16} 
              className={`ml-1 text-gray-400 dark:text-gray-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-transform duration-200 ${
                showDropdown ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
        
        {/* User dropdown menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-slide-in">
            {/* User info section */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800">
              <div className="flex items-center mb-3">
                <img 
                  src="\assets\images\avatar-placeholder.png" 
                  alt="User Avatar" 
                  className="h-14 w-14 rounded-full object-cover border-2 border-amber-200 dark:border-amber-800 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">Sripathi</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Data Engineer</div>
                  <div className="flex items-center mt-1">
                    <div className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                      Level {level.current}
                    </div>
                    <div className="text-xs text-amber-600 dark:text-amber-400 ml-2">
                      {level.points}/{level.nextLevel} XP
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    style={{ width: `${level.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {level.nextLevel - level.points} XP to level {level.current + 1}
                </div>
              </div>
            </div>
            
            {/* Menu items */}
            <div className="py-1">
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center">
                <User size={16} className="mr-3 text-amber-500" />
                Profile
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center">
                <Award size={16} className="mr-3 text-amber-500" />
                Achievements
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center">
                <BarChart2 size={16} className="mr-3 text-amber-500" />
                Learning Statistics
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center">
                <Settings size={16} className="mr-3 text-amber-500" />
                Settings
              </button>
              <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
              <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center">
                <LogOut size={16} className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHeader;