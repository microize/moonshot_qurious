// src/components/CourseChat/TextMessage.js
// Text message bubble component
import React from 'react';
import { Bell, Bot, User, CornerDownRight, Lightbulb } from 'lucide-react';
import { formatTime } from './utils/formatters';

/**
 * Component to render a text message with timestamps and contextual information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Message data to display
 * @param {Function} props.onTimestampClick - Callback when a timestamp is clicked
 * @returns {JSX.Element} Rendered component
 */
const TextMessage = ({ message, onTimestampClick }) => {
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
                onClick={() => onTimestampClick(contextForTimestampClick.videoId, seconds)}
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

  return (
    <div className={`rounded-xl px-4 py-3 text-sm shadow-md relative ${
      message.sender === 'user'
        ? 'bg-amber-500 text-white rounded-br-none' // User message style
        : message.isDoubtResponse
          ? 'bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-green-600/50 text-gray-800 dark:text-gray-100 rounded-bl-none' // Doubt answer style
          : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 text-gray-800 dark:text-gray-100 rounded-bl-none' // Standard bot message style
    }`}>
      {/* Doubt Context Reference (Shown on User's Doubt Message) */}
      {message.doubtContext && (
        <div className="bg-amber-100/60 dark:bg-amber-900/40 rounded px-2 py-1 mb-2 text-xs flex items-center text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-700/50">
          <CornerDownRight size={12} className="mr-1.5 flex-shrink-0" />
          <span>Re: "{message.doubtContext.videoTitle}" at
            <button
              onClick={() => onTimestampClick(message.doubtContext.videoId, message.doubtContext.timestamp)}
              className="font-medium hover:underline mx-1"
              title="Jump to timestamp"
            >
              {formatTime(new Date(message.doubtContext.timestamp * 1000))}
            </button>
          </span>
        </div>
      )}

      {/* Doubt Answer Context (Shown on Bot's Doubt Response) */}
      {message.isDoubtResponse && (
        <div className="bg-green-100/50 dark:bg-green-900/40 rounded px-2 py-1 mb-2 text-xs text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700/50 flex items-center">
          <Lightbulb size={12} className="mr-1.5 inline" /> Answer regarding video content
        </div>
      )}

      {/* Message Text Content */}
      <div className="whitespace-pre-wrap leading-relaxed">
        {renderMessageContent(
          message.content,
          message.isDoubtResponse ? { videoId: message.relatedToVideo } : null
        )}
      </div>

      {/* Timestamp (Subtly placed) */}
      <div className={`text-xs mt-1 ${
        message.sender === 'user' 
          ? 'text-amber-100/80 text-right' 
          : 'text-gray-400 dark:text-gray-500 text-left'
      }`}>
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
};

export default TextMessage;