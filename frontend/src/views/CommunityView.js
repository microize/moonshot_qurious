// Updated CommunityView.js with consistent styling
import React, { useState } from 'react';
import { Users, MessageSquare, Search, Filter, BookOpen, Award, Heart } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import Card from '../components/ui/Card';

const CommunityView = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  
  // Mock data for discussions
  const discussions = [
    {
      id: 1,
      title: "Tips for optimizing deep learning models?",
      author: "Maria G.",
      avatar: "/api/placeholder/40/40",
      category: "Deep Learning",
      replies: 12,
      views: 234,
      time: "2 hours ago",
      solved: true
    },
    {
      id: 2,
      title: "How to handle imbalanced datasets in classification problems?",
      author: "Alex K.",
      avatar: "/api/placeholder/40/40",
      category: "Machine Learning",
      replies: 8,
      views: 156,
      time: "Yesterday",
      solved: false
    },
    {
      id: 3,
      title: "Best resources for learning about transformers architecture",
      author: "Wei L.",
      avatar: "/api/placeholder/40/40",
      category: "NLP",
      replies: 15,
      views: 310,
      time: "3 days ago",
      solved: true
    },
    {
      id: 4,
      title: "SQL vs NoSQL for data science applications",
      author: "Sripathi",
      avatar: "/api/placeholder/40/40",
      category: "Data Engineering",
      replies: 7,
      views: 120,
      time: "1 week ago",
      solved: false,
      isUser: true
    }
  ];
  
  // Mock data for learning groups
  const learningGroups = [
    {
      id: 1,
      name: "Python Programming Circle",
      members: 128,
      avatar: "/api/placeholder/60/60",
      activeSince: "3 months",
      category: "Programming"
    },
    {
      id: 2,
      name: "Machine Learning Enthusiasts",
      members: 245,
      avatar: "/api/placeholder/60/60",
      activeSince: "1 year",
      category: "ML/AI"
    },
    {
      id: 3,
      name: "SQL & Database Mastery",
      members: 96,
      avatar: "/api/placeholder/60/60",
      activeSince: "6 months",
      category: "Databases"
    }
  ];
  
  // Mock data for active users
  const activeUsers = [
    { name: "Alex K.", avatar: "/api/placeholder/40/40", points: 1250, badge: "Expert" },
    { name: "Maria G.", avatar: "/api/placeholder/40/40", points: 980, badge: "Mentor" },
    { name: "Wei L.", avatar: "/api/placeholder/40/40", points: 940 },
    { name: "Anjali", avatar: "/api/placeholder/40/40", points: 680 },
    { name: "Sripathi", avatar: "/api/placeholder/40/40", points: 440, isUser: true }
  ];
  
  // User contribution stats
  const userStats = [
    { label: "Questions", value: 3 },
    { label: "Answers", value: 12 },
    { label: "Upvotes", value: 28 },
    { label: "Accepted", value: 7 }
  ];
  
  // Event tabs
  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'groups', label: 'Learning Groups', icon: Users },
    { id: 'mentors', label: 'Find Mentors', icon: Award }
  ];

  return (
    <PageContainer title="Community">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 no-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 mr-2 rounded-md transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Search and filter */}
            <div className="mt-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  />
                </div>
                
                <button className="px-4 py-2 flex items-center justify-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Filter size={18} className="mr-2" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </Card>
          
          {/* Discussions list */}
          {activeTab === 'discussions' && (
            <Card>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {discussions.map(discussion => (
                  <div 
                    key={discussion.id} 
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer ${
                      discussion.isUser ? 'bg-purple-50 dark:bg-purple-900/10' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <img 
                        src={discussion.avatar} 
                        alt={discussion.author} 
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-gray-800 dark:text-white">
                              {discussion.title}
                              {discussion.solved && (
                                <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded">
                                  Solved
                                </span>
                              )}
                            </h3>
                            <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                              <span>Posted by {discussion.author}</span>
                              {discussion.isUser && (
                                <span className="ml-1 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 px-1 rounded">You</span>
                              )}
                              <span className="mx-1">•</span>
                              <span>{discussion.time}</span>
                            </div>
                          </div>
                          <div className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {discussion.category}
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center mr-4">
                            <MessageSquare size={14} className="mr-1" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center">
                            <Search size={14} className="mr-1" />
                            <span>{discussion.views} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 text-center">
                  <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                    View More Discussions
                  </button>
                </div>
              </div>
            </Card>
          )}
          
          {/* Learning Groups */}
          {activeTab === 'groups' && (
            <Card>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningGroups.map(group => (
                  <div 
                    key={group.id} 
                    className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="flex items-center">
                      <img 
                        src={group.avatar} 
                        alt={group.name} 
                        className="w-12 h-12 rounded-lg mr-3 object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">{group.name}</h3>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {group.members} members • Active for {group.activeSince}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {group.category}
                      </span>
                      <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                        Join Group
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 border border-dashed border-purple-300 dark:border-purple-700 rounded-xl text-center">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">Create Your Own Learning Group</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Connect with peers and learn together in a collaborative environment
                </p>
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-md transition-colors">
                  Create New Group
                </button>
              </div>
            </Card>
          )}
          
          {/* Find Mentors */}
          {activeTab === 'mentors' && (
            <Card>
              <div className="text-center mb-6">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">Connect with Experienced Mentors</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get personalized guidance from industry experts and accelerate your learning journey
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeUsers.slice(0, 2).map((user, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 bg-gradient-to-br from-purple-50 to-white dark:from-gray-750 dark:to-gray-800"
                  >
                    <div className="flex items-center">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-14 h-14 rounded-full mr-3 object-cover border-2 border-purple-200 dark:border-purple-800"
                      />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-800 dark:text-white">{user.name}</h3>
                          <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded flex items-center">
                            <Award size={10} className="mr-0.5" />
                            {user.badge}
                          </span>
                        </div>
                        <div className="text-sm text-purple-600 dark:text-purple-400 mt-0.5">
                          {index === 0 ? 'AI Research & Development' : 'Data Science & ML'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                      {index === 0 
                        ? "Specializes in neural networks, deep learning and computer vision applications."
                        : "Expert in statistical analysis, feature engineering and model deployment."}
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center text-sm">
                        <Heart size={14} className="text-red-500 mr-1" />
                        <span>{index === 0 ? '98%' : '95%'} satisfaction</span>
                      </div>
                      <button className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-md transition-colors">
                        Request Mentoring
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="px-4 py-2 border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-sm rounded-md transition-colors">
                  Browse All Mentors
                </button>
              </div>
            </Card>
          )}
          
          {/* Call to action */}
          <div className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-md">
            <h2 className="text-xl font-semibold mb-2">Have a question? Ask the community!</h2>
            <p className="text-purple-100 mb-4">
              Get help from peers and experts on any topic related to data science and machine learning.
            </p>
            <button className="px-4 py-2 bg-white text-purple-600 hover:bg-purple-50 text-sm font-medium rounded-md transition-colors shadow-sm">
              Start a New Discussion
            </button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* User stats */}
          <Card title="Your Contribution">
            <div className="grid grid-cols-2 gap-4">
              {userStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-center">
                  <div className="text-xl font-semibold text-purple-600 dark:text-purple-400">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white">Helper Badge Progress</h3>
              <div className="mt-2 mb-1 flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-300">12/20 answers</span>
                <span className="text-purple-600 dark:text-purple-400">60%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </Card>
          
          {/* Active community members */}
          <Card title="Top Community Members">
            <div className="space-y-3">
              {activeUsers.map((user, index) => (
                <div 
                  key={index} 
                  className={`flex items-center p-2 rounded-md ${
                    user.isUser ? 'bg-purple-50 dark:bg-purple-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-750'
                  }`}
                >
                  <div className="w-6 text-xs font-medium text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </div>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover ml-2"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-sm text-gray-800 dark:text-white">{user.name}</span>
                      {user.isUser && (
                        <span className="ml-1 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 px-1.5 rounded">
                          You
                        </span>
                      )}
                      {user.badge && (
                        <span className="ml-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-1.5 rounded flex items-center">
                          <Award size={10} className="mr-0.5" />
                          {user.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-purple-600 dark:text-purple-400">
                    {user.points} pts
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
              View Full Leaderboard
            </button>
          </Card>
          
          {/* Upcoming events */}
          <Card title="Upcoming Events">
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="text-xs text-purple-500 dark:text-purple-400">Friday • 5:00 PM</div>
                <h3 className="font-medium text-gray-800 dark:text-white mt-1">Python Coding Challenge</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Weekly competition</p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">Tuesday • 7:00 PM</div>
                <h3 className="font-medium text-gray-800 dark:text-white mt-1">Data Science AMA Session</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">With industry experts</p>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
              View All Events
            </button>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default CommunityView;