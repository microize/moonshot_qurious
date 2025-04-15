// src/components/CourseChat/ChatSidebar.js
import React, { useState } from 'react';
import { MessageSquare, Gamepad, BookOpen, Award, Users, ChevronRight, Search, Clock, Video, CheckCircle, PlayCircle, CheckSquare, Lock } from 'lucide-react';

const ChatSidebar = ({ 
  chatHistory = [], 
  activeTool = 'history',
  onSelectTool,
  onSelectChat,
  isCollapsed = false,
  toggleSidebar,
  completedVideos = [] 
}) => {
  // Mock chat history if not provided
  const history = chatHistory.length > 0 ? chatHistory : [
    { id: 1, title: "Introduction to ML Algorithms", date: "Today", preview: "Can you explain how decision trees work?" },
    { id: 2, title: "Neural Networks Explained", date: "Yesterday", preview: "What's the difference between CNN and RNN?" },
    { id: 3, title: "Data Preprocessing", date: "Apr 12", preview: "How should I handle missing values in my dataset?" }
  ];

  // Tool sections
  const tools = [
    { id: 'history', label: 'Chat History', icon: MessageSquare },
    { id: 'videos', label: 'Videos', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'challenges', label: 'Challenges', icon: Award },
    { id: 'games', label: 'Learning Games', icon: Gamepad },
    { id: 'community', label: 'Study Groups', icon: Users }
  ];

  // Flashcards mockup
  const flashcards = [
    { id: 1, title: "Machine Learning Basics", count: 25, progress: 40 },
    { id: 2, title: "Python Programming", count: 32, progress: 75 },
    { id: 3, title: "Data Visualization", count: 18, progress: 10 }
  ];

  // Challenges mockup
  const challenges = [
    { id: 1, title: "Build a Decision Tree", difficulty: "Intermediate", xp: 150 },
    { id: 2, title: "Clean a Messy Dataset", difficulty: "Beginner", xp: 75 },
    { id: 3, title: "Implement a Neural Network", difficulty: "Advanced", xp: 300 }
  ];
  
  // Video playlist mockup
  const videoPlaylist = [
    { 
      id: 1, 
      moduleId: 1,
      moduleTitle: "Module 1: Introduction to Generative AI",
      title: "Introduction to Transformer Architecture", 
      duration: "12:45",
      completed: true
    },
    { 
      id: 2, 
      moduleId: 1,
      moduleTitle: "Module 1: Introduction to Generative AI",
      title: "Self-Attention Mechanisms", 
      duration: "15:30",
      completed: true 
    },
    { 
      id: 3, 
      moduleId: 1,
      moduleTitle: "Module 1: Introduction to Generative AI",
      title: "Encoder-Decoder Architecture", 
      duration: "18:20",
      completed: false,
      current: true 
    },
    { 
      id: 4, 
      moduleId: 2,
      moduleTitle: "Module 2: Prompt Engineering",
      title: "Basics of Prompt Design", 
      duration: "14:10",
      completed: false 
    },
    { 
      id: 5, 
      moduleId: 2,
      moduleTitle: "Module 2: Prompt Engineering",
      title: "Advanced Prompting Techniques", 
      duration: "20:05",
      completed: false,
      locked: true
    },
    { 
      id: 6, 
      moduleId: 3,
      moduleTitle: "Module 3: Building with LLMs",
      title: "API Integration Patterns", 
      duration: "16:30",
      completed: false,
      locked: true
    }
  ];

  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get content based on active tool
  const renderToolContent = () => {
    switch(activeTool) {
      case 'history':
        return (
          <div className="space-y-2 mt-3">
            {history
              .filter(chat => searchQuery ? 
                chat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                chat.preview.toLowerCase().includes(searchQuery.toLowerCase()) 
                : true
              )
              .map(chat => (
                <div 
                  key={chat.id}
                  className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 cursor-pointer transition-colors"
                  onClick={() => onSelectChat && onSelectChat(chat.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800 dark:text-white text-sm line-clamp-1">{chat.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{chat.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{chat.preview}</p>
                </div>
            ))}
          </div>
        );
        
      case 'videos':
        // Group videos by module
        const moduleGroups = videoPlaylist.reduce((acc, video) => {
          if (!acc[video.moduleId]) {
            acc[video.moduleId] = {
              id: video.moduleId,
              title: video.moduleTitle,
              videos: []
            };
          }
          acc[video.moduleId].videos.push(video);
          return acc;
        }, {});
        
        return (
          <div className="space-y-4 mt-3">
            {Object.values(moduleGroups)
              .filter(module => 
                searchQuery ? 
                  module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  module.videos.some(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  : true
              )
              .map(module => (
                <div 
                  key={module.id}
                  className="bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-medium text-gray-800 dark:text-white text-sm">{module.title}</h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {module.videos.filter(v => v.completed || completedVideos.includes(v.id)).length} of {module.videos.length} completed
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {module.videos.map(video => (
                      <div 
                        key={video.id}
                        className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          video.current ? 'bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500' : ''
                        } ${video.locked ? 'opacity-60' : 'cursor-pointer'}`}
                        onClick={() => !video.locked && onSelectChat && onSelectChat(video.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            {video.completed || completedVideos.includes(video.id) ? (
                              <CheckSquare size={16} className="text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                            ) : video.locked ? (
                              <Lock size={16} className="text-gray-400 dark:text-gray-500 mr-2 flex-shrink-0" />
                            ) : video.current ? (
                              <PlayCircle size={16} className="text-amber-500 dark:text-amber-400 mr-2 flex-shrink-0" />
                            ) : (
                              <Video size={16} className="text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                            )}
                            
                            <div>
                              <h4 className={`text-sm ${
                                video.completed 
                                  ? 'text-gray-600 dark:text-gray-300' 
                                  : 'text-gray-800 dark:text-white'
                              }`}>
                                {video.title}
                                {(video.completed || completedVideos.includes(video.id)) && (
                                  <span className="ml-2 text-xs text-green-500 dark:text-green-400">(Completed)</span>
                                )}
                                {video.current && (
                                  <span className="ml-2 text-xs text-amber-500 dark:text-amber-400">(Current)</span>
                                )}
                              </h4>
                            </div>
                          </div>
                          
                          <span className="text-xs text-gray-500 dark:text-gray-400">{video.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(module.videos.filter(v => v.completed || completedVideos.includes(v.id)).length / module.videos.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-center mt-2 text-center">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <CheckCircle size={16} />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 ml-2">
                  Completed videos are automatically saved to your progress
                </p>
              </div>
          </div>
        );
      
      case 'flashcards':
        return (
          <div className="space-y-3 mt-3">
            {flashcards.map(deck => (
              <div 
                key={deck.id}
                className="p-3 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-800 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800 dark:text-white text-sm">{deck.title}</h3>
                  <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
                    {deck.count} cards
                  </span>
                </div>
                
                <div className="mt-2 mb-1 flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-300">Progress</span>
                  <span className="text-amber-600 dark:text-amber-400">{deck.progress}%</span>
                </div>
                
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${deck.progress}%` }}
                  ></div>
                </div>
                
                <button className="w-full mt-3 text-xs px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-650 transition-colors flex items-center justify-center">
                  Study Now <ChevronRight size={12} className="ml-1" />
                </button>
              </div>
            ))}
            
            <button className="w-full p-2 mt-2 border border-dashed border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 rounded-lg text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
              Create New Flashcard Deck
            </button>
          </div>
        );
        
      case 'challenges':
        return (
          <div className="space-y-3 mt-3">
            {challenges.map(challenge => (
              <div 
                key={challenge.id}
                className="p-3 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:border-amber-200 dark:hover:border-amber-800 hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800 dark:text-white text-sm">{challenge.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    challenge.difficulty === 'Beginner' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                      : challenge.difficulty === 'Intermediate'
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-300 flex items-center">
                  <Award size={12} className="text-amber-500 mr-1" /> 
                  <span>{challenge.xp} XP reward</span>
                </div>
                
                <button className="w-full mt-3 text-xs px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors flex items-center justify-center">
                  Start Challenge <ChevronRight size={12} className="ml-1" />
                </button>
              </div>
            ))}
            
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-lg text-white shadow-md mt-4">
              <h3 className="font-medium text-sm">Weekly Challenge</h3>
              <p className="text-xs mt-1">Complete all 3 challenges this week to earn a special badge!</p>
              <div className="mt-2 w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '33%' }}></div>
              </div>
              <div className="mt-1 text-xs text-white/80">1/3 completed</div>
            </div>
          </div>
        );
        
      case 'games':
        return (
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg text-white text-center shadow-md">
                <Gamepad size={24} className="mx-auto mb-2" />
                <h3 className="font-medium text-sm">ML Quiz</h3>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg text-white text-center shadow-md">
                <BookOpen size={24} className="mx-auto mb-2" />
                <h3 className="font-medium text-sm">Term Match</h3>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg text-white text-center shadow-md">
                <MessageSquare size={24} className="mx-auto mb-2" />
                <h3 className="font-medium text-sm">Chat Bot</h3>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-lg text-white text-center shadow-md">
                <Award size={24} className="mx-auto mb-2" />
                <h3 className="font-medium text-sm">Leaderboard</h3>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-medium text-gray-800 dark:text-white text-sm flex items-center">
                <Clock size={14} className="mr-2 text-amber-500" /> Recently Played
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-300">ML Quiz</span>
                  <span className="text-amber-600 dark:text-amber-400">8/10 score</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-300">Term Match</span>
                  <span className="text-amber-600 dark:text-amber-400">15 pairs matched</span>
                </div>
              </div>
              <button className="w-full mt-3 text-xs px-3 py-1.5 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-650 transition-colors">
                View Game History
              </button>
            </div>
          </div>
        );
        
      case 'community':
        return (
          <div className="space-y-3 mt-3">
            <div className="p-3 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-medium text-gray-800 dark:text-white text-sm">Machine Learning Study Group</h3>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Members: 12</span>
                  <span className="text-green-500">Active Now</span>
                </div>
              </div>
              <button className="w-full mt-3 text-xs px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors">
                Join Discussion
              </button>
            </div>
            
            <div className="p-3 bg-white dark:bg-gray-750 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-medium text-gray-800 dark:text-white text-sm">Python Coders Club</h3>
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Members: 28</span>
                  <span className="text-gray-400">Last active: 2h ago</span>
                </div>
              </div>
              <button className="w-full mt-3 text-xs px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors">
                Join Discussion
              </button>
            </div>
            
            <button className="w-full p-2 mt-2 border border-dashed border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 rounded-lg text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
              Create New Study Group
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Collapsed view (narrow sidebar with only icons)
  if (isCollapsed) {
    return (
      <div className="h-full w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-sm">
        <div className="p-2 flex justify-center border-b border-gray-200 dark:border-gray-700">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Expand sidebar"
          >
            <ChevronRight size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="flex-1 py-2 space-y-1">
          {tools.map(tool => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                className={`w-full p-3 flex justify-center ${
                  activeTool === tool.id
                    ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => onSelectTool && onSelectTool(tool.id)}
                title={tool.label}
              >
                <Icon size={20} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Full sidebar view
  return (
    <div className="h-full w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-sm">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="font-semibold text-gray-800 dark:text-white">Learning Tools</h2>
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Collapse sidebar"
        >
          <ChevronRight size={16} className="transform rotate-180 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      {/* Tool Tabs */}
      <div className="flex overflow-x-auto px-2 py-2 border-b border-gray-200 dark:border-gray-700 hide-scrollbar">
        {tools.map(tool => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              className={`px-3 py-1.5 mr-1 rounded-md flex items-center whitespace-nowrap text-xs transition-colors ${
                activeTool === tool.id
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => onSelectTool && onSelectTool(tool.id)}
            >
              <Icon size={14} className="mr-1.5" />
              {tool.label}
            </button>
          );
        })}
      </div>
      
      {/* Search Bar */}
      <div className="px-4 pt-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder={`Search ${activeTool === 'history' ? 'chat history' : activeTool}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>
      
      {/* Tool Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {renderToolContent()}
      </div>
    </div>
  );
};

export default ChatSidebar;