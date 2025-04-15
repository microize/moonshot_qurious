// src/components/CourseChat/hooks/useMessages.js
// Fixed custom hook for message management
import { useState } from 'react';
import { generateDoubtResponse, generateGeneralResponse } from '../utils/messageGenerators';
import { BOT_TYPING_DELAY } from '../utils/constants';

/**
 * Custom hook to manage chat messages
 * @param {Object} options - Configuration options
 * @returns {Object} Message management methods and data
 */
const useMessages = ({ 
  doubtContext, 
  doubtThreads, 
  addToDoubtThread, 
  selectedClarity, 
  selectedLearningMode 
}) => {
  const [messages, setMessages] = useState([]);
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
      id: Date.now() + Math.random(), // Ensure unique ID
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
      const lowerInput = userInput.toLowerCase();
      
      // Case 1: Responding to a specific doubt about a video
      if (currentDoubtContext) {
        const botResponse = {
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
      else if (lowerInput.includes('next video') || lowerInput.includes('continue')) {
        // Find the last video message
        const lastVideoIndex = messages.findLastIndex(m => m.type === 'video');
        const lastVideo = lastVideoIndex !== -1 ? messages[lastVideoIndex] : null;
        
        // First add a text response
        addBotMessage({
          content: `Let's move on to the next video.`
        });
        
        // Then add a custom event to trigger the next video action
        setTimeout(() => {
          if (lastVideo) {
            const event = new CustomEvent('request-next-video', {
              detail: { currentVideoId: lastVideo.id }
            });
            document.dispatchEvent(event);
          } else {
            // If no previous video, start with the first one
            addBotMessage({
              content: "Let's start with the first video.",
              requestFirstVideo: true
            });
          }
        }, 500);
      }
      // Case 3: User types 'start' when no video has been shown yet
      else if (lowerInput === 'start' || lowerInput === 'begin') {
        addBotMessage({ 
          content: "Great! Let's start with the first module: Introduction to Generative AI.",
          requestFirstVideo: true
        });
      }
      // Case 4: General bot response
      else {
        addBotMessage({
          content: generateGeneralResponse(userInput, selectedClarity, selectedLearningMode)
        });
      }
      
      setIsLoading(false);
    }, BOT_TYPING_DELAY);
  };

  /**
   * Clear all messages
   */
  const clearMessages = () => {
    setMessages([]);
  };

  /**
   * Remove a specific message
   * @param {number} messageId - ID of the message to remove
   */
  const removeMessage = (messageId) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  /**
   * Update a specific message
   * @param {number} messageId - ID of the message to update
   * @param {Object} updates - Properties to update
   */
  const updateMessage = (messageId, updates) => {
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, ...updates } : m
    ));
  };

  /**
   * Find a message by ID
   * @param {number} messageId - ID of the message to find
   * @returns {Object|null} The message object or null
   */
  const findMessage = (messageId) => {
    return messages.find(m => m.id === messageId) || null;
  };

  /**
   * Find the last message of a specific type
   * @param {string} type - Message type to search for
   * @returns {Object|null} The message object or null
   */
  const findLastMessageOfType = (type) => {
    const index = messages.findLastIndex(m => m.type === type);
    return index !== -1 ? messages[index] : null;
  };

  /**
   * Process a special command from the user
   * @param {string} command - The command to process
   * @param {Object} context - Additional context for the command
   */
  const processCommand = (command, context = {}) => {
    switch(command.toLowerCase()) {
      case 'clear':
        clearMessages();
        addBotMessage({ content: "I've cleared our conversation history." });
        break;
      case 'restart':
        clearMessages();
        addBotMessage({ 
          content: "Let's start fresh! What would you like to learn about?",
          isIntro: true,
          showStartButton: true
        });
        break;
      case 'help':
        addBotMessage({ 
          content: "Here are some commands you can use:\n• start - Begin the first lesson\n• continue - Move to the next video\n• clear - Clear chat history\n• restart - Start over completely"
        });
        break;
      default:
        addBotMessage({ content: `I don't recognize the command '${command}'. Try 'help' to see available commands.` });
    }
  };

  /**
   * Add a video message to the chat
   * @param {Object} videoData - Video data to display
   * @param {boolean} autoPlay - Whether to auto-play the video
   */
  const addVideoMessage = (videoData, autoPlay = true) => {
    addBotMessage({
      type: 'video',
      id: videoData.id, // Use the video ID as the message ID for consistency
      video: {
        ...videoData,
        autoPlay
      }
    });
  };

  return {
    messages,
    isLoading,
    addUserMessage,
    addBotMessage,
    toggleVideoCollapse,
    generateBotResponse,
    clearMessages,
    removeMessage,
    updateMessage,
    findMessage,
    findLastMessageOfType,
    processCommand,
    addVideoMessage
  };
};

export default useMessages;