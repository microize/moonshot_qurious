# 🚀 moonshot_qurious

A full-stack learning and assessment platform designed to support community-driven learning and personalized growth.

---

## 📂 Project Structure

```
moonshot_qurious/
│
├── README.md                      # Project documentation
│
├── ai_models/                     # AI/ML models (e.g., recommendation engines, analytics)
│
├── backend/                       # Backend services and APIs
│   └── app/
│       ├── __init__.py            # Initializes backend app
│       ├── config.py              # Configuration settings
│       ├── database.py            # Database setup and connection
│       ├── main.py                # Backend entry point
│       ├── models/                # SQLAlchemy models
│       │   ├── __init__.py
│       │   ├── assessment.py
│       │   ├── course.py
│       │   └── user.py
│       ├── routers/               # API route handlers
│       │   ├── __init__.py
│       │   ├── assessments.py
│       │   ├── community.py
│       │   ├── courses.py
│       │   └── users.py
│       ├── schemas/               # Pydantic schemas
│       │   ├── __init__.py
│       │   ├── assessments.py
│       │   ├── courses.py
│       │   └── users.py
│       ├── services/              # Business logic and utilities
│       │   ├── __init__.py
│       │   ├── assessments.py
│       │   ├── courses.py
│       │   └── users.py
│       └── media/
│           └── avatars/
│               └── default.jpg    # Default avatar image
│
├── frontend/                      # React-based frontend
│   ├── package.json               # Frontend dependencies and scripts
│   ├── README.md                  # Frontend-specific docs
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── public/
│   │   ├── _redirects            # Netlify redirect rules
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── assets/
│   │       └── images/
│   │           └── avatar-placeholder.png
│   └── src/
│       ├── App.js                 # Root React component
│       ├── index.js              # React entry point
│       ├── STYLING-SYSTEM.md    # Styling system documentation
│       ├── components/           # UI and feature components
│       │   ├── CommunityLeaderboard.js
│       │   ├── CourseChat.js
│       │   ├── CourseProgress.js
│       │   ├── CourseRecommendations.js
│       │   ├── DailyGoal.js
│       │   ├── LearningAnalytics.js
│       │   ├── LearningReminders.js
│       │   ├── LoadingSpinner.js
│       │   ├── PageContainer.js
│       │   ├── UserHeader.js
│       │   ├── CourseCard/
│       │   │   ├── CourseCard.js
│       │   │   └── CourseCard.module.css
│       │   ├── Logo/
│       │   │   ├── Logo.js
│       │   │   └── Logo.module.css
│       │   ├── Sidebar/
│       │   │   ├── Sidebar.js
│       │   │   └── Sidebar.module.css
│       │   └── ui/
│       │       ├── Avatar.js
│       │       ├── Badge.js
│       │       ├── Button.js
│       │       ├── Card.js
│       │       ├── FormInput.js
│       │       └── ProgressBar.js
│       ├── context/              # React context providers
│       │   ├── AppContext.js
│       │   └── ThemeContext.js
│       ├── data/                 # Mock/static data
│       │   └── leaderboardData.js
│       ├── hooks/                # Custom hooks
│       │   └── useApi.js
│       ├── services/             # API and auth services
│       │   ├── apiService.js
│       │   └── authService.js
│       ├── styles/               # Global and scoped styles
│       │   ├── animations.css
│       │   ├── base.css
│       │   ├── components.css
│       │   ├── components.js
│       │   ├── index.css
│       │   ├── theme.js
│       │   └── utilities.css
│       ├── utils/                # Helper utilities
│       │   ├── colorUtils.js
│       │   ├── fetchWrapper.js
│       │   └── styleUtils.js
│       └── views/                # Page-level views
│           ├── AssessmentContentView.js
│           ├── AssessmentsView.js
│           ├── CommunityView.js
│           ├── CourseContentView.js
│           ├── CoursesView.js
│           ├── HomeView.js
│           ├── LeaderboardView.js
│           ├── LoginView.js
│           ├── SettingsView.js
│           └── index.js
```

---

## 🤩 About the Structure

This modular architecture is designed for **scalability**, **maintainability**, and **clear separation of concerns**:

- **Backend**: A FastAPI-powered backend handling business logic, user management, assessments, and community interactions.
- **Frontend**: A React-based interface using Tailwind CSS for clean, responsive UI/UX.
- **Modular Components**: Both frontend and backend are broken into logical modules—making onboarding and updates simple.
- **API & Services**: RESTful routes, contextual React services, and helper utilities streamline development.

---

## 📌 Want More?

Let us know if you need:

- 🛠️ Setup instructions
- 🤝 Contribution guidelines
- 🚀 Quick start guide

Happy building!

