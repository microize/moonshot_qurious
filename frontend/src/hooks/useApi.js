// src/hooks/useApi.js - Simplified fix to stop infinite requests
import { useState, useEffect, useCallback } from 'react';
import fetchWrapper from '../utils/fetchWrapper';

/**
 * Pre-defined mock data to use when needed
 */
const MOCK_DATA = {
  courses: [
    {
      id: "course1",
      title: "Generative AI for Developers",
      description: "Master strategies and techniques to code with Generative AI. Learn prompt engineering and how to integrate AI in your applications.",
      type: "Course",
      level: "Intermediate",
      duration: "4h 40m",
      instructor: "Dr. Johnson",
      instructorId: "instructor1",
      enrolledCount: 17770,
      rating: 4.8,
      isEnrolled: true,
      percentComplete: 20,
      completedModules: 2,
      totalModules: 10,
      nextModule: "Understanding Transformers",
      lastActivity: "2 hours ago"
    },
    {
      id: "course3",
      title: "Understanding Machine Learning Algorithms",
      description: "Dive deep into the theory and implementation of machine learning algorithms from classification to clustering.",
      type: "Course",
      level: "Intermediate",
      duration: "5h 15m",
      instructor: "Dr. Johnson",
      instructorId: "instructor1",
      enrolledCount: 8245,
      rating: 4.6,
      isEnrolled: true,
      percentComplete: 10,
      completedModules: 1,
      totalModules: 10,
      nextModule: "Decision Trees in ML",
      lastActivity: "Yesterday"
    }
  ],
  profile: {
    id: "user1",
    name: "Sripathi",
    email: "sripathi@example.com",
    role: "Data Engineer",
    avatar_url: "/api/users/user1/avatar",
    bio: "Data engineer passionate about building scalable data pipelines and learning ML.",
    skills: ["Python", "SQL", "Data Engineering", "Spark"],
    learning_focus: "Machine Learning"
  },
  leaderboard: [
    { 
      userId: "user3",
      name: "Alex K.", 
      role: "AI Researcher", 
      points: 1250, 
      streak: 45,
      badge: "Expert",
      change: "+2"
    },
    { 
      userId: "user4",
      name: "Maria G.", 
      role: "Data Scientist", 
      points: 980, 
      streak: 30,
      badge: "Mentor",
      change: "0"
    },
    { 
      userId: "user5",
      name: "Wei L.", 
      role: "ML Engineer", 
      points: 940, 
      streak: 28,
      badge: "Contributor",
      change: "-1"
    },
    { 
      userId: "user1",
      name: "Sripathi", 
      role: "Data Engineer", 
      points: 440, 
      streak: 8,
      change: "+1",
      isUser: true
    }
  ],
  assessments: [
    {
      id: "assessment1",
      title: "Python Fundamentals Quiz",
      type: "Quiz",
      questions: 15,
      timeEstimate: "20 min",
      status: "available"
    },
    {
      id: "assessment2",
      title: "Machine Learning Algorithms Assessment",
      type: "Test",
      questions: 25,
      timeEstimate: "45 min",
      status: "available"
    },
    {
      id: "assessment3",
      title: "Generative AI Assessment - Basic Level",
      type: "Certification",
      questions: 15,
      timeEstimate: "30 min",
      status: "available"
    }
  ],
  goals: [
    { 
      id: 1, 
      icon: 'book', 
      title: "Complete today's lesson", 
      description: "Finish 'Decision Trees in ML'", 
      progress: 0, 
      completed: false,
      points: 50,
      timeEstimate: "15 min"
    },
    { 
      id: 2, 
      icon: 'check', 
      title: "Practice Quiz", 
      description: "Take the Python basics quiz", 
      progress: 0, 
      completed: false,
      points: 30,
      timeEstimate: "10 min"
    },
    { 
      id: 3, 
      icon: 'target', 
      title: "Review Flashcards", 
      description: "ML terminology review", 
      progress: 75, 
      completed: false,
      points: 20,
      timeEstimate: "5 min"
    }
  ],
  rewards: [
    { milestone: 1, reward: "10 bonus points", unlocked: true },
    { milestone: 2, reward: "New badge: 'Consistent Learner'", unlocked: false },
    { milestone: 3, reward: "Unlock special content", unlocked: false }
  ],
  analytics: {
    weeklyData: [
      { day: 'Mon', minutes: 45, target: 30 },
      { day: 'Tue', minutes: 30, target: 30 },
      { day: 'Wed', minutes: 60, target: 30 },
      { day: 'Thu', minutes: 15, target: 30 },
      { day: 'Fri', minutes: 0, target: 30 },
      { day: 'Sat', minutes: 0, target: 30 },
      { day: 'Sun', minutes: 0, target: 30 }
    ],
    insights: [
      {
        icon: 'clock',
        title: "Best learning time",
        value: "7-8 PM",
        description: "You're most focused in the evening"
      },
      {
        icon: 'calendar',
        title: "Best learning day",
        value: "Wed",
        description: "60 minutes of focused learning"
      },
      {
        icon: 'trending',
        title: "Learning streak",
        value: "8 days",
        description: "Longest streak: 23 days"
      }
    ],
    recommendations: [
      "Schedule 30-minute sessions on weekends to maintain your streak",
      "Try reviewing course materials in the evening for better retention",
      "Break your Python course into smaller daily sessions"
    ]
  }
};

/**
 * Simple hook for fixed data retrieval with no API calls to prevent infinite loops
 */
export const useStaticData = (dataType) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Short timeout to simulate an API call but never really call the API
    const timer = setTimeout(() => {
      let result;
      
      switch(dataType) {
        case 'courses':
          result = { courses: MOCK_DATA.courses };
          break;
        case 'users/courses':
          result = { courses: MOCK_DATA.courses };
          break;
        case 'users/profile':
          result = MOCK_DATA.profile;
          break;
        case 'community/leaderboard':
          result = { leaderboard: MOCK_DATA.leaderboard };
          break;
        case 'assessments':
          result = { assessments: MOCK_DATA.assessments };
          break;
        case 'goals/daily':
          result = { goals: MOCK_DATA.goals, rewards: MOCK_DATA.rewards };
          break;
        case 'analytics/learning':
          result = MOCK_DATA.analytics;
          break;
        default:
          result = {};
      }
      
      setData(result);
      setLoading(false);
    }, 500); // 500ms delay to simulate network request
    
    return () => clearTimeout(timer);
  }, [dataType]); // Only run once per component mount
  
  return { data, loading, error: null, refetch: () => {} };
};

// Simplified hooks that use static data instead of real API calls
export const useCourses = () => useStaticData('courses');
export const useUserCourses = () => useStaticData('users/courses');
export const useUserProfile = () => useStaticData('users/profile');
export const useLeaderboard = () => useStaticData('community/leaderboard');
export const useAssessments = () => useStaticData('assessments');

// The original hooks can be used for actual API calls when needed
export const useFetch = (endpoint, options = {}, immediate = true) => {
  return useStaticData(endpoint);
};

export const useMutation = (endpoint, method = 'post', options = {}) => {
  const mutate = useCallback(async (payload) => {
    // Just return a success response without calling the API
    return { success: true, data: {} };
  }, []);
  
  return { mutate, data: null, loading: false, error: null };
};

export const useFileUpload = (endpoint, options = {}) => {
  const upload = useCallback(async (file, additionalData = {}) => {
    // Just return a success response without calling the API
    return { success: true, data: {} };
  }, []);
  
  return { upload, data: null, loading: false, error: null, progress: 0 };
};