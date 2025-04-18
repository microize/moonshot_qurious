// App.js - Fixed route for HR Analytics
import React, { Suspense, lazy, useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import LoadingSpinner from './components/LoadingSpinner';
import authService from './services/authService';

// Create a context for sidebar state
export const SidebarContext = createContext();

// Lazy load components for better performance
const Sidebar = lazy(() => import('./components/Sidebar/Sidebar'));
// Lazy load views 
const {
  HomeView,
  CoursesView,
  AssessmentsView,
  LeaderboardView,
  CommunityView,
  SettingsView,
  CourseContentView,
  AssessmentContentView,
  LoginView,
  OrganizationalAnalyticsView,
} = {
  HomeView: lazy(() => import('./views/HomeView')),
  CoursesView: lazy(() => import('./views/CoursesView')),
  AssessmentsView: lazy(() => import('./views/AssessmentsView')),
  LeaderboardView: lazy(() => import('./views/LeaderboardView')),
  CommunityView: lazy(() => import('./views/CommunityView')),
  SettingsView: lazy(() => import('./views/SettingsView')),
  CourseContentView: lazy(() => import('./views/CourseContentView')),
  AssessmentContentView: lazy(() => import('./views/AssessmentContentView')),
  LoginView: lazy(() => import('./views/LoginView')),
  OrganizationalAnalyticsView: lazy(() => import('./views/OrganizationalAnalyticsView')),
};

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
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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
                        {/* Fixed width sidebar with fixed positioning */}
                        <aside 
                          className={`fixed top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out ${
                            isCollapsed ? 'w-16' : 'w-64'
                          }`}
                        >
                          <Sidebar />
                        </aside>
                        
                        {/* Main content - with adaptive margin and flex-grow to fill available space */}
                        <main 
                          className={`flex-1 w-full bg-white dark:bg-gray-900 shadow-xl overflow-y-auto min-h-screen transition-all duration-300 ease-in-out ${
                            isCollapsed ? 'ml-16' : 'ml-64'
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
                              <Route path="/hr-analytics" element={<OrganizationalAnalyticsView />} />
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