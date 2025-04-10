// App.js - Updated with routing support
import React, { Suspense, lazy, useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load components for better performance
const Sidebar = lazy(() => import('./components/Sidebar'));
const MainContent = lazy(() => import('./components/MainContent'));
// Lazy load views for each section
const HomeView = lazy(() => import('./views/HomeView'));
const CoursesView = lazy(() => import('./views/CoursesView'));
const AssessmentsView = lazy(() => import('./views/AssessmentsView'));
const LeaderboardView = lazy(() => import('./views/LeaderboardView'));
const CommunityView = lazy(() => import('./views/CommunityView'));
const SettingsView = lazy(() => import('./views/SettingsView'));
// Lazy load new content views
const CourseContentView = lazy(() => import('./views/CourseContentView'));
const AssessmentContentView = lazy(() => import('./views/AssessmentContentView'));

// Error Boundary Component
class ErrorBoundary extends Component {
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

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-purple-50 dark:bg-gray-950">
    <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
);

// Fallback component for missing views
const FallbackView = ({ viewName }) => (
  <div className="h-full flex flex-col items-center justify-center p-6">
    <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
      {viewName} View
    </h2>
    <p className="text-gray-600 dark:text-gray-300 max-w-lg text-center">
      This view is currently under development. Check back soon for updates!
    </p>
  </div>
);

function App() {
  const [activeView, setActiveView] = useState('home');
  
  // Handle navigation from sidebar
  const handleNavigation = (viewId) => {
    setActiveView(viewId);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="flex h-screen bg-purple-50 dark:bg-gray-950 overflow-hidden">
            <Suspense fallback={<LoadingSpinner />}>
              <Sidebar onNavigate={handleNavigation} />
              
              <main className="flex-1 lg:ml-64 relative z-10 bg-white dark:bg-gray-900 rounded-tl-3xl rounded-bl-3xl shadow-xl overflow-y-auto">
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
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;