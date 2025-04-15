// src/components/CourseChat/CourseChat.js - Merged Version (Video in Chat Flow)
import React, { useState, useRef, useEffect } from 'react';
import {
    Bot, User, ChevronRight, HelpCircle, BookOpen, Menu, Play, Pause,
    Volume2, VolumeX, Settings, CheckCircle, CornerDownRight, Clock,
    Award, MessageSquare, X, History, SlidersHorizontal, ChevronLeft,
    FileText, Download // Added FileText, Download from lucide
} from 'lucide-react';
import ReactPlayer from 'react-player/lazy';

// --- Constants ---
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

// --- Helper Functions ---
const formatTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
        return '--:--';
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Format seconds into MM:SS
const formatDuration = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};


// --- Placeholder ChatSidebar Component ---
// (Keep the sidebar component as it was in the previous merged version)
const ChatSidebar = ({
    chatHistory,
    activeTool,
    onSelectTool,
    onSelectChat,
    isCollapsed,
    toggleSidebar,
    completedVideos,
    courseVideos,
    currentVideoId // ID of the video currently playing *within* a message
}) => {
    const tools = [
        { id: 'history', label: 'Chat History', icon: History },
        { id: 'progress', label: 'Course Progress', icon: Award },
    ];

     // Find the video object that corresponds to the currentVideoId
     const currentVideoPlaying = courseVideos.find(v => v.id === currentVideoId);

    return (
        <aside className={`flex flex-col border-r border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
            {/* Sidebar Header */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between h-[65px]">
                {!isCollapsed && <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Learning Tools</span>}
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Tool Selection */}
            <nav className="p-2 space-y-1 border-b border-gray-200 dark:border-gray-700/50">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => onSelectTool(tool.id)}
                        className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTool === tool.id
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                        title={tool.label}
                    >
                        <tool.icon size={isCollapsed ? 20 : 16} className={!isCollapsed ? 'mr-2' : ''} />
                        {!isCollapsed && <span>{tool.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Content Area (History or Progress) */}
            <div className="flex-1 overflow-y-auto p-2">
                {/* Chat History View */}
                {activeTool === 'history' && (
                    <div className="space-y-2">
                        {!isCollapsed && <h3 className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 px-2 mb-2">Recent Chats</h3>}
                        {chatHistory.map(chat => (
                            <button
                                key={chat.id}
                                onClick={() => onSelectChat(chat.id)}
                                className={`w-full p-2 rounded-md text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${isCollapsed ? 'h-10 flex items-center justify-center' : ''}`}
                                title={chat.title}
                            >
                                {isCollapsed ? (
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
                        {chatHistory.length === 0 && !isCollapsed && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 px-2">No chat history yet.</p>
                        )}
                    </div>
                )}

                {/* Course Progress View */}
                {activeTool === 'progress' && (
                     <div className="space-y-2">
                        {!isCollapsed && <h3 className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 px-2 mb-2">Video Progress</h3>}
                        {/* Optionally show current video playing */}
                         {!isCollapsed && currentVideoPlaying && (
                            <div className="px-2 py-1 mb-2 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Now Playing:</p>
                                <p className="text-sm font-medium text-amber-700 dark:text-amber-300 truncate">{currentVideoPlaying.title}</p>
                            </div>
                        )}
                        {courseVideos.map((video, index) => (
                             <div
                                key={video.id}
                                className={`flex items-center p-2 rounded-md ${isCollapsed ? 'justify-center' : ''} ${currentVideoId === video.id ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                                title={video.title}
                            >
                                <div className={`flex-shrink-0 ${isCollapsed ? '' : 'mr-2'}`}>
                                    {completedVideos.includes(video.id) ? (
                                        <CheckCircle size={isCollapsed ? 20 : 16} className="text-green-500" />
                                    ) : (
                                        // Show play icon if it's the current video, clock otherwise
                                        currentVideoId === video.id ?
                                        <Play size={isCollapsed ? 20 : 16} className="text-amber-500" />
                                        : <Clock size={isCollapsed ? 20 : 16} className="text-gray-400 dark:text-gray-500" />
                                    )}
                                </div>
                                {!isCollapsed && (
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


/**
 * Enhanced CourseChat component merging features from both versions.
 * Includes sidebar, clarity/mode selection, video-in-chat, and doubt resolution.
 */
const CourseChat = () => {
    // ---------- STATE MANAGEMENT ----------
    // Basic Chat State
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Course/Video State
    const [currentVideoId, setCurrentVideoId] = useState(null); // Holds the ID of the video being played *within* a message
    const [completedVideos, setCompletedVideos] = useState([]); // Array of completed video IDs

    // Video Player State (applies to the video currently playing, identified by currentVideoId)
    const [videoState, setVideoState] = useState({
        playing: false,
        // progress: 0, // Use playedSeconds instead for consistency with ReactPlayer state
        playedSeconds: 0,
        duration: 0,
        volume: 0.8,
        muted: false,
        playbackRate: 1,
        showControls: false, // Show controls on hover/interaction within video message
    });
    // const [showPlaybackRates, setShowPlaybackRates] = useState(false); // Playback rate handled by native controls if enabled, or can be added back

    // Doubt State
    const [doubtContext, setDoubtContext] = useState(null); // { videoId, videoTitle, timestamp }
    const [isAskingDoubt, setIsAskingDoubt] = useState(false);

    // UI & Mode State
    const [selectedClarity, setSelectedClarity] = useState(CLARITY_LEVELS.INTERMEDIATE);
    const [selectedLearningMode, setSelectedLearningMode] = useState(LEARNING_MODES.NORMAL);
    const [activeModePanel, setActiveModePanel] = useState(null); // 'clarity' or 'learning'
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visibility
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar width state
    const [activeTool, setActiveTool] = useState('progress'); // Default sidebar tool
    // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state (if needed)

    // Refs
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const playerRef = useRef(null); // Ref to the ReactPlayer instance *within* the active video message
    // const controlsTimeoutRef = useRef(null); // Timeout for hiding controls (might not be needed if using default controls or simpler hover)

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
        const welcomeMessages = [
            { id: Date.now(), sender: 'bot', content: "Welcome! I'm your AI learning assistant.", timestamp: new Date(), isIntro: true },
            { id: Date.now() + 1, sender: 'bot', content: "We'll cover implementing generative AI.", timestamp: new Date(), isIntro: true },
            { id: Date.now() + 2, sender: 'bot', content: "Type 'start' to begin the first lesson, or ask questions anytime!", timestamp: new Date(), isIntro: true, showStartButton: true }
        ];
        setMessages(welcomeMessages);
        inputRef.current?.focus();
    }, []);

    // Auto-scroll chat to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Focus input when starting to ask a doubt
    useEffect(() => {
        if (isAskingDoubt) {
            inputRef.current?.focus();
        }
    }, [isAskingDoubt]);

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
        // Dependencies: playing state and isAskingDoubt to re-bind if they change, currentVideoId to enable/disable spacebar
    }, [videoState.playing, isAskingDoubt, currentVideoId]);


    // ---------- EVENT HANDLERS ----------

    // --- Sidebar Handlers ---
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);
    const handleSelectTool = (toolId) => setActiveTool(toolId);
    const handleSelectChat = (chatId) => {
        console.log(`Selected chat: ${chatId}`);
        addMessage('bot', `Loading chat session ${chatId}... (feature not fully implemented)`);
    };

    // --- Video Player Handlers (applied via renderVideoMessage) ---
    const toggleVideoPlayback = () => {
        setVideoState(prev => ({ ...prev, playing: !prev.playing }));
    };

    // Called by ReactPlayer's onProgress when the *active* video message plays
    const handleVideoProgress = (state) => {
        // state contains played, playedSeconds, loaded, loadedSeconds
        setVideoState(prev => ({
            ...prev,
            // progress: state.played, // Use playedSeconds if duration is known
            playedSeconds: state.playedSeconds,
        }));

        // Check for completion (using a threshold before onEnded for robustness)
         if (videoState.duration > 0 && state.playedSeconds >= videoState.duration * 0.98) {
             handleVideoCompletion();
         }
    };

    // Called by ReactPlayer's onDuration when the *active* video message loads
    const handleDuration = (duration) => {
        setVideoState(prev => ({ ...prev, duration }));
    };

     // Called by ReactPlayer's onEnded
     const handleVideoEnded = () => {
         console.log('Video ended callback');
         handleVideoCompletion();
     };

    // Handle video completion logic
    const handleVideoCompletion = () => {
        if (!currentVideoId) return;

        // Prevent multiple completions
        if (!completedVideos.includes(currentVideoId)) {
            console.log(`Completing video: ${currentVideoId}`);
            setCompletedVideos(prev => [...prev, currentVideoId]);
            setVideoState(prev => ({ ...prev, playing: false })); // Stop playback

            const completedVideo = courseVideos.find(v => v.id === currentVideoId);
            addMessage('bot', `Great job completing "${completedVideo?.title}"!`, { isCompletion: true });

            // Suggest next video
            const currentIndex = courseVideos.findIndex(v => v.id === currentVideoId);
            const nextVideoIndex = currentIndex + 1;
            if (nextVideoIndex < courseVideos.length) {
                const nextVideo = courseVideos[nextVideoIndex];
                 addMessage('bot', `Ready for the next lesson: "${nextVideo.title}"?`, {
                    showContinueButton: true,
                    nextVideoId: nextVideo.id
                });
            } else {
                addMessage('bot', "Congratulations! You've completed all videos in this module.", { isCourseCompletion: true });
            }
        }
    };


    // Seek to a specific point in the *current* video
    const seekToTimestamp = (seconds) => {
        if (playerRef.current) {
            playerRef.current.seekTo(seconds, 'seconds');
            // Ensure video plays after seeking if it wasn't playing
            if (!videoState.playing) {
                 setVideoState(prev => ({ ...prev, playing: true }));
            }
        }
    };

     // --- Button Click Handlers ---
     const handleStartButtonClick = () => {
        addMessage('user', "start"); // Simulate user typing start
        simulateBotResponse('start');
    };

    const handleContinueButtonClick = (nextVideoId) => {
        addMessage('user', "continue"); // Simulate user typing continue
        simulateBotResponse('continue', nextVideoId); // Pass nextVideoId for context
    };

    const handleResumeButtonClick = () => {
        if (currentVideoId) {
            setVideoState(prev => ({ ...prev, playing: true }));
            // Optionally, add a message or scroll focus back to the video
            // Find the video message element and scroll to it
            const videoMessageElement = document.querySelector(`[data-video-id="${currentVideoId}"]`);
            videoMessageElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // --- Chat Handlers ---
    const addMessage = (sender, content, options = {}) => {
        const newMessage = {
            id: Date.now() + Math.random(),
            sender,
            content,
            timestamp: new Date(),
            ...options // Include flags like isIntro, showStartButton, type, video, doubtContext etc.
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    const handleSendMessage = (e) => {
        e?.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;

        const messageOptions = {};
        if (isAskingDoubt) {
            messageOptions.doubtContext = doubtContext; // Attach context if asking doubt
        }

        addMessage('user', trimmedInput, messageOptions);
        setInputValue('');

        // Clear doubt mode *after* sending the message with context
        if (isAskingDoubt) {
            setIsAskingDoubt(false);
            setDoubtContext(null);
        }

        setIsLoading(true);
        simulateBotResponse(trimmedInput);
    };

    // --- Video Completion (Manual) ---
    // This might be redundant if handleVideoCompletion works reliably
    const markVideoCompleted = (videoId) => {
        if (!completedVideos.includes(videoId)) {
            setCompletedVideos(prev => [...prev, videoId]);
            console.log(`Video ${videoId} marked as completed`);
        }
    };

    // --- Doubt Handling ---
    const startAskingDoubt = () => {
        if (!currentVideoId) {
             addMessage('bot', "Please start playing a video first to ask a question about it.");
            return;
        }

        const currentVideo = courseVideos.find(v => v.id === currentVideoId);
        if (!currentVideo) return;

        setVideoState(prev => ({ ...prev, playing: false })); // Pause video

        setDoubtContext({
            videoId: currentVideo.id,
            videoTitle: currentVideo.title,
            timestamp: videoState.playedSeconds // Use playedSeconds
        });
        setIsAskingDoubt(true);
        addMessage('bot', `Okay, paused at ${formatDuration(videoState.playedSeconds)}. What's your question about "${currentVideo.title}"?`);
        inputRef.current?.focus();
    };

    // Cancel doubt mode
    const cancelDoubt = () => {
        setIsAskingDoubt(false);
        setDoubtContext(null);
        // Optionally add a message indicating cancellation
        addMessage('bot', "Okay, cancelling the question. You can resume the video or ask something else.");
        // Optionally resume video? Or let user click resume.
        // if (currentVideoId) setVideoState(prev => ({ ...prev, playing: true }));
    };


    // ---------- BOT RESPONSE LOGIC ----------
    // (Modified to handle video messages and button flags)
    const simulateBotResponse = (userInput, contextId = null) => {
        const lowerInput = userInput.toLowerCase();

        setTimeout(() => {
            let botMessages = []; // Can add multiple messages at once
            let videoToPlay = null; // Track if a video needs to start playing

            // 1. Handle 'start' command
            if (lowerInput === 'start' && currentVideoId === null) {
                const firstVideo = courseVideos[0];
                if (firstVideo) {
                    botMessages.push({ sender: 'bot', content: `Let's start with: ${firstVideo.title}.` });
                    botMessages.push({ sender: 'bot', type: 'video', video: firstVideo });
                    videoToPlay = firstVideo; // Signal to start this video
                } else {
                    botMessages.push({ sender: 'bot', content: "No videos found in this course." });
                }
            }
            // 2. Handle 'continue' or 'next video' command
            else if (lowerInput === 'continue' || lowerInput.includes('next video')) {
                const nextVideoIdToLoad = contextId ?? // Use contextId if provided (from button click)
                                          (currentVideoId ? // Otherwise find next based on current
                                            (courseVideos[courseVideos.findIndex(v => v.id === currentVideoId) + 1]?.id)
                                            : null);

                if (nextVideoIdToLoad) {
                     const nextVideo = courseVideos.find(v => v.id === nextVideoIdToLoad);
                     if (nextVideo) {
                         // Mark previous as complete if applicable
                         if (currentVideoId && !completedVideos.includes(currentVideoId)) {
                              markVideoCompleted(currentVideoId); // Ensure previous is marked done
                         }
                         botMessages.push({ sender: 'bot', content: `Okay, moving on to: ${nextVideo.title}.` });
                         botMessages.push({ sender: 'bot', type: 'video', video: nextVideo });
                         videoToPlay = nextVideo;
                     } else {
                         botMessages.push({ sender: 'bot', content: "Couldn't find the next video." });
                     }
                } else if (currentVideoId) {
                     // Already at the last video
                     if (!completedVideos.includes(currentVideoId)) {
                         markVideoCompleted(currentVideoId);
                     }
                     botMessages.push({ sender: 'bot', content: "You've finished the last video!" });
                } else {
                     // Typed 'next' but nothing was playing
                     botMessages.push({ sender: 'bot', content: "Please start a video first." });
                }
            }
            // 3. Handle doubt context response (check original user message for context)
            else if (messages[messages.length-1]?.doubtContext) { // Check the last user message sent
                const userMessageWithDoubt = messages[messages.length-1];
                 botMessages.push({
                    sender: 'bot',
                    content: generateDoubtResponse(userInput, userMessageWithDoubt.doubtContext),
                    isDoubtResponse: true,
                    relatedToVideo: userMessageWithDoubt.doubtContext.videoId,
                    includeResumePrompt: true // Add flag to show resume button
                 });
            }
            // 4. General query response
            else {
                 botMessages.push({
                    sender: 'bot',
                    content: generateGeneralResponse(userInput, selectedClarity, selectedLearningMode)
                 });
            }

            // Add all generated bot messages
            botMessages.forEach(msgData => addMessage(msgData.sender, msgData.content, msgData));

            // Update video player state if a new video should start
            if (videoToPlay) {
                setCurrentVideoId(videoToPlay.id);
                setVideoState(prev => ({
                    ...prev,
                    playing: true, // Auto-play
                    playedSeconds: 0,
                    duration: videoToPlay.duration || 0, // Use known duration
                }));
            }

            setIsLoading(false);

        }, 800 + Math.random() * 500);
    };

    // Generate a response for a doubt (using old logic structure)
    const generateDoubtResponse = (doubt, context) => {
        const timestampText = formatDuration(context.timestamp);
        const video = courseVideos.find(v => v.id === context.videoId);
        const relevantTranscript = video?.transcriptTimestamps
            ?.filter(t => t.time <= context.timestamp)
            .pop()?.text || "that part of the video";

        let response = `Regarding "${doubt}" at ${timestampText} in "${context.videoTitle}":\n\n`;
        response += `At this point (${relevantTranscript}), the key idea is... [Simulated detailed explanation based on '${doubt}' and '${relevantTranscript}'].\n\n`;
        response += "Does that help clarify? Let me know if you have follow-up questions.";
        // The "Resume Video" prompt is handled by the includeResumePrompt flag now.
        return response;
    };

    // Generate a general response (incorporating clarity/mode)
    const generateGeneralResponse = (input, clarity, mode) => {
        let response = "";
        // Basic response based on input keywords
        if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
            response = "Hello! How can I assist with your learning today? ";
        } else if (input.toLowerCase().includes('thank')) {
            response = "You're welcome! Happy to help. ";
        } else {
             response = `Regarding "${input}": `;
        }

        // Add clarity-based explanation
        if (clarity === CLARITY_LEVELS.BASIC) {
            response += "Basically, [simple explanation]. ";
        } else if (clarity === CLARITY_LEVELS.ADVANCED) {
            response += "From a technical standpoint, [advanced explanation]. ";
        } else { // Intermediate
            response += "[Standard explanation]. ";
        }

        // Add mode-specific elements
        if (mode === LEARNING_MODES.COMPREHENSIVE) {
            response += "Want to explore related details? ";
        } else if (mode === LEARNING_MODES.EXPRESS) {
            response += "That's the gist. ";
        } else if (mode === LEARNING_MODES.PRACTICAL) {
            response += "Practically, you'd use [tool/library]. ";
        } else if (mode === LEARNING_MODES.ASSESSMENT) {
             response += "Can you explain that back or give an example? ";
        }

        response += "What else can I help you with?";
        return response;
    };

    // ---------- RENDER METHODS ----------

    // Render text with clickable timestamps (MM:SS)
    const renderWithTimestamps = (text) => {
        if (!text || !currentVideoId) return text; // Only make clickable if a video is active

        const timeRegex = /\b(\d{1,2}):(\d{2})\b/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = timeRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            const minutes = parseInt(match[1]);
            const seconds = parseInt(match[2]);
            const totalSeconds = minutes * 60 + seconds;

            parts.push(
                <button
                    key={match.index}
                    className="text-amber-600 dark:text-amber-400 font-medium hover:underline focus:outline-none focus:ring-1 focus:ring-amber-500 rounded"
                    onClick={() => seekToTimestamp(totalSeconds)}
                    title={`Seek video to ${match[0]}`}
                >
                    {match[0]}
                </button>
            );
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }
        return parts;
    };


    // Render a text message (using old logic structure)
    const renderTextMessage = (message) => {
        const isUser = message.sender === 'user';

        return (
            <div className={`rounded-xl px-4 py-3 text-sm shadow-md relative ${
                isUser
                    ? 'bg-amber-500 text-white rounded-br-none ml-auto max-w-[85%]' // Adjusted max-width
                    : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 rounded-bl-none mr-auto max-w-[85%]' // Adjusted max-width
            }`}>
                {/* Doubt context (shown on user message asking the doubt) */}
                {message.doubtContext && isUser && (
                    <div className="bg-amber-100/60 dark:bg-amber-900/40 rounded px-2 py-1 mb-2 text-xs flex items-center text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-700/50">
                        <CornerDownRight size={12} className="mr-1.5 flex-shrink-0" />
                        <span>Re: "{message.doubtContext.videoTitle}" at {formatDuration(message.doubtContext.timestamp)}</span>
                    </div>
                )}

                {/* Doubt response indicator (shown on bot's answer) */}
                {message.isDoubtResponse && !isUser && (
                    <div className="bg-green-100/50 dark:bg-green-900/40 rounded px-2 py-1 mb-2 text-xs text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700/50 flex items-center">
                        <CheckCircle size={12} className="mr-1.5 inline" /> Answer regarding video content
                    </div>
                )}

                {/* Message text with clickable timestamps */}
                <div className="whitespace-pre-wrap leading-relaxed">
                    {isUser ? message.content : renderWithTimestamps(message.content)}
                </div>

                {/* Resume video prompt after doubt resolution */}
                {message.includeResumePrompt && !isUser && (
                    <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-end">
                        <button
                            onClick={handleResumeButtonClick}
                            className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-md text-sm hover:bg-amber-200 dark:hover:bg-amber-900/40 transition-colors flex items-center"
                        >
                            <Play size={14} className="mr-1.5 fill-current" />
                            Resume Video
                        </button>
                    </div>
                )}

                {/* Start button for intro message */}
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

                {/* Continue button for next video */}
                {message.showContinueButton && !isUser && (
                    <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-center">
                        <button
                            onClick={() => handleContinueButtonClick(message.nextVideoId)}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 flex items-center"
                        >
                            Continue to Next Lesson
                            <ChevronRight size={16} className="ml-1" />
                        </button>
                    </div>
                )}

                {/* Timestamp */}
                <div className={`text-xs mt-1.5 ${
                    isUser
                        ? 'text-amber-100/80 text-right'
                        : 'text-gray-400 dark:text-gray-500 text-left'
                }`}>
                    {formatTime(message.timestamp)}
                </div>
            </div>
        );
    };

    // Render a video message (using old logic structure)
    const renderVideoMessage = (message) => {
        const video = message.video;
        if (!video) return null; // Should not happen if type is 'video'

        // Check if this is the video currently being controlled
        const isCurrentVideo = currentVideoId === video.id;

        return (
            <div
                className="w-full bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 mb-4 animate-fade-in"
                data-video-id={video.id} // Add data attribute for scrolling/selection
            >
                {/* Video Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center min-w-0"> {/* Added min-w-0 for flex truncation */}
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 flex items-center justify-center text-white shadow-md flex-shrink-0 mr-3">
                            <BookOpen size={20} />
                        </div>
                        <div className="flex-1 min-w-0"> {/* Added min-w-0 */}
                            <h3 className="font-semibold text-gray-800 dark:text-white truncate">{video.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                Video {courseVideos.findIndex(v => v.id === video.id) + 1} of {courseVideos.length} • {video.module}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center flex-shrink-0 ml-2"> {/* Added flex-shrink-0 */}
                        {/* Completion indicator */}
                        {completedVideos.includes(video.id) && (
                            <span className="text-xs flex items-center text-green-500 mr-2 whitespace-nowrap">
                                <CheckCircle size={14} className="mr-1" />
                                Completed
                            </span>
                        )}
                        <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                            {formatDuration(video.duration)}
                        </span>
                    </div>
                </div>

                {/* Video Player */}
                <div
                    className="aspect-video bg-black rounded-lg overflow-hidden shadow-inner relative group"
                    // Removed hover controls from here, rely on ReactPlayer controls prop
                >
                    <ReactPlayer
                        // Assign ref only if this is the currently active video
                        ref={isCurrentVideo ? playerRef : null}
                        url={video.url}
                        width="100%"
                        height="100%"
                        playing={isCurrentVideo ? videoState.playing : false} // Only play if it's the current video
                        volume={videoState.volume}
                        muted={videoState.muted}
                        playbackRate={videoState.playbackRate}
                        controls // Use ReactPlayer's built-in controls
                        onProgress={isCurrentVideo ? handleVideoProgress : undefined} // Attach handlers only if current
                        onDuration={isCurrentVideo ? handleDuration : undefined}
                        onEnded={isCurrentVideo ? handleVideoEnded: undefined}
                        onPlay={isCurrentVideo ? () => setVideoState(p=>({...p, playing: true})) : undefined}
                        onPause={isCurrentVideo ? () => setVideoState(p=>({...p, playing: false})) : undefined}
                        // If not the current video, show a play overlay maybe?
                        light={!isCurrentVideo ? true : false} // Show preview image if not current
                        playIcon={ // Custom play icon for the preview
                             <button className="p-4 rounded-full bg-amber-500 hover:bg-amber-600 text-white transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-300">
                                <Play size={32} className="fill-white" />
                            </button>
                        }
                         onClickPreview={() => { // When preview is clicked
                             if (!isCurrentVideo) {
                                 setCurrentVideoId(video.id); // Set this as the current video
                                 setVideoState(prev => ({ // Reset state for this video
                                     ...prev,
                                     playing: true,
                                     playedSeconds: 0,
                                     duration: video.duration || 0
                                 }));
                                 // Add a message indicating which video is now playing
                                 addMessage('system', `Playing: "${video.title}"`);
                             }
                         }}
                        config={{
                            file: {
                                attributes: {
                                    // Optional: customize controls if needed, but 'controls' prop is simpler
                                    // controlsList: 'nodownload',
                                }
                            }
                        }}
                    />
                </div>

                {/* Video description and actions */}
                <div className="mt-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {video.description}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-between items-center">
                         {/* Left Aligned Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {/* Resource buttons */}
                             <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <FileText size={14} className="mr-1.5" />
                                Transcript
                            </button>
                            <button className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <Download size={14} className="mr-1.5" />
                                Resources
                            </button>
                        </div>

                         {/* Right Aligned Buttons */}
                         <div className="flex flex-wrap gap-2">
                            {/* Ask doubt button - only shown for the currently active video */}
                            {isCurrentVideo && (
                                <button
                                    onClick={startAskingDoubt}
                                    className="px-3 py-1.5 text-sm bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg flex items-center hover:bg-amber-200 dark:hover:bg-amber-900/40 transition-colors"
                                >
                                    <HelpCircle size={14} className="mr-1.5" />
                                    Ask a Doubt
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    // ---------- MAIN RENDER ----------
    return (
        <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans overflow-hidden">
            {/* Header */}
            <header className="border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30 h-[65px]">
                <div className="max-w-full mx-auto px-4 py-3 h-full">
                    <div className="flex items-center justify-between h-full">
                        {/* Left Side: Sidebar Toggle & Course Info */}
                        <div className="flex items-center gap-3">
                            <button
                                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={isSidebarOpen ? toggleSidebarCollapse : toggleSidebar}
                                aria-label={isSidebarOpen ? (isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar") : "Open sidebar"}
                                title={isSidebarOpen ? (isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar") : "Open sidebar"}
                            >
                                {isSidebarOpen ? (isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />) : <Menu size={20} />}
                            </button>
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <h1 className="text-base sm:text-lg font-semibold tracking-tight leading-tight truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                                    Generative AI for Developers
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize truncate">
                                    {currentVideoId ? `Video ${courseVideos.findIndex(v => v.id === currentVideoId) + 1} of ${totalVideos}` : `Total ${totalVideos} Videos`}
                                     • {selectedLearningMode} Mode • {selectedClarity} Clarity
                                </p>
                            </div>
                        </div>
                        {/* Right Side (Optional) */}
                    </div>
                </div>
            </header>

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
                        currentVideoId={currentVideoId} // Pass the ID of the active video
                    />
                )}

                {/* Main Panel (Chat Area) */}
                <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
                    {/* Chat Messages Area */}
                     <main className="flex-1 overflow-y-auto p-4 lg:p-6" aria-live="polite">
                        <div className="max-w-4xl mx-auto space-y-5">
                             {/* Map messages and render using appropriate function */}
                            {messages.map(message => (
                                <article
                                    key={message.id}
                                    // Use w-full for video messages to allow them to span width
                                    className={`flex items-start gap-2 sm:gap-3 relative ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${message.type === 'video' ? 'w-full' : ''}`}
                                >
                                    {/* Bot Avatar (only for non-video bot messages) */}
                                    {message.sender === 'bot' && message.type !== 'video' && (
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 mt-1">
                                            <Bot size={16} />
                                        </div>
                                    )}

                                    {/* Message Content (Video or Text) */}
                                     {/* Ensure video messages take appropriate width */}
                                    <div className={`${message.type === 'video' ? 'w-full' : (message.sender === 'user' ? 'max-w-[80%] sm:max-w-[75%]' : 'max-w-[80%] sm:max-w-[75%]')}`}>
                                         {message.type === 'video'
                                            ? renderVideoMessage(message)
                                            : renderTextMessage(message)
                                        }
                                    </div>


                                    {/* User Avatar */}
                                    {message.sender === 'user' && (
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-600 text-white mt-1">
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
                                        Thinking...
                                    </div>
                                </div>
                            )}

                            {/* Invisible element for scrolling */}
                            <div ref={messagesEndRef} style={{ height: '1px' }} />
                        </div>
                    </main>

                    {/* Fixed Bottom Section: Mode Selection & Input Area */}
                    <footer className="border-t border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-3 shadow-inner sticky bottom-0 z-20">
                        {/* Mode Panel (Clarity/Learning) - Kept as is */}
                        {activeModePanel && (
                             <div className="max-w-4xl mx-auto mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 animate-slide-in">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">
                                        {activeModePanel === 'clarity' ? 'Adjust Explanation Clarity' : 'Select Learning Pace'}
                                    </label>
                                    <button onClick={() => setActiveModePanel(null)} className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" title="Close Panel">
                                        <X size={16} />
                                    </button>
                                </div>
                                {/* Clarity Options */}
                                {activeModePanel === 'clarity' && (
                                    <div className="flex gap-2 flex-wrap">
                                        {Object.entries(CLARITY_LEVELS).map(([key, value]) => (
                                            <button key={key} onClick={() => { setSelectedClarity(value); setActiveModePanel(null); }}
                                                className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center ${selectedClarity === value ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 ring-1 ring-amber-300 dark:ring-amber-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                                {selectedClarity === value && <CheckCircle size={14} className="ml-1.5 text-amber-600 dark:text-amber-400" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {/* Learning Mode Options */}
                                {activeModePanel === 'learning' && (
                                     <div className="flex gap-2 flex-wrap">
                                        {Object.entries(LEARNING_MODES).map(([key, value]) => (
                                            <button key={key} onClick={() => { setSelectedLearningMode(value); setActiveModePanel(null); }}
                                                className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center ${selectedLearningMode === value ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 ring-1 ring-amber-300 dark:ring-amber-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}>
                                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                                {selectedLearningMode === value && <CheckCircle size={14} className="ml-1.5 text-amber-600 dark:text-amber-400" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="max-w-4xl mx-auto">
                             {/* Doubt Context Indicator */}
                             {isAskingDoubt && doubtContext && (
                                <div className="mb-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 p-2 rounded-md flex items-center justify-between gap-2 border border-amber-200 dark:border-amber-800">
                                   <div className="flex items-center gap-1">
                                        <CornerDownRight size={14} className="flex-shrink-0"/>
                                        <span className="truncate">Asking about "{doubtContext.videoTitle}" at {formatDuration(doubtContext.timestamp)}.</span>
                                   </div>
                                     <button onClick={cancelDoubt} className="ml-auto text-amber-600 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-100 p-0.5 rounded flex items-center text-xs flex-shrink-0" title="Cancel doubt">
                                         <X size={14} className="mr-0.5"/> Cancel
                                     </button>
                                </div>
                            )}

                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                     placeholder={isAskingDoubt
                                        ? "Type your question about the video..."
                                        : currentVideoId
                                            ? "Ask about the lesson, or type 'next'..."
                                            : "Type 'start' to begin..."}
                                     className={`w-full p-3 pl-4 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent text-sm ${
                                         isAskingDoubt
                                             ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200 placeholder-amber-600 dark:placeholder-amber-400/70' // Style when asking doubt
                                             : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white' // Default style
                                     }`}
                                    disabled={isLoading}
                                    aria-label="Chat input"
                                />
                                <button
                                    type="submit"
                                    className="p-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center aspect-square"
                                    disabled={!inputValue.trim() || isLoading}
                                    aria-label="Send message"
                                >
                                    {/* Use Send icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </form>

                            {/* Mode Selection Buttons - Kept as is */}
                            <div className="flex justify-center mt-3 space-x-2">
                                <button type="button" onClick={() => setActiveModePanel(prev => prev === 'clarity' ? null : 'clarity')}
                                    className={`px-3 py-1.5 rounded-md flex items-center text-sm transition-colors ${activeModePanel === 'clarity' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    aria-expanded={activeModePanel === 'clarity'} title="Adjust explanation clarity">
                                    <SlidersHorizontal size={14} className="mr-1.5" />
                                    <span className="capitalize">{selectedClarity}</span>
                                </button>
                                <button type="button" onClick={() => setActiveModePanel(prev => prev === 'learning' ? null : 'learning')}
                                    className={`px-3 py-1.5 rounded-md flex items-center text-sm transition-colors ${activeModePanel === 'learning' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    aria-expanded={activeModePanel === 'learning'} title="Change learning mode">
                                    <Settings size={14} className="mr-1.5" />
                                    <span className="capitalize">{selectedLearningMode}</span>
                                </button>
                            </div>
                        </div>
                    </footer>
                </div> {/* End Main Panel */}
            </div> {/* End Main Content Area */}
        </div> // End Root Div
    );
};

export default CourseChat;