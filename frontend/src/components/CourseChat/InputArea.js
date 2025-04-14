// src/components/CourseChat/InputArea.js
// Simplified Chat input component
import React, { useRef } from 'react';
import { SendHorizontal, Mic, X, HelpCircle } from 'lucide-react';
import { formatVideoPosition } from './utils/formatters';

/**
 * Component for chat input area with doubt context
 * 
 * @param {Object} props - Component props
 * @param {string} props.inputValue - Current input value
 * @param {Function} props.setInputValue - Function to update input value
 * @param {Function} props.handleSendMessage - Function to send a message
 * @param {boolean} props.isLoading - Whether bot is currently typing
 * @param {Object} props.doubtContext - Current doubt context if any
 * @param {boolean} props.isAskingDoubt - Whether user is asking a doubt
 * @param {Function} props.cancelDoubt - Function to cancel doubt
 * @returns {JSX.Element} Rendered component
 */
const InputArea = ({ 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  isLoading, 
  doubtContext, 
  isAskingDoubt, 
  cancelDoubt 
}) => {
  const inputRef = useRef(null);

  return (
    <>
      {/* Doubt Context Indicator (Shown above input when asking a doubt) */}
      {isAskingDoubt && doubtContext && (
        <div className="bg-amber-100 dark:bg-amber-900/50 rounded-t-md px-3 py-1.5 text-xs text-amber-800 dark:text-amber-200 flex justify-between items-center border-b border-amber-200 dark:border-amber-700/50">
          <div className="flex items-center gap-1.5">
            <HelpCircle size={14}/>
            Asking about "{doubtContext.videoTitle}" at {formatVideoPosition(doubtContext.timestamp)}
          </div>
          <button 
            onClick={cancelDoubt} 
            className="text-amber-600 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-100 font-medium flex items-center gap-0.5" 
            title="Cancel question"
          >
            <X size={14}/> Cancel
          </button>
        </div>
      )}
      
      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Text Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isAskingDoubt ? "Type your question about the video..." : "Ask anything or type 'next video'..."}
          className={`w-full p-3 pl-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 ${isAskingDoubt ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10' : ''}`}
          disabled={isLoading} // Disable input while bot is typing
          aria-label="Chat input"
        />
        
        {/* Voice Input Button (Placeholder) */}
        <button 
          type="button" 
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" 
          title="Voice Input (coming soon)" 
          disabled
        >
          <Mic size={18} />
        </button>
        
        {/* Send Button */}
        <button
          type="submit"
          className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!inputValue.trim() || isLoading} // Disable if input is empty or bot is loading
          aria-label="Send message"
        >
          <SendHorizontal size={18} />
        </button>
      </form>
    </>
  );
};

export default InputArea;