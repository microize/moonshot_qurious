// Improved TopicFilter component with microstimuli
import React, { useState } from 'react';

const initialTopics = [
  { name: 'Data Science', active: true },
  { name: 'Gen AI', active: false },
  { name: 'SQL', active: false },
  { name: 'Python', active: false },
  { name: 'Machine Learning', active: false },
  { name: 'Deep Learning', active: false },
];

const TopicFilter = () => {
  const [topics, setTopics] = useState(initialTopics);
  const [clickedId, setClickedId] = useState(null);
  
  const handleTopicClick = (index) => {
    // Visual feedback: Store the clicked ID briefly
    setClickedId(index);
    setTimeout(() => setClickedId(null), 300);
    
    // Update active state
    setTopics(topics.map((topic, i) => ({
      ...topic,
      active: i === index
    })));
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-6">
      {topics.map((topic, index) => (
        <button 
          key={index} 
          onClick={() => handleTopicClick(index)}
          className={`px-3 py-1 text-sm rounded-full transition-all duration-200
            ${topic.active 
              ? 'bg-purple-500 dark:bg-purple-600 text-white shadow-sm' 
              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border dark:border-gray-600'
            }
            ${clickedId === index ? 'scale-95' : 'hover:scale-105'}
            hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500
          `}
        >
          {topic.name}
          {topic.active && (
            <span className="inline-block ml-1 transform scale-75 text-purple-100">●</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TopicFilter;