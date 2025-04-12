// components/CommunityLeaderboard.js
import React, { useState } from 'react';
import { Users, Trophy, MessageSquare, Heart, Star, Award, Zap, Calendar } from 'lucide-react';

const CommunityLeaderboard = () => {
  const [activeTab, setActiveTab] = useState('friends');
  
  // Mock data
  const leaderboardData = {
    friends: [
      { 
        name: "Anjali", 
        role: "Data Scientist", 
        points: 680, 
        streak: 15,
        avatar_url: "https://via.placeholder.com/40",
        change: "+2",
        isOnline: true,
        currentCourse: "Deep Learning Specialization"
      },
      { 
        name: "Sripathi", 
        role: "Data Engineer", 
        points: 440, 
        streak: 8,
        avatar_url: "https://via.placeholder.com/40",
        change: "0",
        isOnline: true,
        currentCourse: "Understanding Machine Learning Algorithms",
        isUser: true
      },
      { 
        name: "Raj", 
        role: "ML Engineer", 
        points: 410, 
        streak: 6,
        avatar_url: "https://via.placeholder.com/40",
        change: "-1",
        isOnline: false,
        currentCourse: "Python for Data Analysis"
      },
      { 
        name: "Priya", 
        role: "BI Analyst", 
        points: 390, 
        streak: 4,
        avatar_url: "https://via.placeholder.com/40",
        change: "+1",
        isOnline: false,
        currentCourse: "SQL for Data Analysis"
      }
    ],
    global: [
      { 
        name: "Alex K.", 
        role: "AI Researcher", 
        points: 1250, 
        streak: 45,
        avatar_url: "https://via.placeholder.com/40",
        badge: "Expert"
      },
      { 
        name: "Maria G.", 
        role: "Data Scientist", 
        points: 980, 
        streak: 30,
        avatar_url: "https://via.placeholder.com/40",
        badge: "Mentor" 
      },
      { 
        name: "Wei L.", 
        role: "ML Engineer", 
        points: 940, 
        streak: 28,
        avatar_url: "https://via.placeholder.com/40",
        badge: "Contributor" 
      },
      { 
        name: "Sripathi", 
        role: "Data Engineer", 
        points: 440, 
        streak: 8,
        avatar_url: "https://via.placeholder.com/40",
        isUser: true
      }
    ]
  };
  
  // Community activity
  const recentActivity = [
    {
      user: "Anjali",
      action: "completed",
      item: "Neural Networks module",
      time: "2 hours ago",
      icon: Trophy
    },
    {
      user: "Raj",
      action: "asked a question in",
      item: "Python community forum",
      time: "Yesterday",
      icon: MessageSquare
    },
    {
      user: "Priya",
      action: "shared a helpful resource about",
      item: "SQL optimization",
      time: "2 days ago",
      icon: Heart
    }
  ];
  
  // Badges
  const badges = [
    { name: "Fast Learner", description: "Complete 5 modules in a week", icon: Zap, progress: 80 },
    { name: "Helper", description: "Answer 10 community questions", icon: MessageSquare, progress: 60 },
    { name: "Consistent", description: "Maintain a 10-day streak", icon: Calendar, progress: 80 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-amber-100 dark:border-amber-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Users size={18} className="text-amber-500 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">Learning Community</h3>
        </div>
        
        {/* Tabs  */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-md p-1">
          <button 
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'friends' 
                ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400'
            }`}
            onClick={() => setActiveTab('friends')}
          >
            Friends
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              activeTab === 'global' 
                ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-sm' 
                : 'text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400'
            }`}
            onClick={() => setActiveTab('global')}
          >
            Global
          </button>
        </div>
      </div>
      
      {/* Leaderboard */}
      <div className="space-y-1 mt-2">
        {leaderboardData[activeTab].map((user, index) => (
          <div 
            key={index} 
            className={`flex items-center p-2 rounded-md ${user.isUser ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
          >
            <div className="w-6 text-center font-medium text-gray-500 dark:text-gray-400">
              {index + 1}
            </div>
            
            <div className="relative ml-2">
              <img 
                src={user.avatar_url || 'https://via.placeholder.com/150/ADD8E6/000000?text=Placeholder'}
                // Use light blue placeholder if avatar_url is not available

                alt={user.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
              {user.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
            </div>
            
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <span className="font-medium text-sm text-gray-800 dark:text-white">{user.name}</span>
                {user.isUser && (
                  <span className="ml-1 text-xs bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 px-1.5 rounded">You</span>
                )}
                {user.badge && (
                  <span className="ml-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-1.5 rounded flex items-center">
                    <Award size={10} className="mr-0.5" />
                    {user.badge}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{user.role}</div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <Star size={14} className="text-purple-500 mr-1" />
                <span className="font-semibold text-gray-800 dark:text-white">{user.points}</span>
              </div>
              
              <div className="flex items-center text-xs mt-0.5">
                <Zap size={12} className="text-orange-500 mr-1" />
                <span className="text-gray-600 dark:text-gray-300">{user.streak} days</span>
                
                {user.change && (
                  <span className={`ml-1 ${
                    user.change.startsWith('+') 
                      ? 'text-green-500' 
                      : user.change === '0' 
                        ? 'text-gray-500' 
                        : 'text-red-500'
                  }`}>
                    {user.change}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Community activity */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Recent Activity</h4>
        
        <div className="space-y-2">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start text-sm">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-800 rounded-md text-purple-500 dark:text-purple-300 mr-2">
                <activity.icon size={14} />
              </div>
              <div>
                <span className="font-medium text-gray-800 dark:text-white">{activity.user}</span>
                <span className="text-gray-600 dark:text-gray-300"> {activity.action} </span>
                <span className="font-medium text-gray-800 dark:text-white">{activity.item}</span>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Your badges section */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Badges In Progress</h4>
        
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div className="p-1.5 bg-purple-100 dark:bg-purple-800 rounded-md text-purple-500 dark:text-purple-300">
                  <badge.icon size={14} />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{badge.progress}%</div>
              </div>
              
              <div className="font-medium text-sm text-gray-800 dark:text-white mb-1">{badge.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</div>
              
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${badge.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to action */}
      <div className="mt-4 text-center">
        <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-md transition-colors">
          Invite Learning Buddies
        </button>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;