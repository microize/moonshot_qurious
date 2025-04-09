// EnhancedCourseRecommendations.js
import React, { useState, useEffect } from 'react';

const initialTopics = [
  { id: 1, name: 'Data Science', active: true },
  { id: 2, name: 'Gen AI', active: false },
  { id: 3, name: 'SQL', active: false },
  { id: 4, name: 'Python', active: false },
  { id: 5, name: 'Machine Learning', active: false },
  { id: 6, name: 'Deep Learning', active: false },
];

const allCourses = [
  {
    id: 1,
    type: 'Course',
    title: 'Generative AI for Developers Specialization',
    description: 'Coding with Generative AI - An Introduction. Master strategies and techniques to code with Generative AI',
    level: 'Easy',
    learners: '17,770',
    author: 'Fractal',
    action: 'Start',
    time: '4h 40m',
    topics: ['Gen AI', 'Python']
  },
  {
    id: 2,
    type: 'Pathway',
    title: 'Fractal Data Science Professional Certificate',
    description: 'Launch your career in data science. Build job-ready skills and hands-on experience for an in demand career in as little as 5 months.',
    level: 'Easy',
    learners: '17,770',
    author: 'Fractal',
    action: 'Start',
    time: '12h 30m',
    topics: ['Data Science', 'Python', 'Machine Learning']
  },
  {
    id: 3,
    type: 'Course',
    title: 'Generative AI for Business Consultants Specialization',
    description: 'Leverage Gen AI in Consulting Responsibly. Master Gen AI tools to speed up processes.',
    level: 'Easy',
    learners: '17,770',
    author: 'Fractal',
    action: 'Continue',
    time: '3h 15m',
    topics: ['Gen AI', 'Data Science']
  }
];

const TopicFilter = ({ topics, onTopicClick }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {topics.map((topic) => (
        <button 
          key={topic.id} 
          onClick={() => onTopicClick(topic.id)}
          className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
            topic.active 
              ? 'bg-purple-500 text-white shadow-sm transform scale-105' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500'
          }`}
        >
          {topic.name}
          {topic.active && (
            <span className="inline-block ml-1 opacity-75">●</span>
          )}
        </button>
      ))}
    </div>
  );
};

// Enhanced CourseCard component with microstimuli based on CoursesView
const CourseCard = ({ course, onActionClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Define badge color based on course type
  const getBadgeColor = (type) => {
    switch(type) {
      case 'Course': 
        return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300';
      case 'Pathway': 
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300';
      case 'Workshop':
        return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300';
      default: 
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    }
  };

  return (
    <div 
      className={`rounded-xl p-6 transition-all duration-300 group ${
        isPressed
          ? 'bg-purple-50 dark:bg-gray-750 scale-98 shadow-sm'
          : isHovered 
            ? 'bg-white dark:bg-gray-800 shadow-md transform -translate-y-1' 
            : 'bg-white dark:bg-gray-800 shadow-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <div className="flex justify-between">
        <span className={`text-xs font-medium px-2 py-1 rounded-full transition-all duration-300 ${
          getBadgeColor(course.type)} ${isHovered ? 'shadow-sm' : ''}`
        }>
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
      
      <h3 className={`font-semibold mt-3 transition-all duration-300 ${
        isHovered ? 'text-purple-700 dark:text-purple-300' : 'text-gray-800 dark:text-white'
      }`}>
        {course.title}
      </h3>
      
      <p className="text-sm mt-4 text-gray-600 dark:text-gray-300 line-clamp-2">
        {course.description}
      </p>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="transition-all duration-300 group-hover:scale-105">
          <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{course.level}</p>
        </div>
        <div className="transition-all duration-300 group-hover:scale-105">
          <p className="text-xs text-gray-500 dark:text-gray-400">Learners</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{course.learners}</p>
        </div>
        <div className="transition-all duration-300 group-hover:scale-105">
          <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{course.time || '3h 20m'}</p>
        </div>
      </div>
      
      <button 
        onClick={() => onActionClick(course)}
        className={`w-full mt-5 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
          isPressed
            ? 'bg-purple-700 text-white scale-95 shadow-inner'
            : isHovered
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
        }`}
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

const EnhancedCourseRecommendations = () => {
  const [topics, setTopics] = useState(initialTopics);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter courses based on active topics
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const activeTopicNames = topics
        .filter(topic => topic.active)
        .map(topic => topic.name);
      
      // If no topics are active, show all courses
      const filteredCourses = activeTopicNames.length === 0
        ? allCourses
        : allCourses.filter(course => 
            course.topics.some(topic => activeTopicNames.includes(topic))
          );
      
      setCourses(filteredCourses);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [topics]);

  const handleTopicClick = (topicId) => {
    setTopics(prevTopics => 
      prevTopics.map(topic => 
        topic.id === topicId 
          ? { ...topic, active: !topic.active }
          : topic
      )
    );
  };

  const handleCourseAction = (course) => {
    console.log(`Action clicked for: ${course.title}`);
    // Here you would handle the course action (start or continue)
    // For example, redirect to the course page:
    // navigate(`/courses/${course.id}`);
  };

  return (
    <div>
      <TopicFilter topics={topics} onTopicClick={handleTopicClick} />
      
      {isLoading ? (
        <div className="py-8 flex justify-center">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-300">
          No courses found for the selected topics. Try selecting different topics.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onActionClick={handleCourseAction}
            />
          ))}
        </div>
      )}
      
      {/* View all courses button */}
      <div className="mt-6 text-center">
        <button className="px-4 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
          Browse All Courses
        </button>
      </div>
    </div>
  );
};

export default EnhancedCourseRecommendations;