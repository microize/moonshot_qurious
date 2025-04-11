// Updated AssessmentsView.js with consistent styling
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, Clock, Award } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import Card from '../components/Card';

const AssessmentsView = () => {
  const navigate = useNavigate();
  
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
      title: 'Generative AI Assessment - Basic Level',
      type: 'Certification',
      questions: 15,
      timeEstimate: '30 min',
      status: 'available'
    },
    {
      id: 4,
      title: 'Data Science Certification Exam',
      type: 'Certification',
      questions: 50,
      timeEstimate: '90 min',
      status: 'locked',
      requirement: 'Complete Python and ML courses first'
    }
  ];

  // Handler for starting an assessment
  const handleStartAssessment = (assessmentId) => {
    navigate(`/assessments/${assessmentId}`);
  };

  return (
    <PageContainer title="Assessments">
      <div className="grid gap-6">
        {assessments.map(assessment => (
          <Card key={assessment.id} className={assessment.status === 'locked' ? 'opacity-60' : ''}>
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
                onClick={() => assessment.status !== 'locked' && handleStartAssessment(assessment.id)}
              >
                {assessment.status === 'locked' ? 'Locked' : 'Start Assessment'}
              </button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card title="Upcoming Events" className="md:col-span-2">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
            <div className="text-xs text-purple-500 dark:text-purple-400">Friday • 5:00 PM</div>
            <h3 className="font-medium text-gray-800 dark:text-white mt-1">Python Coding Challenge</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Weekly competition</p>
          </div>
          
          <button className="w-full mt-4 py-2 text-sm text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
            View All Events
          </button>
        </Card>
        
        <Card title="Your Stats" icon={Award}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Completed Assessments</span>
              <span className="text-lg font-medium text-gray-800 dark:text-white">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Average Score</span>
              <span className="text-lg font-medium text-gray-800 dark:text-white">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Badges Earned</span>
              <span className="text-lg font-medium text-gray-800 dark:text-white">4</span>
            </div>
            
            <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                <span>Next achievement:</span>
                <span className="text-purple-600 dark:text-purple-400">75%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                "Assessment Master" - Complete 5 more assessments
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AssessmentsView;