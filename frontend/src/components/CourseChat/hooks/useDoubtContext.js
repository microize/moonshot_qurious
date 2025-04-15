// src/components/CourseChat/hooks/useDoubtContext.js
// Fixed custom hook for doubt context management
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
   * @param {number} timestamp - Specific timestamp (in seconds)
   * @param {Object} videoStates - Current video states
   * @param {function} focusInput - Function to focus the input field
   */
  const startDoubt = (videoId, timestamp, videoStates, focusInput) => {
    if (!videoId) return; // Exit if no videoId provided
    
    // Find the video title from available data
    // In a real app, you might want to fetch this from your API
    const videoTitle = getVideoTitle(videoId);
    
    // Pause the video if it's currently playing
    handleVideoStateChange(videoId, { isPlaying: false });

    // Set the doubt context state
    setDoubtContext({
      videoId,
      videoTitle,
      timestamp
    });
    
    setIsAskingDoubt(true); // Set the flag to indicate doubt mode

    // Focus the input field after a short delay
    setTimeout(() => focusInput && focusInput(), 100);
  };

  /**
   * Helper function to get video title given a video ID
   * In a real app, you would fetch this from your video data source
   */
  const getVideoTitle = (videoId) => {
    // This is a placeholder - in a real app you would fetch the title
    // from your data source or from the videoStates object
    const commonTitles = {
      1: "Introduction to Generative AI",
      2: "Understanding Transformer Architecture",
      3: "Prompt Engineering Techniques"
    };
    
    return commonTitles[videoId] || "Video";
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
    if (!context || !context.videoId) return;
    
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