// views/CoursesView.js
import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, ChevronRight, Sparkles, Award, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';

// Simplified CourseCard with only essential styling
const CourseCard = ({ course }) => {
  const badgeColors = {
    'Course': 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
    'Pathway': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
    'Workshop': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300',
    'default': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
  };

  return (
    <div className="rounded-xl p-6 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
      <div className="flex justify-between">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColors[course.type] || badgeColors.default}`}>
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
      
      <h3 className="font-semibold mt-3 text-gray-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
        {course.title}
      </h3>
      
      <p className="text-sm mt-4 text-gray-600 dark:text-gray-300 line-clamp-2">
        {course.description}
      </p>
      
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
          <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
          <p className="text-sm text-gray-700 dark:text-gray-200">{course.time || '3h 20m'}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-5">
        <button className="w-full py-2 rounded-lg text-white bg-amber-500 hover:bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-md transition-all duration-200 flex items-center justify-center">
          <span>{course.action}</span>
          <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Simplified Topic Filter
const TopicFilter = ({ topics, onTopicClick }) => (
  <div className="flex flex-wrap gap-2">
    {topics.map((topic) => (
      <button 
        key={topic.id} 
        onClick={() => onTopicClick(topic.id)}
        className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
          topic.active 
            ? 'bg-amber-500 text-white' 
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-amber-50'
        }`}
      >
        {topic.name}
        {topic.active && <span className="inline-block ml-1">●</span>}
      </button>
    ))}
  </div>
);

// Streamlined CourseSection component that works for both Featured and All Courses
const CourseSection = ({ title, icon, courses, limit }) => {
  const Icon = icon;
  const displayCourses = limit ? courses.slice(0, limit) : courses;
  
  return (
    <div className="mb-6 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-md border border-dashed border-gray-300 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-amber-400 flex items-center">
          <Icon size={20} className="mr-2 text-amber-500 dark:text-amber-400" />
          {title}
        </h2>
        
        {limit && (
          <button className="text-sm px-3 py-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all">
            View All
            <ChevronRight size={16} className="ml-1 inline" />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

// Simplified CourseProgress component
const CourseProgress = ({ courses }) => (
  <div className="space-y-4">
    {courses.map(course => (
      <div key={course.id} className="p-4 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition-all flex flex-col">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-800 dark:text-white">{course.title}</h3>
          <span className="text-sm text-amber-600 dark:text-amber-400">{course.progress}%</span>
        </div>
        
        <div className="mt-3 mb-2">
          <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <div className="mt-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">Next: <span className="text-gray-700 dark:text-gray-200">{course.nextModule}</span></div>
          </div>
        </div>
        
        <div className="mt-auto pt-3 flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <Clock size={14} className="mr-1.5 text-amber-500 dark:text-amber-400" />
            Last activity: {course.lastActivity}
          </div>
          <button className="px-3 py-1.5 rounded-lg text-sm text-white bg-amber-500 hover:bg-amber-600 transition-colors">
            Continue
            <ChevronRight size={16} className="ml-1 inline" />
          </button>
        </div>
      </div>
    ))}
  </div>
);

// Stats component simplified
const Stats = () => {
  const stats = [
    { icon: BookOpen, title: "Total Courses", value: "250+", change: "+12 this month" },
    { icon: Award, title: "Certificates", value: "45", change: "Available to earn" },
    { icon: TrendingUp, title: "Trending", value: "Data Science", change: "Most popular category" }
  ];
  
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700">
            <div className="flex items-center text-amber-500 dark:text-amber-400 mb-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-2">
                <Icon size={16} />
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</div>
            </div>
            <div className="font-semibold text-gray-800 dark:text-white text-xl">{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.change}</div>
          </div>
        );
      })}
    </div>
  );
};

// Main CoursesView component
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
    },
    {
      id: 6,
      type: 'Pathway',
      title: 'Machine Learning Engineer Path',
      description: 'Complete curriculum to become a professional Machine Learning Engineer with hands-on projects.',
      level: 'Intermediate',
      learners: '9,845',
      time: '25h 15m',
      action: 'Start'
    }
  ];
  
  // Sample in-progress courses
  const inProgressCourses = [
    {
      id: 1,
      title: "Understanding Machine Learning Algorithms",
      progress: 45,
      lastActivity: "2 hours ago",
      nextModule: "Decision Trees & Random Forests"
    },
    {
      id: 2,
      title: "Python for Data Analysis",
      progress: 72,
      lastActivity: "Yesterday",
      nextModule: "Working with Pandas"
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-600 dark:text-gray-300 flex items-center">
          Courses
        </h1>
        
        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg shadow-sm">
          <button 
            className={`px-4 py-2 text-sm rounded-md transition-all ${
              activeTab === 'catalog' 
                ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
            }`}
            onClick={() => setActiveTab('catalog')}
          >
            Course Catalog
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-md transition-all ${
              activeTab === 'mylearning' 
                ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
            }`}
            onClick={() => setActiveTab('mylearning')}
          >
            My Learning
          </button>
        </div>
      </div>
      
      {/* Only show statistics in catalog view */}
      {activeTab === 'catalog' && <Stats />}
      
      {/* Search and filter bar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search box */}
          <div className="relative w-full">
            {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div> */}
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          {/* Filter button */}
          <button className="px-4 py-2 flex items-center justify-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            {/* <Filter size={18} className="mr-2" /> */}
            <span>Search</span>
          </button>
        </div>
        
        {/* Topic filters */}
        <div className="mt-4">
          <TopicFilter topics={topics} onTopicClick={handleTopicClick} />
        </div>
      </Card>
      
      {/* Content based on active tab */}
      {activeTab === 'catalog' ? (
        <>
          {/* Featured courses section */}
          <CourseSection 
            title="Featured Courses" 
            icon={Sparkles} 
            courses={courses.filter(course => course.type === 'Course')} 
            limit={3} 
          />
          
          {/* All courses grid */}
          <CourseSection 
            title="All Courses" 
            icon={BookOpen} 
            courses={courses} 
          />
        </>
      ) : (
        <Card title="My Learning Path" icon={BookOpen}>
          <CourseProgress courses={inProgressCourses} />
        </Card>
      )}
    </div>
  );
};

export default CoursesView;