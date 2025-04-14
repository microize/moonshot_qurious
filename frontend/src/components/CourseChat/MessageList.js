import React from 'react';
import VideoMessage from './VideoMessage';
import TextMessage from './TextMessage';
import ActionMessage from './ActionMessage';
import BotTypingIndicator from './TypingIndicator';

const MessageList = ({ 
  messages,
  isLoading,
  videoStates,
  handleTimestampClick,
  startDoubt,
  toggleVideoCollapse,
  continueAfterDoubt,
  handleVideoStateChange,
  handleVideoProgress,
  handleVideoDuration,
  handleVideoReady,
  playerRefs
}) => {
  return (
    <>
      {messages.map((message) => (
        <article 
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2 sm:gap-3 relative`}
          id={message.type === 'video' ? `video-message-${message.id}` : null}
        >
          {/* Render the appropriate message component based on type */}
          {message.type === 'video' ? (
            <VideoMessage 
              message={message}
              videoState={videoStates[message.id] || {}}
              playerRef={(player) => { playerRefs.current[message.id] = player; }}
              onToggleCollapse={() => toggleVideoCollapse(message.id)}
              onStartDoubt={() => startDoubt(message.id)}
              onVideoStateChange={(newState) => handleVideoStateChange(message.id, newState)}
              onVideoProgress={(state) => handleVideoProgress(message.id, state)}
              onVideoDuration={(duration) => handleVideoDuration(message.id, duration)}
              onVideoReady={() => handleVideoReady(message.id)}
            />
          ) : message.type === 'action' ? (
            <ActionMessage 
              action={message}
              onContinue={() => continueAfterDoubt(message.relatedToVideo)}
            />
          ) : (
            <TextMessage 
              message={message}
              onTimestampClick={handleTimestampClick}
            />
          )}
        </article>
      ))}
      
      {/* Bot Typing Indicator */}
      {isLoading && <BotTypingIndicator />}
    </>
  );
};

export default MessageList;