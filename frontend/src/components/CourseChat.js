import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player/lazy'; // Lazy load for better performance
import {
    SendHorizontal, User, MessageCircle, Info, Mic, ChevronRight, BookOpen, Sparkles, ZoomIn,
    GraduationCap, Brain, Zap, BookText, RotateCcw, Award, Code, Compass, TerminalSquare, Search,
    Clock, PlayCircle, PauseCircle, Settings, CheckCircle, FileText, Star, Bookmark, MoreHorizontal,
    Volume2, VolumeX, Maximize2, Minimize2, X, ChevronDown, ChevronUp, SkipBack, SkipForward,
    AlertCircle, Lightbulb, Download, MessageSquare, ArrowLeft, Rewind, FastForward, CornerUpLeft,
    HelpCircle, Bot, Check, Minus, Plus, Speaker, CornerDownRight, Type // Added icons
} from 'lucide-react';

// --- Constants ---
const BOT_TYPING_DELAY = 800; // ms
const VIDEO_PROGRESS_INTERVAL = 1000; // ms // Note: ReactPlayer's onProgress interval is not guaranteed

// Default initial messages (can be loaded from an API or state management)
const initialMessages = [
    { id: 1, sender: 'bot', content: "Welcome to the Generative AI for Developers professional learning track. This course will provide comprehensive coverage of implementing generative AI in production applications.", timestamp: new Date(Date.now() - 60000 * 5) }, // 5 mins ago
    { id: 2, sender: 'bot', content: "Type 'start' to begin the first module, or ask me any questions about generative AI!", timestamp: new Date(Date.now() - 60000 * 4.9) }, // ~4.9 mins ago
    { id: 3, sender: 'user', content: "start", timestamp: new Date(Date.now() - 60000 * 3) }, // 3 mins ago
    { id: 4, sender: 'bot', content: "Let's begin with Module 1: Introduction to Generative AI. This module covers the fundamental concepts and architecture behind modern generative AI systems.", timestamp: new Date(Date.now() - 60000 * 2.9) }, // ~2.9 mins ago
    { id: 5, sender: 'bot', type: 'video', title: "Introduction to Transformer Architecture", videoNumber: 1, totalVideos: 12, moduleSection: "Foundations", videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", /* Example YouTube URL - Replace with actual */ timestamp: new Date(Date.now() - 60000 * 2.8), status: 'active', position: 0, duration: 212, /* Correct duration for example video */ isCollapsed: false }
];


export default function ImprovedChatInterface() {
    // --- State Management ---
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState(initialMessages);
    const [isLoading, setIsLoading] = useState(false); // For bot typing indicator
    const [activeModePanel, setActiveModePanel] = useState(null); // 'clarity' or 'learning'
    const [selectedClarity, setSelectedClarity] = useState('intermediate'); // 'basic', 'intermediate', 'advanced'
    const [selectedLearningMode, setSelectedLearningMode] = useState('normal'); // 'normal', 'express', etc.
    const [searchQuery, setSearchQuery] = useState(''); // Keep for future use
    const [transcriptVisible, setTranscriptVisible] = useState(false); // State for transcript/resource panel visibility

    // Video specific state
    // Stores playback state for each video message ID
    const [videoStates, setVideoStates] = useState({}); // { [messageId]: { isPlaying: bool, progress: number (seconds), speed: number, volume: number, muted: bool, duration: number } }
    const playerRefs = useRef({}); // Refs for ReactPlayer instances { [messageId]: playerInstance }

    // Doubt specific state
    const [doubtContext, setDoubtContext] = useState(null); // { videoId, videoTitle, timestamp } - Context when asking a question
    const [doubtThreads, setDoubtThreads] = useState({}); // Tracks messages belonging to a doubt thread { [threadId]: [messageId1, messageId2, ...] }
    const [isAskingDoubt, setIsAskingDoubt] = useState(false); // Flag indicating if user is currently typing a doubt

    // Refs
    const inputRef = useRef(null); // Ref for the chat input field
    const messagesEndRef = useRef(null); // Ref to the bottom of the message list for auto-scrolling

    // --- Effects ---

    // Auto-scroll to the bottom of the chat list when new messages are added or loading state changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Initialize video states when video messages are loaded or added
    useEffect(() => {
        const initialVideoStates = {};
        let needsUpdate = false;
        messages.forEach(msg => {
            if (msg.type === 'video') {
                // Only initialize if not already present
                if (!videoStates[msg.id]) {
                    initialVideoStates[msg.id] = {
                        isPlaying: false,
                        progress: msg.position || 0, // Use stored position if available
                        speed: 1,
                        volume: 0.8,
                        muted: false,
                        duration: msg.duration || 0, // Use stored duration if available
                    };
                    needsUpdate = true;
                }
                // Ensure duration from message is updated if video state already exists but has no duration
                else if (msg.duration && !videoStates[msg.id].duration) {
                     initialVideoStates[msg.id] = {
                         ...videoStates[msg.id],
                         duration: msg.duration,
                     };
                     needsUpdate = true;
                }
            }
        });
        // Update state only if new initializations are needed
        if (needsUpdate) {
            setVideoStates(prev => ({ ...prev, ...initialVideoStates }));
        }
    }, [messages]); // Rerun if the messages array changes

    // --- Helper Functions ---

    // Formats a Date object into HH:MM format
    const formatTime = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            return '--:--'; // Return placeholder if date is invalid
        }
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Formats seconds into MM:SS format
    const formatVideoPosition = (seconds) => {
        if (isNaN(seconds) || seconds === null || seconds < 0) seconds = 0;
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // --- Message & Interaction Handlers ---

    // Handles sending a user message or doubt
    const handleSendMessage = (e) => {
        e.preventDefault(); // Prevent default form submission
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return; // Don't send empty messages

        // Create the user message object
        const userMessage = {
            id: Date.now(), // Use timestamp for a simple unique ID
            sender: 'user',
            content: trimmedInput,
            timestamp: new Date(),
            doubtContext: isAskingDoubt ? { ...doubtContext } : null // Attach doubt context if asking a doubt
        };

        // Add user message to the list
        setMessages(prev => [...prev, userMessage]);
        setInputValue(''); // Clear the input field
        setIsLoading(true); // Show bot typing indicator

        // If this was a doubt, add the user message ID to the corresponding doubt thread
        if (isAskingDoubt && doubtContext) {
            const threadId = `doubt-${doubtContext.videoId}`;
            setDoubtThreads(prev => ({
                ...prev,
                [threadId]: [...(prev[threadId] || []), userMessage.id]
            }));
        }

        // Store the context before resetting the state, as state updates might be async
        const currentDoubtContext = isAskingDoubt ? { ...doubtContext } : null;
        setIsAskingDoubt(false); // Reset doubt mode immediately after sending
        setDoubtContext(null);

        // Simulate bot response after a short delay
        setTimeout(() => {
            let botResponse;
            const botId = Date.now() + 1; // Ensure unique ID for bot response

            // Case 1: Responding to a specific doubt
            if (currentDoubtContext) {
                botResponse = {
                    id: botId,
                    sender: 'bot',
                    content: generateDoubtResponse(trimmedInput, currentDoubtContext, selectedClarity, selectedLearningMode),
                    timestamp: new Date(),
                    isDoubtResponse: true, // Mark as a doubt answer
                    relatedToVideo: currentDoubtContext.videoId, // Link back to the video
                    threadId: `doubt-${currentDoubtContext.videoId}` // Associate with the thread
                };
                // Add the bot response ID to the doubt thread
                setDoubtThreads(prev => ({
                    ...prev,
                    [botResponse.threadId]: [...(prev[botResponse.threadId] || []), botResponse.id]
                }));
            }
            // Case 2: User asks for the next video or to continue
            else if (trimmedInput.toLowerCase().includes('next video') || trimmedInput.toLowerCase().includes('continue')) {
                // Simplified logic: Find the last video message and create a placeholder for the next one
                const lastVideoIndex = messages.findLastIndex(m => m.type === 'video');
                const lastVideo = lastVideoIndex !== -1 ? messages[lastVideoIndex] : null;
                const nextVideoNumber = lastVideo ? lastVideo.videoNumber + 1 : 1;
                botResponse = {
                    id: botId,
                    sender: 'bot',
                    type: 'video',
                    title: `Advanced Topic ${nextVideoNumber}`, // Placeholder title
                    videoNumber: nextVideoNumber,
                    totalVideos: 12, // Assuming a fixed total for now
                    moduleSection: "Advanced", // Placeholder section
                    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL (use a different one ideally)
                    timestamp: new Date(),
                    status: 'active',
                    isCollapsed: false,
                    position: 0,
                    duration: 300 // Placeholder duration
                };
            }
            // Case 3: User types 'start' when no video has been shown yet
            else if (trimmedInput.toLowerCase() === 'start' && !messages.some(m => m.type === 'video')) {
                 botResponse = { id: botId, sender: 'bot', content: "Okay, starting Module 1: Introduction to Generative AI. Here's the first video:", timestamp: new Date() };
                 // Add the actual first video message shortly after this introductory text
                 setTimeout(() => {
                    const firstVideoMessage = {
                        id: Date.now() + 2, // Ensure unique ID
                        sender: 'bot',
                        type: 'video',
                        title: "Introduction to Transformer Architecture",
                        videoNumber: 1,
                        totalVideos: 12,
                        moduleSection: "Foundations",
                        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Placeholder URL
                        timestamp: new Date(),
                        status: 'active',
                        position: 0,
                        duration: 212, // Placeholder duration
                        isCollapsed: false
                    };
                    setMessages(prev => [...prev, firstVideoMessage]);
                 }, 500); // Delay before showing video
            }
            // Case 4: General bot response
            else {
                botResponse = {
                    id: botId,
                    sender: 'bot',
                    content: generateGeneralResponse(trimmedInput, selectedClarity, selectedLearningMode),
                    timestamp: new Date()
                };
            }

            // Add the generated bot response to the messages list
            setMessages(prev => [...prev, botResponse]);

            // If the bot just answered a doubt, show a "Continue Learning" prompt
            if (botResponse.isDoubtResponse) {
                setTimeout(() => {
                    const continueMsg = {
                        id: Date.now() + 3, // Ensure unique ID
                        sender: 'bot',
                        type: 'action', // Special message type for actions
                        actionType: 'continue-learning', // Specific action
                        relatedToVideo: botResponse.relatedToVideo, // Link to the video the doubt was about
                        timestamp: new Date()
                    };
                    setMessages(prev => [...prev, continueMsg]);
                }, 600); // Short delay after the doubt answer appears
            }

            setIsLoading(false); // Hide the bot typing indicator
        }, BOT_TYPING_DELAY);
    };

    // Initiates the "ask a doubt" mode for a specific video
    const startDoubt = (videoId, timestamp = null) => {
        const video = messages.find(m => m.id === videoId && m.type === 'video');
        if (!video) return; // Exit if video not found

        // Pause the video if it's currently playing
        handleVideoStateChange(videoId, { isPlaying: false });

        // Determine the timestamp for the doubt context
        const currentTimestamp = timestamp ?? videoStates[videoId]?.progress ?? 0;

        // Set the doubt context state
        setDoubtContext({
            videoId,
            videoTitle: video.title,
            timestamp: currentTimestamp
        });
        setIsAskingDoubt(true); // Set the flag to indicate doubt mode

        // Optionally collapse the video when asking a doubt (can be debated for usability)
        // toggleVideoCollapse(videoId, true); // Force collapse

        // Focus the input field after a short delay
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    // Cancels the "ask a doubt" mode
    const cancelDoubt = () => {
        setIsAskingDoubt(false);
        setDoubtContext(null);
        // Optionally clear the input field if desired
        // setInputValue('');
    };

    // Handles clicking on a timestamp within a message
    const handleTimestampClick = (videoId, timestamp) => {
        console.log(`Timestamp clicked: Video ${videoId}, Time ${timestamp}`);

        // Scroll the video message into view
        const videoElement = document.getElementById(`video-message-${videoId}`);
        if (videoElement) {
            videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Ensure the video is expanded
        toggleVideoCollapse(videoId, false); // Force expand

        // Seek the ReactPlayer instance to the specified time
        const player = playerRefs.current[videoId];
        if (player) {
            player.seekTo(timestamp, 'seconds');
            // Optionally auto-play after seeking
            handleVideoStateChange(videoId, { isPlaying: true });
        } else {
             // If player isn't ready yet (e.g., just expanded), store the seek request in state
             // The handleVideoReady function will apply this seek when the player becomes ready
             setVideoStates(prev => ({
                 ...prev,
                 [videoId]: { ...(prev[videoId] || {}), seekTo: timestamp, isPlaying: true }
             }));
        }
    };

    // --- Response Generation (Mode-Aware Foundation) ---

    // Generates a bot response tailored to a specific doubt
    const generateDoubtResponse = (doubt, context, clarity, mode) => {
        console.log(`Generating doubt response for clarity: ${clarity}, mode: ${mode}`);
        // Base response prefix including context
        let baseResponse = `Regarding "${context.videoTitle}" at ${formatVideoPosition(context.timestamp)}: `;

        // TODO: Implement more sophisticated response generation based on actual content analysis
        // This is a placeholder demonstrating clarity levels:
        if (clarity === 'basic') {
            baseResponse += "Think of it like this... [Simple explanation/analogy related to the topic at the timestamp]. It helps the AI understand the order of things.";
        } else if (clarity === 'advanced') {
            baseResponse += "Technically, the underlying mechanism involves multi-head self-attention and positional encoding... [Detailed technical explanation]. Consider the implications for sequence transduction tasks.";
        } else { // Intermediate (default)
            baseResponse += "The key concept here is how the model weighs the importance of different inputs... [Standard explanation]. This allows the model to effectively capture long-range dependencies.";
        }

        // Add mode-specific elements (example)
        if (mode === 'comprehensive') {
            baseResponse += " Would you like a link to the original research paper discussing this?";
        }
        if (mode === 'practical') {
             baseResponse += " You can find a code implementation of this concept in the resources panel.";
        }

        // Conclude the response
        return baseResponse + ` Does that clarify your question about "${doubt.substring(0, 30)}..."?`;
    };

    // Generates a general bot response (not tied to a specific doubt)
    const generateGeneralResponse = (input, clarity, mode) => {
         console.log(`Generating general response for clarity: ${clarity}, mode: ${mode}`);
         // TODO: Implement more sophisticated response generation
         let response = `That's an interesting point about "${input.substring(0, 50)}...". `;
         if (clarity === 'basic') {
             response += "In simple terms, it relates to how AI systems process information. ";
         } else {
             response += "This touches upon core principles in modern AI development. ";
         }
         // Add mode-specific prompts (example)
         if (mode === 'assessment') {
             response += "Would you like to try a quick quiz question on this topic before we continue the lesson?";
         } else {
             response += "How would you like to proceed? Continue the lesson or explore this topic further?";
         }
         return response;
    };

    // --- Video Handlers ---

    // Updates the state for a specific video (e.g., play/pause, volume)
    const handleVideoStateChange = (messageId, newState) => {
        setVideoStates(prev => {
            const current = prev[messageId] || {};
            // If changing volume, ensure muted is set appropriately
            if (newState.volume !== undefined) {
                newState.muted = newState.volume <= 0;
            }
            // If changing muted state, ensure volume reflects this visually if needed
            if (newState.muted === true && current.volume > 0) {
                // Optional: Store previous volume to restore on unmute
                // newState.previousVolume = current.volume;
                // newState.volume = 0; // Or just keep volume state and rely on muted flag
            } else if (newState.muted === false && current.volume === 0) {
                 // Optional: Restore previous volume if stored, or set to default
                 // newState.volume = current.previousVolume || 0.8;
            }
            return {
                ...prev,
                [messageId]: { ...current, ...newState }
            };
        });
    };

    // Callback from ReactPlayer providing playback progress
    const handleVideoProgress = (messageId, state) => {
        // state contains { played: fraction, playedSeconds: number, loaded: fraction, loadedSeconds: number }
        // Update progress in state, but only if the video is playing to avoid unnecessary updates when paused/scrubbing
        if (videoStates[messageId]?.isPlaying) {
             handleVideoStateChange(messageId, { progress: state.playedSeconds });
        }
    };

    // Callback from ReactPlayer providing the total duration of the video
     const handleVideoDuration = (messageId, duration) => {
         handleVideoStateChange(messageId, { duration: duration });
         // Update the original message duration if it was missing or incorrect
         setMessages(prevMessages => prevMessages.map(m =>
             (m.id === messageId && m.duration !== duration) ? { ...m, duration: duration } : m
         ));
     };

    // Callback when the ReactPlayer instance is ready
    const handleVideoReady = (messageId) => {
        const player = playerRefs.current[messageId];
        if (!player) return; // Should not happen, but safety check

        // Apply any pending seek operation that was requested before the player was ready
        if (videoStates[messageId]?.seekTo !== undefined) {
             player.seekTo(videoStates[messageId].seekTo, 'seconds');
             // Clear the seek request from state after applying it
             setVideoStates(prev => {
                 const updatedState = { ...prev[messageId] };
                 delete updatedState.seekTo; // Remove the temporary seekTo property
                 return { ...prev, [messageId]: updatedState };
             });
        }
    };

    // Toggles the collapsed state of a video message
    // forceState: true = force collapse, false = force expand, null = toggle
    const toggleVideoCollapse = (messageId, forceState = null) => {
        setMessages(prevMessages => prevMessages.map(m => {
            if (m.id === messageId && m.type === 'video') {
                // Determine the new collapsed state
                const isCollapsed = forceState !== null ? forceState : !m.isCollapsed;
                // Pause the video if it's currently playing and we are collapsing it
                if (isCollapsed && videoStates[messageId]?.isPlaying) {
                    handleVideoStateChange(messageId, { isPlaying: false });
                }
                return { ...m, isCollapsed }; // Update the message state
            }
            return m; // Return unchanged message
        }));
    };

    // Handles the "Continue Learning" action after a doubt is answered
    const continueAfterDoubt = (videoId) => {
        const videoMessage = messages.find(m => m.id === videoId);
        if (!videoMessage) return; // Exit if video message not found

        // Ensure the video is expanded
        if (videoMessage.isCollapsed) {
            toggleVideoCollapse(videoId, false); // Force expand
        }

        // Scroll the video message into view
        const element = document.getElementById(`video-message-${videoId}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Resume playback after a short delay to allow for scroll/expand animations
        setTimeout(() => {
            handleVideoStateChange(videoId, { isPlaying: true });
        }, 300);
    };


    // --- Mode Selection Handlers ---
     // Updates the selected explanation clarity level
     const handleClarityChange = (clarityId) => {
         setSelectedClarity(clarityId);
         // Optional: Send a message to the bot confirming the change?
         // setActiveModePanel(null); // Optionally close the panel after selection
     };

     // Updates the selected learning mode/pace
     const handleLearningModeChange = (modeId) => {
         setSelectedLearningMode(modeId);
         // Optional: Send a message to the bot confirming the change?
         // setActiveModePanel(null); // Optionally close the panel after selection
     };

    // --- UI Components (Inline for brevity, consider extracting later) ---

    // Component for the video progress bar
    const VideoProgressBar = ({ current, total }) => (
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden my-1 cursor-pointer"
             onClick={(e) => { /* TODO: Implement seek on click */ }}>
            <div
                className="h-full bg-amber-500 rounded-full transition-[width] duration-150 ease-linear"
                style={{ width: total > 0 ? `${(current / total) * 100}%` : '0%' }}
            />
        </div>
    );

    // Component for the custom video controls below the player
    const VideoControls = ({ messageId }) => {
        const state = videoStates[messageId] || {};
        // Destructure state with default values
        const { isPlaying = false, progress = 0, duration = 0, speed = 1, volume = 0.8, muted = false } = state;

        // Prevent rendering if duration is not yet known
        if (duration <= 0) {
            return <div className="h-[60px] flex items-center justify-center text-xs text-gray-400">Loading controls...</div>; // Placeholder while duration loads
        }

        return (
            <div className="mt-2 px-1">
                {/* Progress Bar */}
                <VideoProgressBar current={progress} total={duration} />
                {/* Time Indicators */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                    <span>{formatVideoPosition(progress)}</span>
                    <span>{formatVideoPosition(duration)}</span>
                </div>
                {/* Control Buttons Row */}
                <div className="flex items-center justify-between mt-1">
                    {/* Left Controls: Playback */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                         <button
                             className="btn-icon p-1.5" // Slightly smaller padding
                             onClick={() => handleVideoStateChange(messageId, { isPlaying: !isPlaying })}
                             aria-label={isPlaying ? "Pause" : "Play"}
                         >
                             {isPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                         </button>
                         <button
                             className="btn-icon p-1.5 hidden sm:inline-flex" // Hide on small screens
                             onClick={() => playerRefs.current[messageId]?.seekTo(Math.max(0, progress - 10), 'seconds')}
                             aria-label="Rewind 10 seconds"
                         >
                            <Rewind size={16} />
                         </button>
                         <button
                             className="btn-icon p-1.5 hidden sm:inline-flex" // Hide on small screens
                             onClick={() => playerRefs.current[messageId]?.seekTo(Math.min(duration, progress + 10), 'seconds')}
                             aria-label="Fast Forward 10 seconds"
                            >
                             <FastForward size={16} />
                         </button>
                    </div>

                    {/* Right Controls: Settings & Actions */}
                     <div className="flex items-center space-x-1 sm:space-x-2">
                         {/* Playback Speed Dropdown (Simplified Button) */}
                         <div className="relative group">
                             <button className="btn-icon p-1.5 text-xs font-medium" title={`Playback speed: ${speed}x`}>
                                 {speed}x
                             </button>
                             {/* TODO: Implement a proper dropdown menu for speed selection */}
                             {/* Example Dropdown Structure (Hidden) */}
                             {/* <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-white dark:bg-gray-700 shadow-lg rounded-md border border-gray-200 dark:border-gray-600 p-1 z-20">
                                 {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                                     <button key={rate} onClick={() => handleVideoStateChange(messageId, { speed: rate })} className="block w-full text-left px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-600 rounded">{rate}x</button>
                                 ))}
                             </div> */}
                         </div>
                         {/* Volume Control */}
                         <div className="flex items-center group">
                            <button
                                 className="btn-icon p-1.5"
                                 onClick={() => handleVideoStateChange(messageId, { muted: !muted })}
                                 aria-label={muted ? "Unmute" : "Mute"}
                             >
                                 {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                             </button>
                             {/* Volume Slider (Appears on Hover) */}
                             <input
                                type="range" min="0" max="1" step="0.05"
                                value={muted ? 0 : volume}
                                onChange={(e) => handleVideoStateChange(messageId, { volume: parseFloat(e.target.value), muted: false })}
                                className="w-16 h-1 ml-1 hidden group-hover:inline-block accent-amber-500 cursor-pointer"
                                aria-label="Volume"
                             />
                         </div>
                         {/* Ask Question Button */}
                         <button
                             className="btn-icon p-1.5"
                             onClick={() => startDoubt(messageId)}
                             aria-label="Ask Question about this video"
                            >
                             <HelpCircle size={16} />
                         </button>
                         {/* Collapse Video Button */}
                         <button
                            className="btn-icon p-1.5"
                             onClick={() => toggleVideoCollapse(messageId)}
                             aria-label="Collapse Video"
                            >
                             <Minimize2 size={16} />
                         </button>
                         {/* Fullscreen Button (Requires additional logic/library) */}
                         {/* <button className="btn-icon p-1.5">
                             <Maximize2 size={16} />
                         </button> */}
                     </div>
                </div>
            </div>
        );
    };

    // Component for the collapsed video thumbnail view
    const CollapsedVideo = ({ message }) => (
        <div
            className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm"
            onClick={() => toggleVideoCollapse(message.id, false)} // Click anywhere to expand
            title={`Expand video: ${message.title}`}
        >
            {/* Play Icon */}
            <div className="w-10 h-10 bg-amber-500 rounded-md flex items-center justify-center text-white mr-3 flex-shrink-0 shadow">
                <PlayCircle size={18} />
            </div>
            {/* Video Info */}
            <div className="flex-1 overflow-hidden min-w-0">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                    {message.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                    <Clock size={11} className="mr-1 flex-shrink-0" />
                    {/* Display progress and duration */}
                    <span>{formatVideoPosition(videoStates[message.id]?.progress || 0)} / {formatVideoPosition(videoStates[message.id]?.duration || message.duration)}</span>
                </div>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center flex-shrink-0 ml-2">
                <button
                    className="text-gray-500 hover:text-amber-500 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={(e) => { e.stopPropagation(); startDoubt(message.id); }} // Prevent expansion on button click
                    title="Ask question about this video"
                >
                    <HelpCircle size={16} />
                </button>
                <button
                    className="text-gray-500 hover:text-green-500 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={(e) => { e.stopPropagation(); toggleVideoCollapse(message.id, false); }} // Prevent expansion on button click
                    title="Expand video"
                >
                    <Maximize2 size={16} />
                </button>
            </div>
        </div>
    );

    // Component for the "Continue Learning" prompt
    const ContinueLearningAction = ({ action }) => (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-dashed border-amber-200 dark:border-amber-800/50 mt-1 animate-fade-in shadow-sm">
            <div className="flex items-center justify-between">
                 <div className="flex items-center">
                     <CornerUpLeft size={18} className="text-amber-500 dark:text-amber-400 mr-3 flex-shrink-0" />
                     <p className="text-sm text-gray-700 dark:text-gray-300">
                         Ready to continue with the video?
                     </p>
                 </div>
                 <button
                     className="btn-primary-sm" // Use shared button style
                     onClick={() => continueAfterDoubt(action.relatedToVideo)}
                 >
                     Continue Learning
                     <ChevronRight size={14} className="ml-1" />
                 </button>
             </div>
         </div>
     );

    // Renders message content, making timestamps clickable if context is provided
    const renderMessageContent = (content, messageId, contextForTimestampClick = null) => {
        if (!content) return '';
        // Regex to find potential timestamps (MM:SS or HH:MM:SS)
        // Allows optional leading/trailing spaces for robustness
        const timeRegex = /(\s*)(\d{1,2}:\d{2}(?::\d{2})?)(\s*)/g;
        const parts = content.split(timeRegex);

        return parts.map((part, index) => {
            // Check if the part matches the timestamp format (captured in group 2)
            // Need to reconstruct the match to check against the original split part
            const potentialMatch = (parts[index-1] || '') + part + (parts[index+1] || '');
            const match = timeRegex.exec(potentialMatch);
            timeRegex.lastIndex = 0; // Reset regex index

            if (match && match[2] === part && contextForTimestampClick?.videoId) {
                // Attempt to parse the timestamp string (match[2]) into seconds
                const timeParts = part.split(':').map(Number);
                let seconds = NaN;
                if (timeParts.length === 3 && timeParts.every(n => !isNaN(n))) { // HH:MM:SS
                    seconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
                } else if (timeParts.length === 2 && timeParts.every(n => !isNaN(n))) { // MM:SS
                    seconds = timeParts[0] * 60 + timeParts[1];
                }

                // If parsing was successful and context allows clicking, make it a button
                if (!isNaN(seconds)) {
                     return (
                         <React.Fragment key={index}>
                            {match[1]} {/* Leading space */}
                            <button
                                 onClick={() => handleTimestampClick(contextForTimestampClick.videoId, seconds)}
                                 className="text-amber-600 dark:text-amber-400 font-medium hover:underline focus:outline-none focus:ring-1 focus:ring-amber-500 rounded px-0.5 py-0 bg-amber-100/50 dark:bg-amber-900/30"
                                 title={`Jump to ${part} in video`}
                                >
                                 {part}
                             </button>
                             {match[3]} {/* Trailing space */}
                         </React.Fragment>
                     );
                }
            }
            // Return normal text part if it's not a clickable timestamp
            return part;
        });
    };

    // --- Main Render ---

    return (
        // Outer container for the entire interface
        <div className="flex flex-col h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
            {/* Top Header Section */}
            <header className="border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
                 <div className="max-w-screen-xl mx-auto px-4 py-3"> {/* Use wider max-width */}
                    <div className="flex items-center justify-between">
                        {/* Left Side: Course Information */}
                         <div className="flex items-center gap-3">
                            {/* Course Icon */}
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                 <BookOpen size={20} />
                             </div>
                             {/* Course Title and Status */}
                             <div>
                                <h1 className="text-base sm:text-lg font-semibold tracking-tight leading-tight">Generative AI for Developers</h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">Module 1 of 4 • {selectedLearningMode} Mode • {selectedClarity} Clarity</p>
                             </div>
                         </div>
                        {/* Right Side: Action Buttons */}
                        <div className="flex items-center space-x-1 sm:space-x-2">
                             {/* Search Button (Placeholder) */}
                             <button className="btn-icon" title="Search History (coming soon)">
                                <Search size={18} />
                             </button>
                             {/* Transcript/Resources Toggle Button */}
                             <button
                                className={`btn-icon ${transcriptVisible ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400' : ''}`}
                                onClick={() => setTranscriptVisible(!transcriptVisible)}
                                title={transcriptVisible ? "Hide Transcript/Resources" : "Show Transcript/Resources"}
                                aria-pressed={transcriptVisible}
                                >
                                <FileText size={18} />
                             </button>
                             {/* Course Info Button (Placeholder) */}
                             <button className="btn-icon" title="Course Info (coming soon)">
                                <Info size={18} />
                             </button>
                             {/* Ask Question Button (Focuses Input) */}
                             <button
                                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md transition-colors shadow-sm flex items-center text-sm font-medium"
                                onClick={() => inputRef.current?.focus()}
                                >
                                 <MessageSquare size={16} className="mr-1 sm:mr-1.5" />
                                 <span className="hidden sm:inline">Ask Question</span> {/* Hide text on small screens */}
                             </button>
                        </div>
                    </div>
                </div>
            </header>

             {/* Main Content Area (Chat + Optional Side Panel) */}
             <main className="flex-1 flex overflow-hidden">
                 {/* Chat Messages Area */}
                <section className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 lg:p-6" aria-live="polite">
                     <div className="max-w-4xl mx-auto space-y-5"> {/* Centered content with spacing */}
                         {/* Map through messages and render each one */}
                         {messages.map((message) => (
                            <article // Use article for semantic grouping of each message exchange part
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2 sm:gap-3 relative`}
                                id={message.type === 'video' ? `video-message-${message.id}` : null}
                            >
                                {/* Bot/User Avatar */}
                                {message.sender === 'bot' && !message.type && ( // Avatar for text bot messages
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br ${message.isDoubtResponse ? 'from-green-400 to-emerald-600 dark:from-green-500 dark:to-emerald-700' : 'from-amber-400 to-orange-600 dark:from-amber-500 dark:to-orange-700'}`}>
                                         {message.isDoubtResponse ? <Lightbulb size={16} /> : <Bot size={16} />}
                                    </div>
                                )}
                                {message.sender === 'bot' && message.type === 'video' && ( // Avatar placeholder for video messages (optional)
                                     <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md text-white bg-gradient-to-br from-indigo-400 to-purple-600 dark:from-indigo-500 dark:to-purple-700">
                                         <PlayCircle size={16} />
                                     </div>
                                )}


                                {/* Message Content Container */}
                                <div className={`w-full ${message.sender === 'user' ? 'max-w-[75%] sm:max-w-[70%]' : (message.type === 'video' ? 'max-w-full' : 'max-w-[75%] sm:max-w-[70%]')}`}>
                                     {/* --- Regular Text Message Rendering --- */}
                                     {!message.type && (
                                         <div className={`rounded-xl px-4 py-3 text-sm shadow-md relative ${ message.sender === 'user'
                                                 ? 'bg-amber-500 text-white rounded-br-none' // User message style
                                                 : message.isDoubtResponse
                                                     ? 'bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-green-600/50 text-gray-800 dark:text-gray-100 rounded-bl-none' // Doubt answer style
                                                     : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 rounded-bl-none' // Standard bot message style
                                            }`}
                                         >
                                            {/* Doubt Context Reference (Shown on User's Doubt Message) */}
                                            {message.doubtContext && (
                                                <div className="bg-amber-100/60 dark:bg-amber-900/40 rounded px-2 py-1 mb-2 text-xs flex items-center text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-700/50">
                                                    <CornerDownRight size={12} className="mr-1.5 flex-shrink-0" />
                                                    <span>Re: "{message.doubtContext.videoTitle}" at
                                                         <button
                                                            onClick={() => handleTimestampClick(message.doubtContext.videoId, message.doubtContext.timestamp)}
                                                            className="font-medium hover:underline mx-1"
                                                            title="Jump to timestamp"
                                                            >
                                                                {formatVideoPosition(message.doubtContext.timestamp)}
                                                         </button>
                                                    </span>
                                                </div>
                                            )}
                                            {/* Doubt Answer Context (Shown on Bot's Doubt Response) */}
                                            {message.isDoubtResponse && messages.find(m => m.id === message.id -1)?.doubtContext && ( // Check previous message for context
                                                 <div className="bg-green-100/50 dark:bg-green-900/40 rounded px-2 py-1 mb-2 text-xs text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700/50 flex items-center">
                                                     <Lightbulb size={12} className="mr-1.5 inline" /> Answer regarding "{messages.find(m => m.id === message.id -1)?.doubtContext.videoTitle}"
                                                 </div>
                                             )}

                                            {/* Message Text Content */}
                                            <div className="whitespace-pre-wrap leading-relaxed">
                                                {renderMessageContent(message.content, message.id, message.isDoubtResponse ? { videoId: message.relatedToVideo } : null)}
                                            </div>
                                            {/* Timestamp (Subtly placed) */}
                                            <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-amber-100/80 text-right' : 'text-gray-400 dark:text-gray-500 text-left'}`}>
                                                {formatTime(message.timestamp)}
                                            </div>
                                        </div>
                                    )}

                                    {/* --- Video Message Rendering --- */}
                                    {message.type === 'video' && !message.isCollapsed && (
                                        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 w-full animate-fade-in">
                                            {/* Video Header */}
                                            <div className="flex items-center mb-3">
                                                 {/* Icon removed, using avatar column instead */}
                                                <div className="flex-1">
                                                     <p className="font-semibold text-gray-800 dark:text-white text-base leading-tight">{message.title}</p>
                                                     <p className="text-xs text-gray-500 dark:text-gray-400">
                                                         Video {message.videoNumber} of {message.totalVideos} • {message.moduleSection}
                                                     </p>
                                                 </div>
                                                 <div className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                                                     {formatTime(message.timestamp)}
                                                 </div>
                                            </div>

                                            {/* React Player Wrapper */}
                                             <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-inner relative group mb-2">
                                                 <ReactPlayer
                                                     ref={(player) => { playerRefs.current[message.id] = player; }} // Store player instance ref
                                                     url={message.videoUrl} // Video source URL
                                                     playing={videoStates[message.id]?.isPlaying || false} // Control playback state
                                                     controls={false} // Disable default controls; we use custom ones
                                                     width="100%"
                                                     height="100%"
                                                     volume={videoStates[message.id]?.volume ?? 0.8} // Control volume
                                                     muted={videoStates[message.id]?.muted || false} // Control mute state
                                                     playbackRate={videoStates[message.id]?.speed ?? 1} // Control playback speed
                                                     onProgress={(state) => handleVideoProgress(message.id, state)} // Callback for progress updates
                                                     onDuration={(duration) => handleVideoDuration(message.id, duration)} // Callback when duration is known
                                                     onReady={() => handleVideoReady(message.id)} // Callback when player is ready
                                                     onPlay={() => handleVideoStateChange(message.id, { isPlaying: true })} // Update state on play
                                                     onPause={() => handleVideoStateChange(message.id, { isPlaying: false })} // Update state on pause
                                                     onError={(e) => console.error('Video Error:', e)} // Basic error logging
                                                     onEnded={() => handleVideoStateChange(message.id, { isPlaying: false })} // Set playing to false on end
                                                     config={{ // Player-specific configurations
                                                         youtube: { playerVars: { showinfo: 0, modestbranding: 1, iv_load_policy: 3, playsinline: 1 } },
                                                         // file: { attributes: { controlsList: 'nodownload' } } // Example for file player
                                                     }}
                                                     style={{ position: 'absolute', top: 0, left: 0 }} // Required for aspect ratio wrapper
                                                 />
                                                 {/* Overlay for Ask Question Button */}
                                                 <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                      <button
                                                         className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-lg hover:bg-black/70"
                                                         onClick={() => startDoubt(message.id)}
                                                         title="Ask question at current timestamp"
                                                        >
                                                         <HelpCircle size={14} className="mr-1" />
                                                         Ask at {formatVideoPosition(videoStates[message.id]?.progress || 0)}
                                                     </button>
                                                 </div>
                                             </div>

                                            {/* Custom Video Controls Component */}
                                            <VideoControls messageId={message.id} />

                                            {/* Action Buttons Below Video */}
                                            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/50 flex flex-wrap gap-2 justify-between items-center">
                                                 {/* Left: Resources */}
                                                 <div className="flex items-center space-x-2">
                                                     <button className="btn-icon-sm" title="Bookmark (coming soon)"><Bookmark size={14} /></button>
                                                     <button
                                                        className={`btn-icon-sm ${transcriptVisible ? 'text-amber-500 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-900/30' : ''}`}
                                                        onClick={() => setTranscriptVisible(!transcriptVisible)}
                                                        title={transcriptVisible ? "Hide Transcript" : "Show Transcript"}
                                                        aria-pressed={transcriptVisible}
                                                        >
                                                        <FileText size={14} />
                                                      </button>
                                                     <button className="btn-icon-sm" title="Download Resources (coming soon)"><Download size={14} /></button>
                                                 </div>
                                                 {/* Right: Actions */}
                                                 <div className="flex space-x-2">
                                                     <button
                                                        className="btn-secondary-sm" // Use shared style
                                                         onClick={() => startDoubt(message.id)}
                                                        >
                                                         <HelpCircle size={14} className="mr-1" />
                                                         Ask Question
                                                     </button>
                                                     <button
                                                        className="btn-primary-sm" // Use shared style
                                                        onClick={() => handleSendMessage({ preventDefault: () => {}, target: { value: 'next video' } })} // Simulate sending 'next video'
                                                        >
                                                         Next Video
                                                         <ChevronRight size={14} className="ml-1" />
                                                     </button>
                                                 </div>
                                            </div>
                                        </div>
                                    )}

                                     {/* --- Collapsed Video Rendering --- */}
                                    {message.type === 'video' && message.isCollapsed && (
                                        <CollapsedVideo message={message} />
                                    )}

                                    {/* --- Action Message Rendering (e.g., Continue Learning) --- */}
                                     {message.type === 'action' && message.actionType === 'continue-learning' && (
                                         <ContinueLearningAction action={message} />
                                     )}
                                 </div>

                                {/* User Avatar (Positioned in the flex gap) */}
                                {message.sender === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                                        <User size={16} />
                                    </div>
                                )}
                            </article>
                        ))}

                        {/* Bot Loading/Typing Indicator */}
                        {isLoading && (
                             <div className="flex justify-start items-start gap-3 animate-pulse">
                                 {/* Bot Avatar */}
                                 <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-orange-600 dark:from-amber-500 dark:to-orange-700 text-white">
                                     <Bot size={16} />
                                 </div>
                                 {/* Typing Bubble */}
                                 <div className="bg-white dark:bg-gray-800 rounded-xl rounded-bl-none px-4 py-3 text-sm shadow-md border border-gray-100 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 italic">
                                     Typing...
                                 </div>
                             </div>
                         )}
                        {/* Invisible element at the end of the list to target for scrolling */}
                        <div ref={messagesEndRef} style={{ height: '1px' }} />
                    </div>
                 </section>

                 {/* --- Optional Right Panel (Transcript/Resources) --- */}
                {transcriptVisible && (
                     <aside className="w-80 lg:w-96 border-l border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 flex flex-col flex-shrink-0 overflow-y-auto p-4 transition-all duration-300 ease-in-out" aria-label="Transcript and Resources Panel">
                         {/* Panel Header */}
                         <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                             <h3 className="font-semibold text-base text-gray-800 dark:text-gray-200">Transcript & Resources</h3>
                              <button onClick={() => setTranscriptVisible(false)} className="btn-icon" title="Close Panel">
                                  <X size={18} />
                              </button>
                         </div>
                         {/* Panel Content */}
                         <div className="flex-1 text-sm text-gray-600 dark:text-gray-400 space-y-4">
                             {/* TODO: Add Transcript Component Here */}
                             <section>
                                 <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Transcript</h4>
                                 <p className="italic text-xs">Transcript for the current video will appear here. It will be interactive and scrollable.</p>
                                 {/* Placeholder for transcript lines */}
                                 <div className="mt-2 space-y-1 text-xs max-h-60 overflow-y-auto pr-2">
                                     {/* Example Lines */}
                                     {/* <p><span className="font-mono text-gray-400 mr-2">00:05</span> Welcome to the introduction...</p> */}
                                     {/* <p className="bg-amber-100/50 dark:bg-amber-900/30 p-1 rounded"><span className="font-mono text-gray-400 mr-2">00:12</span> The core concept we'll discuss...</p> */}
                                 </div>
                             </section>
                             <hr className="my-4 border-gray-200 dark:border-gray-600"/>
                             {/* TODO: Add Resources Component Here */}
                             <section>
                                 <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Resources</h4>
                                 <p className="italic text-xs">Related links, code snippets, and downloads for the current topic will appear here.</p>
                                 {/* Placeholder for resources */}
                                 <ul className="mt-2 space-y-1 text-xs list-disc list-inside">
                                     {/* <li><a href="#" className="text-amber-600 hover:underline">Link to documentation</a></li> */}
                                     {/* <li><button className="text-amber-600 hover:underline">Code Snippet: Attention Mechanism</button></li> */}
                                 </ul>
                             </section>
                          </div>
                     </aside>
                 )}
             </main>

            {/* Fixed Bottom Section: Mode Selection & Input Area */}
            <footer className="border-t border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-3 shadow-inner sticky bottom-0 z-20">
                {/* --- Mode Selection Panel (Appears when a mode button is clicked) --- */}
                {activeModePanel && (
                     <div className="max-w-4xl mx-auto mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 animate-fade-in-fast">
                         {/* Panel Header */}
                         <div className="flex justify-between items-center mb-2">
                             <label className="text-xs text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">
                                 {activeModePanel === 'clarity' ? 'Adjust Explanation Clarity' : 'Select Learning Pace'}
                             </label>
                             <button onClick={() => setActiveModePanel(null)} className="btn-icon-sm" title="Close Panel"><X size={16} /></button>
                         </div>
                         {/* Mode Buttons */}
                         <div className="flex gap-2 flex-wrap">
                            {/* Clarity Options */}
                            {activeModePanel === 'clarity' && [
                                 { id: "basic", label: "Basic", icon: <GraduationCap size={14} /> },
                                 { id: "intermediate", label: "Intermediate", icon: <BookOpen size={14} /> },
                                 { id: "advanced", label: "Advanced", icon: <Brain size={14} /> }
                             ].map(mode => (
                                 <button
                                     key={mode.id}
                                     onClick={() => handleClarityChange(mode.id)}
                                     className={`btn-mode ${selectedClarity === mode.id ? 'btn-mode-active' : 'btn-mode-inactive'}`} // Dynamic styling
                                     aria-pressed={selectedClarity === mode.id}
                                    >
                                     {mode.icon} {mode.label} {selectedClarity === mode.id && <Check size={12} className="ml-auto pl-1" />} {/* Checkmark for active */}
                                 </button>
                             ))}
                             {/* Learning Mode Options */}
                             {activeModePanel === 'learning' && [
                                 { id: "normal", label: "Standard", icon: <Compass size={14} /> },
                                 { id: "express", label: "Accelerated", icon: <Zap size={14} /> },
                                 { id: "comprehensive", label: "Comprehensive", icon: <BookText size={14} /> },
                                 { id: "review", label: "Review", icon: <RotateCcw size={14} /> },
                                 { id: "assessment", label: "Assessment", icon: <Award size={14} /> },
                                 { id: "practical", label: "Practical", icon: <Code size={14} /> }
                             ].map(mode => (
                                 <button
                                     key={mode.id}
                                     onClick={() => handleLearningModeChange(mode.id)}
                                     className={`btn-mode ${selectedLearningMode === mode.id ? 'btn-mode-active' : 'btn-mode-inactive'}`} // Dynamic styling
                                     aria-pressed={selectedLearningMode === mode.id}
                                    >
                                     {mode.icon} {mode.label} {selectedLearningMode === mode.id && <Check size={12} className="ml-auto pl-1" />} {/* Checkmark for active */}
                                 </button>
                            ))}
                         </div>
                     </div>
                 )}

                 {/* --- Input Area --- */}
                <div className="max-w-4xl mx-auto">
                    {/* Doubt Context Indicator (Shown above input when asking a doubt) */}
                    {isAskingDoubt && doubtContext && (
                         <div className="bg-amber-100 dark:bg-amber-900/50 rounded-t-md px-3 py-1.5 text-xs text-amber-800 dark:text-amber-200 flex justify-between items-center border-b border-amber-200 dark:border-amber-700/50">
                            <div className="flex items-center gap-1.5">
                                <HelpCircle size={14}/>
                                 Asking about "{doubtContext.videoTitle}" at {formatVideoPosition(doubtContext.timestamp)}
                             </div>
                            <button onClick={cancelDoubt} className="text-amber-600 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-100 font-medium flex items-center gap-0.5" title="Cancel question">
                                 <X size={14}/> Cancel
                             </button>
                         </div>
                    )}
                     {/* Input Form */}
                     <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                         {/* Mode Buttons */}
                         <button type="button" onClick={() => setActiveModePanel(prev => prev === 'clarity' ? null : 'clarity')} className={`btn-icon ${activeModePanel === 'clarity' ? 'bg-gray-100 dark:bg-gray-700' : ''}`} title="Adjust Clarity" aria-expanded={activeModePanel === 'clarity'}>
                             <Brain size={18} />
                         </button>
                         <button type="button" onClick={() => setActiveModePanel(prev => prev === 'learning' ? null : 'learning')} className={`btn-icon ${activeModePanel === 'learning' ? 'bg-gray-100 dark:bg-gray-700' : ''}`} title="Change Learning Mode" aria-expanded={activeModePanel === 'learning'}>
                             <Compass size={18} />
                         </button>
                         {/* Text Input Field */}
                         <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={isAskingDoubt ? "Type your question about the video..." : "Ask anything or type 'next video'..."}
                            className={`input-main flex-1 ${isAskingDoubt ? 'input-asking-doubt' : ''}`} // Dynamic styling for doubt mode
                            disabled={isLoading} // Disable input while bot is typing
                            aria-label="Chat input"
                        />
                         {/* Voice Input Button (Placeholder) */}
                         <button type="button" className="btn-icon" title="Voice Input (coming soon)" disabled>
                             <Mic size={18} />
                         </button>
                         {/* Send Button */}
                         <button
                             type="submit"
                            className="btn-send" // Use shared style
                             disabled={!inputValue.trim() || isLoading} // Disable if input is empty or bot is loading
                             aria-label="Send message"
                         >
                             <SendHorizontal size={18} />
                         </button>
                     </form>
                 </div>
            </footer>
        </div>
    );
}
