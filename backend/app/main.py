# backend/main.py
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Body, Query, Path
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from pydantic import BaseModel, Field
import os
import shutil
import uuid
from datetime import datetime, timedelta

# Initialize FastAPI app
app = FastAPI(
    title="Quriousity Learning Platform API",
    description="Backend API for the Quriousity Learning Platform",
    version="0.1.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create avatars directory if it doesn't exist
AVATAR_DIR = "media/avatars"
os.makedirs(AVATAR_DIR, exist_ok=True)

# --- Data Models ---

class User(BaseModel):
    id: str
    name: str
    email: str
    role: str
    avatar_url: Optional[str] = None
    
class UserProfile(BaseModel):
    id: str
    name: str
    email: str
    role: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    skills: List[str] = []
    learning_focus: Optional[str] = None
    
class Course(BaseModel):
    id: str
    title: str
    description: str
    type: str = "Course"
    level: str = "Beginner"
    duration: str
    instructor: str
    instructorId: str
    enrolledCount: int = 0
    rating: Optional[float] = None
    thumbnail_url: Optional[str] = None
    isEnrolled: bool = False

class CourseProgress(BaseModel):
    courseId: str
    userId: str
    completed_modules: List[str]
    percentComplete: float
    lastAccessed: datetime

class Assessment(BaseModel):
    id: str
    title: str
    type: str
    questions: int
    timeEstimate: str
    status: str = "available"
    requirement: Optional[str] = None

class LeaderboardEntry(BaseModel):
    userId: str
    name: str
    role: str
    points: int
    streak: int
    badge: Optional[str] = None
    change: str = "0"
    isOnline: bool = False

# --- Mock Data ---

# Sample users
USERS = {
    "user1": User(
        id="user1",
        name="Sripathi",
        email="sripathi@example.com",
        role="Data Engineer",
        avatar_url="/api/users/user1/avatar"
    ),
    "user2": User(
        id="user2",
        name="Anjali",
        email="anjali@example.com",
        role="Data Scientist",
        avatar_url="/api/users/user2/avatar"
    )
}

# Sample courses
COURSES = [
    Course(
        id="course1",
        title="Generative AI for Developers",
        description="Master strategies and techniques to code with Generative AI. Learn prompt engineering and how to integrate AI in your applications.",
        type="Course",
        level="Intermediate",
        duration="4h 40m",
        instructor="Dr. Johnson",
        instructorId="instructor1",
        enrolledCount=17770,
        rating=4.8,
        isEnrolled=True
    ),
    Course(
        id="course2",
        title="Data Science Professional Certificate",
        description="Launch your career in data science with job-ready skills and hands-on experience.",
        type="Pathway",
        level="Beginner",
        duration="12h 30m",
        instructor="Prof. Sharma",
        instructorId="instructor2",
        enrolledCount=24310,
        rating=4.7
    ),
    Course(
        id="course3",
        title="Understanding Machine Learning Algorithms",
        description="Dive deep into the theory and implementation of machine learning algorithms from classification to clustering.",
        type="Course",
        level="Intermediate",
        duration="5h 15m",
        instructor="Dr. Johnson",
        instructorId="instructor1",
        enrolledCount=8245,
        rating=4.6,
        isEnrolled=True
    )
]

# Sample course progress
COURSE_PROGRESS = {
    "course1": CourseProgress(
        courseId="course1",
        userId="user1",
        completed_modules=["module1", "module2"],
        percentComplete=20.0,
        lastAccessed=datetime.now() - timedelta(hours=2)
    ),
    "course3": CourseProgress(
        courseId="course3",
        userId="user1",
        completed_modules=["module1"],
        percentComplete=10.0,
        lastAccessed=datetime.now() - timedelta(days=1)
    )
}

# Sample assessments
ASSESSMENTS = [
    Assessment(
        id="assessment1",
        title="Python Fundamentals Quiz",
        type="Quiz",
        questions=15,
        timeEstimate="20 min",
        status="available"
    ),
    Assessment(
        id="assessment2",
        title="Machine Learning Algorithms Assessment",
        type="Test",
        questions=25,
        timeEstimate="45 min",
        status="available"
    ),
    Assessment(
        id="assessment3",
        title="Generative AI Assessment - Basic Level",
        type="Certification",
        questions=15,
        timeEstimate="30 min",
        status="available"
    )
]

# Sample leaderboard
LEADERBOARD = [
    LeaderboardEntry(
        userId="user3",
        name="Alex K.",
        role="AI Researcher",
        points=1250,
        streak=45,
        badge="Expert",
        change="+2"
    ),
    LeaderboardEntry(
        userId="user4",
        name="Maria G.",
        role="Data Scientist",
        points=980,
        streak=30,
        badge="Mentor",
        change="0"
    ),
    LeaderboardEntry(
        userId="user5",
        name="Wei L.",
        role="ML Engineer",
        points=940,
        streak=28,
        badge="Contributor",
        change="-1"
    ),
    LeaderboardEntry(
        userId="user1",
        name="Sripathi",
        role="Data Engineer",
        points=440,
        streak=8,
        change="+1"
    ),
    LeaderboardEntry(
        userId="user2",
        name="Anjali",
        role="Data Scientist",
        points=680,
        streak=15,
        change="+3",
        isOnline=True
    )
]

# --- API Endpoints ---

# Mock authentication (in a real app, use proper auth)
def get_current_user():
    return USERS["user1"]

# User endpoints
@app.get("/api/users/profile")
async def get_user_profile():
    user = get_current_user()
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "avatar_url": user.avatar_url,
        "bio": "Data engineer passionate about building scalable data pipelines and learning ML.",
        "skills": ["Python", "SQL", "Data Engineering", "Spark"],
        "learning_focus": "Machine Learning"
    }

@app.put("/api/users/profile")
async def update_user_profile(profile_data: dict = Body(...)):
    user = get_current_user()
    # In a real app, update the user profile in the database
    return {
        "id": user.id,
        "name": profile_data.get("name", user.name),
        "email": profile_data.get("email", user.email),
        "role": profile_data.get("role", user.role),
        "avatar_url": user.avatar_url,
        "bio": profile_data.get("bio", ""),
        "skills": profile_data.get("skills", []),
        "learning_focus": profile_data.get("learning_focus", "")
    }

@app.get("/api/users/{user_id}/avatar")
async def get_user_avatar(user_id: str):
    avatar_path = os.path.join(AVATAR_DIR, f"{user_id}.jpg")
    
    # If avatar doesn't exist, return a default avatar
    if not os.path.exists(avatar_path):
        default_avatar = os.path.join(AVATAR_DIR, "default.jpg")
        if not os.path.exists(default_avatar):
            # Create an empty default avatar if it doesn't exist
            # In a real app, use a proper default avatar image
            with open(default_avatar, "wb") as f:
                f.write(b"")
        return FileResponse(default_avatar)
    
    return FileResponse(avatar_path)

@app.post("/api/users/avatar")
async def upload_avatar(file: UploadFile = File(...)):
    user = get_current_user()
    
    # Save the uploaded avatar
    avatar_path = os.path.join(AVATAR_DIR, f"{user.id}.jpg")
    with open(avatar_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"success": True, "avatar_url": f"/api/users/{user.id}/avatar"}

# Course endpoints
@app.get("/api/courses")
async def get_all_courses():
    user = get_current_user()
    
    # Mark courses as enrolled for the current user
    for course in COURSES:
        if course.id in COURSE_PROGRESS:
            course.isEnrolled = True
    
    return COURSES

@app.get("/api/courses/{course_id}")
async def get_course_by_id(course_id: str):
    user = get_current_user()
    
    for course in COURSES:
        if course.id == course_id:
            # Mark as enrolled if the user is enrolled
            if course_id in COURSE_PROGRESS:
                course.isEnrolled = True
            return course
    
    raise HTTPException(status_code=404, detail="Course not found")

@app.get("/api/users/courses")
async def get_user_courses():
    user = get_current_user()
    
    # Return only courses the user is enrolled in
    enrolled_courses = []
    for course in COURSES:
        if course.id in COURSE_PROGRESS:
            course.isEnrolled = True
            enrolled_courses.append(course)
    
    return enrolled_courses

@app.post("/api/courses/{course_id}/enroll")
async def enroll_in_course(course_id: str):
    user = get_current_user()
    
    # Check if the course exists
    course_exists = False
    for course in COURSES:
        if course.id == course_id:
            course_exists = True
            break
    
    if not course_exists:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Enroll the user in the course
    if course_id not in COURSE_PROGRESS:
        COURSE_PROGRESS[course_id] = CourseProgress(
            courseId=course_id,
            userId=user.id,
            completed_modules=[],
            percentComplete=0.0,
            lastAccessed=datetime.now()
        )
    
    return {"success": True, "message": "Successfully enrolled in the course"}

@app.get("/api/courses/{course_id}/progress")
async def get_course_progress(course_id: str):
    user = get_current_user()
    
    if course_id in COURSE_PROGRESS:
        return COURSE_PROGRESS[course_id]
    
    raise HTTPException(status_code=404, detail="Course progress not found")

# Assessment endpoints
@app.get("/api/assessments")
async def get_all_assessments():
    return ASSESSMENTS

@app.get("/api/assessments/{assessment_id}")
async def get_assessment_by_id(assessment_id: str):
    for assessment in ASSESSMENTS:
        if assessment.id == assessment_id:
            return assessment
    
    raise HTTPException(status_code=404, detail="Assessment not found")

@app.post("/api/assessments/{assessment_id}/submit")
async def submit_assessment(assessment_id: str, answers: dict = Body(...)):
    # In a real app, process and grade the assessment
    return {
        "success": True,
        "score": 85,
        "feedback": "Great job! You've demonstrated a good understanding of the concepts."
    }

# Community endpoints
@app.get("/api/community/leaderboard")
async def get_leaderboard():
    return LEADERBOARD

@app.get("/api/community/discussions")
async def get_discussions():
    # Mock discussions data
    return [
        {
            "id": "discussion1",
            "title": "Tips for optimizing deep learning models?",
            "author": "Maria G.",
            "authorId": "user4",
            "category": "Deep Learning",
            "replies": 12,
            "views": 234,
            "time": "2 hours ago",
            "solved": True
        },
        {
            "id": "discussion2",
            "title": "How to handle imbalanced datasets in classification problems?",
            "author": "Alex K.",
            "authorId": "user3",
            "category": "Machine Learning",
            "replies": 8,
            "views": 156,
            "time": "Yesterday",
            "solved": False
        }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)