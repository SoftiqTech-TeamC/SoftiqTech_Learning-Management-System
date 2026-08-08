# SoftiqTech Learning Management System (LMS)

A modern Learning Management System built using **Next.js** for the frontend and **Django REST Framework** for the backend. The application follows a RESTful architecture with JWT-based authentication and a modular codebase to support scalable LMS features.

---

# Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI

## Backend
- Django
- Django REST Framework
- Simple JWT Authentication
- PostgreSQL (Neon)

## Development Tools
- Git
- GitHub
- Postman
- VS Code
- Vercel (Deployment)
- Render / Railway (Deployment)

---

# Project Structure

```text
SoftiqTech_Learning-Management-System/
│
├── lms-backend/
│   ├── api/
│   ├── core/
│   ├── users/
│   ├── courses/
│   ├── learning/
│   ├── analytics/
│   └── manage.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── services/
│   └── public/
│
└── README.md
```

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Access Token
- Refresh Token
- Protected API Endpoints
- Persistent User Session
- Logout Functionality
- Role-Based Access Control (RBAC)
  - Student
  - Teacher
  - Admin

## Dashboard
- Student Dashboard
- Teacher Dashboard
- Admin Dashboard
- Dashboard Statistics
- Serializer-Based Response
- JWT Protected Endpoints
- RESTful API Design

## Course Management
- Course Listing
- Course Details
- Course Creation (CRUD)
- Course Enrollment
- Video Lessons
- Video Player

## Learning Area
- Quizzes
- Assignments
- Assignment Submissions
- Progress Tracking
- Certificate Generation

## Supporting Features
- Notifications & Real-Time Alerts
- Discussion / Chat
- Calendar
- Search & Filters
- File Upload & Media

## Analytics & Reports
- Analytics Dashboard
- Charts & Visualizations
- Report Export (PDF / Excel)

---

# API Endpoints

## Authentication

| Method | Endpoint |
|--------|----------|
| POST | `/api/auth/register/` |
| POST | `/api/auth/login/` |
| POST | `/api/auth/refresh/` |
| POST | `/api/auth/verify/` |
| POST | `/api/auth/logout/` |

## Users

| Method | Endpoint | Authentication |
|--------|----------|----------------|
| GET | `/api/users/` | Required |
| GET | `/api/users/{id}/` | Required |
| PUT | `/api/users/{id}/` | Required |
| DELETE | `/api/users/{id}/` | Admin Only |

## Courses

| Method | Endpoint | Authentication |
|--------|----------|----------------|
| GET | `/api/courses/` | Required |
| GET | `/api/courses/{id}/` | Required |
| POST | `/api/courses/` | Teacher/Admin |
| PUT | `/api/courses/{id}/` | Teacher/Admin |
| DELETE | `/api/courses/{id}/` | Teacher/Admin |
| POST | `/api/courses/{id}/enroll/` | Required |

## Learning

| Method | Endpoint | Authentication |
|--------|----------|----------------|
| GET | `/api/quizzes/` | Required |
| POST | `/api/quizzes/` | Teacher/Admin |
| GET | `/api/assignments/` | Required |
| POST | `/api/assignments/` | Teacher/Admin |
| POST | `/api/assignments/{id}/submit/` | Required |
| GET | `/api/progress/` | Required |
| GET | `/api/certificates/` | Required |

## Supporting Services

| Method | Endpoint | Authentication |
|--------|----------|----------------|
| GET | `/api/notifications/` | Required |
| GET | `/api/chat/` | Required |
| GET | `/api/calendar/` | Required |
| GET | `/api/search/` | Required |

## Analytics

| Method | Endpoint | Authentication |
|--------|----------|----------------|
| GET | `/api/analytics/dashboard/` | Required |
| GET | `/api/analytics/reports/` | Required |

---

# Sample API Responses

## Login Response

```json
{
  "access": "eyJhbGciOiJIUzI1NiIs...",
  "refresh": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "student@example.com",
    "role": "student",
    "name": "John Doe"
  }
}
```

## Dashboard Response

```json
{
  "total_courses": 12,
  "total_students": 156,
  "total_teachers": 8,
  "courses_in_progress": 5,
  "completed_courses": 4,
  "certificates_earned": 3,
  "upcoming_assignments": 2,
  "recent_activity": [
    {
      "type": "quiz",
      "title": "Python Basics Quiz",
      "date": "2026-08-07",
      "score": "85%"
    }
  ]
}
```

---

# Authentication

Protected endpoints require a JWT access token.

```text
Authorization: Bearer <access_token>
```

---

# Backend Modules

```text
lms-backend/
│
├── core/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── users/
│   ├── authentication.py
│   ├── serializers.py
│   ├── views.py
│   ├── models.py
│   └── urls.py
│
├── courses/
│   ├── serializers.py
│   ├── views.py
│   ├── models.py
│   └── urls.py
│
├── learning/
│   ├── serializers.py
│   ├── views.py
│   ├── models.py
│   └── urls.py
│
├── analytics/
│   ├── serializers.py
│   ├── views.py
│   ├── models.py
│   └── urls.py
│
└── manage.py
```

---

# Frontend Modules

```text
frontend/
│
├── app/
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── courses/
│   ├── profile/
│   └── settings/
│
├── components/
│   ├── Navbar/
│   ├── Sidebar/
│   ├── Dashboard/
│   ├── CourseCard/
│   ├── VideoPlayer/
│   └── common/
│
├── context/
│   └── AuthContext/
│
├── services/
│   ├── authService.js
│   ├── courseService.js
│   └── apiService.js
│
└── public/
```

---

# Authentication Flow

1. User submits login credentials.
2. Backend validates the credentials.
3. JWT Access and Refresh tokens are generated.
4. Tokens are stored on the client (`localStorage` / `sessionStorage`).
5. Protected API requests include the Access Token in request headers.
6. Unauthorized requests return **401 Unauthorized**.
7. Refresh Token is used to obtain a new Access Token when expired.

---

# Running the Project

## Backend

```bash
cd lms-backend

python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000/
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000/
```

---

# Environment Variables

## Backend (`.env`)

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
SECRET_KEY=your-secret-key
DEBUG=True
```

## Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

---

# Testing

The project includes API testing for:

- Authentication
- JWT Authorization
- Protected Routes
- CRUD Operations
- Serializer Validation
- Role-Based Access Control (RBAC)

---

# Future Modules

- Advanced Analytics & Reports
- Enhanced Role-Based Access Control (RBAC)
- Notification System
- Discussion Forum
- Calendar Integration
- File Upload System
- Admin Panel
- Settings Management
- Real-Time Chat

---

# License

This project is developed for educational and internship purposes as part of the **SoftiqTech Internship Program**.

### Built by Team C — SoftiqTech Internship
