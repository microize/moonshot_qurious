// src/views/AssessmentContentView
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, XCircle, ArrowRight, BarChart, 
  HelpCircle, User, MessageSquare, Send
} from 'lucide-react';

// Component imports would be here in a real app
import AssessmentHeader from './AssessmentHeader';
import QuestionDisplay from './QuestionDisplay';
import ResponseInput from './ResponseInput';
import FeedbackMessage from './FeedbackMessage';
import ProgressIndicator from './ProgressIndicator';
import ResultsSummary from './ResultsSummary';

/**
 * Main assessment component that handles question flow and user responses
 * @returns {JSX.Element} The LearningAssessment component
 */
const AssessmentContentView = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  
  // ---------- STATE MANAGEMENT ----------
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for intro screen
  const [userResponses, setUserResponses] = useState({});
  const [currentResponse, setCurrentResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState([]);
  
  // Refs
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Assessment metadata (would come from API in real app)
  const assessmentData = {
    id: assessmentId || '123',
    title: "AI Fundamentals Assessment",
    instructor: "Alex",
    totalQuestions: 15,
    passingScore: 70,
    description: "This assessment evaluates your understanding of AI concepts. It includes a mix of multiple-choice, short answer, and coding questions. Take your time and answer thoughtfully.",
    skillAreas: ["Machine Learning", "Neural Networks", "AI Ethics"]
  };
  
  // Questions data (would come from API in real app)
  const questions = [
    {
      id: 1,
      type: "text",
      text: "What is the difference between supervised and unsupervised learning?",
      correctAnswer: "Supervised learning uses labeled data while unsupervised learning works with unlabeled data.",
      points: 10,
      difficulty: "basic"
    },
    {
      id: 2,
      type: "mcq",
      text: "Which of the following is NOT a common activation function in neural networks?",
      options: [
        "ReLU (Rectified Linear Unit)",
        "Sigmoid",
        "Tanh (Hyperbolic Tangent)",
        "Quadratic Function"
      ],
      correctOption: 3,
      points: 5,
      difficulty: "intermediate"
    },
    {
      id: 3,
      type: "code",
      text: "Write a Python function that uses a simple linear regression to predict values based on input data.",
      languageHint: "python",
      sampleInput: "X = [1, 2, 3, 4, 5]\nY = [2, 4, 5, 4, 5]",
      points: 15,
      difficulty: "advanced"
    },
    {
      id: 4,
      type: "text",
      text: "Explain the concept of overfitting in machine learning and mention two techniques to prevent it.",
      correctAnswer: "Overfitting occurs when a model learns the training data too well, including noise. Techniques to prevent it include regularization and cross-validation.",
      points: 10,
      difficulty: "intermediate"
    },
    {
      id: 5,
      type: "mcq",
      text: "Which algorithm is based on Bayes' theorem?",
      options: [
        "K-Means",
        "Naive Bayes",
        "Linear Regression",
        "Decision Trees"
      ],
      correctOption: 1,
      points: 5,
      difficulty: "basic"
    }
  ];
  
  // ---------- LIFECYCLE & EFFECTS ----------
  // Initialize with welcome message
  useEffect(() => {
    addAssistantMessage({
      content: `Hi, I'm ${assessmentData.instructor}! Welcome to the ${assessmentData.title}. I'll be guiding you through ${assessmentData.totalQuestions} engaging questions designed to assess your knowledge.`,
      isIntro: true
    });
    
    setTimeout(() => {
      addAssistantMessage({
        content: assessmentData.description,
        isIntro: true
      });
    }, 500);
    
    setTimeout(() => {
      addAssistantMessage({
        content: "When you're ready to begin, simply type 'start' and we'll get going.",
        isIntro: true,
        showStartButton: true
      });
    }, 1000);
  }, []);
  
  // Auto-scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSubmitting]);
  
  // Focus on input when a new question is shown
  useEffect(() => {
    if (currentQuestionIndex >= 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex]);
  
  // ---------- EVENT HANDLERS ----------
  const startAssessment = () => {
    setAssessmentStarted(true);
    moveToNextQuestion();
    
    addUserMessage("start");
    addAssistantMessage({
      content: "Great! Let's begin the assessment. I'll present each question one at a time.",
      isTransition: true
    });
  };
  
  const moveToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentResponse('');
      setShowFeedback(false);
      
      // Add the question message
      setTimeout(() => {
        addAssistantMessage({
          isQuestion: true,
          questionData: questions[nextIndex]
        });
      }, 500);
    } else {
      // Assessment complete
      completeAssessment();
    }
  };
  
  const completeAssessment = () => {
    setAssessmentComplete(true);
    
    // Calculate final score
    let totalPoints = 0;
    let earnedPoints = 0;
    
    questions.forEach(question => {
      totalPoints += question.points;
      if (userResponses[question.id] && userResponses[question.id].isCorrect) {
        earnedPoints += question.points;
      }
    });
    
    const finalScore = Math.round((earnedPoints / totalPoints) * 100);
    setScore(finalScore);
    
    // Add completion message
    addAssistantMessage({
      content: `Congratulations! You've completed the assessment with a score of ${finalScore}%.`,
      isCompletion: true,
      finalScore: finalScore,
      passingScore: assessmentData.passingScore
    });
    
    // Add skills feedback message after a short delay
    setTimeout(() => {
      const strengths = [];
      const improvements = [];
      
      // This would be more sophisticated in a real app
      if (finalScore > 80) {
        strengths.push("Machine Learning Concepts");
      } else {
        improvements.push("Machine Learning Concepts");
      }
      
      if (userResponses[3] && userResponses[3].isCorrect) {
        strengths.push("Neural Networks");
      } else {
        improvements.push("Neural Networks");
      }
      
      addAssistantMessage({
        type: 'feedback',
        strengths,
        improvements,
        recommendedResources: [
          "Introduction to Machine Learning (Course)",
          "Neural Networks and Deep Learning (Article)",
          "Ethics in AI (Video Series)"
        ]
      });
    }, 1000);
  };
  
  const handleInputChange = (e) => {
    setCurrentResponse(e.target.value);
  };
  
  const handleSubmitResponse = (e) => {
    e?.preventDefault();
    
    if (!currentResponse.trim() && !e?.target?.value) return;
    
    // Get final response (either from form or direct option selection for MCQs)
    const finalResponse = e?.target?.value || currentResponse.trim();
    
    // Show user's response in the chat
    addUserMessage(finalResponse);
    
    // Clear input field
    setCurrentResponse('');
    
    // Simulate processing
    setIsSubmitting(true);
    
    // Process the answer (would call API in real implementation)
    setTimeout(() => {
      evaluateResponse(finalResponse);
      setIsSubmitting(false);
    }, 800);
  };
  
  const evaluateResponse = (response) => {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
    let feedbackMessage = '';
    
    // Evaluate based on question type
    switch (currentQuestion.type) {
      case 'mcq':
        // For demo, assume option index matches response
        const selectedIndex = parseInt(response) - 1;
        isCorrect = selectedIndex === currentQuestion.correctOption;
        feedbackMessage = isCorrect 
          ? "Correct! That's the right answer." 
          : `Not quite. The correct answer is: ${currentQuestion.options[currentQuestion.correctOption]}`;
        break;
        
      case 'text':
        // Simple substring match for demo purposes
        // In a real app, would use more sophisticated matching
        isCorrect = currentQuestion.correctAnswer.toLowerCase().includes(response.toLowerCase());
        feedbackMessage = isCorrect 
          ? "Great answer! You've got the key concepts." 
          : `Good attempt, but not quite complete. A better answer would be: "${currentQuestion.correctAnswer}"`;
        break;
        
      case 'code':
        // For demo purposes, any code with certain keywords is correct
        // Real implementation would execute or analyze the code
        isCorrect = response.includes('linear') && 
                    (response.includes('regression') || response.includes('fit')) && 
                    response.includes('predict');
        feedbackMessage = isCorrect 
          ? "Your code looks good! It covers the key requirements of linear regression." 
          : "Your solution needs some work. Make sure you're implementing both the fitting and prediction aspects of linear regression.";
        break;
        
      default:
        feedbackMessage = "Thanks for your response.";
    }
    
    // Store the response and correctness
    setUserResponses(prev => ({
      ...prev,
      [currentQuestion.id]: {
        response,
        isCorrect,
        questionType: currentQuestion.type
      }
    }));
    
    // Update score if correct
    if (isCorrect) {
      setScore(prev => prev + currentQuestion.points);
    }
    
    // Show feedback
    setFeedbackData({
      isCorrect,
      message: feedbackMessage,
      questionPoints: currentQuestion.points,
      earnedPoints: isCorrect ? currentQuestion.points : 0
    });
    setShowFeedback(true);
    
    // Add feedback message
    addAssistantMessage({
      isFeedback: true,
      isCorrect,
      content: feedbackMessage,
      questionPoints: currentQuestion.points,
      earnedPoints: isCorrect ? currentQuestion.points : 0
    });
    
    // Move to next question after a delay
    setTimeout(() => {
      moveToNextQuestion();
    }, 3000);
  };
  
  // ---------- MESSAGE HANDLING ----------
  const addUserMessage = (content) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      content,
      timestamp: new Date()
    }]);
  };
  
  const addAssistantMessage = (messageData) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      sender: 'assistant',
      timestamp: new Date(),
      ...messageData
    }]);
  };
  
  // ---------- RENDER HELPERS ----------
  // Function to render message content based on type
  const renderMessageContent = (message) => {
    if (message.sender === 'user') {
      return (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-gray-800 dark:text-white">{message.content}</p>
        </div>
      );
    }
    
    if (message.isQuestion) {
      return (
        <QuestionDisplay 
          question={message.questionData} 
          onOptionSelect={handleSubmitResponse}
        />
      );
    }
    
    if (message.isFeedback) {
      return (
        <FeedbackMessage
          isCorrect={message.isCorrect}
          message={message.content}
          points={message.earnedPoints}
          totalPoints={message.questionPoints}
        />
      );
    }
    
    if (message.type === 'feedback') {
      return (
        <ResultsSummary
          strengths={message.strengths}
          improvements={message.improvements}
          resources={message.recommendedResources}
        />
      );
    }
    
    // Default text message
    return (
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
        <p className="text-gray-800 dark:text-white">{message.content}</p>
        
        {message.showStartButton && (
          <button 
            onClick={startAssessment}
            className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
          >
            Start Assessment
          </button>
        )}
        
        {message.isCompletion && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <span className="text-sm font-medium">
                Final Score: <span className={message.finalScore >= message.passingScore ? "text-green-600" : "text-amber-600"}>
                  {message.finalScore}%
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // ---------- MAIN RENDER ----------
  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/40 mr-3">
              <HelpCircle size={20} className="text-indigo-600 dark:text-indigo-300" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {assessmentData.title}
            </h1>
          </div>
          
          {/* Progress indicator */}
          {assessmentStarted && !assessmentComplete && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  {currentQuestionIndex + 1}
                </span>
                /{questions.length} Questions
              </span>
              <span className="mx-3">•</span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                Score: {score}
              </span>
            </div>
          )}
        </div>
      </header>
      
      {/* Main chat area */}
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Messages */}
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}
            >
              {message.sender === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br from-indigo-500 to-purple-600 mt-1">
                  <MessageSquare size={16} />
                </div>
              )}
              
              <div className={`${message.isQuestion ? 'w-full' : 'max-w-[80%]'}`}>
                {renderMessageContent(message)}
              </div>
              
              {message.sender === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white mt-1">
                  <User size={16} />
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isSubmitting && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br from-indigo-500 to-purple-600 mt-1">
                <MessageSquare size={16} />
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      {/* Input area */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmitResponse} className="relative">
            <input
              type="text"
              placeholder={
                !assessmentStarted 
                  ? "Type 'start' to begin..." 
                  : assessmentComplete 
                    ? "Assessment completed"
                    : questions[currentQuestionIndex]?.type === 'mcq'
                      ? "Type the number of your answer..."
                      : "Type your answer here..."
              }
              value={currentResponse}
              onChange={handleInputChange}
              ref={inputRef}
              disabled={!assessmentStarted || assessmentComplete || isSubmitting}
              className="w-full p-3 pl-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!assessmentStarted || assessmentComplete || isSubmitting || !currentResponse.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 p-1 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </form>
          
          {/* Assessment progress */}
          {assessmentStarted && !assessmentComplete && (
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {currentQuestionIndex + 1}
                  </span>/{questions.length}
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    Score: {score}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mr-2">Focus Area:</div>
                <div className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-md font-medium">
                  {questions[currentQuestionIndex]?.difficulty === 'basic' ? 'Fundamentals' :
                   questions[currentQuestionIndex]?.difficulty === 'intermediate' ? 'Applied Concepts' :
                   'Advanced Applications'}
                </div>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default AssessmentContentView;