// src/components/CourseChat/hooks/useDoubtContext.js
// Custom hook for doubt context management
import { useState } from 'react';
import { formatVideoPosition } from '../utils/formatters';

/**
 * Custom hook to manage the doubt context
 * @param {function} handleVideoStateChange - Function to control video playback
 * @returns {Object} Doubt context management methods and data
 */
const useDoubtContext = (handleVideoStateChange) => {
  // Doubt specific state
  const [doubtContext, setDoubtContext] = useState(null); // { videoId, videoTitle, timestamp }
  const [doubtThreads, setDoubtThreads] = useState({}); // Tracks messages belonging to a doubt thread
  const [isAskingDoubt, setIsAskingDoubt] = useState(false); // Flag indicating if user is currently typing a doubt

  /**
   * Initiates the "ask a doubt" mode for a specific video
   * @param {number} videoId - ID of the video message
   * @param {number} timestamp - Optional specific timestamp, otherwise uses current video progress
   * @param {Object} videoStates - Current video states
   * @param {function} focusInput - Function to focus the input field
   */
  const startDoubt = (videoId, timestamp, videoStates, focusInput) => {
    // Find the video in messages
    // NOTE: This needs to be adjusted based on how you get messages in your main component
    const video = { id: videoId, title: "Video Title" }; // Placeholder, replace with actual lookup
    
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

    // Focus the input field after a short delay
    setTimeout(() => focusInput(), 100);
  };

  /**
   * Cancels the "ask a doubt" mode
   */
  const cancelDoubt = () => {
    setIsAskingDoubt(false);
    setDoubtContext(null);
  };

  /**
   * Adds a message to a doubt thread
   * @param {number} messageId - ID of the message
   * @param {Object} context - Doubt context
   */
  const addToDoubtThread = (messageId, context) => {
    if (!context) return;
    
    const threadId = `doubt-${context.videoId}`;
    setDoubtThreads(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), messageId]
    }));
  };

  /**
   * Gets a human-readable representation of the doubt context
   * @returns {string|null} Human-readable doubt context or null
   */
  const getDoubtContextText = () => {
    if (!doubtContext) return null;
    
    return `Asking about "${doubtContext.videoTitle}" at ${formatVideoPosition(doubtContext.timestamp)}`;
  };

  return {
    doubtContext,
    isAskingDoubt,
    doubtThreads,
    startDoubt,
    cancelDoubt,
    addToDoubtThread,
    getDoubtContextText
  };
};

export default useDoubtContext;