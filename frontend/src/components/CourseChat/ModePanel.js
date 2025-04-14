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
const ModePanel = ({
  activeModePanel,
  setActiveModePanel,
  selectedClarity,
  handleClarityChange,
  selectedLearningMode,
  handleLearningModeChange
}) => {
  // If no panel is active, don't render anything
  if (!activeModePanel) return null;

  return (
    <div className="max-w-4xl mx-auto mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 animate-fade-in-fast">
      {/* Panel Header */}
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">
          {activeModePanel === 'clarity' ? 'Adjust Explanation Clarity' : 'Select Learning Pace'}
        </label>
        <button 
          onClick={() => setActiveModePanel(null)} 
          className="btn-icon-sm" 
          title="Close Panel"
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
            className={`btn-mode ${selectedClarity === mode.id ? 'btn-mode-active' : 'btn-mode-inactive'}`}
            aria-pressed={selectedClarity === mode.id}
          >
            <mode.icon size={14} /> {mode.label} 
            {selectedClarity === mode.id && <Check size={12} className="ml-auto pl-1" />}
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
            className={`btn-mode ${selectedLearningMode === mode.id ? 'btn-mode-active' : 'btn-mode-inactive'}`}
            aria-pressed={selectedLearningMode === mode.id}
          >
            <mode.icon size={14} /> {mode.label} 
            {selectedLearningMode === mode.id && <Check size={12} className="ml-auto pl-1" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModePanel;