// views/HomeView.js - Redesigned with cobalt blue aesthetics
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, ChevronRight, Bell, BarChart2, Award, CheckCircle, Zap, Calendar, Target } from 'lucide-react';

// Import custom components
import UserHeader from '../components/UserHeader';
import CourseCard from '../components/CourseCard';
import UserAvatar from '../components/UserAvatar';

// Import hooks for data
import { useCourses, useUserCourses, useUserProfile } from '../hooks/useApi';

// Section component with micro-interactions
const Section = ({ title, icon: Icon, children, action, onActionClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden mb-6">
      <div 
        className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center">
          {Icon && (
            <Icon 
              size={18} 
              className={`mr-2 transition-all duration-300 ${
                isHovered ? 'text-cobalt-600 dark:text-cobalt-400 scale-110' : 'text-cobalt-500 dark:text-cobalt-500'
              }`}
            />
          )}
          <h2 className="font-semibold text-gray-800 dark:text-white">{title}</h2>
        </div>
        
        {action && (
          <button 
            className="text-sm text-cobalt-600 dark:text-cobalt-400 hover:text-cobalt-700 dark:hover:text-cobalt-300 flex items-center"
            onClick={onActionClick}
          >
            {action}
            <ChevronRight size={16} className={`ml-1 transition-transform duration-200 ${isHovered ? 'transform translate-x-0.5' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

// Time-based Session Card Component
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
        gradient: "from-cobalt-400 to-cobalt-600"
      };
    } else if (hour >= 9 && hour < 12) {
      return {
        title: "Mid-Morning Focus Session",
        description: "Take advantage of your peak concentration hours",
        badge: "Peak productivity time",
        gradient: "from-cobalt-500 to-cobalt-700"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        title: "Afternoon Refresher",
        description: "Beat the afternoon slump with a 15-minute learning burst",
        badge: "Afternoon recharge",
        gradient: "from-cobalt-400 to-cobalt-600"
      };
    } else {
      return {
        title: "Evening Deep Dive Session",
        description: "Perfect for evening focus: 25-minute learning session",
        badge: "Recommended for evenings",
        gradient: "from-cobalt-600 to-cobalt-800"
      };
    }
  };
  
  const session = getCurrentTimeSession();
  
  return (
    <div 
      className={`p-5 bg-gradient-to-r ${session.gradient} rounded-xl transition-all duration-300 shadow-soft ${
        isHovered ? 'shadow-soft-lg translate-y-0' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          className={`px-4 py-2 bg-white hover:bg-white/90 text-cobalt-700 rounded-lg text-sm font-medium transition-all duration-200 ${
            isHovered ? 'shadow-md' : 'shadow-sm'
          }`}
        >
          Start Session
        </button>
      </div>
    </div>
  );
};

// Daily Goals Component
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
      {/* Progress circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="text-gray-100 dark:text-gray-700 stroke-current" 
              strokeWidth="8" 
              cx="50" 
              cy="50" 
              r="40" 
              fill="transparent"
            />
            <circle 
              className="text-cobalt-500 stroke-current" 
              strokeWidth="8" 
              strokeLinecap="round" 
              cx="50" 
              cy="50" 
              r="40" 
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset="188.4" // 251.2 * 0.75 to represent 25% progress
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-cobalt-600 dark:text-cobalt-400">25%</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Complete</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily tasks */}
      <div className="space-y-3">
        {goals.map(goal => {
          const Icon = goal.icon;
          return (
            <div key={goal.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className={`p-2 rounded-full ${
                goal.progress > 0 
                  ? 'bg-cobalt-100 dark:bg-cobalt-900/50 text-cobalt-500 dark:text-cobalt-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              }`}>
                <Icon size={16} />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white">{goal.title}</h4>
                  <span className="text-xs badge-primary">
                    +{goal.points} pts
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{goal.description}</p>
                
                {goal.progress > 0 && (
                  <div className="progress-bar mt-1.5">
                    <div 
                      className="progress-bar-value"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                {goal.timeEstimate}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Rewards section */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
          <Award size={16} className="text-cobalt-500 mr-2" />
          <h4 className="text-sm font-medium text-gray-800 dark:text-white">Today's Rewards</h4>
        </div>
        
        <div className="flex justify-between items-center">
          {rewards.map((reward, index) => (
            <div key={index} className="text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${
                reward.unlocked 
                  ? 'border-cobalt-500 bg-cobalt-100 dark:bg-cobalt-900/50 text-cobalt-500 dark:text-cobalt-400' 
                  : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
              }`}>
                <span className="text-sm font-bold">{reward.milestone}</span>
              </div>
              <p className={`text-xs mt-1 ${
                reward.unlocked 
                  ? 'text-cobalt-500 dark:text-cobalt-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {reward.reward}
              </p>
            </div>
          ))}
        </div>
        
        {/* Progress bar connecting the milestones */}
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-1/3 h-1 bg-cobalt-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Motivational message */}
      <div className="mt-4 p-3 bg-cobalt-50 dark:bg-cobalt-900/20 rounded-lg text-sm text-cobalt-700 dark:text-cobalt-300 flex items-center">
        <CheckCircle size={16} className="mr-2" />
        Complete all goals today to maintain your 8-day streak!
      </div>
    </div>
  );
};

// Learning Analytics Component
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
      {/* Weekly activity chart */}
      <div className="mt-4">
        <div className="flex justify-between items-end h-32 mb-1">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center w-8">
              {/* Target line */}
              <div className="w-8 border-t border-dashed border-gray-300 dark:border-gray-600 absolute" 
                   style={{ bottom: `${(day.target / 60) * 100}px` }}></div>
              
              {/* Activity bar */}
              <div className="flex-1 w-full flex items-end">
                <div 
                  className={`w-6 ${
                    day.minutes > 0 
                      ? 'bg-gradient-to-t from-cobalt-500 to-cobalt-400' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  } rounded-t-sm`}
                  style={{ height: `${(day.minutes / 60) * 100}px` }}
                ></div>
              </div>
              
              {/* Day label */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{day.day}</div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
          <div>
            <span className="inline-block w-3 h-3 bg-gradient-to-t from-cobalt-500 to-cobalt-400 rounded-sm mr-1"></span>
            Minutes spent learning
          </div>
          <div>
            <span className="inline-block w-4 border-t border-dashed border-gray-400 dark:border-gray-500 mr-1"></span>
            Daily target (30 min)
          </div>
        </div>
      </div>
      
      {/* Weekly summary */}
      <div className="mt-6 p-4 bg-cobalt-50 dark:bg-cobalt-900/20 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-300">This week</div>
            <div className="text-xl font-semibold text-gray-800 dark:text-white">{totalMinutes} minutes</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {avgMinutesPerDay} minutes daily average
            </div>
          </div>
          
          {/* Completion circle */}
          <div className="relative w-16 h-16">
            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200 dark:text-gray-700 stroke-current" 
                strokeWidth="8" 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent"
              />
              <circle 
                className="text-cobalt-500 stroke-current" 
                strokeWidth="8" 
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
      
      {/* Learning insights */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-750 p-3 rounded-lg shadow-sm">
          <div className="flex items-center text-cobalt-500 mb-2">
            <Clock size={14} className="mr-1" />
            <div className="text-xs">Best learning time</div>
          </div>
          <div className="font-medium text-gray-800 dark:text-white">7-8 PM</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">You're most focused in the evening</div>
        </div>
        
        <div className="bg-white dark:bg-gray-750 p-3 rounded-lg shadow-sm">
          <div className="flex items-center text-cobalt-500 mb-2">
            <Calendar size={14} className="mr-1" />
            <div className="text-xs">Best learning day</div>
          </div>
          <div className="font-medium text-gray-800 dark:text-white">{bestDay.day}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{bestDay.minutes} minutes of focused learning</div>
        </div>
      </div>
      
      {/* Personalized recommendations */}
      <div className="mt-6">
        <div className="flex items-center mb-2">
          <Zap size={14} className="text-cobalt-500 mr-1" />
          <div className="text-sm font-medium text-gray-800 dark:text-white">Personalized Tips</div>
        </div>
        
        <ul className="space-y-2">
          <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle size={14} className="text-cobalt-500 mr-2 mt-1 flex-shrink-0" />
            Schedule 30-minute sessions on weekends to maintain your streak
          </li>
          <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle size={14} className="text-cobalt-500 mr-2 mt-1 flex-shrink-0" />
            Try reviewing course materials in the evening for better retention
          </li>
        </ul>
      </div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header with user info */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
            {getGreeting()}, {userProfile?.name || 'User'}
            {/* Waving hand emoji */}
            <span className="ml-2 animate-bounce-subtle">👋</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last active: 2 hours ago</p>
          <p className="mt-2 text-cobalt-600 dark:text-cobalt-400 text-sm">
            You're making great progress! Keep up the momentum.
          </p>
        </div>
        
        {/* User header component */}
        <UserHeader />
      </div>
      
      {/* Notification banner */}
      <div className="mb-8 p-4 bg-gradient-to-r from-cobalt-50 to-cobalt-100 dark:from-cobalt-900/20 dark:to-cobalt-900/10 rounded-xl flex items-center justify-between group hover:shadow-soft transition-shadow duration-300 border border-cobalt-100 dark:border-cobalt-800/50">
        <div className="flex items-center">
          <Bell size={18} className="text-cobalt-500 mr-3 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">New in Data Science:</span> Live workshop on "Advanced ML Techniques" tomorrow at 7 PM
          </span>
        </div>
        <button className="btn-primary-sm">
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
            action="View All Courses"
            onActionClick={() => navigate('/courses')}
          >
            {enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {enrolledCourses.slice(0, 2).map(course => (
                  <div 
                    key={course.id}
                    className="p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-cobalt-400 to-cobalt-600 rounded-lg text-white">
                        <BookOpen size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 dark:text-white">{course.title}</h3>
                        <div className="text-sm text-cobalt-600 dark:text-cobalt-400 mt-1">Continue your learning journey</div>
                        
                        {/* Progress bar */}
                        <div className="mt-3 mb-2">
                          <div className="progress-bar">
                            <div 
                              className="progress-bar-value"
                              style={{ width: `${course.percentComplete || 10}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>{course.completedModules || 1}/{course.totalModules || 10} Modules</span>
                            <span>{course.percentComplete || 10}% Complete</span>
                          </div>
                        </div>
                        
                        {/* Next lesson prompt */}
                        <div className="mt-3 flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Next: </span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">
                              {course.nextModule || 'Introduction to the Course'}
                            </span>
                          </div>
                          <button className="btn-primary-sm">
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Time indicator */}
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock size={14} className="mr-1" />
                      Last activity: {course.lastActivity || '2 hours ago'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="mx-auto w-16 h-16 bg-cobalt-100 dark:bg-cobalt-900/30 rounded-full flex items-center justify-center text-cobalt-500 mb-4">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                  No courses in progress
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
                  Start your learning journey by enrolling in a course that interests you.
                </p>
                <button 
                  className="btn-primary"
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
          
          {/* Today's Learning Goals section */}
          <Section title="Today's Learning Goals" icon={Target}>
            <DailyGoals />
          </Section>
          
          {/* Learning Analytics */}
          <Section title="Learning Insights" icon={BarChart2} className="mt-6">
            <LearningAnalytics />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default HomeView;