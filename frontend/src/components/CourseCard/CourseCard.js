// src/components/CourseCard/CourseCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, BookOpen, Star, ChevronRight } from 'lucide-react';

// Simple utility function to combine class names
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Badge style helper function
const getBadgeStyle = (type) => {
  switch(type) {
    case 'Course': 
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50';
    case 'Pathway': 
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50';
    case 'Workshop': 
      return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 border border-green-200 dark:border-green-800/50';
    default: 
      return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700';
  }
};

const CourseCard = ({ course, minimal = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/courses/${course.id || 1}`);
  };

  // Simplified card with amber styling - always minimal version for quick testing
  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-md overflow-hidden transition-all duration-200 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Course card header */}
      <div className="relative">
        <div className="h-32 bg-amber-500 p-3 flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between relative z-10">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-600 border border-amber-200">
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
          </div>
          
          {/* Action button */}
          <button 
            className="w-full py-2 rounded-md text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white"
          >
            <span className="relative inline-flex items-center">
              <span className="mr-1.5">{course.isEnrolled ? 'Continue' : 'Start Learning'}</span>
              <ChevronRight size={14} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;