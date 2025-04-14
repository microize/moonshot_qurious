// src/components/CourseChat/TranscriptPanel.js
// Right side transcript/resources panel
import React from 'react';
import { X } from 'lucide-react';

/**
 * Component for the transcript and resources sidebar
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Whether the panel is visible
 * @param {Function} props.onClose - Function to close the panel
 * @returns {JSX.Element|null} Rendered component or null if not visible
 */
const TranscriptPanel = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <aside className="w-80 lg:w-96 border-l border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 flex flex-col flex-shrink-0 overflow-y-auto p-4 transition-all duration-300 ease-in-out" aria-label="Transcript and Resources Panel">
      {/* Panel Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-base text-gray-800 dark:text-gray-200">
          Transcript & Resources
        </h3>
        <button onClick={onClose} className="btn-icon" title="Close Panel">
          <X size={18} />
        </button>
      </div>
      
      {/* Panel Content */}
      <div className="flex-1 text-sm text-gray-600 dark:text-gray-400 space-y-4">
        {/* Transcript Component */}
        <section>
          <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Transcript</h4>
          <p className="italic text-xs">Transcript for the current video will appear here. It will be interactive and scrollable.</p>
          {/* Placeholder for transcript lines */}
          <div className="mt-2 space-y-1 text-xs max-h-60 overflow-y-auto pr-2">
            {/* Example Lines */}
            <p><span className="font-mono text-gray-400 mr-2">00:05</span> Welcome to the introduction...</p>
            <p className="bg-amber-100/50 dark:bg-amber-900/30 p-1 rounded">
              <span className="font-mono text-gray-400 mr-2">00:12</span> 
              The core concept we'll discuss...
            </p>
            <p><span className="font-mono text-gray-400 mr-2">00:20</span> Let's begin with the architecture...</p>
            <p><span className="font-mono text-gray-400 mr-2">00:32</span> The transformer model was introduced in...</p>
            <p><span className="font-mono text-gray-400 mr-2">00:45</span> Self-attention is a key innovation...</p>
          </div>
        </section>
        
        <hr className="my-4 border-gray-200 dark:border-gray-600"/>
        
        {/* Resources Component */}
        <section>
          <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Resources</h4>
          <p className="italic text-xs">Related links, code snippets, and downloads for the current topic will appear here.</p>
          {/* Placeholder for resources */}
          <ul className="mt-2 space-y-1 text-xs list-disc list-inside">
            <li><a href="#" className="text-amber-600 hover:underline">Attention Is All You Need (paper)</a></li>
            <li><a href="#" className="text-amber-600 hover:underline">Transformer Architecture Diagram</a></li>
            <li><a href="#" className="text-amber-600 hover:underline">Code Snippet: Self-Attention Implementation</a></li>
            <li><a href="#" className="text-amber-600 hover:underline">Additional Reading: Transformers Explained</a></li>
          </ul>
        </section>
        
        <hr className="my-4 border-gray-200 dark:border-gray-600"/>
        
        {/* Quiz Section */}
        <section>
          <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Quick Check</h4>
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              What is the key innovation in the transformer architecture?
            </p>
            <div className="space-y-1">
              <div className="flex items-center">
                <input type="radio" id="answer1" name="quiz" className="mr-2" />
                <label htmlFor="answer1" className="text-xs">Self-attention mechanism</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="answer2" name="quiz" className="mr-2" />
                <label htmlFor="answer2" className="text-xs">Convolutional layers</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="answer3" name="quiz" className="mr-2" />
                <label htmlFor="answer3" className="text-xs">Recurrent connections</label>
              </div>
            </div>
            <button className="w-full mt-3 text-xs bg-amber-500 hover:bg-amber-600 text-white py-1 px-2 rounded">
              Check Answer
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default TranscriptPanel;