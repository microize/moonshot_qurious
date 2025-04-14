// src/components/CourseChat/utils/constants.js
// Constants used across components

// Timing constants
export const BOT_TYPING_DELAY = 800; // ms
export const VIDEO_PROGRESS_INTERVAL = 1000; // ms

// Default initial messages
export const INITIAL_MESSAGES = [
  { id: 1, sender: 'bot', content: "Welcome to the Generative AI for Developers professional learning track. This course will provide comprehensive coverage of implementing generative AI in production applications.", timestamp: new Date(Date.now() - 60000 * 5) }, // 5 mins ago
  { id: 2, sender: 'bot', content: "Type 'start' to begin the first module, or ask me any questions about generative AI!", timestamp: new Date(Date.now() - 60000 * 4.9) }, // ~4.9 mins ago
];

// Clarity levels
export const CLARITY_LEVELS = {
  BASIC: 'basic',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

// Learning modes
export const LEARNING_MODES = {
  NORMAL: 'normal',
  EXPRESS: 'express',
  COMPREHENSIVE: 'comprehensive',
  REVIEW: 'review',
  ASSESSMENT: 'assessment',
  PRACTICAL: 'practical'
};

// Message types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  VIDEO: 'video',
  ACTION: 'action'
};

// Action types
export const ACTION_TYPES = {
  CONTINUE_LEARNING: 'continue-learning'
};

// CSS classes for button styles
export const BUTTON_STYLES = {
  PRIMARY: 'bg-amber-500 hover:bg-amber-600 text-white',
  SECONDARY: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600',
  OUTLINE: 'border border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20',
  TEXT: 'text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20',
};