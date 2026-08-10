"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Bell,
  Flame,
  CalendarDays,
  BookOpen,
  CheckSquare,
  Target,
  ChevronRight,
  ChevronLeft,
  Flag,
  Users,
  ClipboardCheck,
  Code2,
  BarChart3,
  Globe,
  Sprout,
} from "lucide-react";

const courses = [
  {
    title: "Data Science 101",
    slug: "data-science-101",
    teacher: "Prof Munawar",
    progress: 65,
    image: "/courses/data-science.jpg",
    icon: BarChart3,
  },
  {
    title: "Algorithms & Design",
    slug: "algorithms-design",
    teacher: "Prof. Ovais",
    progress: 45,
    image: "/courses/algorithms.jpg",
    icon: Code2,
  },
  {
    title: "Business Analytics",
    slug: "business-analytics",
    teacher: "Prof. Arif",
    progress: 70,
    image: "/courses/business.jpg",
    icon: BarChart3,
  },
  {
    title: "Physics II",
    slug: "physics-ii",
    teacher: "Prof. Haseeb",
    progress: 30,
    image: "/courses/physics.jpg",
    icon: Globe,
  },
  {
    title: "Environmental Science",
    slug: "environmental-science",
    teacher: "Prof.",
    progress: 60,
    image: "/courses/environmental.jpg",
    icon: Sprout,
  },
];

export default function StudentDashboard() {
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (user?.name) {
          setUserName(user.name);
        }
      } catch (error) {
        console.error("Unable to read user data:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfcfc]">
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <header className="flex h-[100px] items-center justify-between border-b border-[#edf0f1] bg-white px-8">
        {/* Welcome */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#00999d]">
              Learning Journey
            </span>

            <span className="text-[#00999d]">〰</span>
          </div>

          <h1 className="mt-1 text-[25px] font-semibold tracking-tight text-[#172636]">
            Welcome back, {userName}
          </h1>

          <p className="mt-1 text-[11px] text-[#8b969c]">
            Pick up where you left off and keep making progress.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-7">
          {/* Streak */}
          <Link
            href="/student/streak"
            className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-[#f4fafa]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf8f8]">
              <Flame size={18} className="text-[#00999d]" />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-[#172636]">
                7{" "}
                <span className="text-[10px] font-normal text-[#6e7b82]">
                  Day Streak
                </span>
              </p>

              <p className="text-[8px] font-medium text-[#00999d]">
                Keep it up!
              </p>
            </div>
          </Link>

          <div className="h-9 w-px bg-[#e9edef]" />

          {/* Tasks */}
          <Link
            href="/student/tasks"
            className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-[#f4fafa]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf8f8]">
              <CalendarDays size={18} className="text-[#00999d]" />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-[#172636]">
                12{" "}
                <span className="text-[10px] font-normal text-[#6e7b82]">
                  Tasks Due
                </span>
              </p>

              <p className="text-[8px] font-medium text-[#00999d]">
                This Week
              </p>
            </div>
          </Link>

          {/* Notifications */}
          <Link
            href="/notifications"
            className="rounded-full p-2 transition hover:bg-[#f4fafa]"
            aria-label="Notifications"
          >
            <Bell
              size={22}
              strokeWidth={1.5}
              className="text-[#172636]"
            />
          </Link>
        </div>
      </header>

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <main className="p-8">
        {/* ===================================================== */}
        {/* TOP ROW */}
        {/* ===================================================== */}

        <div className="grid grid-cols-12 gap-5">
          {/* ================================================= */}
          {/* DAILY PROGRESS */}
          {/* ================================================= */}

          <div className="col-span-4 rounded-xl border border-[#e7ebed] bg-white p-6">
            <h2 className="text-[13px] font-semibold text-[#172636]">
              Daily Progress
            </h2>

            <div className="mt-6 flex items-center gap-7">
              {/* Progress Ring */}
              <div className="relative h-[150px] w-[150px] shrink-0">
                <svg
                  viewBox="0 0 120 120"
                  className="h-full w-full -rotate-90"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#edf0f1"
                    strokeWidth="7"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#008f94"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="301.6"
                    strokeDashoffset="72.4"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[30px] font-semibold text-[#172636]">
                    76%
                  </span>

                  <span className="text-[10px] text-[#7d898f]">
                    Completed
                  </span>

                  <span className="mt-2 rounded-full bg-[#e8f7f7] px-3 py-1 text-[8px] font-medium text-[#008f94]">
                    Great job!
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 space-y-5">
                {/* Study Time */}
                <Link
                  href="/student/progress/study-time"
                  className="block rounded-lg transition hover:bg-[#f7fbfb]"
                >
                  <Stat
                    icon={<BookOpen size={16} />}
                    label="Study Time"
                    value="2h 45m"
                    detail="of 3h goal"
                  />
                </Link>

                {/* Lessons */}
                <Link
                  href="/student/progress/lessons"
                  className="block rounded-lg transition hover:bg-[#f7fbfb]"
                >
                  <Stat
                    icon={<CheckSquare size={16} />}
                    label="Lessons Done"
                    value="5"
                    detail="of 8"
                  />
                </Link>

                {/* Quizzes */}
                <Link
                  href="/student/progress/quizzes"
                  className="block rounded-lg transition hover:bg-[#f7fbfb]"
                >
                  <Stat
                    icon={<Target size={16} />}
                    label="Quizzes Score"
                    value="88%"
                    detail="avg."
                  />
                </Link>
              </div>
            </div>

            {/* Full Progress */}
            <Link
              href="/student/progress"
              className="mt-5 flex items-center gap-2 text-[9px] font-semibold text-[#00999d] transition hover:text-[#007b80]"
            >
              View Full Progress
              <ChevronRight size={12} />
            </Link>
          </div>

          {/* ================================================= */}
          {/* FOCUS OF THE DAY */}
          {/* ================================================= */}

          <div className="col-span-4 rounded-xl border border-[#e7ebed] bg-white p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-[13px] font-semibold text-[#172636]">
                Focus of the Day
              </h2>

              <div className="h-8 w-5 bg-[#00999d] [clip-path:polygon(0_0,100%_0,100%_100%,50%_75%,0_100%)]" />
            </div>

            {/* Lesson Image/Area */}
            <Link
              href="/student/lesson/data-structures"
              className="block rounded-lg transition hover:opacity-90"
            >
              <div className="mt-5 flex h-[70px] items-center justify-center rounded-lg bg-[#e8f6f6]">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-[#008f94]">
                  <Target size={28} className="text-[#008f94]" />
                </div>
              </div>
            </Link>

            <p className="mt-4 text-[8px] font-semibold text-[#00999d]">
              CONTINUE LESSON
            </p>

            {/* Lesson Title */}
            <Link
              href="/student/lesson/data-structures"
              className="block"
            >
              <h3 className="mt-1 text-[14px] font-semibold text-[#172636] transition hover:text-[#00999d]">
                Data Structures in Depth
              </h3>
            </Link>

            <p className="mt-1 text-[9px] text-[#849097]">
              CS-201 · Foundations of Computer Science
            </p>

            {/* Lesson Progress */}
            <div className="mt-4 h-[4px] rounded-full bg-[#edf0f1]">
              <div className="h-full w-[40%] rounded-full bg-[#00999d]" />
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between">
              <Link
                href="/student/lesson/data-structures"
                className="rounded-md bg-[#008f94] px-6 py-2.5 text-[9px] font-semibold text-white transition hover:bg-[#007b80]"
              >
                Resume Lesson
              </Link>

              <Link
                href="/courses/data-structures"
                className="text-[9px] font-semibold text-[#00999d] transition hover:text-[#007b80]"
              >
                View Course
              </Link>
            </div>
          </div>

          {/* ================================================= */}
          {/* UPCOMING MILESTONES */}
          {/* ================================================= */}

          <div className="col-span-4 rounded-xl border border-[#e7ebed] bg-white p-6">
            <h2 className="text-[13px] font-semibold text-[#172636]">
              Upcoming Milestones
            </h2>

            <div className="relative mt-5">
              {/* Timeline */}
              <div className="absolute bottom-3 left-[8px] top-3 w-px bg-[#a8dada]" />

              <div className="space-y-4">
                <Milestone
                  href="/student/milestones/project-proposal"
                  date="May 24"
                  title="Project Proposal"
                  subtitle="Data Science 101"
                  icon={<Flag size={12} />}
                />

                <Milestone
                  href="/student/milestones/midterm"
                  date="May 27"
                  title="Midterm Exam"
                  subtitle="Algorithms & Design"
                  icon={<ClipboardCheck size={12} />}
                />

                <Milestone
                  href="/student/milestones/presentation"
                  date="May 30"
                  title="Group Presentation"
                  subtitle="Business Analytics"
                  icon={<Users size={12} />}
                />

                <Milestone
                  href="/student/milestones/lab-report"
                  date="Jun 2"
                  title="Lab Report"
                  subtitle="Physics I"
                  icon={<ClipboardCheck size={12} />}
                />
              </div>
            </div>

            {/* All Milestones */}
            <Link
              href="/student/milestones"
              className="mt-5 flex items-center gap-2 text-[9px] font-semibold text-[#00999d] transition hover:text-[#007b80]"
            >
              View All Milestones
              <ChevronRight size={12} />
            </Link>
          </div>
        </div>

        {/* ===================================================== */}
        {/* ACTIVE COURSES */}
        {/* ===================================================== */}

        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-[#172636]">
              My Active Courses
            </h2>

            <div className="flex items-center gap-3">
              {/* All Courses */}
              <Link
                href="/courses"
                className="text-[9px] text-[#7d898f] transition hover:text-[#00999d]"
              >
                View All Courses
              </Link>

              {/* Previous */}
              <button
                type="button"
                className="rounded-full p-1 text-[#9aa5aa] transition hover:bg-[#f1f6f6] hover:text-[#00999d]"
                aria-label="Previous courses"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Next */}
              <button
                type="button"
                className="rounded-full p-1 text-[#9aa5aa] transition hover:bg-[#f1f6f6] hover:text-[#00999d]"
                aria-label="Next courses"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-5 gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course.title}
                course={course}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ============================================================= */
/* STAT COMPONENT */
/* ============================================================= */

function Stat({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg p-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf7f7] text-[#00999d]">
        {icon}
      </div>

      <div>
        <p className="text-[8px] text-[#8b969c]">
          {label}
        </p>

        <p className="mt-0.5 text-[11px] font-semibold text-[#172636]">
          {value}

          <span className="ml-1 text-[7px] font-normal text-[#9aa5aa]">
            {detail}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ============================================================= */
/* MILESTONE COMPONENT */
/* ============================================================= */

function Milestone({
  href,
  date,
  title,
  subtitle,
  icon,
}: {
  href: string;
  date: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative flex items-center gap-4 rounded-lg p-1 transition hover:bg-[#f7fbfb]"
    >
      {/* Icon */}
      <div className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#a8dada] bg-[#effafa] text-[#00999d]">
        {icon}
      </div>

      {/* Content */}
      <div>
        <p className="text-[8px] text-[#8b969c]">
          {date}
        </p>

        <p className="mt-0.5 text-[9px] font-semibold text-[#172636]">
          {title}
        </p>

        <p className="text-[7px] text-[#8b969c]">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}

/* ============================================================= */
/* COURSE CARD COMPONENT */
/* ============================================================= */

function CourseCard({
  course,
}: {
  course: (typeof courses)[number];
}) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="block overflow-hidden rounded-xl border border-[#e5e9ea] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Course Image */}
      <div
        className="relative h-[105px] bg-cover"
        style={{
          backgroundImage: `url(${course.image})`,
          backgroundPosition: "center 15%",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Card Content */}
      <div className="p-3">
        <h3 className="truncate text-[10px] font-semibold text-[#172636]">
          {course.title}
        </h3>

        <p className="mt-1 truncate text-[8px] text-[#849097]">
          {course.teacher}
        </p>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-2">
          <div className="h-[4px] flex-1 rounded-full bg-[#e8edef]">
            <div
              className="h-full rounded-full bg-[#00999d]"
              style={{
                width: `${course.progress}%`,
              }}
            />
          </div>

          <span className="text-[8px] text-[#69777f]">
            {course.progress}%
          </span>
        </div>
      </div>
    </Link>
  );
}