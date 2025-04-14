// src/components/CourseChat/VideoMessage.js
// Video message component with player and controls
import React from 'react';
import ReactPlayer from 'react-player/lazy'; // Lazy load for better performance
import {
  Bookmark, FileText, Download, HelpCircle, 
  ChevronRight, MessageSquare, CheckCircle
} from 'lucide-react';
import { formatTime } from './utils/formatters';
import VideoControls from './VideoControls';
import CollapsedVideo from './CollapsedVideo';

/**
 * Component to render video messages, either expanded or collapsed
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Video message data
 * @param {Object} props.videoState - Video state for this message
 * @param {Object} props.videoHandlers - Video handler functions
 * @param {Function} props.onAskQuestion - Callback to initiate a question
 * @param {Function} props.onToggleTranscript - Callback to toggle transcript panel
 * @param {boolean} props.transcriptVisible - Whether transcript panel is visible
 * @returns {JSX.Element} Rendered component
 */
const VideoMessage = ({ 
  message, 
  videoState = {}, 
  videoHandlers, 
  onAskQuestion, 
  onToggleTranscript, 
  transcriptVisible 
}) => {
  const { 
    setPlayerRef, 
    handleVideoProgress, 
    handleVideoDuration, 
    handleVideoReady, 
    handleVideoStateChange, 
    seekTo,
    toggleVideoCollapse
  } = videoHandlers;

  // If the video is collapsed, render the collapsed view
  if (message.isCollapsed) {
    return (
      <CollapsedVideo 
        message={message} 
        videoState={videoState} 
        onExpand={() => toggleVideoCollapse(message.id, false)} 
        onAskQuestion={onAskQuestion}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/50 w-full animate-fade-in">
      {/* Video Header */}
      <div className="flex items-center mb-3">
        <div className="flex-1">
          <p className="font-semibold text-gray-800 dark:text-white text-base leading-tight">
            {message.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Video {message.videoNumber} of {message.totalVideos} • {message.moduleSection}
          </p>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 ml-2">
          {formatTime(message.timestamp)}
        </div>
      </div>

      {/* React Player Wrapper */}
      <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-inner relative group mb-2">
        <ReactPlayer
          ref={(player) => setPlayerRef(message.id, player)}
          url={message.videoUrl}
          playing={videoState?.isPlaying || false}
          controls={false} // Disable default controls; we use custom ones
          width="100%"
          height="100%"
          volume={videoState?.volume ?? 0.8}
          muted={videoState?.muted || false}
          playbackRate={videoState?.speed ?? 1}
          onProgress={(state) => handleVideoProgress(message.id, state)}
          onDuration={(duration) => handleVideoDuration(message.id, duration)}
          onReady={() => handleVideoReady(message.id)}
          onPlay={() => handleVideoStateChange(message.id, { isPlaying: true })}
          onPause={() => handleVideoStateChange(message.id, { isPlaying: false })}
          onError={(e) => console.error('Video Error:', e)}
          onEnded={() => handleVideoStateChange(message.id, { isPlaying: false })}
          config={{ 
            youtube: { 
              playerVars: { 
                showinfo: 0,
                modestbranding: 1,
                iv_load_policy: 3,
                playsinline: 1 
              } 
            }
          }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        
        {/* Overlay for Ask Question Button */}
        <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-lg hover:bg-black/70"
            onClick={() => onAskQuestion(message.id)}
            title="Ask question at current timestamp"
          >
            <HelpCircle size={14} className="mr-1" />
            Ask at {formatTime(new Date(videoState?.progress * 1000 || 0))}
          </button>
        </div>
      </div>

      {/* Custom Video Controls */}
      <VideoControls 
        messageId={message.id} 
        videoState={videoState} 
        onStateChange={handleVideoStateChange}
        onAskQuestion={onAskQuestion}
        onSeek={seekTo}
        onCollapse={() => toggleVideoCollapse(message.id, true)}
      />

      {/* Action Buttons Below Video */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/50 flex flex-wrap gap-2 justify-between items-center">
        {/* Left: Resources */}
        <div className="flex items-center space-x-2">
          <button className="btn-icon-sm" title="Bookmark (coming soon)">
            <Bookmark size={14} />
          </button>
          <button
            className={`btn-icon-sm ${
              transcriptVisible 
                ? 'text-amber-500 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-900/30' : ''
            }`}
            onClick={onToggleTranscript}
            title={transcriptVisible ? "Hide Transcript" : "Show Transcript"}
            aria-pressed={transcriptVisible}
          >
            <FileText size={14} />
          </button>
          <button className="btn-icon-sm" title="Download Resources (coming soon)">
            <Download size={14} />
          </button>
        </div>
        
        {/* Right: Actions */}
        <div className="flex space-x-2">
          <button
            className="btn-secondary-sm"
            onClick={() => onAskQuestion(message.id)}
          >
            <HelpCircle size={14} className="mr-1" />
            Ask Question
          </button>
          <button
            className="btn-primary-sm"
            onClick={() => {
              // This should trigger the next video in the main component
              // We'll implement this via a custom event or callback
              const event = new CustomEvent('request-next-video', {
                detail: { currentVideoId: message.id }
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
};

export default VideoMessage;