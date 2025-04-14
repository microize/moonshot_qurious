// src/components/CourseChat/CourseChat.js
// Enhanced CourseChat component with simplified state management
import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, ChevronRight, HelpCircle, BookOpen } from 'lucide-react';

// Define constants here for simplicity (these should be moved to constants.js in a real implementation)
const CLARITY_LEVELS = {
  BASIC: 'basic',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

const LEARNING_MODES = {
  NORMAL: 'normal',
  EXPRESS: 'express',
  COMPREHENSIVE: 'comprehensive',
  REVIEW: 'review',
  ASSESSMENT: 'assessment',
  PRACTICAL: 'practical'
};

// Helper function for formatting time
const formatTime = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    return '--:--';
  }
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Enhanced CourseChat component with simplified state management
 * This version is a more standalone implementation to avoid dependency issues
 */
const CourseChat = () => {
  // Basic state management
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      content: "Welcome to the Generative AI for Developers professional learning track. This course will provide comprehensive coverage of implementing generative AI in production applications.", 
      timestamp: new Date(Date.now() - 60000 * 5)  // 5 mins ago
    },
    { 
      id: 2, 
      sender: 'bot', 
      content: "Type 'start' to begin the first module, or ask me any questions about generative AI!", 
      timestamp: new Date(Date.now() - 60000 * 4.9)  // ~4.9 mins ago
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClarity, setSelectedClarity] = useState(CLARITY_LEVELS.INTERMEDIATE);
  const [selectedLearningMode, setSelectedLearningMode] = useState(LEARNING_MODES.NORMAL);
  const [activeModePanel, setActiveModePanel] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  
  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Handle message submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: trimmedInput,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      // First video message if user types 'start'
      if (trimmedInput.toLowerCase() === 'start' && !messages.some(m => m.type === 'video')) {
        const botResponse = { 
          id: Date.now() + 1,
          sender: 'bot', 
          content: "Okay, starting Module 1: Introduction to Generative AI. Here's the first video:", 
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
        
        // Add the actual video message after a short delay
        setTimeout(() => {
          const videoMessage = {
            id: Date.now() + 2,
            sender: 'bot',
            type: 'video',
            title: "Introduction to Transformer Architecture",
            videoNumber: 1,
            totalVideos: 12,
            moduleSection: "Foundations",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            timestamp: new Date(),
            status: 'active',
            isCollapsed: false
          };
          
          setMessages(prevMessages => [...prevMessages, videoMessage]);
          setIsLoading(false);
        }, 500);
      } 
      // Video message if user asks for next video
      else if (trimmedInput.toLowerCase().includes('next video') || trimmedInput.toLowerCase().includes('continue')) {
        // Find the last video message to determine next video number
        const lastVideoMessage = [...messages].reverse().find(m => m.type === 'video');
        const nextVideoNumber = lastVideoMessage ? lastVideoMessage.videoNumber + 1 : 1;
        
        const videoMessage = {
          id: Date.now() + 1,
          sender: 'bot',
          type: 'video',
          title: `Advanced Topic ${nextVideoNumber}`,
          videoNumber: nextVideoNumber,
          totalVideos: 12,
          moduleSection: "Advanced",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          timestamp: new Date(),
          status: 'active',
          isCollapsed: false
        };
        
        setMessages(prevMessages => [...prevMessages, videoMessage]);
        setIsLoading(false);
      }
      // Standard response for other messages
      else {
        const botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          content: generateSimpleResponse(trimmedInput, selectedClarity, selectedLearningMode),
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
        setIsLoading(false);
      }
    }, 1000);
  };
  
  // Simple function to generate varied responses based on input and settings
  const generateSimpleResponse = (input, clarity, mode) => {
    let response = "";
    
    // Vary response based on clarity level
    if (clarity === CLARITY_LEVELS.BASIC) {
      response = `That's a great question about "${input}". Let me explain in simple terms. `;
      response += "Generative AI creates new content like text, images, or code based on patterns it learned during training. ";
      response += "Think of it like how a student learns from examples and then creates their own work.";
    } else if (clarity === CLARITY_LEVELS.ADVANCED) {
      response = `Regarding "${input}": From a technical perspective, `;
      response += "modern generative AI systems like transformers use self-attention mechanisms to process contextual relationships between tokens in the input. ";
      response += "This architecture enables the model to generate coherent and contextually appropriate outputs by leveraging learned statistical patterns from massive training datasets.";
    } else { // Intermediate (default)
      response = `About "${input}": `;
      response += "Generative AI models work by processing and learning patterns from large amounts of training data. ";
      response += "When given a prompt or partial input, they predict the most likely continuation based on these learned patterns. ";
      response += "The quality depends on factors like model size, training data, and how well the prompt is constructed.";
    }
    
    // Add mode-specific elements
    if (mode === LEARNING_MODES.COMPREHENSIVE) {
      response += " I can provide more detailed examples if you're interested in exploring this topic further.";
    } else if (mode === LEARNING_MODES.EXPRESS) {
      response += " That covers the key points concisely. Let me know if you need clarification.";
    } else if (mode === LEARNING_MODES.PRACTICAL) {
      response += " In practice, you would implement this using libraries like Hugging Face Transformers or OpenAI's API.";
    }
    
    return response;
  };
  
  // Render video message (simplified version)
  const renderVideoMessage = (message) => {
    if (message.isCollapsed) {
      // Collapsed view
      return (
        <div
          className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm"
          onClick={() => toggleVideoCollapse(message.id)}
        >
          {/* Play Icon */}
          <div className="w-10 h-10 bg-amber-500 rounded-md flex items-center justify-center text-white mr-3 flex-shrink-0 shadow">
            <BookOpen size={18} />
          </div>
          
          {/* Video Info */}
          <div className="flex-1 overflow-hidden min-w-0">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
              {message.title}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Video {message.videoNumber} of {message.totalVideos}
            </div>
          </div>
          
          {/* Expand Button */}
          <button
            className="text-gray-500 hover:text-amber-500 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Expand video"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      );
    }
    
    // Expanded view
    return (
      <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 w-full">
        {/* Video Header */}
        <div className="flex items-center mb-3">
          <div className="flex-1">
            <p className="font-semibold text-gray-800 dark:text-white text-base leading-tight">
              {message.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Video {message.videoNumber} of {message.totalVideos} • {message.moduleSection}
            </p>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 ml-2">
            {formatTime(message.timestamp)}
          </div>
        </div>

        {/* Video Placeholder */}
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-inner relative group mb-2 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="mb-2">Video content would appear here</div>
            <button className="px-4 py-2 bg-amber-500 text-white rounded-lg">
              Play Video
            </button>
          </div>
        </div>

        {/* Simple Controls */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/50 flex flex-wrap gap-2 justify-between items-center">
          <button
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm flex items-center"
            onClick={() => toggleVideoCollapse(message.id)}
          >
            Collapse
          </button>
          
          <button
            className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm flex items-center"
          >
            <HelpCircle size={14} className="mr-1" />
            Ask Question
          </button>
          
          <button
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm flex items-center"
            onClick={() => {
              const userMessage = {
                id: Date.now(),
                sender: 'user',
                content: "next video",
                timestamp: new Date()
              };
              
              setMessages(prevMessages => [...prevMessages, userMessage]);
              handleSendMessage({ preventDefault: () => {}, target: { value: 'next video' } });
            }}
          >
            Next Video
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    );
  };
  
  // Toggle video collapse state
  const toggleVideoCollapse = (messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === messageId && message.type === 'video'
          ? { ...message, isCollapsed: !message.isCollapsed }
          : message
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Side: Course Information */}
            <div className="flex items-center gap-3">
              {/* Course Icon */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                <BookOpen size={20} />
              </div>
              
              {/* Course Title and Status */}
              <div>
                <h1 className="text-base sm:text-lg font-semibold tracking-tight leading-tight">
                  Generative AI for Developers
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                  Module 1 of 4 • {selectedLearningMode} Mode • {selectedClarity} Clarity
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content Area (Chat) */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 lg:p-6" aria-live="polite">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Map through messages and render each one */}
          {messages.map(message => (
            <article
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2 sm:gap-3 relative`}
            >
              {/* Bot Avatar */}
              {message.sender === 'bot' && !message.type && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600">
                  <Bot size={16} />
                </div>
              )}

              {/* Message Content Container */}
              <div className={`${
                message.sender === 'user' 
                  ? 'max-w-[75%] sm:max-w-[70%]' 
                  : (message.type === 'video' ? 'w-full' : 'max-w-[75%] sm:max-w-[70%]')
              }`}>
                {/* Text Message */}
                {!message.type && (
                  <div className={`rounded-xl px-4 py-3 text-sm shadow-md relative ${
                    message.sender === 'user'
                      ? 'bg-amber-500 text-white rounded-br-none' // User message style
                      : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 rounded-bl-none' // Bot message style
                  }`}>
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                    
                    {/* Timestamp */}
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-amber-100/80 text-right' 
                        : 'text-gray-400 dark:text-gray-500 text-left'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                )}
                
                {/* Video Message */}
                {message.type === 'video' && renderVideoMessage(message)}
              </div>

              {/* User Avatar */}
              {message.sender === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-amber-500 text-white">
                  <User size={16} />
                </div>
              )}
            </article>
          ))}

          {/* Bot Loading/Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start items-start gap-3 animate-pulse">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white">
                <Bot size={16} />
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl rounded-bl-none px-4 py-3 text-sm shadow-md border border-gray-100 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 italic">
                Typing...
              </div>
            </div>
          )}

          {/* Invisible element at the end of the list to target for scrolling */}
          <div ref={messagesEndRef} style={{ height: '1px' }} />
        </div>
      </main>

      {/* Fixed Bottom Section: Mode Selection & Input Area */}
      <footer className="border-t border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-3 shadow-inner sticky bottom-0 z-20">
        {/* Mode Panel (simplified) */}
        {activeModePanel && (
          <div className="max-w-4xl mx-auto mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 animate-slide-in">
            {/* Panel Header */}
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">
                {activeModePanel === 'clarity' ? 'Adjust Explanation Clarity' : 'Select Learning Pace'}
              </label>
              <button 
                onClick={() => setActiveModePanel(null)} 
                className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" 
                title="Close Panel"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Clarity Options */}
            {activeModePanel === 'clarity' && (
              <div className="flex gap-2 flex-wrap">
                {Object.entries(CLARITY_LEVELS).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedClarity(value)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center ${
                      selectedClarity === value 
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                    {selectedClarity === value && (
                      <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
            
            {/* Learning Mode Options */}
            {activeModePanel === 'learning' && (
              <div className="flex gap-2 flex-wrap">
                {Object.entries(LEARNING_MODES).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLearningMode(value)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center ${
                      selectedLearningMode === value 
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                    {selectedLearningMode === value && (
                      <svg className="ml-1.5 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input Area */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            {/* Text Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything or type 'next video'..."
              className="w-full p-3 pl-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 flex-1"
              disabled={isLoading}
              aria-label="Chat input"
            />
            
            {/* Send Button */}
            <button
              type="submit"
              className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          {/* Mode Selection Buttons */}
          <div className="flex justify-center mt-3 space-x-2">
            <button
              type="button"
              onClick={() => setActiveModePanel(prev => prev === 'clarity' ? null : 'clarity')}
              className={`px-3 py-1.5 rounded-md flex items-center text-sm ${
                activeModePanel === 'clarity' 
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-expanded={activeModePanel === 'clarity'}
              title="Adjust explanation clarity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5">
                <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8" />
                <path d="M12 6a3.5 3.5 0 0 1 3.5 3.5A3.5 3.5 0 0 1 12 13a3.5 3.5 0 0 1-3.5-3.5A3.5 3.5 0 0 1 12 6m0 14c2 0 10-1.8 10-9 0-1.2-.4-2.4-1-3.5M12 20c-1.5 0-9-1.8-9-9 0-1.2.4-2.4 1-3.5" />
              </svg>
              <span>{selectedClarity} clarity</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModePanel(prev => prev === 'learning' ? null : 'learning')}
              className={`px-3 py-1.5 rounded-md flex items-center text-sm ${
                activeModePanel === 'learning' 
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-expanded={activeModePanel === 'learning'}
              title="Change learning mode"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              <span>{selectedLearningMode} mode</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CourseChat;