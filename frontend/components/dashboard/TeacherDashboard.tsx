"use client";

import Link from "next/link";
import {
  Bell,
  BookOpen,
  Users,
  ClipboardList,
  MessageSquare,
  BarChart3,
  CalendarDays,
  FileText,
} from "lucide-react";

export default function TeacherDashboard() {
  const quickActions = [
    {
      name: "Grade Submissions",
      icon: ClipboardList,
      href: "/teacher/submissions",
    },
    {
      name: "Send Message",
      icon: MessageSquare,
      href: "/teacher/messages",
    },
    {
      name: "Create Assignment",
      icon: BookOpen,
      href: "/teacher/assignments/create",
    },
    {
      name: "Post to Forum",
      icon: MessageSquare,
      href: "/teacher/forum",
    },
    {
      name: "Take Attendance",
      icon: Users,
      href: "/teacher/attendance",
    },
    {
      name: "View Analytics",
      icon: BarChart3,
      href: "/teacher/analytics",
    },
  ];

  const activities = [
    {
      text: "Sarah submitted Assignment 3 for Eng 101",
      href: "/teacher/submissions",
    },
    {
      text: 'Safdar posted in "Week 6 Discussion"',
      href: "/teacher/forum",
    },
    {
      text: "Anousha submitted Lab Report for Bio 201",
      href: "/teacher/submissions",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="flex items-center justify-between border-b bg-white px-8 py-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Instructor Overview
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, Dr. Ahad! Here's what's happening with your
            classes today.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {/* Search */}
          <input
            type="text"
            placeholder="Search students, courses, content..."
            className="w-80 rounded-lg border px-4 py-3 text-sm outline-none focus:border-teal-500"
          />

          {/* Notifications */}
          <Link
            href="/teacher/notifications"
            className="rounded-lg p-2 transition hover:bg-slate-100"
            title="Notifications"
          >
            <Bell className="text-slate-600" />
          </Link>
        </div>
      </header>

      <main className="space-y-6 p-8">

        {/* =========================
            STAT CARDS
        ========================= */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* TOTAL STUDENTS */}
          <Link
            href="/teacher/students"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-400 hover:shadow-md"
          >
            <Users className="text-teal-600" />

            <p className="mt-4 text-sm text-slate-500">
              Total Students
            </p>

            <h2 className="text-3xl font-bold">
              248
            </h2>

            <p className="mt-2 text-sm text-teal-600">
              ↑ 12% from last month
            </p>

            <p className="mt-3 text-xs font-medium text-slate-400">
              View students →
            </p>
          </Link>

          {/* ACTIVE COURSES */}
          <Link
            href="/teacher/courses"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-400 hover:shadow-md"
          >
            <BookOpen className="text-teal-600" />

            <p className="mt-4 text-sm text-slate-500">
              Active Courses
            </p>

            <h2 className="text-3xl font-bold">
              6
            </h2>

            <p className="mt-2 text-sm text-teal-600">
              View all courses →
            </p>
          </Link>

          {/* PENDING SUBMISSIONS */}
          <Link
            href="/teacher/submissions"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-400 hover:shadow-md"
          >
            <ClipboardList className="text-teal-600" />

            <p className="mt-4 text-sm text-slate-500">
              Pending Submissions
            </p>

            <h2 className="text-3xl font-bold">
              38
            </h2>

            <p className="mt-2 text-sm text-red-500">
              ↓ 8% from yesterday
            </p>

            <p className="mt-3 text-xs font-medium text-slate-400">
              Grade submissions →
            </p>
          </Link>

        </div>

        {/* =========================
            MAIN CONTENT
        ========================= */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* CLASS ENGAGEMENT */}
          <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Class Engagement
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Engagement overview by course
                </p>
              </div>

              <select className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-teal-500">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            <div className="mt-8 flex h-64 items-end justify-around gap-4">
              {[
                75,
                62,
                45,
                88,
                56,
                70,
              ].map((height, index) => {

                const courses = [
                  {
                    name: "Eng 101",
                    href: "/teacher/courses/eng-101",
                  },
                  {
                    name: "Bio 201",
                    href: "/teacher/courses/bio-201",
                  },
                  {
                    name: "Psych 150",
                    href: "/teacher/courses/psych-150",
                  },
                  {
                    name: "CS 320",
                    href: "/teacher/courses/cs-320",
                  },
                  {
                    name: "Hist 210",
                    href: "/teacher/courses/hist-210",
                  },
                  {
                    name: "Math 120",
                    href: "/teacher/courses/math-120",
                  },
                ];

                const course = courses[index];

                return (
                  <Link
                    key={course.name}
                    href={course.href}
                    className="group flex h-full flex-1 flex-col justify-end"
                  >
                    <div
                      className="rounded-t-lg bg-teal-600 transition group-hover:bg-teal-700"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                    <p className="mt-2 text-center text-xs text-slate-500 group-hover:text-teal-600">
                      {course.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Quick Actions
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Manage your classes
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">

              {quickActions.map(
                ({ name, icon: Icon, href }) => (
                  <Link
                    key={name}
                    href={href}
                    className="flex min-h-28 flex-col items-center justify-center rounded-lg border p-4 text-center transition hover:-translate-y-1 hover:border-teal-500 hover:bg-teal-50 hover:shadow-sm"
                  >
                    <Icon
                      className="mb-3 text-teal-600"
                      size={24}
                    />

                    <span className="text-xs font-medium text-slate-700">
                      {name}
                    </span>
                  </Link>
                )
              )}

            </div>
          </div>

        </div>

        {/* =========================
            RECENT ACTIVITY
        ========================= */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest activity from your classes
              </p>
            </div>

            <Link
              href="/teacher/activity"
              className="text-sm font-medium text-teal-600 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-4">

            {activities.map((activity) => (
              <Link
                key={activity.text}
                href={activity.href}
                className="flex items-center gap-4 border-b pb-4 transition hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <ClipboardList size={18} />
                </div>

                <p className="text-sm text-slate-700">
                  {activity.text}
                </p>
              </Link>
            ))}

          </div>
        </div>

        {/* =========================
            TEACHER SHORTCUTS
        ========================= */}
        <div className="grid gap-6 md:grid-cols-3">

          <Link
            href="/teacher/calendar"
            className="flex items-center gap-4 rounded-xl border bg-white p-5 shadow-sm transition hover:border-teal-400 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50">
              <CalendarDays
                className="text-teal-600"
                size={22}
              />
            </div>

            <div>
              <h3 className="font-semibold">
                Calendar
              </h3>

              <p className="text-xs text-slate-500">
                View your teaching schedule
              </p>
            </div>
          </Link>

          <Link
            href="/teacher/assignments"
            className="flex items-center gap-4 rounded-xl border bg-white p-5 shadow-sm transition hover:border-teal-400 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50">
              <FileText
                className="text-teal-600"
                size={22}
              />
            </div>

            <div>
              <h3 className="font-semibold">
                Assignments
              </h3>

              <p className="text-xs text-slate-500">
                Manage course assignments
              </p>
            </div>
          </Link>

          <Link
            href="/teacher/messages"
            className="flex items-center gap-4 rounded-xl border bg-white p-5 shadow-sm transition hover:border-teal-400 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50">
              <MessageSquare
                className="text-teal-600"
                size={22}
              />
            </div>

            <div>
              <h3 className="font-semibold">
                Messages
              </h3>

              <p className="text-xs text-slate-500">
                Communicate with students
              </p>
            </div>
          </Link>

        </div>

      </main>
    </div>
  );
}