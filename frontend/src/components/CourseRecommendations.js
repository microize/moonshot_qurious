// components/CourseRecommendations.js
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
    topics: ['Gen AI', 'Data Science']
  },
  {
    id: 4,
    type: 'Course',
    title: 'Deep Learning Fundamentals',
    description: 'Understand neural networks, backpropagation, and advanced optimization techniques.',
    level: 'Intermediate',
    learners: '12,450',
    author: 'Fractal',
    action: 'Start',
    topics: ['Deep Learning', 'Machine Learning']
  },
  {
    id: 5,
    type: 'Course',
    title: 'SQL for Data Analysis',
    description: 'Master advanced SQL queries to extract, transform, and analyze database data for insights.',
    level: 'Intermediate',
    learners: '21,320',
    author: 'Fractal',
    action: 'Start',
    topics: ['SQL', 'Data Science']
  }
];

const TopicFilter = ({ topics, onTopicClick }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-6">
      {topics.map((topic) => (
        <button 
          key={topic.id} 
          onClick={() => onTopicClick(topic.id)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            topic.active 
              ? 'bg-gray-800 dark:bg-amber-600 text-white' 
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border dark:border-gray-600'
          }`}
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
};

const CourseCard = ({ course, onActionClick }) => {
  return (
    <div className="bg-amber-50 dark:bg-gray-700 rounded-lg p-4">
      <p className="text-sm text-amber-500 dark:text-amber-400">{course.type}</p>
      <h3 className="font-semibold mt-1 text-gray-800 dark:text-white">{course.title}</h3>
      
      <p className="text-sm mt-4 text-gray-600 dark:text-gray-300">{course.description}</p>
      
      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{course.level}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Learners</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{course.learners}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Author</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{course.author}</p>
        </div>
      </div>
      
      <button 
        onClick={() => onActionClick(course)}
        className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md transition-colors"
      >
        {course.action}
      </button>
    </div>
  );
};

const CourseRecommendations = () => {
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
    alert(`You clicked ${course.action} on "${course.title}"`);
  };

  return (
    <>
      <TopicFilter topics={topics} onTopicClick={handleTopicClick} />
      
      {isLoading ? (
        <div className="py-12 flex justify-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-amber-600 rounded-full animate-spin"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-300">
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
    </>
  );
};

export default CourseRecommendations;