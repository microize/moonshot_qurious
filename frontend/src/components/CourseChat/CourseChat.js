// src/components/CourseChat/CourseChat.js
// Main CourseChat component
import React, { useState, useRef, useEffect } from 'react';
import { CLARITY_LEVELS, LEARNING_MODES } from './utils/constants';
import { Brain, Compass, User, Bot } from 'lucide-react';

// Import sub-components
import Header from './Header';
import TextMessage from './TextMessage';
import VideoMessage from './VideoMessage';
import ActionMessage from './ActionMessage';
import InputArea from './InputArea';
import ModePanel from './ModePanel';
import TranscriptPanel from './TranscriptPanel';
import TypingIndicator from './TypingIndicator';

// Import custom hooks
import useVideoState from './hooks/useVideoState';
import useMessages from './hooks/useMessages';
import useDoubtContext from './hooks/useDoubtContext';

/**
 * Main CourseChat component that orchestrates the entire chat interface
 */
const CourseChat = () => {
  // State for input and mode panels
  const [inputValue, setInputValue] = useState('');
  const [activeModePanel, setActiveModePanel] = useState(null);
  const [selectedClarity, setSelectedClarity] = useState(CLARITY_LEVELS.INTERMEDIATE);
  const [selectedLearningMode, setSelectedLearningMode] = useState(LEARNING_MODES.NORMAL);
  const [transcriptVisible, setTranscriptVisible] = useState(false);
  
  // Refs
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Use custom hooks
  const videoState = useVideoState();
  
  const doubtContext = useDoubtContext(videoState.handleVideoStateChange);
  
  const messageContext = useMessages({
    doubtContext: doubtContext.doubtContext,
    doubtThreads: doubtContext.doubtThreads,
    addToDoubtThread: doubtContext.addToDoubtThread,
    selectedClarity,
    selectedLearningMode
  });
  
  // Destructure values from hooks for easier use
  const { messages, isLoading, addUserMessage, generateBotResponse } = messageContext;
  const { videoStates, playerRefs } = videoState;
  const { isAskingDoubt, startDoubt, cancelDoubt } = doubtContext;
  
  // Auto-scroll to the bottom of the chat list when new messages are added or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  
  // Focus input when requested
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    document.addEventListener('focus-chat-input', focusInput);
    return () => document.removeEventListener('focus-chat-input', focusInput);
  }, []);
  
  // Handle requesting next video
  useEffect(() => {
    const handleNextVideo = (e) => {
      handleSendMessage({
        preventDefault: () => {},
        target: { value: 'next video' }
      });
    };
    
    document.addEventListener('request-next-video', handleNextVideo);
    return () => document.removeEventListener('request-next-video', handleNextVideo);
  }, []);

  // Handler for sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Add user message to the chat
    addUserMessage(trimmedInput, isAskingDoubt ? { ...doubtContext.doubtContext } : null);
    
    // Store the context before resetting state, as state updates might be async
    const currentDoubtContext = isAskingDoubt ? { ...doubtContext.doubtContext } : null;
    
    // Reset input and doubt state
    setInputValue('');
    cancelDoubt();
    
    // Generate bot response
    generateBotResponse(trimmedInput, currentDoubtContext);
  };
  
  // Handler for clicking a timestamp in a message
  const handleTimestampClick = (videoId, timestamp) => {
    // Scroll the video message into view
    const videoElement = document.getElementById(`video-message-${videoId}`);
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Ensure the video is expanded
    messageContext.toggleVideoCollapse(videoId, false, videoState.handleVideoStateChange);

    // Seek to the timestamp
    videoState.seekTo(videoId, timestamp, true);
  };
  
  // Handler for continuing learning after a doubt is answered
  const handleContinueLearning = (videoId) => {
    const videoMessage = messages.find(m => m.id === videoId);
    if (!videoMessage) return;

    // Ensure the video is expanded
    if (videoMessage.isCollapsed) {
      messageContext.toggleVideoCollapse(videoId, false, videoState.handleVideoStateChange);
    }

    // Scroll the video message into view
    const element = document.getElementById(`video-message-${videoId}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Resume playback after a short delay to allow for scroll/expand animations
    setTimeout(() => {
      videoState.handleVideoStateChange(videoId, { isPlaying: true });
    }, 300);
  };
  
  // Handle clarity mode change
  const handleClarityChange = (clarityId) => {
    setSelectedClarity(clarityId);
  };

  // Handle learning mode change
  const handleLearningModeChange = (modeId) => {
    setSelectedLearningMode(modeId);
  };
  
  // Toggle transcript panel
  const toggleTranscript = () => {
    setTranscriptVisible(!transcriptVisible);
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <Header 
        learningMode={selectedLearningMode}
        clarityLevel={selectedClarity}
        onToggleTranscript={toggleTranscript}
        transcriptVisible={transcriptVisible}
      />
      
      {/* Main Content Area (Chat + Optional Side Panel) */}
      <main className="flex-1 flex overflow-hidden">
        {/* Chat Messages Area */}
        <section className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 lg:p-6" aria-live="polite">
          <div className="max-w-4xl mx-auto space-y-5">
            {/* Map through messages and render each one */}
            {messages.map((message) => (
              <article
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2 sm:gap-3 relative`}
                id={message.type === 'video' ? `video-message-${message.id}` : null}
              >
                {/* Bot Avatar */}
                {message.sender === 'bot' && !message.type && (
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br ${
                    message.isDoubtResponse 
                      ? 'from-green-400 to-emerald-600 dark:from-green-500 dark:to-emerald-700' 
                      : 'from-amber-400 to-orange-600 dark:from-amber-500 dark:to-orange-700'
                  }`}>
                    <Bot size={16} />
                  </div>
                )}

                {/* Message Content Container */}
                <div className={`w-full ${
                  message.sender === 'user' 
                    ? 'max-w-[75%] sm:max-w-[70%]' 
                    : (message.type === 'video' ? 'max-w-full' : 'max-w-[75%] sm:max-w-[70%]')
                }`}>
                  {/* Text Message */}
                  {!message.type && (
                    <TextMessage 
                      message={message}
                      onTimestampClick={handleTimestampClick}
                    />
                  )}
                  
                  {/* Video Message */}
                  {message.type === 'video' && (
                    <VideoMessage
                      message={message}
                      videoState={videoStates[message.id]}
                      videoHandlers={{
                        setPlayerRef: videoState.setPlayerRef,
                        handleVideoProgress: videoState.handleVideoProgress,
                        handleVideoDuration: videoState.handleVideoDuration,
                        handleVideoReady: videoState.handleVideoReady,
                        handleVideoStateChange: videoState.handleVideoStateChange,
                        seekTo: videoState.seekTo,
                        toggleVideoCollapse: (messageId, forceState) => 
                          messageContext.toggleVideoCollapse(messageId, forceState, videoState.handleVideoStateChange)
                      }}
                      onAskQuestion={(videoId) => startDoubt(
                        videoId, 
                        null, 
                        videoStates, 
                        () => inputRef.current?.focus()
                      )}
                      onToggleTranscript={toggleTranscript}
                      transcriptVisible={transcriptVisible}
                    />
                  )}
                  
                  {/* Action Message */}
                  {message.type === 'action' && (
                    <ActionMessage
                      message={message}
                      onContinueLearning={handleContinueLearning}
                    />
                  )}
                </div>

                {/* User Avatar */}
                {message.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                    <User size={16} />
                  </div>
                )}
              </article>
            ))}

            {/* Bot Loading/Typing Indicator */}
            <TypingIndicator isVisible={isLoading} />

            {/* Invisible element at the end of the list to target for scrolling */}
            <div ref={messagesEndRef} style={{ height: '1px' }} />
          </div>
        </section>

        {/* Right Sidebar: Transcript & Resources */}
        <TranscriptPanel 
          visible={transcriptVisible} 
          onClose={() => setTranscriptVisible(false)} 
        />
      </main>

      {/* Fixed Bottom Section: Mode Selection & Input Area */}
      <footer className="border-t border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-3 shadow-inner sticky bottom-0 z-20">
        {/* Mode Selection Panel */}
        <ModePanel
          activeModePanel={activeModePanel}
          setActiveModePanel={setActiveModePanel}
          selectedClarity={selectedClarity}
          handleClarityChange={handleClarityChange}
          selectedLearningMode={selectedLearningMode}
          handleLearningModeChange={handleLearningModeChange}
        />

        {/* Input Area */}
        <div className="max-w-4xl mx-auto">
          <InputArea
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
            doubtContext={doubtContext.doubtContext}
            isAskingDoubt={isAskingDoubt}
            cancelDoubt={cancelDoubt}
          />

          {/* Mode Selection Buttons */}
          <div className="flex justify-center mt-3 space-x-2">
            <button
              type="button"
              onClick={() => setActiveModePanel(prev => prev === 'clarity' ? null : 'clarity')}
              className={`btn-mode-selector ${activeModePanel === 'clarity' ? 'btn-mode-selector-active' : ''}`}
              aria-expanded={activeModePanel === 'clarity'}
              title="Adjust explanation clarity"
            >
              <Brain size={16} className="mr-1.5" />
              <span className="text-xs">{selectedClarity} clarity</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModePanel(prev => prev === 'learning' ? null : 'learning')}
              className={`btn-mode-selector ${activeModePanel === 'learning' ? 'btn-mode-selector-active' : ''}`}
              aria-expanded={activeModePanel === 'learning'}
              title="Change learning mode"
            >
              <Compass size={16} className="mr-1.5" />
              <span className="text-xs">{selectedLearningMode} mode</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CourseChat;