import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, ChevronRight, Bell, BarChart2, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import custom hooks for API data
import { useCourses, useUserCourses, useUserProfile } from '../hooks/useApi';

// Import components
import UserAvatar from '../components/UserAvatar';
import CourseCard from '../components/CourseCard';
import DailyGoal from '../components/DailyGoal';
import LearningAnalytics from '../components/LearningAnalytics';

// Section component with microstimuli for collapsible sections
const Section = ({ title, icon: Icon, children, action, onActionClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="card mb-6">
      <div 
        className="flex items-center justify-between mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center">
          {Icon && (
            <Icon 
              size={18} 
              className={`mr-2 transition-all duration-300 ${
                isHovered ? 'text-primary-600 dark:text-primary-400 scale-110' : 'text-primary-500'
              }`}
            />
          )}
          <h2 className="font-medium text-slate-800 dark:text-white">{title}</h2>
        </div>
        
        {action && (
          <button 
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
            onClick={onActionClick}
          >
            {action}
            <ChevronRight size={16} className="ml-1" />
          </button>
        )}
      </div>
      
      {children}
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
        title: "Morning Productivity Session",
        description: "Jumpstart your day with a focused 20-minute learning session",
        badge: "Morning energy boost",
        gradient: "from-primary-500 to-primary-600"
      };
    } else if (hour >= 9 && hour < 12) {
      return {
        title: "Mid-Morning Focus Session",
        description: "Take advantage of your peak concentration hours",
        badge: "Peak productivity time",
        gradient: "from-primary-600 to-primary-700"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        title: "Afternoon Refresher",
        description: "Beat the afternoon slump with a 15-minute learning burst",
        badge: "Afternoon recharge",
        gradient: "from-primary-500 to-primary-600"
      };
    } else {
      return {
        title: "Evening Deep Dive Session",
        description: "Perfect for evening focus: 25-minute quiet study",
        badge: "Recommended for evenings",
        gradient: "from-primary-700 to-primary-800"
      };
    }
  };
  
  const session = getCurrentTimeSession();
  
  return (
    <div 
      className={`p-4 bg-gradient-to-r ${session.gradient} text-white rounded-xl transition-all duration-300 ${
        isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <h3 className="font-medium text-lg">{session.title}</h3>
        <p className="text-white text-opacity-90 text-sm mt-1">{session.description}</p>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
            {session.badge}
          </span>
        </div>
        <button className="px-3 py-1.5 bg-white hover:bg-opacity-90 text-primary-700 rounded-md text-sm font-medium transition-colors">
          Start Session
        </button>
      </div>
    </div>
  );
};

const HomeView = () => {
  const navigate = useNavigate();
  
  // Fetch data using custom hooks
  const { data: userProfileData, loading: loadingProfile } = useUserProfile();
  const { data: enrolledCoursesData, loading: loadingEnrolled } = useUserCourses();
  const { data: recommendedCoursesData, loading: loadingRecommended } = useCourses();
  
  // Extract the actual data from the API responses
  const userProfile = userProfileData || null;
  const enrolledCourses = enrolledCoursesData?.courses || [];
  const recommendedCourses = recommendedCoursesData?.courses || [];
  
  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  // Filter enrolled courses from recommendations
  const filteredRecommendations = recommendedCourses.filter(
    course => !enrolledCourses.some(ec => ec.id === course.id)
  ).slice(0, 3);
  
  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header with user info */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center">
            {getGreeting()}, {loadingProfile ? 'User' : userProfile?.name || 'User'}
            {/* Waving hand emoji */}
            <span className="ml-2 animate-bounce-subtle">👋</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last active: 2 hours ago</p>
          <p className="mt-2 text-primary-600 dark:text-primary-400 text-sm">
            You're making great progress! Keep up the momentum.
          </p>
        </div>
        
        {/* User profile summary */}
        <div className="flex items-center">
          {userProfile && (
            <div className="text-right mr-3 hidden sm:block">
              <div className="text-sm font-medium text-slate-800 dark:text-white">{userProfile.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{userProfile.role}</div>
            </div>
          )}
          
          <UserAvatar 
            userId={userProfile?.id} 
            name={userProfile?.name} 
            size="lg"
            onClick={() => navigate('/settings')}
            className="cursor-pointer"
          />
        </div>
      </div>
      
      {/* Notification banner with microstimuli */}
      <div className="mb-8 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800 flex items-center justify-between group hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-300 cursor-pointer">
        <div className="flex items-center">
          <Bell size={18} className="text-primary-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-medium">New in Data Science:</span> Live workshop on "Advanced ML Techniques" tomorrow at 7 PM
          </span>
        </div>
        <button className="btn btn-primary btn-sm">
          RSVP
        </button>
      </div>
      
      {/* Main dashboard layout with grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Continue Learning Section */}
        <div className="lg:col-span-2">
          {/* Continue Learning section */}
          <Section 
            title="Continue Learning" 
            icon={BookOpen}
            action="View All Courses"
            onActionClick={() => navigate('/courses')}
          >
            {loadingEnrolled ? (
              <div className="flex justify-center py-8">
                <div className="loading-spinner-lg"></div>
              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {enrolledCourses.map(course => (
                  <div 
                    key={course.id}
                    className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                        <BookOpen size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 dark:text-white">{course.title}</h3>
                        <div className="text-sm text-primary-600 dark:text-primary-400 mt-1">Continue your learning journey</div>
                        
                        {/* Progress bar */}
                        <div className="mt-3 mb-2">
                          <div className="progress-bar">
                            <div 
                              className="progress-bar-value"
                              style={{ width: `${course.percentComplete || 10}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                            <span>{course.completedModules || 1}/{course.totalModules || 10} Modules</span>
                            <span>{course.percentComplete || 10}% Complete</span>
                          </div>
                        </div>
                        
                        {/* Next lesson prompt */}
                        <div className="mt-3 flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Next: </span>
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                              {course.nextModule || 'Introduction to the Course'}
                            </span>
                          </div>
                          <button className="btn btn-primary btn-sm">
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Time indicator */}
                    <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center">
                      <Clock size={14} className="mr-1" />
                      Last activity: {course.lastActivity || '2 hours ago'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-500 mb-4">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                  No courses in progress
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-4">
                  Start your learning journey by enrolling in a course that interests you.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/courses')}
                >
                  Explore Courses
                </button>
              </div>
            )}
          </Section>
          
          {/* Recommended Courses */}
          <Section 
            title="Recommended For You" 
            icon={Award}
            action="View All"
            onActionClick={() => navigate('/courses')}
          >
            {loadingRecommended ? (
              <div className="flex justify-center py-6">
                <div className="loading-spinner-lg"></div>
              </div>
            ) : filteredRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecommendations.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    minimal={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-slate-600 dark:text-slate-400">
                  No course recommendations available at the moment.
                </p>
              </div>
            )}
          </Section>
        </div>
        
        {/* Right column - Time-based Session at top */}
        <div>
          {/* Time-based Session Card */}
          <div className="mb-6">
            <TimeBasedSessionCard />
          </div>
          
          {/* Today's Learning Goals section */}
          <div className="mb-6">
            <DailyGoal />
          </div>
          
          {/* Learning Analytics */}
          <div>
            <LearningAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;