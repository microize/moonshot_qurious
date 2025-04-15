// src/components/CourseChat/hooks/useVideoState.js
// Fixed custom hook for video state management
import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook to manage video states across multiple videos
 * @returns {Object} Video state management methods and data
 */
const useVideoState = () => {
  // Store playback state for each video message ID
  const [videoStates, setVideoStates] = useState({});
  
  // Refs for ReactPlayer instances
  const playerRefs = useRef({});

  /**
   * Updates the state for a specific video
   * @param {number} messageId - ID of the video message
   * @param {object} newState - New state values to apply
   */
  const handleVideoStateChange = (messageId, newState) => {
    if (!messageId) return;
    
    setVideoStates(prev => {
      const current = prev[messageId] || {};
      
      // If changing volume, ensure muted is set appropriately
      if (newState.volume !== undefined) {
        newState.muted = newState.volume <= 0;
      }
      
      // If changing muted state, ensure volume reflects this visually if needed
      if (newState.muted === true && current.volume > 0) {
        // Store previous volume to restore on unmute
        newState.previousVolume = current.volume;
      } else if (newState.muted === false && (current.volume === 0 || current.previousVolume)) {
        // Restore previous volume if stored, or set to default
        newState.volume = current.previousVolume || 0.8;
      }
      
      // If we're setting a video to playing, pause all other videos
      if (newState.isPlaying) {
        // First update current video state
        const updatedState = {
          ...prev,
          [messageId]: { ...current, ...newState }
        };
        
        // Then pause all other videos
        Object.keys(updatedState).forEach(id => {
          if (Number(id) !== messageId && updatedState[id]?.isPlaying) {
            updatedState[id] = { ...updatedState[id], isPlaying: false };
          }
        });
        
        return updatedState;
      }
      
      // Regular state update for single video
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
    if (duration && duration > 0) {
      handleVideoStateChange(messageId, { duration: duration });
    }
  };

  /**
   * Callback when the ReactPlayer instance is ready
   * @param {number} messageId - ID of the video message
   */
  const handleVideoReady = (messageId) => {
    const player = playerRefs.current[messageId];
    if (!player) return; // Should not happen, but safety check

    // Initialize the video state if not already done
    if (!videoStates[messageId]) {
      handleVideoStateChange(messageId, {
        isPlaying: false,
        progress: 0,
        speed: 1,
        volume: 0.8,
        muted: false
      });
    }

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
    
    // Auto-play the video if requested
    if (videoStates[messageId]?.isPlaying) {
      // Using a slight delay helps ensure the video is ready to play
      setTimeout(() => {
        player.seekTo(videoStates[messageId]?.progress || 0, 'seconds');
      }, 100);
    }
  };

  /**
   * Set a player reference for a specific video
   * @param {number} messageId - ID of the video message
   * @param {object} player - ReactPlayer instance
   */
  const setPlayerRef = (messageId, player) => {
    if (messageId && player) {
      playerRefs.current[messageId] = player;
    }
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

  /**
   * Initialize state for a new video
   * @param {number} messageId - ID of the video message
   * @param {number} duration - Initial duration if known
   */
  const initializeVideo = (messageId, duration = 0) => {
    if (!videoStates[messageId]) {
      handleVideoStateChange(messageId, {
        isPlaying: false,
        progress: 0,
        speed: 1,
        volume: 0.8,
        muted: false,
        duration: duration
      });
    }
  };

  // Clean up stale player refs when component unmounts
  useEffect(() => {
    return () => {
      playerRefs.current = {};
    };
  }, []);

  return {
    videoStates,
    playerRefs: playerRefs.current,
    handleVideoStateChange,
    handleVideoProgress,
    handleVideoDuration,
    handleVideoReady,
    setPlayerRef,
    seekTo,
    initializeVideo
  };
};

export default useVideoState;