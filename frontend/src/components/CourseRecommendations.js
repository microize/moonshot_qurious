// components/CourseRecommendations.js
import React from 'react';

const topics = [
  { name: 'Data Science', active: true },
  { name: 'Gen AI', active: false },
  { name: 'SQL', active: false },
  { name: 'Python', active: false },
  { name: 'Machine Learning', active: false },
  { name: 'Deep Learning', active: false },
];

const recommendedCourses = [
  {
    type: 'Course',
    title: 'Generative AI for Developers Specialization',
    description: 'Coding with Generative AI - An Introduction. Master strategies and techniques to code with Generative AI',
    level: 'Easy',
    learners: '17770',
    author: 'Fractal',
    action: 'Start'
  },
  {
    type: 'Pathway',
    title: 'Fractal Data Science Professional Certificate',
    description: 'Launch your career in data science. Build job-ready skills and hands-on experience for an in demand career in as little as 5 months.',
    level: 'Easy',
    learners: '17770',
    author: 'Fractal',
    action: 'Start'
  },
  {
    type: 'Course',
    title: 'Generative AI for Business Consultants Specialization',
    description: 'Leverage Gen AI in Consulting Responsibly. Master Gen AI tools to speed up processes.',
    level: 'Easy',
    learners: '17770',
    author: 'Fractal',
    action: 'Continue'
  }
];

const TopicFilter = () => {
  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-6">
      {topics.map((topic, index) => (
        <span key={index} className={`px-3 py-1 text-sm rounded-full transition-colors ${
          topic.active 
            ? 'bg-gray-800 dark:bg-purple-600 text-white' 
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border dark:border-gray-600'
        }`}>
          {topic.name}
        </span>
      ))}
    </div>
  );
};

const CourseCard = ({ course }) => {
  return (
    <div className="bg-purple-50 dark:bg-gray-700 rounded-lg p-4">
      <p className="text-sm text-purple-500 dark:text-purple-400">{course.type}</p>
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
      
      <button className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md transition-colors">
        {course.action}
      </button>
    </div>
  );
};

const CourseRecommendations = () => {
  return (
    <>
      <TopicFilter />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </>
  );
};

export default CourseRecommendations;