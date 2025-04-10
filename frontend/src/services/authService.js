// src/services/authService.js - Mock Authentication Service

// Mock user data
const DEMO_USER = {
    id: "user1",
    name: "Sripathi",
    email: "sripathi@example.com",
    role: "Data Engineer",
    avatar_url: "/api/users/user1/avatar"
  };
  
  // Simple mock token generator (not for production use)
  const generateToken = () => {
    return 'demo_' + Math.random().toString(36).substring(2, 15);
  };
  
  // Mock authentication service
  const authService = {
    // Mock login function
    login: async (credentials) => {
      return new Promise((resolve) => {
        // Simulate API call delay
        setTimeout(() => {
          // For demo, accept any credentials
          const token = generateToken();
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(DEMO_USER));
          
          resolve({
            success: true,
            token,
            user: DEMO_USER
          });
        }, 800);
      });
    },
    
    // Mock logout function
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { success: true };
    },
    
    // Check if user is authenticated
    isAuthenticated: () => {
      return !!localStorage.getItem('token');
    },
    
    // Get current user
    getCurrentUser: () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
      return null;
    }
  };
  
  export default authService;