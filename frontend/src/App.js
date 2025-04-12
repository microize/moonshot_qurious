// App.js - Improved structure with sidebar context
import React, { Suspense, lazy, useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import LoadingSpinner from './components/LoadingSpinner';
import authService from './services/authService';

// Create a context for sidebar state
export const SidebarContext = createContext();

// Centralized lazy loading for better code organization
const Sidebar = lazy(() => import('./components/Sidebar/Sidebar'));

// Lazy load views 
const HomeView = lazy(() => import('./views/HomeView'));
const CoursesView = lazy(() => import('./views/CoursesView'));
const AssessmentsView = lazy(() => import('./views/AssessmentsView'));
const LeaderboardView = lazy(() => import('./views/LeaderboardView'));
const CommunityView = lazy(() => import('./views/CommunityView'));
const SettingsView = lazy(() => import('./views/SettingsView'));
const CourseContentView = lazy(() => import('./views/CourseContentView'));
const AssessmentContentView = lazy(() => import('./views/AssessmentContentView'));
const LoginView = lazy(() => import('./views/LoginView'));

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-purple-50 dark:bg-gray-950 p-4 text-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-cobalt-600 hover:bg-cobalt-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [loading, setLoading] = useState(true);
  // State for sidebar collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check authentication on load
  useEffect(() => {
    // Allow a moment for any stored auth to be loaded
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
        <AppProvider>
          <ThemeProvider>
            <Router>
              <Routes>
                {/* Public route for login */}
                <Route path="/login" element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <LoginView />
                  </Suspense>
                } />
                
                {/* Protected routes */}
                <Route path="/*" element={
                  <ProtectedRoute>
                    <div className="flex h-screen bg-purple-50 dark:bg-gray-950 overflow-hidden">
                      <Suspense fallback={<LoadingSpinner />}>
                        <Sidebar />
                        
                        <main 
                          className={`flex-1 relative z-10 bg-white dark:bg-gray-900 rounded-tl-none rounded-bl-none shadow-xl overflow-y-auto transition-all duration-300 ease-in-out ${
                            isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
                          }`}
                        >
                          <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                              <Route path="/" element={<HomeView />} />
                              <Route path="/courses" element={<CoursesView />} />
                              <Route path="/courses/:courseId" element={<CourseContentView />} />
                              <Route path="/assessments" element={<AssessmentsView />} />
                              <Route path="/assessments/:assessmentId" element={<AssessmentContentView />} />
                              <Route path="/leaderboard" element={<LeaderboardView />} />
                              <Route path="/community" element={<CommunityView />} />
                              <Route path="/settings" element={<SettingsView />} />
                              <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                          </Suspense>
                        </main>
                      </Suspense>
                    </div>
                  </ProtectedRoute>
                } />
              </Routes>
            </Router>
          </ThemeProvider>
        </AppProvider>
      </SidebarContext.Provider>
    </ErrorBoundary>
  );
}

export default App;