// Enhanced CourseCard component with cobalt blue aesthetics
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, BookOpen, Star, Award, ChevronRight } from 'lucide-react';
import UserAvatar from './UserAvatar';

const CourseCard = ({ course, minimal = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const navigate = useNavigate();
  
  // Define badge style based on course type
  const getBadgeStyle = (type) => {
    switch(type) {
      case 'Course': 
        return 'bg-cobalt-100 dark:bg-cobalt-900/30 text-cobalt-600 dark:text-cobalt-300 border border-cobalt-200 dark:border-cobalt-800/60';
      case 'Pathway': 
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60';
      case 'Workshop': 
        return 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-300 border border-accent-200 dark:border-accent-800/60';
      default: 
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
    }
  };
  
  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);
    navigate(`/courses/${course.id || 1}`);
  };

  // If minimal is true, return a simplified version for recommendations
  if (minimal) {
    return (
      <div 
        className={`rounded-xl transition-all duration-300 overflow-hidden ${
          isPressed
            ? 'scale-98'
            : isHovered 
              ? 'shadow-soft-lg scale-102 translate-y-0'
              : 'shadow-soft'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
      >
        {/* Course card with gradient header */}
        <div className="relative">
          <div className="h-24 bg-gradient-to-r from-cobalt-400 to-cobalt-600 p-3 flex flex-col justify-between">
            <div className="flex justify-between">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeStyle(course.type)}`}>
                {course.type}
              </span>
              
              {course.isEnrolled && (
                <span className="flex items-center text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">
                  <BookOpen size={12} className="mr-1" />
                  Enrolled
                </span>
              )}
            </div>
            <h3 className="text-white font-medium line-clamp-1">{course.title}</h3>
          </div>
          
          {/* Card content */}
          <div className="p-3 bg-white dark:bg-gray-800">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
              <Clock size={12} className="mr-1" />
              <span>{course.duration || course.time || '3h 20m'}</span>
              
              <span className="mx-2">•</span>
              
              <Users size={12} className="mr-1" />
              <span>{course.enrolledCount || course.learners || '10k+'}</span>
              
              {course.rating && (
                <>
                  <span className="mx-2">•</span>
                  <Star size={12} className="mr-1 text-amber-500" />
                  <span className="text-amber-600 dark:text-amber-400">{course.rating}</span>
                </>
              )}
            </div>
            
            {/* Action button */}
            <button 
              className={`w-full py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                isHovered
                  ? 'bg-gradient-to-r from-cobalt-500 to-cobalt-600 text-white'
                  : 'bg-cobalt-50 dark:bg-cobalt-900/20 text-cobalt-600 dark:text-cobalt-400'
              }`}
            >
              {course.isEnrolled ? 'Continue' : 'Start Learning'}
              <ChevronRight size={14} className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Full-sized course card
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${
        isPressed
          ? 'scale-98 shadow-sm'
          : isHovered 
            ? 'shadow-soft-lg scale-102 translate-y-0' 
            : 'shadow-soft border border-gray-100 dark:border-gray-700'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Course card with gradient image/placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-cobalt-400 to-cobalt-600 flex items-end">
        {/* Course type badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeStyle(course.type)}`}>
            {course.type}
          </span>
        </div>
        
        {/* Enrollment badge */}
        {course.isEnrolled && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center text-xs bg-white/20 px-2 py-1 rounded-full text-white">
              <BookOpen size={12} className="mr-1" />
              In Progress
            </span>
          </div>
        )}
        
        {/* Course info */}
        <div className="w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className={`text-lg font-semibold text-white transition-all duration-300 ${
            isHovered ? 'transform translate-y-0' : ''
          }`}>
            {course.title}
          </h3>
          
          <div className="flex items-center mt-1">
            {course.rating && (
              <div className="flex items-center mr-3">
                <Star size={14} className="text-amber-400 mr-1" />
                <span className="text-xs font-medium text-white">{course.rating}</span>
              </div>
            )}
            <div className="flex items-center text-xs text-white/80">
              <Clock size={14} className="mr-1" />
              <span>{course.duration || '4h 30m'}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-5">
        {/* Instructor info */}
        <div className="flex items-center mb-4">
          <UserAvatar 
            userId={course.instructorId} 
            name={course.instructor || 'Instructor'} 
            size="sm"
          />
          <div className="ml-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white">{course.instructor || 'John Doe'}</p>
          </div>
          <div className="ml-auto">
            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Users size={14} className="mr-1" />
              {course.enrolledCount?.toLocaleString() || '0'} enrolled
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
          {course.description || 'No description available for this course.'}
        </p>
        
        {/* Course stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Level</div>
            <div className="text-sm font-medium text-gray-800 dark:text-white">{course.level || 'Beginner'}</div>
          </div>
          
          <div className="h-10 w-px bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</div>
            <div className="text-sm font-medium text-gray-800 dark:text-white">{course.duration || '3h 20m'}</div>
          </div>
          
          <div className="h-10 w-px bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Modules</div>
            <div className="text-sm font-medium text-gray-800 dark:text-white">{course.modules || 8}</div>
          </div>
        </div>
        
        {/* Progress bar if enrolled */}
        {course.isEnrolled && (
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-600 dark:text-gray-300">Progress</span>
              <span className="text-cobalt-600 dark:text-cobalt-400">{course.percentComplete || 10}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cobalt-400 to-cobalt-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${course.percentComplete || 10}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Action button */}
        <button 
          onClick={handleClick}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
            isPressed
              ? 'bg-gradient-to-r from-cobalt-600 to-cobalt-700 text-white scale-98 shadow-inner-soft'
              : isHovered
                ? 'bg-gradient-to-r from-cobalt-500 to-cobalt-600 text-white shadow-md'
                : 'bg-cobalt-500 hover:bg-cobalt-600 text-white'
          }`}
        >
          {course.isEnrolled ? 'Continue Learning' : 'Start Learning'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;