// src/services/apiService.js

// API base URL - change this to your FastAPI server URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Utility function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    // The request was made and the server responded with a status code outside of 2xx
    return {
      status: error.response.status,
      message: error.response.data.detail || 'An error occurred',
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

// Generic GET request function
const get = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { status: response.status, data: errorData } };
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Generic POST request function
const post = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { status: response.status, data: errorData } };
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Generic PUT request function
const put = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { status: response.status, data: errorData } };
    }
    
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// User API services
const userService = {
  getUserProfile: () => get('users/profile'),
  updateUserProfile: (data) => put('users/profile', data),
  getUserAvatar: (userId) => `${API_BASE_URL}/users/${userId}/avatar`,
  uploadAvatar: (formData) => {
    return fetch(`${API_BASE_URL}/users/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }).then(response => {
      if (!response.ok) throw new Error('Failed to upload avatar');
      return response.json();
    }).catch(handleApiError);
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

// Export all services
export {
  userService,
  courseService,
  assessmentService,
  communityService
};