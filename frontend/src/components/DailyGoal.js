// components/DailyGoal.js - Refined with elegant design system
import React, { useState } from 'react';
import { Award, Clock, BookOpen, CheckCircle, Target, Zap, Trophy } from 'lucide-react';
import { useFetch } from '../hooks/useApi';

const DailyGoal = () => {
  // In a real implementation, we would fetch goals from the API
  // For now using a mock endpoint that doesn't exist yet
  const { data: goalsData, loading } = useFetch('goals/daily', {}, false);
  
  // Fallback mock data if API is not ready
  const defaultGoals = [
    { 
      id: 1, 
      icon: 'book', 
      title: "Complete today's lesson", 
      description: "Finish 'Decision Trees in ML'", 
      progress: 0, 
      completed: false,
      points: 50,
      timeEstimate: "15 min"
    },
    { 
      id: 2, 
      icon: 'check', 
      title: "Practice Quiz", 
      description: "Take the Python basics quiz", 
      progress: 0, 
      completed: false,
      points: 30,
      timeEstimate: "10 min"
    },
    { 
      id: 3, 
      icon: 'target', 
      title: "Review Flashcards", 
      description: "ML terminology review", 
      progress: 75, 
      completed: false,
      points: 20,
      timeEstimate: "5 min"
    }
  ];
  
  // Use fallback data if API doesn't return anything
  const goals = goalsData?.goals || defaultGoals;

  // Today's rewards
  const defaultRewards = [
    { milestone: 1, reward: "10 bonus points", unlocked: true },
    { milestone: 2, reward: "New badge: 'Consistent Learner'", unlocked: false },
    { milestone: 3, reward: "Unlock special content", unlocked: false }
  ];
  
  // Use fallback rewards if API doesn't return anything
  const dailyRewards = goalsData?.rewards || defaultRewards;
  
  // Map icon string to component
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'book': return BookOpen;
      case 'check': return CheckCircle;
      case 'target': return Target;
      case 'zap': return Zap;
      default: return BookOpen;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Clock size={18} className="text-indigo-500 dark:text-indigo-400 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">Today's Learning Goals</h3>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">2</span>/3 hours until reset
        </div>
      </div>
      
      {/* Progress circle - enhanced design with larger circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          {/* Background gradient for added depth */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 shadow-inner"></div>
          
          {/* Background circle */}
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 100 100">
            <circle 
              className="text-gray-200/60 dark:text-gray-700/60 stroke-current" 
              strokeWidth="10" 
              cx="50" 
              cy="50" 
              r="38" 
              fill="transparent"
            />
            
            {/* Multiple progress segments with different colors for visual interest */}
            <circle 
              className="text-indigo-400 stroke-current" 
              strokeWidth="10" 
              strokeLinecap="round" 
              cx="50" 
              cy="50" 
              r="38" 
              fill="transparent"
              strokeDasharray="238.8"
              strokeDashoffset="179.1" // 75% complete (238.8 * 0.75)
              transform="rotate(-90 50 50)"
            >
              <animate 
                attributeName="stroke-dashoffset" 
                from="238.8" 
                to="179.1" 
                dur="1s" 
                fill="freeze" 
                calcMode="spline"
                keySplines="0.19 1 0.22 1"
              />
            </circle>
            
            {/* Add subtle highlight effect */}
            <circle 
              className="text-indigo-300 stroke-current" 
              strokeWidth="2" 
              cx="50" 
              cy="50" 
              r="43" 
              fill="transparent"
              strokeDasharray="270"
              strokeDashoffset="202.5" // 75% complete (270 * 0.75)
              transform="rotate(-90 50 50)"
              opacity="0.3"
            />
          </svg>
          
          {/* Inner content with shadow for depth */}
          <div className="absolute inset-4 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center">
            <div className="text-center">
              <div className="relative">
                <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-500 text-transparent bg-clip-text">25%</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily tasks */}
      <div className="space-y-3">
        {goals.map(goal => {
          const Icon = getIcon(goal.icon);
          return (
            <div key={goal.id} className="flex items-center p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className={`p-2 rounded-full ${
                goal.progress > 0 
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              }`}>
                <Icon size={16} />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white">{goal.title}</h4>
                  <span className="text-xs inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                    +{goal.points} pts
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{goal.description}</p>
                
                {goal.progress > 0 && (
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
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
          <Trophy size={16} className="text-indigo-500 dark:text-indigo-400 mr-2" />
          <h4 className="text-sm font-medium text-gray-800 dark:text-white">Today's Rewards</h4>
        </div>
        
        <div className="flex justify-between items-center">
          {dailyRewards.map((reward, index) => (
            <div key={index} className="text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${
                reward.unlocked 
                  ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-400' 
                  : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
              }`}>
                <span className="text-sm font-bold">{reward.milestone}</span>
              </div>
              <p className={`text-xs mt-1 ${
                reward.unlocked 
                  ? 'text-indigo-500 dark:text-indigo-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {reward.reward.length > 15 ? reward.reward.substring(0, 15) + '...' : reward.reward}
              </p>
            </div>
          ))}
        </div>
        
        {/* Progress bar connecting the milestones */}
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-1/3 h-1 bg-indigo-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Motivational message */}
      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md text-sm text-indigo-700 dark:text-indigo-300 flex items-center">
        <CheckCircle size={16} className="mr-2" />
        Complete all goals today to maintain your 8-day streak!
      </div>
    </div>
  );
};

export default DailyGoal;