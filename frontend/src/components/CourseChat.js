// Improved Chat Interface with non-sticky header and enhanced message box
import React, { useState, useRef, useEffect } from 'react';
import { 
  PlayCircle, 
  SendHorizontal, 
  User, 
  PauseCircle, 
  MessageCircle, 
  Info, 
  Mic, 
  ChevronRight,
  BookOpen, 
  Sparkles, 
  ZoomIn,
  GraduationCap,
  Brain,
  Zap,
  BookText,
  RotateCcw,
  Award,
  Code,
  Compass,
  Keyboard,
  Bot,
  Stars,
  Lightbulb,
  Command,
  Pencil,
  FileQuestion,
  TerminalSquare
} from 'lucide-react';

export default function ImprovedChatInterface() {
  // State and other logic would remain similar to your original component
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeModePanel, setActiveModePanel] = useState(null); // null, 'clarity', or 'learning'
  
  // Sample messages for demonstration
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      content: "Hi, I'm Qurty! Welcome to the Generative AI for Developers Specialization course. \n\nYou can explore the course content, learning outcomes, skills you'll gain, and testimonials anytime by clicking the floating menu icon at the bottom. We're skipping the traditional MOOC interface! Instead, you'll experience a seamless, chat-based learning journey where videos play one after another right here. If you ever feel stuck, simply pause the video and ask me questions. Once you finish a video, you can move to the next one or ask me to take notes on a particular topic. No distractions - just smooth, interactive learning.",
      timestamp: new Date()
    },
    {
      id: 2,
      sender: 'bot',
      content: "I'm excited -are you? \nLet's dive in! If you're excited too, type 'start' and we'll begin our journey together!",
      timestamp: new Date()
    },
    { 
      id: 3, 
      sender: 'bot', 
      content: "Hi, I'm Qurty! Welcome to the Generative AI for Developers Specialization course. \n\nYou can explore the course content, learning outcomes, skills you'll gain, and testimonials anytime by clicking the floating menu icon at the bottom. We're skipping the traditional MOOC interface! Instead, you'll experience a seamless, chat-based learning journey where videos play one after another right here. If you ever feel stuck, simply pause the video and ask me questions. Once you finish a video, you can move to the next one or ask me to take notes on a particular topic. No distractions - just smooth, interactive learning.",
      timestamp: new Date()
    },
    {
      id: 4,
      sender: 'bot',
      content: "I'm excited -are you? \nLet's dive in! If you're excited too, type 'start' and we'll begin our journey together!",
      timestamp: new Date()
    }
  ]);
  
  // Format the message timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    // Message sending logic
    setInputValue('');
  };
  
  // Learning modes data with icons
  const conceptClarity = [
    { id: "highSchooler", label: "Basic", icon: <GraduationCap size={16} />, active: true },
    { id: "collegeGrad", label: "Intermediate", icon: <BookOpen size={16} />, active: false },
    { id: "phd", label: "Advanced", icon: <Brain size={16} />, active: false }
  ];
  
  const learningModes = [
    { id: "normal", label: "Normal", icon: <Compass size={16} />, active: true },
    { id: "express", label: "Express", icon: <Zap size={16} />, active: false },
    { id: "classic", label: "Classic", icon: <BookText size={16} />, active: false },
    { id: "revision", label: "Revision", icon: <RotateCcw size={16} />, active: false },
    { id: "challenge", label: "Challenge", icon: <Award size={16} />, active: false },
    { id: "handson", label: "Hands-On", icon: <Code size={16} />, active: false },
    { id: "voice", label: "Voice", icon: <Mic size={16} />, active: false }
  ];
  
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Main scrollable container - includes header and messages */}
      <div className="flex-1 overflow-y-auto">
        {/* Non-sticky header that scrolls with content - now inside the scrollable area */}
        <div className="p-4 bg-non dark:bg-gray-900">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-md bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mr-3 shadow-sm">
                <BookOpen size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
  <h1 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
    Generative AI: Build Smarter with Code
  </h1>
  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
    A reimagined learning experience for developers—interactive, intuitive, and entirely in flow.
  </p>
</div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 p-2 rounded-md transition-colors border border-gray-200 dark:border-gray-700 shadow-sm">
                <ZoomIn size={16} />
              </button>
              <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 p-2 rounded-md transition-colors border border-gray-200 dark:border-gray-700 shadow-sm">
                <Info size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Chat Messages Area */}
        <div className="max-w-5xl mx-auto py-6 px-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="flex h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/40 items-center justify-center mr-3 mt-1 shadow-sm flex-shrink-0">
                    <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}
                
                <div 
                  className={`max-w-[75%] rounded-lg px-4 py-3 ${
                    message.sender === 'user' 
                      ? 'bg-amber-500 text-white shadow-sm ml-3'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow border border-gray-100 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">
                      {message.sender === 'user' ? 'You' : 'Qurty'}
                    </span>
                    <span className={`text-xs ${
                      message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
                
                {message.sender === 'user' && (
                  <div className="flex h-8 w-8 rounded-full bg-amber-500 items-center justify-center ml-3 mt-1 shadow-sm flex-shrink-0">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Video Player (conditionally rendered) */}
      {isPlaying && (
  <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md">
    <div className="max-w-5xl mx-auto">
      <div className="aspect-video bg-gray-900 rounded-md overflow-hidden shadow-lg relative">
        {/* YouTube iframe */}
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/2ePf9rue1Ao?autoplay=1&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="text-sm">
          <p className="font-medium text-gray-800 dark:text-white">Introduction to Generative AI</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Video 1 of 12 • Foundations module</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Resources
          </button>
          <button className="px-3 py-1.5 text-xs bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
            Next Video
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      
      {/* Fixed Bottom Section - Redesigned with Mode Icons and Modern Input */}
      <div className="">
        {/* Perplexity/Firefly Style Input */}
        <div className="p-4 max-w-5xl mx-auto">
          <form onSubmit={handleSendMessage} className="relative">            
            {/* Mode Selection Panel (toggleable and focused) */}
            {activeModePanel && (
              <div className="absolute bottom-16 left-4 right-4 z-10 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                 {activeModePanel === 'clarity' && (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Concept Clarity</label>
                      <button 
                        onClick={() => setActiveModePanel(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2  flex-wrap">
                      {conceptClarity.map(mode => (
                        <button
                          key={mode.id}
                          className={`p-2 rounded-lg flex items-center justify-center ${
                            mode.active 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          } transition-all w-24`}
                        >
                          <div className="mr-1.5">{mode.icon}</div>
                          <span className="text-xs font-medium">{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
                
                {activeModePanel === 'learning' && (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Learning Mode</label>
                      <button 
                        onClick={() => setActiveModePanel(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {learningModes.map(mode => (
                        <button
                          key={mode.id}
                          className={`p-2 rounded-lg flex items-center justify-center ${
                            mode.active 
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          } transition-all w-24`}
                        >
                          <div className="mr-1.5">{mode.icon}</div>
                          <span className="text-xs font-medium">{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* Perplexity/Firefly Inspired Input Bar */}
            <div className="flex bg-white dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden px-4 shadow-lg focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
              {/* Left side icons */}
              <div className="flex items-center space-x-2 mr-2">
                {/* Concept clarity icon (active) */}
                <button 
                  type="button" 
                  className="relative p-1.5"
                  onClick={() => setActiveModePanel(activeModePanel === 'clarity' ? null : 'clarity')}
                  title="Change concept clarity level"
                > 
                  <div className={`flex h-6 w-6 rounded-full ${activeModePanel === 'clarity' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'} items-center justify-center`}>
                    {conceptClarity.find(mode => mode.active)?.icon || <GraduationCap size={14} />}
                  </div>
                </button>
                
                {/* Learning mode icon (active) */}
                <button 
                  type="button" 
                  className="relative p-1.5"
                  onClick={() => setActiveModePanel(activeModePanel === 'learning' ? null : 'learning')}
                  title="Change learning mode"
                > 
                  <div className={`flex h-6 w-6 rounded-full ${activeModePanel === 'learning' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'} items-center justify-center`}>
                    {learningModes.find(mode => mode.active)?.icon || <Compass size={14} />}
                  </div>
                </button>
                
                {/* Quick command access */}
                <button 
                  type="button" 
                  className="p-1.5"
                  title="Show commands"
                > 
                  <Command size={15} className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400" />
                </button>
              </div>
              
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything about Generative AI or type '/' for commands..."
                className="flex-1 py-4 bg-transparent text-gray-800 dark:text-white focus:outline-none text-sm"
              />
              
              <div className="flex items-center gap-1 ml-2">
                {/* Right side action icons */}
                <button type="button" className="p-1.5" title="Coding Interface"> 
                  <TerminalSquare size={18} className="text-gray-400 hover:text-amber-500 dark:hover:text-amber-400" />
                </button>
                
                <button
                  type="button"
                  className="p-1.5"
                  title="Voice input"
                > 
                  <Mic size={18} className="text-gray-400 hover:text-amber-500 dark:hover:text-amber-400" />
                </button>
                
                <button
                  type="submit"
                  className="ml-1.5 p-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all shadow-md"
                >
                  <SendHorizontal size={16} />
                </button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}