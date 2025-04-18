// src/components/CourseChat/InputArea.js
import React, { useState, useEffect } from 'react';
import { 
  SendHorizontal, Mic, X, HelpCircle, Code, 
  Settings, Lightbulb, BookOpen, Rainbow
} from 'lucide-react';
import { formatVideoPosition } from './utils/formatters';
import { CLARITY_LEVELS, LEARNING_MODES } from './utils/constants';
import ModePanel from './ModePanel';

/**
 * Enhanced InputArea component with additional functionality
 * 
 * @param {Object} props - Component props
 * @param {string} props.inputValue - Current input value
 * @param {Function} props.setInputValue - Function to update input value
 * @param {Function} props.handleSendMessage - Function to send a message
 * @param {boolean} props.isLoading - Whether bot is currently typing
 * @param {Object} props.doubtContext - Current doubt context if any
 * @param {boolean} props.isAskingDoubt - Whether user is asking a doubt
 * @param {Function} props.cancelDoubt - Function to cancel doubt
 * @param {React.RefObject} props.inputRef - Reference to the input element
 * @param {string} props.clarityLevel - Current clarity level
 * @param {Function} props.setClarityLevel - Function to update clarity level
 * @param {string} props.learningMode - Current learning mode
 * @param {Function} props.setLearningMode - Function to update learning mode
 * @returns {JSX.Element} Rendered component
 */
const InputArea = ({ 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  isLoading, 
  doubtContext, 
  isAskingDoubt, 
  cancelDoubt,
  inputRef,
  clarityLevel,
  setClarityLevel,
  learningMode,
  setLearningMode
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showCodingInterface, setShowCodingInterface] = useState(false);
  const [activeModePanel, setActiveModePanel] = useState(null);
  
  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  // Handle document events to focus input when requested
  useEffect(() => {
    const handleFocusEvent = () => {
      inputRef.current?.focus();
    };
    
    document.addEventListener('focus-chat-input', handleFocusEvent);
    return () => {
      document.removeEventListener('focus-chat-input', handleFocusEvent);
    };
  }, [inputRef]);

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
  };

  // Handle voice input (placeholder functionality)
  const handleVoiceInput = () => {
    alert("Voice input functionality is coming soon!");
  };

  // Handle toggling mode panels
  const toggleModePanel = (panel) => {
    setActiveModePanel(prev => prev === panel ? null : panel);
  };

  // Render the Doubt Context banner when applicable
  const renderDoubtContextBanner = () => {
    if (!isAskingDoubt || !doubtContext) return null;

    return (
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-t-lg px-4 py-2.5 text-sm text-amber-800 dark:text-amber-200 flex justify-between items-center border-b border-amber-200 dark:border-amber-700/50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-amber-200 dark:bg-amber-700 rounded-full text-amber-700 dark:text-amber-200">
            <HelpCircle size={14} />
          </span>
          <span>
            Asking about <span className="font-medium text-amber-900 dark:text-amber-100">"{doubtContext.videoTitle}"</span> at <span className="font-medium text-amber-900 dark:text-amber-100">{formatVideoPosition(doubtContext.timestamp)}</span>
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
    );
  };

  // Render the coding interface modal
  const renderCodingInterfaceModal = () => {
    if (!showCodingInterface) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-3/4 h-3/4 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Coding Interface</h2>
            <button 
              onClick={() => setShowCodingInterface(false)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              title="Close coding interface"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-auto">
            <pre className="text-gray-800 dark:text-gray-200 font-mono">// Your code here</pre>
          </div>
          <div className="mt-4 flex justify-end gap-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setShowCodingInterface(false)}
              title="Cancel and close the coding interface"
            >
              <X size={16} />
              <span>Cancel</span>
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md dark:shadow-lg hover:shadow-lg transition-all"
              title="Execute the code and see results"
            >
              <SendHorizontal size={16} className="text-amber-600 dark:text-amber-400" />
              <span>Run Code</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render clarity level panel
  const renderClarityPanel = () => {
    if (activeModePanel !== 'clarity') return null;
    
    // We're not going to use this function anymore as we'll rely on ModePanel component
    return null;
  };

  // Render learning mode panel
  const renderLearningModePanel = () => {
    if (activeModePanel !== 'learning') return null;
    
    // We're not going to use this function anymore as we'll rely on ModePanel component
    return null;
  };
  
  return (
    <div className="w-full relative">
      {/* Doubt Context Indicator (Shown above input when asking a doubt) */}
      {renderDoubtContextBanner()}
      
      {/* Input Form */}
      <form 
        onSubmit={handleSubmit} 
        className={`flex items-center gap-3 bg-white dark:bg-gray-900 p-2 ${isAskingDoubt ? 'rounded-b-lg' : 'rounded-lg'} dark:shadow-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all duration-200`}
      >
          {/* Mode Toggle Buttons */}
          <button
            type="button"
            onClick={() => toggleModePanel('clarity')}
            className={`p-1.5 rounded-lg flex items-center justify-center transition-colors ${
              activeModePanel === 'clarity' 
                ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md dark:shadow-lg dark:shadow-gray-800/50' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
            }`}
            aria-expanded={activeModePanel === 'clarity'}
            title="Adjust explanation clarity"
          >
            <Rainbow size={16} className={`transition-all duration-200 ${
              activeModePanel === 'clarity' 
                ? 'text-amber-600 dark:text-amber-400 drop-shadow-md' 
                : 'text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400'
            }`} />
          </button>
          
          <button
            type="button"
            onClick={() => toggleModePanel('learning')}
            className={`p-1.5 rounded-lg flex items-center justify-center transition-colors ${
              activeModePanel === 'learning' 
                ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md dark:shadow-lg dark:shadow-gray-800/50' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
            }`}
            aria-expanded={activeModePanel === 'learning'}
            title="Change learning mode"
          >
            <BookOpen size={16} className={`transition-all duration-200 ${
              activeModePanel === 'learning' 
                ? 'text-amber-600 dark:text-amber-400 drop-shadow-md' 
                : 'text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400'
            }`} />
          </button>
          
        {/* Text Input Field */}
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder={isAskingDoubt 
              ? "Ready to level up your skills? Let's start Learning!" 
              : "Ask anything or type 'next video'..."}
            className={`w-full p-3 px-4 rounded-lg ${
              isAskingDoubt 
                ? 'bg-gray-50 dark:bg-gray-800' 
                : 'bg-gray-50 dark:bg-gray-800'
            } placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white transition-all duration-200 resize-none overflow-y-auto`}
            disabled={isLoading} // Disable input while bot is typing
            aria-label="Chat input"
            rows={1}
            style={{ 
              minHeight: '45px', 
              maxHeight: '180px' 
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (inputValue.trim() && !isLoading) {
                  handleSendMessage(e);
                }
              }
            }}
          />
          
          {/* Character Count (shows when typing) */}
          {/* {inputValue.length > 0 && (
            <div className="absolute right-3 bottom-3 text-xs text-gray-400 dark:text-gray-500 font-mono pointer-events-none">
              {inputValue.length}
            </div>
          )} */}
        </div>

                  {/* Coding Interface Button */}
                  <button 
            type="button" 
            onClick={handleOpenCodingInterface}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:shadow-md group" 
            title="Open coding interface" 
            disabled={isLoading}
          >
            <Code size={16} className="text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-transform group-hover:scale-110" />
          </button>
          
          {/* Voice Input Button */}
          <button 
            type="button" 
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:shadow-md group" 
            title="Voice Input (coming soon)" 
            disabled={isLoading}
            onClick={handleVoiceInput}
          >
            <Mic size={16} className="text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-transform group-hover:scale-110" />
          </button>
        
        
        {/* Send Button */}
        <button
          type="submit"
          className={`p-2.5 rounded-lg transition-all duration-300 ${
            inputValue.trim() && !isLoading
              ? 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md dark:shadow-lg hover:shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
          disabled={!inputValue.trim() || isLoading}
          aria-label="Send message"
          title="Send message"
        >
          <SendHorizontal size={18} className={`${
            inputValue.trim() && !isLoading 
              ? 'text-amber-600 dark:text-amber-400 drop-shadow-md transform group-hover:translate-x-0.5 transition-transform' 
              : ''
          }`} />
        </button>
      </form>

      {/* Mode Panels - We use the ModePanel component instead */}
      {activeModePanel && (
        <ModePanel
          activeModePanel={activeModePanel}
          setActiveModePanel={setActiveModePanel}
          selectedClarity={clarityLevel}
          handleClarityChange={setClarityLevel}
          selectedLearningMode={learningMode}
          handleLearningModeChange={setLearningMode}
        />
      )}

      {/* Coding Interface Modal */}
      {renderCodingInterfaceModal()}
    </div>
  );
};

export default InputArea;