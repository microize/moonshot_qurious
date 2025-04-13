// In views/HomeView.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, ChevronRight, Bell, BarChart2, Award, CheckCircle, Zap, Calendar, Target, Play } from 'lucide-react';
import UserHeader from '../components/UserHeader';
import CourseCard from '../components/CourseCard/CourseCard';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';
// Import hooks for data
import { useCourses, useUserCourses, useUserProfile } from '../hooks/useApi';

const Section = ({ title, icon: Icon, children, action, onActionClick, collapsible = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };
  
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300">
      <div 
        className={`flex items-center justify-between px-2 py-2 ${collapsible ? 'cursor-pointer' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={collapsible ? toggleCollapse : undefined}
      >
        <div className="flex items-center">
          <h2 className="text-3xl font-thin text-gray-500 dark:text-gray-400 flex items-center">{title}</h2>
          {collapsible && (
            <ChevronRight 
              size={20} 
              className={`ml-2 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isCollapsed ? 'transform rotate-90' : ''}`} 
            />
          )}
        </div>
        
        {action && (
          <button 
            className="text-sm px-3 py-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:shadow-md transition-all duration-200 flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              onActionClick();
            }}
          >
            {action}
            <ChevronRight size={16} className={`ml-1 transition-transform duration-200 ${isHovered ? 'transform translate-x-0.5' : ''}`} />
          </button>
        )}
      </div>
      
      <div className={`p-1 overflow-hidden transition-all duration-300 ${isCollapsed ? 'max-h-0 opacity-0 py-0' : 'max-h-[2000px] opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

// Time-based Session Card Component with protruding design
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
        gradient: "from-amber-400 to-amber-600"
      };
    } else if (hour >= 9 && hour < 12) {
      return {
        title: "Mid-Morning Focus Session",
        description: "Take advantage of your peak concentration hours",
        badge: "Peak productivity time",
        gradient: "from-amber-500 to-amber-700"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        title: "Afternoon Refresher",
        description: "Beat the afternoon slump with a 15-minute learning burst",
        badge: "Afternoon recharge",
        gradient: "from-amber-400 to-amber-600"
      };
    } else {
      return {
        title: "Evening Deep Dive Session",
        description: "Perfect for evening focus: 25-minute learning session",
        badge: "Recommended for evenings",
        gradient: "from-amber-600 to-amber-800"
      };
    }
  };
  
  const session = getCurrentTimeSession();
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-6`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with gradient */}
      <div className={`p-5 bg-gradient-to-r ${session.gradient}`}>
        {/* Play button overlay - visible on hover */}
        <div className={`absolute right-4 top-4 transition-all duration-300 ${isHovered ? 'opacity-100 scale-105' : 'opacity-80'}`}>
          <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm">
            <Play size={20} className="text-white ml-0.5" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white">{session.title}</h3>
          <p className="text-white text-opacity-90 text-sm mt-1">{session.description}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
              {session.badge}
            </span>
          </div>
          <button 
            className={`px-4 py-2 bg-white hover:bg-white/90 text-amber-700 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg`}
          >
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
};

// Daily Goals Component with elevated design
const DailyGoals = () => {
  const goals = [
    { 
      id: 1, 
      icon: BookOpen, 
      title: "Complete today's lesson", 
      description: "Finish 'Decision Trees in ML'", 
      progress: 0, 
      completed: false,
      points: 50,
      timeEstimate: "15 min"
    },
    { 
      id: 2, 
      icon: CheckCircle, 
      title: "Practice Quiz", 
      description: "Take the Python basics quiz", 
      progress: 0, 
      completed: false,
      points: 30,
      timeEstimate: "10 min"
    },
    { 
      id: 3, 
      icon: Target, 
      title: "Review Flashcards", 
      description: "ML terminology review", 
      progress: 75, 
      completed: false,
      points: 20,
      timeEstimate: "5 min"
    }
  ];
  
  // Today's rewards
  const rewards = [
    { milestone: 1, reward: "10 bonus points", unlocked: true },
    { milestone: 2, reward: "New badge: 'Consistent Learner'", unlocked: false },
    { milestone: 3, reward: "Unlock special content", unlocked: false }
  ];
  
  return (
    <div>
      {/* Text progress indicator with dashed lines on both sides */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center w-full max-w-xs">
          <div className="h-px flex-1 border-t border-dashed border-gray-300 dark:border-gray-600"></div>
          <div className="mx-4 text-center">
            <span className="text-2xl font-thin text-amber-600 dark:text-gray-400">25% completed</span>
          </div>
          <div className="h-px flex-1 border-t border-dashed border-gray-300 dark:border-gray-600"></div>
        </div>
      </div>
      
      {/* Daily tasks - with protruding design for items */}
      <div className="space-y-3">
        {goals.map(goal => {
          const Icon = goal.icon;
          return (
            <div 
              key={goal.id} 
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-50 dark:border-gray-800 hover:-translate-y-0.5 transform"
            >
              <div className={`flex-shrink-0 p-2.5 rounded-lg shadow-md ${
                goal.progress > 0 
                  ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-500 dark:text-amber-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              }`}>
                <Icon size={18} />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white">{goal.title}</h4>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    +{goal.points} pts
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{goal.description}</p>
                
                {goal.progress > 0 && (
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <div className="ml-2 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                {goal.timeEstimate}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// Learning Analytics Component with elevated design
const LearningAnalytics = () => {
  // Weekly data
  const weeklyData = [
    { day: 'Mon', minutes: 45, target: 30 },
    { day: 'Tue', minutes: 30, target: 30 },
    { day: 'Wed', minutes: 60, target: 30 },
    { day: 'Thu', minutes: 15, target: 30 },
    { day: 'Fri', minutes: 0, target: 30 },
    { day: 'Sat', minutes: 0, target: 30 },
    { day: 'Sun', minutes: 0, target: 30 }
  ];
  
  // Calculate statistics
  const totalMinutes = weeklyData.reduce((sum, day) => sum + day.minutes, 0);
  const totalTargetMinutes = weeklyData.reduce((sum, day) => sum + day.target, 0);
  const avgMinutesPerDay = Math.round(totalMinutes / 7);
  const bestDay = [...weeklyData].sort((a, b) => b.minutes - a.minutes)[0];
  const completionRate = Math.round((totalMinutes / totalTargetMinutes) * 100);
  
  return (
    <div>
      {/* Weekly activity chart with elevated style */}
      <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-end h-32 mb-1">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center w-8 relative">
              {/* Target line */}
              <div className="w-8 border-t-2 border-dashed border-amber-300 dark:border-amber-600 absolute z-10" 
                   style={{ bottom: `${(day.target / 60) * 100}px` }}></div>
              
              {/* Activity bar */}
              <div className="flex-1 w-full flex items-end">
                <div 
                  className={`w-6 ${
                    day.minutes > 0 
                      ? 'bg-gradient-to-t from-amber-600 to-amber-400 dark:from-amber-700 dark:to-amber-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  } rounded-t-lg shadow-lg transition-all duration-300 hover:w-8 hover:bg-amber-500`}
                  style={{ height: `${(day.minutes / 60) * 100}px` }}
                ></div>
              </div>
              
              {/* Day label */}
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{day.day}</div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-sm mr-1 shadow-sm"></div>
            Minutes spent learning
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 border-t-2 border-dashed border-amber-300 dark:border-amber-600 mr-1"></span>
            Daily target (30 min)
          </div>
        </div>
      </div>
      
      {/* Weekly summary with protruding design */}
      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-800 rounded-lg shadow-md transform hover:-translate-y-0.5 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-300">This week</div>
            <div className="text-xl font-semibold text-gray-800 dark:text-white">{totalMinutes} minutes</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {avgMinutesPerDay} minutes daily average
            </div>
          </div>
          
          {/* Completion circle with elevated design */}
          <div className="relative w-16 h-16 filter drop-shadow-md">
            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200 dark:text-gray-700 stroke-current" 
                strokeWidth="10" 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent"
              />
              <circle 
                className="text-amber-500 stroke-current" 
                strokeWidth="10" 
                strokeLinecap="round" 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * (completionRate / 100))}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-sm font-bold text-gray-700 dark:text-white">{completionRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning insights with protruding cards */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transform hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center text-amber-500 mb-2">
            <div className="p-1.5 rounded-md bg-amber-100 dark:bg-amber-900/30 mr-2">
              <Clock size={14} className="text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-xs font-medium">Best learning time</div>
          </div>
          <div className="font-medium text-gray-800 dark:text-white">7-8 PM</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">You're most focused in the evening</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transform hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center text-amber-500 mb-2">
            <div className="p-1.5 rounded-md bg-amber-100 dark:bg-amber-900/30 mr-2">
              <Calendar size={14} className="text-amber-500 dark:text-amber-400" />
            </div>
            <div className="text-xs font-medium">Best learning day</div>
          </div>
          <div className="font-medium text-gray-800 dark:text-white">{bestDay.day}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{bestDay.minutes} minutes of focused learning</div>
        </div>
      </div>
      
      {/* Personalized recommendations with protruding design */}
      <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transform hover:-translate-y-0.5 transition-all duration-200">
        <div className="flex items-center mb-3">
          <div className="p-1.5 rounded-md bg-amber-100 dark:bg-amber-900/30 mr-2">
            <Zap size={14} className="text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-white">Personalized Tips</div>
        </div>
        
        <ul className="space-y-3">
          <li className="flex items-start text-sm text-gray-600 dark:text-gray-300 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <CheckCircle size={14} className="text-amber-500 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
            Schedule 30-minute sessions on weekends to maintain your streak
          </li>
          <li className="flex items-start text-sm text-gray-600 dark:text-gray-300 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <CheckCircle size={14} className="text-amber-500 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
            Try reviewing course materials in the evening for better retention
          </li>
        </ul>
      </div>
    </div>
  );
};

// Continue Learning Card Component with protruding design
const ContinueLearningCard = ({ course, navigate }) => {
  return (
    <div 
      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <div className="flex items-center gap-4">
        {/* Icon with gradient background */}
        {/* <div className="p-3 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg text-white shadow-md">
          <BookOpen size={24} />
        </div> */}
        
        <div className="flex-1">
          <h3 className="font-normal text-gray-600 dark:text-white">{course.title}</h3>
          <div className="font-normal bg-gradient-to-r from-red-600 to-amber-400 dark:from-amber-400 dark:to-amber-200 bg-clip-text text-transparent mt-1">Great Start - Keep up the Momentum!</div>
          
          {/* Progress bar with improved style */}
          <div className="mt-3 mb-2">
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                style={{ width: `${course.percentComplete || 10}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{course.completedModules || 1}/{course.totalModules || 10} Modules</span>
              <span>{course.percentComplete || 10}% Complete</span>
            </div>
          </div>
          
          {/* Next lesson prompt with protruding button */}
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Next: </span>
              <span className="text-sm text-gray-600 dark:text-gray-200">
                {course.nextModule || 'Introduction to the Course'}
              </span>
            </div>
            <button className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
              Continue
            </button>
          </div>
        </div>
      </div>
      
      {/* Time indicator with improved style */}
      <div className="mt-3 text-xs bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 flex items-center p-2 rounded-lg">
        <Clock size={14} className="mr-1.5 text-amber-500 dark:text-amber-400" />
        Last activity: {course.lastActivity || '2 hours ago'}
      </div>
    </div>
  );
};

// Empty state component with protruding design
const EmptyCourseState = ({ navigate }) => {
  return (
    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/20 rounded-full flex items-center justify-center text-amber-500 mb-4 shadow-md">
        <BookOpen size={24} />
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
        No courses in progress
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
        Start your learning journey by enrolling in a course that interests you.
      </p>
      <button 
        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        onClick={() => navigate('/courses')}
      >
        Explore Courses
      </button>
    </div>
  );
};

const HomeView = () => {
  const navigate = useNavigate();
  
  // Fetch data using custom hooks
  const { data: userProfileData } = useUserProfile();
  const { data: enrolledCoursesData } = useUserCourses();
  const { data: recommendedCoursesData } = useCourses();
  
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
    <div className="w-full max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header with user info - elevated design */}
      <div className="flex justify-between items-start mb-2 bg-white dark:bg-gray-900 p-1">
        <div>
          <h1 className="text-3xl font-thin text-gray-500 dark:text-gray-400 flex items-center">
            {getGreeting()}, {userProfile?.name || 'User'}
            <span className="ml-2 inline-block animate-[wave_1.8s_ease-in-out_infinite] origin-bottom-right transform">👋</span>
          </h1>
          <p className="mt-2 text-m font-medium bg-gradient-to-r from-red-500 to-amber-600 bg-clip-text text-transparent dark:from-amber-400 dark:via-yellow-300 dark:to-orange-400">
            You're making great progress! Keep up the momentum.
          </p>
        </div>
        
        {/* User header component */}
        <UserHeader />
      </div>
      
      {/* Notification banner with dashed border and no hover effect */}
      <div className="mb-8 p-4 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-between border border-dashed border-gray-300 dark:border-gray-600">
        <div className="flex items-center">
          <div className="bg-gray-100 dark:bg-amber-900/30 p-3 rounded-lg mr-4 shadow-md">
            <Bell size={20} className="text-amber-500 dark:text-amber-400" />
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">New in Data Science:</span> Live workshop on "Advanced ML Techniques" tomorrow at 7 PM
          </span>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
          RSVP
        </button>
      </div>
      
      {/* Main dashboard layout with grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Continue Learning Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning section */}
          <Section 
            title="Continue Learning" 
            icon={BookOpen}
            action="View All"
            onActionClick={() => navigate('/courses')}
          >
            {enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {enrolledCourses.slice(0, 2).map(course => (
                  <ContinueLearningCard 
                    key={course.id}
                    course={course}
                    navigate={navigate}
                  />
                ))}
              </div>
            ) : (
              <EmptyCourseState navigate={navigate} />
            )}
          </Section>
          
          {/* Recommended Courses */}
          <Section 
            title="Recommended For You" 
            icon={Award}
            action="View All"
            onActionClick={() => navigate('/courses')}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredRecommendations.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  minimal={true}
                />
              ))}
            </div>
          </Section>
        </div>
        
        {/* Right column - Time-based Session at top */}
        <div>
          {/* Time-based Session Card */}
          <div className="mb-6">
            <TimeBasedSessionCard />
          </div>
          
          {/* Today's Learning Goals section - Collapsible */}
          <Section title="Today's Learning Goals" icon={Target} collapsible={true}>
            <DailyGoals />
          </Section>
          
          {/* Learning Analytics - Collapsible */}
          <Section title="Learning Insights" icon={BarChart2} className="mt-6" collapsible={true}>
            <LearningAnalytics />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default HomeView;