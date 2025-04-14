// src/components/CourseChat/utils/messageGenerators.js
// Functions for generating responses

/**
 * Generates a bot response tailored to a specific doubt
 * @param {string} doubt - The user's doubt/question
 * @param {object} context - Context about the video (videoId, videoTitle, timestamp)
 * @param {string} clarity - Clarity level (basic, intermediate, advanced)
 * @param {string} mode - Learning mode
 * @returns {string} - Generated response
 */
export const generateDoubtResponse = (doubt, context, clarity, mode) => {
    // Base response prefix including context
    let baseResponse = `Regarding "${context.videoTitle}" at ${context.timestamp}: `;
  
    // Generate response based on clarity level
    if (clarity === 'basic') {
      baseResponse += "Think of it like this... [Simple explanation/analogy related to the topic at the timestamp]. It helps the AI understand the order of things.";
    } else if (clarity === 'advanced') {
      baseResponse += "Technically, the underlying mechanism involves multi-head self-attention and positional encoding... [Detailed technical explanation]. Consider the implications for sequence transduction tasks.";
    } else { // Intermediate (default)
      baseResponse += "The key concept here is how the model weighs the importance of different inputs... [Standard explanation]. This allows the model to effectively capture long-range dependencies.";
    }
  
    // Add mode-specific elements
    if (mode === 'comprehensive') {
      baseResponse += " Would you like a link to the original research paper discussing this?";
    }
    if (mode === 'practical') {
       baseResponse += " You can find a code implementation of this concept in the resources panel.";
    }
  
    // Conclude the response
    return baseResponse + ` Does that clarify your question about "${doubt.substring(0, 30)}..."?`;
  };
  
  /**
   * Generates a general bot response (not tied to a specific doubt)
   * @param {string} input - User's input
   * @param {string} clarity - Clarity level (basic, intermediate, advanced)
   * @param {string} mode - Learning mode
   * @returns {string} - Generated response
   */
  export const generateGeneralResponse = (input, clarity, mode) => {
    // Base response
    let response = `That's an interesting point about "${input.substring(0, 50)}...". `;
    
    // Modify based on clarity level
    if (clarity === 'basic') {
      response += "In simple terms, it relates to how AI systems process information. ";
    } else {
      response += "This touches upon core principles in modern AI development. ";
    }
    
    // Add mode-specific prompts
    if (mode === 'assessment') {
      response += "Would you like to try a quick quiz question on this topic before we continue the lesson?";
    } else {
      response += "How would you like to proceed? Continue the lesson or explore this topic further?";
    }
    
    return response;
  };