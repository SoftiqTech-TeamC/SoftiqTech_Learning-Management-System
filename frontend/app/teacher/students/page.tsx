"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Users,
  Mail,
  MoreHorizontal,
  CheckCircle2,
  UserX,
} from "lucide-react";

import TeacherSidebar from "@/components/teacher/TeacherSidebar";

const students = [
  {
    id: 1,
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    course: "Computer Science 320",
    progress: 92,
    status: "Active",
  },
  {
    id: 2,
    name: "Safdar Khan",
    email: "safdar@example.com",
    course: "Computer Science 320",
    progress: 78,
    status: "Active",
  },
  {
    id: 3,
    name: "Anousha Malik",
    email: "anousha@example.com",
    course: "Biology 201",
    progress: 88,
    status: "Active",
  },
  {
    id: 4,
    name: "Ali Raza",
    email: "ali@example.com",
    course: "Mathematics 120",
    progress: 54,
    status: "Needs Attention",
  },
  {
    id: 5,
    name: "Hassan Tariq",
    email: "hassan@example.com",
    course: "Computer Science 320",
    progress: 84,
    status: "Active",
  },
  {
    id: 6,
    name: "Ayesha Noor",
    email: "ayesha@example.com",
    course: "Psychology 150",
    progress: 96,
    status: "Active",
  },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Students");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.course
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All Students" ||
        student.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const attentionStudents = students.filter(
    (student) => student.status === "Needs Attention"
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">

      {/* Teacher Sidebar */}
      <TeacherSidebar />

      {/* Page Content */}
      <div className="ml-[240px] min-h-screen">

        {/* Header */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

            <div>
              <h1 className="text-3xl font-bold text-[#172636]">
                Students
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage enrolled students and monitor their
                learning progress.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#087F87] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#066B72]"
            >
              <Mail size={17} />
              Message Students
            </button>

          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-6 p-8">

          {/* Summary Cards */}
          <div className="grid gap-5 md:grid-cols-3">

            <Summary
              title="Total Students"
              value={students.length}
              icon={Users}
            />

            <Summary
              title="Active Students"
              value={activeStudents}
              icon={CheckCircle2}
            />

            <Summary
              title="Needs Attention"
              value={attentionStudents}
              icon={UserX}
            />

          </div>

          {/* Student Directory */}
          <div className="rounded-2xl border bg-white shadow-sm">

            {/* Search / Filter Header */}
            <div className="flex flex-col gap-4 border-b p-5 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="font-bold text-slate-900">
                  Student Directory
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  View student profiles, courses and progress.
                </p>
              </div>

              <div className="flex gap-3">

                {/* Search */}
                <div className="relative">

                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search students..."
                    className="w-64 rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-500"
                  />

                </div>

                {/* Status Filter */}
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="rounded-lg border px-4 py-2.5 text-sm outline-none"
                >
                  <option value="All Students">
                    All Students
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Needs Attention">
                    Needs Attention
                  </option>
                </select>

              </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="bg-slate-50">

                  <tr className="text-left text-xs font-semibold uppercase text-slate-500">

                    <th className="px-6 py-4">
                      Student
                    </th>

                    <th className="px-6 py-4">
                      Course
                    </th>

                    <th className="px-6 py-4">
                      Progress
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y">

                  {filteredStudents.map((student) => (

                    <tr
                      key={student.id}
                      className="hover:bg-slate-50"
                    >

                      {/* Student */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 font-bold text-[#087F87]">
                            {student.name.charAt(0)}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              {student.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {student.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Course */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {student.course}
                      </td>

                      {/* Progress */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className="h-full rounded-full bg-[#087F87]"
                              style={{
                                width: `${student.progress}%`,
                              }}
                            />

                          </div>

                          <span className="text-xs font-semibold">
                            {student.progress}%
                          </span>

                        </div>

                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            student.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {student.status}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">

                        <button
                          type="button"
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <MoreHorizontal size={19} />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t px-6 py-4">

              <p className="text-xs text-slate-500">
                Showing {filteredStudents.length} of{" "}
                {students.length} students
              </p>

              <div className="flex gap-2">

                <button
                  type="button"
                  className="rounded-lg border px-3 py-2 text-xs hover:bg-slate-50"
                >
                  Previous
                </button>

                <button
                  type="button"
                  className="rounded-lg bg-[#087F87] px-3 py-2 text-xs text-white"
                >
                  1
                </button>

                <button
                  type="button"
                  className="rounded-lg border px-3 py-2 text-xs hover:bg-slate-50"
                >
                  Next
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}

function Summary({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <Icon
        className="text-[#087F87]"
        size={23}
      />

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </h2>

    </div>
  );
}