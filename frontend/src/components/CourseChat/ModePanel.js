// src/components/CourseChat/ModePanel.js
// Learning/clarity mode selection panel
import React from 'react';
import { X, Check, GraduationCap, BookOpen, Brain, Compass, Zap, BookText, RotateCcw, Award, Code } from 'lucide-react';
import { CLARITY_LEVELS, LEARNING_MODES } from './utils/constants';

/**
 * Component for selecting learning modes and clarity levels
 * 
 * @param {Object} props - Component props
 * @param {string} props.activeModePanel - Currently active panel type ('clarity' or 'learning' or null)
 * @param {Function} props.setActiveModePanel - Function to set active panel
 * @param {string} props.selectedClarity - Currently selected clarity level
 * @param {Function} props.handleClarityChange - Function to change clarity level
 * @param {string} props.selectedLearningMode - Currently selected learning mode
 * @param {Function} props.handleLearningModeChange - Function to change learning mode
 * @returns {JSX.Element|null} Rendered component or null if no panel is active
 */
const ModelPanel = ({
  activeModePanel,
  setActiveModePanel,
  selectedClarity,
  handleClarityChange,
  selectedLearningMode,
  handleLearningModeChange
}) => {
  // If no panel is active, don't render anything
  if (!activeModePanel) return null;

  // Simple utility function to combine class names
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  
  return (
    <div className="max-w-4xl mx-auto mb-2 p-3 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200 animate-fade-in-fast">
      {/* Panel Header */}
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">
          {activeModePanel === 'clarity' ? 'Adjust Explanation Clarity' : 'Select Learning Pace'}
        </label>
        <button 
          onClick={() => setActiveModePanel(null)} 
          className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500" 
          title="Close Panel"
          aria-label="Close Panel"
        >
          <X size={16} />
        </button>
      </div>
      
      {/* Mode Buttons */}
      <div className="flex gap-2 flex-wrap">
        {/* Clarity Options */}
        {activeModePanel === 'clarity' && [
          { id: CLARITY_LEVELS.BASIC, label: "Basic", icon: GraduationCap },
          { id: CLARITY_LEVELS.INTERMEDIATE, label: "Intermediate", icon: BookOpen },
          { id: CLARITY_LEVELS.ADVANCED, label: "Advanced", icon: Brain }
        ].map(mode => (
          <button
            key={mode.id}
            onClick={() => handleClarityChange(mode.id)}
            className={classNames(
              "px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group",
              selectedClarity === mode.id 
                ? "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 shadow-md dark:shadow-lg shadow-amber-500/10 dark:shadow-amber-400/10" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-md"
            )}
            aria-pressed={selectedClarity === mode.id}
            title={`${mode.label} clarity level`}
          >
            <div className="flex items-center w-full">
              <mode.icon 
                size={18} 
                className={classNames(
                  "transition-all duration-200 flex-shrink-0 mr-3",
                  selectedClarity === mode.id 
                    ? "text-amber-600 dark:text-amber-400 drop-shadow-md" 
                    : "text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                )}
                aria-hidden="true"
              />
              <span className="flex-grow text-left">{mode.label}</span>

            </div>
          </button>
        ))}
        
        {/* Learning Mode Options */}
        {activeModePanel === 'learning' && [
          { id: LEARNING_MODES.NORMAL, label: "Standard", icon: Compass },
          { id: LEARNING_MODES.EXPRESS, label: "Accelerated", icon: Zap },
          { id: LEARNING_MODES.COMPREHENSIVE, label: "Comprehensive", icon: BookText },
          { id: LEARNING_MODES.REVIEW, label: "Review", icon: RotateCcw },
          { id: LEARNING_MODES.ASSESSMENT, label: "Assessment", icon: Award },
          { id: LEARNING_MODES.PRACTICAL, label: "Practical", icon: Code }
        ].map(mode => (
          <button
            key={mode.id}
            onClick={() => handleLearningModeChange(mode.id)}
            className={classNames(
              "px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium group",
              selectedLearningMode === mode.id 
                ? "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 shadow-md dark:shadow-lg shadow-amber-500/10 dark:shadow-amber-400/10" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:shadow-md"
            )}
            aria-pressed={selectedLearningMode === mode.id}
            title={`${mode.label} learning mode`}
          >
            <div className="flex items-center w-full">
              <mode.icon 
                size={18} 
                className={classNames(
                  "transition-all duration-200 flex-shrink-0 mr-3",
                  selectedLearningMode === mode.id 
                    ? "text-amber-600 dark:text-amber-400 drop-shadow-md" 
                    : "text-gray-500 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                )}
                aria-hidden="true"
              />
              <span className="flex-grow text-left">{mode.label}</span>

            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModelPanel;