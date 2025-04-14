// src/components/CourseChat/hooks/useMessages.js
// Custom hook for message management
import { useState, useEffect } from 'react';
import { INITIAL_MESSAGES, BOT_TYPING_DELAY } from '../utils/constants';
import { generateDoubtResponse, generateGeneralResponse } from '../utils/messageGenerators';

/**
 * Custom hook to manage chat messages
 * @param {Object} options - Configuration options
 * @returns {Object} Message management methods and data
 */
const useMessages = ({ doubtContext, doubtThreads, addToDoubtThread, selectedClarity, selectedLearningMode }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false); // For bot typing indicator

  /**
   * Adds a new user message to the chat
   * @param {string} content - Message content
   * @param {Object} currentDoubtContext - Current doubt context if applicable
   * @returns {Object} The created message object
   */
  const addUserMessage = (content, currentDoubtContext = null) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: content,
      timestamp: new Date(),
      doubtContext: currentDoubtContext ? { ...currentDoubtContext } : null
    };

    setMessages(prev => [...prev, userMessage]);
    
    // If this is a doubt, add it to the thread
    if (currentDoubtContext) {
      addToDoubtThread(userMessage.id, currentDoubtContext);
    }
    
    return userMessage;
  };

  /**
   * Adds a new bot message to the chat
   * @param {Object} messageData - Message data
   * @returns {Object} The created message object
   */
  const addBotMessage = (messageData) => {
    const botMessage = {
      id: Date.now(),
      sender: 'bot',
      timestamp: new Date(),
      ...messageData
    };

    setMessages(prev => [...prev, botMessage]);
    
    // If this is a doubt response, add it to the thread
    if (messageData.threadId) {
      addToDoubtThread(botMessage.id, { videoId: messageData.relatedToVideo });
    }
    
    return botMessage;
  };

  /**
   * Toggles the collapsed state of a video message
   * @param {number} messageId - ID of the video message
   * @param {boolean|null} forceState - Force a specific state or toggle if null
   * @param {function} handleVideoStateChange - Function to control video playback
   */
  const toggleVideoCollapse = (messageId, forceState, handleVideoStateChange) => {
    setMessages(prevMessages => prevMessages.map(m => {
      if (m.id === messageId && m.type === 'video') {
        // Determine the new collapsed state
        const isCollapsed = forceState !== null ? forceState : !m.isCollapsed;
        
        // Pause the video if it's currently playing and we are collapsing it
        if (isCollapsed) {
          handleVideoStateChange(messageId, { isPlaying: false });
        }
        
        return { ...m, isCollapsed }; // Update the message state
      }
      return m; // Return unchanged message
    }));
  };

  /**
   * Generate a bot response to the user's message
   * @param {string} userInput - The user's message
   * @param {Object} currentDoubtContext - Current doubt context if applicable
   */
  const generateBotResponse = (userInput, currentDoubtContext = null) => {
    setIsLoading(true);
    
    setTimeout(() => {
      let botResponse;
      
      // Case 1: Responding to a specific doubt
      if (currentDoubtContext) {
        botResponse = {
          content: generateDoubtResponse(userInput, currentDoubtContext, selectedClarity, selectedLearningMode),
          isDoubtResponse: true,
          relatedToVideo: currentDoubtContext.videoId,
          threadId: `doubt-${currentDoubtContext.videoId}`
        };
        
        const addedMessage = addBotMessage(botResponse);
        
        // After a doubt is answered, show a "Continue Learning" prompt
        setTimeout(() => {
          addBotMessage({
            type: 'action',
            actionType: 'continue-learning',
            relatedToVideo: currentDoubtContext.videoId
          });
        }, 600);
      }
      // Case 2: User asks for the next video or to continue
      else if (userInput.toLowerCase().includes('next video') || userInput.toLowerCase().includes('continue')) {
        // Find the last video message
        const lastVideoIndex = messages.findLastIndex(m => m.type === 'video');
        const lastVideo = lastVideoIndex !== -1 ? messages[lastVideoIndex] : null;
        const nextVideoNumber = lastVideo ? lastVideo.videoNumber + 1 : 1;
        
        botResponse = {
          type: 'video',
          title: `Advanced Topic ${nextVideoNumber}`,
          videoNumber: nextVideoNumber,
          totalVideos: 12,
          moduleSection: "Advanced",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          status: 'active',
          isCollapsed: false,
          position: 0,
          duration: 300
        };
        
        addBotMessage(botResponse);
      }
      // Case 3: User types 'start' when no video has been shown yet
      else if (userInput.toLowerCase() === 'start' && !messages.some(m => m.type === 'video')) {
        botResponse = { 
          content: "Okay, starting Module 1: Introduction to Generative AI. Here's the first video:" 
        };
        
        addBotMessage(botResponse);
        
        // Add the actual first video message shortly after
        setTimeout(() => {
          addBotMessage({
            type: 'video',
            title: "Introduction to Transformer Architecture",
            videoNumber: 1,
            totalVideos: 12,
            moduleSection: "Foundations",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            status: 'active',
            position: 0,
            duration: 212,
            isCollapsed: false
          });
        }, 500);
      }
      // Case 4: General bot response
      else {
        botResponse = {
          content: generateGeneralResponse(userInput, selectedClarity, selectedLearningMode)
        };
        
        addBotMessage(botResponse);
      }
      
      setIsLoading(false);
    }, BOT_TYPING_DELAY);
  };

  return {
    messages,
    isLoading,
    addUserMessage,
    addBotMessage,
    toggleVideoCollapse,
    generateBotResponse
  };
};

export default useMessages;