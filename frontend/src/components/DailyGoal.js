// components/DailyGoal.js - Improved with new design and FastAPI integration
import React, { useState } from 'react';
import { Award, Clock, BookOpen, CheckCircle, Target, Zap, Trophy } from 'lucide-react';
import { useFetch } from '../hooks/useApi';

const DailyGoal = () => {
  // In a real implementation, we would fetch goals from the API
  // For now using a mock endpoint that doesn't exist yet
  const { data: goalsData, loading } = useFetch('goals/daily', {}, false);
  
  // Fallback mock data if API is not ready
  const goals = goalsData?.goals || [
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

  // Today's rewards
  const dailyRewards = goalsData?.rewards || [
    { milestone: 1, reward: "10 bonus points", unlocked: true },
    { milestone: 2, reward: "New badge: 'Consistent Learner'", unlocked: false },
    { milestone: 3, reward: "Unlock special content", unlocked: false }
  ];
  
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
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Clock size={18} className="text-primary-500 mr-2" />
          <h3 className="font-medium text-slate-800 dark:text-white">Today's Learning Goals</h3>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <span className="text-primary-500 font-medium">2</span>/3 hours until daily reset
        </div>
      </div>
      
      {/* Progress circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 100 100">
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
              strokeDashoffset="188.4" // 251.2 * 0.75 to represent 25% progress
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-slate-700 dark:text-white">25%</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Complete</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily tasks */}
      {loading ? (
        <div className="flex justify-center py-6">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map(goal => {
            const Icon = getIcon(goal.icon);
            return (
              <div key={goal.id} className="flex items-center p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className={`p-2 rounded-full ${
                  goal.progress > 0 
                    ? 'bg-primary-100 dark:bg-primary-800/50 text-primary-500 dark:text-primary-300' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                }`}>
                  <Icon size={16} />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-slate-800 dark:text-white">{goal.title}</h4>
                    <span className="text-xs badge badge-primary">
                      +{goal.points} pts
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{goal.description}</p>
                  
                  {goal.progress > 0 && (
                    <div className="progress-bar mt-1.5">
                      <div 
                        className="progress-bar-value"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                <div className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                  {goal.timeEstimate}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Rewards section */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center mb-3">
          <Trophy size={16} className="text-primary-500 mr-2" />
          <h4 className="text-sm font-medium text-slate-800 dark:text-white">Today's Rewards</h4>
        </div>
        
        <div className="flex justify-between items-center">
          {dailyRewards.map((reward, index) => (
            <div key={index} className="text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${
                reward.unlocked 
                  ? 'border-primary-500 bg-primary-100 dark:bg-primary-900/50 text-primary-500' 
                  : 'border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500'
              }`}>
                <span className="text-sm font-bold">{reward.milestone}</span>
              </div>
              <p className={`text-xs mt-1 ${
                reward.unlocked 
                  ? 'text-primary-500' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {reward.reward}
              </p>
            </div>
          ))}
        </div>
        
        {/* Progress bar connecting the milestones */}
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-1/3 h-1 bg-primary-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Motivational message */}
      <div className="mt-4 bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg text-sm text-primary-600 dark:text-primary-400 flex items-center">
        <CheckCircle size={16} className="mr-2" />
        Complete all goals today to maintain your 8-day streak!
      </div>
    </div>
  );
};

export default DailyGoal;