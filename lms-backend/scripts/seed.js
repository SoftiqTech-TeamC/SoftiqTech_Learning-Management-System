require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Course = require('../src/models/Course');
const Lesson = require('../src/models/Lesson');
const Enrollment = require('../src/models/Enrollment');
const Submission = require('../src/models/Submission');
const StudySession = require('../src/models/StudySession');

const PASSWORD = 'Password123!';

function monthsAgo(months) {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  d.setDate(1 + Math.floor(Math.random() * 27));
  return d;
}

function randomOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function lessonTitles(course) {
  return [
    `Introduction to ${course}`,
    `${course}: Core Concepts`,
    `Hands-on Practice: ${course}`,
    `Advanced ${course} Techniques`,
    `Case Study: ${course}`,
    `${course} Quiz`,
    `Review & Next Steps`,
    `Final Assessment`,
  ];
}

const STUDENT_NAMES = [
  'Ali Khan', 'Sarah Ahmed', 'Anousha Raza', 'Safdar Hussain', 'Ayesha Malik',
  'Hamza Farooq', 'Fatima Noor', 'Usman Tariq', 'Zainab Bibi', 'Bilal Sheikh',
  'Hina Javed', 'Omar Yousaf', 'Mahnoor Ali', 'Rayan Abbas', 'Iqra Saeed',
  'Daniyal Shah', 'Sania Qureshi', 'Adeel Aslam', 'Mariam Khan', 'Waleed Anjum',
  'Rabia Saleem', 'Taha Siddiqui', 'Sana Zafar', 'Hassan Rizvi', 'Noor Fatima',
];

const COURSES_DATA = [
  { title: 'Data Science 101', instructor: 'Prof. Munawar', category: 'Data Science', level: 'beginner' },
  { title: 'Algorithms & Design', instructor: 'Prof. Ovais', category: 'Computer Science', level: 'advanced' },
  { title: 'Business Analytics', instructor: 'Prof. Arif', category: 'Business', level: 'intermediate' },
  { title: 'Physics II', instructor: 'Prof. Haseeb', category: 'Physics', level: 'intermediate' },
  { title: 'Environmental Science', instructor: 'Prof. Sana', category: 'Environmental Science', level: 'beginner' },
  { title: 'Web Development Bootcamp', instructor: 'Prof. Ovais', category: 'Computer Science', level: 'beginner' },
  { title: 'Statistics & Probability', instructor: 'Prof. Arif', category: 'Mathematics', level: 'intermediate' },
  { title: 'Digital Marketing', instructor: 'Prof. Sana', category: 'Business', level: 'beginner' },
];

const ASSIGNMENTS = [
  'Project Proposal', 'Midterm Exam', 'Group Presentation', 'Lab Report',
  'Assignment 3', 'Research Paper Draft', 'Final Project', 'Weekly Quiz',
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Lesson.deleteMany({}),
      Enrollment.deleteMany({}),
      Submission.deleteMany({}),
      StudySession.deleteMany({}),
    ]);
    console.log('Cleared existing demo data');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(PASSWORD, salt);

    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@lms.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: monthsAgo(12),
    });

    const instructorDocs = await Promise.all(
      COURSES_DATA.map((c) => c.instructor)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map((name, i) =>
          User.create({
            name,
            email: `${name.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/prof/g, '')}@lms.com`,
            password: hashedPassword,
            role: 'instructor',
            createdAt: monthsAgo(9 - i),
          })
        )
    );
    const instructorByTitle = {};
    instructorDocs.forEach((doc) => {
      instructorByTitle[doc.name] = doc;
    });

    const students = await Promise.all(
      STUDENT_NAMES.map((name, i) =>
        User.create({
          name,
          email: `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}${i + 1}@lms.com`,
          password: hashedPassword,
          role: 'student',
          createdAt: monthsAgo(11 - (i % 11)),
        })
      )
    );
    console.log(`Created users: ${1 + instructorDocs.length + students.length}`);

    const courses = await Promise.all(
      COURSES_DATA.map((c, i) =>
        Course.create({
          title: c.title,
          description: `A comprehensive ${c.level} course covering the fundamentals and advanced topics of ${c.title}.`,
          category: c.category,
          level: c.level,
          instructor: instructorByTitle[c.instructor]._id,
          durationHours: 10 + (i * 4),
          status: 'published',
          createdAt: monthsAgo(6 + (i % 6)),
        })
      )
    );

    const lessons = [];
    for (const course of courses) {
      const titles = lessonTitles(course.title);
      for (let i = 0; i < titles.length; i++) {
        lessons.push(
          await Lesson.create({
            course: course._id,
            title: titles[i],
            order: i,
            durationMin: 15 + ((i * 7) % 40),
            type: titles[i].toLowerCase().includes('quiz') ? 'quiz' : 'video',
          })
        );
      }
    }
    console.log(`Created ${courses.length} courses, ${lessons.length} lessons`);

    const lessonsByCourse = {};
    lessons.forEach((l) => {
      const key = l.course.toString();
      if (!lessonsByCourse[key]) lessonsByCourse[key] = [];
      lessonsByCourse[key].push(l);
    });

    const enrollments = [];
    const submissions = [];
    const sessions = [];

    for (const student of students) {
      const chosen = [...courses].sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 3));

      for (const course of chosen) {
        const courseLessons = lessonsByCourse[course._id.toString()] || [];
        const completed = Math.random() < 0.25;
        const progress = completed ? 100 : Math.floor(Math.random() * 92) + 5;
        const doneCount = Math.floor((progress / 100) * courseLessons.length);
        const completedLessons = courseLessons.slice(0, doneCount).map((l) => l._id);

        const enrollment = await Enrollment.create({
          student: student._id,
          course: course._id,
          progressPercent: progress,
          status: completed ? 'completed' : 'active',
          lastAccessedAt: new Date(Date.now() - Math.floor(Math.random() * 5) * 86400000),
          completedLessons,
          createdAt: monthsAgo(Math.floor(Math.random() * 3)),
        });
        enrollments.push(enrollment);

        const assignCount = 1 + Math.floor(Math.random() * 3);
        for (let k = 0; k < assignCount; k++) {
          const roll = Math.random();
          let status = 'pending';
          let dueDate = new Date(Date.now() + (1 + Math.floor(Math.random() * 14)) * 86400000);
          let grade = null;
          let submittedAt = new Date(Date.now() - Math.floor(Math.random() * 20) * 86400000);

          if (roll < 0.35) {
            status = 'graded';
            grade = 55 + Math.floor(Math.random() * 45);
            dueDate = new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000);
          } else if (roll < 0.5) {
            status = 'late';
            dueDate = new Date(Date.now() - Math.floor(Math.random() * 5) * 86400000);
          }

          submissions.push(
            await Submission.create({
              student: student._id,
              course: course._id,
              assignmentTitle: randomOf(ASSIGNMENTS),
              dueDate,
              submittedAt,
              status,
              grade,
              createdAt: submittedAt,
            })
          );
        }
      }

      for (let i = 0; i < 14; i++) {
        if (Math.random() < 0.25) continue;
        const day = new Date();
        day.setDate(day.getDate() - i);
        day.setHours(9 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 60), 0, 0);
        const count = 1 + Math.floor(Math.random() * 3);
        for (let k = 0; k < count; k++) {
          const course = randomOf(chosen);
          const courseLessons = lessonsByCourse[course._id.toString()] || [];
          const sessionDate = new Date(day);
          sessionDate.setHours(sessionDate.getHours() + k);
          sessions.push(
            await StudySession.create({
              student: student._id,
              course: course._id,
              lesson: courseLessons.length ? randomOf(courseLessons)._id : null,
              minutes: 20 + Math.floor(Math.random() * 70),
              sessionDate,
              createdAt: sessionDate,
            })
          );
        }
      }
    }

    console.log(
      `Created ${enrollments.length} enrollments, ${submissions.length} submissions, ${sessions.length} study sessions`
    );
    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
