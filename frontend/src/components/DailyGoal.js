// components/DailyGoals.js
import React from 'react';
import { Award, Clock, BookOpen, CheckCircle, Target } from 'lucide-react';

const DailyGoals = () => {
  // Daily goals data
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
  const dailyRewards = [
    { milestone: 1, reward: "10 bonus points", unlocked: true },
    { milestone: 2, reward: "New badge: 'Consistent Learner'", unlocked: false },
    { milestone: 3, reward: "Unlock special content", unlocked: false }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Clock size={18} className="text-purple-500 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">Today's Learning Goals</h3>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="text-purple-500 font-medium">2</span>/3 hours until daily reset
        </div>
      </div>
      
      {/* Progress circle */}
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 100 100">
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
              strokeDashoffset="188.4" // 251.2 * 0.75 to represent 25% progress
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-700 dark:text-white">25%</span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">Complete</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Daily tasks */}
      <div className="space-y-3">
        {goals.map(goal => (
          <div key={goal.id} className="flex items-center p-2 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            <div className={`p-2 rounded-full ${
              goal.progress > 0 
                ? 'bg-purple-100 dark:bg-purple-800 text-purple-500 dark:text-purple-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
            }`}>
              <goal.icon size={16} />
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium text-gray-800 dark:text-white">{goal.title}</h4>
                <span className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full">
                  +{goal.points} pts
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{goal.description}</p>
              
              {goal.progress > 0 && (
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              {goal.timeEstimate}
            </div>
          </div>
        ))}
      </div>
      
      {/* Rewards section */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-3">
          <Award size={16} className="text-purple-500 mr-2" />
          <h4 className="text-sm font-medium text-gray-800 dark:text-white">Today's Rewards</h4>
        </div>
        
        <div className="flex justify-between items-center">
          {dailyRewards.map((reward, index) => (
            <div key={index} className="text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${
                reward.unlocked 
                  ? 'border-purple-500 bg-purple-100 dark:bg-purple-900 text-purple-500' 
                  : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
              }`}>
                <span className="text-sm font-bold">{reward.milestone}</span>
              </div>
              <p className={`text-xs mt-1 ${
                reward.unlocked 
                  ? 'text-purple-500' 
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
          <div className="absolute top-0 left-0 w-1/3 h-1 bg-purple-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Motivational message */}
      <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md text-sm text-purple-600 dark:text-purple-300 flex items-center">
        <CheckCircle size={16} className="mr-2" />
        Complete all goals today to maintain your 8-day streak!
      </div>
    </div>
  );
};

export default DailyGoals;