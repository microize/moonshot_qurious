// Updated LeaderboardView.js with consistent styling
import React from 'react';
import { BarChart2, Award, Users, TrendingUp, Calendar } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import Card from '../components/Card';

const LeaderboardView = () => {
  // Mock leaderboard data
  const leaderboardData = [
    { 
      name: "Alex K.", 
      role: "AI Researcher", 
      points: 1250, 
      streak: 45,
      avatar: "/api/placeholder/40/40", 
      badge: "Expert",
      change: "+2"
    },
    { 
      name: "Maria G.", 
      role: "Data Scientist", 
      points: 980, 
      streak: 30,
      avatar: "/api/placeholder/40/40",
      badge: "Mentor",
      change: "0"
    },
    { 
      name: "Wei L.", 
      role: "ML Engineer", 
      points: 940, 
      streak: 28,
      avatar: "/api/placeholder/40/40",
      badge: "Contributor",
      change: "-1"
    },
    { 
      name: "Sripathi", 
      role: "Data Engineer", 
      points: 440, 
      streak: 8,
      avatar: "/api/placeholder/40/40",
      isUser: true,
      change: "+1"
    },
    { 
      name: "Anjali", 
      role: "Data Scientist", 
      points: 680, 
      streak: 15,
      avatar: "/api/placeholder/40/40",
      change: "+3",
      isOnline: true
    }
  ];
  
  // Leaderboard categories
  const categories = [
    { id: 'global', name: 'Global', active: true },
    { id: 'monthly', name: 'This Month', active: false },
    { id: 'weekly', name: 'This Week', active: false },
    { id: 'friends', name: 'Friends', active: false },
  ];
  
  // Achievement stats
  const achievementStats = [
    { title: "Total Points", value: "440", icon: Award, color: "text-purple-500" },
    { title: "Current Streak", value: "8 days", icon: TrendingUp, color: "text-green-500" },
    { title: "Ranking", value: "#1,240", icon: BarChart2, color: "text-blue-500" },
    { title: "Best Day", value: "Wednesday", icon: Calendar, color: "text-yellow-500" },
  ];

  // Recent badges earned
  const recentBadges = [
    { name: "Fast Learner", description: "Complete 5 modules in a week", icon: TrendingUp },
    { name: "Helper", description: "Answer 10 community questions", icon: Users },
  ];

  return (
    <PageContainer title="Leaderboard">
      {/* Achievement stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {achievementStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg mr-3 ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main leaderboard */}
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-4">
              <h2 className="font-medium text-gray-800 dark:text-white">Learning Champions</h2>
              
              {/* Category tabs */}
              <div className="flex space-x-1 mt-3 overflow-x-auto">
                {categories.map((category) => (
                  <button 
                    key={category.id}
                    className={`px-3 py-1 text-sm rounded-md transition-colors flex-shrink-0 ${
                      category.active 
                        ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Leaderboard table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-750 text-left">
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Streak</th>
                    <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {leaderboardData.map((person, index) => (
                    <tr 
                      key={index} 
                      className={person.isUser ? 'bg-purple-50 dark:bg-purple-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-750'}
                    >
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{index + 1}</span>
                          <span className={`ml-1.5 text-xs ${
                            person.change.startsWith('+') 
                              ? 'text-green-500' 
                              : person.change === '0' 
                                ? 'text-gray-400' 
                                : 'text-red-500'
                          }`}>
                            {person.change}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img 
                            src={person.avatar} 
                            alt={person.name} 
                            className="w-8 h-8 rounded-full object-cover mr-3"
                          />
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-800 dark:text-white">{person.name}</span>
                              {person.isUser && (
                                <span className="ml-1.5 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded">You</span>
                              )}
                              {person.badge && (
                                <span className="ml-1.5 text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded">
                                  {person.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{person.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                          Level {Math.floor((person.points / 300) + 1)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <TrendingUp size={14} className="text-green-500 mr-1" />
                          <span className="text-gray-700 dark:text-gray-300">{person.streak} days</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-800 dark:text-white">{person.points}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        {/* Sidebar with achievements and badges */}
        <div className="space-y-6">
          {/* Recent badges */}
          <Card title="Your Recent Badges">
            <div className="space-y-4">
              {recentBadges.map((badge, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-2 rounded-lg mr-3 bg-purple-100 dark:bg-purple-900/30 text-purple-500">
                    <badge.icon size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{badge.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
              View All Badges
            </button>
          </Card>
          
          {/* Weekly challenge */}
          <Card title="Weekly Challenge">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-white">Complete 3 Python modules</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 days remaining</div>
              
              <div className="mt-3 mb-1 flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-300">Progress</span>
                <span className="text-purple-600 dark:text-purple-400">1/3 complete</span>
              </div>
              
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '33%' }}></div>
              </div>
              
              <div className="mt-3 text-sm font-medium text-purple-600 dark:text-purple-400">
                +50 bonus points upon completion
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
              Continue Challenge
            </button>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default LeaderboardView;