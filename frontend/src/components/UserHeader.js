// components/UserHeader.js
import React, { useState } from 'react';
import { Award, ChevronDown, Bell, BarChart2, Zap, Star, Settings } from 'lucide-react';

const UserHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
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
  
  // Achievement badges
  const badges = [
    { name: "Fast Learner", icon: Zap, earned: true },
    { name: "Streak Master", icon: BarChart2, earned: true },
    { name: "Python Pro", icon: Award, earned: false }
  ];
  
  // Progress levels
  const level = {
    current: 3,
    title: "Python Explorer",
    points: 440,
    nextLevel: 500,
    progress: 88 // percentage to next level
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
    <div className="flex flex-col items-end relative">
      <div className="flex items-center">
        {/* Notification bell */}
        <div className="relative mr-4">
          <button 
            onClick={toggleNotifications}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-full transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Notification panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-medium text-gray-800 dark:text-white">Notifications</h3>
                <button className="text-xs text-purple-500 dark:text-purple-400">Mark all as read</button>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-3 border-b border-gray-200 dark:border-gray-700 ${
                      !notification.read ? 'bg-purple-50 dark:bg-purple-900/10' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-md mr-3 ${
                        notification.type === 'achievement' 
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400' 
                          : notification.type === 'streak'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400'
                      }`}>
                        {notification.type === 'achievement' && <Award size={16} />}
                        {notification.type === 'streak' && <Zap size={16} />}
                        {notification.type === 'reminder' && <Bell size={16} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm text-gray-800 dark:text-white">{notification.title}</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-2 text-center">
                <button className="text-xs text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User info */}
        <div className="relative">
          <div 
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="mr-3 text-right">
              <div className="text-sm font-medium text-gray-800 dark:text-white">Sripathi</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Data Engineer</div>
              <div className="flex items-center justify-end text-xs text-purple-500 mt-0.5">
                <Star size={12} className="mr-1" />
                <span>{level.points} Points</span>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/api/placeholder/50/50" 
                alt="User Avatar" 
                className="h-12 w-12 rounded-full object-cover border-2 border-purple-200 dark:border-purple-700"
              />
              {/* Level badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white font-bold border-2 border-white dark:border-gray-800">
                {level.current}
              </div>
            </div>
            <ChevronDown size={16} className="ml-1 text-gray-500 dark:text-gray-400" />
          </div>
          
          {/* User dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              {/* Progress to next level */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600 dark:text-gray-300">Level {level.current}: {level.title}</span>
                  <span className="text-xs font-medium text-purple-500">{level.points}/{level.nextLevel}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${level.progress}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {level.nextLevel - level.points} points to next level
                </div>
              </div>
              
              {/* Recent badges */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h4 className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">Your Badges</h4>
                <div className="flex space-x-1">
                  {badges.map((badge, index) => (
                    <div 
                      key={index} 
                      className={`p-1.5 rounded-md ${
                        badge.earned 
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 dark:text-yellow-400' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }`}
                      title={badge.name}
                    >
                      <badge.icon size={16} />
                    </div>
                  ))}
                  <div className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400">
                    <span className="text-xs font-medium">+4</span>
                  </div>
                </div>
              </div>
              
              {/* Streak info */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Current Streak</div>
                    <div className="font-medium text-sm text-purple-500">8 days</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Longest Streak</div>
                    <div className="font-medium text-sm text-gray-800 dark:text-white">23 days</div>
                  </div>
                </div>
              </div>
              
              {/* Menu items */}
              <div className="p-1">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md flex items-center">
                  <Settings size={16} className="mr-2" />
                  Account Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md flex items-center">
                  <Award size={16} className="mr-2" />
                  Achievements
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md flex items-center">
                  <BarChart2 size={16} className="mr-2" />
                  Learning Statistics
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md mt-1">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;