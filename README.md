# 🚀 moonshot_qurious

**A full-stack learning and assessment platform designed to support community-driven learning and personalized growth.**

![Project Banner](https://via.placeholder.com/1200x300/FFA000/FFFFFF?text=Moonshot+Qurious)

## 🌟 Overview

Moonshot Qurious is a comprehensive learning platform that combines personalized learning paths, interactive course content, community engagement, and advanced analytics to create a holistic educational experience. The platform is built with modern web technologies and follows a modular architecture for scalability and maintainability.

## ✨ Key Features

- **Interactive Course Content** - Engaging video lessons with integrated chat interface
- **Smart Learning Paths** - Personalized recommendations based on learning behavior
- **Active Community** - Discussion forums, leaderboards, and peer interaction
- **Comprehensive Assessments** - Quizzes, tests, and certification opportunities
- **Learning Analytics** - Advanced metrics and insights to track progress
- **Adaptive Learning** - Multiple learning modes and clarification levels
- **Gamification** - Badges, streaks, and achievements to motivate learners

## 📂 Project Structure

```
moonshot_qurious/
│
├── README.md                      # Project documentation
│
├── ai_models/                     # AI/ML models (recommendation engines, analytics)
│
├── backend/                       # FastAPI backend services and APIs
│   ├── .env                       # Environment variables
│   └── app/
│       ├── __init__.py            # Initializes backend app
│       ├── config.py              # Configuration settings
│       ├── database.py            # Database setup and connection
│       ├── main.py                # Backend entry point with API endpoints
│       ├── models/                # SQLAlchemy models
│       │   ├── __init__.py
│       │   ├── assessment.py      # Assessment data models
│       │   ├── course.py          # Course data models
│       │   └── user.py            # User data models
│       ├── routers/               # API route handlers
│       │   ├── __init__.py
│       │   ├── assessments.py     # Assessment endpoints
│       │   ├── community.py       # Community endpoints
│       │   ├── courses.py         # Course endpoints
│       │   └── users.py           # User endpoints
│       ├── schemas/               # Pydantic schemas
│       │   ├── __init__.py
│       │   ├── assessments.py     # Assessment data validation
│       │   ├── courses.py         # Course data validation
│       │   └── users.py           # User data validation
│       ├── services/              # Business logic and utilities
│       │   ├── __init__.py
│       │   ├── assessments.py     # Assessment services
│       │   ├── courses.py         # Course services
│       │   └── users.py           # User services
│       └── media/                 # User media storage
│           └── avatars/           # User profile images
│               └── default.jpg    # Default avatar image
│
├── frontend/                      # React-based frontend
│   ├── package.json               # Frontend dependencies and scripts
│   ├── README.md                  # Frontend-specific docs
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── public/                    # Static assets
│   │   ├── _redirects             # Netlify redirect rules
│   │   ├── favicon.ico            # Site favicon
│   │   ├── index.html             # HTML entry point
│   │   ├── robots.txt             # SEO configuration
│   │   └── assets/                # Static media
│   │       └── images/            # Image assets
│   │           └── avatar-placeholder.png
│   └── src/
│       ├── App.js                 # Root React component
│       ├── index.js               # React entry point
│       ├── STYLING-SYSTEM.md      # Styling system documentation
│       ├── components/            # UI and feature components
│       │   ├── CommunityLeaderboard.js    # Community rankings component
│       │   ├── CourseChat.js              # Interactive course chat
│       │   ├── CourseProgress.js          # Learning progress tracking
│       │   ├── CourseRecommendations.js   # Course suggestion component
│       │   ├── DailyGoal.js               # Daily learning targets
│       │   ├── LearningAnalytics.js       # Progress analytics component
│       │   ├── LearningReminders.js       # Study reminder component 
│       │   ├── LoadingSpinner.js          # Loading state component
│       │   ├── PageContainer.js           # Layout wrapper component
│       │   ├── UserHeader.js              # User profile header
│       │   ├── CourseChat/                # Interactive course chat interface
│       │   │   ├── ActionMessage.js       # Action prompts component
│       │   │   ├── CollapsedVideo.js      # Collapsed video view
│       │   │   ├── CourseChat.js          # Main chat component
│       │   │   ├── CourseChat.module.css  # Scoped styles for chat
│       │   │   ├── Header.js              # Chat header component
│       │   │   ├── InputArea.js           # Chat input component
│       │   │   ├── MessageList.js         # Message display component
│       │   │   ├── ModePanel.js           # Learning mode selection
│       │   │   ├── ResourcePanel.js       # Learning resources panel
│       │   │   ├── TextMessage.js         # Text messages component
│       │   │   ├── TranscriptPanel.js     # Transcript sidebar
│       │   │   ├── TypingIndicator.js     # Bot typing animation
│       │   │   ├── VideoControls.js       # Custom video player controls
│       │   │   ├── VideoMessage.js        # Video content component
│       │   │   ├── index.js               # Component exports
│       │   │   ├── styles.js              # Component styling
│       │   │   ├── hooks/                 # Custom hooks for chat functionality
│       │   │   │   ├── useDoubtContext.js # Doubt management hook
│       │   │   │   ├── useMessages.js     # Message state hook
│       │   │   │   └── useVideoState.js   # Video playback hook
│       │   │   └── utils/                 # Utility functions for chat
│       │   │       ├── constants.js       # Constant values
│       │   │       ├── formatters.js      # Text/time formatters
│       │   │       └── messageGenerators.js # Response generators
│       │   ├── CourseCard/                # Course display components
│       │   │   ├── CourseCard.js          # Course card component
│       │   │   └── CourseCard.module.css  # Scoped styles for course cards
│       │   ├── Logo/                      # Branding components
│       │   │   ├── Logo.js                # Logo component
│       │   │   └── Logo.module.css        # Scoped styles for logo
│       │   ├── Sidebar/                   # Navigation sidebar
│       │   │   ├── Sidebar.js             # Main sidebar navigation
│       │   │   └── Sidebar.module.css     # Scoped styles for sidebar
│       │   └── ui/                        # Reusable UI components
│       │       ├── Avatar.js              # User avatar component
│       │       ├── Badge.js               # Status badge component
│       │       ├── Button.js              # Styled button component
│       │       ├── Card.js                # Content card component
│       │       ├── FormInput.js           # Form input component
│       │       └── ProgressBar.js         # Progress visualization
│       ├── context/                       # React context providers
│       │   ├── AppContext.js              # Application state context
│       │   └── ThemeContext.js            # Theme management context
│       ├── data/                          # Mock/static data
│       │   └── leaderboardData.js         # Leaderboard sample data
│       ├── hooks/                         # Custom React hooks
│       │   └── useApi.js                  # API interaction hook
│       ├── services/                      # API and auth services
│       │   ├── apiService.js              # Backend API service
│       │   └── authService.js             # Authentication service
│       ├── styles/                        # Global and scoped styles
│       │   ├── animations.css             # Animation definitions
│       │   ├── base.css                   # Base styling
│       │   ├── components.css             # Component styles
│       │   ├── components.js              # JS style definitions
│       │   ├── index.css                  # Style entry point
│       │   ├── theme.js                   # Theme variables
│       │   └── utilities.css              # Utility classes
│       ├── utils/                         # Helper utilities
│       │   ├── colorUtils.js              # Color management
│       │   ├── fetchWrapper.js            # API request wrapper
│       │   └── styleUtils.js              # Style utilities
│       └── views/                         # Page-level views
│           ├── AssessmentContentView.js   # Assessment page
│           ├── AssessmentsView.js         # Assessments list
│           ├── CommunityView.js           # Community page
│           ├── CourseContentView.js       # Course content page
│           ├── CoursesView.js             # Courses list
│           ├── HomeView.js                # Dashboard/home page
│           ├── LeaderboardView.js         # Leaderboard page
│           ├── LoginView.js               # Authentication page
│           ├── SettingsView.js            # User settings page
│           └── index.js                   # View exports
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - High-performance API framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation and settings management
- **Python 3.8+** - Modern Python implementation

### Frontend
- **React** - UI library for building component-based interfaces
- **React Router** - Routing and navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Clean, consistent iconography
- **React Player** - Video playback functionality
- **Context API** - State management

### AI Integration
- **Recommendation Engine** - Personalized course suggestions
- **Learning Analytics** - Insight generation from user data
- **Interactive Course Assistant** - AI-powered learning guidance

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## 🧩 Key Components

### CourseChat

The CourseChat component provides an interactive learning experience with video content and AI-powered guidance. Features include:

- Multiple learning modes (Standard, Accelerated, Comprehensive)
- Adjustable clarity levels for explanations
- Video content with synchronized transcripts
- Contextual doubt resolution
- Personalized recommendations

### Learning Analytics

Advanced analytics help learners understand their progress and optimize their study habits:

- Daily activity tracking
- Learning pattern insights
- Personalized recommendations
- Streak monitoring and goals

### Community Engagement

The platform fosters community-driven learning through:

- Leaderboards and achievements
- Discussion forums for peer support
- Learning groups for collaborative study
- Mentor connections

## 📊 Screenshots

_(Placeholder for application screenshots)_

## 🤝 Contributing

We welcome contributions to Moonshot Qurious! Please feel free to submit pull requests, open issues, or suggest enhancements.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

For questions, feedback, or support, please open an issue in the repository or contact the project maintainers.

---

Happy learning with Moonshot Qurious! 🚀✨