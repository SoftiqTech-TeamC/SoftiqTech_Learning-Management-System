"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  GraduationCap,
  Search,
  BookOpen,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

const students = [
  {
    id: 1,
    name: "Ali Ahmed",
    email: "ali@example.com",
    courses: 4,
    progress: 82,
  },
  {
    id: 2,
    name: "Ayesha Malik",
    email: "ayesha@example.com",
    courses: 5,
    progress: 74,
  },
  {
    id: 3,
    name: "Hassan Khan",
    email: "hassan@example.com",
    courses: 3,
    progress: 91,
  },
  {
    id: 4,
    name: "Fatima Noor",
    email: "fatima@example.com",
    courses: 6,
    progress: 68,
  },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar active="Students" />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Student Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Students
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor student enrollment and learning progress.
          </p>
        </header>

        <div className="space-y-6 p-8">
          <div className="grid gap-5 md:grid-cols-3">
            <Stat
              icon={Users}
              title="Total Students"
              value="2,184"
            />

            <Stat
              icon={BookOpen}
              title="Average Courses"
              value="4.2"
            />

            <Stat
              icon={TrendingUp}
              title="Average Progress"
              value="78%"
            />
          </div>

          <section className="rounded-2xl border bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Student Directory
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Overview of student learning activity.
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
                  placeholder="Search students..."
                  className="w-64 rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#087f87]"
                />
              </div>
            </div>

            <div className="divide-y">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf7f7] text-sm font-bold text-[#087f87]">
                      {student.name
                        .split(" ")
                        .map((item) => item[0])
                        .join("")}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {student.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-xs text-slate-400">
                        Enrolled Courses
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {student.courses}
                      </p>
                    </div>

                    <div className="w-40">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-slate-400">Progress</span>
                        <span className="font-semibold text-slate-700">
                          {student.progress}%
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#08a7aa]"
                          style={{
                            width: `${student.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Stat({
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
      <Icon size={22} className="text-[#087f87]" />

      <p className="mt-4 text-sm text-slate-500">{title}</p>

      <h2 className="mt-1 text-3xl font-bold text-[#172636]">
        {value}
      </h2>
    </div>
  );
}