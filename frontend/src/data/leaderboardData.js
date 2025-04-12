// data/leaderboardData.js

export const leaderboardData = [
    { 
      name: "Alex K.", 
      role: "AI Researcher", 
      points: 1250, 
      streak: 45,
      avatar: "/assets/images/avatar-placeholder.png", 
      badge: "Expert",
      change: "+2"
    },
    { 
      name: "Maria G.", 
      role: "Data Scientist", 
      points: 980, 
      streak: 30,
      avatar: "/assets/images/avatar-placeholder.png",
      badge: "Mentor",
      change: "0"
    },
    { 
      name: "Wei L.", 
      role: "ML Engineer", 
      points: 940, 
      streak: 28,
      avatar: "/assets/images/avatar-placeholder.png",
      badge: "Contributor",
      change: "-1"
    },
    { 
      name: "Sripathi", 
      role: "Data Engineer", 
      points: 440, 
      streak: 8,
      avatar: "/assets/images/avatar-placeholder.png",
      isUser: true,
      change: "+1"
    },
    { 
      name: "Anjali", 
      role: "Data Scientist", 
      points: 680, 
      streak: 15,
      avatar: "/assets/images/avatar-placeholder.png",
      change: "+3",
      isOnline: true
    }
  ];
  
  export const categories = [
    { id: 'global', name: 'Global', active: true },
    { id: 'monthly', name: 'This Month', active: false },
    { id: 'weekly', name: 'This Week', active: false },
    { id: 'friends', name: 'Friends', active: false },
  ];
  
  export const achievementStats = [
    { title: "Total Points", value: "440", icon: "Award", color: "text-purple-500" },
    { title: "Current Streak", value: "8 days", icon: "TrendingUp", color: "text-green-500" },
    { title: "Ranking", value: "#1,240", icon: "BarChart2", color: "text-blue-500" },
    { title: "Best Day", value: "Wednesday", icon: "Calendar", color: "text-yellow-500" },
  ];
  
  export const recentBadges = [
    { name: "Fast Learner", description: "Complete 5 modules in a week", icon: "TrendingUp" },
    { name: "Helper", description: "Answer 10 community questions", icon: "Users" },
  ];
  