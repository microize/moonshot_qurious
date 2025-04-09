// views/AssessmentsView.js
import React from 'react';
import { ClipboardCheck, Clock, Award } from 'lucide-react';

const AssessmentsView = () => {
  const assessments = [
    {
      id: 1,
      title: 'Python Fundamentals Quiz',
      type: 'Quiz',
      questions: 15,
      timeEstimate: '20 min',
      status: 'available'
    },
    {
      id: 2,
      title: 'Machine Learning Algorithms Assessment',
      type: 'Test',
      questions: 25,
      timeEstimate: '45 min',
      status: 'available'
    },
    {
      id: 3,
      title: 'Data Science Certification Exam',
      type: 'Certification',
      questions: 50,
      timeEstimate: '90 min',
      status: 'locked',
      requirement: 'Complete Python and ML courses first'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Assessments</h1>
      
      <div className="grid gap-6">
        {assessments.map(assessment => (
          <div 
            key={assessment.id} 
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md ${
              assessment.status === 'locked' ? 'opacity-60' : 'hover:-translate-y-1 cursor-pointer'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4">
                  <ClipboardCheck size={24} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{assessment.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs mr-2">
                      {assessment.type}
                    </span>
                    <span className="flex items-center mr-3">
                      <ClipboardCheck size={14} className="mr-1" />
                      {assessment.questions} questions
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {assessment.timeEstimate}
                    </span>
                  </div>
                  
                  {assessment.status === 'locked' && (
                    <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                      {assessment.requirement}
                    </p>
                  )}
                </div>
              </div>
              
              <button 
                className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                  assessment.status === 'locked'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600 text-white transition-colors'
                }`}
                disabled={assessment.status === 'locked'}
              >
                {assessment.status === 'locked' ? 'Locked' : 'Start Assessment'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-gray-800 dark:text-white">Upcoming Events</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Join these learning events</p>
          </div>
        </div>
        
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
          <div className="text-xs text-purple-500 dark:text-purple-400">Friday • 5:00 PM</div>
          <h3 className="font-medium text-gray-800 dark:text-white mt-1">Python Coding Challenge</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Weekly competition</p>
        </div>
        
        <button className="w-full mt-4 py-2 text-sm text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default AssessmentsView;