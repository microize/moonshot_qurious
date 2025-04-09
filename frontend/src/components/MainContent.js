// components/MainContent.js
import React from 'react';
import UserHeader from './UserHeader';
import CourseProgress from './CourseProgress';
import CourseRecommendations from './CourseRecommendations';

const MainContent = () => {
  return (
    <div className="flex-1 p-1">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-purple-200 dark:border-purple-600 min-h-full p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Good Morning, Sripathi</h1>
          <UserHeader />
        </div>
        
        <div className="mt-6">
          <p className="text-purple-500 dark:text-purple-400">Continue Learning</p>
          <CourseProgress />
          
          <div className="mt-8">
            <p className="text-purple-500 dark:text-purple-400">Recommendations</p>
            <CourseRecommendations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;