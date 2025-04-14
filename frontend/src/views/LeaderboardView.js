// Updated LeaderboardView with consistent styling matching CoursesView
import React, { useState } from 'react';
import { BarChart2, Award, Users, TrendingUp, Calendar, MessageCircleHeart, Sparkles, Lightbulb, ChevronRight, Filter, Search } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import Card from '../components/ui/Card';

import { leaderboardData, categories, achievementStats, recentBadges } from '../data/leaderboardData';
import * as LucideIcons from 'lucide-react';

const withIcons = (items) =>
  items.map(item => ({
    ...item,
    icon: LucideIcons[item.icon] || Sparkles,
  }));

const statsWithIcons = withIcons(achievementStats);
const badgesWithIcons = withIcons(recentBadges);

const microCopy = {
  challengeReminder: "Complete 2 more modules to earn certification",
  socialCallout: "Your colleagues are advancing their skills. Join them.",
  bonusNudge: "Additional achievement available upon completion of next module"
};

const nextBestSteps = [
  'Complete "Introduction to Neural Networks" (30 points)',
  'Review "Data Cleaning Best Practices" module',
  'Register for Friday\'s Professional Development Session',
];

// Simplified Stats component similar to CoursesView
const Stats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsWithIcons.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-dashed border-gray-300 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
          <div className="flex items-center text-amber-500 dark:text-amber-400 mb-2">
            <div className={`p-2 rounded-lg mr-3 bg-amber-100 dark:bg-amber-900/30`}>
              <stat.icon size={16} className={stat.color} />
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</div>
          </div>
          <div className="font-semibold text-gray-800 dark:text-white text-xl">{stat.value}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.description || "This month"}</div>
        </div>
      ))}
    </div>
  );
};

// Simplified Topic Filter similar to CoursesView
const CategoryFilter = ({ categories, onCategoryClick }) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((category) => (
      <button 
        key={category.id}
        onClick={() => onCategoryClick(category.id)}
        className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
          category.active 
            ? 'bg-amber-500 text-white' 
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-amber-50'
        }`}
      >
        {category.name}
        {category.active && <span className="inline-block ml-1">●</span>}
      </button>
    ))}
  </div>
);

// Badge Card similar to CourseCard
const BadgeCard = ({ badge }) => {
  return (
    <div className="flex items-start mb-4 p-3 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-md transition-all">
      <div className="p-3 rounded-lg mr-3 bg-amber-100 dark:bg-amber-900/30 text-amber-500">
        <badge.icon size={18} />
      </div>
      <div>
        <h3 className="font-medium text-gray-800 dark:text-white">{badge.name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{badge.description}</p>
      </div>
    </div>
  );
};

// Weekly Challenge Card
const ChallengeCard = () => (
  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-dashed border-amber-200 dark:border-amber-800">
    <h3 className="font-medium text-gray-800 dark:text-white">Python Programming Fundamentals</h3>
    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 days until completion deadline</div>
    <div className="mt-2 text-sm text-amber-700 dark:text-amber-300">{microCopy.challengeReminder}</div>
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-3 overflow-hidden">
      <div className="h-full bg-amber-500 rounded-full" style={{ width: '33%' }}></div>
    </div>
    <div className="mt-3 text-sm font-medium text-amber-600 dark:text-amber-400">
      50 additional points upon completion
    </div>
  </div>
);

const LeaderboardView = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriesState, setCategoriesState] = useState(categories);

  const handleCategoryClick = (categoryId) => {
    setCategoriesState(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        active: category.id === categoryId
      }))
    );
  };

  return (
    <PageContainer>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header with tabs similar to CoursesView */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-600 dark:text-gray-300">
            Leaderboard
          </h1>
          
          {/* Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg shadow-sm">
            <button 
              className={`px-4 py-2 text-sm rounded-md transition-all ${
                activeTab === 'leaderboard' 
                  ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Performance Rankings
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-md transition-all ${
                activeTab === 'mybadges' 
                  ? 'bg-white dark:bg-gray-700 text-amber-600 dark:text-amber-400 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveTab('mybadges')}
            >
              My Qualifications
            </button>
          </div>
        </div>

        {/* Stats component */}
        <Stats />

        {/* Search and filter bar */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search box */}
            <div className="relative w-full">
              {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div> */}
              <input
                type="text"
                placeholder="Search for learners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-500"
              />
            </div>
            
            {/* Filter button */}
            <button className="px-4 py-2 flex items-center justify-center text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              {/* <Filter size={18} className="mr-2" /> */}
              <span>Search</span>
            </button>
          </div>
          
          {/* Category filters */}
          <div className="mt-4">
            <CategoryFilter categories={categoriesState} onCategoryClick={handleCategoryClick} />
          </div>
        </Card>

        {/* Content based on active tab */}
        {activeTab === 'leaderboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 👑 Leaderboard with Social Proof */}
            <div className="lg:col-span-2">
              <Card>
                <div className="mb-4">
                  <h2 className="font-medium text-xl text-gray-800 dark:text-white flex items-center">
                    <Award size={20} className="mr-2 text-amber-500 dark:text-amber-400" />
                    Top Performers
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{microCopy.socialCallout}</p>
                </div>

                {/* 🏆 Leaderboard Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-750 text-left">
                        <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Rank</th>
                        <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                        <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Level</th>
                        <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Streak</th>
                        <th className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Points</th>
                        <th className="py-3 px-4" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {leaderboardData.map((person, index) => (
                        <tr
                          key={index}
                          className={`hover:shadow-sm transition-all ${person.isUser ? 'bg-amber-50 dark:bg-amber-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-750'}`}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-700 dark:text-gray-300">{index + 1}</span>
                              <span className={`ml-1.5 text-xs ${
                                person.change.startsWith('+') ? 'text-green-500' : person.change === '0' ? 'text-gray-400' : 'text-red-500'
                              }`}>
                                {person.change}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full object-cover mr-3" />
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className="font-medium text-gray-800 dark:text-white">{person.name}</span>
                                  {person.isUser && (
                                    <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">You</span>
                                  )}
                                  {person.badge && (
                                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded">{person.badge}</span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{person.role}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                              Level {Math.floor(person.points / 300) + 1}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <TrendingUp size={14} className="text-green-500 mr-1" />
                              <span className="text-gray-700 dark:text-gray-300">{person.streak} days</span>
                            </div>
                            <span className="text-xs text-green-500">{10 - (person.streak % 10)} days to milestone!</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-800 dark:text-white">{person.points}</td>
                          <td className="py-3 px-4">
                            <button className="text-xs flex items-center px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                              <MessageCircleHeart size={14} className="mr-1" /> Network
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* 📚 Sidebar for Motivation */}
            <div className="space-y-6">
              <Card>
                <div className="mb-4">
                  <h2 className="font-medium text-xl text-gray-800 dark:text-white flex items-center">
                    <Sparkles size={20} className="mr-2 text-amber-500 dark:text-amber-400" />
                    Weekly Challenge
                  </h2>
                </div>
                <ChallengeCard />
                <button className="w-full mt-4 py-2 text-sm bg-amber-500 hover:bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center">
                  <span>Continue Module</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </Card>

              <Card>
                <div className="mb-4">
                  <h2 className="font-medium text-xl text-gray-800 dark:text-white flex items-center">
                    <Lightbulb size={20} className="mr-2 text-amber-500 dark:text-amber-400" />
                    Recommended Next Steps
                  </h2>
                </div>
                <ul className="text-sm space-y-2 text-amber-700 dark:text-amber-300">
                  {nextBestSteps.map((step, idx) => (
                    <li key={idx} className="p-2 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">{step}</li>
                  ))}
                </ul>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-3">{microCopy.bonusNudge}</div>
                <button className="w-full mt-3 py-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg flex items-center justify-center">
                  <span>View Learning Path</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My badges and achievements view */}
            <div className="lg:col-span-2">
              <Card>
                <div className="mb-4">
                  <h2 className="font-medium text-xl text-gray-800 dark:text-white flex items-center">
                    <Award size={20} className="mr-2 text-amber-500 dark:text-amber-400" />
                    My Certifications
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You have completed 8 certification requirements</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badgesWithIcons.map((badge, index) => (
                    <BadgeCard key={index} badge={badge} />
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm bg-amber-500 hover:bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center">
                  <span>View All Certifications</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </Card>
            </div>
            
            {/* Sidebar for Achievements */}
            <div className="space-y-6">
              <Card>
                <div className="mb-4">
                  <h2 className="font-medium text-xl text-gray-800 dark:text-white flex items-center">
                    <TrendingUp size={20} className="mr-2 text-amber-500 dark:text-amber-400" />
                    My Progress
                  </h2>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Next Level</span>
                    <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Level 4</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    210 XP out of 300 XP needed
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">Longest Streaks</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Current Streak</span>
                      <span className="text-sm font-medium text-green-500">7 days</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Best Streak</span>
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-400">14 days</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="mb-4">
                  <h2 className="font-medium text-xl text-gray-800 dark:text-white flex items-center">
                    <Calendar size={20} className="mr-2 text-amber-500 dark:text-amber-400" />
                    Recent Activity
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Yesterday</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Completed "Introduction to Neural Networks" (+15 XP)</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <span className="text-xs text-gray-500 dark:text-gray-400">3 days ago</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Earned "Python Basics" badge</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Last week</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Reached Level 3</p>
                  </div>
                </div>
                <button className="w-full mt-3 py-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg flex items-center justify-center">
                  <span>View Activity History</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default LeaderboardView;