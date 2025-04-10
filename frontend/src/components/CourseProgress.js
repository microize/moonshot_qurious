import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const ProgressCard = ({ course, onContinue }) => {
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

  return (
    <div className="bg-purple-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-purple-200 rounded-md">
          <div className="text-purple-700">
            {icons[course.icon]}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-purple-900">{course.title}</h3>
          <div className="text-sm text-purple-600 mt-1">{getTimeBasedMessage(course.lastActivity)}</div>
          
          {/* Progress bar */}
          <div className="mt-3 mb-2">
            <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-300 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-purple-600 mt-1">
              <span>{course.completed}/{course.total} Lessons</span>
              <span>{course.progress}% Complete</span>
            </div>
          </div>
          
          {/* Next lesson prompt */}
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm">
              <span className="text-purple-600">Next: </span>
              <span className="font-medium text-purple-800">{course.nextLesson}</span>
            </div>
            <button 
              className="px-3 py-1 bg-purple-400 hover:bg-purple-500 text-white text-sm rounded-md transition-colors"
              onClick={() => onContinue(course.id)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      
      {/* Time indicator */}
      <div className="mt-3 text-xs text-purple-500 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Last activity: {course.lastActivity}
      </div>
    </div>
  );
};

const CourseProgress = () => {
  const navigate = useNavigate();
  
  // Handle continue button click
  const handleContinue = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="p-2 rounded-xl">
      <div className="space-y-4">
        {progressCourses.map((course, index) => (
          <ProgressCard key={index} course={course} onContinue={handleContinue} />
        ))}
        
        {/* "Explore more courses" prompt */}
        <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 border border-dashed border-purple-300 text-purple-600 rounded-md hover:bg-purple-200/50 transition-colors"
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