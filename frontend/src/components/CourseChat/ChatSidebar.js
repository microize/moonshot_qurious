// src/components/CourseChat/ChatSidebar.js
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  History, Award, ChevronRight, ChevronLeft, MessageSquare,
  CheckCircle, Clock, Play, Search, XCircle, Filter, Book,
  PlusCircle, ChevronDown, AlertCircle, Bookmark
} from 'lucide-react';

// Simple utility function to combine class names
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Helper function for formatting duration with improved readability
const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Sidebar component for CourseChat.
 * Displays chat history, course progress, or learning IDs with improved usability.
 */
const ChatSidebar = ({
  chatHistory,
  activeTool,
  onSelectTool,
  onSelectChat,
  isCollapsed,
  toggleSidebar,
  completedVideos,
  courseVideos,
  currentVideoId,
  onCreateNewChat, // For creating a new chat
  onSaveChat, // Added prop for saving chats
}) => {
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [progressFilter, setProgressFilter] = useState('all'); // 'all', 'completed', 'incomplete'
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [newNoteText, setNewNoteText] = useState(''); // Added state for note input
  const searchInputRef = useRef(null);
  const filterDropdownRef = useRef(null);
  
  // Section expand/collapse states for better organization
  const [expandedSections, setExpandedSections] = useState({
    recentChats: true,
    savedChats: true,
    moduleProgress: true
  });

  // Define tools available in the sidebar with improved labels
  const tools = useMemo(() => [
    { id: 'history', label: 'Chats', icon: MessageSquare, shortcut: 'Alt+H' },
    { id: 'progress', label: 'Progress', icon: Award, shortcut: 'Alt+P' },
    { id: 'learning', label: 'Notes', icon: Book, shortcut: 'Alt+L' },
  ], []);

  // Group course videos by module for better organization - memoized
  const courseModules = useMemo(() => {
    return courseVideos.reduce((acc, video) => {
      const moduleId = video.moduleId || 'default';
      if (!acc[moduleId]) {
        acc[moduleId] = {
          id: moduleId,
          title: video.moduleName || 'Course Content',
          videos: []
        };
      }
      acc[moduleId].videos.push(video);
      return acc;
    }, {});
  }, [courseVideos]);
  
  // Find the currently playing video - memoized
  const currentVideoPlaying = useMemo(() => 
    courseVideos.find(v => v.id === currentVideoId),
  [courseVideos, currentVideoId]);
  
  // Filter chat history based on search query - memoized
  const filteredChatHistory = useMemo(() => 
    chatHistory.filter(chat => 
      searchQuery === '' || 
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chat.preview && chat.preview.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  [chatHistory, searchQuery]);
  
  // Group chat history into recent and saved - memoized
  const recentChats = useMemo(() => 
    filteredChatHistory.filter(chat => !chat.isSaved),
  [filteredChatHistory]);
  
  const savedChats = useMemo(() => 
    filteredChatHistory.filter(chat => chat.isSaved),
  [filteredChatHistory]);
  
  // Filter course videos based on completion status
  const getFilteredVideos = useCallback(() => {
    return courseVideos.filter(video => {
      if (progressFilter === 'all') return true;
      if (progressFilter === 'completed') return completedVideos.includes(video.id);
      if (progressFilter === 'incomplete') return !completedVideos.includes(video.id);
      return true;
    });
  }, [courseVideos, completedVideos, progressFilter]);
  
  const filteredCourseVideos = useMemo(() => getFilteredVideos(), 
    [getFilteredVideos]);
  
  // Clear search query function
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  }, []);

  // Toggle section expansion
  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);
  
  // Calculate course completion percentage and segment stats - memoized
  const courseStats = useMemo(() => {
    const completionPercentage = courseVideos.length > 0 
      ? Math.round((completedVideos.length / courseVideos.length) * 100)
      : 0;
      
    const totalDuration = courseVideos.reduce((sum, video) => sum + (video.duration || 0), 0);
    const completedDuration = courseVideos
      .filter(video => completedVideos.includes(video.id))
      .reduce((sum, video) => sum + (video.duration || 0), 0);
      
    return {
      completionPercentage,
      totalDuration,
      completedDuration
    };
  }, [courseVideos, completedVideos]);
  
  // Handle save note action
  const handleSaveNote = useCallback(() => {
    if (newNoteText.trim()) {
      // Here you would implement the actual note saving logic
      console.log('Saving note:', newNoteText);
      setNewNoteText('');
    }
  }, [newNoteText]);
  
  // Handle keyboard shortcuts with improved focus management
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only process shortcuts when not typing in an input or textarea
      const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
      
      if (e.altKey && !isTyping) {
        switch (e.key) {
          case 'h': // Chat History
            onSelectTool('history');
            break;
          case 'p': // Course Progress
            onSelectTool('progress');
            break;
          case 'l': // Learning IDs
            onSelectTool('learning');
            break;
          case 'f': // Focus search
            if (!isCollapsed) {
              setTimeout(() => searchInputRef.current?.focus(), 100);
            }
            break;
          case 'n': // New chat (new shortcut)
            if (onCreateNewChat) onCreateNewChat();
            break;
          default:
            break;
        }
      }
      
      // Escape key to close search or filter dropdown
      if (e.key === 'Escape') {
        if (showFilterDropdown) {
          setShowFilterDropdown(false);
        } else if (document.activeElement === searchInputRef.current) {
          searchInputRef.current.blur();
          if (searchQuery) setSearchQuery('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectTool, isCollapsed, onCreateNewChat, searchQuery, showFilterDropdown]);
  
  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Render chat items to improve code readability
  const renderChatItem = useCallback((chat, isSaved = false) => (
    <button
      key={chat.id}
      onClick={() => onSelectChat(chat.id)}
      className="w-full flex items-start px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-md group"
      aria-label={`Chat: ${chat.title}`}
    >
      {isSaved ? (
        <Bookmark 
          size={16} 
          className="mt-0.5 mr-2.5 text-amber-500 dark:text-amber-400 flex-shrink-0" 
        />
      ) : (
        <MessageSquare 
          size={16} 
          className="mt-0.5 mr-2.5 text-gray-500 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 flex-shrink-0" 
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-amber-700 dark:group-hover:text-amber-300">
          {chat.title}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
          {chat.preview}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {chat.date}
        </p>
      </div>
      {!isSaved && (
        <div className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              if (onSaveChat) onSaveChat(chat.id);
            }}
            className="p-1 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
            title="Save chat"
            aria-label="Save chat"
          >
            <Bookmark size={14} />
          </button>
        </div>
      )}
    </button>
  ), [onSelectChat, onSaveChat]);

  // Render video item to improve code readability
  const renderVideoItem = useCallback((video, index, moduleId) => {
    const isCompleted = completedVideos.includes(video.id);
    const isCurrentlyPlaying = currentVideoId === video.id;
    
    return (
      <div
        key={video.id}
        className={`flex items-start px-3 py-2 rounded-lg transition-all duration-200 ${
          isCurrentlyPlaying
            ? 'bg-gray-50 dark:bg-gray-800 shadow-sm' 
            : 'hover:bg-gray-50 dark:hover:bg-gray-800/70 hover:shadow-md'
        }`}
      >
        <div className="flex-shrink-0 mt-0.5 mr-2.5">
          {isCompleted ? (
            <CheckCircle
              size={16}
              className="text-green-500 drop-shadow-sm"
              aria-hidden="true"
            />
          ) : isCurrentlyPlaying ? (
            <Play
              size={16}
              className="text-amber-600 dark:text-amber-400 drop-shadow-sm"
              aria-hidden="true"
            />
          ) : (
            <Clock
              size={16}
              className="text-gray-400 dark:text-gray-500"
              aria-hidden="true"
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className={classNames(
            "text-sm truncate",
            isCompleted ? 'text-green-600 dark:text-green-400' : '',
            isCurrentlyPlaying ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
          )}>
            {index + 1}. {video.title}
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {formatDuration(video.duration || 0)}
            </span>
            {video.isNew && (
              <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }, [completedVideos, currentVideoId]);

  return (
    <>
      <div
        id="chat-sidebar-menu"
        role="complementary"
        aria-label="Course Learning Tools"
        className={`h-full shadow-xl transition-all duration-300 ease-in-out
        border-r border-gray-200 dark:border-gray-700/50 
        ${isCollapsed 
          ? 'w-6 bg-gradient-to-b from-amber-500 to-amber-700 dark:from-amber-600 dark:to-amber-900' 
          : 'w-72 bg-white dark:bg-gray-900'} 
        flex-shrink-0 relative`}
      >
        <div className="h-full">
          {/* Horizontal Tab Navigation - Expanded state */}
          {!isCollapsed && (
            <nav className="flex-1 flex border-b border-gray-200 dark:border-gray-700/50">
              <div className="flex items-center w-full">
                <div className="flex-1 flex">
                  {tools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => onSelectTool(tool.id)}
                      className={`flex items-center px-3 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 relative ${
                        activeTool === tool.id
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                      aria-pressed={activeTool === tool.id}
                      title={`${tool.label} (${tool.shortcut})`}
                    >
                      <tool.icon
                        size={20}
                        className={`mr-2 transition-all duration-300 ${
                          activeTool === tool.id ? 'text-amber-600 dark:text-amber-400 drop-shadow-md' : 'text-gray-500 dark:text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium transition-all duration-200">
                        {tool.label}
                      </span>
                      {activeTool === tool.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 dark:bg-amber-400 transform transition-transform duration-300 scale-x-100"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          )}
          
          {/* Always visible persistent search bar - Expanded state */}
          {!isCollapsed && (
            <div className="px-3 py-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                </div>
                <input
                  ref={searchInputRef}
                  id="chat-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    activeTool === 'history' 
                      ? "Search chats..." 
                      : activeTool === 'progress' 
                        ? "Search videos..." 
                        : "Search notes..."
                  }
                  className="w-full px-3 py-2.5 pl-9 pr-9 text-sm rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800 dark:text-gray-200 transition-all duration-300"
                  aria-label="Search"
                />
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Clear search"
                  >
                    <XCircle size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* New Chat button - Expanded State */}
          {activeTool === 'history' && !isCollapsed && (
            <div className="px-3 py-3">
              <button
                onClick={onCreateNewChat}
                className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Start new chat"
                title="Start new chat (Alt+N)"
              >
                <PlusCircle size={16} className="mr-2" aria-hidden="true" />
                <span className="text-sm font-medium">New Chat</span>
              </button>
            </div>
          )}

          {/* Content Area with improved scrolling behavior */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent h-[calc(100%-12rem)]">
            {/* Chat History View with improved organization */}
            {activeTool === 'history' && (
              <div className="space-y-1 p-2">
                {/* Recent Chats Section */}
                {!isCollapsed && recentChats.length > 0 && (
                  <div className="mb-3">
                    <div 
                      className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-all"
                      onClick={() => toggleSection('recentChats')}
                    >
                      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">
                        <ChevronDown 
                          size={14} 
                          className={`mr-1 transition-transform duration-200 ${expandedSections.recentChats ? '' : '-rotate-90'}`} 
                        />
                        Recent Chats ({recentChats.length})
                      </h3>
                    </div>
                    
                    {expandedSections.recentChats && (
                      <div className="mt-1 space-y-1 animate-fadeIn">
                        {recentChats.map(chat => renderChatItem(chat))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Saved Chats Section */}
                {!isCollapsed && savedChats.length > 0 && (
                  <div className="mb-3">
                    <div 
                      className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-all"
                      onClick={() => toggleSection('savedChats')}
                    >
                      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">
                        <ChevronDown 
                          size={14} 
                          className={`mr-1 transition-transform duration-200 ${expandedSections.savedChats ? '' : '-rotate-90'}`} 
                        />
                        Saved Chats ({savedChats.length})
                      </h3>
                    </div>
                    
                    {expandedSections.savedChats && (
                      <div className="mt-1 space-y-1 animate-fadeIn">
                        {savedChats.map(chat => renderChatItem(chat, true))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* No results message when search has no matches */}
                {searchQuery && filteredChatHistory.length === 0 && !isCollapsed && (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400 dark:text-gray-500 animate-fadeIn">
                    <p className="text-sm">No chats match your search</p>
                    <button 
                      onClick={clearSearch}
                      className="mt-2 text-xs text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
                
                {/* Empty state when no chat history */}
                {!searchQuery && chatHistory.length === 0 && !isCollapsed && (
                  <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400 dark:text-gray-500 animate-fadeIn">
                    <MessageSquare size={28} className="mb-3 opacity-70" />
                    <p className="text-sm font-medium">No chat history yet</p>
                    <p className="text-xs mt-1 max-w-xs">Start a new conversation to begin your learning journey</p>
                    <button
                      onClick={onCreateNewChat}
                      className="mt-4 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Start New Chat
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Course Progress View with improved organization */}
            {activeTool === 'progress' && (
              <div className="space-y-1.5 p-2">
                {/* Progress filter dropdown with improved UX */}
                {!isCollapsed && (
                  <div className="relative mb-3" ref={filterDropdownRef}>
                    <button 
                      className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      aria-haspopup="true"
                      aria-expanded={showFilterDropdown}
                    >
                      <div className="flex items-center">
                        <Filter size={14} className="mr-2 text-gray-500 dark:text-gray-400" />
                        <span>{progressFilter === 'all' ? 'All Videos' : 
                              progressFilter === 'completed' ? 'Completed Videos' : 
                              'Pending Videos'}</span>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {/* Filter dropdown menu */}
                    {showFilterDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 animate-fadeIn">
                        {['all', 'completed', 'incomplete'].map((filter) => (
                          <button
                            key={filter}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                              progressFilter === filter ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                            }`}
                            onClick={() => {
                              setProgressFilter(filter);
                              setShowFilterDropdown(false);
                            }}
                          >
                            {filter === 'all' ? 'All Videos' : 
                             filter === 'completed' ? 'Completed Videos' : 
                             'Pending Videos'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Progress summary with improved visualization */}
                {!isCollapsed && (
                  <div className="px-3 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-3 shadow-sm">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Course completion</span>
                      <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                        {courseStats.completionPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className="bg-amber-500 dark:bg-amber-400 h-2 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${courseStats.completionPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>{formatDuration(courseStats.completedDuration)} / {formatDuration(courseStats.totalDuration)}</span>
                      <span>{completedVideos.length} of {courseVideos.length} videos</span>
                    </div>
                  </div>
                )}

                {/* Currently playing video with improved visibility */}
                {!isCollapsed && currentVideoPlaying && (
                  <div className="px-4 py-3 mb-3 bg-amber-50 dark:bg-amber-900/20 border-l-2 border-amber-500 dark:border-amber-400 rounded-r-lg shadow-sm">
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1 flex items-center">
                      <Play size={12} className="mr-1" /> Now Playing
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {currentVideoPlaying.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDuration(currentVideoPlaying.duration || 0)}
                      </span>
                      <span className="text-xs text-amber-600 dark:text-amber-400">
                        {completedVideos.includes(currentVideoPlaying.id) ? 'Completed' : 'In progress'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Module-based organization of videos */}
                {!isCollapsed && Object.values(courseModules).length > 0 && (
                  <div className="space-y-2">
                    {Object.values(courseModules).map((module) => {
                      const moduleVideos = module.videos.filter(video => {
                        if (progressFilter === 'all') return true;
                        if (progressFilter === 'completed') return completedVideos.includes(video.id);
                        if (progressFilter === 'incomplete') return !completedVideos.includes(video.id);
                        return true;
                      });
                      
                      if (moduleVideos.length === 0) return null;
                      
                      const moduleCompletionPercentage = moduleVideos.length > 0
                        ? Math.round((moduleVideos.filter(v => completedVideos.includes(v.id)).length / moduleVideos.length) * 100)
                        : 0;
                        
                      const sectionKey = `module_${module.id}`;
                      
                      return (
                        <div key={module.id} className="mb-3">
                          <div 
                            className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-all"
                            onClick={() => toggleSection(sectionKey)}
                          >
                            <h3 className="text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center">
                              <ChevronDown 
                                size={14} 
                                className={`mr-1 transition-transform duration-200 ${expandedSections[sectionKey] ? '' : '-rotate-90'}`} 
                              />
                              {module.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-amber-600 dark:text-amber-400">
                                {moduleCompletionPercentage}%
                              </span>
                            </div>
                          </div>
                          
                          {expandedSections[sectionKey] !== false && (
                            <div className="mt-1 space-y-1 pl-2 animate-fadeIn">
                              {moduleVideos.map((video, index) => renderVideoItem(video, index, module.id))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* No videos message with improved visual feedback */}
                {filteredCourseVideos.length === 0 && !isCollapsed && (
                  <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400 dark:text-gray-500 animate-fadeIn">
                    <Filter size={24} className="mb-3 opacity-70" />
                    <p className="text-sm font-medium">No {progressFilter} videos found</p>
                    <p className="text-xs mt-1 max-w-xs">Try changing your filter settings to view more content</p>
                    <button 
                      onClick={() => setProgressFilter('all')}
                      className="mt-4 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-sm font-medium transition-all duration-200"
                    >
                      Show All Videos
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Learning Notes View with improved usability */}
            {activeTool === 'learning' && (
              <div className="space-y-1.5 p-2">
                {!isCollapsed && (
                  <div className="flex flex-col space-y-3">
                    {/* Add New Note Section - with improved state management */}
                    <div className="px-3 py-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <h3 className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">Add Learning Note</h3>
                      <textarea 
                        placeholder="Type your note here..."
                        className="w-full px-3 py-2 text-sm rounded-lg bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800 dark:text-gray-200 mb-2"
                        rows="2"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end">
                        <button 
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shadow-sm hover:shadow-md ${
                            newNoteText.trim() 
                              ? 'bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white' 
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          }`}
                          onClick={handleSaveNote}
                          disabled={!newNoteText.trim()}
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                    
                    {/* Notes Organization */}
                    <div className="mb-2">
                      <div 
                        className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-all"
                        onClick={() => toggleSection('moduleProgress')}
                      >
                        <h3 className="text-xs font-medium text-gray-600 dark:text-gray-300 flex items-center">
                          <ChevronDown 
                            size={14} 
                            className={`mr-1 transition-transform duration-200 ${expandedSections.moduleProgress ? '' : '-rotate-90'}`} 
                          />
                          Course Notes
                        </h3>
                      </div>
                      
                      {expandedSections.moduleProgress && (
                        <div className="mt-1 space-y-2 animate-fadeIn">
                          {/* Sample Learning Notes - replace with actual data */}
                          {['LRN-1001', 'LRN-1002', 'LRN-1003', 'LRN-1004', 'LRN-1005'].map((id, index) => (
                            <div key={id} className="px-3 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all duration-200">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                  {id}
                                </span>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                  index % 2 === 0 
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                                }`}>
                                  {index % 2 === 0 ? 'Complete' : 'In Progress'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {`This is a learning note for module ${Math.floor(index/2) + 1}. It contains important information about the course content.`}
                              </p>
                              <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500">
                                <Clock size={12} className="mr-1" />
                                <span>Updated {index + 1} day{index !== 0 ? 's' : ''} ago</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Tips and Resources Section */}
                    <div className="px-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 mt-2">
                      <div className="flex items-center mb-2">
                        <AlertCircle size={16} className="text-amber-500 dark:text-amber-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Learning Tips</h3>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Take notes while watching videos to improve retention. Review your notes regularly to reinforce learning.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Collapsed state - updated styling for the toggle button */}
          {isCollapsed && (
            <div className="absolute top-2/3 transform -translate-y-1/2 -right-8 flex items-center">
              <button
                onClick={toggleSidebar}
                className="flex items-center bg-amber-600 text-white px-2 py-1.5 rounded-r-lg shadow-md hover:bg-amber-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                aria-label="Expand sidebar"
                title="Expand Sidebar"
              >
                <span className="text-xs font-medium mr-1 whitespace-nowrap">Collapsed Menu</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
          
          {/* Expanded state footer button - keep as is */}
          {!isCollapsed && (
            <div className="px-1 py-1 flex items-center absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ml-auto"
                aria-label="Collapse sidebar"
                title="Collapse Sidebar"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Define PropTypes for the component
ChatSidebar.defaultProps = {
  chatHistory: [],
  activeTool: 'history',
  completedVideos: [],
  courseVideos: [],
  currentVideoId: null,
  isCollapsed: false,
  onCreateNewChat: () => {},
  onSaveChat: null,
};

ChatSidebar.propTypes = {
  chatHistory: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    preview: PropTypes.string,
    isSaved: PropTypes.bool,
  })),
  activeTool: PropTypes.string,
  onSelectTool: PropTypes.func.isRequired,
  onSelectChat: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
  completedVideos: PropTypes.arrayOf(PropTypes.number),
  courseVideos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
    moduleId: PropTypes.string,
    moduleName: PropTypes.string,
    isNew: PropTypes.bool,
  })),
  currentVideoId: PropTypes.number,
  onCreateNewChat: PropTypes.func,
  onSaveChat: PropTypes.func,
};

export default ChatSidebar;