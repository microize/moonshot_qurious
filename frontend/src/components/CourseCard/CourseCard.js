// src/components/CourseCard/CourseCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, BookOpen, Star, ChevronRight } from 'lucide-react';

// Simple utility function to combine class names - consistent with sidebar
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Badge style helper function with improved dark mode support
const getBadgeStyle = (type) => {
  switch(type) {
    case 'Course':
      return 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 shadow-md dark:shadow-lg shadow-amber-500/10 dark:shadow-amber-400/10';
    case 'Pathway':
      return 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 shadow-md dark:shadow-lg shadow-blue-500/10 dark:shadow-blue-400/10';
    case 'Workshop':
      return 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 shadow-md dark:shadow-lg shadow-green-500/10 dark:shadow-green-400/10';
    default:
      return 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md dark:shadow-lg shadow-gray-500/10 dark:shadow-gray-400/10';
  }
};

const CourseCard = ({ course, minimal = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/courses/${course.id || 1}`);
  };

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 ease-in-out shadow-md dark:shadow-lg dark:shadow-gray-800/50 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-gray-800/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${course.title || 'Course'} - Click to view details`}
      onKeyDown={(e) => {if (e.key === 'Enter' || e.key === ' ') handleClick()}}
    >
      {/* Course card header with improved styling */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 p-4 flex flex-col justify-between overflow-hidden">
          {/* Top row with badges */}
          <div className="flex justify-between relative z-10">
            <span className={classNames(
              "text-xs font-medium px-2 py-1 rounded-lg transition-all duration-200",
              getBadgeStyle(course.type)
            )}>
              {course.type || 'Course'}
            </span>
            
            {course.isEnrolled && (
              <span className="flex items-center text-xs bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-lg text-gray-700 dark:text-gray-200 shadow-sm transition-all duration-200">
                <BookOpen size={14} className="mr-1.5 text-amber-600 dark:text-amber-400" />
                Enrolled
              </span>
            )}
          </div>
          
          {/* Course title with drop shadow for better readability */}
          <div className="relative z-10">
            <h3 className="text-white font-medium line-clamp-2 text-sm md:text-base drop-shadow-md">
              {course.title || 'Course Title'}
            </h3>
          </div>
        </div>
        
        {/* Card content with consistent styling */}
        <div className="p-4 space-y-3">
          {/* Course meta information */}
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 space-x-4">
            <div className="flex items-center">
              <Clock size={14} className="mr-1.5 text-amber-600 dark:text-amber-400" />
              <span>{course.duration || course.time || '3h 20m'}</span>
            </div>
            
            <div className="flex items-center">
              <Users size={14} className="mr-1.5 text-amber-600 dark:text-amber-400" />
              <span>{course.enrolledCount || course.learners || '10k+'}</span>
            </div>
            
            {course.rating && (
              <div className="flex items-center">
                <Star size={14} className="mr-1.5 text-amber-600 dark:text-amber-400" />
                <span>{course.rating}</span>
              </div>
            )}
          </div>
          
          {/* Optional description - only if not minimal */}
          {!minimal && course.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {course.description}
            </p>
          )}
          
          {/* Action button with hover effects matching sidebar */}
          <button
            className="w-full px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-800 dark:hover:text-amber-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 group"
            aria-label={course.isEnrolled ? 'Continue learning' : 'Start learning'}
          >
            <span className="relative inline-flex items-center justify-center">
              <span className="mr-1.5">{course.isEnrolled ? 'Continue' : 'Start Learning'}</span>
              <ChevronRight size={16} className="transition-all duration-300 group-hover:translate-x-0.5 text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;