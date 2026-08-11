"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Users,
  MoreHorizontal,
  Plus,
  BarChart3,
} from "lucide-react";

const courses = [
  {
    id: 1,
    code: "CS-320",
    title: "Advanced Computer Science",
    students: 62,
    assignments: 12,
    progress: 87,
    status: "Active",
  },
  {
    id: 2,
    code: "BIO-201",
    title: "Principles of Biology",
    students: 48,
    assignments: 9,
    progress: 79,
    status: "Active",
  },
  {
    id: 3,
    code: "PSY-150",
    title: "Introduction to Psychology",
    students: 55,
    assignments: 11,
    progress: 91,
    status: "Active",
  },
  {
    id: 4,
    code: "MATH-120",
    title: "Applied Mathematics",
    students: 83,
    assignments: 14,
    progress: 73,
    status: "Active",
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        course.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        course.code
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search]);

  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0
  );

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <header className="border-b bg-white px-8 py-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#172636]">
              My Courses
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your courses, content and enrolled students.
            </p>
          </div>

          <Link
            href="/teacher/courses/create"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#087F87] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#066B72]"
          >
            <Plus size={18} />
            Create Course
          </Link>
        </div>
      </header>

      <main className="space-y-6 p-8">
        <div className="grid gap-5 md:grid-cols-3">
          <Stat
            title="Total Courses"
            value={courses.length}
            icon={BookOpen}
          />

          <Stat
            title="Total Enrollments"
            value={totalStudents}
            icon={Users}
          />

          <Stat
            title="Average Progress"
            value="82.5%"
            icon={BarChart3}
          />
        </div>

        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Course Management
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Manage course details and monitor student progress.
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
                className="w-64 rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                    <BookOpen
                      size={23}
                      className="text-[#087F87]"
                    />
                  </div>

                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                <p className="mt-5 text-xs font-semibold text-[#087F87]">
                  {course.code}
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {course.title}
                </h3>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">
                      Students
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {course.students}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">
                      Assignments
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {course.assignments}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">
                      Course Progress
                    </span>

                    <span className="font-semibold text-slate-900">
                      {course.progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#087F87]"
                      style={{
                        width: `${course.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <button className="flex-1 rounded-lg border px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    Manage
                  </button>

                  <button className="flex-1 rounded-lg bg-[#087F87] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#066B72]">
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="p-12 text-center">
              <BookOpen
                size={35}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-900">
                No courses found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Stat({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <Icon size={23} className="text-[#087F87]" />

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </h2>
    </div>
  );
}