// App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-purple-100 dark:bg-purple-900">
        <Sidebar />
        <MainContent />
      </div>
    </ThemeProvider>
  );
}

export default App;