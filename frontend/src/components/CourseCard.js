// Enhanced CourseCard component with elegant design system
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, BookOpen, Star, Award, ChevronRight } from 'lucide-react';
import UserAvatar from './UserAvatar';

const CourseCard = ({ course, minimal = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Define badge style based on course type
  const getBadgeStyle = (type) => {
    switch(type) {
      case 'Course': 
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50';
      case 'Pathway': 
        return 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800/50';
      case 'Workshop': 
        return 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50';
      default: 
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
    }
  };
  
  const handleClick = () => {
    navigate(`/courses/${course.id || 1}`);
  };

  // If minimal is true, return a simplified version for recommendations
  if (minimal) {
    return (
      <div 
        className={`group bg-white dark:bg-gray-800 rounded-md overflow-hidden transition-all duration-200 border border-gray-100 dark:border-gray-700 ${
          isHovered 
            ? 'shadow-md' 
            : 'shadow-sm'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Course card header */}
        <div className="relative">
          <div className="h-32 bg-indigo-500 p-3 flex flex-col justify-between overflow-hidden">
            {/* Animated background pattern for visual interest */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" className="text-white">
                <defs>
                  <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
              </svg>
            </div>
            
            <div className="flex justify-between relative z-10">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getBadgeStyle(course.type || 'Course')}`}>
                {course.type || 'Course'}
              </span>
              
              {course.isEnrolled && (
                <span className="flex items-center text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">
                  <BookOpen size={12} className="mr-1" />
                  Enrolled
                </span>
              )}
            </div>
            
            <div className="relative z-10">
              <h3 className="text-white font-medium line-clamp-2 text-sm">{course.title || 'Course Title'}</h3>
            </div>
          </div>
          
          {/* Card content */}
          <div className="p-3">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center mr-3">
                <Clock size={12} className="mr-1" />
                <span>{course.duration || course.time || '3h 20m'}</span>
              </div>
              
              <div className="flex items-center">
                <Users size={12} className="mr-1" />
                <span>{course.enrolledCount || course.learners || '10k+'}</span>
              </div>
              
              {course.rating && (
                <div className="ml-auto flex items-center">
                  <Star size={12} className="mr-1 text-amber-500 fill-amber-500" />
                  <span className="text-amber-600 dark:text-amber-400">{course.rating}</span>
                </div>
              )}
            </div>
            
            {/* Action button */}
            <button 
              className={`w-full py-2 rounded-md text-xs font-medium transition-all duration-200
                ${isHovered
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/30'
                }`}
            >
              <span className="relative inline-flex items-center">
                <span className="mr-1.5">{course.isEnrolled ? 'Continue' : 'Start Learning'}</span>
                <ChevronRight size={14} className={`transition-transform duration-200 ${isHovered ? 'transform translate-x-0.5' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Full-sized course card
  return (
    <div 
      className={`group bg-white dark:bg-gray-800 rounded-md overflow-hidden transition-all duration-200 border border-gray-100 dark:border-gray-700
        ${isHovered 
          ? 'shadow-md' 
          : 'shadow-sm'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course card with image/placeholder */}
      <div className="relative h-52">
        {/* Background image or gradient */}
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-600 overflow-hidden">
            {/* Decorative pattern overlay */}
            <svg width="100%" height="100%" className="text-white opacity-10">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Abstract shapes for visual interest */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute top-10 -left-10 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>
        )}
        
        {/* Course type badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getBadgeStyle(course.type || 'Course')}`}>
            {course.type || 'Course'}
          </span>
        </div>
        
        {/* Level badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="flex items-center text-xs bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-white">
            {course.level || 'Beginner'}
          </span>
        </div>
        
        {/* Enrollment badge */}
        {course.isEnrolled && (
          <div className="absolute top-11 right-3 z-10">
            <span className="flex items-center text-xs bg-indigo-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-white">
              <BookOpen size={12} className="mr-1" />
              In Progress
            </span>
          </div>
        )}
        
        {/* Course info overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-12 pb-4 px-4">
          <h3 className="text-lg font-medium text-white">
            {course.title || 'Course Title'}
          </h3>
          
          <div className="flex items-center mt-2">
            {course.rating && (
              <div className="flex items-center mr-3">
                <Star size={14} className="text-amber-400 fill-amber-400 mr-1" />
                <span className="text-xs font-medium text-white">{course.rating}</span>
                <span className="text-xs text-white/70 ml-1">({course.ratingCount || '245'})</span>
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
      <div className="p-4">
        {/* Instructor info */}
        <div className="flex items-center mb-4">
          <UserAvatar 
            userId={course.instructorId} 
            name={course.instructor || 'Instructor'} 
            size="sm"
          />
          <div className="ml-2 flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
            <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
              {course.instructor || 'John Doe'}
            </p>
          </div>
          <div className="ml-2">
            <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Users size={14} className="mr-1" />
              {course.enrolledCount?.toLocaleString() || '10,521'}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
          {course.description || 'This course covers everything you need to know about this subject with practical exercises and real-world examples.'}
        </p>
        
        {/* Course stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="py-2 px-3 bg-gray-50 dark:bg-gray-750 rounded-md text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Modules</div>
            <div className="text-sm font-medium text-gray-800 dark:text-white">{course.modules || 8}</div>
          </div>
          
          <div className="py-2 px-3 bg-gray-50 dark:bg-gray-750 rounded-md text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</div>
            <div className="text-sm font-medium text-gray-800 dark:text-white">{course.duration || '3h 20m'}</div>
          </div>
          
          <div className="py-2 px-3 bg-gray-50 dark:bg-gray-750 rounded-md text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Updated</div>
            <div className="text-sm font-medium text-gray-800 dark:text-white">{course.updated || 'Dec 2024'}</div>
          </div>
        </div>
        
        {/* Progress bar if enrolled */}
        {course.isEnrolled && (
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-600 dark:text-gray-300">Progress</span>
              <span className="text-indigo-600 dark:text-indigo-400">{course.percentComplete || 25}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${course.percentComplete || 25}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1.5 text-gray-500 dark:text-gray-400">
              <span>{course.completedLessons || 2}/{course.totalLessons || 8} lessons</span>
              <span>Est. {course.remainingTime || '2h 30m'} remaining</span>
            </div>
          </div>
        )}
        
        {/* Action button */}
        <button 
          onClick={handleClick}
          className={`w-full py-2.5 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center
            ${isHovered
              ? 'bg-indigo-600 text-white'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
        >
          <span className="mr-1.5">{course.isEnrolled ? 'Continue Learning' : 'Start Learning'}</span>
          <ChevronRight size={16} className={`transition-transform duration-200 ${isHovered ? 'transform translate-x-0.5' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;