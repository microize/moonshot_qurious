// Updated CourseCard component with FastAPI integration
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, BookOpen, Star } from 'lucide-react';
import { courseService } from '../services/apiService';
import UserAvatar from './UserAvatar';

const CourseCard = ({ course, minimal = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [courseProgress, setCourseProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Fetch course progress if the user is enrolled
  useEffect(() => {
    if (course.isEnrolled && course.id) {
      setLoading(true);
      courseService.getCourseProgress(course.id)
        .then(data => {
          if (data && !data.error) {
            setCourseProgress(data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [course.id, course.isEnrolled]);
  
  const handleClick = () => {
    setIsClicked(true);
    // Reset the clicked state after animation completes
    setTimeout(() => setIsClicked(false), 600);
    
    // Navigate to the course content view with the course ID
    navigate(`/courses/${course.id}`);
  };
  
  // Define badge color based on course type
  const getBadgeColor = (type) => {
    switch(type) {
      case 'Course': 
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400';
      case 'Pathway': 
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400';
      case 'Workshop': 
        return 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400';
      default: 
        return 'bg-neutral-100 dark:bg-neutral-900/30 text-neutral-600 dark:text-neutral-400';
    }
  };
  
  // If minimal is true, return a simplified version for recommendations
  if (minimal) {
    return (
      <div 
        className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeColor(course.type)}`}>
            {course.type}
          </span>
          
          {course.isEnrolled && (
            <span className="flex items-center text-xs text-success-500 dark:text-success-400">
              <BookOpen size={12} className="mr-1" />
              Enrolled
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-slate-800 dark:text-white mb-1 text-sm">
          {course.title}
        </h3>
        
        <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 mt-2">
          <Clock size={12} className="mr-1" />
          <span>{course.duration || '3h 20m'}</span>
          
          <span className="mx-2">•</span>
          
          <Users size={12} className="mr-1" />
          <span>{course.enrolledCount || course.learners || '10k+'}</span>
          
          {course.rating && (
            <>
              <span className="mx-2">•</span>
              <Star size={12} className="mr-1 text-amber-500" />
              <span>{course.rating}</span>
            </>
          )}
        </div>
        
        {/* Quick action button */}
        <button 
          className="w-full mt-3 py-1.5 rounded-lg text-xs font-medium bg-primary-500 hover:bg-primary-600 text-white transition-colors"
        >
          {course.isEnrolled ? 'Continue' : 'Start'}
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`rounded-xl p-5 transition-all duration-300 ${
        isClicked
          ? 'bg-slate-50 dark:bg-slate-900 scale-98 shadow-sm'
          : isHovered 
            ? 'bg-white dark:bg-slate-800 shadow-md transform -translate-y-1' 
            : 'bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClicked(false);
      }}
    >
      <div className="flex justify-between">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeColor(course.type)}`}>
          {course.type}
        </span>
        
        {course.isEnrolled && (
          <span className="flex items-center text-xs text-success-500 dark:text-success-400">
            <BookOpen size={14} className="mr-1" />
            In Progress
          </span>
        )}
      </div>
      
      <h3 className={`font-semibold mt-3 transition-all duration-300 ${
        isHovered ? 'text-primary-700 dark:text-primary-400' : 'text-slate-800 dark:text-white'
      }`}>
        {course.title}
      </h3>
      
      <p className="text-sm mt-3 text-neutral-600 dark:text-neutral-300 line-clamp-2">
        {course.description}
      </p>
      
      {/* Author info with avatar */}
      {course.instructor && (
        <div className="flex items-center mt-4">
          <UserAvatar 
            userId={course.instructorId} 
            name={course.instructor} 
            size="xs"
          />
          <span className="ml-2 text-xs text-neutral-600 dark:text-neutral-400">
            {course.instructor}
          </span>
        </div>
      )}
      
      {/* Course stats */}
      <div className="mt-4 flex justify-between items-center">
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Level</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-200">{course.level || 'Beginner'}</p>
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Students</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-200">{course.enrolledCount || course.learners || '-'}</p>
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Duration</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-200">{course.duration || course.time || '3h 20m'}</p>
        </div>
      </div>
      
      {/* Progress bar if enrolled */}
      {course.isEnrolled && courseProgress && (
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-neutral-600 dark:text-neutral-400">Progress</span>
            <span className="text-primary-600 dark:text-primary-400">{courseProgress.percentComplete}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${courseProgress.percentComplete}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Action button */}
      <button 
        onClick={handleClick}
        className={`w-full mt-5 py-2.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 text-sm font-medium ${
          isClicked
            ? 'bg-primary-700 text-white scale-95 shadow-inner'
            : isHovered
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
        }`}
      >
        <span className="inline-flex items-center">
          {course.isEnrolled ? 'Continue Learning' : 'Start Learning'}
        </span>
      </button>
    </div>
  );
};

export default CourseCard;