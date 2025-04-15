// src/components/CourseChat/CollapsedVideo.js
// Collapsed video thumbnail component
import React from 'react';
import { PlayCircle, Clock, HelpCircle, Maximize2 } from 'lucide-react';
import { formatVideoPosition } from './utils/formatters';

/**
 * Component for the collapsed video thumbnail view
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Video message data
 * @param {Object} props.videoState - Video state for this message
 * @param {Function} props.onExpand - Callback to expand the video
 * @param {Function} props.onAskQuestion - Callback to initiate a question
 * @returns {JSX.Element} Rendered component
 */
const CollapsedVideo = ({ message, videoState = {}, onExpand, onAskQuestion }) => {
  // Extract data from video message
  const title = message.title || 'Video';
  const progress = videoState?.progress || 0;
  const duration = videoState?.duration || message.duration || 0;

  return (
    <div
      className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm"
      onClick={() => onExpand(message.id)} // Click anywhere to expand
      title={`Expand video: ${title}`}
    >
      {/* Play Icon */}
      <div className="w-10 h-10 bg-amber-500 rounded-md flex items-center justify-center text-white mr-3 flex-shrink-0 shadow">
        <PlayCircle size={18} />
      </div>
      
      {/* Video Info */}
      <div className="flex-1 overflow-hidden min-w-0">
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
          {title}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
          <Clock size={11} className="mr-1 flex-shrink-0" />
          {/* Display progress and duration */}
          <span>
            {formatVideoPosition(progress)} / 
            {formatVideoPosition(duration)}
          </span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center flex-shrink-0 ml-2">
        <button
          className="text-gray-500 hover:text-amber-500 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={(e) => { 
            e.stopPropagation(); 
            onAskQuestion(message.id); 
          }}
          title="Ask question about this video"
        >
          <HelpCircle size={16} />
        </button>
        <button
          className="text-gray-500 hover:text-green-500 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={(e) => { 
            e.stopPropagation(); 
            onExpand(message.id); 
          }}
          title="Expand video"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CollapsedVideo;