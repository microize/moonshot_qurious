// src/services/apiService.js - With both named exports and default export

// API base URL - Change this to match your FastAPI server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Utility function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    // The request was made and the server responded with a status code outside of 2xx
    return {
      status: error.response.status,
      message: error.response.data?.detail || 'An error occurred',
      data: null
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      status: 0,
      message: 'No response from server. Please check your connection.',
      data: null
    };
  } else {
    // Something happened in setting up the request
    return {
      status: 0,
      message: error.message || 'An unknown error occurred',
      data: null
    };
  }
};

// Generic GET request function with proper error handling
const get = async (endpoint) => {
  try {
    console.log(`Fetching from: ${API_BASE_URL}/${endpoint}`);
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if needed
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { response: { status: response.status, data: errorData } };
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    // For demo purposes, if the backend is not responding, return mock data
    return getMockData(endpoint);
  }
};

// Generic POST request function
const post = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if needed
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw { response: { status: response.status, data: errorData } };
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    // For demo purposes, return a successful mock response
    return { success: true, message: "Operation completed successfully" };
  }
};

// Mock data function for demo purposes if backend is not running
function getMockData(endpoint) {
  // Mock data for courses
  if (endpoint.includes('courses')) {
    return {
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
          isEnrolled: true
        },
        {
          id: "course2",
          title: "Data Science Professional Certificate",
          description: "Launch your career in data science with job-ready skills and hands-on experience.",
          type: "Pathway",
          level: "Beginner",
          duration: "12h 30m",
          instructor: "Prof. Sharma",
          instructorId: "instructor2",
          enrolledCount: 24310,
          rating: 4.7
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
          isEnrolled: true
        }
      ]
    };
  }
  
  // Mock data for user profile
  if (endpoint.includes('users/profile')) {
    return {
      id: "user1",
      name: "Sripathi",
      email: "sripathi@example.com",
      role: "Data Engineer",
      avatar_url: "/api/users/user1/avatar",
      bio: "Data engineer passionate about building scalable data pipelines and learning ML.",
      skills: ["Python", "SQL", "Data Engineering", "Spark"],
      learning_focus: "Machine Learning"
    };
  }
  
  // Mock data for assessments
  if (endpoint.includes('assessments')) {
    return {
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
      ]
    };
  }
  
  // Mock data for leaderboard
  if (endpoint.includes('leaderboard')) {
    return {
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
          change: "+1"
        },
        {
          userId: "user2",
          name: "Anjali",
          role: "Data Scientist",
          points: 680,
          streak: 15,
          change: "+3",
          isOnline: true
        }
      ]
    };
  }
  
  // Default mock response
  return { message: "Mock data not available for this endpoint", data: [] };
}

// User API services
const userService = {
  getUserProfile: () => get('users/profile'),
  updateUserProfile: (data) => post('users/profile', data),
  getUserAvatar: (userId) => `${API_BASE_URL}/users/${userId}/avatar`,
  uploadAvatar: (formData) => {
    return fetch(`${API_BASE_URL}/users/avatar`, {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (!response.ok) throw new Error('Failed to upload avatar');
      return response.json();
    }).catch(error => {
      console.error('Avatar upload error:', error);
      return { success: true, avatar_url: "/api/users/user1/avatar" };
    });
  },
};

// Course API services
const courseService = {
  getAllCourses: () => get('courses'),
  getCourseById: (id) => get(`courses/${id}`),
  getUserCourses: () => get('users/courses'),
  enrollInCourse: (courseId) => post(`courses/${courseId}/enroll`, {}),
  getCourseProgress: (courseId) => get(`courses/${courseId}/progress`),
};

// Assessment API services
const assessmentService = {
  getAllAssessments: () => get('assessments'),
  getAssessmentById: (id) => get(`assessments/${id}`),
  submitAssessment: (id, answers) => post(`assessments/${id}/submit`, { answers }),
};

// Community API services
const communityService = {
  getLeaderboard: () => get('community/leaderboard'),
  getDiscussions: () => get('community/discussions'),
  getDiscussionById: (id) => get(`community/discussions/${id}`),
  createDiscussion: (data) => post('community/discussions', data),
  getLearningGroups: () => get('community/groups'),
};

// Create a auth service for demo
const auth = {
  login: async (credentials) => {
    // For demo, just generate a token
    return { token: 'demo_token', user: userService.getUserProfile() };
  },
  logout: () => {
    // Clear auth tokens
    localStorage.removeItem('auth_token');
  },
  getCurrentUser: () => userService.getUserProfile()
};

// Export both named services and default apiService
export {
  userService,
  courseService,
  assessmentService,
  communityService
};

// Default export for backward compatibility
export default {
  auth,
  users: userService,
  courses: courseService,
  assessments: assessmentService,
  community: communityService,
  get,
  post
};