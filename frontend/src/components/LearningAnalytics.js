// components/LearningAnalytics.js - Refined with elegant design system
import React from 'react';
import { BarChart2, Clock, Calendar, Zap, TrendingUp, CheckCircle, Award } from 'lucide-react';
import { useFetch } from '../hooks/useApi';

const LearningAnalytics = () => {
  // In a real implementation, we would fetch analytics from the API
  // For now using a mock endpoint that doesn't exist yet
  const { data: analyticsData, loading } = useFetch('analytics/learning', {}, false);
  
  // Sample learning data as fallback if API isn't ready
  const defaultWeeklyData = [
    { day: 'Mon', minutes: 45, target: 30 },
    { day: 'Tue', minutes: 30, target: 30 },
    { day: 'Wed', minutes: 60, target: 30 },
    { day: 'Thu', minutes: 15, target: 30 },
    { day: 'Fri', minutes: 0, target: 30 },
    { day: 'Sat', minutes: 0, target: 30 },
    { day: 'Sun', minutes: 0, target: 30 }
  ];
  
  // Use the API data if available, otherwise use the fallback
  const weeklyData = analyticsData?.weeklyData || defaultWeeklyData;
  
  // Calculate statistics
  const totalMinutes = weeklyData.reduce((sum, day) => sum + day.minutes, 0);
  const totalTargetMinutes = weeklyData.reduce((sum, day) => sum + day.target, 0);
  const avgMinutesPerDay = Math.round(totalMinutes / 7);
  const bestDay = [...weeklyData].sort((a, b) => b.minutes - a.minutes)[0];
  const completionRate = Math.round((totalMinutes / totalTargetMinutes) * 100);

  // Learning insights with fallback
  const defaultInsights = [
    {
      icon: 'clock',
      title: "Best learning time",
      value: "7-8 PM",
      description: "You're most focused in the evening"
    },
    {
      icon: 'calendar',
      title: "Best learning day",
      value: bestDay.day,
      description: `${bestDay.minutes} minutes of focused learning`
    },
    {
      icon: 'trending',
      title: "Learning streak",
      value: "8 days",
      description: "Longest streak: 23 days"
    }
  ];
  
  // Use the API data if available, otherwise use the fallback
  const insights = analyticsData?.insights || defaultInsights;

  // Personalized recommendations with fallback
  const defaultRecommendations = [
    "Schedule 30-minute sessions on weekends to maintain your streak",
    "Try reviewing course materials in the evening for better retention",
    "Break your Python course into smaller daily sessions"
  ];
  
  // Use the API data if available, otherwise use the fallback
  const recommendations = analyticsData?.recommendations || defaultRecommendations;
  
  // Map icon string to component
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'clock': return Clock;
      case 'calendar': return Calendar;
      case 'trending': return TrendingUp;
      case 'zap': return Zap;
      default: return Clock;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <BarChart2 size={18} className="text-indigo-500 dark:text-indigo-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">Your Learning Insights</h3>
        </div>
        <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-md font-medium">
          Last 7 days
        </span>
      </div>
      
      {/* Weekly activity chart - Enhanced */}
      <div className="mt-4 mb-6">
        <div className="relative">
          {/* Target line */}
          <div className="absolute w-full border-t-2 border-dashed border-gray-200 dark:border-gray-700 z-0" 
              style={{ bottom: '30px', top: 'auto' }}></div>
          
          <div className="flex justify-between items-end h-36 relative">
            {weeklyData.map((day, index) => {
              const isToday = index === 3; // Thursday in sample data
              const isEmpty = day.minutes === 0;
              
              return (
                <div key={index} className="flex flex-col items-center px-1" style={{ width: `${100 / weeklyData.length}%` }}>
                  {/* Activity bar */}
                  <div className="w-full flex justify-center items-end h-28">
                    <div 
                      className={`w-8 relative rounded-t-md transition-all ${
                        isEmpty 
                          ? 'bg-gray-100 dark:bg-gray-700 h-2 rounded'
                          : isToday
                            ? 'bg-indigo-500'
                            : 'bg-indigo-400 dark:bg-indigo-500'
                      }`}
                      style={{ 
                        height: isEmpty ? '8px' : `${Math.max(6, (day.minutes / 60) * 100)}px`,
                        boxShadow: isToday ? '0 4px 6px -1px rgba(79, 70, 229, 0.2)' : 'none'
                      }}
                    >
                      {/* Tooltip for bars with data */}
                      {!isEmpty && (
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded pointer-events-none whitespace-nowrap transition-opacity">
                          {day.minutes} min
                        </div>
                      )}
                      
                      {/* Bar label for today */}
                      {isToday && (
                        <div className="absolute -right-2 top-0 w-4 h-4 bg-indigo-100 dark:bg-indigo-900/60 rounded-full border-2 border-indigo-500 dark:border-indigo-400"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Day label */}
                  <div className={`text-xs font-medium mt-2 ${
                    isToday 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {day.day}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Target indicator */}
          <div className="absolute bottom-14 right-0 bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
            30 min
          </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-5 p-2 bg-gray-50 dark:bg-gray-800/80 rounded-md">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-indigo-400 rounded-sm mr-1.5"></span>
            Learning activity
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 border-t-2 border-dashed border-gray-300 dark:border-gray-600 mr-1.5"></span>
            Daily target
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-indigo-500 rounded-sm mr-1.5"></span>
            Today
          </div>
        </div>
      </div>
      
      {/* Weekly summary - Enhanced */}
      <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-gray-50 dark:from-indigo-900/20 dark:to-gray-800/60 rounded-md border border-indigo-100/80 dark:border-indigo-800/50">
        <div className="flex items-stretch">
          <div className="flex-1 pr-4 border-r border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">This week</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{totalMinutes} min</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="inline-flex items-center text-green-600 dark:text-green-400 font-medium">
                <TrendingUp size={12} className="mr-1" />
                +15%
              </span> 
              <span className="ml-1">from last week</span>
            </div>
          </div>
          
          <div className="flex-1 pl-4 flex items-center">
            <div className="mr-3">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Completion</div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{completionRate}%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                of weekly goal
              </div>
            </div>
            
            {/* Enhanced progress circle */}
            <div className="relative w-16 h-16 ml-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  className="text-gray-200 dark:text-gray-700/60 stroke-current" 
                  strokeWidth="10" 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="transparent"
                />
                <circle 
                  className="text-indigo-500 stroke-current" 
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
                  <Award size={20} className="text-indigo-500 dark:text-indigo-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning insights - Enhanced */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const Icon = getIcon(insight.icon);
          return (
            <div key={index} className="bg-white dark:bg-gray-750 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-indigo-500 dark:text-indigo-400 mb-2">
                <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-md mr-2">
                  <Icon size={14} />
                </div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300">{insight.title}</div>
              </div>
              <div className="font-semibold text-gray-800 dark:text-white text-base">{insight.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insight.description}</div>
            </div>
          );
        })}
      </div>
      
      {/* Personalized recommendations - Enhanced */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-3">
          <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-md mr-2 text-indigo-500 dark:text-indigo-400">
            <Zap size={14} />
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-white">Personalized Tips</div>
        </div>
        
        <ul className="space-y-3">
          {recommendations.map((tip, index) => (
            <li key={index} className="flex items-start pl-2 border-l-2 border-indigo-300 dark:border-indigo-700">
              <div className="ml-2">
                <div className="text-sm text-gray-700 dark:text-gray-300">{tip}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LearningAnalytics;