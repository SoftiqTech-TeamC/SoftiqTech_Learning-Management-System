const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');
const Submission = require('../models/Submission');
const StudySession = require('../models/StudySession');

function localDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function countStreak(dateStrings) {
  if (dateStrings.length === 0) return 0;
  const set = new Set(dateStrings);
  const today = localDateStr(new Date());
  let cursor = new Date();

  if (!set.has(localDateStr(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (set.has(localDateStr(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function formatMinutes(minutes) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h <= 0) return `${m}m`;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}

function courseCode(title) {
  return (title || '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 4) || 'LMS';
}

// @route  GET /api/dashboard/student
const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const student = await User.findById(userId).select('name email role');
    if (!student) {
      return res.status(404).json({ message: 'User not found' });
    }

    const enrollments = await Enrollment.find({ student: userId })
      .populate({ path: 'course', populate: { path: 'instructor', select: 'name' } })
      .lean();

    const courseIds = enrollments.map((e) => e.course?._id).filter(Boolean);

    const lessons = await Lesson.find({ course: { $in: courseIds } })
      .sort('order')
      .lean();

    const lessonsByCourse = {};
    lessons.forEach((l) => {
      const key = l.course.toString();
      if (!lessonsByCourse[key]) lessonsByCourse[key] = [];
      lessonsByCourse[key].push(l);
    });

    const submissions = await Submission.find({ student: userId })
      .populate('course', 'title')
      .lean();

    const sessions = await StudySession.find({ student: userId }).lean();

    const tasksDue = submissions.filter(
      (s) => s.status === 'pending' || s.status === 'late'
    ).length;

    const streakDays = countStreak(
      sessions.map((s) => localDateStr(new Date(s.sessionDate)))
    );

    const totalStudyMinutes = sessions.reduce((sum, s) => sum + (s.minutes || 0), 0);
    const todayMinutes = sessions
      .filter((s) => localDateStr(new Date(s.sessionDate)) === localDateStr(new Date()))
      .reduce((sum, s) => sum + (s.minutes || 0), 0);

    const graded = submissions.filter((s) => s.status === 'graded' && s.grade != null);
    const avgScore = graded.length
      ? Math.round(graded.reduce((sum, s) => sum + s.grade, 0) / graded.length)
      : 0;

    const lessonsDone = enrollments.reduce((sum, e) => sum + (e.completedLessons || []).length, 0);

    const overallProgress = enrollments.length
      ? Math.round(enrollments.reduce((sum, e) => sum + (e.progressPercent || 0), 0) / enrollments.length)
      : 0;

    const courses = enrollments.map((e) => {
      const courseLessons = e.course?._id ? lessonsByCourse[e.course._id.toString()] || [] : [];
      return {
        id: e.course?._id,
        title: e.course?.title || 'Untitled course',
        instructorName: e.course?.instructor?.name || '',
        category: e.course?.category || '',
        level: e.course?.level || '',
        progress: e.progressPercent || 0,
        status: e.status,
        lastAccessedAt: e.lastAccessedAt,
        lessonsDone: (e.completedLessons || []).length,
        lessonsTotal: courseLessons.length,
        coverImage: e.course?.coverImage || '',
      };
    });

    const active = enrollments.filter((e) => e.status === 'active' && e.course);
    const focusEnrollment = active.length
      ? active
          .slice()
          .sort(
            (a, b) =>
              (a.progressPercent || 0) - (b.progressPercent || 0) ||
              new Date(b.lastAccessedAt) - new Date(a.lastAccessedAt)
          )[0]
      : enrollments[0];

    let focus = null;
    if (focusEnrollment && focusEnrollment.course) {
      const courseLessons = lessonsByCourse[focusEnrollment.course._id.toString()] || [];
      const completed = new Set(
        (focusEnrollment.completedLessons || []).map((id) => id.toString())
      );
      const nextLesson = courseLessons.find((l) => !completed.has(l._id.toString()));

      focus = {
        courseId: focusEnrollment.course._id,
        courseTitle: focusEnrollment.course.title,
        courseCode: courseCode(focusEnrollment.course.title),
        courseCategory: focusEnrollment.course.category || '',
        courseProgress: focusEnrollment.progressPercent || 0,
        lessonId: nextLesson?._id || null,
        lessonTitle: nextLesson?.title || 'Course complete',
        lessonDurationMin: nextLesson?.durationMin || 0,
      };
    }

    const milestones = submissions
      .filter((s) => s.dueDate && (s.status === 'pending' || s.status === 'late'))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 4)
      .map((s) => ({
        id: s._id,
        title: s.assignmentTitle,
        subtitle: s.course?.title || '',
        date: s.dueDate,
        status: s.status,
      }));

    res.json({
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
      },
      overallProgress,
      stats: {
        streakDays,
        tasksDue,
        studyTimeToday: formatMinutes(todayMinutes),
        totalStudyMinutes,
        lessonsDone,
        totalLessons: lessons.length,
        avgScore,
      },
      focus,
      milestones,
      courses,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/dashboard/teacher
const getTeacherDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const teacher = await User.findById(userId).select('name email role');
    if (!teacher) {
      return res.status(404).json({ message: 'User not found' });
    }

    const courses = await Course.find({ instructor: userId, status: 'published' }).lean();
    const courseIds = courses.map((c) => c._id);

    const enrollments = await Enrollment.find({ course: { $in: courseIds } }).lean();

    const submissions = await Submission.find({ course: { $in: courseIds } })
      .populate('student', 'name')
      .populate('course', 'title')
      .sort({ submittedAt: -1 })
      .lean();

    const recentEnrollments = await Enrollment.find({ course: { $in: courseIds } })
      .populate('student', 'name')
      .populate('course', 'title')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const totalStudents = new Set(enrollments.map((e) => e.student.toString())).size;
    const pendingSubmissions = submissions.filter(
      (s) => s.status === 'pending' || s.status === 'late'
    ).length;

    const engagement = courses
      .map((c) => {
        const enr = enrollments.filter((e) => e.course.toString() === c._id.toString());
        const avg = enr.length
          ? Math.round(enr.reduce((sum, e) => sum + (e.progressPercent || 0), 0) / enr.length)
          : 0;
        return {
          courseId: c._id,
          courseTitle: c.title,
          category: c.category || '',
          avgProgress: avg,
          students: enr.length,
          completed: enr.filter((e) => e.status === 'completed').length,
        };
      })
      .sort((a, b) => b.students - a.students);

    const activity = [];
    submissions.slice(0, 8).forEach((s) => {
      if (s.student) {
        activity.push({
          type: 'submission',
          message: `${s.student.name} submitted ${s.assignmentTitle} for ${s.course?.title || ''}`,
          date: s.submittedAt,
        });
      }
    });
    recentEnrollments.forEach((e) => {
      if (e.student) {
        activity.push({
          type: 'enrollment',
          message: `${e.student.name} enrolled in ${e.course?.title || ''}`,
          date: e.createdAt,
        });
      }
    });

    res.json({
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: teacher.role,
      },
      stats: {
        totalStudents,
        activeCourses: courses.length,
        pendingSubmissions,
        totalEnrollments: enrollments.length,
        averageProgress: enrollments.length
          ? Math.round(enrollments.reduce((sum, e) => sum + (e.progressPercent || 0), 0) / enrollments.length)
          : 0,
      },
      engagement,
      recentActivity: activity
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6),
      courses: courses.map((c) => ({
        id: c._id,
        title: c.title,
        category: c.category || '',
        level: c.level || '',
      })),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getStudentDashboard, getTeacherDashboard };
