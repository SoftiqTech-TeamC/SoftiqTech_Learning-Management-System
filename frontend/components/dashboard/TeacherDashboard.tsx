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
      time: "10 min ago",
      href: "/teacher/submissions",
    },
    {
      text: 'Safdar posted in "Week 6 Discussion"',
      time: "32 min ago",
      href: "/teacher/forum",
    },
    {
      text: "Anousha submitted Lab Report for Bio 201",
      time: "1 hour ago",
      href: "/teacher/submissions",
    },
  ];

  const courses = [
    {
      name: "Eng 101",
      engagement: 75,
      href: "/teacher/courses/eng-101",
    },
    {
      name: "Bio 201",
      engagement: 62,
      href: "/teacher/courses/bio-201",
    },
    {
      name: "Psych 150",
      engagement: 45,
      href: "/teacher/courses/psych-150",
    },
    {
      name: "CS 320",
      engagement: 88,
      href: "/teacher/courses/cs-320",
    },
    {
      name: "Hist 210",
      engagement: 56,
      href: "/teacher/courses/hist-210",
    },
    {
      name: "Math 120",
      engagement: 70,
      href: "/teacher/courses/math-120",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-[68px] items-center justify-between gap-6 px-6 lg:px-8">
          {/* TITLE */}
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
              Instructor Overview
            </h1>

            <p className="mt-0.5 hidden text-sm text-slate-500 sm:block">
              Welcome back, Dr. Ahad! Here's what's happening with your
              classes today.
            </p>
          </div>

          {/* HEADER ACTIONS */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Search students, courses, content..."
                className="h-10 w-[280px] rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10 xl:w-[320px]"
              />
            </div>

            <Link
              href="/teacher/notifications"
              title="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:border-teal-300 hover:bg-teal-50"
            >
              <Bell size={19} className="text-slate-600" />
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto w-full max-w-[1600px] space-y-5 px-5 py-5 lg:px-7">
        {/* STAT CARDS */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* TOTAL STUDENTS */}
          <Link
            href="/teacher/students"
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50">
                <Users size={21} className="text-teal-600" />
              </div>

              <span className="text-xs font-semibold text-teal-600">
                +12%
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Total Students
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              248
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Compared with last month
            </p>

            <p className="mt-3 text-xs font-semibold text-teal-600">
              View students →
            </p>
          </Link>

          {/* ACTIVE COURSES */}
          <Link
            href="/teacher/courses"
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50">
                <BookOpen size={21} className="text-teal-600" />
              </div>

              <span className="text-xs font-semibold text-slate-400">
                Active
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Active Courses
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              6
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Courses currently being taught
            </p>

            <p className="mt-3 text-xs font-semibold text-teal-600">
              View all courses →
            </p>
          </Link>

          {/* PENDING SUBMISSIONS */}
          <Link
            href="/teacher/submissions"
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                <ClipboardList size={21} className="text-red-500" />
              </div>

              <span className="text-xs font-semibold text-red-500">
                38 pending
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              Pending Submissions
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              38
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Assignments waiting for review
            </p>

            <p className="mt-3 text-xs font-semibold text-teal-600">
              Grade submissions →
            </p>
          </Link>
        </section>

        {/* ENGAGEMENT + QUICK ACTIONS */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_380px]">
          {/* CLASS ENGAGEMENT */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Class Engagement
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Engagement overview across your courses
                </p>
              </div>

              <select className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-600 outline-none focus:border-teal-500">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            {/* CHART */}
            <div className="mt-6">
              <div className="flex h-[230px] items-end gap-3 border-b border-slate-100 px-2 sm:gap-5">
                {courses.map((course) => (
                  <Link
                    key={course.name}
                    href={course.href}
                    className="group flex h-full min-w-0 flex-1 flex-col justify-end"
                  >
                    <div className="flex h-full items-end justify-center">
                      <div
                        className="w-full max-w-[42px] rounded-t-md bg-teal-500 transition-all duration-200 group-hover:bg-teal-600"
                        style={{
                          height: `${course.engagement}%`,
                        }}
                      />
                    </div>

                    <p className="mt-2 truncate text-center text-[11px] font-medium text-slate-500 transition group-hover:text-teal-600">
                      {course.name}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-2 flex justify-between px-2 text-[10px] text-slate-400">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Manage your classes
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {quickActions.map(
                ({ name, icon: Icon, href }) => (
                  <Link
                    key={name}
                    href={href}
                    className="group flex min-h-[100px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-50 hover:shadow-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 transition group-hover:bg-white">
                      <Icon
                        size={19}
                        className="text-teal-600"
                      />
                    </div>

                    <span className="mt-2 text-[11px] font-semibold text-slate-700">
                      {name}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Activity
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Latest activity from your classes
              </p>
            </div>

            <Link
              href="/teacher/activity"
              className="text-xs font-semibold text-teal-600 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {activities.map((activity) => (
              <Link
                key={activity.text}
                href={activity.href}
                className="flex items-center gap-4 py-3 transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50">
                  <ClipboardList
                    size={17}
                    className="text-teal-600"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {activity.text}
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {activity.time}
                  </p>
                </div>

                <span className="text-sm text-slate-300 transition group-hover:text-teal-500">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SHORTCUTS */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* CALENDAR */}
          <Link
            href="/teacher/calendar"
            className="group flex min-h-[82px] items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50">
              <CalendarDays
                size={21}
                className="text-teal-600"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-800">
                Calendar
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                View your teaching schedule
              </p>
            </div>

            <span className="ml-auto text-slate-300 group-hover:text-teal-500">
              →
            </span>
          </Link>

          {/* ASSIGNMENTS */}
          <Link
            href="/teacher/assignments"
            className="group flex min-h-[82px] items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50">
              <FileText
                size={21}
                className="text-teal-600"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-800">
                Assignments
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Manage course assignments
              </p>
            </div>

            <span className="ml-auto text-slate-300 group-hover:text-teal-500">
              →
            </span>
          </Link>

          {/* MESSAGES */}
          <Link
            href="/teacher/messages"
            className="group flex min-h-[82px] items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50">
              <MessageSquare
                size={21}
                className="text-teal-600"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-800">
                Messages
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Communicate with students
              </p>
            </div>

            <span className="ml-auto text-slate-300 group-hover:text-teal-500">
              →
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
}