// views/CourseContentView.js
import React from 'react';
import { useParams } from 'react-router-dom';
import CourseChat from '../components/CourseChat'; // Import the new component

const CourseContentView = () => {
  return <CourseChat />;
};

export default CourseContentView;