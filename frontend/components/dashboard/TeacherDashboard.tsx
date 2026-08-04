"use client";

import {
  Bell,
  BookOpen,
  Users,
  ClipboardList,
  MessageSquare,
  CalendarDays,
  BarChart3,
} from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-8 py-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Instructor Overview
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, Dr. Ahad! Here's what's happening with your classes today.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <input
            type="text"
            placeholder="Search students, courses, content..."
            className="w-80 rounded-lg border px-4 py-3 text-sm outline-none focus:border-teal-500"
          />

          <Bell className="text-slate-600" />
        </div>
      </header>

      <main className="space-y-6 p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <Users className="text-teal-600" />

            <p className="mt-4 text-sm text-slate-500">
              Total Students
            </p>

            <h2 className="text-3xl font-bold">248</h2>

            <p className="mt-2 text-sm text-teal-600">
              ↑ 12% from last month
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <BookOpen className="text-teal-600" />

            <p className="mt-4 text-sm text-slate-500">
              Active Courses
            </p>

            <h2 className="text-3xl font-bold">6</h2>

            <p className="mt-2 text-sm text-teal-600">
              View all courses →
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <ClipboardList className="text-teal-600" />

            <p className="mt-4 text-sm text-slate-500">
              Pending Submissions
            </p>

            <h2 className="text-3xl font-bold">38</h2>

            <p className="mt-2 text-sm text-red-500">
              ↓ 8% from yesterday
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                Class Engagement
              </h2>

              <select className="rounded-lg border px-3 py-2 text-sm">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            <div className="mt-8 flex h-64 items-end justify-around gap-4">
              {[75, 62, 45, 88, 56, 70].map((height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 flex-col justify-end"
                >
                  <div
                    className="rounded-t-lg bg-teal-600"
                    style={{ height: `${height}%` }}
                  />

                  <p className="mt-2 text-center text-xs text-slate-500">
                    {["Eng 101", "Bio 201", "Psych 150", "CS 320", "Hist 210", "Math 120"][index]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">
              Quick Actions
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                ["Grade Submissions", ClipboardList],
                ["Send Message", MessageSquare],
                ["Create Assignment", BookOpen],
                ["Post to Forum", MessageSquare],
                ["Take Attendance", Users],
                ["View Analytics", BarChart3],
              ].map(([name, Icon]) => {
                const ActionIcon = Icon as typeof ClipboardList;

                return (
                  <button
                    key={name as string}
                    className="flex min-h-28 flex-col items-center justify-center rounded-lg border p-4 text-center hover:border-teal-500 hover:bg-teal-50"
                  >
                    <ActionIcon className="mb-3 text-teal-600" size={24} />
                    <span className="text-xs font-medium">
                      {name as string}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Recent Activity</h2>

          <div className="mt-5 space-y-4">
            {[
              "Sarah submitted Assignment 3 for Eng 101",
              'Safdar  posted in "Week 6 Discussion"',
              "Anousha submitted Lab Report for Bio 201",
            ].map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-4 border-b pb-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <ClipboardList size={18} />
                </div>

                <p className="text-sm">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}