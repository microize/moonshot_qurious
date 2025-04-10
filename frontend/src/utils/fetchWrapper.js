// src/utils/fetchWrapper.js

/**
 * Enhanced fetch wrapper with error handling and authentication
 * This utility streamlines API calls to our FastAPI backend
 */

// API configuration
const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    DEFAULT_HEADERS: {
      'Content-Type': 'application/json'
    },
    TIMEOUT: 15000 // 15 seconds timeout
  };
  
// Export the base URL for use in other parts of the app
export const API_BASE_URL = API_CONFIG.BASE_URL;

// Add authentication token if it exists
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Timeout promise for fetch requests
const timeoutPromise = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);
  });
};

// Error handler
const handleError = (error) => {
  console.error('API Error:', error);
  
  // Handle different error types
  if (error.status === 401) {
    // Authentication error - redirect to login
    localStorage.removeItem('token');
    window.location.href = '/login';
    return { error: 'Authentication required', status: 401 };
  }
  
  if (error.status === 403) {
    return { error: 'You do not have permission to access this resource', status: 403 };
  }
  
  if (error.status === 404) {
    return { error: 'Resource not found', status: 404 };
  }
  
  if (error.status >= 500) {
    return { error: 'Server error. Please try again later', status: error.status };
  }
  
  return { 
    error: error.message || 'An unknown error occurred', 
    status: error.status || 0 
  };
};

// Process response
const processResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  if (!response.ok) {
    const error = {
      status: response.status,
      statusText: response.statusText
    };
    
    if (contentType && contentType.includes('application/json')) {
      error.data = await response.json();
    } else {
      error.data = await response.text();
    }
    
    throw error;
  }
  
  // Handle different content types
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  
  if (contentType && contentType.includes('text/plain')) {
    return await response.text();
  }
  
  return await response.blob();
};

// Main fetch wrapper
const fetchWrapper = {
  // GET request
  get: async (endpoint, options = {}) => {
    try {
      const url = `${API_CONFIG.BASE_URL}/${endpoint}`;
      const headers = {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...getAuthHeaders(),
        ...options.headers
      };
      
      const response = await Promise.race([
        fetch(url, {
          method: 'GET',
          headers,
          ...options
        }),
        timeoutPromise(API_CONFIG.TIMEOUT)
      ]);
      
      return await processResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
  
  // POST request
  post: async (endpoint, data, options = {}) => {
    try {
      const url = `${API_CONFIG.BASE_URL}/${endpoint}`;
      const headers = {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...getAuthHeaders(),
        ...options.headers
      };
      
      const response = await Promise.race([
        fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(data),
          ...options
        }),
        timeoutPromise(API_CONFIG.TIMEOUT)
      ]);
      
      return await processResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
  
  // PUT request
  put: async (endpoint, data, options = {}) => {
    try {
      const url = `${API_CONFIG.BASE_URL}/${endpoint}`;
      const headers = {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...getAuthHeaders(),
        ...options.headers
      };
      
      const response = await Promise.race([
        fetch(url, {
          method: 'PUT',
          headers,
          body: JSON.stringify(data),
          ...options
        }),
        timeoutPromise(API_CONFIG.TIMEOUT)
      ]);
      
      return await processResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
  
  // DELETE request
  delete: async (endpoint, options = {}) => {
    try {
      const url = `${API_CONFIG.BASE_URL}/${endpoint}`;
      const headers = {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...getAuthHeaders(),
        ...options.headers
      };
      
      const response = await Promise.race([
        fetch(url, {
          method: 'DELETE',
          headers,
          ...options
        }),
        timeoutPromise(API_CONFIG.TIMEOUT)
      ]);
      
      return await processResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },
  
  // File upload (multipart/form-data)
  upload: async (endpoint, formData, options = {}) => {
    try {
      const url = `${API_CONFIG.BASE_URL}/${endpoint}`;
      const headers = {
        ...getAuthHeaders(),
        ...options.headers
      };
      
      const response = await Promise.race([
        fetch(url, {
          method: 'POST',
          headers,
          body: formData,
          ...options
        }),
        timeoutPromise(API_CONFIG.TIMEOUT)
      ]);
      
      return await processResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
};

export default fetchWrapper;