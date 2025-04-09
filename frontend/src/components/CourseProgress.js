// components/CourseProgress.js
import React from 'react';

const progressCourses = [
  {
    icon: "brain",
    title: "Understanding Machine Learning Algorithms",
    message: "Great start - Keep up the momentum!",
    progress: "1/10 Lessons Completed"
  },
  {
    icon: "code",
    title: "Introduction to coding with Python",
    message: "Just 5 more Lessons to go - you're almost at the finish line!",
    progress: "5/10 Lessons Completed"
  }
];

const ProgressCard = ({ course }) => {
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

  return (
    <div className="flex items-center gap-4 border-b dark:border-gray-700 pb-4">
      <div className="p-2 bg-purple-100 dark:bg-purple-700 rounded-md">
        <div className="text-purple-600 dark:text-purple-300">
          {icons[course.icon]}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-800 dark:text-white">{course.title}</h3>
        <p className="text-sm text-purple-500 dark:text-purple-400">{course.message}</p>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {course.progress}
      </div>
    </div>
  );
};

const CourseProgress = () => {
  return (
    <div className="mt-4 space-y-4">
      {progressCourses.map((course, index) => (
        <ProgressCard key={index} course={course} />
      ))}
    </div>
  );
};

export default CourseProgress;