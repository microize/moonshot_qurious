// components/LearningAnalytics.js - Fixed with fallback data
import React from 'react';
import { BarChart2, Clock, Calendar, Zap, TrendingUp, CheckCircle } from 'lucide-react';
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
    <div className="card">
      <div className="flex items-center mb-4">
        <BarChart2 size={18} className="text-primary-500 mr-2" />
        <h3 className="font-medium text-slate-800 dark:text-white">Your Learning Insights</h3>
      </div>
      
      {/* Weekly activity chart */}
      <div className="mt-4">
        <div className="flex justify-between items-end h-32 mb-1">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center w-8">
              {/* Target line */}
              <div className="w-8 border-t border-dashed border-slate-300 dark:border-slate-600 absolute" 
                   style={{ bottom: `${(day.target / 60) * 100}px` }}></div>
              
              {/* Activity bar */}
              <div className="flex-1 w-full flex items-end">
                <div 
                  className={`w-6 ${
                    day.minutes > 0 
                      ? 'bg-gradient-to-t from-primary-500 to-primary-400' 
                      : 'bg-slate-200 dark:bg-slate-700'
                  } rounded-t-sm`}
                  style={{ height: `${(day.minutes / 60) * 100}px` }}
                ></div>
              </div>
              
              {/* Day label */}
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{day.day}</div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-3">
          <div>
            <span className="inline-block w-3 h-3 bg-primary-500 rounded-sm mr-1"></span>
            Minutes spent learning
          </div>
          <div>
            <span className="inline-block w-4 border-t border-dashed border-slate-400 dark:border-slate-500 mr-1"></span>
            Daily target (30 min)
          </div>
        </div>
      </div>
      
      {/* Weekly summary */}
      <div className="mt-6 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-slate-600 dark:text-slate-300">This week</div>
            <div className="text-xl font-semibold text-slate-800 dark:text-white">{totalMinutes} minutes</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {avgMinutesPerDay} minutes daily average
            </div>
          </div>
          
          {/* Completion circle */}
          <div className="relative w-16 h-16">
            <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
              <circle 
                className="text-slate-200 dark:text-slate-700 stroke-current" 
                strokeWidth="8" 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent"
              />
              <circle 
                className="text-primary-500 stroke-current" 
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
                <span className="text-sm font-bold text-slate-700 dark:text-white">{completionRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning insights */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {insights.map((insight, index) => {
          const Icon = getIcon(insight.icon);
          return (
            <div key={index} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
              <div className="flex items-center text-primary-500 mb-2">
                <Icon size={14} className="mr-1" />
                <div className="text-xs">{insight.title}</div>
              </div>
              <div className="font-medium text-slate-800 dark:text-white">{insight.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{insight.description}</div>
            </div>
          );
        })}
      </div>
      
      {/* Personalized recommendations */}
      <div className="mt-6">
        <div className="flex items-center mb-2">
          <Zap size={14} className="text-primary-500 mr-1" />
          <div className="text-sm font-medium text-slate-800 dark:text-white">Personalized Tips</div>
        </div>
        
        <ul className="space-y-2">
          {recommendations.map((tip, index) => (
            <li key={index} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle size={14} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LearningAnalytics;