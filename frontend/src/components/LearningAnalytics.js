// components/LearningAnalytics.js
import React from 'react';
import { BarChart2, Clock, Calendar, Zap, TrendingUp, CheckCircle } from 'lucide-react';

const LearningAnalytics = () => {
  // Sample learning data
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
  const avgMinutesPerDay = totalMinutes / 7;
  const bestDay = [...weeklyData].sort((a, b) => b.minutes - a.minutes)[0];
  const completionRate = (totalMinutes / totalTargetMinutes) * 100;

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
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-800">
      <div className="flex items-center mb-4">
        <BarChart2 size={18} className="text-purple-500 mr-2" />
        <h3 className="font-medium text-gray-800 dark:text-white">Your Learning Insights</h3>
      </div>
      
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
                      ? 'bg-gradient-to-t from-purple-500 to-purple-400' 
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
            <span className="inline-block w-3 h-3 bg-purple-500 rounded-sm mr-1"></span>
            Minutes spent learning
          </div>
          <div>
            <span className="inline-block w-4 border-t border-dashed border-gray-400 dark:border-gray-500 mr-1"></span>
            Daily target (30 min)
          </div>
        </div>
      </div>
      
      {/* Weekly summary */}
      <div className="mt-6 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-300">This week</div>
            <div className="text-xl font-semibold text-gray-800 dark:text-white">{totalMinutes} minutes</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {avgMinutesPerDay.toFixed(0)} minutes daily average
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
                className="text-purple-500 stroke-current" 
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
                <span className="text-sm font-bold text-gray-700 dark:text-white">{completionRate.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning insights */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {insights.map((insight, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
            <div className="flex items-center text-purple-500 mb-2">
              <insight.icon size={14} className="mr-1" />
              <div className="text-xs">{insight.title}</div>
            </div>
            <div className="font-medium text-gray-800 dark:text-white">{insight.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{insight.description}</div>
          </div>
        ))}
      </div>
      
      {/* Personalized recommendations */}
      <div className="mt-6">
        <div className="flex items-center mb-2">
          <Zap size={14} className="text-purple-500 mr-1" />
          <div className="text-sm font-medium text-gray-800 dark:text-white">Personalized Tips</div>
        </div>
        
        <ul className="space-y-2">
          {recommendations.map((tip, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle size={14} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LearningAnalytics;