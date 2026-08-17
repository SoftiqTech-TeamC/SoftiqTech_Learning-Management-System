"use client";

import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  BookOpen,
  Plus,
  Search,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";

const courses = [
  {
    id: 1,
    name: "Computer Science 320",
    instructor: "Dr. Jawaid",
    students: 42,
    progress: 78,
    status: "Active",
  },
  {
    id: 2,
    name: "Database Systems",
    instructor: "Maham",
    students: 38,
    progress: 65,
    status: "Active",
  },
  {
    id: 3,
    name: "Research Methodology",
    instructor: "Eman",
    students: 36,
    progress: 54,
    status: "Active",
  },
  {
    id: 4,
    name: "Mathematics 120",
    instructor: "Rubina",
    students: 40,
    progress: 89,
    status: "Active",
  },
];

export default function AdminCoursesPage() {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
                Course Management
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                Courses
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage courses and monitor their activity.
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-lg bg-[#087f87] px-5 py-3 text-sm font-semibold text-white hover:bg-[#066b72]">
              <Plus size={18} />
              Add Course
            </button>
          </div>
        </header>

        <div className="space-y-6 p-8">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#087f87]"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/admin/courses/${course.id}`}
                className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                    <BookOpen size={22} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-400 transition group-hover:text-[#087f87]"
                  />
                </div>

                <h2 className="mt-5 font-bold text-slate-900">
                  {course.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {course.instructor}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                  <Users size={16} />
                  {course.students} Students
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-400">
                      Course Progress
                    </span>

                    <span className="font-semibold text-slate-700">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#08a7aa]"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <span className="mt-5 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {course.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}