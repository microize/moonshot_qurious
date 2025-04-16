// src/components/CourseChat/CourseChat.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  Settings, MessageSquare, SendHorizontal, Mic, BookOpen, ChevronRight, Code, X
} from 'lucide-react';

// Import modularized components
import Header from './Header';
import ChatSidebar from './ChatSidebar';
import InputArea from './InputArea';
import ModePanel from './ModePanel';
import VideoMessage from './VideoMessage';
import TextMessage from './TextMessage';
import ActionMessage from './ActionMessage';
import TranscriptPanel from './TranscriptPanel';
import TypingIndicator from './TypingIndicator';
import CollapsedVideo from './CollapsedVideo';

// Import constants and utilities
import { CLARITY_LEVELS, LEARNING_MODES, ACTION_TYPES } from './utils/constants';
import { formatTime, formatVideoPosition } from './utils/formatters';

/**
 * Main CourseChat component that integrates all subcomponents
 * @returns {JSX.Element} The CourseChat component
 */
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
  const [clarityLevel, setClarityLevel] = useState(CLARITY_LEVELS.INTERMEDIATE);
  const [learningMode, setLearningMode] = useState(LEARNING_MODES.NORMAL);
  const [activePanel, setActivePanel] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTool, setActiveTool] = useState('progress');
  const [isAskingDoubt, setIsAskingDoubt] = useState(false);
  const [doubtContext, setDoubtContext] = useState(null);
  const [transcriptVisible, setTranscriptVisible] = useState(false);

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
    // This would use a ref to the player to seek
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
        content: `Regarding the video "${doubtContext.videoTitle}" at timestamp ${formatVideoPosition(doubtContext.timestamp)}:

Based on your question about "${input}", the key concept here is the attention mechanism. It allows the model to weigh the importance of different inputs in the sequence. This helps capture long-range dependencies between words or tokens.

Does that answer your question? Would you like more details on this concept?`,
        isDoubtResponse: true,
        relatedToVideo: doubtContext.videoId
      });
      
      // After a doubt is answered, show a "Continue Learning" prompt
      setTimeout(() => {
        addBotMessage({
          type: 'action',
          actionType: ACTION_TYPES.CONTINUE_LEARNING,
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
      content: `Okay, paused at ${formatVideoPosition(timestamp)}. What's your question about "${video.title}"?`
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

  // ---------- RENDER HELPERS ----------
  // Function to render message content based on type
  const renderMessageContent = (message) => {
    switch (message.type) {
      case 'video':
        return (
          <VideoMessage 
            message={message}
            videoState={videoStates[message.videoId] || {}}
            onToggleCollapse={() => toggleVideoCollapse(message.videoId)}
            onAskQuestion={() => startAskingDoubt(message.videoId)}
            onVideoStateChange={(newState) => {
              setVideoStates(prev => ({
                ...prev,
                [message.videoId]: { 
                  ...prev[message.videoId],
                  ...newState 
                }
              }));
            }}
            onSeek={(time) => seekTo(message.videoId, time)}
            ref={(videoId === currentVideoId) ? activeVideoRef : null}
          />
        );
      case 'action':
        return (
          <ActionMessage 
            message={message}
            onContinueLearning={() => jumpToVideo(message.relatedToVideo)}
          />
        );
      default:
        return (
          <TextMessage 
            message={message} 
            onTimestampClick={(videoId, timestamp) => seekTo(videoId, timestamp)}
            onStartButtonClick={handleStartButtonClick}
            onContinueButtonClick={() => {
              addUserMessage("next video");
              generateResponse("next video");
            }}
          />
        );
    }
  };

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
        <CollapsedVideo 
          message={{
            id: currentVideo.id,
            title: currentVideo.title
          }}
          videoState={videoStates[currentVideoId] || {}}
          onExpand={jumpToVideo}
          onAskQuestion={() => startAskingDoubt(currentVideoId)}
        />
      </div>
    );
  };

  // ---------- MAIN RENDER ----------
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans overflow-hidden">
      {/* Header */}
      <Header 
        courseTitle="Generative AI for Developers"
        moduleInfo={`${completedVideos.length} of ${courseVideos.length} completed`}
        learningMode={learningMode}
        clarityLevel={clarityLevel}
        onToggleTranscript={toggleTranscript}
        transcriptVisible={transcriptVisible}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <ChatSidebar 
            chatHistory={chatHistory}
            activeTool={activeTool}
            onSelectTool={handleSelectTool}
            onSelectChat={handleSelectChat}
            isCollapsed={sidebarCollapsed}
            toggleSidebar={toggleSidebarCollapse}
            completedVideos={completedVideos}
            courseVideos={courseVideos}
            currentVideoId={currentVideoId}
          />
        )}

        {/* Main Panel (Chat Area) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* Collapsed Video (if collapsed) */}
          {activeVideoCollapsed && (
            <CollapsedVideo 
              message={{
                id: currentVideoId,
                title: courseVideos.find(v => v.id === currentVideoId)?.title || 'Video'
              }}
              videoState={videoStates[currentVideoId] || {}}
              onExpand={jumpToVideo}
              onAskQuestion={() => startAskingDoubt(currentVideoId)}
            />
          )}

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
                    {renderMessageContent(message)}
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
              <TypingIndicator isVisible={isLoading} />

              {/* Invisible element for scrolling */}
              <div ref={messagesEndRef} style={{ height: '1px' }} />
            </div>
          </main>

          {/* Mode Panel and Input Area */}
          <footer className="border-t border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-3 shadow-inner sticky bottom-0 z-20">
            <ModePanel 
              activeModePanel={activePanel}
              setActiveModePanel={setActivePanel}
              selectedClarity={clarityLevel}
              handleClarityChange={setClarityLevel}
              selectedLearningMode={learningMode}
              handleLearningModeChange={setLearningMode}
            />
            
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
            
            <InputArea
              inputValue={inputValue}
              setInputValue={setInputValue}
              handleSendMessage={handleSendMessage}
              isLoading={isLoading}
              doubtContext={doubtContext}
              isAskingDoubt={isAskingDoubt}
              cancelDoubt={cancelDoubt}
              inputRef={inputRef}
            />
          </footer>
        </div>

        {/* Transcript Panel */}
        {transcriptVisible && (
          <TranscriptPanel
            visible={transcriptVisible}
            onClose={() => setTranscriptVisible(false)}
          />
        )}
      </div>

      {/* Floating Video Player (appears when active video is out of view) */}
      <FloatingVideoPlayer />
    </div>
  );
};

export default CourseChat;