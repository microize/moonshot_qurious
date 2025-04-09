// views/HomeView.js
import React, { useState } from 'react';
import { Clock, BarChart2, BookOpen, ChevronUp, ChevronDown, Bell } from 'lucide-react';
import UserHeader from '../components/UserHeader';
import CourseProgress from '../components/CourseProgress';
import DailyGoal from '../components/DailyGoal';  // Fixed import name
import LearningAnalytics from '../components/LearningAnalytics';

// Section component with microstimuli for collapsible sections
const Section = ({ title, icon: Icon, children, defaultCollapsed = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isHeaderPressed, setIsHeaderPressed] = useState(false);
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-100 dark:border-gray-700">
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
          isHovered ? 'bg-gray-50 dark:bg-gray-750' : ''
        } ${isHeaderPressed ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
        onClick={toggleCollapse}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsHeaderPressed(false);
        }}
        onMouseDown={() => setIsHeaderPressed(true)}
        onMouseUp={() => setIsHeaderPressed(false)}
      >
        <div className="flex items-center">
          {Icon && (
            <Icon 
              size={18} 
              className={`mr-2 transition-all duration-300 ${
                isHovered ? 'text-purple-600 dark:text-purple-400 scale-110' : 'text-purple-500'
              }`}
            />
          )}
          <h2 className={`font-medium transition-all duration-200 ${
            isHovered ? 'text-purple-700 dark:text-purple-300' : 'text-gray-800 dark:text-white'
          }`}>
            {title}
          </h2>
        </div>
        <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          {isCollapsed ? 
            <ChevronDown size={18} className="text-gray-500 dark:text-gray-400" /> : 
            <ChevronUp size={18} className="text-gray-500 dark:text-gray-400" />
          }
        </div>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
      }`}>
        <div className="p-4 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const HomeView = () => {
  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  // Motivational message
  const getMotivationalMessage = () => {
    return "You're making great progress! Keep up the momentum.";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header with user info */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{getGreeting()}, Sripathi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last active: 2 hours ago</p>
          <p className="mt-2 text-purple-600 dark:text-purple-400 text-sm">{getMotivationalMessage()}</p>
        </div>
        <UserHeader />
      </div>
      
      {/* Notification banner with microstimuli */}
      <div className="mb-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800 flex items-center justify-between group hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-300 cursor-pointer">
        <div className="flex items-center">
          <Bell size={18} className="text-purple-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">New in Data Science:</span> Live workshop on "Advanced ML Techniques" tomorrow at 7 PM
          </span>
        </div>
        <button className="text-xs bg-purple-500 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm hover:shadow">
          RSVP
        </button>
      </div>
      
      {/* Main dashboard layout with grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning section */}
          <Section title="Continue Learning" icon={BookOpen}>
            <CourseProgress />
          </Section>
          
          {/* Daily goals section */}
          <Section title="Today's Learning Goals" icon={Clock}>
            <DailyGoal />
          </Section>
        </div>
        
        {/* Right column */}
        <div>
          {/* Learning Analytics */}
          <Section title="Your Learning Insights" icon={BarChart2}>
            <LearningAnalytics />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default HomeView;