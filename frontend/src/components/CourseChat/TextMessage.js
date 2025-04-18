// src/components/CourseChat/TextMessage.js
import React from 'react';
import { CornerDownRight, Lightbulb } from 'lucide-react';
import { formatTime, formatVideoPosition } from './utils/formatters';

/**
 * Component to render a text message with timestamps and contextual information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Message data to display
 * @param {Function} props.onTimestampClick - Callback when a timestamp is clicked
 * @param {Function} props.onStartButtonClick - Callback for start button click
 * @param {Function} props.onContinueButtonClick - Callback for continue button click
 * @param {Function} props.onResumeButtonClick - Callback for resume button click
 * @returns {JSX.Element} Rendered component
 */
const TextMessage = ({ 
  message, 
  onTimestampClick,
  onStartButtonClick,
  onContinueButtonClick,
  onResumeButtonClick
}) => {
  const isUser = message.sender === 'user';

  /**
   * Renders message content, making timestamps clickable if context is provided
   * @param {string} content - Message content
   * @param {any} contextForTimestampClick - Context for clickable timestamps
   * @returns {JSX.Element|string} Rendered content
   */
  const renderMessageContent = (content, contextForTimestampClick = null) => {
    if (!content) return '';
    
    // Regex to find potential timestamps (MM:SS or HH:MM:SS)
    const timeRegex = /(\s*)(\d{1,2}:\d{2}(?::\d{2})?)(\s*)/g;
    
    // If no context for timestamp clicks, or no timestamps found, return the content as is
    if (!contextForTimestampClick?.videoId || !timeRegex.test(content)) {
      return content;
    }
    
    // Reset regex index after testing
    timeRegex.lastIndex = 0;
    
    // Split the text by timestamps
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = timeRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      
      const timeParts = match[2].split(':').map(Number);
      let seconds = 0;
      
      if (timeParts.length === 3) { // HH:MM:SS
        seconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
      } else if (timeParts.length === 2) { // MM:SS
        seconds = timeParts[0] * 60 + timeParts[1];
      }

      parts.push(
        <button
          key={match.index}
          onClick={() => onTimestampClick(contextForTimestampClick.videoId, seconds)}
          className="text-amber-600 dark:text-amber-400 font-medium hover:underline focus:outline-none focus:ring-1 focus:ring-amber-500 rounded px-0.5 py-0 bg-amber-100/50 dark:bg-amber-900/30"
          title={`Jump to ${match[2]} in video`}
        >
          {match[2]}
        </button>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }
    
    return parts;
  };

  return (
    <div className={`rounded-xl px-4 py-3 text-sm shadow-md relative ${
      isUser
        ? 'bg-amber-500 text-white rounded-br-none ml-auto max-w-[85%]'
        : message.isDoubtResponse
          ? 'bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-green-600/50 text-gray-800 dark:text-gray-100 rounded-bl-none mr-auto max-w-[85%]'
          : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 rounded-bl-none mr-auto max-w-[85%]'
    }`}>
      {/* Doubt Context Reference (Shown on User's Doubt Message) */}
      {message.doubtContext && isUser && (
        <div className="bg-amber-100/60 dark:bg-amber-900/40 rounded px-2 py-1 mb-2 text-xs flex items-center text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-700/50">
          <CornerDownRight size={12} className="mr-1.5 flex-shrink-0" />
          <span>Re: "{message.doubtContext.videoTitle}" at
            <button
              onClick={() => onTimestampClick(message.doubtContext.videoId, message.doubtContext.timestamp)}
              className="font-medium hover:underline mx-1"
              title="Jump to timestamp"
            >
              {formatVideoPosition(message.doubtContext.timestamp)}
            </button>
          </span>
        </div>
      )}

      {/* Doubt Answer Context (Shown on Bot's Doubt Response) */}
      {message.isDoubtResponse && !isUser && (
        <div className="bg-green-100/50 dark:bg-green-900/40 rounded px-2 py-1 mb-2 text-xs text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700/50 flex items-center">
          <Lightbulb size={12} className="mr-1.5 inline" /> Answer regarding video content
        </div>
      )}

      {/* Message Text Content */}
      <div className="whitespace-pre-wrap leading-relaxed">
        {isUser 
          ? message.content 
          : renderMessageContent(
              message.content,
              message.isDoubtResponse ? { videoId: message.relatedToVideo } : null
            )
        }
      </div>

      {/* Action Buttons (for bot messages with special actions) */}
      {message.showStartButton && !isUser && onStartButtonClick && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-center">
          <button
            onClick={onStartButtonClick}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-200"
          >
            Start Learning
          </button>
        </div>
      )}

      {/* Continue button for next video */}
      {message.showContinueButton && !isUser && onContinueButtonClick && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-center">
          <button
            onClick={() => onContinueButtonClick(message.nextVideoId)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm hover:shadow-md transition-all duration-200 flex items-center"
          >
            Continue to Next Lesson
          </button>
        </div>
      )}

      {/* Resume button after doubt resolution */}
      {message.relatedToCurrentVideo && !isUser && onResumeButtonClick && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-end">
          <button
            onClick={onResumeButtonClick}
            className="px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-md text-sm hover:bg-amber-200 dark:hover:bg-amber-900/40 transition-colors flex items-center"
          >
            Jump to Video
          </button>
        </div>
      )}

      {/* Timestamp */}
      <div className={`whitespace-nowrap text-xs mt-1.5 ${
        isUser
          ? 'text-amber-100/80 text-right'
          : 'text-gray-400 dark:text-gray-500 text-left'
      }`}>
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
};

export default TextMessage;