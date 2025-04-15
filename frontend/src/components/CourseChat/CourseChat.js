// src/components/CourseChat/CourseChat.js
import React, { useState, useRef, useEffect } from 'react';
import {
    Settings, MessageSquare
} from 'lucide-react';

// Import components
import ChatSidebar from './ChatSidebar';
import Header from './Header';
import InputArea from './InputArea';
import TextMessage from './TextMessage';
import VideoMessage from './VideoMessage';
import ActionMessage from './ActionMessage';
import TypingIndicator from './TypingIndicator';
import ModePanel from './ModePanel';
import TranscriptPanel from './TranscriptPanel';

// Import hooks
import useVideoState from './hooks/useVideoState';
import useDoubtContext from './hooks/useDoubtContext';
import useMessages from './hooks/useMessages';

// Import utils
import { CLARITY_LEVELS, LEARNING_MODES, INITIAL_MESSAGES } from './utils/constants';
import { formatTime, formatVideoPosition } from './utils/formatters';

/**
 * Enhanced CourseChat component merging features from both versions.
 * Includes sidebar, clarity/mode selection, video-in-chat, and doubt resolution.
 */
const CourseChat = () => {
    // ---------- STATE MANAGEMENT ----------
    // Basic Chat State
    const [inputValue, setInputValue] = useState('');

    // Course/Video State
    const [currentVideoId, setCurrentVideoId] = useState(null); // Holds the ID of the video being played *within* a message
    const [completedVideos, setCompletedVideos] = useState([]); // Array of completed video IDs

    // UI & Mode State
    const [selectedClarity, setSelectedClarity] = useState(CLARITY_LEVELS.INTERMEDIATE);
    const [selectedLearningMode, setSelectedLearningMode] = useState(LEARNING_MODES.NORMAL);
    const [activeModePanel, setActiveModePanel] = useState(null); // 'clarity' or 'learning'
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visibility
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar width state
    const [activeTool, setActiveTool] = useState('progress'); // Default sidebar tool
    const [transcriptVisible, setTranscriptVisible] = useState(false); // Transcript panel visibility

    // Refs
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    
    // Set up custom hooks
    // Video state hook (manages playback for multiple videos)
    const videoStateManager = useVideoState([]);
    
    // Doubt context hook (manages asking questions about videos)
    const doubtManager = useDoubtContext((videoId, newState) => {
        videoStateManager.handleVideoStateChange(videoId, newState);
    });
    
    // Messages hook (manages all chat messages)
    const messageManager = useMessages({
        doubtContext: doubtManager.doubtContext,
        doubtThreads: doubtManager.doubtThreads,
        addToDoubtThread: doubtManager.addToDoubtThread,
        selectedClarity,
        selectedLearningMode
    });

    // ---------- COURSE DATA ----------
    // Example course videos (enhanced structure)
    const courseVideos = [
         {
            id: 1,
            module: "Foundations",
            title: "Introduction to Generative AI",
            description: "Learn the basics of generative artificial intelligence and its applications.",
            url: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4", // Placeholder video
            duration: 30, // Shortened for testing completion
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
            url: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4", // Placeholder video
            duration: 45, // Shortened
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
            url: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4", // Placeholder video
            duration: 40, // Shortened
            transcriptTimestamps: [
                { time: 8, text: "Components of prompts" },
                { time: 20, text: "Few-shot prompting" },
                { time: 35, text: "Chain-of-thought" }
            ]
        }
    ];
    const totalVideos = courseVideos.length;

    // Chat history for the sidebar
    const chatHistory = [
        { id: 1, title: "Intro Discussion", date: "Today", preview: "Welcome! Type 'start'..." }
    ];

    // ---------- LIFECYCLE & EFFECTS ----------
    // Initialize with welcome messages
    useEffect(() => {
        if (messageManager.messages.length === 0) {
            INITIAL_MESSAGES.forEach(msg => {
                messageManager.addBotMessage({
                    content: msg.content,
                    isIntro: true,
                    showStartButton: msg.id === INITIAL_MESSAGES.length // Show start button on last intro message
                });
            });
        }
        inputRef.current?.focus();
    }, []);

    // Auto-scroll chat to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageManager.messages, messageManager.isLoading]);

    // Focus input when starting to ask a doubt
    useEffect(() => {
        if (doubtManager.isAskingDoubt) {
            inputRef.current?.focus();
        }
    }, [doubtManager.isAskingDoubt]);

     // Listen for keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Space to toggle play/pause (when not focused on input and a video is active)
            if (e.code === 'Space' && document.activeElement !== inputRef.current && currentVideoId !== null) {
                e.preventDefault();
                toggleVideoPlayback();
            }
            // Escape to cancel doubt mode
            if (e.code === 'Escape' && doubtManager.isAskingDoubt) {
                doubtManager.cancelDoubt();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentVideoId, doubtManager.isAskingDoubt]);

    // ---------- EVENT HANDLERS ----------

    // --- Sidebar Handlers ---
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const handleSelectTool = (toolId) => setActiveTool(toolId);
    const handleSelectChat = (chatId) => {
        console.log(`Selected chat: ${chatId}`);
        messageManager.addBotMessage({
            content: `Loading chat session ${chatId}... (feature not fully implemented)`
        });
    };

    // --- Video Player Handlers ---
    const toggleVideoPlayback = () => {
        if (currentVideoId) {
            const currentState = videoStateManager.videoStates[currentVideoId];
            videoStateManager.handleVideoStateChange(currentVideoId, { 
                isPlaying: !currentState?.isPlaying 
            });
        }
    };

    // Handle video completion logic
    const handleVideoCompletion = (videoId) => {
        if (!videoId) return;

        // Prevent multiple completions
        if (!completedVideos.includes(videoId)) {
            console.log(`Completing video: ${videoId}`);
            setCompletedVideos(prev => [...prev, videoId]);
            videoStateManager.handleVideoStateChange(videoId, { isPlaying: false }); // Stop playback

            const completedVideo = courseVideos.find(v => v.id === videoId);
            messageManager.addBotMessage({
                content: `Great job completing "${completedVideo?.title}"!`, 
                isCompletion: true
            });

            // Suggest next video
            const currentIndex = courseVideos.findIndex(v => v.id === videoId);
            const nextVideoIndex = currentIndex + 1;
            if (nextVideoIndex < courseVideos.length) {
                const nextVideo = courseVideos[nextVideoIndex];
                messageManager.addBotMessage({
                    content: `Ready for the next lesson: "${nextVideo.title}"?`,
                    showContinueButton: true,
                    nextVideoId: nextVideo.id
                });
            } else {
                messageManager.addBotMessage({
                    content: "Congratulations! You've completed all videos in this module.", 
                    isCourseCompletion: true
                });
            }
        }
    };

    // Handler for when a timestamp is clicked in a message
    const handleTimestampClick = (videoId, seconds) => {
        if (videoStateManager.playerRefs[videoId]) {
            videoStateManager.seekTo(videoId, seconds, true);
            
            // Ensure this video is set as current
            setCurrentVideoId(videoId);
            
            // If the video message is collapsed, expand it
            messageManager.toggleVideoCollapse(videoId, false, videoStateManager.handleVideoStateChange);
            
            // Find the video message element and scroll to it
            const videoMessageElement = document.querySelector(`[data-video-id="${videoId}"]`);
            videoMessageElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // --- Button Click Handlers ---
    const handleStartButtonClick = () => {
        handleSendMessage(null, "start"); // Simulate user typing start
    };

    const handleContinueButtonClick = (nextVideoId) => {
        handleSendMessage(null, "continue"); // Simulate user typing continue
        
        // After a slight delay, add the next video
        setTimeout(() => {
            const nextVideo = courseVideos.find(v => v.id === nextVideoId);
            if (nextVideo) {
                messageManager.addBotMessage({
                    type: 'video',
                    video: nextVideo
                });
                
                setCurrentVideoId(nextVideoId);
                videoStateManager.handleVideoStateChange(nextVideoId, {
                    isPlaying: true,
                    progress: 0,
                    duration: nextVideo.duration
                });
            }
        }, 800);
    };

    const handleResumeButtonClick = () => {
        if (currentVideoId) {
            videoStateManager.handleVideoStateChange(currentVideoId, { isPlaying: true });
            // Find the video message element and scroll to it
            const videoMessageElement = document.querySelector(`[data-video-id="${currentVideoId}"]`);
            videoMessageElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // --- Chat Handlers ---
    const handleSendMessage = (e, overrideText = null) => {
        e?.preventDefault(); // Prevent form submission
        
        // Get input value (from parameter or input field)
        const text = overrideText || inputValue;
        const trimmedInput = text.trim();
        if (!trimmedInput) return;

        // Get doubt context if applicable
        const currentDoubtContext = doubtManager.isAskingDoubt ? doubtManager.doubtContext : null;
        
        // Add user message
        messageManager.addUserMessage(trimmedInput, currentDoubtContext);
        
        // Clear input field and doubt context
        setInputValue('');
        if (doubtManager.isAskingDoubt) {
            doubtManager.cancelDoubt();
        }
        
        // Generate bot response
        messageManager.generateBotResponse(trimmedInput, currentDoubtContext);
    };

    // --- Doubt Handling ---
    const startAskingDoubt = (videoId) => {
        if (!videoId && !currentVideoId) {
            messageManager.addBotMessage({
                content: "Please start playing a video first to ask a question about it."
            });
            return;
        }
        
        const targetVideoId = videoId || currentVideoId;
        const video = courseVideos.find(v => v.id === targetVideoId);
        if (!video) return;
        
        // Pause video
        videoStateManager.handleVideoStateChange(targetVideoId, { isPlaying: false });
        
        // Get current progress
        const timestamp = videoStateManager.videoStates[targetVideoId]?.progress || 0;
        
        // Set doubt context
        doubtManager.startDoubt(targetVideoId, timestamp, videoStateManager.videoStates, () => {
            inputRef.current?.focus();
        });
        
        // Add a message indicating we're asking a doubt
        messageManager.addBotMessage({
            content: `Okay, paused at ${formatVideoPosition(timestamp)}. What's your question about "${video.title}"?`
        });
    };

    // --- Video Handlers ---
    // Toggle collapse state for a video
    const toggleVideoCollapse = (videoId, forceState = null) => {
        messageManager.toggleVideoCollapse(
            videoId, 
            forceState, 
            videoStateManager.handleVideoStateChange
        );
    };

    // Called by VideoMessage when a video is ready
    const handleVideoReady = (videoId) => {
        videoStateManager.handleVideoReady(videoId);
    };

    // Handler for the "Continue Learning" action message
    const continueAfterDoubt = (videoId) => {
        // Resume the video that was paused for the doubt
        if (videoId) {
            setCurrentVideoId(videoId);
            videoStateManager.handleVideoStateChange(videoId, { isPlaying: true });
            
            // Find and scroll to the video
            const videoElement = document.querySelector(`[data-video-id="${videoId}"]`);
            if (videoElement) {
                videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    // Handler for clarity level changes
    const handleClarityChange = (clarityLevel) => {
        setSelectedClarity(clarityLevel);
        setActiveModePanel(null); // Close panel after selection
    };

    // Handler for learning mode changes
    const handleLearningModeChange = (learningMode) => {
        setSelectedLearningMode(learningMode);
        setActiveModePanel(null); // Close panel after selection
    };

    // ---------- RENDER LOGIC ----------
    // Function to render the appropriate message component based on type
    const renderMessage = (message) => {
        // Video message
        if (message.type === 'video') {
            return (
                <VideoMessage 
                    message={message}
                    videoState={videoStateManager.videoStates[message.id] || {}}
                    videoHandlers={{
                        setPlayerRef: videoStateManager.setPlayerRef,
                        handleVideoProgress: videoStateManager.handleVideoProgress,
                        handleVideoDuration: videoStateManager.handleVideoDuration,
                        handleVideoReady,
                        handleVideoStateChange: videoStateManager.handleVideoStateChange,
                        seekTo: videoStateManager.seekTo,
                        toggleVideoCollapse
                    }}
                    onAskQuestion={startAskingDoubt}
                    onToggleTranscript={() => setTranscriptVisible(!transcriptVisible)}
                    transcriptVisible={transcriptVisible}
                />
            );
        }
        
        // Action message (like "Continue Learning")
        if (message.type === 'action') {
            return (
                <ActionMessage 
                    message={message} 
                    onContinueLearning={continueAfterDoubt}
                />
            );
        }
        
        // Default to text message
        return (
            <TextMessage 
                message={message}
                onTimestampClick={handleTimestampClick}
            />
        );
    };

    // ---------- MAIN RENDER ----------
    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans overflow-hidden">
            {/* Header */}
            <Header 
                courseTitle="Generative AI for Developers"
                moduleInfo={`${completedVideos.length} of ${totalVideos} completed`}
                learningMode={selectedLearningMode}
                clarityLevel={selectedClarity}
                onToggleTranscript={() => setTranscriptVisible(!transcriptVisible)}
                transcriptVisible={transcriptVisible}
            />

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                {isSidebarOpen && (
                    <ChatSidebar
                        chatHistory={chatHistory}
                        activeTool={activeTool}
                        onSelectTool={handleSelectTool}
                        onSelectChat={handleSelectChat}
                        isCollapsed={isSidebarCollapsed}
                        toggleSidebar={toggleSidebarCollapse}
                        completedVideos={completedVideos}
                        courseVideos={courseVideos}
                        currentVideoId={currentVideoId}
                    />
                )}

                {/* Main Panel (Chat Area) */}
                <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
                    {/* Chat Messages Area */}
                    <main className="flex-1 overflow-y-auto p-4 lg:p-6" aria-live="polite">
                        <div className="max-w-4xl mx-auto space-y-5">
                            {/* Map messages and render using appropriate function */}
                            {messageManager.messages.map(message => (
                                <article
                                    key={message.id}
                                    className={`flex items-start gap-2 sm:gap-3 relative ${
                                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                                    } ${message.type === 'video' ? 'w-full' : ''}`}
                                    id={message.type === 'video' ? `video-message-${message.id}` : null}
                                    data-video-id={message.type === 'video' ? message.id : null}
                                >
                                    {/* Bot Avatar (only for non-video bot messages) */}
                                    {message.sender === 'bot' && message.type !== 'video' && (
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 mt-1">
                                            <MessageSquare size={16} />
                                        </div>
                                    )}

                                    {/* Message Content */}
                                    <div className={`${message.type === 'video' ? 'w-full' : (message.sender === 'user' ? 'max-w-[80%] sm:max-w-[75%]' : 'max-w-[80%] sm:max-w-[75%]')}`}>
                                        {renderMessage(message)}
                                    </div>

                                    {/* User Avatar */}
                                    {message.sender === 'user' && (
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-600 text-white mt-1">
                                            <MessageSquare size={16} />
                                        </div>
                                    )}
                                </article>
                            ))}

                            {/* Bot Loading/Typing Indicator */}
                            {messageManager.isLoading && <TypingIndicator isVisible={true} />}

                            {/* Invisible element for scrolling */}
                            <div ref={messagesEndRef} style={{ height: '1px' }} />
                        </div>
                    </main>

                    {/* Fixed Bottom Section: Mode Selection & Input Area */}
                    <footer className="border-t border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-3 shadow-inner sticky bottom-0 z-20">
                        {/* Mode Panel (Clarity/Learning) */}
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
                                isLoading={messageManager.isLoading}
                                doubtContext={doubtManager.doubtContext}
                                isAskingDoubt={doubtManager.isAskingDoubt}
                                cancelDoubt={doubtManager.cancelDoubt}
                            />

                            {/* Mode Selection Buttons */}
                            <div className="flex justify-center mt-3 space-x-2">
                                <button 
                                    type="button" 
                                    onClick={() => setActiveModePanel(prev => prev === 'clarity' ? null : 'clarity')}
                                    className={`px-3 py-1.5 rounded-md flex items-center text-sm transition-colors ${activeModePanel === 'clarity' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    aria-expanded={activeModePanel === 'clarity'} 
                                    title="Adjust explanation clarity"
                                >
                                    <Settings size={14} className="mr-1.5" />
                                    <span className="capitalize">{selectedClarity}</span>
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setActiveModePanel(prev => prev === 'learning' ? null : 'learning')}
                                    className={`px-3 py-1.5 rounded-md flex items-center text-sm transition-colors ${activeModePanel === 'learning' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    aria-expanded={activeModePanel === 'learning'} 
                                    title="Change learning mode"
                                >
                                    <Settings size={14} className="mr-1.5" />
                                    <span className="capitalize">{selectedLearningMode}</span>
                                </button>
                            </div>
                        </div>
                    </footer>
                </div> {/* End Main Panel */}
                
                {/* Transcript Panel (if visible) */}
                {transcriptVisible && (
                    <TranscriptPanel
                        visible={transcriptVisible}
                        onClose={() => setTranscriptVisible(false)}
                    />
                )}
            </div> {/* End Main Content Area */}
        </div> // End Root Div
    );
};

export default CourseChat;