// src/components/CourseChat/VideoControls.js
// Video controls component
import React from 'react';
import {
  PlayCircle, PauseCircle, Rewind, FastForward, 
  VolumeX, Volume2, HelpCircle, Minimize2
} from 'lucide-react';
import { formatVideoPosition } from './utils/formatters';

/**
 * Component for the custom video controls below the player
 * 
 * @param {Object} props - Component props
 * @param {number} props.messageId - ID of the video message
 * @param {Object} props.videoState - Video state for this message
 * @param {Function} props.onStateChange - Callback to update video state
 * @param {Function} props.onAskQuestion - Callback to initiate a question
 * @param {Function} props.onSeek - Callback for seeking the video
 * @param {Function} props.onCollapse - Callback to collapse the video
 * @returns {JSX.Element} Rendered component
 */
const VideoControls = ({ 
  messageId, 
  videoState = {}, 
  onStateChange, 
  onAskQuestion, 
  onSeek,
  onCollapse 
}) => {
  // Extract video state with default values
  const { 
    isPlaying = false, 
    progress = 0, 
    duration = 0, 
    speed = 1, 
    volume = 0.8, 
    muted = false 
  } = videoState;

  // Prevent rendering if duration is not yet known
  if (duration <= 0) {
    return (
      <div className="h-[60px] flex items-center justify-center text-xs text-gray-400">
        Loading controls...
      </div>
    );
  }

  /**
   * Component for the video progress bar
   */
  const VideoProgressBar = () => (
    <div 
      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden my-1 cursor-pointer"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        onSeek(messageId, clickPosition * duration, true);
      }}
    >
      <div
        className="h-full bg-amber-500 rounded-full transition-[width] duration-150 ease-linear"
        style={{ width: duration > 0 ? `${(progress / duration) * 100}%` : '0%' }}
      />
    </div>
  );

  return (
    <div className="mt-2 px-1">
      {/* Progress Bar */}
      <VideoProgressBar />
      
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
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            onClick={() => onStateChange(messageId, { isPlaying: !isPlaying })}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
          </button>
          <button
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden sm:inline-flex"
            onClick={() => onSeek(messageId, Math.max(0, progress - 10), true)}
            aria-label="Rewind 10 seconds"
          >
            <Rewind size={16} />
          </button>
          <button
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden sm:inline-flex"
            onClick={() => onSeek(messageId, Math.min(duration, progress + 10), true)}
            aria-label="Fast Forward 10 seconds"
          >
            <FastForward size={16} />
          </button>
        </div>

        {/* Right Controls: Settings & Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Playback Speed Button */}
          <div className="relative group">
            <button 
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-xs font-medium" 
              title={`Playback speed: ${speed}x`}
              onClick={() => {
                // Cycle through common speeds
                const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
                const currentIndex = speeds.indexOf(speed);
                const nextIndex = (currentIndex + 1) % speeds.length;
                onStateChange(messageId, { speed: speeds[nextIndex] });
              }}
            >
              {speed}x
            </button>
          </div>
          
          {/* Volume Control */}
          <div className="flex items-center group">
            <button
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => onStateChange(messageId, { muted: !muted })}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            {/* Volume Slider (Appears on Hover) */}
            <input
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={muted ? 0 : volume}
              onChange={(e) => onStateChange(messageId, { 
                volume: parseFloat(e.target.value), 
                muted: false 
              })}
              className="w-16 h-1 ml-1 hidden group-hover:inline-block accent-amber-500 cursor-pointer"
              aria-label="Volume"
            />
          </div>
          
          {/* Ask Question Button */}
          <button
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            onClick={() => onAskQuestion(messageId)}
            aria-label="Ask Question about this video"
          >
            <HelpCircle size={16} />
          </button>
          
          {/* Collapse Video Button */}
          <button
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            onClick={() => onCollapse(messageId)}
            aria-label="Collapse Video"
          >
            <Minimize2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;