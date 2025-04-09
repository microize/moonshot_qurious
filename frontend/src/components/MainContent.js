// components/MainContent.js
import React, { useState } from 'react';
import UserHeader from './UserHeader';
import CourseProgress from './CourseProgress';
import CourseRecommendations from './CourseRecommendations';
import DailyGoals from './DailyGoals';
import LearningAnalytics from './LearningAnalytics';
import CommunityLeaderboard from './CommunityLeaderboard';
import LearningReminders from './LearningReminders';
import { Layout, ChevronUp, ChevronDown, BookOpen, Calendar, Users, BarChart2, Bell } from 'lucide-react';

// Section component for collapsible sections
const Section = ({ title, icon: Icon, children, isCollapsed, onToggle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          {Icon && <Icon size={18} className="text-purple-500 mr-2" />}
          <h2 className="font-medium text-gray-800 dark:text-white">{title}</h2>
        </div>
        <button className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
          {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

const MainContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsedSections, setCollapsedSections] = useState({});
  
  const toggleSection = (sectionId) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionId]: !collapsedSections[sectionId]
    });
  };
  
  // Tab options
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'progress', label: 'My Learning', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'goals', label: 'Goals & Reminders', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 }
  ];
  
  // Personalized greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  // Last active time 
  const getLastActiveTime = () => {
    return "Last active: 2 hours ago";
  };
  
  // Motivational message
  const getMotivationalMessage = () => {
    return "You're making great progress! Keep up the momentum to reach your learning goals.";
  };

  return (
    <div className="flex-1 p-1 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-purple-200 dark:border-purple-600 min-h-full p-6">
        {/* Header with tabs */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{getGreeting()}, Sripathi</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{getLastActiveTime()}</p>
            <p className="mt-2 text-purple-500 dark:text-purple-400">{getMotivationalMessage()}</p>
          </div>
          <UserHeader />
        </div>
        
        {/* Tab navigation */}
        <div className="flex overflow-x-auto pb-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mr-2 rounded-md transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon size={16} className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Notification banner */}
        <div className="mb-6 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <Bell size={16} className="text-purple-500 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">New in Data Science:</span> Live workshop on "Advanced ML Techniques" tomorrow at 7 PM
            </span>
          </div>
          <button className="text-xs bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded transition-colors">
            RSVP
          </button>
        </div>
        
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Main dashboard layout with grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Progress section */}
                <Section 
                  title="Continue Learning" 
                  icon={BookOpen}
                  isCollapsed={collapsedSections['progress']}
                  onToggle={() => toggleSection('progress')}
                >
                  <CourseProgress />
                </Section>
                
                {/* Daily goals section */}
                <Section 
                  title="Today's Learning Goals" 
                  icon={Calendar}
                  isCollapsed={collapsedSections['goals']}
                  onToggle={() => toggleSection('goals')}
                >
                  <DailyGoals />
                </Section>
                
                {/* Recommendations */}
                <Section 
                  title="Recommended For You" 
                  isCollapsed={collapsedSections['recommendations']}
                  onToggle={() => toggleSection('recommendations')}
                >
                  <CourseRecommendations />
                </Section>
              </div>
              
              {/* Right column */}
              <div className="space-y-6">
                {/* Learning Analytics */}
                <Section 
                  title="Your Learning Insights" 
                  icon={BarChart2}
                  isCollapsed={collapsedSections['analytics']}
                  onToggle={() => toggleSection('analytics')}
                >
                  <LearningAnalytics />
                </Section>
                
                {/* Community leaderboard */}
                <Section 
                  title="Learning Community" 
                  icon={Users}
                  isCollapsed={collapsedSections['community']}
                  onToggle={() => toggleSection('community')}
                >
                  <CommunityLeaderboard />
                </Section>
                
                {/* Reminders */}
                <Section 
                  title="Learning Reminders" 
                  icon={Bell}
                  isCollapsed={collapsedSections['reminders']}
                  onToggle={() => toggleSection('reminders')}
                >
                  <LearningReminders />
                </Section>
              </div>
            </div>
          </div>
        )}
        
        {/* My Learning Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <Section 
              title="Current Courses"
              isCollapsed={false}
            >
              <CourseProgress />
            </Section>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Section 
                  title="Course Catalog"
                  isCollapsed={false}
                >
                  <CourseRecommendations />
                </Section>
              </div>
              <div>
                <Section 
                  title="Your Learning Schedule"
                  isCollapsed={false}
                >
                  <LearningReminders />
                </Section>
              </div>
            </div>
          </div>
        )}
        
        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <Section 
              title="Learning Community"
              isCollapsed={false}
            >
              <CommunityLeaderboard />
            </Section>
          </div>
        )}
        
        {/* Goals & Reminders Tab */}
        {activeTab === 'goals' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section 
              title="Your Learning Goals"
              isCollapsed={false}
            >
              <DailyGoals />
            </Section>
            
            <Section 
              title="Learning Reminders"
              isCollapsed={false}
            >
              <LearningReminders />
            </Section>
          </div>
        )}
        
        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <Section 
              title="Your Learning Insights"
              isCollapsed={false}
            >
              <LearningAnalytics />
            </Section>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;