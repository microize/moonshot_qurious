// src/hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';
import fetchWrapper from '../utils/fetchWrapper';

/**
 * Hook for handling API data fetching with loading, error states
 * @param {string} endpoint - API endpoint to fetch from
 * @param {Object} options - Optional fetch configuration options
 * @param {boolean} immediate - Whether to fetch immediately on mount
 */
export const useFetch = (endpoint, options = {}, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchWrapper.get(endpoint, options);
      
      if (response.error) {
        setError(response.error);
      } else {
        setData(response);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);
  
  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);
  
  return { data, loading, error, refetch: fetchData };
};

/**
 * Hook for handling API mutations (POST, PUT, DELETE)
 * @param {string} endpoint - API endpoint to send data to
 * @param {string} method - HTTP method ('post', 'put', 'delete')
 * @param {Object} options - Optional fetch configuration options
 */
export const useMutation = (endpoint, method = 'post', options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const mutate = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      switch (method.toLowerCase()) {
        case 'post':
          response = await fetchWrapper.post(endpoint, payload, options);
          break;
        case 'put':
          response = await fetchWrapper.put(endpoint, payload, options);
          break;
        case 'delete':
          response = await fetchWrapper.delete(endpoint, options);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      
      if (response.error) {
        setError(response.error);
        return { success: false, error: response.error };
      } else {
        setData(response);
        return { success: true, data: response };
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [endpoint, method, options]);
  
  return { mutate, data, loading, error };
};

/**
 * Hook for uploading files
 * @param {string} endpoint - API endpoint for file upload
 * @param {Object} options - Optional fetch configuration options
 */
export const useFileUpload = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const upload = useCallback(async (file, additionalData = {}) => {
    setLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Add any additional data to form data
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      // Setup for progress tracking (if supported)
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progressPercent = Math.round((event.loaded / event.total) * 100);
          setProgress(progressPercent);
        }
      });
      
      // Create a promise that will resolve or reject based on XHR events
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.open('POST', `${fetchWrapper.baseUrl}/${endpoint}`);
        
        // Add auth headers if available
        const token = localStorage.getItem('token');
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
        
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };
        
        xhr.onerror = () => {
          reject(new Error('Upload failed'));
        };
        
        xhr.send(formData);
      });
      
      const response = await uploadPromise;
      setData(response);
      setProgress(100);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during upload';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [endpoint]);
  
  return { upload, data, loading, error, progress };
};

// Custom hooks for specific data types
export const useCourses = () => {
  return useFetch('courses');
};

export const useUserCourses = () => {
  return useFetch('users/courses');
};

export const useAssessments = () => {
  return useFetch('assessments');
};

export const useLeaderboard = () => {
  return useFetch('community/leaderboard');
};

export const useUserProfile = () => {
  return useFetch('users/profile');
};

export const useUpdateProfile = () => {
  return useMutation('users/profile', 'put');
};

export const useAvatarUpload = () => {
  return useFileUpload('users/avatar');
};