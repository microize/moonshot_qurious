// src/components/CourseChat/hooks/useVideoState.js
// Custom hook for video state management
import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook to manage video states across multiple videos
 * @param {Array} messages - The messages array to scan for videos
 * @returns {Object} Video state management methods and data
 */
const useVideoState = (messages) => {
  // Store playback state for each video message ID
  const [videoStates, setVideoStates] = useState({});
  
  // Refs for ReactPlayer instances
  const playerRefs = useRef({});

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

  /**
   * Updates the state for a specific video
   * @param {number} messageId - ID of the video message
   * @param {object} newState - New state values to apply
   */
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

  /**
   * Callback from ReactPlayer providing playback progress
   * @param {number} messageId - ID of the video message
   * @param {object} state - Progress state from ReactPlayer
   */
  const handleVideoProgress = (messageId, state) => {
    // Update progress in state, but only if the video is playing to avoid unnecessary updates
    if (videoStates[messageId]?.isPlaying) {
      handleVideoStateChange(messageId, { progress: state.playedSeconds });
    }
  };

  /**
   * Callback from ReactPlayer providing the total duration of the video
   * @param {number} messageId - ID of the video message
   * @param {number} duration - Duration in seconds
   */
  const handleVideoDuration = (messageId, duration) => {
    handleVideoStateChange(messageId, { duration: duration });
  };

  /**
   * Callback when the ReactPlayer instance is ready
   * @param {number} messageId - ID of the video message
   */
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

  /**
   * Set a player reference for a specific video
   * @param {number} messageId - ID of the video message
   * @param {object} player - ReactPlayer instance
   */
  const setPlayerRef = (messageId, player) => {
    playerRefs.current[messageId] = player;
  };

  /**
   * Seek to a specific time in a video
   * @param {number} messageId - ID of the video message
   * @param {number} time - Time in seconds to seek to
   * @param {boolean} autoPlay - Whether to play after seeking
   */
  const seekTo = (messageId, time, autoPlay = true) => {
    const player = playerRefs.current[messageId];
    if (player) {
      player.seekTo(time, 'seconds');
      if (autoPlay) {
        handleVideoStateChange(messageId, { isPlaying: true });
      }
    } else {
      // Store the seek request for when player becomes available
      handleVideoStateChange(messageId, { 
        seekTo: time, 
        isPlaying: autoPlay 
      });
    }
  };

  return {
    videoStates,
    playerRefs: playerRefs.current,
    handleVideoStateChange,
    handleVideoProgress,
    handleVideoDuration,
    handleVideoReady,
    setPlayerRef,
    seekTo
  };
};

export default useVideoState;