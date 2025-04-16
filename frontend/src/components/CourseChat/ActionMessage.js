// src/components/CourseChat/ActionMessage.js
import React from 'react';
import { CornerUpLeft, ChevronRight } from 'lucide-react';
import { ACTION_TYPES } from './utils/constants';

/**
 * Component for rendering action messages like "Continue Learning"
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Action message data
 * @param {Function} props.onContinueLearning - Callback for continue learning action
 * @returns {JSX.Element|null} Rendered component or null if action type not supported
 */
const ActionMessage = ({ message, onContinueLearning }) => {
  // Only render supported action types
  if (!message.actionType) return null;

  // Component for Continue Learning action
  const ContinueLearningAction = () => (
    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-dashed border-amber-200 dark:border-amber-800/50 mt-1 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CornerUpLeft size={18} className="text-amber-500 dark:text-amber-400 mr-3 flex-shrink-0" />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Ready to continue with the video?
          </p>
        </div>
        <button
          className="px-3 py-1.5 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg flex items-center transition-colors"
          onClick={() => onContinueLearning(message.relatedToVideo)}
        >
          Continue Learning
          <ChevronRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );

  // Render different components based on action type
  switch (message.actionType) {
    case ACTION_TYPES.CONTINUE_LEARNING:
      return <ContinueLearningAction />;
    default:
      return null;
  }
};

export default ActionMessage;