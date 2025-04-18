import React, { useState } from 'react';
import {
  BarChart2,
  Users,
  TrendingUp,
  Target,
  FileCheck,
  BookOpen,
  Activity,
  PieChart,
  Award,
  Compass,
  TrendingDown,
  Clock,
  Calendar, // Note: Calendar is imported but not used. Can be removed if not needed.
  CheckCircle,
  Zap, // Note: Zap is imported but not used. Can be removed if not needed.
  Bell,
  ChevronRight, // Note: ChevronRight is imported but not used. Can be removed if not needed.
  Search,
  DollarSign,
  Briefcase, // Used for potential roles
  Database,
  Server,
  GitMerge,
  Layers,
  ChevronsUp, // Icon for Promotion Readiness
  Filter,       // Icon for Pipeline Analysis
  Scale,        // Icon for Equity/Bias Analysis
  AlertTriangle, // Icon for Flight Risk
  UserCheck,    // Icon for Readiness Score
  Shuffle,      // Icon for Internal Mobility
} from 'lucide-react';

// Tab Navigation Component with amber styling
const TabNavigation = ({ tabs, activeTab, onChange }) => {
  // ... (Component remains the same)
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                group inline-flex items-center px-4 py-3 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-amber-300'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <tab.icon
                className={`mr-2 h-5 w-5 ${isActive ? 'text-amber-500' : 'text-gray-400 group-hover:text-amber-400'}`}
                aria-hidden="true"
              />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

// Metric Card Component with amber styling
const MetricCard = ({ label, value, icon: Icon, trend = 'neutral', color = 'amber' }) => {
  // ... (Component remains the same, including the logic for trend colors based on label)
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
    green: 'bg-green-100 text-green-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    rose: 'bg-rose-100 text-rose-600',
  };

  const trendColor = trend === 'up'
    ? 'text-green-500'
    : trend === 'down'
      // If trend is down, but label indicates something positive (e.g., reduced risk/time), show green
      ? (label.toLowerCase().includes('risk') || label.toLowerCase().includes('gap') || label.toLowerCase().includes('time-to') || label.toLowerCase().includes('abandonment'))
        ? 'text-green-500' // Lower risk/time/abandonment is good
        : 'text-rose-500' // Other downward trends might be bad
      : 'text-gray-400'; // Neutral

  const renderTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUp className={`h-4 w-4 ${trendColor}`} />;
    } else if (trend === 'down') {
      return <TrendingDown className={`h-4 w-4 ${trendColor}`} />;
    }
    return null; // Render nothing for 'neutral'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorMap[color] || colorMap.amber} mr-3`}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0"> {/* Added min-w-0 for flex truncation */}
          <p className="text-sm text-gray-500 truncate">{label}</p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-gray-800 truncate">{value}</p>
            <div className="ml-2 flex-shrink-0"> {/* Added flex-shrink-0 */}
              {renderTrendIcon()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chart Placeholder Component
const ChartPlaceholder = ({ text, icon: Icon = BarChart2 }) => (
  // ... (Component remains the same)
  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 border-dashed">
    <div className="text-center">
      <Icon className="h-10 w-10 text-amber-300 mx-auto mb-2" />
      <p className="text-gray-500">{text || "Chart visualization will appear here"}</p>
    </div>
  </div>
);

// Analytics Dashboard
const OrganizationalAnalyticsView = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState('business-impact');
  const [searchQuery, setSearchQuery] = useState('');

  // Define dashboard tabs - ADDED Promotion Readiness Tab
  const tabs = [
    { id: 'business-impact', label: 'Business Impact', icon: TrendingUp },
    { id: 'skill-tracking', label: 'Skill Development', icon: Target },
    { id: 'engagement', label: 'Engagement', icon: Activity },
    { id: 'team-analytics', label: 'Team Analytics', icon: Users },
    { id: 'promotion-planning', label: 'Promotion Readiness', icon: ChevronsUp }, // <-- New Tab
    { id: 'performance', label: 'Performance Impact', icon: Award },
    { id: 'compensation', label: 'Compensation Impact', icon: DollarSign },
    { id: 'workday', label: 'Workday Sync', icon: GitMerge },
  ];

  // Sample metrics data for each tab (ensure keys match tab ids) - ADDED promotion-planning metrics
  const tabMetrics = {
    'business-impact': [
      { label: "Learning ROI", value: "3.2x", icon: TrendingUp, trend: "up", color: "green" },
      { label: "Time-to-Proficiency", value: "-35%", icon: Clock, trend: "down", color: "green" },
      { label: "Productivity Gain", value: "+18%", icon: Activity, trend: "up", color: "amber" },
      { label: "Skills vs Performance", value: "+22%", icon: Target, trend: "up", color: "blue" }
    ],
    'skill-tracking': [
      { label: "Skills Acquired", value: "1,240", icon: Award, trend: "up", color: "amber" },
      { label: "Avg. Mastery Level", value: "72%", icon: Target, trend: "up", color: "indigo" },
      { label: "Critical Skill Gaps", value: "18", icon: TrendingDown, trend: "down", color: "rose" }, // Down is good (fewer gaps)
      { label: "Certifications Earned", value: "342", icon: FileCheck, trend: "up", color: "blue" },
    ],
    'engagement': [
      { label: "Active Learners", value: "86%", icon: Users, trend: "up", color: "blue" },
      { label: "Completion Rate", value: "78%", icon: CheckCircle, trend: "up", color: "green" },
      { label: "Avg. Session Time", value: "24m", icon: Clock, trend: "up", color: "indigo" },
      { label: "Content Rating", value: "4.5 ★", icon: Award, trend: "up", color: "amber" }
    ],
    'team-analytics': [
        { label: "Top Performing Team", value: "Engineering", icon: Award, trend: "neutral", color: "blue" },
        { label: "Cross-Skill Index", value: "65", icon: GitMerge, trend: "up", color: "indigo"},
        { label: "Collaboration Rate", value: "74%", icon: Users, trend: "up", color: "green" },
        { label: "Avg. Team Skill Score", value: "7.8/10", icon: Target, trend: "up", color: "amber"}
    ],
    'promotion-planning': [ // <-- New Metrics for Promotion Planning
      { label: "Promotion Readiness Score (Avg)", value: "7.5/10", icon: UserCheck, trend: "up", color: "blue" },
      { label: "Internal Mobility Rate", value: "68%", icon: Shuffle, trend: "up", color: "green" },
      { label: "High-Potential Flight Risk", value: "8%", icon: AlertTriangle, trend: "down", color: "rose" }, // Down is good (less risk)
      { label: "Avg. Time to Promotion (Key Roles)", value: "2.8 yrs", icon: Clock, trend: "down", color: "indigo" } // Down is good (faster)
    ],
    'workday': [
      { label: "Sync Health", value: "99%", icon: Server, trend: "up", color: "green" },
      { label: "Last Sync", value: "2h ago", icon: Clock, trend: "neutral", color: "indigo" },
      { label: "Synced Records", value: "24K", icon: Database, trend: "up", color: "blue" },
      { label: "Data Conflicts", value: "3", icon: GitMerge, trend: "down", color: "rose" }, // Down is good
    ],
    'performance': [
      { label: "Learning/Perf Correlation", value: "+32%", icon: TrendingUp, trend: "up", color: "green" },
      { label: "Promotion Rate (Learners)", value: "+18%", icon: Award, trend: "up", color: "amber" },
      { label: "High-Performer Skill Delta", value: "+1.5", icon: Target, trend: "up", color: "blue" },
      { label: "Skills in Reviews", value: "86%", icon: FileCheck, trend: "up", color: "indigo"}
    ],
    'compensation': [
      { label: "Learning/Salary Correlation", value: "+16%", icon: DollarSign, trend: "up", color: "green" },
      { label: "Comp Ratio (Skilled)", value: "1.05", icon: TrendingUp, trend: "up", color: "blue" },
      { label: "ROI per $1k Training Spend", value: "$3.2K", icon: Target, trend: "up", color: "amber" },
      { label: "Pay Equity (Skill Adj.)", value: "98%", icon: CheckCircle, trend: "up", color: "indigo" } // Up is good (closer to 100%)
    ]
  };

  // Current tab metrics - Default to business-impact if activeTab metrics don't exist
  const currentMetrics = tabMetrics[activeTab] || tabMetrics['business-impact'];

  // Weekly activity data for engagement tab
  const weeklyData = [
    // ... (Data remains the same)
    { day: 'Mon', minutes: 45, target: 30 },
    { day: 'Tue', minutes: 30, target: 30 },
    { day: 'Wed', minutes: 60, target: 30 },
    { day: 'Thu', minutes: 15, target: 30 },
    { day: 'Fri', minutes: 25, target: 30 },
    { day: 'Sat', minutes: 10, target: 30 },
    { day: 'Sun', minutes: 5, target: 30 }
  ];

  // Tab header information - ADDED Promotion Readiness Header
  const tabHeaders = {
    'business-impact': {
      title: "Business Impact Analytics",
      description: "Connect learning activities to tangible business outcomes and ROI.",
      icon: TrendingUp
    },
    'skill-tracking': {
      title: "Skill Development Analytics",
      description: "Track competency development and skill acquisition across your organization.",
      icon: Target
    },
    'engagement': {
      title: "Engagement Analytics",
      description: "Measure course completion rates and learning activity patterns.",
      icon: Activity
    },
    'team-analytics': {
      title: "Team Performance Analytics",
      description: "Compare learning patterns and outcomes across departments and teams.",
      icon: Users
    },
    'promotion-planning': { // <-- New Header Info
      title: "Promotion Readiness & Pipeline Analytics",
      description: "Analyze internal mobility potential, identify promotion candidates, and assess pipeline health.",
      icon: ChevronsUp
    },
    'workday': {
      title: "Workday Integration Sync",
      description: "Monitor the connection and data flow between the learning platform and Workday.",
      icon: GitMerge
    },
    'performance': {
      title: "Performance Impact Analysis",
      description: "Correlate learning activities with performance evaluations and career progression.",
      icon: Award
    },
    'compensation': {
      title: "Compensation Impact Analysis",
      description: "Analyze how skill development influences compensation and pay equity.",
      icon: DollarSign
    }
    // ... (Other headers remain, can be uncommented if tabs are re-enabled)
  };

  // Get current header info - Default to business-impact if activeTab header doesn't exist
  const currentHeader = tabHeaders[activeTab] || tabHeaders['business-impact'];
  const CurrentHeaderIcon = currentHeader.icon;

  // Learning insights for engagement tab
  const insights = [
    // ... (Data remains the same)
    {
      icon: Clock,
      title: "Peak Learning Time",
      value: "Wednesdays, 10 AM",
      description: "Highest activity period"
    },
    {
      icon: BookOpen,
      title: "Top Content Type",
      value: "Video Courses",
      description: "Most completions"
    },
    {
      icon: TrendingUp,
      title: "Engagement Trend",
      value: "+15%",
      description: "Month-over-month growth"
    }
  ];

  // Render dynamic content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'business-impact':
        // ... (Content remains the same)
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: ROI Analysis */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-green-100 text-green-600 mr-3">
                    <TrendingUp size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Return on Investment (ROI)</h2>
                </div>
                <ChartPlaceholder text="Learning ROI trend over time" icon={TrendingUp} />
              </div>

              {/* Card 2: Skills to Performance */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-blue-100 text-blue-600 mr-3">
                    <Target size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Skills vs. Performance</h2>
                </div>
                <ChartPlaceholder text="Correlation between key skills and performance ratings" icon={Target} />
              </div>
            </div>

            {/* Card 3: Productivity / Time-to-Proficiency */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-amber-100 text-amber-600 mr-3">
                  <Activity size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Productivity & Proficiency</h2>
              </div>

              {/* Mini-stats within the card */}
              <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-1 sm:pr-4 sm:border-r sm:border-gray-200 mb-4 sm:mb-0">
                    <div className="text-sm text-gray-600 mb-1">Time-to-Proficiency</div>
                    <div className="text-2xl font-bold text-green-600">-35%</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="inline-flex items-center font-medium">
                        <TrendingDown size={12} className="mr-1" /> {/* Down is good here */}
                        Faster Ramp-up
                      </span>
                      <span className="ml-1">vs. last year</span>
                    </div>
                  </div>

                  <div className="flex-1 pl-0 sm:pl-4">
                    <div className="text-sm text-gray-600 mb-1">Productivity Impact</div>
                    <div className="text-2xl font-bold text-gray-800">+18%</div>
                    <div className="text-xs text-gray-500 mt-1">
                       Avg. improvement post-training
                    </div>
                  </div>
                </div>
              </div>

              <ChartPlaceholder text="Impact of learning on productivity metrics" icon={Activity} />
            </div>
          </div>
        );

      case 'engagement':
        // ... (Content remains the same, including weekly activity chart)
        const totalMinutes = weeklyData.reduce((sum, day) => sum + day.minutes, 0);
        const maxMinutes = Math.max(...weeklyData.map(d => d.minutes), 60); // Ensure chart height accommodates at least 60 min
        const targetMinutesPerDay = 30; // Assuming fixed target for simplicity

        return (
          <div className="space-y-6">
            {/* Learning Activity Chart Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-amber-100 text-amber-600 mr-3">
                  <Activity size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Weekly Learning Activity</h2>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-500">Daily Activity (minutes)</span>
                  <span className="text-amber-600 font-medium">{totalMinutes} min total this week</span>
                </div>

                <div className="relative mt-3 h-36"> {/* Fixed height for the chart area */}
                  {/* Target line */}
                  <div
                    className="absolute w-full border-t-2 border-dashed border-amber-300 z-0" // z-0 to be behind bars
                    style={{ bottom: `${(targetMinutesPerDay / maxMinutes) * 100}%` }} // Position based on max height
                  >
                    <div className="absolute right-0 -top-2.5 bg-gray-50 text-xs text-gray-500 px-1.5 py-0.5 rounded whitespace-nowrap">
                      {targetMinutesPerDay} min target
                    </div>
                  </div>

                  {/* Bars */}
                  <div className="flex justify-between items-end h-full relative z-10"> {/* z-10 for bars */}
                    {weeklyData.map((day, index) => {
                      const isToday = new Date().getDay() === (index + 1) % 7; // Simple check (Mon=1, Sun=0)
                      const heightPercentage = Math.max(2, (day.minutes / maxMinutes) * 100); // Min height 2%

                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center px-1 flex-1 group cursor-pointer"
                           title={`${day.day}: ${day.minutes} minutes`} // Tooltip
                        >
                          <div className="w-full flex justify-center items-end h-full">
                             {/* Bar */}
                            <div
                              className={`w-3/4 max-w-[28px] relative rounded-t-md transition-all duration-300 ${
                                day.minutes === 0
                                  ? 'bg-gray-200'
                                  : 'bg-amber-400 group-hover:bg-amber-500'
                              }`}
                              style={{ height: `${heightPercentage}%` }}
                            >
                              {/* Today indicator (optional) */}
                              {isToday && day.minutes > 0 && (
                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-600 rounded-full ring-2 ring-white"></div>
                              )}
                            </div>
                          </div>
                          {/* Day label */}
                          <div className={`text-xs font-medium mt-2 transition-colors ${
                              isToday ? 'text-amber-600' : 'text-gray-500 group-hover:text-amber-600'
                          }`}>
                            {day.day}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Weekly summary (moved below chart) */}
              <div className="mt-6 p-4 bg-gradient-to-br from-amber-50 to-gray-50 rounded-xl border border-amber-100/50">
                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <div className="text-sm text-gray-600 mb-1">This week vs. Last week</div>
                      <div className="text-2xl font-bold text-amber-600">
                        <span className="inline-flex items-center text-green-600">
                          <TrendingUp size={20} className="mr-1" />
                          +15%
                        </span>
                      </div>
                       <div className="text-xs text-gray-500 mt-1">
                        ({totalMinutes} min vs {Math.round(totalMinutes / 1.15)} min)
                      </div>
                    </div>
                     <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">Average Session</div>
                        <div className="text-2xl font-bold text-gray-800">24 min</div>
                         <div className="text-xs text-gray-500 mt-1">
                            Completion Rate: 78%
                        </div>
                    </div>
                 </div>
              </div>
            </div> {/* End Learning Activity Card */}

            {/* Learning insights cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, index) => {
                const InsightIcon = insight.icon; // Use correct variable name
                return (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center text-amber-500 mb-2">
                      <div className="p-1.5 bg-amber-100 rounded-lg mr-2 group-hover:scale-110 transition-transform">
                        <InsightIcon size={14} /> {/* Use correct variable */}
                      </div>
                      <div className="text-xs font-medium text-gray-600">{insight.title}</div>
                    </div>
                    <div className="font-semibold text-gray-800 text-base group-hover:text-amber-600 transition-colors">
                      {insight.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{insight.description}</div>
                  </div>
                );
              })}
            </div>

            {/* Content engagement analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-amber-100 text-amber-600 mr-3">
                  <BookOpen size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Content Engagement</h2>
              </div>
              <ChartPlaceholder text="Engagement by content type (Video, Article, Quiz)" icon={BookOpen} />
            </div>
          </div>
        );

      case 'team-analytics':
        // ... (Content remains the same)
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Department Skill Distribution */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-blue-100 text-blue-600 mr-3">
                    <Users size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Team Skill Overview</h2>
                </div>
                <ChartPlaceholder text="Skill distribution across teams/departments" icon={Users} />
              </div>

              {/* Card 2: High/Low Performing Teams */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-green-100 text-green-600 mr-3">
                    <Award size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Team Performance Comparison</h2>
                </div>
                <ChartPlaceholder text="Learning metrics for top/bottom performing teams" icon={Award} />
              </div>
            </div>

            {/* Card 3: Collaborative Learning */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-indigo-100 text-indigo-600 mr-3">
                  <Users size={18} /> {/* Changed color */}
                </div>
                <h2 className="text-lg font-medium text-gray-800">Collaborative Learning</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                  <div className="text-xl font-bold text-indigo-600">74%</div>
                  <div className="text-sm text-gray-600">Peer Interaction Rate</div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                  <div className="text-xl font-bold text-indigo-600">156</div>
                  <div className="text-sm text-gray-600">Knowledge Shares</div>
                </div>
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                  <div className="text-xl font-bold text-indigo-600">28%</div>
                  <div className="text-sm text-gray-600">Mentorship Participation</div>
                </div>
              </div>

              <ChartPlaceholder text="Effectiveness of social/collaborative features" icon={Users} />
            </div>
          </div>
        );

      // *** NEW CASE for Promotion Planning ***
      case 'promotion-planning':
        return (
          <div className="space-y-6">
            {/* Card 1: Readiness Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-blue-100 text-blue-600 mr-3">
                  <UserCheck size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Promotion Readiness Distribution</h2>
              </div>
              <ChartPlaceholder text="Distribution of readiness scores by department, role, or level" icon={PieChart} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 2: Pipeline Analysis */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-green-100 text-green-600 mr-3">
                    <Filter size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Internal Promotion Pipeline</h2>
                </div>
                <ChartPlaceholder text="Pipeline strength for key roles (e.g., Manager, Director)" icon={Filter} />
              </div>

              {/* Card 3: Promotion Equity/Bias Check */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-indigo-100 text-indigo-600 mr-3">
                    <Scale size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Promotion Equity Analysis</h2>
                </div>
                <ChartPlaceholder text="Promotion rate comparison across demographics (adjusted for role/perf)" icon={Scale} />
              </div>
            </div>

            {/* Card 4: Flight Risk & Key Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-rose-100 text-rose-600 mr-3">
                  <AlertTriangle size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Flight Risk & Skill Impact</h2>
              </div>
              <div className="p-4 bg-gradient-to-br from-rose-50 to-gray-50 rounded-xl border border-rose-100/50 mb-4">
                 <div className="flex flex-col sm:flex-row sm:items-center">
                   <div className="flex-1 sm:pr-4 sm:border-r sm:border-gray-200 mb-4 sm:mb-0">
                     <div className="text-sm text-gray-600 mb-1">High-Potential Flight Risk</div>
                     <div className="text-2xl font-bold text-rose-600">8%</div>
                     <div className="text-xs text-gray-500 mt-1">
                       <span className="inline-flex items-center font-medium text-green-600">
                           <TrendingDown size={12} className="mr-1"/> {/* Down is good here */}
                           -2%
                       </span>
                       <span className="ml-1">vs last Q</span>
                     </div>
                   </div>
                   <div className="flex-1 pl-0 sm:pl-4">
                     <div className="text-sm text-gray-600 mb-1">Top Skill for Promoted Staff</div>
                     <div className="text-xl font-semibold text-gray-800">Strategic Thinking</div>
                     <div className="text-xs text-gray-500 mt-1">
                       Based on recent promotion data
                     </div>
                   </div>
                 </div>
               </div>
              <ChartPlaceholder text="Analysis of high-potentials nearing promotion window & key skills driving mobility" icon={Target} />
            </div>
          </div>
        );

      case 'workday':
        // ... (Content remains the same)
        return (
          <div className="space-y-6">
             {/* Integration Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-blue-100 text-blue-600 mr-3">
                  <GitMerge size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Workday Integration Status</h2>
              </div>

              {/* Connected Modules */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl border border-blue-100/50 mb-6">
                 <h3 className="text-sm font-medium text-gray-700 mb-3">Connected Workday Modules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['HCM Core', 'Performance', 'Compensation'].map(module => (
                     <div key={module} className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                       <div className="p-1.5 rounded-md bg-green-100 text-green-600 mr-3 flex-shrink-0">
                         <CheckCircle size={16} />
                       </div>
                       <div>
                         <div className="font-medium text-sm text-gray-800">{module}</div>
                         <div className="text-xs text-gray-500">Sync Active</div>
                       </div>
                     </div>
                  ))}
                </div>
              </div>

              {/* Sync Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Sync Schedule</label>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                     <span className="text-sm text-gray-600">Daily at 2:00 AM UTC</span>
                    <button className="px-3 py-1 text-amber-600 bg-amber-100 rounded-md text-xs font-medium hover:bg-amber-200 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Last Successful Sync</label>
                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                     <span className="text-sm text-gray-600">Today, 2:03 AM UTC</span>
                    <button className="px-3 py-1 text-amber-600 bg-amber-100 rounded-md text-xs font-medium hover:bg-amber-200 transition-colors">
                      Run Now
                    </button>
                  </div>
                </div>
              </div>

              <ChartPlaceholder text="Data synchronization history & error logs" icon={Database} />
            </div>

            {/* Data Mapping & Health Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-indigo-100 text-indigo-600 mr-3">
                    <Layers size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Data Mapping</h2>
                </div>
                <ChartPlaceholder text="Learning fields mapped to Workday fields" icon={Layers} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-green-100 text-green-600 mr-3">
                    <Server size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Integration Health</h2>
                </div>
                <ChartPlaceholder text="API uptime, latency, and data integrity checks" icon={Server} />
              </div>
            </div>
          </div>
        );

      case 'performance':
        // ... (Content remains the same)
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Card 1: Learning/Performance Correlation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-green-100 text-green-600 mr-3">
                    <TrendingUp size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Learning & Performance Link</h2>
                </div>
                <ChartPlaceholder text="Correlation: Course completions vs. Performance ratings" icon={TrendingUp} />
              </div>

              {/* Card 2: Promotion Velocity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-amber-100 text-amber-600 mr-3">
                    <Award size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Promotion Velocity</h2>
                </div>
                <ChartPlaceholder text="Impact of skill development on promotion rates" icon={Award} />
              </div>
            </div>

             {/* Card 3: Skills Impact on Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-blue-100 text-blue-600 mr-3">
                  <Target size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Skills Impact on Reviews</h2>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl border border-blue-100/50 mb-4">
                 <h3 className="text-sm font-medium text-gray-700 mb-3">Performance Impact by Skill Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Technical Skills</div>
                    <div className="text-xl font-bold text-blue-600">+28%</div>
                    <div className="text-xs text-gray-600">Avg. Rating Lift</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Leadership Skills</div>
                    <div className="text-xl font-bold text-blue-600">+35%</div>
                    <div className="text-xs text-gray-600">Avg. Rating Lift</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Soft Skills</div>
                    <div className="text-xl font-bold text-blue-600">+24%</div>
                    <div className="text-xs text-gray-600">Avg. Rating Lift</div>
                  </div>
                </div>
              </div>

              <ChartPlaceholder text="Specific skills linked to high performance ratings" icon={Target} />
            </div>
          </div>
        );

      case 'compensation':
        // ... (Content remains the same)
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Card 1: Salary Impact Analysis */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-green-100 text-green-600 mr-3">
                    <DollarSign size={18} />
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">Salary Impact Analysis</h2>
                </div>
                <ChartPlaceholder text="Correlation: Skill acquisition vs. Salary growth" icon={DollarSign} />
              </div>

              {/* Card 2: Compensation Ratio */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
                 <div className="flex items-center mb-4">
                    <div className="p-2 rounded-md bg-blue-100 text-blue-600 mr-3">
                        <TrendingUp size={18} />
                    </div>
                    <h2 className="text-lg font-medium text-gray-800">Compensation Ratio vs Skills</h2>
                 </div>
                 <ChartPlaceholder text="Compa-ratio analysis for employees with critical skills" icon={TrendingUp}/>
              </div>
            </div> {/* End Grid */}

             {/* Card 3: Return on Learning Investment */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-amber-100 text-amber-600 mr-3">
                  <Target size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Return on Learning Investment (Comp)</h2>
              </div>

              <div className="p-4 bg-gradient-to-br from-amber-50 to-gray-50 rounded-xl border border-amber-100/50 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex-1 sm:pr-4 sm:border-r sm:border-gray-200 mb-4 sm:mb-0">
                    <div className="text-sm text-gray-600 mb-1">Salary ROI per $1k Training</div>
                    <div className="text-2xl font-bold text-amber-600">$3.2K</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span className="inline-flex items-center text-green-600 font-medium">
                        <TrendingUp size={12} className="mr-1" />
                        +0.4K
                      </span>
                      <span className="ml-1">vs last year</span>
                    </div>
                  </div>

                  <div className="flex-1 pl-0 sm:pl-4">
                    <div className="text-sm text-gray-600 mb-1">Avg. Salary Increase (High Skill)</div>
                    <div className="text-2xl font-bold text-gray-800">+16%</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Compared to baseline
                    </div>
                  </div>
                </div>
              </div>

              <ChartPlaceholder text="Training investment vs. compensation impact modeling" icon={Target} />
            </div>
          </div> // End space-y
        ); // End return compensation

      default:
        // ... (Default content remains the same)
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-amber-100 text-amber-600 mr-3">
                  <CurrentHeaderIcon size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Primary Analysis</h2>
              </div>
              <ChartPlaceholder text={`Data for ${currentHeader.title}`} icon={CurrentHeaderIcon} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-gray-100 text-gray-600 mr-3"> {/* Neutral color */}
                  <PieChart size={18} />
                </div>
                <h2 className="text-lg font-medium text-gray-800">Secondary Analysis</h2>
              </div>
              <ChartPlaceholder text="Additional metrics breakdown" icon={PieChart} />
            </div>
          </div>
        );
    } // End switch
  }; // End renderTabContent

  return (
    <div className="w-full max-w-full mx-auto px-2 sm:px-6 py-8 min-h-screen"> {/* Added bg color */}
      {/* Enhanced Header with search */}
      {/* ... (Header section remains the same) */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 flex items-center"> {/* Darker text */}
            <CurrentHeaderIcon size={24} className="mr-3 text-amber-500 flex-shrink-0" /> {/* Added flex-shrink */}
            {currentHeader.title}
          </h1>
          <p className="mt-1 text-gray-600"> {/* Darker text */}
            {currentHeader.description}
          </p>
        </div>

        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent w-full sm:w-64 placeholder-gray-400" // Adjusted width
            placeholder="Search analytics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Notification banner (optional styling improvement) */}
      {/* ... (Notification banner remains the same) */}
      <div className="mb-8 p-4 bg-white rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between border border-amber-200 shadow-sm gap-3">
        <div className="flex items-center w-full sm:w-auto">
          <div className="bg-amber-100 p-2.5 rounded-lg mr-4 flex-shrink-0">
            <Bell size={18} className="text-amber-600" /> {/* Darker icon */}
          </div>
          <span className="text-sm text-gray-700">
            <span className="font-semibold text-gray-800">New Integration:</span> Connect Workday Performance data for advanced insights.
          </span>
        </div>
        <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md w-full sm:w-auto sm:ml-4 flex-shrink-0">
          Configure Now
        </button>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"> {/* Adjusted grid cols & margin */}
        {currentMetrics.map((metric, index) => (
          <MetricCard
            key={`${activeTab}-${index}`} // More robust key
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            trend={metric.trend}
            color={metric.color}
          />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default OrganizationalAnalyticsView;