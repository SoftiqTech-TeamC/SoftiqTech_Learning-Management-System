# SoftiqTech Learning Management System (LMS)

A modern Learning Management System (LMS) built using **Next.js** for the frontend and **Node.js/Express.js** for the backend. The application follows a RESTful architecture with JWT-based authentication and a modular codebase designed to support scalable LMS features.

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Shadcn UI

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Deployment

* Vercel — Frontend
* Hugging Face Spaces — Backend

---

## Completed Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control

  * Student
  * Teacher
  * Admin

### Course Management

* Course Model
* Course CRUD APIs
* Course Enrollment APIs
* Teacher APIs for creating and managing courses

### Quiz and Assignment Management

* Quiz Model
* Assignment Model
* Quiz CRUD APIs
* Assignment CRUD APIs
* Submission Model

### Frontend Pages

* Login Page
* Registration Page
* Student Dashboard
* Teacher Dashboard
* Admin Dashboard
* Admin Reports Module
* Teacher Assignments and Quizzes Pages
* Student Calendar
* Student Certificates
* Assignments Page

### Backend APIs

* Authentication APIs
* Course APIs
* Quiz APIs
* Assignment APIs
* Discussion APIs
* Notification APIs

---

## Project Structure

```text
SoftiqTech_Learning-Management-System/
│
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── student/
│   │   ├── teacher/
│   │   ├── admin/
│   │   ├── courses/
│   │   ├── quizzes/
│   │   └── assignments/
│   │
│   ├── components/
│   └── lib/
│
├── lms-backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Getting Started

### Backend Setup

Navigate to the backend directory:

```bash
cd lms-backend
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file and configure the required environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the development server:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install the required dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://bashartc14-lms.hf.space/api
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:3000
```

---

## Environment Variables

### Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=https://bashartc14-lms.hf.space/api
```

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Courses

| Method | Endpoint                  | Description                     |
| ------ | ------------------------- | ------------------------------- |
| GET    | `/api/courses`            | Get all courses                 |
| GET    | `/api/courses/:id`        | Get course details              |
| POST   | `/api/courses`            | Create a course (Teacher/Admin) |
| PUT    | `/api/courses/:id`        | Update course                   |
| DELETE | `/api/courses/:id`        | Delete course                   |
| POST   | `/api/courses/:id/enroll` | Enroll in a course              |

### Quizzes

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | `/api/quizzes`     | Get all quizzes               |
| GET    | `/api/quizzes/:id` | Get quiz details              |
| POST   | `/api/quizzes`     | Create a quiz (Teacher/Admin) |
| PUT    | `/api/quizzes/:id` | Update quiz                   |
| DELETE | `/api/quizzes/:id` | Delete quiz                   |

### Assignments

| Method | Endpoint                      | Description                          |
| ------ | ----------------------------- | ------------------------------------ |
| GET    | `/api/assignments`            | Get all assignments                  |
| GET    | `/api/assignments/:id`        | Get assignment details               |
| POST   | `/api/assignments`            | Create an assignment (Teacher/Admin) |
| PUT    | `/api/assignments/:id`        | Update assignment                    |
| DELETE | `/api/assignments/:id`        | Delete assignment                    |
| POST   | `/api/assignments/:id/submit` | Submit an assignment (Student)       |

### Discussions

| Method | Endpoint                     | Description                   |
| ------ | ---------------------------- | ----------------------------- |
| GET    | `/api/discussions`           | Get all discussions           |
| GET    | `/api/discussions/:id`       | Get a discussion with replies |
| POST   | `/api/discussions`           | Create a discussion           |
| PUT    | `/api/discussions/:id`       | Update a discussion           |
| DELETE | `/api/discussions/:id`       | Delete a discussion           |
| POST   | `/api/discussions/:id/reply` | Reply to a discussion         |

---

## Authentication

All protected API endpoints require a valid JWT token in the `Authorization` header.

```http
Authorization: Bearer <your_jwt_token>
```

---

## Team Members

| Member           | Role                               |
| ---------------- | ---------------------------------- |
| Muhammad Fahad   | Full Stack Developer               |
| M. Bashar Sheikh | Full Stack Developer               |
| Ayesha Khan      | Full Stack Developer (Team Leader) |
| Sameen Ali       | Frontend Developer                 |

---

## Project Status

| Phase   | Focus                             | Status |
| ------- | --------------------------------- | ------ |
| Phase 1 | Authentication & Setup            | 100%   |
| Phase 2 | Course APIs & Teacher APIs        | 100%   |
| Phase 3 | Quiz & Assignment APIs            | 100%   |
| Phase 4 | Discussions, Notifications & Chat | 90%    |
| Phase 5 | Admin Panel, Testing & Deployment | 100%   |

---

## Live Backend

https://bashartc14-lms.hf.space

---

## Project Information

**Built by:** Team C — SoftiqTech Internship

**Last Updated:** 30-Aug-2026

```
```
