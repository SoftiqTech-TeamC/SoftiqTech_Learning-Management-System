"use client";

import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Plus,
  Search,
  MoreHorizontal,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Computer Science 320",
    code: "CS-320",
    description: "Advanced algorithms, data structures and problem solving.",
    students: 48,
    progress: 82,
    status: "Active",
    color: "bg-teal-600",
  },
  {
    id: 2,
    title: "Biology 201",
    code: "BIO-201",
    description: "Fundamentals of biology, genetics and cellular systems.",
    students: 36,
    progress: 74,
    status: "Active",
    color: "bg-emerald-600",
  },
  {
    id: 3,
    title: "Mathematics 120",
    code: "MATH-120",
    description: "Core mathematical concepts and quantitative reasoning.",
    students: 52,
    progress: 68,
    status: "Active",
    color: "bg-blue-600",
  },
  {
    id: 4,
    title: "Psychology 150",
    code: "PSY-150",
    description: "Introduction to human behavior and cognitive processes.",
    students: 41,
    progress: 61,
    status: "Active",
    color: "bg-violet-600",
  },
  {
    id: 5,
    title: "History 210",
    code: "HIST-210",
    description: "Historical analysis, research and critical thinking.",
    students: 31,
    progress: 45,
    status: "Draft",
    color: "bg-amber-600",
  },
];

export default function TeacherCoursesPage() {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Sidebar />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-teal-600">
                Teaching Workspace
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                My Courses
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage your courses, students and learning content.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-[#087f87] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b72]">
              <Plus size={18} />
              Create Course
            </button>
          </div>
        </header>

        <main className="space-y-6 p-8">
          <div className="grid gap-5 md:grid-cols-3">
            <Summary
              icon={BookOpen}
              title="Total Courses"
              value="6"
            />

            <Summary
              icon={Users}
              title="Total Students"
              value="248"
            />

            <Summary
              icon={BarChart3}
              title="Average Progress"
              value="72%"
            />
          </div>

          <section className="rounded-2xl border bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Course Library
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  All courses assigned to you.
                </p>
              </div>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="w-72 rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-2">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-xl border p-5 transition hover:border-teal-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-lg ${course.color} text-white`}
                      >
                        <BookOpen size={21} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {course.title}
                        </h3>

                        <p className="text-xs text-slate-500">
                          {course.code}
                        </p>
                      </div>
                    </div>

                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                      <MoreHorizontal size={19} />
                    </button>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {course.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Users size={15} />
                      {course.students} students
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 font-semibold ${
                        course.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-slate-500">
                        Course progress
                      </span>

                      <span className="font-semibold text-slate-700">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-teal-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/teacher/courses/${course.id}`}
                      className="flex-1 rounded-lg bg-[#087f87] px-4 py-2.5 text-center text-xs font-semibold text-white hover:bg-[#066b72]"
                    >
                      Manage Course
                    </Link>

                    <button className="rounded-lg border px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </main>
    </div>
  );
}

function Summary({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <Icon size={22} className="text-teal-600" />

      <p className="mt-4 text-sm text-slate-500">{title}</p>

      <h2 className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </h2>
    </div>
  );
}