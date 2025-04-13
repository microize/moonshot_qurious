// components/LearningReminders.js
import React, { useState } from 'react';
import { Bell, Clock, Calendar, Check, Edit2 } from 'lucide-react';

const LearningReminders = () => {
  const [showReminderForm, setShowReminderForm] = useState(false);
  
  // Sample reminder data
  const reminders = [
    {
      id: 1,
      title: "Complete Python Quiz",
      time: "Today at 7:00 PM",
      course: "Introduction to Coding with Python",
      isActive: true
    },
    {
      id: 2,
      title: "Review ML Flashcards",
      time: "Tomorrow at 8:00 AM",
      course: "Understanding Machine Learning Algorithms",
      isActive: true
    },
    {
      id: 3,
      title: "Join Live Session: 'Neural Networks Explained'",
      time: "Apr 11 at 6:00 PM",
      course: "Deep Learning Specialization",
      isActive: false
    }
  ];
  
  // Learning schedule
  const schedule = [
    { day: "Weekdays", time: "7:00 PM - 8:00 PM", focus: "Core Learning" },
    { day: "Weekend", time: "10:00 AM - 11:30 AM", focus: "Practice & Projects" }
  ];
  
  // Learning preferences 
  const preferences = {
    reminderTime: "30 minutes before",
    reminderMethod: "Push notification",
    focusMode: "Do not disturb during learning sessions",
    streakProtection: "Enabled (notifies you before you break a streak)"
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-amber-100 dark:border-amber-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bell size={18} className="text-amber-500 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">Learning Reminders</h3>
        </div>
        
        <button 
          onClick={() => setShowReminderForm(!showReminderForm)}
          className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-800 text-amber-600 dark:text-amber-300 rounded-md hover:bg-amber-200 dark:hover:bg-amber-700 transition-colors"
        >
          {showReminderForm ? "Cancel" : "Add Reminder"}
        </button>
      </div>
      
      {/* Add reminder form */}
      {showReminderForm && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
          <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Create Reminder</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Title</label>
              <input 
                type="text" 
                placeholder="What do you want to be reminded about?"
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Time</label>
                <input 
                  type="time" 
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">Course (Optional)</label>
              <select className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400">
                <option>Select a course</option>
                <option>Understanding Machine Learning Algorithms</option>
                <option>Introduction to coding with Python</option>
              </select>
            </div>
            
            <div className="flex justify-end pt-2">
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm rounded-md transition-colors">
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Upcoming reminders */}
      <div className="space-y-3">
        {reminders.map(reminder => (
          <div key={reminder.id} className={`flex items-center p-3 rounded-md ${
            reminder.isActive ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600' : 'bg-gray-50 dark:bg-gray-700/50'
          }`}>
            <div className={`p-2 rounded-full mr-3 ${
              reminder.isActive 
                ? 'bg-amber-100 dark:bg-amber-800 text-amber-500 dark:text-amber-300' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
            }`}>
              <Clock size={16} />
            </div>
            
            <div className="flex-1">
              <div className={`font-medium text-sm ${
                reminder.isActive ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {reminder.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{reminder.time}</div>
              <div className="text-xs text-amber-500 dark:text-amber-400 mt-0.5">{reminder.course}</div>
            </div>
            
            <div className="flex space-x-1">
              <button className="p-1.5 text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-400 transition-colors">
                <Edit2 size={14} />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors">
                <Check size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Learning schedule */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
          <Calendar size={16} className="text-amber-500 mr-2" />
          <h4 className="text-sm font-medium text-gray-800 dark:text-white">Your Learning Schedule</h4>
        </div>
        
        <div className="space-y-2">
          {schedule.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
              <div>
                <div className="font-medium text-sm text-gray-800 dark:text-white">{item.day}</div>
                <div className="text-xs text-amber-500 dark:text-amber-400">{item.focus}</div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-md">
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Learning preferences */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-800 dark:text-white">Your Preferences</h4>
          <button className="text-xs text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300">
            Edit
          </button>
        </div>
        
        <div className="space-y-2">
          {Object.entries(preferences).map(([key, value], index) => (
            <div key={index} className="flex justify-between text-sm">
              <div className="text-gray-600 dark:text-gray-300">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              <div className="text-gray-800 dark:text-white font-medium">{value}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Streak protection reminder */}
      <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md text-sm flex items-start">
        <Bell size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <span className="text-yellow-600 dark:text-yellow-400 font-medium">Streak Protection:</span>
          <span className="text-gray-700 dark:text-gray-300"> Complete at least one lesson today to maintain your 8-day streak!</span>
        </div>
      </div>
    </div>
  );
};

export default LearningReminders;