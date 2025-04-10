// views/CourseContentView.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseContentView = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedContentType, setSelectedContentType] = useState('text');
  
  // This would normally come from an API call using the courseId
  const courseData = {
    title: "Generative AI for Developers Specialization",
    instructor: "Qurty",
    description: "Welcome to the Generative AI for Developers Specialization course. You can explore the course content, learning outcomes, skills you'll gain, and testimonials anytime by clicking the floating menu icon at the bottom."
  };

  // This function would be called when a user clicks on a navigation item
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
        {/* Header with course icon and title */}
        <div className="flex items-center justify-center mb-6">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/40 mr-3">
            <svg viewBox="0 0 24 24" width="24" height="24" className="text-purple-600 dark:text-purple-300">
              <path fill="currentColor" d="M12,15a4,4,0,0,0,4-4,1,1,0,0,0-2,0,2,2,0,0,1-4,0,1,1,0,0,0-2,0A4,4,0,0,0,12,15Z M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {courseData.title}
          </h1>
        </div>

        {/* Course introduction */}
        <div className="mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Hi, I'm <span className="text-purple-600 dark:text-purple-400 font-medium">{courseData.instructor}</span>! Welcome to the <span className="text-purple-600 dark:text-purple-400 font-medium">Generative AI for Developers Specialization</span> course. You can explore the course content, learning outcomes, skills you'll gain, and testimonials anytime by clicking the floating menu icon at the bottom.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            We're skipping the traditional MOOC interface! Instead, you'll experience a seamless, chat-based learning journey where videos play one after another right here. If you ever feel stuck, simply pause the video and ask me questions.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            Once you finish a video, you can move to the next one or ask me to take notes on a particular topic. No distractions - just smooth, interactive learning.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            I'm excited -are you? Let's dive in! If you're excited too, type <span className="text-purple-600 dark:text-purple-400 font-medium">start</span> and we'll begin our journey together!
          </p>
        </div>

        {/* Start button */}
        <div className="flex items-center justify-center mt-10 mb-6">
          <div className="relative">
            <img 
              src="/api/placeholder/40/40" 
              alt="User Avatar" 
              className="w-8 h-8 rounded-full mr-3"
            />
          </div>
          <div className="w-full max-w-2xl">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
              <input 
                type="text" 
                placeholder="Start"
                className="w-full bg-transparent border-none focus:outline-none text-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* First lesson */}
        <div className="mt-12">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/40 mr-3">
              <svg viewBox="0 0 24 24" width="16" height="16" className="text-purple-600 dark:text-purple-300">
                <path fill="currentColor" d="M12,15a4,4,0,0,0,4-4,1,1,0,0,0-2,0,2,2,0,0,1-4,0,1,1,0,0,0-2,0A4,4,0,0,0,12,15Z M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
              </svg>
            </div>
            <p className="text-gray-700 dark:text-gray-200">Let's begin by exploring a fundamental question: What is GenAI?</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 ml-10 mt-1">Below is a video that introduces the concept. As you watch, feel free to pause and ask any questions.</p>
        </div>

        {/* Video player placeholder */}
        <div className="mt-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-64 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 dark:text-gray-400">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
        </div>

        {/* Learning content options */}
        <div className="mt-8 overflow-x-auto">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {['Normal', 'Express', 'Classic', 'Revision', 'Challenge', 'Hands-On', 'Voice'].map((type) => (
              <button 
                key={type}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedContentType === type.toLowerCase() 
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400'
                }`}
                onClick={() => setSelectedContentType(type.toLowerCase())}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Input for user interaction */}
        <div className="flex items-center mt-8">
          <div className="relative">
            <img 
              src="/api/placeholder/40/40" 
              alt="User Avatar" 
              className="w-8 h-8 rounded-full mr-3"
            />
          </div>
          <div className="w-full">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ready to level up your skills? Let's start learning!"
                className="w-full p-3 pl-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <button className="text-purple-500 p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                </button>
                <button className="text-purple-500 p-1 ml-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContentView;