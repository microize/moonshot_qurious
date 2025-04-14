// src/components/CourseChat/TypingIndicator.js
// Bot typing indicator component
import React from 'react';
import { Bot } from 'lucide-react';

/**
 * Component to show when the bot is typing
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Whether the indicator is visible
 * @returns {JSX.Element|null} Rendered component or null if not visible
 */
const TypingIndicator = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start items-start gap-3 animate-pulse">
      {/* Bot Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-amber-400 to-orange-600 dark:from-amber-500 dark:to-orange-700 text-white">
        <Bot size={16} />
      </div>
      
      {/* Typing Bubble */}
      <div className="bg-white dark:bg-gray-800 rounded-xl rounded-bl-none px-4 py-3 text-sm shadow-md border border-gray-100 dark:border-gray-700/50 text-gray-500 dark:text-gray-400 italic">
        Typing...
      </div>
    </div>
  );
};

export default TypingIndicator;