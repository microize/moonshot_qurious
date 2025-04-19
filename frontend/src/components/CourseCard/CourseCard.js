import React, { useState } from 'react';
import { Clock, Users, BookOpen, Star, ChevronRight } from 'lucide-react';

// Simple utility function to combine class names - consistent with sidebar
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Badge style helper function with improved dark mode support
const getBadgeStyle = (type) => {
  switch(type) {
    case 'Course':
      return 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 shadow-md dark:shadow-lg shadow-pink-500/10 dark:shadow-pink-400/10';
    case 'Pathway':
      return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-md dark:shadow-lg shadow-blue-500/10 dark:shadow-blue-400/10';
    case 'Workshop':
      return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-md dark:shadow-lg shadow-green-500/10 dark:shadow-green-400/10';
    default:
      return 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md dark:shadow-lg shadow-gray-500/10 dark:shadow-gray-400/10';
  }
};

const CourseCard = ({ course, minimal = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <div
      className={classNames(
        "bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 ease-in-out border border-gray-100 dark:border-gray-700",
        isPressed ? "shadow-sm scale-98" : isHovered ? "shadow-xl translate-y-[-4px]" : "shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      role="button"
      tabIndex={0}
      aria-label={`${course.title || 'Course'} - Click to view details`}
    >
      {/* Course card header with improved styling */}
      <div className="relative">
        <div className={classNames(
          "h-32 p-4 flex flex-col justify-between overflow-hidden",
          "bg-gradient-to-br from-pink-400 to-cobalt-500 dark:from-pink-500 dark:to-cobalt-600",
          isHovered ? "bg-gradient-to-br from-pink-300 to-cobalt-400 dark:from-pink-400 dark:to-cobalt-500" : ""
        )}>
          {/* Top row with badges */}
          <div className="flex justify-between relative z-10">
            <span className={classNames(
              "text-xs font-medium px-2.5 py-1 rounded-lg transition-all duration-200",
              getBadgeStyle(course.type),
              isHovered ? "translate-y-[-2px]" : ""
            )}>
              {course.type || 'Course'}
            </span>
            
            {course.isEnrolled && (
              <span className="flex items-center text-xs bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded-lg text-gray-700 dark:text-gray-200 shadow-sm transition-all duration-200">
                <BookOpen size={14} className="mr-1.5 text-pink-500 dark:text-pink-400" />
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
          
          {/* Overlay gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        {/* Card content with consistent styling */}
        <div className="p-4 space-y-3">
          {/* Course meta information */}
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 space-x-4">
            <div className="flex items-center">
              <Clock size={14} className="mr-1.5 text-pink-500 dark:text-pink-400" />
              <span>{course.duration || course.time || '3h 20m'}</span>
            </div>
            
            <div className="flex items-center">
              <Users size={14} className="mr-1.5 text-pink-500 dark:text-pink-400" />
              <span>{course.enrolledCount || course.learners || '10k+'}</span>
            </div>
            
            {course.rating && (
              <div className="flex items-center">
                <Star size={14} className="mr-1.5 text-pink-500 dark:text-pink-400" />
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
            className={classNames(
              "w-full px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group",
              isPressed 
                ? "bg-gradient-to-r from-pink-600 to-cobalt-600 text-white shadow-inner transform scale-98" 
                : isHovered 
                  ? "bg-gradient-to-r from-pink-500 to-cobalt-500 text-white shadow-md" 
                  : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-700 dark:hover:text-pink-300"
            )}
            aria-label={course.isEnrolled ? 'Continue learning' : 'Start learning'}
          >
            <span className="relative inline-flex items-center justify-center">
              <span className="mr-1.5">{course.isEnrolled ? 'Continue' : 'Start Learning'}</span>
              <ChevronRight size={16} className={classNames(
                "transition-all duration-300 text-gray-500 dark:text-gray-500 group-hover:text-pink-500 dark:group-hover:text-pink-400",
                isHovered ? "transform translate-x-0.5" : ""
              )} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;