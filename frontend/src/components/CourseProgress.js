// src/components/CourseProgress.js - Updated with navigation to CourseChat
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

// Sample course progress data - this would normally come from an API or props
const progressCourses = [
  {
    id: 1,
    icon: "brain",
    title: "Understanding Machine Learning Algorithms",
    message: "Great start - Keep up the momentum!",
    progress: 10, // percentage
    completed: 1,
    total: 10,
    lastActivity: "2 hours ago",
    nextLesson: "Decision Trees and Random Forests"
  },
  {
    id: 2,
    icon: "code",
    title: "Introduction to coding with Python",
    message: "Just 5 more Lessons to go - you're almost at the finish line!",
    progress: 50, // percentage
    completed: 5,
    total: 10,
    lastActivity: "Yesterday",
    nextLesson: "Working with Data Structures"
  }
];

// ProgressCard component for individual course progress items
const ProgressCard = ({ course, onContinue }) => {
  // Icons mapping
  const icons = {
    brain: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  };

  // Time-based motivational messages
  const getTimeBasedMessage = (lastActivity) => {
    if (lastActivity === "2 hours ago") {
      return "Great momentum today! Keep it up!";
    } else if (lastActivity === "Yesterday") {
      return "Welcome back! Pick up where you left off.";
    }
    return "Continue your learning journey!";
  };
  
  // Handle click events properly
  const handleButtonClick = (e) => {
    e.stopPropagation();
    onContinue(course.id);
  };

  return (
    <div 
      className="rounded-lg p-4 border border-gray-100 dark:border-gray-700"
      onClick={() => onContinue(course.id)}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-md text-amber-700 dark:text-amber-300">
          {icons[course.icon]}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800 dark:text-white">{course.title}</h3>
          <div className="text-sm text-amber-600 dark:text-amber-400 mt-1">{getTimeBasedMessage(course.lastActivity)}</div>
          
          {/* Progress bar */}
          <div className="mt-3 mb-2">
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{course.completed}/{course.total} Lessons</span>
              <span>{course.progress}% Complete</span>
            </div>
          </div>
          
          {/* Next lesson prompt */}
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Next: </span>
              <span className="font-medium text-gray-700 dark:text-gray-200">{course.nextLesson}</span>
            </div>
            <button 
              className="px-3 py-1 bg-amber-500 text-white text-sm rounded-md flex items-center"
              onClick={handleButtonClick}
            >
              Continue
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>      
      {/* Time indicator */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center">
        <Clock size={14} className="mr-1" />
        Last activity: {course.lastActivity}
      </div>
    </div>
  );
};

const CourseProgress = () => {
  const navigate = useNavigate();
  
  // Handle continue button click - Navigate to CourseContentView with CourseChat
  const handleContinue = (courseId) => {
    // Navigate to the course content view which contains the CourseChat component
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="rounded-xl">
      <div className="space-y-4">
        {progressCourses.map((course, index) => (
          <ProgressCard key={index} course={course} onContinue={handleContinue} />
        ))}
        
        {/* "Explore more courses" prompt */}
        <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 border border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 rounded-md"
            onClick={() => navigate('/courses')}
          >
            Discover more courses to continue your learning journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;