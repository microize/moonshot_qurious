// src/components/ui/MetricCard.js
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({ label, value, icon: Icon, trend = 'neutral', color = 'blue' }) => {
  const colorMap = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  };

  const renderTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />;
    } else if (trend === 'down') {
      // For metrics where down is good (like "Time-to-Proficiency")
      const isPositive = label.includes('Risk') || label.includes('Gap') || label.includes('Time-to');
      return (
        <TrendingDown 
          className={`h-4 w-4 ${isPositive 
            ? 'text-emerald-500 dark:text-emerald-400' 
            : 'text-rose-500 dark:text-rose-400'}`} 
        />
      );
    }
    return <Minus className="h-4 w-4 text-gray-400 dark:text-gray-500" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorMap[color]} mr-3`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{value}</p>
            <div className="ml-2">
              {renderTrendIcon()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;