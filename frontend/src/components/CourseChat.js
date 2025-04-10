import React, { useState, useRef, useEffect } from 'react';
import { PlayCircle, SendHorizontal, User, PauseCircle, MessageCircle, Info, Mic, ChevronRight } from 'lucide-react';

// Mock API response for demonstration
const mockResponses = {
  "start": "Let's begin by exploring a fundamental question: What is GenAI? Below is a video that introduces the concept. As you watch, feel free to pause and ask any questions.",
  "what is genai": "Generative AI (GenAI) refers to artificial intelligence systems that can generate new content, such as text, images, code, or music, based on patterns learned from training data. Unlike traditional AI that focuses on classification or prediction tasks, GenAI creates new outputs that weren't explicitly programmed.",
  "how does genai work": "Generative AI works through complex neural networks, particularly transformer models. These systems analyze vast amounts of training data to learn patterns, relationships, and structures. When prompted, they generate new content by predicting what should come next based on those learned patterns. The most advanced GenAI models use techniques like attention mechanisms to understand context and produce relevant outputs.",
  "what are applications of genai": "GenAI has numerous applications across industries: content creation (writing articles, scripts), code generation, image and art creation, music composition, language translation, chatbots and virtual assistants, data augmentation for training other AI, drug discovery in pharmaceuticals, and creating personalized learning experiences in education.",
  "tell me about prompt engineering": "Prompt engineering is the practice of crafting effective inputs to guide generative AI toward desired outputs. It's a crucial skill for developers working with models like GPT-4 or DALL-E. Good prompts provide clear instructions, relevant context, and sometimes examples of the desired format or style. Advanced techniques include few-shot learning, chain-of-thought prompting, and using structured formats."
};

export default function CourseChatInterface() {
  // Start with just the initial greeting
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      content: "Hi, I'm Qurty! Welcome to the Generative AI for Developers Specialization course. You can explore the course content, learning outcomes, skills you'll gain, and testimonials anytime by clicking the floating menu icon at the bottom.",
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Learning modes
  const conceptClarity = [
    { id: "highSchooler", label: "High Schooler", active: true },
    { id: "collegeGrad", label: "College Grad", active: false },
    { id: "phd", label: "PhD", active: false }
  ];
  
  const learningModes = [
    { id: "normal", label: "Normal", active: true },
    { id: "express", label: "Express", active: false },
    { id: "classic", label: "Classic", active: false },
    { id: "revision", label: "Revision", active: false },
    { id: "challenge", label: "Challenge", active: false },
    { id: "handson", label: "Hands-On", active: false },
    { id: "voice", label: "Voice", active: false }
  ];
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Queue for follow-up messages
  const introMessageQueue = [
    "We're skipping the traditional MOOC interface! Instead, you'll experience a seamless, chat-based learning journey where videos play one after another right here. If you ever feel stuck, simply pause the video and ask me questions.",
    "Once you finish a video, you can move to the next one or ask me to take notes on a particular topic. No distractions - just smooth, interactive learning.",
    "I'm excited -are you? Let's dive in! If you're excited too, type 'start' and we'll begin our journey together!"
  ];

  // Send the intro messages sequentially, with natural timing
  useEffect(() => {
    if (messages.length === 1) {
      // First introduction message is already shown
      // Send the next messages with delays between them
      let delay = 1500;
      
      introMessageQueue.forEach((content, index) => {
        setTimeout(() => {
          setIsTyping(true);
          
          // Simulate typing time based on message length
          const typingDelay = Math.min(1000, content.length * 10);
          
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
              ...prev, 
              {
                id: prev.length + 1,
                sender: 'bot',
                content: content,
                timestamp: new Date()
              }
            ]);
          }, typingDelay);
        }, delay);
        
        delay += 2500; // Increase delay for next message
      });
    }
  }, []);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot thinking and typing
    setTimeout(() => {
      const lowercaseInput = inputValue.toLowerCase();
      let responseContent = mockResponses[lowercaseInput] || 
        "I don't have specific information about that yet. Could you ask me something about Generative AI or the course content?";
      
      // If user types 'start', show the video
      if (lowercaseInput === 'start') {
        setIsPlaying(true);
      }
      
      // Hide typing indicator
      setIsTyping(false);
      
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
    
    setInputValue('');
  };
  
  // Format the message timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-800">
      {/* Course Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-purple-50 dark:bg-purple-900/20">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-300 mr-3">
            <MessageCircle size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Generative AI for Developers Specialization</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Chat with Qurty, your AI course assistant</p>
          </div>
          <button className="ml-auto bg-purple-100 dark:bg-purple-800/40 hover:bg-purple-200 dark:hover:bg-purple-800/60 text-purple-600 dark:text-purple-300 p-2 rounded-full transition-colors">
            <Info size={18} />
          </button>
        </div>
      </div>
      
      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-850">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div 
                className={`max-w-3/4 rounded-2xl px-4 py-3 ${
                  message.sender === 'user' 
                    ? 'bg-purple-500 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm rounded-tl-none border border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="flex items-center mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    message.sender === 'user'
                      ? 'bg-purple-400 text-white'
                      : 'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300'
                  }`}>
                    {message.sender === 'user' ? <User size={14} /> : <MessageCircle size={14} />}
                  </div>
                  <div className={`text-xs ${
                    message.sender === 'user' ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.sender === 'user' ? 'You' : 'Qurty'} • {formatTime(message.timestamp)}
                  </div>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm rounded-2xl rounded-tl-none border border-gray-200 dark:border-gray-600 px-4 py-3">
                <div className="flex items-center mb-1">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 flex items-center justify-center mr-2">
                    <MessageCircle size={14} />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Qurty is typing...
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Video Player (conditionally rendered) */}
      {isPlaying && (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {isPlaying ? (
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="p-2 bg-white/80 dark:bg-black/50 rounded-full text-purple-600 dark:text-purple-400 hover:bg-white dark:hover:bg-black/70 transition-colors"
                >
                  <PauseCircle size={40} />
                </button>
              ) : (
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="p-2 bg-white/80 dark:bg-black/50 rounded-full text-purple-600 dark:text-purple-400 hover:bg-white dark:hover:bg-black/70 transition-colors"
                >
                  <PlayCircle size={40} />
                </button>
              )}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/20 dark:bg-black/30 h-1 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-1/3 rounded-full"></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-white">
                <span>1:23</span>
                <span>4:56</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            <p className="font-medium">Introduction to Generative AI</p>
            <p>Video 1 of 12 • Foundations module</p>
          </div>
        </div>
      )}
      
      {/* Fixed Bottom Input Section with mode buttons */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-auto">
        {/* Mode Selection Tabs - Side by Side */}
        <div className="p-3 overflow-x-auto">
          <div className="flex items-center">
            {/* Concept Clarity Group */}
            <div className="mr-8">
              <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">Concept Clarity</div>
              <div className="flex space-x-2">
                {conceptClarity.map(mode => (
                  <button
                    key={mode.id}
                    className={`px-3 py-1 rounded-full text-xs border ${
                      mode.active
                        ? 'bg-gray-800 text-white border-gray-800' 
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Learning Mode Group */}
            <div className="flex-1">
              <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">Learning Mode</div>
              <div className="flex space-x-2 overflow-x-auto">
                {learningModes.map(mode => (
                  <button
                    key={mode.id}
                    className={`px-3 py-1 rounded-full text-xs whitespace-nowrap border ${
                      mode.active
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Message Input */}
        <div className="p-3 bg-gray-100 dark:bg-gray-800">
          <form onSubmit={handleSendMessage} className="relative">
            <div className="flex items-center bg-white dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden pl-4 pr-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ready to level up your skills? Let's start learning!"
                className="flex-1 py-3 bg-transparent text-gray-800 dark:text-white focus:outline-none"
              />
              
              <div className="flex items-center">
                <button
                  type="button"
                  className="p-2 text-purple-600 dark:text-purple-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <Mic size={20} />
                </button>
                
                <button
                  type="submit"
                  className="ml-1 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                  disabled={!inputValue.trim()}
                >
                  {inputValue.trim() ? <SendHorizontal size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}