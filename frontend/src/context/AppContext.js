// context/AppContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/apiService';

// Create context
const AppContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  courses: [],
  enrolledCourses: [],
  notifications: [],
  error: null,
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_COURSES: 'SET_COURSES',
  SET_ENROLLED_COURSES: 'SET_ENROLLED_COURSES',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        enrolledCourses: [],
      };
    case ActionTypes.SET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case ActionTypes.SET_ENROLLED_COURSES:
      return {
        ...state,
        enrolledCourses: action.payload,
      };
    case ActionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create a custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          dispatch({ type: ActionTypes.SET_LOADING, payload: true });
          // Fetch current user
          const userData = await apiService.auth.getCurrentUser();
          dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: userData });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        localStorage.removeItem('auth_token');
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };

    checkAuthStatus();
  }, []);

  // Load courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        const response = await apiService.courses.getAll();
        dispatch({ type: ActionTypes.SET_COURSES, payload: response.courses });
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };

    loadCourses();
  }, []);

  // Load enrolled courses if user is authenticated
  useEffect(() => {
    if (state.isAuthenticated) {
      const loadEnrolledCourses = async () => {
        try {
          // This would be a separate endpoint in a real API
          const response = await apiService.courses.getAll({ enrolled: true });
          dispatch({ type: ActionTypes.SET_ENROLLED_COURSES, payload: response.courses });
        } catch (error) {
          console.error('Failed to load enrolled courses:', error);
        }
      };

      loadEnrolledCourses();
    }
  }, [state.isAuthenticated]);

  // Define value to be provided by the context
  const value = {
    ...state,
    actions: {
      login: async (credentials) => {
        try {
          dispatch({ type: ActionTypes.SET_LOADING, payload: true });
          const response = await apiService.auth.login(credentials);
          localStorage.setItem('auth_token', response.token);
          dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: response.user });
          return response.user;
        } catch (error) {
          dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
          throw error;
        } finally {
          dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
      },
      logout: () => {
        apiService.auth.logout();
        dispatch({ type: ActionTypes.LOGOUT });
      },
      enrollInCourse: async (courseId) => {
        try {
          dispatch({ type: ActionTypes.SET_LOADING, payload: true });
          await apiService.courses.enrollInCourse(courseId);
          // Refresh enrolled courses
          const response = await apiService.courses.getAll({ enrolled: true });
          dispatch({ type: ActionTypes.SET_ENROLLED_COURSES, payload: response.courses });
        } catch (error) {
          dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
          throw error;
        } finally {
          dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
      },
      updateCourseProgress: async (courseId, progressData) => {
        try {
          await apiService.courses.updateProgress(courseId, progressData);
          // Optionally refresh enrolled courses to get updated progress
          const response = await apiService.courses.getAll({ enrolled: true });
          dispatch({ type: ActionTypes.SET_ENROLLED_COURSES, payload: response.courses });
        } catch (error) {
          console.error('Failed to update progress:', error);
        }
      },
      loadNotifications: async () => {
        try {
          // This would be a real endpoint in production
          const notifications = [
            {
              id: 1,
              title: "Achievement Unlocked",
              message: "You've earned the 'Early Bird' badge for studying before 9 AM!",
              time: "2 hours ago",
              read: false,
              type: "achievement"
            },
            {
              id: 2,
              title: "Study Reminder",
              message: "Don't forget to review your ML flashcards today",
              time: "5 hours ago",
              read: true,
              type: "reminder"
            }
          ];
          dispatch({ type: ActionTypes.SET_NOTIFICATIONS, payload: notifications });
        } catch (error) {
          console.error('Failed to load notifications:', error);
        }
      },
      clearError: () => {
        dispatch({ type: ActionTypes.CLEAR_ERROR });
      }
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;