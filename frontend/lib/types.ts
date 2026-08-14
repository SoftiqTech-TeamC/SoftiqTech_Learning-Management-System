export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface StudentStats {
  streakDays: number;
  tasksDue: number;
  studyTimeToday: string;
  totalStudyMinutes: number;
  lessonsDone: number;
  totalLessons: number;
  avgScore: number;
}

export interface StudentCourse {
  id: string;
  title: string;
  instructorName: string;
  category: string;
  level: string;
  progress: number;
  status: "active" | "completed";
  lastAccessedAt: string;
  lessonsDone: number;
  lessonsTotal: number;
  coverImage: string;
}

export interface StudentMilestone {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  status: string;
}

export interface StudentFocus {
  courseId: string;
  courseTitle: string;
  courseCode: string;
  courseCategory: string;
  courseProgress: number;
  lessonId: string | null;
  lessonTitle: string;
  lessonDurationMin: number;
}

export interface StudentDashboardData {
  student: DashboardUser;
  overallProgress: number;
  stats: StudentStats;
  focus: StudentFocus | null;
  milestones: StudentMilestone[];
  courses: StudentCourse[];
}

export interface TeacherStats {
  totalStudents: number;
  activeCourses: number;
  pendingSubmissions: number;
  totalEnrollments: number;
  averageProgress: number;
}

export interface TeacherEngagement {
  courseId: string;
  courseTitle: string;
  category: string;
  avgProgress: number;
  students: number;
  completed: number;
}

export interface TeacherActivity {
  type: "submission" | "enrollment";
  message: string;
  date: string;
}

export interface TeacherCourse {
  id: string;
  title: string;
  category: string;
  level: string;
}

export interface TeacherDashboardData {
  teacher: DashboardUser;
  stats: TeacherStats;
  engagement: TeacherEngagement[];
  recentActivity: TeacherActivity[];
  courses: TeacherCourse[];
}
