
"use client";

import {
  BarChart3,
  Bell,
  TrendingUp,
  Users,
  Award,
  Clock,
  Download,
  ChevronDown,
} from "lucide-react";

import TeacherSidebar from "@/components/teacher/TeacherSidebar";

const courses = [
  {
    name: "Environmental Science",
    students: 62,
    completion: 84,
    average: 88,
    attendance: 92,
  },
  {
    name: "Database Systems",
    students: 48,
    completion: 76,
    average: 81,
    attendance: 87,
  },
  {
    name: "Data Structures",
    students: 55,
    completion: 91,
    average: 85,
    attendance: 89,
  },
  {
    name: "Computer Science",
    students: 43,
    completion: 69,
    average: 78,
    attendance: 82,
  },
];

const weeklyActivity = [
  { day: "Mon", value: 64 },
  { day: "Tue", value: 82 },
  { day: "Wed", value: 71 },
  { day: "Thu", value: 93 },
  { day: "Fri", value: 76 },
  { day: "Sat", value: 48 },
  { day: "Sun", value: 36 },
];

export default function TeacherAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Teacher Sidebar */}
      <TeacherSidebar />

      {/* Main Content */}
      <div className="ml-[240px] min-h-screen">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="flex flex-col gap-5 px-8 py-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-[#087F87]">
                Performance
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Analytics
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Understand student engagement, performance and course
                progress.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                aria-label="Notifications"
              >
                <Bell size={21} />
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Download size={17} />
                Export Report
              </button>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="space-y-6 p-8">
          {/* Performance Overview */}
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Performance Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Compare your courses and student activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#087F87]"
                defaultValue="All Courses"
              >
                <option>All Courses</option>
                <option>Environmental Science</option>
                <option>Database Systems</option>
                <option>Data Structures</option>
                <option>Computer Science</option>
              </select>

              <select
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#087F87]"
                defaultValue="Last 30 Days"
              >
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last 90 Days</option>
                <option>This Year</option>
              </select>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* Active Students */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <Users className="text-[#087F87]" size={22} />

                <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  <TrendingUp size={13} />
                  8.4%
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Active Students
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                248
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Compared with previous period
              </p>
            </div>

            {/* Average Score */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <Award className="text-[#087F87]" size={22} />

                <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  <TrendingUp size={13} />
                  5.2%
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Average Score
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                83.6%
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Across all assessments
              </p>
            </div>

            {/* Course Completion */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <BarChart3 className="text-[#087F87]" size={22} />

                <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  <TrendingUp size={13} />
                  11.8%
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Course Completion
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                80.4%
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Average completion rate
              </p>
            </div>

            {/* Learning Time */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <Clock className="text-[#087F87]" size={22} />

                <span className="text-xs font-semibold text-green-600">
                  Healthy
                </span>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Avg. Learning Time
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                6h 42m
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Per student / week
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Weekly Activity */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Weekly Student Activity
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Engagement throughout the week
                  </p>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-700"
                >
                  This Week
                  <ChevronDown size={15} />
                </button>
              </div>

              <div className="mt-8 flex h-72 items-end gap-4">
                {weeklyActivity.map((item) => (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="flex h-full items-end">
                      <div
                        className="w-full rounded-t-lg bg-[#087F87] transition hover:bg-[#066B72]"
                        style={{
                          height: `${item.value}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3 text-center">
                      <p className="text-xs font-medium text-slate-500">
                        {item.day}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Breakdown */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">
                Performance Breakdown
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Student score distribution
              </p>

              <div className="mt-8 space-y-5">
                {/* Excellent */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">
                      Excellent
                    </span>

                    <span className="font-semibold">
                      32%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[32%] rounded-full bg-green-500" />
                  </div>
                </div>

                {/* Good */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">
                      Good
                    </span>

                    <span className="font-semibold">
                      41%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[41%] rounded-full bg-[#087F87]" />
                  </div>
                </div>

                {/* Average */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">
                      Average
                    </span>

                    <span className="font-semibold">
                      19%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[19%] rounded-full bg-amber-500" />
                  </div>
                </div>

                {/* Needs Attention */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-600">
                      Needs Attention
                    </span>

                    <span className="font-semibold">
                      8%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 w-[8%] rounded-full bg-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Performance */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="font-bold text-slate-900">
                  Course Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Detailed performance by course
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-medium text-[#087F87] hover:underline"
              >
                View Details
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-6 py-4">
                      Course
                    </th>

                    <th className="px-6 py-4">
                      Students
                    </th>

                    <th className="px-6 py-4">
                      Completion
                    </th>

                    <th className="px-6 py-4">
                      Avg. Score
                    </th>

                    <th className="px-6 py-4">
                      Attendance
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {courses.map((course) => (
                    <tr
                      key={course.name}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-900">
                          {course.name}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {course.students}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-20 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-[#087F87]"
                              style={{
                                width: `${course.completion}%`,
                              }}
                            />
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {course.completion}%
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {course.average}%
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-slate-700">
                        {course.attendance}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
