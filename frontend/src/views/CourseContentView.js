// src/views/CourseContentView.js
import React from 'react';
import { useParams } from 'react-router-dom';
import CourseChat from '../components/CourseChat'; // Import the CourseChat component

/**
 * CourseContentView component that serves as a container for the CourseChat
 * 
 * @returns {JSX.Element} The rendered CourseContentView component
 */
const CourseContentView = () => {
  const { courseId } = useParams(); // Get courseId from URL params
  
  // The main view simply renders the CourseChat component
  // In a real implementation, you might fetch course data based on courseId
  return (
    <div className="h-full">
      <CourseChat />
    </div>
  );
};

export default CourseContentView;