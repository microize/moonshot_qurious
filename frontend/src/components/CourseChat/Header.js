// src/components/CourseChat/Header.js
// Course header component
import React from 'react';
import { BookOpen, Search, FileText, Info, MessageSquare } from 'lucide-react';

/**
 * Component for the course header with title and actions
 * 
 * @param {Object} props - Component props
 * @param {string} props.courseTitle - Title of the course
 * @param {string} props.moduleInfo - Module information text
 * @param {string} props.learningMode - Current learning mode
 * @param {string} props.clarityLevel - Current clarity level
 * @param {Function} props.onToggleTranscript - Function to toggle transcript panel
 * @param {boolean} props.transcriptVisible - Whether transcript panel is visible
 * @returns {JSX.Element} Rendered component
 */
const Header = ({ 
  courseTitle = "Generative AI for Developers", 
  moduleInfo = "Module 1 of 4", 
  learningMode = "normal", 
  clarityLevel = "intermediate", 
  onToggleTranscript, 
  transcriptVisible 
}) => {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side: Course Information */}
          <div className="flex items-center gap-3">
            {/* Course Icon */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
              <BookOpen size={20} />
            </div>
            
            {/* Course Title and Status */}
            <div>
              <h1 className="text-base sm:text-lg font-semibold tracking-tight leading-tight">
                {courseTitle}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                {moduleInfo} • {learningMode} Mode • {clarityLevel} Clarity
              </p>
            </div>
          </div>
          
          {/* Right Side: Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Search Button (Placeholder) */}
            <button className="btn-icon" title="Search History (coming soon)">
              <Search size={18} />
            </button>
            
            {/* Transcript/Resources Toggle Button */}
            <button
              className={`btn-icon ${
                transcriptVisible 
                  ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400' 
                  : ''
              }`}
              onClick={onToggleTranscript}
              title={transcriptVisible ? "Hide Transcript/Resources" : "Show Transcript/Resources"}
              aria-pressed={transcriptVisible}
            >
              <FileText size={18} />
            </button>
            
            {/* Course Info Button (Placeholder) */}
            <button className="btn-icon" title="Course Info (coming soon)">
              <Info size={18} />
            </button>
            
            {/* Ask Question Button (Focuses Input) */}
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md transition-colors shadow-sm flex items-center text-sm font-medium"
              onClick={() => {
                // Dispatch a custom event to focus the input field
                document.dispatchEvent(new CustomEvent('focus-chat-input'));
              }}
            >
              <MessageSquare size={16} className="mr-1 sm:mr-1.5" />
              <span className="hidden sm:inline">Ask Question</span> {/* Hide text on small screens */}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;