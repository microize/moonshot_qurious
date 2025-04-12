// Enhanced LeaderboardView with microstimuli & behavioral UX
import React from 'react';
import { BarChart2, Award, Users, TrendingUp, Calendar, MessageCircleHeart, Sparkles, Lightbulb } from 'lucide-react';
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
  challengeReminder: "You're just 2 modules away from a new badge 🏅",
  socialCallout: "5 of your peers just leveled up. You're next!",
  bonusNudge: "Complete one more activity to unlock a mystery badge 🎁"
};

const nextBestSteps = [
  '📘 Complete "Intro to Neural Networks" → +30 XP',
  '🧠 Review "Data Cleaning Best Practices" to retain streak',
  '🎤 RSVP to Friday’s community AMA – 20 spots left!',
];

const LeaderboardView = () => {
  return (
    <PageContainer title="Leaderboard">
      {/* 👇 Dopaminergic Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsWithIcons.map((stat, index) => (
          <Card key={index} className="p-4 hover:scale-[1.02] transition-transform">
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
        {/* 👑 Leaderboard with Social Proof */}
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-4">
              <h2 className="font-medium text-gray-800 dark:text-white">Learning Champions</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{microCopy.socialCallout}</p>
              <div className="flex space-x-1 mt-3 overflow-x-auto">
                {categories.map(category => (
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
                      className={person.isUser ? 'bg-purple-50 dark:bg-purple-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-750'}
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
                                <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded">You</span>
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
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
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
                          <MessageCircleHeart size={14} className="mr-1" /> Connect
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
          <Card title="🎖️ Your Recent Badges">
            {badgesWithIcons.map((badge, index) => (
              <div key={index} className="flex items-start mb-3">
                <div className="p-2 rounded-lg mr-3 bg-purple-100 dark:bg-purple-900/30 text-purple-500">
                  <badge.icon size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{badge.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg">
              View All Badges
            </button>
          </Card>

          <Card title="⚔️ Weekly Challenge">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-white">Complete 3 Python modules</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 days remaining</div>
              <div className="mt-2 text-sm text-purple-700 dark:text-purple-300">{microCopy.challengeReminder}</div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '33%' }}></div>
              </div>
              <div className="mt-3 text-sm font-medium text-purple-600 dark:text-purple-400">
                +50 bonus points on completion
              </div>
            </div>
            <button className="w-full mt-3 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg">
              Continue Challenge
            </button>
          </Card>

          <Card title="✨ Next Best Step for You">
            <ul className="text-sm space-y-2 text-purple-700 dark:text-purple-300">
              {nextBestSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
            <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">{microCopy.bonusNudge}</div>
            <button className="w-full mt-3 py-2 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg">
              View All Suggestions
            </button>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default LeaderboardView;
