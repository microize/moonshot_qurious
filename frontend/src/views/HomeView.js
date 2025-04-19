// src/views/HomeView.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, ChevronRight, TrendingUp, Bell, BarChart2, Sparkles, Award, CheckCircle, Zap, Calendar, Target, Play } from 'lucide-react';
import UserHeader from '../components/UserHeader';
import CourseCard from '../components/CourseCard/CourseCard';
import Card from '../components/ui/Card';
// Import hooks for data
import { useCourses, useUserCourses, useUserProfile } from '../hooks/useApi';

// Enhanced TimeBasedSessionCard Component with protruding design
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
        gradient: "from-pink-400 to-amber-500"
      };
    } else if (hour >= 9 && hour < 12) {
      return {
        title: "Mid-Morning Focus Session",
        description: "Take advantage of your peak concentration hours",
        badge: "Peak productivity time",
        gradient: "from-pink-500 to-amber-600"
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        title: "Afternoon Refresher",
        description: "Beat the afternoon slump with a 15-minute learning burst",
        badge: "Afternoon recharge",
        gradient: "from-pink-400 to-amber-500"
      };
    } else {
      return {
        title: "Evening Deep Dive Session",
        description: "Perfect for evening focus: 25-minute learning session",
        badge: "Recommended for evenings",
        gradient: "from-pink-500 to-amber-600"
      };
    }
  };
  
  const session = getCurrentTimeSession();
  
  return (
    <div 
      className="relative overflow-hidden rounded-xl transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 mb-6 cursor-pointer"
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
            className="px-4 py-2 bg-white hover:bg-white/90 text-pink-700 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced DailyGoals Component with elevated design
const DailyGoals = () => {
  const [hoveredGoal, setHoveredGoal] = useState(null);
  
  // Goals data
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
  
  // Calculate total completion percentage
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.completed).length;
  const inProgressGoals = goals.filter(g => !g.completed && g.progress > 0).length;
  
  // Overall progress calculation (completed + partial progress)
  const overallProgress = Math.round(
    ((completedGoals / totalGoals) * 100) + 
    (inProgressGoals > 0 ? 
      goals.filter(g => !g.completed && g.progress > 0)
          .reduce((sum, g) => sum + (g.progress / 100) * (1 / totalGoals) * 100, 0) 
      : 0)
  );
  
  return (
    <Card title="Today's Learning Goals" icon={Target} collapsible>
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Your progress</div>
          <div className="text-sm font-medium text-pink-600 dark:text-pink-400">{overallProgress}% completed</div>
        </div>
        
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <div>{completedGoals} of {totalGoals} completed</div>
          <div>{inProgressGoals} in progress</div>
        </div>
      </div>
      
      {/* Daily tasks */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const isHovered = hoveredGoal === goal.id;
          const Icon = goal.icon;
          
          return (
            <div 
              key={goal.id} 
              className={`flex items-center p-4 h-full rounded-xl transition-all duration-200 ${
                isHovered ? 'translate-y-[-2px]' : ''
              }`}
              onMouseEnter={() => setHoveredGoal(goal.id)}
              onMouseLeave={() => setHoveredGoal(null)}
            >
              <div className={`flex-shrink-0 p-2.5 rounded-lg shadow-sm ${
                goal.completed
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400'
                  : goal.progress > 0 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              } ${isHovered ? 'scale-110' : ''} transition-transform`}>
                <Icon size={18} />
              </div>
              
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h4 className={`text-sm font-medium ${
                    goal.completed
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-gray-800 dark:text-white'
                  }`}>
                    {goal.title}
                    {goal.completed && (
                      <span className="ml-2 inline-flex items-center text-xs text-green-500 dark:text-green-400">
                        <CheckCircle size={12} className="mr-1" />
                        Completed
                      </span>
                    )}
                  </h4>
                  <span className={`text-xs font-medium ${
                    isHovered ? 'text-pink-600 dark:text-pink-400 scale-110' : 'text-pink-500 dark:text-pink-500'
                  } transition-all`}>
                    +{goal.points} pts
                  </span>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{goal.description}</p>
                
                {goal.progress > 0 && !goal.completed && (
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              
              <div className="ml-2 flex-shrink-0">
                {goal.completed ? (
                  <div className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                    Completed
                  </div>
                ) : (
                  <button className={`text-xs px-2 py-1 rounded-lg inline-flex items-center ${
                    isHovered
                      ? 'bg-pink-500 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  } transition-colors`}>
                    <span>{goal.timeEstimate}</span>
                    {isHovered && <ChevronRight size={12} className="ml-1" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Rewards section */}
      <div className="mt-5">
        <div className="p-4 rounded-xl">
          <div className="flex items-center mb-3">
            <Award size={16} className="text-pink-500 dark:text-pink-400 mr-2" />
            <h4 className="text-sm font-medium text-gray-800 dark:text-white">Today's Rewards</h4>
          </div>
          
          <div className="space-y-2">
            {rewards.map((reward, index) => (
              <div 
                key={index} 
                className={`flex items-center p-3 h-full rounded-lg ${
                  reward.unlocked
                    ? 'text-gray-800 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-2 ${
                  reward.unlocked
                    ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <span className={reward.unlocked ? 'font-medium' : ''}>{reward.reward}</span>
                </div>
                {reward.unlocked && (
                  <CheckCircle size={16} className="text-green-500 dark:text-green-400 ml-2" />
                )}
              </div>
            ))}
          </div>
          
          {/* Call to action button */}
          <div className="mt-4">
            <button className="w-full py-2 text-sm bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center group">
              <span>Complete more goals</span>
              <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Enhanced LearningAnalytics Component
const LearningAnalytics = () => {
  const [highlightedDay, setHighlightedDay] = useState(null);
  
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
  const bestDay = [...weeklyData].sort((a, b) => b.minutes - a.minutes)[0];
  const completionRate = Math.round((totalMinutes / totalTargetMinutes) * 100);
  
  // Learning insights
  const insights = [
    {
      icon: Clock,
      title: "Best learning time",
      value: "7-8 PM",
      description: "You're most focused in the evening"
    },
    {
      icon: Calendar,
      title: "Best learning day",
      value: bestDay.day,
      description: `${bestDay.minutes} minutes of focused learning`
    },
    {
      icon: TrendingUp,
      title: "Learning streak",
      value: "8 days",
      description: "Longest streak: 23 days"
    }
  ];
  return (
    <Card title="Learning Insights" icon={BarChart2} collapsible>
      {/* Weekly activity chart */}
      <div>
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400">Daily Activity</span>
          <span className="text-pink-600 dark:text-pink-400 font-medium">{totalMinutes} minutes total</span>
        </div>
        
        <div className="relative mt-3">
          {/* Target line - absolute positioning */}
          <div 
            className="absolute w-full border-t-2 border-dashed border-pink-300 dark:border-pink-700 z-10" 
            style={{ top: '40px' }}
          >
            <div className="absolute right-0 -top-6 bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
              30 min target
            </div>
          </div>
          
          <div className="flex justify-between items-end h-36 relative">
            {weeklyData.map((day, index) => {
              const isToday = index === 3; // Thursday in sample data
              const isEmpty = day.minutes === 0;
              const isHighlighted = highlightedDay === index;
              const height = isEmpty ? 4 : Math.max(5, (day.minutes / 60) * 100);
              
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center px-1 flex-1 cursor-pointer group"
                  onMouseEnter={() => setHighlightedDay(index)}
                  onMouseLeave={() => setHighlightedDay(null)}
                >
                  {/* Activity bar */}
                  <div className="w-full flex justify-center items-end h-28">
                    <div 
                      className={`w-7 relative rounded-t-md transition-all duration-300 ${
                        isEmpty 
                          ? 'bg-gray-200 dark:bg-gray-700 h-1 rounded'
                          : isToday || isHighlighted
                            ? 'bg-pink-500 dark:bg-pink-500'
                            : 'bg-pink-400 dark:bg-pink-600 group-hover:bg-pink-500 dark:group-hover:bg-pink-500'
                      }`}
                      style={{ height: `${height}px` }}
                    >
                      {/* Tooltip for bars with data */}
                      {(isHighlighted || isToday) && !isEmpty && (
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-20 shadow-lg">
                          <div className="font-medium">{day.minutes} min</div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                        </div>
                      )}
                      
                      {/* Indicator for today */}
                      {isToday && (
                        <div className="absolute -right-1 top-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-pink-100 dark:bg-pink-900 rounded-full border-2 border-pink-500 dark:border-pink-400"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Day label */}
                  <div className={`text-xs font-medium mt-2 transition-colors ${
                    isHighlighted || isToday
                      ? 'text-pink-600 dark:text-pink-400' 
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-pink-600 dark:group-hover:text-pink-400'
                  }`}>
                    {day.day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Weekly summary card */}
      <div className="mt-6 p-4 bg-gradient-to-br from-pink-50 to-amber-50 dark:from-pink-900/10 dark:to-amber-900/10 rounded-xl border border-pink-100/50 dark:border-pink-800/30">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-1 sm:pr-4 sm:border-r sm:border-gray-200 dark:sm:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">This week</div>
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{totalMinutes} min</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                <TrendingUp size={12} className="mr-1" />
                +15%
              </span> 
              <span className="ml-1">from last week</span>
            </div>
          </div>
          
          <div className="flex-1 pl-0 sm:pl-4 mt-4 sm:mt-0 flex items-center">
            <div className="mr-3">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Completion</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{completionRate}%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                of weekly goal
              </div>
            </div>
            
            {/* Progress circle */}
            <div className="relative w-16 h-16 ml-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-gray-200 dark:text-gray-700 stroke-current" 
                  strokeWidth="10" 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent"
                />
                <circle 
                  className="text-gradient-to-r from-pink-500 to-amber-500 stroke-current" 
                  strokeWidth="10" 
                  strokeLinecap="round" 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * (completionRate / 100))}
                  transform="rotate(-90 50 50)"
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="251.2" 
                    to={251.2 - (251.2 * (completionRate / 100))}
                    dur="1s" 
                    fill="freeze" 
                    calcMode="spline"
                    keySplines="0.19 1 0.22 1"
                  />
                </circle>
              </svg>
              {completionRate >= 100 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award size={20} className="text-pink-500 dark:text-pink-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning insights cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-800 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center text-pink-500 dark:text-pink-400 mb-2">
                <div className="p-1.5 bg-pink-100 dark:bg-pink-900/30 rounded-lg mr-2 group-hover:scale-110 transition-transform">
                  <Icon size={14} />
                </div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300">{insight.title}</div>
              </div>
              <div className="font-semibold text-gray-800 dark:text-white text-base group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                {insight.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insight.description}</div>
            </div>
          );
        })}
      </div>
      
      {/* Personalized recommendations */}
      <div className="mt-6">
        <div className="p-4 bg-white dark:bg-gray-750 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-800 transition-all duration-200">
          <div className="flex items-center mb-3">
            <div className="p-1.5 bg-pink-100 dark:bg-pink-900/30 rounded-lg mr-2 text-pink-500 dark:text-pink-400">
              <Zap size={14} />
            </div>
            <div className="text-sm font-medium text-gray-800 dark:text-white">Personalized Tips</div>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="mr-2 mt-0.5 text-pink-500 dark:text-pink-400">
                <CheckCircle size={14} />
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Schedule 30-minute sessions on weekends to maintain your streak</div>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-0.5 text-pink-500 dark:text-pink-400">
                <CheckCircle size={14} />
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Try reviewing course materials in the evening for better retention</div>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

// Empty state component with enhanced visual design
const EmptyCourseState = ({ navigate }) => {
  return (
    <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/20 rounded-full flex items-center justify-center text-pink-500 mb-4 shadow-md">
        <BookOpen size={24} />
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
        No courses in progress
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
        Start your learning journey by enrolling in a course that interests you.
      </p>
      <button 
        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-amber-600 hover:from-pink-600 hover:to-amber-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        onClick={() => navigate('/courses')}
      >
        Explore Courses
      </button>
    </div>
  );
};

// Continue Learning Card Component with enhanced design
const ContinueLearningCard = ({ course, navigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 ${
        isHovered ? 'transform -translate-y-1' : ''
      }`}
      onClick={() => navigate(`/courses/${course.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 dark:text-white">{course.title}</h3>
          <div className="text-sm bg-gradient-to-r from-pink-500 to-amber-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-amber-300 mt-1">
            Great Start - Keep up the Momentum!
          </div>
          
          {/* Progress bar with improved style */}
          <div className="mt-3 mb-2">
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-amber-400 rounded-full"
                style={{ width: `${course.percentComplete || 10}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{course.completedModules || 1}/{course.totalModules || 10} Modules</span>
              <span>{course.percentComplete || 10}% Complete</span>
            </div>
          </div>
          
          {/* Next lesson prompt with enhanced button */}
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Next: </span>
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {course.nextModule || 'Introduction to the Course'}
              </span>
            </div>
            <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
              isHovered ? 'bg-pink-500 text-white shadow-md' : 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
            }`}>
              Continue
              <ChevronRight size={16} className={`ml-1 transform transition-transform ${isHovered ? 'translate-x-0.5' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Time indicator with improved style */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
        <Clock size={14} className="mr-1.5 text-pink-500 dark:text-pink-400" />
        Last activity: {course.lastActivity || '2 hours ago'}
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
  
  return (
    <div className="w-full max-w-full lg:max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Enhanced Header with user info */}
      <div className="flex mb-5 justify-between items-start bg-white dark:bg-gray-900 p-2">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            {getGreeting()}, {userProfile?.name || 'User'}
            <span 
              className="inline-block animate-[wave_1.8s_ease-in-out_infinite] origin-bottom-right transform"
              role="img" 
              aria-label="Waving hand"
            >
              👋
            </span>
          </h1>
          <p className="mt-1 text-base font-medium bg-gradient-to-r from-amber-500 to-pink-600 bg-clip-text text-transparent dark:from-pink-400 dark:via-pink-300 dark:to-amber-500">
            You're making great progress! Keep up the momentum.
          </p>
        </div>
        
        {/* Enhanced UserHeader component */}
        <UserHeader />
      </div>
      
      {/* Main dashboard layout with grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Continue Learning & Recommendations */}
        <div className="lg:col-span-2 space-y-6">
        {/* Continue Learning section */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-pink-400 flex items-center">
        <BookOpen size={20} className="mr-2 text-dark-500 dark:text-pink-400" />
        Continue Learning
      </h2>
      
      <button 
        onClick={() => navigate('/courses')}
        className="text-sm px-3 py-1.5 rounded-lg text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:shadow-sm transition-all duration-200 flex items-center group"
      >
        View All
        <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
    
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
  </div>
  
  {/* Recommended Courses */}
  <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-pink-400 flex items-center">
        <Sparkles size={20} className="mr-2 text-dark-500 dark:text-pink-400" />
        Recommended For You
      </h2>
      <button 
        onClick={() => navigate('/courses')}
        className="text-sm px-3 py-1.5 rounded-lg text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:shadow-sm transition-all duration-200 flex items-center group"
      >
        View All
        <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredRecommendations.map(course => (
        <CourseCard 
          key={course.id} 
          course={course} 
          minimal={true}
        />
      ))}
    </div>
  </div>
</div>
        
        {/* Right column - Time-based Session, Daily Goals & Learning Analytics */}
        <div>
          {/* Time-based Session Card */}
          <TimeBasedSessionCard />
          
          {/* Today's Learning Goals section */}
          <div className="mb-6">
            <DailyGoals />
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