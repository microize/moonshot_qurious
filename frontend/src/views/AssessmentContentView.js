// views/AssessmentContentView.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AssessmentContentView = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  
  // This would normally come from an API call using the assessmentId
  const assessmentData = {
    title: "Generative AI Assessment - Basic Level",
    instructor: "Qurty",
    description: "Welcome to the Generative AI Assessment. I'm here to help you evaluate your GenAI knowledge with 15 engaging questions, including a few fun coding challenges. I understand that assessments can feel daunting, but take your time and remember: every question is an opportunity to learn and grow."
  };

  const questions = [
    {
      id: 1,
      text: "What is Generative AI, and how does it differ from traditional AI methods?",
      type: "text"
    }
  ];

  // Function to start assessment
  const startAssessment = () => {
    setCurrentQuestion(0);
  };

  // Handle user's answer submission
  const handleSubmitAnswer = () => {
    // In a real app, you'd store the answer and move to the next question
    setUserAnswer('');
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
        {/* Header with assessment icon and title */}
        <div className="flex items-center justify-center mb-6">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/40 mr-3">
            <svg viewBox="0 0 24 24" width="24" height="24" className="text-purple-600 dark:text-purple-300">
              <path fill="currentColor" d="M12,15a4,4,0,0,0,4-4,1,1,0,0,0-2,0,2,2,0,0,1-4,0,1,1,0,0,0-2,0A4,4,0,0,0,12,15Z M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {assessmentData.title}
          </h1>
        </div>

        {/* Assessment introduction */}
        <div className="mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Hi, I'm <span className="text-purple-600 dark:text-purple-400 font-medium">{assessmentData.instructor}</span>! Welcome to the <span className="text-purple-600 dark:text-purple-400 font-medium">Generative AI Assessment - Basic level</span>. I'm here to help you evaluate your GenAI knowledge with 15 engaging questions, including a few fun coding challenges.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            I understand that assessments can feel daunting, but take your time and remember: every question is an opportunity to learn and grow.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            If you're ready to begin, please type <span className="text-purple-600 dark:text-purple-400 font-medium">start</span> and we'll embark on this journey together!
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

        {/* First question */}
        <div className="mt-12">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/40 mr-3">
              <svg viewBox="0 0 24 24" width="16" height="16" className="text-purple-600 dark:text-purple-300">
                <path fill="currentColor" d="M12,15a4,4,0,0,0,4-4,1,1,0,0,0-2,0,2,2,0,0,1-4,0,1,1,0,0,0-2,0A4,4,0,0,0,12,15Z M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
              </svg>
            </div>
            <p className="text-gray-700 dark:text-gray-200">What is Generative AI, and how does it differ from traditional AI methods?</p>
          </div>
        </div>

        {/* User's answer */}
        <div className="mt-10 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-start">
            <img 
              src="/api/placeholder/40/40" 
              alt="User Avatar" 
              className="w-8 h-8 rounded-full mr-3 mt-1"
            />
            <div className="flex-1">
              <p className="text-gray-800 dark:text-white">
                Generative AI refers to models that create new data, such as text, images, or music, rather than just analyzing existing data. Traditional AI is more focused on classification, prediction, and decision-making based on input data.
              </p>
            </div>
          </div>
        </div>

        {/* Assessment feedback */}
        <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/40 mr-3">
              <svg viewBox="0 0 24 24" width="16" height="16" className="text-purple-600 dark:text-purple-300">
                <path fill="currentColor" d="M12,15a4,4,0,0,0,4-4,1,1,0,0,0-2,0,2,2,0,0,1-4,0,1,1,0,0,0-2,0A4,4,0,0,0,12,15Z M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
              </svg>
            </div>
            <div>
              <p className="text-purple-700 dark:text-purple-300 font-medium">Correct!</p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                You've got it! Generative AI is designed to generate new content, unlike traditional AI, which primarily focuses on analyzing or classifying existing data. Great job!
              </p>
            </div>
          </div>
        </div>

        {/* Quiz progress */}
        <div className="mt-8 flex items-center text-xs text-gray-500 dark:text-gray-400">
          <div>
            <span className="text-purple-600 dark:text-purple-400 font-medium">2</span>/15 Questions
          </div>
          <div className="ml-6">
            <span className="text-green-600 dark:text-green-400 font-medium">Score: 1</span>
          </div>
          <div className="ml-auto flex items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mr-2">Focus On</div>
            <button className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-md font-medium">
              GenAI Ethics
            </button>
          </div>
        </div>

        {/* Input for next answer */}
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
                placeholder="Challenge yourself and level up!"
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

export default AssessmentContentView;