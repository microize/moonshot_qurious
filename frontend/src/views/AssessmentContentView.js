import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle, XCircle, ArrowRight, BarChart,
  HelpCircle, User, MessageSquare, SendHorizontal,
  BookOpen, Award, FileText, ChevronRight, Clock,
  Bot, Info, Search
} from 'lucide-react';

/**
 * Improved Assessment Component matching CourseChat design aesthetic
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
  // Use ref to track initialization status
  const isInitialized = useRef(false);

  // Assessment metadata (would come from API in real app)
  const assessmentData = {
    id: assessmentId || '123',
    title: "AI Fundamentals Assessment",
    instructor: "Alex",
    totalQuestions: 15, // NOTE: This doesn't match the length of the 'questions' array below. Using questions.length later is better.
    passingScore: 70,
    description: "This assessment evaluates your understanding of AI concepts. It includes a mix of multiple-choice, short answer, and coding questions. Take your time and answer thoughtfully.",
    skillAreas: ["Machine Learning", "Neural Networks", "AI Ethics"]
  };

  // Questions data (would come from API in real app) - Only 5 questions provided
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
      correctOption: 3, // Index 3 -> "Quadratic Function"
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
      correctOption: 1, // Index 1 -> "Naive Bayes"
      points: 5,
      difficulty: "basic"
    }
  ];
  // Actual number of questions based on data provided
  const actualTotalQuestions = questions.length;


  // ---------- MESSAGE HANDLING ----------
  // Define these functions with useCallback to prevent recreating them on every render
  const addUserMessage = useCallback((content) => {
    const newMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
  }, []);

  const addAssistantMessage = useCallback((messageData) => {
    const newMessage = {
      id: messageData.id || `assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: 'assistant',
      timestamp: new Date(),
      ...messageData
    };

    setMessages(prev => [...prev, newMessage]);
  }, []);

  // ---------- LIFECYCLE & EFFECTS ----------
  // Initialize component once - CORRECTED VERSION
  useEffect(() => {
    // Only run initialization once
    if (isInitialized.current) {
        console.log("Initialization useEffect skipped - already initialized."); // Optional logging
        return;
    }
    console.log("Running initialization useEffect..."); // Optional logging
    isInitialized.current = true;

    // Clear any existing messages
    setMessages([]);

    // Add initial welcome message
    const initializeMessages = async () => {
      console.log("Adding welcome message 1..."); // Optional logging
      addAssistantMessage({
        id: 'welcome-1',
        // Using actualTotalQuestions based on the array length
        content: `Hi, I'm ${assessmentData.instructor}! Welcome to the ${assessmentData.title}. I'll be guiding you through ${actualTotalQuestions} engaging questions designed to assess your knowledge.`,
        isIntro: true
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      console.log("Adding welcome message 2..."); // Optional logging
      addAssistantMessage({
        id: 'welcome-2',
        content: assessmentData.description,
        isIntro: true
      });

      await new Promise(resolve => setTimeout(resolve, 500));
      console.log("Adding welcome message 3..."); // Optional logging
      addAssistantMessage({
        id: 'welcome-3',
        content: "When you're ready to begin, simply type 'start' and we'll get going.",
        isIntro: true,
        showStartButton: true
      });
    };

    initializeMessages();

    // THE PROBLEMATIC CLEANUP FUNCTION HAS BEEN REMOVED HERE

  }, [assessmentData, addAssistantMessage, actualTotalQuestions]); // Added actualTotalQuestions dependency


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
    setCurrentQuestionIndex(-1); // Reset index before moving to the first question
    setMessages([]); // Clear intro messages and start fresh (optional, adjust if needed)
    setUserResponses({}); // Clear previous responses if restarting
    setScore(0); // Reset score
    setShowFeedback(false);
    setFeedbackData(null);
    setAssessmentComplete(false);

    // Add user 'start' message and bot response
    addUserMessage("start");
    addAssistantMessage({
        id: 'start-response',
        content: "Great! Let's begin the assessment. I'll present each question one at a time.",
        isTransition: true
    });

    // Need a slight delay before showing the first question AFTER the transition message
    setTimeout(() => {
        moveToNextQuestion(); // This will now move to index 0
    }, 100); // Short delay
  };

  const moveToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentResponse('');
      setShowFeedback(false); // Hide feedback from previous question

      // Add the question message
      // Use a timeout to ensure it appears after any feedback/transition messages
      setTimeout(() => {
        addAssistantMessage({
          id: `q-${questions[nextIndex].id}`,
          isQuestion: true,
          questionData: questions[nextIndex]
        });
      }, 500); // Delay before showing next question
    } else {
      // Assessment complete
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    setAssessmentComplete(true);

    // Calculate final score
    let totalPossiblePoints = 0;
    let earnedPoints = 0;

    questions.forEach(question => {
      totalPossiblePoints += question.points;
      // Ensure userResponses has an entry for the question ID before checking isCorrect
      if (userResponses[question.id] && userResponses[question.id].isCorrect) {
        earnedPoints += question.points;
      }
    });

    // Prevent division by zero if there are no questions/points
    const finalScore = totalPossiblePoints > 0
        ? Math.round((earnedPoints / totalPossiblePoints) * 100)
        : 0;
    // Set the final score state - Note: 'score' state was updated incrementally,
    // but calculating it here ensures accuracy even if incremental updates failed.
    // It might be better to only calculate at the end or ensure incremental is robust.
    // Let's use the calculated score for the final message.
    // setScore(finalScore); // Uncomment if you want to overwrite the incrementally calculated score

    // Add completion message using the accurately calculated final score
    addAssistantMessage({
      id: 'completion',
      content: `Congratulations! You've completed the assessment with a score of ${finalScore}%.`,
      isCompletion: true,
      finalScore: finalScore,
      passingScore: assessmentData.passingScore
    });

    // Add skills feedback message after a short delay
    setTimeout(() => {
      const strengths = [];
      const improvements = [];

      // Simple feedback logic based on score and responses (Placeholder)
      // This would be more sophisticated in a real app, mapping questions to skills
      if (finalScore > 80) {
        strengths.push("Overall Strong Performance");
      } else if (finalScore < assessmentData.passingScore) {
        improvements.push("Review Core Concepts");
      }

      if (userResponses[2] && userResponses[2].isCorrect) { // Question ID 2 (MCQ)
          strengths.push("Neural Network Basics");
      } else if (userResponses[2] && !userResponses[2].isCorrect) {
          improvements.push("Activation Functions");
      }
       if (userResponses[1] && userResponses[1].isCorrect) { // Question ID 1 (Text)
          strengths.push("Learning Types");
      } else if (userResponses[1] && !userResponses[1].isCorrect) {
           improvements.push("Supervised vs Unsupervised Learning");
      }
      // Add more sophisticated logic based on skillAreas and question mapping

      // Ensure we have some feedback to show
      if (strengths.length === 0 && finalScore >= assessmentData.passingScore) strengths.push("Good understanding demonstrated.");
      if (improvements.length === 0 && finalScore < assessmentData.passingScore) improvements.push("Further study recommended.");


      addAssistantMessage({
        id: 'feedback-summary',
        type: 'feedback', // This triggers the ResultsSummary component
        strengths: strengths,
        improvements: improvements,
        recommendedResources: [ // Placeholder resources
          "Introduction to Machine Learning (Course)",
          "Neural Networks and Deep Learning (Article)",
          "Ethics in AI (Video Series)"
        ]
      });
    }, 1500); // Increased delay for feedback summary
  };

  const handleInputChange = (e) => {
    setCurrentResponse(e.target.value);
  };

  const handleSubmitResponse = (e) => {
     // Allow calling directly with value (for MCQ buttons) or from form event
    const valueFromButton = typeof e === 'string' ? e : null;
    if (valueFromButton) {
        // Don't prevent default if it's not an event
    } else if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
    }

    const finalResponse = valueFromButton || currentResponse.trim();

    if (!finalResponse) return; // Do nothing if response is empty

    // Prevent submission if assessment not started or completed
    if (!assessmentStarted || assessmentComplete || isSubmitting) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return; // Safety check

    // Show user's response in the chat
    addUserMessage(finalResponse);

    // Clear input field only if it wasn't a button click
    if (!valueFromButton) {
        setCurrentResponse('');
    }

    // Simulate processing
    setIsSubmitting(true);

    // Process the answer
    setTimeout(() => {
      evaluateResponse(finalResponse, currentQuestion); // Pass currentQuestion
      setIsSubmitting(false);
      // Move to next question is now handled within evaluateResponse's timeout
    }, 800); // Simulate API call/evaluation time
  };


  const evaluateResponse = (response, question) => {
    // const currentQuestion = questions[currentQuestionIndex]; // Already passed as 'question'
    let isCorrect = false;
    let feedbackMessage = '';
    let selectedOptionText = ''; // For MCQ feedback

    // Evaluate based on question type
    switch (question.type) {
      case 'mcq':
        // MCQ response is the option text or number. Buttons pass number as string.
        // Let's primarily rely on the index passed from buttons.
        const selectedIndex = parseInt(response) - 1; // User input likely 1-based index

        if (selectedIndex >= 0 && selectedIndex < question.options.length) {
             selectedOptionText = question.options[selectedIndex];
             isCorrect = selectedIndex === question.correctOption;
             feedbackMessage = isCorrect
               ? `Correct! "${selectedOptionText}" is the right answer.`
               : `Not quite. The correct answer was: "${question.options[question.correctOption]}"`;
        } else {
            // Handle invalid input if typed instead of clicked
            feedbackMessage = `Please select one of the valid options (1-${question.options.length}). The correct answer was: "${question.options[question.correctOption]}"`;
            isCorrect = false; // Mark as incorrect if input is invalid
        }
        break;

      case 'text':
        // Simple substring match (case-insensitive) - improve for real app (NLP/Keywords)
        isCorrect = question.correctAnswer.toLowerCase().includes(response.toLowerCase());
        feedbackMessage = isCorrect
          ? "Great answer! You've captured the key concepts."
          : `Good attempt. A more complete answer is: "${question.correctAnswer}"`;
        break;

      case 'code':
         // Basic keyword check for demo - improve significantly for real app (linting/testing)
         const lowerResponse = response.toLowerCase();
         isCorrect = lowerResponse.includes('linear') &&
                     (lowerResponse.includes('regression') || lowerResponse.includes('fit')) &&
                     lowerResponse.includes('predict') &&
                     lowerResponse.includes('def '); // Check if it looks like a python function
         feedbackMessage = isCorrect
           ? "Your code structure seems reasonable for a linear regression function."
           : "Your solution might be missing key elements. Ensure you define a function and include fitting and prediction logic.";
         break;

      default:
        feedbackMessage = "Response recorded.";
        isCorrect = false; // Default to incorrect if type is unknown
    }

    // Store the response and correctness
    // Use functional update for setUserResponses
     setUserResponses(prev => ({
       ...prev,
       [question.id]: {
         response: response, // Store the actual user response
         isCorrect: isCorrect,
         questionType: question.type
       }
     }));

    // Update score incrementally IF correct
     if (isCorrect) {
       // Use functional update for setScore
       setScore(prev => prev + question.points);
     }

     const feedbackPayload = {
        isCorrect,
        message: feedbackMessage,
        questionPoints: question.points,
        earnedPoints: isCorrect ? question.points : 0
     };

    // Store feedback data for potential display (though chat message is primary)
    setFeedbackData(feedbackPayload);
    setShowFeedback(true); // Might not be needed if feedback is only in chat

    // Add feedback message to chat
    addAssistantMessage({
      id: `feedback-${question.id}`,
      isFeedback: true,
      isCorrect: feedbackPayload.isCorrect,
      content: feedbackPayload.message, // The feedback text
      questionPoints: feedbackPayload.questionPoints,
      earnedPoints: feedbackPayload.earnedPoints
    });

    // Move to next question after a delay to allow reading feedback
    setTimeout(() => {
      moveToNextQuestion();
    }, 3000); // Delay after showing feedback
  };

  // ---------- RENDER HELPERS ----------
  // Format time helper
  const formatTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return '--:--';
    }
    // Use Intl for better localization if needed, basic for now
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // --- QuestionDisplay Component ---
   const QuestionDisplay = ({ question, onOptionSelect }) => {
     // Determine if options should be disabled (e.g., after submission)
     // This state might need to be managed higher up if feedback appears before moving on.
     // For now, assume options are active until the next question appears.
     const isQuestionAnswered = userResponses[question.id] !== undefined;

     return (
       <div className="w-full bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
         {/* Question Header */}
         <div className="flex items-center justify-between mb-3">
           <div className="flex items-center">
             <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                 question.type === 'mcq' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' :
                 question.type === 'code' ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400' :
                 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
             }`}>
               {question.type === 'mcq' ? <HelpCircle size={16} /> :
                question.type === 'code' ? <FileText size={16} /> :
                <MessageSquare size={16} />}
             </div>
             <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
               {question.type === 'mcq' ? 'Multiple Choice' :
                question.type === 'code' ? 'Coding Challenge' :
                'Short Answer'} ({question.points} points)
             </span>
           </div>
           <div className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 capitalize">
             {question.difficulty}
           </div>
         </div>

         {/* Question Text */}
         <div className="text-gray-800 dark:text-white text-base mb-4">
           {question.text}
         </div>

         {/* Sample Input for Code Questions */}
         {question.type === 'code' && question.sampleInput && (
           <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md mb-4 font-mono text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
             <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sample Input ({question.languageHint || 'Code'}):</div>
             <pre><code>{question.sampleInput}</code></pre>
           </div>
         )}

         {/* Options for MCQ */}
         {question.type === 'mcq' && question.options && (
           <div className="space-y-2 mt-4">
             {question.options.map((option, index) => (
               <button
                 key={index}
                 // Pass the 1-based index as a string to the handler
                 onClick={() => onOptionSelect((index + 1).toString())}
                 // Disable button if already answered to prevent re-submission before moving on
                 disabled={isSubmitting || isQuestionAnswered}
                 className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center group
                           ${isSubmitting || isQuestionAnswered
                             ? 'bg-gray-100 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-70'
                             : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700'
                           }`}
               >
                 <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-xs font-medium transition-colors
                               ${isSubmitting || isQuestionAnswered
                                 ? 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-500 dark:text-gray-400'
                                 : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 group-hover:border-amber-400 group-hover:text-amber-700 dark:group-hover:border-amber-600 dark:group-hover:text-amber-300'
                               }`}>
                   {index + 1}
                 </div>
                 <span className={`transition-colors ${isSubmitting || isQuestionAnswered ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200 group-hover:text-amber-800 dark:group-hover:text-amber-200'}`}>
                   {option}
                 </span>
               </button>
             ))}
           </div>
         )}
       </div>
     );
   };


  // --- FeedbackMessage Component ---
   const FeedbackMessage = ({ isCorrect, message, points, totalPoints }) => {
     return (
       <div className={`p-4 rounded-xl shadow-md ${
         isCorrect
           ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50'
           : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50'
       }`}>
         <div className="flex items-center mb-2">
           <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
             isCorrect
               ? 'bg-green-100 dark:bg-green-800/50 text-green-600 dark:text-green-400'
               : 'bg-amber-100 dark:bg-amber-800/50 text-amber-600 dark:text-amber-400'
           }`}>
             {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
           </div>
           <h3 className={`font-medium ${
             isCorrect
               ? 'text-green-800 dark:text-green-300'
               : 'text-amber-800 dark:text-amber-300'
           }`}>
             {isCorrect ? 'Correct' : 'Review Suggestion'}
           </h3>
           <div className="ml-auto text-sm">
             <span className={`font-medium ${
               isCorrect
                 ? 'text-green-700 dark:text-green-400'
                 : 'text-amber-700 dark:text-amber-400'
             }`}>
               {points}
             </span>
             <span className="text-gray-500 dark:text-gray-400"> / {totalPoints} points</span>
           </div>
         </div>
         <p className="text-gray-700 dark:text-gray-300 pl-11 text-sm">
           {message}
         </p>
       </div>
     );
   };

   // --- ResultsSummary Component ---
    const ResultsSummary = ({ strengths, improvements, resources }) => {
     return (
       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <BarChart size={20} className="mr-2 text-amber-500" />
            Assessment Summary
         </h3>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
           {/* Strengths */}
           <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800/50">
             <h4 className="font-medium text-green-800 dark:text-green-300 flex items-center mb-2 text-sm">
               <CheckCircle size={16} className="mr-2 flex-shrink-0" />
               Strengths
             </h4>
             {strengths.length > 0 ? (
                <ul className="space-y-1 pl-7 text-sm">
                 {strengths.map((item, i) => (
                   <li key={`str-${i}`} className="text-gray-700 dark:text-gray-300 list-disc marker:text-green-500">
                     {item}
                   </li>
                 ))}
               </ul>
             ) : (
                 <p className="text-sm text-gray-500 dark:text-gray-400 pl-7">No specific strengths identified in this area.</p>
             )}
           </div>

           {/* Areas for Improvement */}
           <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/50">
             <h4 className="font-medium text-amber-800 dark:text-amber-300 flex items-center mb-2 text-sm">
               <ArrowRight size={16} className="mr-2 flex-shrink-0" />
               Areas for Improvement
             </h4>
              {improvements.length > 0 ? (
                <ul className="space-y-1 pl-7 text-sm">
                 {improvements.map((item, i) => (
                   <li key={`imp-${i}`} className="text-gray-700 dark:text-gray-300 list-disc marker:text-amber-500">
                     {item}
                   </li>
                 ))}
               </ul>
               ) : (
                 <p className="text-sm text-gray-500 dark:text-gray-400 pl-7">No specific areas for improvement identified.</p>
               )}
           </div>
         </div>

         {/* Recommended Resources */}
         <div className="mt-4">
           <h4 className="font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2 text-sm">
             <BookOpen size={16} className="mr-2 flex-shrink-0" />
             Recommended Resources
           </h4>
           {resources.length > 0 ? (
               <ul className="space-y-2 mt-2">
                 {resources.map((resource, i) => (
                   <li key={`res-${i}`} className="flex items-center group cursor-pointer">
                     <div className="flex-shrink-0 p-1 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-600 dark:text-blue-400 mr-2 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                       <FileText size={14} />
                     </div>
                     <span className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline">
                       {resource}
                     </span>
                   </li>
                 ))}
               </ul>
            ) : (
               <p className="text-sm text-gray-500 dark:text-gray-400 pl-7">No specific resources recommended at this time.</p>
            )}
         </div>

         {/* Next Steps Button */}
         <div className="mt-6 flex justify-end">
           <button
                onClick={() => navigate('/')} // Example: Navigate home or to course page
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center transition-colors shadow-sm hover:shadow-md text-sm font-medium">
             Return to Dashboard
             <ChevronRight size={16} className="ml-1" />
           </button>
         </div>
       </div>
     );
   };


   // Function to render message content based on type
    const renderMessageContent = (message) => {
     if (message.sender === 'user') {
       return (
         <div className="bg-amber-500 text-white p-3 rounded-xl rounded-br-none shadow-md max-w-full break-words">
           <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
           <div className="text-xs text-amber-100/80 mt-1.5 text-right">
             {formatTime(message.timestamp)}
           </div>
         </div>
       );
     }

     // Assistant Messages
     if (message.isQuestion) {
       return (
         <QuestionDisplay
           question={message.questionData}
           onOptionSelect={handleSubmitResponse} // Pass handler for MCQ buttons
         />
       );
     }

     if (message.isFeedback) {
       return (
         <FeedbackMessage
           isCorrect={message.isCorrect}
           message={message.content} // content holds the feedback text
           points={message.earnedPoints}
           totalPoints={message.questionPoints}
         />
       );
     }

     if (message.type === 'feedback') { // This is the final summary block
       return (
         <ResultsSummary
           strengths={message.strengths}
           improvements={message.improvements}
           resources={message.recommendedResources}
         />
       );
     }

     // Default assistant text message (intro, transitions, completion announcement)
     return (
       <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 rounded-xl rounded-bl-none shadow-md p-3 max-w-full break-words">
         <div className="whitespace-pre-wrap leading-relaxed">
           {message.content}
         </div>

         {/* Conditional Start Button */}
         {message.showStartButton && !assessmentStarted && (
           <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 flex justify-center">
             <button
               onClick={startAssessment}
               className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center font-medium text-sm"
             >
                <ChevronRight size={16} className="mr-1"/>
               Start Assessment
             </button>
           </div>
         )}

        {/* Conditional Final Score Badge */}
         {message.isCompletion && (
           <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600 flex justify-center">
             <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
               message.finalScore >= message.passingScore
                 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                 : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' // Use red for failing
             }`}>
               <Award className="mr-2" size={16} />
               Final Score: {message.finalScore}%
               {message.finalScore >= message.passingScore ? ' (Passed)' : ' (Needs Improvement)'}
             </div>
           </div>
         )}

         {/* Timestamp for non-interactive messages */}
         {!(message.isQuestion || message.type === 'feedback' || message.isFeedback) && (
            <div className="whitespace-nowrap text-xs mt-1.5 text-gray-400 dark:text-gray-500 text-left">
             {formatTime(message.timestamp)}
           </div>
         )}
       </div>
     );
   };


  // Typing indicator component
  const TypingIndicator = () => {
    if (!isSubmitting) return null; // Only show when isSubmitting is true

    return (
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white mt-1">
          <Bot size={16} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl rounded-bl-none px-4 py-3 text-sm shadow-md border border-gray-100 dark:border-gray-700/50 text-gray-500 dark:text-gray-400">
          {/* Simple dots animation */}
          <div className="flex items-center space-x-1.5">
             <span className="sr-only">Typing...</span>
             <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
             <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
             <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  };

  // ---------- MAIN RENDER ----------
  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans overflow-hidden">
      {/* Main Content with Header and Chat */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
          <div className="max-w-screen-xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Left Side: Assessment Information */}
              <div className="flex items-center gap-3 min-w-0"> {/* Added min-w-0 */}
                 <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 flex items-center justify-center text-white shadow-md">
                  <Award size={20} />
                </div>
                <div className="flex-shrink min-w-0"> {/* Added min-w-0 */}
                   <h1 className="text-base sm:text-lg font-semibold tracking-tight leading-tight truncate"> {/* Added truncate */}
                    {assessmentData.title}
                  </h1>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block truncate"> {/* Added block and truncate */}
                     {assessmentStarted && !assessmentComplete
                       ? `Question ${currentQuestionIndex + 1} of ${actualTotalQuestions} • Score: ${score}`
                       : assessmentComplete
                         ? `Completed • ${actualTotalQuestions} Questions`
                         : `${actualTotalQuestions} Questions • ${assessmentData.passingScore}% to Pass`}
                  </span>
                 </div>
              </div>

              {/* Right Side: Action Buttons & Progress */}
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                 {/* Search Button (Placeholder) */}
                 <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Search (coming soon)" disabled>
                   <Search size={18} />
                 </button>

                 {/* Info Button (Placeholder) */}
                 <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Assessment Info" onClick={() => alert(assessmentData.description)}>
                   <Info size={18} />
                 </button>

                {/* Progress Indicator (Only when assessment is active) */}
                {assessmentStarted && !assessmentComplete && (
                  <div className="hidden sm:flex items-center ml-2 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
                     <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                       <div
                         className="bg-amber-500 dark:bg-amber-400 h-1.5 rounded-full transition-all duration-500 ease-out"
                         // Ensure currentQuestionIndex doesn't go below -1
                         style={{ width: `${Math.max(0, (currentQuestionIndex + 1) / actualTotalQuestions) * 100}%` }}
                       ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50 dark:bg-gray-900" aria-live="polite">
          <div className="max-w-4xl mx-auto space-y-5">
            {/* Render all messages */}
            {messages.map(message => (
              <article
                key={message.id} // Use unique message ID
                className={`flex items-start gap-2 sm:gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Bot Avatar (only for bot messages) */}
                {message.sender === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 mt-1 self-start"> {/* Added self-start */}
                    <Bot size={16} />
                  </div>
                )}

                {/* Message Content Wrapper */}
                 <div className={`flex flex-col ${
                      message.sender === 'user' ? 'items-end' : 'items-start'
                 } ${
                    // Allow question/feedback cards to take full width needed within constraints
                    (message.isQuestion || message.type === 'feedback' || message.isFeedback)
                        ? 'w-full'
                        : 'max-w-[85%] sm:max-w-[80%]' // Max width for regular text bubbles
                 }`}>
                    {renderMessageContent(message)}
                 </div>

                {/* User Avatar */}
                {message.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-600 text-white mt-1 self-start"> {/* Added self-start */}
                    <User size={16} />
                  </div>
                )}
              </article>
            ))}

            {/* Bot Typing Indicator */}
            <TypingIndicator />

            {/* Invisible element for scrolling */}
            <div ref={messagesEndRef} style={{ height: '1px' }} />
          </div>
        </main>

        {/* Input Area Footer */}
        <footer className="bg-white dark:bg-gray-800 sticky bottom-0 z-20 border-t border-gray-200 dark:border-gray-700/50">
            {/* Only show input if assessment hasn't started or is in progress */}
            {(currentQuestionIndex >= 0 || !assessmentStarted) && !assessmentComplete && questions[currentQuestionIndex]?.type !== 'mcq' && (
                 <div className="max-w-4xl mx-auto px-4 py-3">
                     <form
                       onSubmit={handleSubmitResponse}
                       className="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-sm dark:shadow-gray-950/50 border border-gray-200 dark:border-gray-700 transition-all duration-200 focus-within:border-amber-500 dark:focus-within:border-amber-600 focus-within:ring-1 focus-within:ring-amber-500 dark:focus-within:ring-amber-600"
                     >
                       {/* Input Field */}
                       <div className="flex-1 relative">
                         <textarea
                           ref={inputRef}
                           value={currentResponse}
                           onChange={handleInputChange}
                           placeholder={
                             !assessmentStarted
                               ? "Type 'start' to begin..."
                               : assessmentComplete
                                 ? "Assessment completed."
                                 : isSubmitting
                                   ? "Evaluating..."
                                   : (questions[currentQuestionIndex]?.type === 'mcq'
                                        ? "Click an option above or type the number..." // Allow typing for MCQ too
                                        : "Type your answer here...")
                           }
                           disabled={!assessmentStarted || assessmentComplete || isSubmitting}
                           className="w-full p-3 pr-4 rounded-lg bg-gray-50 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white transition-all duration-200 resize-none overflow-y-auto border-none focus:ring-0 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                           rows={1}
                           style={{
                             minHeight: '48px', // Slightly taller
                             maxHeight: '180px'
                           }}
                           onKeyDown={(e) => {
                             if (e.key === 'Enter' && !e.shiftKey) {
                               e.preventDefault(); // Prevent newline
                               if (currentResponse.trim() && !isSubmitting) {
                                 handleSubmitResponse(e); // Submit form
                               }
                             }
                           }}
                         />
                       </div>

                       {/* Send Button */}
                       <button
                         type="submit"
                         disabled={!currentResponse.trim() || isSubmitting || !assessmentStarted || assessmentComplete}
                         className={`p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 focus:ring-amber-500
                                   ${currentResponse.trim() && !isSubmitting && assessmentStarted && !assessmentComplete
                                     ? 'bg-amber-500 hover:bg-amber-600 text-white shadow'
                                     : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                   }`}
                         aria-label="Send answer"
                       >
                         <SendHorizontal size={18} />
                       </button>
                     </form>
                 </div>
            )}
             {/* Show simple text when assessment is complete or on MCQ step where input hides */}
             {(assessmentComplete || (questions[currentQuestionIndex]?.type === 'mcq' && !assessmentComplete && assessmentStarted)) && (
                 <div className="max-w-4xl mx-auto px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400 h-[74px] flex items-center justify-center"> {/* Match height */}
                    {assessmentComplete ? "Assessment finished. See summary above." : "Please select an option above to continue."}
                 </div>
             )}
        </footer>

      </div> {/* End Main Content Flex Col */}
    </div> // End Top Level Div
  );
};

export default AssessmentContentView;