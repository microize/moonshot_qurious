import React, { useState, useRef, useEffect } from 'react';
import {
  Settings, MessageSquare, SendHorizontal, Mic, 
  BookOpen, Search, FileText, Info, Play,
  CornerUpLeft, ChevronRight, Clock, CheckCircle, 
  History, Award, ChevronLeft, Code, VolumeX, Volume2, 
  PauseCircle, PlayCircle, Rewind, FastForward, Minimize2,
  HelpCircle, Maximize2, X
} from 'lucide-react';

// Main CourseChat Component
const CourseChat = () => {
  // ---------- STATE MANAGEMENT ----------
  // Basic Chat State
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Course/Video State
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [completedVideos, setCompletedVideos] = useState([]);
  const [activeVideoCollapsed, setActiveVideoCollapsed] = useState(false);
  const [videoStates, setVideoStates] = useState({});

  // UI & Mode State
  const [clarityLevel, setClarityLevel] = useState('intermediate');
  const [learningMode, setLearningMode] = useState('normal');
  const [activePanel, setActivePanel] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTool, setActiveTool] = useState('progress');
  const [isAskingDoubt, setIsAskingDoubt] = useState(false);
  const [doubtContext, setDoubtContext] = useState(null);
  const [transcriptVisible, setTranscriptVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const activeVideoRef = useRef(null);
  const playerRefs = useRef({});

  // Example course videos
  const courseVideos = [
    {
      id: 1,
      module: "Foundations",
      title: "Introduction to Generative AI",
      description: "Learn the basics of generative artificial intelligence and its applications.",
      url: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
      duration: 120,
      transcriptTimestamps: [
        { time: 5, text: "Generative AI creates new content" },
        { time: 15, text: "Difference from discriminative models" },
        { time: 25, text: "Applications in text, image, audio" }
      ]
    },
    {
      id: 2,
      module: "Foundations",
      title: "Understanding Transformer Architecture",
      description: "Deep dive into the transformer architecture.",
      url: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
      duration: 180,
      transcriptTimestamps: [
        { time: 10, text: "Self-attention mechanism" },
        { time: 25, text: "Positional encoding" },
        { time: 40, text: "Multi-head attention" }
      ]
    },
    {
      id: 3,
      module: "Advanced",
      title: "Prompt Engineering Techniques",
      description: "Master the art of creating effective prompts.",
      url: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
      duration: 150,
      transcriptTimestamps: [
        { time: 8, text: "Components of prompts" },
        { time: 20, text: "Few-shot prompting" },
        { time: 35, text: "Chain-of-thought" }
      ]
    }
  ];

  // Chat history for the sidebar
  const chatHistory = [
    { id: 1, title: "Introduction Discussion", date: "Today", preview: "What is generative AI?..." },
    { id: 2, title: "Transformer Questions", date: "Yesterday", preview: "How does attention work?..." }
  ];

  // ---------- LIFECYCLE & EFFECTS ----------
  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage({
        content: "Welcome to the Generative AI for Developers course! Type 'start' to begin learning about foundational concepts, or ask me any questions.",
        isIntro: true,
        showStartButton: true
      });
    }
    inputRef.current?.focus();
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space to toggle play/pause (when not focused on input and a video is active)
      if (e.code === 'Space' && document.activeElement !== inputRef.current && currentVideoId !== null) {
        e.preventDefault();
        toggleVideoPlayback();
      }
      // Escape to cancel doubt mode
      if (e.code === 'Escape' && isAskingDoubt) {
        cancelDoubt();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentVideoId, isAskingDoubt]);

  // ---------- VIDEO HANDLERS ----------
  const toggleVideoPlayback = () => {
    if (currentVideoId) {
      const currentState = videoStates[currentVideoId];
      setVideoStates(prev => ({
        ...prev,
        [currentVideoId]: { 
          ...prev[currentVideoId],
          isPlaying: !currentState?.isPlaying 
        }
      }));
    }
  };

  const handleVideoProgress = (videoId, progress) => {
    if (!videoId) return;
    
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { 
        ...prev[videoId],
        progress: progress 
      }
    }));
    
    // Check for completion when near the end
    const currentState = videoStates[videoId];
    if (currentState && currentState.duration) {
      // Consider video complete when within 2 seconds of the end
      if (currentState.duration - progress <= 2) {
        handleVideoComplete(videoId);
      }
    }
  };

  const handleVideoDuration = (videoId, duration) => {
    if (!videoId || !duration) return;
    
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { 
        ...prev[videoId],
        duration: duration 
      }
    }));
  };

  const seekTo = (videoId, time) => {
    // This would actually use a ref to the player to seek
    console.log(`Seeking to ${time} in video ${videoId}`);
    
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { 
        ...prev[videoId],
        progress: time,
        isPlaying: true
      }
    }));
  };

  // ---------- EVENT HANDLERS ----------
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleTranscript = () => setTranscriptVisible(!transcriptVisible);
  const handleSelectTool = (toolId) => setActiveTool(toolId);
  
  const handleSelectChat = (chatId) => {
    // In a real app, this would load the selected chat
    console.log(`Selected chat: ${chatId}`);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    // Add user message
    const currentContext = isAskingDoubt ? doubtContext : null;
    addUserMessage(trimmedInput, currentContext);
    setInputValue('');
    
    // Clear doubt context if active
    if (isAskingDoubt) {
      setIsAskingDoubt(false);
      setDoubtContext(null);
    }
    
    // Simulate bot typing
    setIsLoading(true);
    setTimeout(() => {
      generateResponse(trimmedInput, currentContext);
      setIsLoading(false);
    }, 1000);
  };

  const addUserMessage = (content, doubtContext = null) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      content,
      timestamp: new Date(),
      doubtContext
    }]);
  };

  const addBotMessage = (messageData) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      sender: 'bot',
      timestamp: new Date(),
      ...messageData
    }]);
  };

  // Generate bot responses based on user input
  const generateResponse = (input, doubtContext = null) => {
    const lowerInput = input.toLowerCase();
    
    // Case 1: Responding to a doubt about a video
    if (doubtContext) {
      addBotMessage({
        content: `Regarding the video "${doubtContext.videoTitle}" at timestamp ${formatDuration(doubtContext.timestamp)}:

Based on your question about "${input}", the key concept here is the attention mechanism. It allows the model to weigh the importance of different inputs in the sequence. This helps capture long-range dependencies between words or tokens.

Does that answer your question? Would you like more details on this concept?`,
        isDoubtResponse: true,
        relatedToVideo: doubtContext.videoId
      });
      
      // After a doubt is answered, show a "Continue Learning" prompt
      setTimeout(() => {
        addBotMessage({
          type: 'action',
          actionType: 'continue-learning',
          relatedToVideo: doubtContext.videoId
        });
      }, 600);
    }
    // Case 2: Starting the course
    else if (lowerInput === 'start' || lowerInput === 'begin') {
      addBotMessage({ 
        content: "Great! Let's start with the first module: Introduction to Generative AI. This will cover the basic concepts and applications of generative models."
      });
      
      setTimeout(() => {
        addVideoMessage(courseVideos[0]);
      }, 500);
    }
    // Case 3: Next video request
    else if (lowerInput.includes('next video') || lowerInput.includes('continue')) {
      const nextVideoIndex = courseVideos.findIndex(v => v.id === currentVideoId) + 1;
      
      if (nextVideoIndex < courseVideos.length) {
        addBotMessage({ content: "Moving on to the next video!" });
        setTimeout(() => {
          addVideoMessage(courseVideos[nextVideoIndex]);
        }, 500);
      } else {
        addBotMessage({ content: "Congratulations! You've completed all videos in this module." });
      }
    }
    // Case 4: General question
    else {
      addBotMessage({
        content: `About "${input.substring(0, 30)}...": 

This relates to concepts covered in the current video around timestamp 01:25. The key idea is how transformer models process sequential data through self-attention mechanisms.

Would you like me to explain this in more detail or jump to the related section in the video?`,
        relatedToCurrentVideo: true
      });
    }
  };

  const formatDuration = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Add a video message to the chat
  const addVideoMessage = (video) => {
    // Mark previous video as completed if applicable
    if (currentVideoId && !completedVideos.includes(currentVideoId)) {
      setCompletedVideos(prev => [...prev, currentVideoId]);
    }
    
    // Add the video message
    addBotMessage({
      type: 'video',
      videoId: video.id,
      title: video.title,
      description: video.description,
      url: video.url,
      duration: video.duration,
      module: video.module,
      transcriptTimestamps: video.transcriptTimestamps
    });
    
    // Initialize video state
    setVideoStates(prev => ({
      ...prev,
      [video.id]: {
        isPlaying: true,
        progress: 0,
        duration: video.duration,
        volume: 0.8,
        muted: false,
        speed: 1
      }
    }));
    
    // Update current video ID
    setCurrentVideoId(video.id);
    setActiveVideoCollapsed(false);
    
    // Scroll to the new video after it's added
    setTimeout(() => {
      activeVideoRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleStartButtonClick = () => {
    addUserMessage("start");
    generateResponse("start");
  };

  const handleVideoComplete = (videoId) => {
    if (!videoId || completedVideos.includes(videoId)) return;
    
    setCompletedVideos(prev => [...prev, videoId]);
    
    // Pause the video
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { 
        ...prev[videoId],
        isPlaying: false 
      }
    }));
    
    // Add completion message
    const completedVideo = courseVideos.find(v => v.id === videoId);
    if (completedVideo) {
      addBotMessage({
        content: `Great job completing "${completedVideo.title}"! Ready for the next lesson?`,
        showContinueButton: true
      });
    }
  };

  // Jump to video (used when clicking "Continue Learning" or from floating player)
  const jumpToVideo = () => {
    // Expand video if collapsed
    setActiveVideoCollapsed(false);
    
    // Scroll to the video
    setTimeout(() => {
      activeVideoRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Start asking a question about a specific video
  const startAskingDoubt = (videoId) => {
    if (!videoId && !currentVideoId) {
      addBotMessage({
        content: "Please start playing a video first to ask a question about it."
      });
      return;
    }
    
    const targetVideoId = videoId || currentVideoId;
    const video = courseVideos.find(v => v.id === targetVideoId);
    if (!video) return;
    
    // Pause video
    setVideoStates(prev => ({
      ...prev,
      [targetVideoId]: { 
        ...prev[targetVideoId],
        isPlaying: false 
      }
    }));
    
    // Get current progress
    const timestamp = videoStates[targetVideoId]?.progress || 0;
    
    // Set doubt context
    setDoubtContext({
      videoId: targetVideoId,
      videoTitle: video.title,
      timestamp: timestamp
    });
    
    setIsAskingDoubt(true);
    
    // Add a message indicating we're asking a doubt
    addBotMessage({
      content: `Okay, paused at ${formatDuration(timestamp)}. What's your question about "${video.title}"?`
    });
    
    // Focus input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Cancel doubt mode
  const cancelDoubt = () => {
    setIsAskingDoubt(false);
    setDoubtContext(null);
  };

  // Toggle video player collapse state
  const toggleVideoCollapse = (videoId, forceState = null) => {
    const isCollapsed = forceState !== null ? forceState : !activeVideoCollapsed;
    setActiveVideoCollapsed(isCollapsed);
    
    // Pause video if collapsing
    if (isCollapsed) {
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { 
          ...prev[videoId],
          isPlaying: false 
        }
      }));
    }
  };

  // ---------- RENDER COMPONENTS ----------
  // Floating Video Player (when video is pushed out of view)
  const FloatingVideoPlayer = () => {
    if (!currentVideoId || !activeVideoCollapsed) return null;
    
    const currentVideo = courseVideos.find(v => v.id === currentVideoId);
    if (!currentVideo) return null;
    
    return (
      <div className="fixed bottom-20 right-6 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-30">
        <div className="p-2 flex justify-between items-center bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <span className="text-sm font-medium truncate">{currentVideo.title}</span>
          <button 
            className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
            onClick={jumpToVideo}
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="relative aspect-video bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className="p-3 bg-amber-500 rounded-full text-white hover:bg-amber-600 transition-colors"
              onClick={jumpToVideo}
            >
              <Play size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar Component
  const Sidebar = () => {
    if (!sidebarOpen) return null;
    
    return (
      <aside className={`flex flex-col border-r border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
        {/* Sidebar Header */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between h-[65px]">
          {!sidebarCollapsed && <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Learning Tools</span>}
          <button
            onClick={toggleSidebarCollapse}
            className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Tool Selection */}
        <nav className="p-2 space-y-1 border-b border-gray-200 dark:border-gray-700/50">
          {[
            { id: 'history', label: 'Chat History', icon: History },
            { id: 'progress', label: 'Course Progress', icon: Award }
          ].map(tool => (
            <button
              key={tool.id}
              onClick={() => handleSelectTool(tool.id)}
              className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTool === tool.id
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={tool.label}
            >
              <tool.icon size={sidebarCollapsed ? 20 : 16} className={!sidebarCollapsed ? 'mr-2' : ''} />
              {!sidebarCollapsed && <span>{tool.label}</span>}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-2">
          {/* Chat History View */}
          {activeTool === 'history' && (
            <div className="space-y-2">
              {!sidebarCollapsed && <h3 className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 px-2 mb-2">Recent Chats</h3>}
              {chatHistory.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`w-full p-2 rounded-md text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${sidebarCollapsed ? 'h-10 flex items-center justify-center' : ''}`}
                  title={chat.title}
                >
                  {sidebarCollapsed ? (
                    <MessageSquare size={18} className="text-gray-500 dark:text-gray-400" />
                  ) : (
                    <>
                      <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{chat.title}</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{chat.preview}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{chat.date}</p>
                    </>
                  )}
                </button>
              ))}
              {chatHistory.length === 0 && !sidebarCollapsed && (
                <p className="text-xs text-gray-400 dark:text-gray-500 px-2">No chat history yet.</p>
              )}
            </div>
          )}

          {/* Course Progress View */}
          {activeTool === 'progress' && (
            <div className="space-y-2">
              {!sidebarCollapsed && <h3 className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 px-2 mb-2">Video Progress</h3>}
              {/* Show current video info */}
              {!sidebarCollapsed && currentVideoId && (
                <div className="px-2 py-1 mb-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Now Playing:</p>
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-300 truncate">
                    {courseVideos.find(v => v.id === currentVideoId)?.title}
                  </p>
                </div>
              )}
              
              {/* Video list */}
              {courseVideos.map((video, index) => (
                <div
                  key={video.id}
                  className={`flex items-center p-2 rounded-md ${sidebarCollapsed ? 'justify-center' : ''} ${currentVideoId === video.id ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                  title={video.title}
                >
                  <div className={`flex-shrink-0 ${sidebarCollapsed ? '' : 'mr-2'}`}>
                    {completedVideos.includes(video.id) ? (
                      <CheckCircle size={sidebarCollapsed ? 20 : 16} className="text-green-500" />
                    ) : (
                      currentVideoId === video.id ?
                      <Play size={sidebarCollapsed ? 20 : 16} className="text-amber-500" />
                      : <Clock size={sidebarCollapsed ? 20 : 16} className="text-gray-400 dark:text-gray-500" />
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <div className="flex-1 overflow-hidden">
                      <span className={`text-sm truncate ${completedVideos.includes(video.id) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'} ${currentVideoId === video.id ? 'font-semibold text-amber-700 dark:text-amber-300' : ''}`}>
                        {index + 1}. {video.title}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">({formatDuration(video.duration)})</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    );
  };

  // Header Component
  const Header = () => (
    <header className="border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side: Course Information */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <BookOpen size={20} />
            </div>
            
            <div>
              <h1 className="text-base sm:text-lg font-semibold tracking-tight leading-tight">
                Generative AI for Developers
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                {completedVideos.length} of {courseVideos.length} completed • {learningMode} Mode • {clarityLevel} Clarity
              </p>
            </div>
          </div>
          
          {/* Right Side: Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Search History">
              <Search size={18} />
            </button>
            
            <button 
              className={`p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                transcriptVisible ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400' : ''
              }`}
              onClick={toggleTranscript}
              title={transcriptVisible ? "Hide Transcript/Resources" : "Show Transcript/Resources"}
              aria-pressed={transcriptVisible}
            >
              <FileText size={18} />
            </button>
            
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Course Info">
              <Info size={18} />
            </button>
            
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md transition-colors shadow-sm flex items-center text-sm font-medium"
              onClick={() => inputRef.current?.focus()}
            >
              <MessageSquare size={16} className="mr-1 sm:mr-1.5" />
              <span className="hidden sm:inline">Ask Question</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // Mode Panel Component (shows when clicking clarity/learning modes)
  const ModePanel = () => {
    if (!activePanel) return null;
    
    return (
      <div className="max-w-4xl mx-auto mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
        {/* Panel Header */}
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">
            {activePanel === 'clarity' ? 'Adjust Explanation Clarity' : 'Select Learning Pace'}
          </label>
          <button 
            onClick={() => setActivePanel(null)} 
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X size={16} />
          </button>
        </div>
        
        {/* Mode Buttons */}
        <div className="flex gap-2 flex-wrap">
          {/* Clarity Options */}
          {activePanel === 'clarity' && [
            { id: 'basic', label: "Basic" },
            { id: 'intermediate', label: "Intermediate" },
            { id: 'advanced', label: "Advanced" }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => {
                setLearningMode(mode.id);
                setActivePanel(null);
              }}
              className={`px-2.5 py-1.5 text-xs rounded-md flex items-center ${
                learningMode === mode.id 
                  ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 shadow-sm' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/70'
              }`}
              aria-pressed={learningMode === mode.id}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Transcript Panel Component
  const TranscriptPanel = () => {
    if (!transcriptVisible) return null;
    
    // Get transcript for current video
    const currentVideo = courseVideos.find(v => v.id === currentVideoId);
    const transcriptData = currentVideo?.transcriptTimestamps || [];
    
    return (
      <aside className="w-80 lg:w-96 border-l border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 flex flex-col flex-shrink-0 overflow-y-auto p-4" aria-label="Transcript and Resources Panel">
        {/* Panel Header */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-base text-gray-800 dark:text-gray-200">
            Transcript & Resources
          </h3>
          <button onClick={toggleTranscript} className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" title="Close Panel">
            <X size={18} />
          </button>
        </div>
        
        {/* Panel Content */}
        <div className="flex-1 text-sm text-gray-600 dark:text-gray-400 space-y-4">
          {/* Transcript Section */}
          <section>
            <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Transcript</h4>
            {currentVideoId ? (
              <div className="mt-2 space-y-1 text-xs max-h-60 overflow-y-auto pr-2">
                {transcriptData.map((item, index) => (
                  <p 
                    key={index}
                    className="p-1 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded cursor-pointer"
                    onClick={() => seekTo(currentVideoId, item.time)}
                  >
                    <span className="font-mono text-gray-400 mr-2">{formatDuration(item.time)}</span> 
                    {item.text}
                  </p>
                ))}
                {transcriptData.length === 0 && (
                  <p className="italic">No transcript available for this video.</p>
                )}
              </div>
            ) : (
              <p className="italic text-xs">Play a video to see its transcript.</p>
            )}
          </section>
          
          <hr className="my-4 border-gray-200 dark:border-gray-600"/>
          
          {/* Resources Section */}
          <section>
            <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Resources</h4>
            <ul className="mt-2 space-y-1 text-xs list-disc list-inside">
              <li><a href="#" className="text-amber-600 hover:underline">Article: Introduction to Transformers</a></li>
              <li><a href="#" className="text-amber-600 hover:underline">Code Example: Simple Attention Mechanism</a></li>
              <li><a href="#" className="text-amber-600 hover:underline">Quiz: Test Your Knowledge</a></li>
            </ul>
          </section>
        </div>
      </aside>
    );
  };

  // Video Message Component
  const VideoMessage = ({ message }) => {
    const isActiveVideo = message.videoId === currentVideoId;
    const videoState = videoStates[message.videoId] || { isPlaying: false, progress: 0, duration: message.duration };
    
    return (
      <div 
        ref={isActiveVideo ? activeVideoRef : null}
        className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 w-full"
      >
        {/* Video Header */}
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 flex items-center justify-center text-white shadow-md flex-shrink-0 mr-3">
            <BookOpen size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 dark:text-white truncate">{message.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Video {courseVideos.findIndex(v => v.id === message.videoId) + 1} of {courseVideos.length} • {message.module}
            </p>
          </div>
          <div className="flex items-center flex-shrink-0 ml-2">
            {completedVideos.includes(message.videoId) && (
              <span className="text-xs flex items-center text-green-500 mr-2 whitespace-nowrap">
                <CheckCircle size={14} className="mr-1" />
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Video Player (placeholder) */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-inner relative mb-3">
          {/* This would be your React Player component */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className="p-3 bg-amber-500 rounded-full text-white hover:bg-amber-600 transition-colors"
              onClick={() => {
                // Toggle play state
                setVideoStates(prev => ({
                  ...prev,
                  [message.videoId]: { 
                    ...prev[message.videoId],
                    isPlaying: !videoState.isPlaying 
                  }
                }));
              }}
            >
              {videoState.isPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
            </button>
          </div>
        </div>

        {/* Video Controls */}
        <div className="mb-3">
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              // Calculate position based on click
              const rect = e.currentTarget.getBoundingClientRect();
              const position = (e.clientX - rect.left) / rect.width;
              const seekTime = position * videoState.duration;
              seekTo(message.videoId, seekTime);
            }}
          >
            <div 
              className="h-full bg-amber-500 rounded-full transition-all" 
              style={{ width: `${(videoState.progress / videoState.duration) * 100}%` }} 
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatDuration(videoState.progress)}</span>
            <span>{formatDuration(videoState.duration)}</span>
          </div>
        </div>

        {/* Video Control Buttons */}
        <div className="flex items-center justify-between mb-3">
          {/* Left Controls: Playback */}
          <div className="flex items-center space-x-1">
            <button
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => {
                setVideoStates(prev => ({
                  ...prev,
                  [message.videoId]: { 
                    ...prev[message.videoId],
                    isPlaying: !videoState.isPlaying 
                  }
                }));
              }}
              aria-label={videoState.isPlaying ? "Pause" : "Play"}
            >
              {videoState.isPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
            </button>
            <button
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => seekTo(message.videoId, Math.max(0, videoState.progress - 10))}
              aria-label="Rewind 10 seconds"
            >
              <Rewind size={16} />
            </button>
            <button
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => seekTo(message.videoId, Math.min(videoState.duration, videoState.progress + 10))}
              aria-label="Fast Forward 10 seconds"
            >
              <FastForward size={16} />
            </button>
          </div>

          {/* Right Controls: Volume, Ask Question, Collapse */}
          <div className="flex items-center space-x-1">
            <button
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => {
                setVideoStates(prev => ({
                  ...prev,
                  [message.videoId]: { 
                    ...prev[message.videoId],
                    muted: !videoState.muted 
                  }
                }));
              }}
              aria-label={videoState.muted ? "Unmute" : "Mute"}
            >
              {videoState.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => startAskingDoubt(message.videoId)}
              aria-label="Ask Question about this video"
            >
              <HelpCircle size={16} />
            </button>
            <button
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => toggleVideoCollapse(message.videoId, true)}
              aria-label="Collapse Video"
            >
              <Minimize2 size={16} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/50 flex flex-wrap gap-2 justify-between items-center">
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => startAskingDoubt(message.videoId)}
            >
              <HelpCircle size={14} className="mr-1" />
              Ask Question
            </button>
            <button 
              className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleTranscript}
            >
              <FileText size={14} className="mr-1" />
              Transcript
            </button>
          </div>
          <div>
            <button 
              className="px-3 py-1.5 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center"
              onClick={() => {
                // Handle next video request
                addUserMessage("next video");
                generateResponse("next video");
              }}
            >
              Next Video
              <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
        </div>

        {/* Video Description (if available) */}
        {message.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">{message.description}</p>
        )}
      </div>
    );
  };

  // Text Message Component
  const TextMessage = ({ message }) => {
    const isUser = message.sender === 'user';
    
    return (
      <div className={`rounded-xl px-4 py-3 text-sm shadow-md relative ${
        isUser
          ? 'bg-amber-500 text-white rounded-br-none ml-auto max-w-[85%]'
          : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 rounded-bl-none mr-auto max-w-[85%]'
      }`}>
        {/* Doubt Context Reference (shown on user's doubt message) */}
        {message.doubtContext && isUser && (
          <div className="bg-amber-100/60 dark:bg-amber-900/40 rounded px-2 py-1 mb-2 text-xs flex items-center text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-700/50">
            <CornerUpLeft size={12} className="mr-1.5 flex-shrink-0" />
            <span>Re: "{message.doubtContext.videoTitle}" at 
              <button
                onClick={() => seekTo(message.doubtContext.videoId, message.doubtContext.timestamp)}
                className="font-medium hover:underline mx-1"
                title="Jump to timestamp"
              >
                {formatDuration(message.doubtContext.timestamp)}
              </button>
            </span>
          </div>
        )}

        {/* Message Text Content */}
        <div className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>

        {/* Action Buttons for bot messages */}
        {message.showStartButton && !isUser && (
          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-center">
            <button
              onClick={handleStartButtonClick}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-200"
            >
              Start Learning
            </button>
          </div>
        )}

        {message.showContinueButton && !isUser && (
          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-center">
            <button
              onClick={() => generateResponse("next video")}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-200"
            >
              Continue to Next Lesson
            </button>
          </div>
        )}

        {message.relatedToCurrentVideo && !isUser && (
          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-end">
            <button
              onClick={jumpToVideo}
              className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-md text-sm hover:bg-amber-200 dark:hover:bg-amber-900/40 transition-colors"
            >
              Jump to Video
            </button>
          </div>
        )}

        {/* Message timestamp */}
        <div className={`text-xs mt-1.5 ${
          isUser
            ? 'text-amber-100/80 text-right'
            : 'text-gray-400 dark:text-gray-500 text-left'
        }`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    );
  };

  // "Continue Learning" Action Message
  const ActionMessage = ({ message }) => {
    if (message.actionType !== 'continue-learning') return null;
    
    return (
      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-dashed border-amber-200 dark:border-amber-800/50 mt-1 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CornerUpLeft size={18} className="text-amber-500 dark:text-amber-400 mr-3 flex-shrink-0" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Ready to continue with the video?
            </p>
          </div>
          <button
            className="px-3 py-1.5 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center transition-colors"
            onClick={jumpToVideo}
          >
            Continue Learning
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    );
  };

  // Collapsed Video Component
  const CollapsedVideo = () => {
    if (!currentVideoId || !activeVideoCollapsed) return null;
    
    const currentVideo = courseVideos.find(v => v.id === currentVideoId);
    if (!currentVideo) return null;
    
    const videoState = videoStates[currentVideoId] || { progress: 0, duration: currentVideo.duration };
    
    return (
      <div
        className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm mb-3"
        onClick={jumpToVideo}
        title={`Expand video: ${currentVideo.title}`}
      >
        {/* Play Icon */}
        <div className="w-10 h-10 bg-amber-500 rounded-md flex items-center justify-center text-white mr-3 flex-shrink-0 shadow">
          <PlayCircle size={18} />
        </div>
        
        {/* Video Info */}
        <div className="flex-1 overflow-hidden min-w-0">
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
            {currentVideo.title}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
            <Clock size={11} className="mr-1 flex-shrink-0" />
            <span>
              {formatDuration(videoState.progress)} / 
              {formatDuration(videoState.duration)}
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center flex-shrink-0 ml-2">
          <button
            className="text-gray-500 hover:text-amber-500 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={(e) => { 
              e.stopPropagation(); 
              startAskingDoubt(currentVideoId); 
            }}
            title="Ask question about this video"
          >
            <HelpCircle size={16} />
          </button>
          <button
            className="text-gray-500 hover:text-green-500 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={(e) => { 
              e.stopPropagation();
              toggleVideoCollapse(currentVideoId, false);
            }}
            title="Expand video"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    );
  };

  // Typing Indicator
  const TypingIndicator = () => {
    if (!isLoading) return null;

    return (
      <div className="flex justify-start items-start gap-3 animate-pulse">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white">
          <MessageSquare size={16} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl rounded-bl-none px-4 py-3 text-sm shadow-md border border-gray-100 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 italic">
          Typing...
        </div>
      </div>
    );
  };

  // Enhanced Input Area with Icons
  const InputArea = () => {
    return (
      <div className="relative">
        {/* Doubt Context Indicator */}
        {isAskingDoubt && doubtContext && (
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-t-xl px-4 py-2.5 text-sm text-amber-800 dark:text-amber-200 flex justify-between items-center border-b border-amber-200 dark:border-amber-700/50 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-amber-200 dark:bg-amber-700 rounded-full text-amber-700 dark:text-amber-200">
                <HelpCircle size={14} />
              </span>
              <span>
                Asking about <span className="font-medium">"{doubtContext.videoTitle}"</span> at <span className="font-medium">{formatDuration(doubtContext.timestamp)}</span>
              </span>
            </div>
            <button 
              onClick={cancelDoubt} 
              className="text-amber-600 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-100 font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-amber-200/50 dark:hover:bg-amber-700/30 transition-all duration-200" 
              title="Cancel question"
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
          </div>
        )}

        {/* Mode Selection Buttons */}
        <div className="max-w-4xl mx-auto flex space-x-2 mb-2">
          <button
            type="button"
            onClick={() => setActivePanel(prev => prev === 'clarity' ? null : 'clarity')}
            className={`px-3 py-1.5 rounded-md flex items-center text-sm transition-colors ${activePanel === 'clarity' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            aria-expanded={activePanel === 'clarity'}
            title="Adjust explanation clarity"
          >
            <Settings size={14} className="mr-1.5" />
            <span className="capitalize">{clarityLevel}</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePanel(prev => prev === 'learning' ? null : 'learning')}
            className={`px-3 py-1.5 rounded-md flex items-center text-sm transition-colors ${activePanel === 'learning' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            aria-expanded={activePanel === 'learning'}
            title="Change learning mode"
          >
            <Settings size={14} className="mr-1.5" />
            <span className="capitalize">{learningMode}</span>
          </button>
        </div>

        {/* Input Form */}
        <form 
          onSubmit={handleSendMessage} 
          className={`flex items-center gap-3 bg-white dark:bg-gray-800 p-3 ${isAskingDoubt ? 'rounded-b-xl' : 'rounded-xl'} shadow-sm ${isInputFocused ? 'ring-2 ring-amber-400 dark:ring-amber-500/50' : ''} transition-all duration-200 max-w-4xl mx-auto`}
        >
          {/* Coding Interface Button */}
          <button 
            type="button" 
            className="p-2 text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200" 
            title="Open coding interface" 
            disabled={isLoading}
          >
            <Code size={18} />
          </button>
          
          {/* Text Input Field */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder={isAskingDoubt 
                ? "Type your question about the video..." 
                : "Ask anything or type 'next video'..."}
              className={`w-full p-3 px-4 rounded-xl ${
                isAskingDoubt 
                  ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200' 
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white'
              } focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200`}
              disabled={isLoading}
              aria-label="Chat input"
            />
            
            {/* Character Count */}
            {inputValue.length > 0 && (
              <div className="absolute right-3 bottom-3 text-xs text-gray-400 dark:text-gray-500 font-mono pointer-events-none">
                {inputValue.length}
              </div>
            )}
          </div>
          
          {/* Voice Input Button */}
          <button 
            type="button" 
            className="p-2 text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200" 
            title="Voice Input" 
            disabled={isLoading}
          >
            <Mic size={18} />
          </button>
          
          {/* Send Button */}
          <button
            type="submit"
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              inputValue.trim() && !isLoading
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            <SendHorizontal size={18} />
          </button>
        </form>
        
        {/* Input Helpers */}
        <div className="px-2 mt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 max-w-4xl mx-auto">
          <div>
            {isAskingDoubt 
              ? "Your question will reference the current video context" 
              : "Pro tip: Ask about concepts or request examples"}
          </div>
          <div className="flex gap-2">
            <button className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Examples
            </button>
            <span>•</span>
            <button className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Help
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ---------- MAIN RENDER ----------
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Panel (Chat Area) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* Collapsed Video (if collapsed) */}
          {activeVideoCollapsed && <CollapsedVideo />}

          {/* Chat Messages Area */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6" aria-live="polite">
            <div className="max-w-4xl mx-auto space-y-5">
              {/* Render all messages */}
              {messages.map(message => (
                <article
                  key={message.id}
                  className={`flex items-start gap-2 sm:gap-3 relative ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  } ${message.type === 'video' ? 'w-full' : ''}`}
                >
                  {/* Bot Avatar (only for non-video bot messages) */}
                  {message.sender === 'bot' && message.type !== 'video' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 mt-1">
                      <MessageSquare size={16} />
                    </div>
                  )}

                  {/* Message Content */}
                  <div className={`${message.type === 'video' ? 'w-full' : (message.sender === 'user' ? 'max-w-[80%] sm:max-w-[75%]' : 'max-w-[80%] sm:max-w-[75%]')}`}>
                    {message.type === 'video' ? (
                      <VideoMessage message={message} />
                    ) : message.type === 'action' ? (
                      <ActionMessage message={message} />
                    ) : (
                      <TextMessage message={message} />
                    )}
                  </div>

                  {/* User Avatar */}
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-600 text-white mt-1">
                      <MessageSquare size={16} />
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

          {/* Mode Panel and Input Area */}
          <footer className="border-t border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-3 shadow-inner sticky bottom-0 z-20">
            <ModePanel />
            <InputArea />
          </footer>
        </div>

        {/* Transcript Panel */}
        {transcriptVisible && <TranscriptPanel />}
      </div>

      {/* Floating Video Player (appears when active video is out of view) */}
      <FloatingVideoPlayer />
    </div>
  );
};

export default CourseChat;