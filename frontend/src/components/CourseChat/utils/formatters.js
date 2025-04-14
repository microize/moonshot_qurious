// src/components/CourseChat/utils/formatters.js
// Time and text formatting utilities

/**
 * Formats a Date object into HH:MM format
 * @param {Date} date - The date to format
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return '--:--'; // Return placeholder if date is invalid
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  /**
   * Formats seconds into MM:SS format
   * @param {number} seconds - Seconds to format
   * @returns {string} Formatted time string
   */
  export const formatVideoPosition = (seconds) => {
    if (isNaN(seconds) || seconds === null || seconds < 0) seconds = 0;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  /**
   * Utility to combine class names
   * @param  {...string} classes - Class names to combine
   * @returns {string} Combined class names
   */
  export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };