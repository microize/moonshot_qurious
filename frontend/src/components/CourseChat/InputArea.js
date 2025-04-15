// src/components/CourseChat/InputArea.js
import React, { useRef, useEffect, useState } from 'react';
import { SendHorizontal, Mic, X, HelpCircle, Code, Image } from 'lucide-react';
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
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showCodingInterface, setShowCodingInterface] = useState(false);
  
  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      handleSendMessage(e);
    }
  };

  // Handle opening the coding interface
  const handleOpenCodingInterface = () => {
    setShowCodingInterface(true);
    // Additional logic to open the coding interface would go here
  };

  return (
    <div className="w-full">
      {/* Doubt Context Indicator (Shown above input when asking a doubt) */}
      {isAskingDoubt && doubtContext && (
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-t-xl px-4 py-2.5 text-sm text-amber-800 dark:text-amber-200 flex justify-between items-center border-b border-amber-200 dark:border-amber-700/50 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-amber-200 dark:bg-amber-700 rounded-full text-amber-700 dark:text-amber-200">
              <HelpCircle size={14} />
            </span>
            <span>
              Asking about <span className="font-medium">"{doubtContext.videoTitle}"</span> at <span className="font-medium">{formatVideoPosition(doubtContext.timestamp)}</span>
            </span>
          </div>
          <button 
            onClick={cancelDoubt} 
            className="text-amber-600 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-100 font-medium flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-amber-200/50 dark:hover:bg-amber-700/30 transition-all duration-200" 
            title="Cancel question"
          >
            <X size={14} />
            <span>Cancel</span>
          </button>
        </div>
      )}
      
      {/* Input Form */}
      <form 
        onSubmit={handleSubmit} 
        className={`flex items-center gap-3 bg-white dark:bg-gray-800 p-3 ${isAskingDoubt ? 'rounded-b-xl' : 'rounded-xl'} shadow-sm ${isInputFocused ? 'ring-2 ring-amber-400 dark:ring-amber-500/50' : ''} transition-all duration-200`}
      >
        {/* Coding Interface Button - Replacing Paperclip */}
        <button 
          type="button" 
          onClick={handleOpenCodingInterface}
          className="p-2 text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200" 
          title="Open coding interface" 
          disabled={isLoading}
        >
          <Code size={18} />
        </button>
        
        {/* Text Input Field */}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder={isAskingDoubt 
              ? "Type your question about the video..." 
              : "Ask anything or type 'next video'..."}
            className={`w-full p-3 px-4 rounded-xl ${
              isAskingDoubt 
                ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-200' 
                : 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white'
            } focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200`}
            disabled={isLoading} // Disable input while bot is typing
            aria-label="Chat input"
          />
          
          {/* Character Count (shows when typing) */}
          {inputValue.length > 0 && (
            <div className="absolute right-3 bottom-3 text-xs text-gray-400 dark:text-gray-500 font-mono pointer-events-none">
              {inputValue.length}
            </div>
          )}
        </div>
        
        {/* Voice Input Button (Kept as is) */}
        <button 
          type="button" 
          className="p-2 text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all duration-200 group" 
          title="Voice Input (coming soon)" 
          disabled={isLoading}
        >
          <Mic size={18} className="group-hover:scale-110 transition-transform" />
        </button>
        
        {/* Send Button */}
        <button
          type="submit"
          className={`p-2.5 rounded-lg transition-all duration-300 ${
            inputValue.trim() && !isLoading
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
          disabled={!inputValue.trim() || isLoading}
          aria-label="Send message"
        >
          <SendHorizontal size={18} className={`${inputValue.trim() && !isLoading ? 'transform group-hover:translate-x-0.5 transition-transform' : ''}`} />
        </button>
      </form>
      
      {/* Input Helpers - shown below the input */}
      <div className="px-2 mt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <div>
          {isAskingDoubt ? "Your question will reference the current video context" : "Pro tip: Ask about concepts or request examples"}
        </div>
        <div className="flex gap-2">
          <button className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Examples
          </button>
          <span>•</span>
          <button className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Help
          </button>
        </div>
      </div>

      {/* Coding Interface Modal (simplified example) */}
      {showCodingInterface && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-3/4 h-3/4 p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Coding Interface</h2>
              <button 
                onClick={() => setShowCodingInterface(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-auto">
              {/* Code editor would go here */}
              <pre className="text-gray-800 dark:text-gray-200">// Your code here</pre>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button 
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                onClick={() => setShowCodingInterface(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white">
                Run Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputArea;