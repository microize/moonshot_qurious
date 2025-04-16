// src/components/CourseChat/VideoControls.js
import React, { useState } from 'react';
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
  const [isVolumeControlVisible, setIsVolumeControlVisible] = useState(false);
  const [isSpeedControlVisible, setIsSpeedControlVisible] = useState(false);
  
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

  // Speed options
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  /**
   * Component for the video progress bar
   */
  const VideoProgressBar = () => (
    <div 
      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden my-1 cursor-pointer group"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        onSeek(messageId, clickPosition * duration, true);
      }}
      onMouseOver={() => {
        // Expand the progress bar on hover for easier seeking
        e.currentTarget.classList.add('h-2.5');
      }}
      onMouseOut={() => {
        // Return to normal size on mouse out
        e.currentTarget.classList.remove('h-2.5');
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
            onClick={() => onStateChange({ isPlaying: !isPlaying })}
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
          
          {/* Playback Speed Button */}
          <div className="relative group">
            <button 
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-xs font-medium" 
              title={`Playback speed: ${speed}x`}
              onClick={() => setIsSpeedControlVisible(!isSpeedControlVisible)}
              onBlur={() => setTimeout(() => setIsSpeedControlVisible(false), 200)}
            >
              {speed}x
            </button>
            
            {/* Speed Dropdown */}
            {isSpeedControlVisible && (
              <div className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 z-10 py-1">
                {speedOptions.map((speedOption) => (
                  <button
                    key={speedOption}
                    className={`block w-full text-left px-4 py-1 text-xs ${
                      speed === speedOption 
                        ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      onStateChange({ speed: speedOption });
                      setIsSpeedControlVisible(false);
                    }}
                  >
                    {speedOption}x
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Controls: Settings & Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Volume Control */}
          <div className="relative flex items-center group">
            <button
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => onStateChange({ muted: !muted })}
              onMouseEnter={() => setIsVolumeControlVisible(true)}
              onMouseLeave={() => setTimeout(() => setIsVolumeControlVisible(false), 1000)}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            
            {/* Volume Slider (Appears on Hover) */}
            {isVolumeControlVisible && (
              <div 
                className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 z-10 p-2 w-32"
                onMouseEnter={() => setIsVolumeControlVisible(true)}
                onMouseLeave={() => setIsVolumeControlVisible(false)}
              >
                <input
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05"
                  value={muted ? 0 : volume}
                  onChange={(e) => onStateChange({ 
                    volume: parseFloat(e.target.value), 
                    muted: false 
                  })}
                  className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full accent-amber-500 cursor-pointer"
                  aria-label="Volume"
                />
              </div>
            )}
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
            onClick={onCollapse}
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