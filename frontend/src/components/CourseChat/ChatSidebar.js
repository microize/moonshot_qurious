// src/components/CourseChat/ChatSidebar.js
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import {
    History, Award, ChevronRight, ChevronLeft, MessageSquare,
    CheckCircle, Clock, Play
} from 'lucide-react';

// Helper function (copied from main file as it's used here)
// Ideally, move helpers to a separate utils file and import
const formatDuration = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Sidebar component for CourseChat.
 * Displays chat history or course progress.
 */
const ChatSidebar = ({
    chatHistory,
    activeTool,
    onSelectTool,
    onSelectChat,
    isCollapsed,
    toggleSidebar, // Renamed from toggleSidebarCollapse for clarity in props
    completedVideos,
    courseVideos,
    currentVideoId
}) => {
    // Define tools available in the sidebar
    const tools = [
        { id: 'history', label: 'Chat History', icon: History },
        { id: 'progress', label: 'Course Progress', icon: Award },
    ];

    // Find the video object that corresponds to the currentVideoId
    const currentVideoPlaying = courseVideos.find(v => v.id === currentVideoId);

    return (
        <aside className={`flex flex-col border-r border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'} flex-shrink-0`}>
            {/* Sidebar Header */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between h-[65px]"> {/* Match header height */}
                {!isCollapsed && <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Learning Tools</span>}
                <button
                    onClick={toggleSidebar} // Use the passed toggle function
                    className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Tool Selection */}
            <nav className="p-2 space-y-1 border-b border-gray-200 dark:border-gray-700/50">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => onSelectTool(tool.id)}
                        className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeTool === tool.id
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                        title={tool.label}
                    >
                        <tool.icon size={isCollapsed ? 20 : 16} className={!isCollapsed ? 'mr-2' : ''} />
                        {!isCollapsed && <span>{tool.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Content Area (History or Progress) */}
            <div className="flex-1 overflow-y-auto p-2">
                {/* Chat History View */}
                {activeTool === 'history' && (
                    <div className="space-y-2">
                        {!isCollapsed && <h3 className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 px-2 mb-2">Recent Chats</h3>}
                        {chatHistory.map(chat => (
                            <button
                                key={chat.id}
                                onClick={() => onSelectChat(chat.id)}
                                className={`w-full p-2 rounded-md text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${isCollapsed ? 'h-10 flex items-center justify-center' : ''}`}
                                title={chat.title}
                            >
                                {isCollapsed ? (
                                    <MessageSquare size={18} className="text-gray-500 dark:text-gray-400" />
                                ) : (
                                    <>
                                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{chat.title}</div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{chat.preview}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{chat.date}</p>
                                    </>
                                )}
                            </button>
                        ))}
                        {chatHistory.length === 0 && !isCollapsed && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 px-2">No chat history yet.</p>
                        )}
                    </div>
                )}

                {/* Course Progress View */}
                {activeTool === 'progress' && (
                     <div className="space-y-2">
                        {!isCollapsed && <h3 className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 px-2 mb-2">Video Progress</h3>}
                        {/* Optionally show current video playing */}
                         {!isCollapsed && currentVideoPlaying && (
                            <div className="px-2 py-1 mb-2 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Now Playing:</p>
                                <p className="text-sm font-medium text-amber-700 dark:text-amber-300 truncate">{currentVideoPlaying.title}</p>
                            </div>
                        )}
                        {courseVideos.map((video, index) => (
                             <div
                                key={video.id}
                                className={`flex items-center p-2 rounded-md ${isCollapsed ? 'justify-center' : ''} ${currentVideoId === video.id ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                                title={video.title}
                            >
                                <div className={`flex-shrink-0 ${isCollapsed ? '' : 'mr-2'}`}>
                                    {completedVideos.includes(video.id) ? (
                                        <CheckCircle size={isCollapsed ? 20 : 16} className="text-green-500" />
                                    ) : (
                                        // Show play icon if it's the current video, clock otherwise
                                        currentVideoId === video.id ?
                                        <Play size={isCollapsed ? 20 : 16} className="text-amber-500" />
                                        : <Clock size={isCollapsed ? 20 : 16} className="text-gray-400 dark:text-gray-500" />
                                    )}
                                </div>
                                {!isCollapsed && (
                                     <div className="flex-1 overflow-hidden">
                                        <span className={`text-sm truncate ${completedVideos.includes(video.id) ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'} ${currentVideoId === video.id ? 'font-semibold text-amber-700 dark:text-amber-300' : ''}`}>
                                            {index + 1}. {video.title}
                                        </span>
                                         <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">({formatDuration(video.duration)})</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};

// Define PropTypes for the component
ChatSidebar.propTypes = {
    chatHistory: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string,
        preview: PropTypes.string,
    })).isRequired,
    activeTool: PropTypes.string.isRequired,
    onSelectTool: PropTypes.func.isRequired,
    onSelectChat: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    completedVideos: PropTypes.arrayOf(PropTypes.number).isRequired,
    courseVideos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        duration: PropTypes.number,
        // Add other video properties if needed for validation
    })).isRequired,
    currentVideoId: PropTypes.number, // Can be null if no video is playing
};


export default ChatSidebar;
