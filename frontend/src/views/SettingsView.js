// Updated SettingsView.js with consistent styling
import React, { useState } from 'react';
import { Settings, User, Bell, Lock, Moon, Sun, Globe, BarChart2 } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import Card from '../components/ui/Card';

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // User profile data
  const userProfile = {
    name: "Sripathi",
    email: "sripathi@example.com",
    role: "Data Engineer",
    avatar: "/api/placeholder/80/80"
  };
  
  // Toggle states for settings
  const [settings, setSettings] = useState({
    darkMode: true,
    emailNotifications: true,
    pushNotifications: true,
    learningReminders: true,
    streakAlerts: true,
    showProgressToFriends: true,
    shareBadges: true,
    showInLeaderboard: true,
    language: "English",
    timezone: "Asia/Kolkata"
  });
  
  // Handle toggle change
  const handleToggleChange = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };
  
  // Tabs for settings sections
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];
  
  return (
    <PageContainer title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with tabs */}
        <Card className="h-fit">
          <div className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon size={18} className="mr-3" />
                {tab.label}
              </button>
            ))}
          </div>
        </Card>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          <Card>
            {/* Profile settings */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-6">Profile Settings</h2>
                
                <div className="flex flex-col md:flex-row md:items-center mb-8">
                  <div className="mr-6 mb-4 md:mb-0">
                    <div className="relative">
                      <img 
                        src={userProfile.avatar} 
                        alt="Profile picture" 
                        className="w-24 h-24 rounded-full object-cover border-2 border-purple-200 dark:border-purple-800"
                      />
                      <button className="absolute bottom-0 right-0 p-1 bg-purple-500 text-white rounded-full shadow-sm">
                        <User size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          value={userProfile.name}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input 
                          type="email" 
                          value={userProfile.email}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Role/Profession
                        </label>
                        <input 
                          type="text" 
                          value={userProfile.role}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Learning Focus
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent">
                          <option>Data Science</option>
                          <option>Machine Learning</option>
                          <option>Data Engineering</option>
                          <option>Python Programming</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us about yourself and your learning goals..."
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-800 dark:text-white mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'SQL', 'Machine Learning', 'Data Visualization'].map((skill, index) => (
                      <div key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm flex items-center">
                        {skill}
                        <button className="ml-1 p-0.5 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button className="px-3 py-1 border border-dashed border-purple-300 dark:border-purple-700 text-purple-500 dark:text-purple-400 rounded-full text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20">
                      + Add Skill
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {/* Notification settings */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-6">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Email Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates and summaries via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settings.emailNotifications}
                          onChange={() => handleToggleChange('emailNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Push Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive real-time updates in your browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settings.pushNotifications}
                          onChange={() => handleToggleChange('pushNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Learning Reminders</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get reminded of your scheduled learning sessions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settings.learningReminders}
                          onChange={() => handleToggleChange('learningReminders')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Streak Alerts</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when you're about to break a streak</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settings.streakAlerts}
                          onChange={() => handleToggleChange('streakAlerts')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-800 dark:text-white mb-3">Notification Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Preferred Time
                      </label>
                      <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent">
                        <option>Morning (8:00 AM - 10:00 AM)</option>
                        <option>Afternoon (12:00 PM - 2:00 PM)</option>
                        <option>Evening (6:00 PM - 8:00 PM)</option>
                        <option>Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Reminder Frequency
                      </label>
                      <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent">
                        <option>Daily</option>
                        <option>Weekdays only</option>
                        <option>Weekly</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors">
                    Save Notification Settings
                  </button>
                </div>
              </div>
            )}
            
            {/* Privacy settings */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-6">Privacy Settings</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Show Learning Progress to Friends</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Allow friends to see your course progress</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settings.showProgressToFriends}
                          onChange={() => handleToggleChange('showProgressToFriends')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Share Badge Achievements</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Automatically share new badges with your network</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settings.shareBadges}
                          onChange={() => handleToggleChange('shareBadges')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Appear in Leaderboards</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Allow your profile to appear in community leaderboards</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={settings.showInLeaderboard}
                          onChange={() => handleToggleChange('showInLeaderboard')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                  <h3 className="font-medium text-gray-800 dark:text-white flex items-center">
                    <Lock size={16} className="text-yellow-500 mr-2" />
                    Data & Privacy
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    You can request a copy of your data or delete your account and all associated data.
                  </p>
                  <div className="mt-3 flex space-x-3">
                    <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      Export Data
                    </button>
                    <button className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors">
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            )}
            
            {/* Preferences settings */}
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-6">Preferences</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">Dark Mode</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark themes</p>
                      </div>
                      <div className="flex items-center">
                        <Sun size={16} className="text-gray-400 dark:text-gray-500 mr-2" />
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={settings.darkMode}
                            onChange={() => handleToggleChange('darkMode')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                        </label>
                        <Moon size={16} className="text-gray-400 dark:text-gray-500 ml-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-800 dark:text-white mb-3">Language & Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Language
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe size={16} className="text-gray-400 dark:text-gray-500" />
                          </div>
                          <select className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Japanese</option>
                            <option>Chinese (Simplified)</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Timezone
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent">
                          <option>Asia/Kolkata (GMT +5:30)</option>
                          <option>America/New_York (GMT -4:00)</option>
                          <option>Europe/London (GMT +1:00)</option>
                          <option>Pacific/Auckland (GMT +12:00)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-800 dark:text-white mb-3">Learning Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Daily Learning Goal
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>45 minutes</option>
                          <option>1 hour</option>
                          <option>2 hours</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Content Difficulty
                        </label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent">
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                          <option>All Levels</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h3 className="font-medium text-gray-800 dark:text-white flex items-center">
                    <BarChart2 size={16} className="text-purple-500 mr-2" />
                    Learning Analytics
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    We use your learning data to provide personalized recommendations and insights. You can control how this data is used.
                  </p>
                  <div className="mt-3">
                    <label className="inline-flex items-center">
                      <input type="checkbox" checked className="rounded text-purple-500 focus:ring-purple-400" />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Collect learning analytics to improve your experience</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default SettingsView;