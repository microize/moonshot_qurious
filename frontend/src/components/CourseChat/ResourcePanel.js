// src/components/CourseChat/ResourcePanel.js
import React from 'react';
import { X } from 'lucide-react';

const ResourcePanel = ({ setTranscriptVisible }) => {
  return (
    <aside className="w-80 lg:w-96 border-l border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 flex flex-col flex-shrink-0 overflow-y-auto p-4 transition-all duration-300 ease-in-out" aria-label="Transcript and Resources Panel">
      {/* Panel Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-base text-gray-800 dark:text-gray-200">Transcript & Resources</h3>
        <button onClick={() => setTranscriptVisible(false)} className="btn-icon" title="Close Panel">
          <X size={18} />
        </button>
      </div>
      
      {/* Panel Content */}
      <div className="flex-1 text-sm text-gray-600 dark:text-gray-400 space-y-4">
        {/* Transcript Section */}
        <section>
          <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Transcript</h4>
          <p className="italic text-xs">Transcript for the current video will appear here. It will be interactive and scrollable.</p>
          <div className="mt-2 space-y-1 text-xs max-h-60 overflow-y-auto pr-2">
            {/* Example transcript content would go here */}
          </div>
        </section>
        
        <hr className="my-4 border-gray-200 dark:border-gray-600"/>
        
        {/* Resources Section */}
        <section>
          <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Resources</h4>
          <p className="italic text-xs">Related links, code snippets, and downloads for the current topic will appear here.</p>
          <ul className="mt-2 space-y-1 text-xs list-disc list-inside">
            {/* Example resources would go here */}
          </ul>
        </section>
      </div>
    </aside>
  );
};

export default ResourcePanel;