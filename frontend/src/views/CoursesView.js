// views/CoursesView.js - Updated for consistent styling
import React, { useState } from 'react';
import { Search, Filter, BookOpen, Tag, Clock } from 'lucide-react';
import CourseRecommendations from '../components/CourseRecommendations';
import CourseProgress from '../components/CourseProgress';
import PageContainer from '../components/PageContainer';
import Card from '../components/ui/Card';

// Enhanced CourseCard with microstimuli
const CourseCard = ({ course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Define badge color based on course type
  const getBadgeColor = (type) => {
    switch(type) {
      case 'Course': 
        return 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300';
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
          ? 'bg-amber-50 dark:bg-gray-750 scale-98 shadow-sm'
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
        isHovered ? 'text-amber-700 dark:text-amber-300' : 'text-gray-800 dark:text-white'
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
        className={`w-full mt-5 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
          isPressed
            ? 'bg-amber-700 text-white scale-95 shadow-inner'
            : isHovered
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
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

// Topic Filter component with microstimuli
const TopicFilter = ({ topics, onTopicClick }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <button 
          key={topic.id} 
          onClick={() => onTopicClick(topic.id)}
          className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
            topic.active 
              ? 'bg-amber-500 text-white shadow-sm transform scale-105' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-500'
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

const CoursesView = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample topics
  const [topics, setTopics] = useState([
    { id: 1, name: 'All Topics', active: true },
    { id: 2, name: 'Data Science', active: false },
    { id: 3, name: 'Machine Learning', active: false },
    { id: 4, name: 'Python', active: false },
    { id: 5, name: 'SQL', active: false },
    { id: 6, name: 'Deep Learning', active: false },
  ]);
  
  // Sample courses
  const courses = [
    {
      id: 1,
      type: 'Course',
      title: 'Generative AI for Developers',
      description: 'Master strategies and techniques to code with Generative AI. Learn prompt engineering and how to integrate AI in your applications.',
      level: 'Intermediate',
      learners: '17,770',
      time: '4h 40m',
      action: 'Start'
    },
    {
      id: 2,
      type: 'Pathway',
      title: 'Data Science Professional Certificate',
      description: 'Launch your career in data science with job-ready skills and hands-on experience.',
      level: 'Beginner',
      learners: '24,310',
      time: '12h 30m',
      action: 'Start'
    },
    {
      id: 3,
      type: 'Course',
      title: 'Understanding Machine Learning Algorithms',
      description: 'Dive deep into the theory and implementation of machine learning algorithms from classification to clustering.',
      level: 'Intermediate',
      learners: '8,245',
      time: '5h 15m',
      action: 'Continue'
    },
    {
      id: 4,
      type: 'Workshop',
      title: 'Neural Networks and Deep Learning',
      description: 'Understand neural networks, backpropagation, and advanced optimization techniques.',
      level: 'Advanced',
      learners: '12,450',
      time: '3h 45m',
      action: 'Start'
    },
    {
      id: 5,
      type: 'Course',
      title: 'SQL for Data Analysis',
      description: 'Master advanced SQL queries to extract, transform, and analyze database data for insights.',
      level: 'Beginner',
      learners: '21,320',
      time: '2h 50m',
      action: 'Start'
    }
  ];
  
  const handleTopicClick = (topicId) => {
    setTopics(prevTopics => 
      prevTopics.map(topic => ({
        ...topic,
        active: topic.id === topicId
      }))
    );
  };
  
  return (
    <PageContainer title="Courses">
      <div className="flex items-center justify-end mb-6">
        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              activeTab === 'catalog' 
                ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400'
            }`}
            onClick={() => setActiveTab('catalog')}
          >
            Course Catalog
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              activeTab === 'mylearning' 
                ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400'
            }`}
            onClick={() => setActiveTab('mylearning')}
          >
            My Learning
          </button>
        </div>
      </div>
      
      {/* Search and filter bar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search box */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
            />
          </div>
          
          {/* Filter button */}
          <button className="px-4 py-2 flex items-center justify-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter size={18} className="mr-2" />
            <span>Filters</span>
          </button>
        </div>
        
        {/* Topic filters */}
        <div className="mt-4">
          <TopicFilter topics={topics} onTopicClick={handleTopicClick} />
        </div>
      </Card>
      
      {/* Content based on active tab */}
      {activeTab === 'catalog' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <Card title="Current Courses" icon={BookOpen}>
          <CourseProgress />
        </Card>
      )}
    </PageContainer>
  );
};

export default CoursesView;