// App.js
import React, { Suspense, lazy, Component } from 'react';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load components for better performance
const Sidebar = lazy(() => import('./components/Sidebar'));
const MainContent = lazy(() => import('./components/MainContent'));

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-purple-50 dark:bg-purple-900 p-4 text-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition-colors"
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
  <div className="flex items-center justify-center h-screen bg-purple-100 dark:bg-purple-900">
    <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="flex h-screen bg-purple-100 dark:bg-purple-900 overflow-hidden">
          <Suspense fallback={<LoadingSpinner />}>
            <Sidebar />
            <MainContent />
          </Suspense>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;