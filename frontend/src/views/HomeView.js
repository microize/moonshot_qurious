import React, { useState } from 'react';
import { Clock, BarChart2, BookOpen, ChevronUp, ChevronDown, Bell, Moon } from 'lucide-react';
import UserHeader from '../components/UserHeader';
import CourseProgress from '../components/CourseProgress';
import DailyGoal from '../components/DailyGoal';
import LearningAnalytics from '../components/LearningAnalytics';
// Import enhanced course recommendations
import EnhancedCourseRecommendations from '../components/EnhancedCourseRecommendations';

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

// Time-based Session Component
const TimeBasedSessionCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get current hour to determine appropriate session
  const getCurrentTimeSession = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 9) {
      return {
        icon: <svg className="w-5 h-5 text-orange-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>,
        title: "Morning Productivity Session",
        description: "Jumpstart your day with a focused 20-minute learning session",
        badge: "Morning energy boost",
        gradient: "from-orange-500 to-yellow-600"
      };
    } else if (hour >= 9 && hour < 12) {
      return {
        icon: <svg className="w-5 h-5 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <path d="M6 1v3M10 1v3M14 1v3" />
              </svg>,
        title: "Mid-Morning Focus Session",
        description: "Take advantage of your peak concentration hours",
        badge: "Peak productivity time",
        gradient: "from-blue-600 to-cyan-600"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        icon: <svg className="w-5 h-5 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
              </svg>,
        title: "Afternoon Refresher",
        description: "Beat the afternoon slump with a 15-minute learning burst",
        badge: "Afternoon recharge",
        gradient: "from-green-600 to-teal-600"
      };
    } else {
      return {
        icon: <Moon size={20} className="text-purple-300" />,
        title: "Evening Deep Dive Session",
        description: "Perfect for evening focus: 25-minute quiet study",
        badge: "Recommended for evenings",
        gradient: "from-indigo-900 to-purple-900"
      };
    }
  };
  
  const session = getCurrentTimeSession();
  
  return (
    <div 
      className={`p-4 bg-gradient-to-r ${session.gradient} text-white rounded-lg transition-all duration-300 ${
        isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <div className="mr-3">
          {session.icon}
        </div>
        <div>
          <h3 className="font-medium text-lg">{session.title}</h3>
          <p className="text-white text-opacity-80 text-sm">{session.description}</p>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div>
          <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
            {session.badge}
          </span>
        </div>
        <button className="px-3 py-1.5 bg-white hover:bg-opacity-90 text-gray-900 rounded-md text-sm font-medium transition-colors">
          Start Session
        </button>
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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
            {getGreeting()}, Sripathi
            {/* Waving hand emoji */}
            <span className="ml-2 animate-bounce-subtle">👋</span>
          </h1>
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
        {/* Left column - Continue Learning Section Only */}
        <div className="lg:col-span-2">
          {/* Continue Learning section */}
          <Section title="Continue Learning" icon={BookOpen}>
            <CourseProgress />
          </Section>
          
          {/* Enhanced Course Recommendations Section */}
          <Section title="Recommended For You" icon={BookOpen}>
            <EnhancedCourseRecommendations />
          </Section>
        </div>
        
        {/* Right column - Time-based Session at top */}
        <div>
          {/* Time-based Session Card */}
          <div className="mb-6">
            <TimeBasedSessionCard />
          </div>
          
          {/* Today's Learning Goals section */}
          <Section title="Today's Learning Goals" icon={Clock}>
            <DailyGoal />
          </Section>
          
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