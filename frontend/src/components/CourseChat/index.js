// src/components/CourseChat/index.js
// Main export file for CourseChat component

import CourseChat from './CourseChat';

// Export main component
export default CourseChat;

// Export sub-components for individual usage if needed
export { default as VideoMessage } from './VideoMessage';
export { default as TextMessage } from './TextMessage';
export { default as ChatSidebar } from './ChatSidebar';
export { default as ActionMessage } from './ActionMessage';
export { default as Header } from './Header';
export { default as InputArea } from './InputArea';
export { default as TranscriptPanel } from './TranscriptPanel';
export { default as CollapsedVideo } from './CollapsedVideo';
export { default as VideoControls } from './VideoControls';
export { default as TypingIndicator } from './TypingIndicator';
export { default as ModePanel } from './ModePanel';

// Export hooks
export { default as useDoubtContext } from './hooks/useDoubtContext';
export { default as useVideoState } from './hooks/useVideoState';
export { default as useMessages } from './hooks/useMessages';

// Export utilities
export * from './utils/constants';
export * from './utils/formatters';
export * from './utils/messageGenerators';