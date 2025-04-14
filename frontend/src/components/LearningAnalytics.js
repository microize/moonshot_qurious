import React, { useState } from 'react';
import { BarChart2, Clock, Calendar, Zap, TrendingUp, CheckCircle, Award, ChevronRight } from 'lucide-react';

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
  const avgMinutesPerDay = Math.round(totalMinutes / 7);
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
  
  // Personalized recommendations
  const recommendations = [
    "Schedule 30-minute sessions on weekends to maintain your streak",
    "Try reviewing course materials in the evening for better retention",
    "Break your Python course into smaller daily sessions"
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400 mr-3">
            <BarChart2 size={18} />
          </div>
          <h3 className="font-medium text-gray-800 dark:text-white">Learning Insights</h3>
        </div>
        <span className="text-xs px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-md font-medium">
          Last 7 days
        </span>
      </div>
      
      {/* Weekly activity chart with enhanced interactions */}
      <div className="px-5 pt-5">
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400">Daily Activity</span>
          <span className="text-amber-600 dark:text-amber-400 font-medium">{totalMinutes} minutes total</span>
        </div>
        <div className="relative mt-3">
          {/* Target line - absolute positioning */}
          <div 
            className="absolute w-full border-t-2 border-dashed border-amber-300 dark:border-amber-700 z-10" 
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
                            ? 'bg-amber-500 dark:bg-amber-500'
                            : 'bg-amber-400 dark:bg-amber-600 group-hover:bg-amber-500 dark:group-hover:bg-amber-500'
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
                        <div className="absolute -right-1 top-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-amber-100 dark:bg-amber-900 rounded-full border-2 border-amber-500 dark:border-amber-400"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Day label */}
                  <div className={`text-xs font-medium mt-2 transition-colors ${
                    isHighlighted || isToday
                      ? 'text-amber-600 dark:text-amber-400' 
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400'
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
      <div className="mx-5 mt-6 p-4 bg-white dark:bg-gradient-to-b dark:from-amber-900/10 dark:to-gray-800/60 rounded-xl border border-amber-100/50 dark:border-amber-800/30">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-1 sm:pr-4 sm:border-r sm:border-gray-200 dark:sm:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">This week</div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{totalMinutes} min</div>
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
            
            {/* Enhanced progress circle */}
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
                  className="text-amber-500 stroke-current" 
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
                  <Award size={20} className="text-amber-500 dark:text-amber-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning insights cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 mt-6">
        {insights.map((insight, index) => (
          <div 
            key={index} 
            className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-800 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center text-amber-500 dark:text-amber-400 mb-2">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-2 group-hover:scale-110 transition-transform">
                <insight.icon size={14} />
              </div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300">{insight.title}</div>
            </div>
            <div className="font-semibold text-gray-800 dark:text-white text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              {insight.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insight.description}</div>
          </div>
        ))}
      </div>
      
      {/* Personalized recommendations */}
      <div className="px-5 mt-6 pb-5">
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-200">
          <div className="flex items-center mb-3">
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-2 text-amber-500 dark:text-amber-400">
              <Zap size={14} />
            </div>
            <div className="text-sm font-medium text-gray-800 dark:text-white">Personalized Tips</div>
          </div>
          
          <ul className="space-y-3">
            {recommendations.map((tip, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-2 mt-0.5 text-amber-500 dark:text-amber-400">
                  <CheckCircle size={14} />
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{tip}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <button className="text-xs px-3 py-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg inline-flex items-center group transition-colors">
              <span>View detailed analytics</span>
              <ChevronRight size={14} className="ml-1 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningAnalytics;