// Improved CourseCard component with consistent purple theme
import React, { useState } from 'react';

const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    // Reset the clicked state after animation completes
    setTimeout(() => setIsClicked(false), 600);
  };
  
  // Define badge color based on course type
  const getBadgeColor = (type) => {
    switch(type) {
      case 'Course': 
        return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300';
      case 'Pathway': 
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300';
      default: 
        return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300';
    }
  };

  return (
    <div 
      className={`rounded-lg p-4 transition-all duration-300 ${
        isHovered 
          ? 'bg-gradient-to-br from-purple-50 to-white dark:from-gray-700 dark:to-gray-800 shadow-md transform -translate-y-1' 
          : 'bg-white dark:bg-gray-800 shadow-sm border border-purple-50 dark:border-gray-700'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeColor(course.type)}`}>
          {course.type}
        </span>
        
        {course.action === 'Continue' && (
          <span className="flex items-center text-xs text-green-500 dark:text-green-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            In Progress
          </span>
        )}
      </div>
      
      <h3 className="font-semibold mt-2 text-gray-800 dark:text-white transition-all duration-300">
        {course.title}
      </h3>
      
      <p className="text-sm mt-4 text-gray-600 dark:text-gray-300">
        {course.description}
      </p>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{course.level}</p>
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-xs text-gray-500 dark:text-gray-400">Learners</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">
            {parseInt(course.learners).toLocaleString()}
          </p>
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-xs text-gray-500 dark:text-gray-400">Author</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{course.author}</p>
        </div>
      </div>
      
      <button 
        className={`w-full mt-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 
          ${isClicked
            ? 'bg-purple-700 text-white scale-95'
            : isHovered
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        onClick={handleClick}
      >
        <span className="inline-flex items-center">
          {course.action}
          {course.action === 'Start' && (
            <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
          {course.action === 'Continue' && (
            <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};

export default CourseCard;