// src/components/CourseChat/VideoMessage.js
import React, { useEffect, useState, forwardRef } from 'react';
import ReactPlayer from 'react-player/lazy'; // Lazy load for better performance
import { 
  PlayCircle, PauseCircle, Rewind, FastForward, 
  VolumeX, Volume2, HelpCircle, Minimize2, 
  FileText, Download, BookOpen, ChevronRight,CheckCircle,
  Clock
} from 'lucide-react';
import { formatVideoPosition } from './utils/formatters';
import VideoControls from './VideoControls';

/**
 * Component to render video messages, either expanded or collapsed
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Video message data
 * @param {Object} props.videoState - Video state for this message
 * @param {Function} props.onToggleCollapse - Function to toggle video collapse state
 * @param {Function} props.onAskQuestion - Function to initiate a question
 * @param {Function} props.onVideoStateChange - Function to update video state
 * @param {Function} props.onSeek - Function to seek to a position in the video
 * @param {Function} props.onToggleTranscript - Function to toggle transcript panel
 * @returns {JSX.Element} Rendered component
 */
const VideoMessage = forwardRef(({ 
  message, 
  videoState = {}, 
  onToggleCollapse, 
  onAskQuestion, 
  onVideoStateChange,
  onSeek,
  onToggleTranscript,
  transcriptVisible,
}, ref) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [playerInstance, setPlayerInstance] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Extract necessary information from the message
  const videoTitle = message.title || 'Video';
  const videoModule = message.module || 'Module';
  const videoId = message.videoId;
  const videoUrl = message.url || '';
  const videoDuration = message.duration || 0;
  const videoDescription = message.description || '';
  
  // Default video state
  const {
    isPlaying = false,
    progress = 0,
    volume = 0.8,
    muted = false,
    speed = 1
  } = videoState;

  // Effect to handle video completion
  useEffect(() => {
    if (isPlayerReady && playerInstance && progress > 0 && videoDuration > 0) {
      // Consider video complete when within 2 seconds of the end
      if (videoDuration - progress <= 2 && isPlaying) {
        // Handle video completion
        onVideoStateChange({ isPlaying: false });
        
        // Dispatch a completion event
        const event = new CustomEvent('video-completed', {
          detail: { videoId }
        });
        document.dispatchEvent(event);
      }
    }
  }, [progress, videoDuration, isPlaying, isPlayerReady, playerInstance, videoId, onVideoStateChange]);

  const handlePlayerReady = (player) => {
    setIsPlayerReady(true);
    setPlayerInstance(player);
  };

  // Handle visibility changes when the video scrolls out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // When video is 50% or less visible, collapse it
          if (entry.intersectionRatio <= 0.5 && isPlaying) {
            // Suggest collapsing the video
            onToggleCollapse(true);
          }
        });
      },
      { threshold: [0.5] } // Trigger when 50% or less is visible
    );

    const videoElement = ref?.current;
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [ref, isPlaying, onToggleCollapse]);

  return (
    <div 
      ref={ref}
      className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Header */}
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-600 flex items-center justify-center text-white shadow-md flex-shrink-0 mr-3">
          <BookOpen size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 dark:text-white truncate">{videoTitle}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {videoModule}
          </p>
        </div>
        <div className="flex items-center flex-shrink-0 ml-2">
          {videoState.completed && (
            <span className="text-xs flex items-center text-green-500 mr-2 whitespace-nowrap">
              <CheckCircle size={14} className="mr-1" />
              Completed
            </span>
          )}
          <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
            {formatVideoPosition(videoDuration)}
          </span>
        </div>
      </div>

      {/* React Player Wrapper */}
      <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-inner relative group mb-2">
        <ReactPlayer
          url={videoUrl}
          playing={isPlaying}
          controls={false} // Disable default controls; we use custom ones
          width="100%"
          height="100%"
          volume={volume}
          muted={muted}
          playbackRate={speed}
          progressInterval={500}
          onProgress={(state) => onVideoStateChange({ progress: state.playedSeconds })}
          onDuration={(duration) => onVideoStateChange({ duration })}
          onReady={(player) => handlePlayerReady(player)}
          onPlay={() => onVideoStateChange({ isPlaying: true })}
          onPause={() => onVideoStateChange({ isPlaying: false })}
          onError={(e) => console.error('Video Error:', e)}
          onEnded={() => {
            onVideoStateChange({ isPlaying: false });
            // Dispatch completion event
            const event = new CustomEvent('video-completed', {
              detail: { videoId }
            });
            document.dispatchEvent(event);
          }}
          config={{ 
            youtube: { 
              playerVars: { 
                showinfo: 0,
                modestbranding: 1,
                iv_load_policy: 3,
                playsinline: 1 
              } 
            },
            file: {
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        
        {/* Overlay for Ask Question Button */}
        <div className={`absolute bottom-4 left-4 z-10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-lg hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation();
              onAskQuestion(videoId);
            }}
            title="Ask question at current timestamp"
          >
            <HelpCircle size={14} className="mr-1" />
            Ask Question
          </button>
        </div>
      </div>

      {/* Custom Video Controls */}
      <VideoControls 
        messageId={videoId} 
        videoState={videoState} 
        onStateChange={onVideoStateChange}
        onAskQuestion={onAskQuestion}
        onSeek={onSeek}
        onCollapse={() => onToggleCollapse(true)}
      />

      {/* Video description if available */}
      {videoDescription && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 mb-2">{videoDescription}</p>
      )}

      {/* Action Buttons Below Video */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/50 flex flex-wrap gap-2 justify-between items-center">
        {/* Left: Resources */}
        <div className="flex items-center space-x-2">
          <button 
            className={`p-1.5 ${
              transcriptVisible 
                ? 'text-amber-500 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-900/30' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            } rounded-lg transition-colors`}
            onClick={onToggleTranscript}
            title={transcriptVisible ? "Hide Transcript" : "Show Transcript"}
            aria-pressed={transcriptVisible}
          >
            <FileText size={14} />
          </button>
          <button 
            className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" 
            title="Download Resources (coming soon)"
          >
            <Download size={14} />
          </button>
        </div>
        
        {/* Right: Actions */}
        <div className="flex space-x-2">
          <button
            className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onAskQuestion(videoId);
            }}
          >
            <HelpCircle size={14} className="mr-1" />
            Ask Question
          </button>
          <button
            className="px-3 py-1.5 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center transition-colors"
            onClick={() => {
              // This should trigger the next video in the main component
              // Using custom events for loose coupling
              const event = new CustomEvent('request-next-video', {
                detail: { currentVideoId: videoId }
              });
              document.dispatchEvent(event);
            }}
          >
            Next Video
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
});

// Default export with display name for better debugging
VideoMessage.displayName = 'VideoMessage';
export default VideoMessage;