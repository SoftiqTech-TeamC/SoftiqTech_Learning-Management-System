
"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  Search,
  X,
  Clock,
  Users,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

import TeacherSidebar from "@/components/teacher/TeacherSidebar";

type StudentStatus = "Present" | "Absent" | "Late";

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
  attendance: number;
  status: StudentStatus;
};

const students: Student[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    course: "Environmental Science",
    attendance: 94,
    status: "Present",
  },
  {
    id: 2,
    name: "Safdar Khan",
    email: "safdar@example.com",
    course: "Database Systems",
    attendance: 87,
    status: "Present",
  },
  {
    id: 3,
    name: "Anousha Malik",
    email: "anousha@example.com",
    course: "Data Structures",
    attendance: 72,
    status: "Late",
  },
  {
    id: 4,
    name: "Hassan Raza",
    email: "hassan@example.com",
    course: "Computer Science",
    attendance: 65,
    status: "Absent",
  },
  {
    id: 5,
    name: "Ayesha Noor",
    email: "ayesha@example.com",
    course: "Environmental Science",
    attendance: 91,
    status: "Present",
  },
  {
    id: 6,
    name: "Ali Hassan",
    email: "ali@example.com",
    course: "Database Systems",
    attendance: 78,
    status: "Present",
  },
];

const courses = [
  "All Courses",
  "Environmental Science",
  "Database Systems",
  "Data Structures",
  "Computer Science",
];

export default function TeacherAttendancePage() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] =
    useState("All Courses");

  const [selectedDate, setSelectedDate] = useState(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });

  const [attendance, setAttendance] = useState<
    Record<number, StudentStatus>
  >(() => {
    return Object.fromEntries(
      students.map((student) => [
        student.id,
        student.status,
      ])
    ) as Record<number, StudentStatus>;
  });

  const filteredStudents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue);

      const matchesCourse =
        selectedCourse === "All Courses" ||
        student.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [search, selectedCourse]);

  const presentCount = Object.values(attendance).filter(
    (status) => status === "Present"
  ).length;

  const absentCount = Object.values(attendance).filter(
    (status) => status === "Absent"
  ).length;

  const lateCount = Object.values(attendance).filter(
    (status) => status === "Late"
  ).length;

  const updateAttendance = (
    id: number,
    status: StudentStatus
  ) => {
    setAttendance((previous) => ({
      ...previous,
      [id]: status,
    }));
  };

  const formattedDate = new Date(
    `${selectedDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Teacher Sidebar */}
      <TeacherSidebar />

      {/* Main Content */}
      <div className="ml-[240px] min-h-screen">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <p className="text-sm font-medium text-[#087F87]">
                Student Management
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Attendance
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Track and manage student attendance across your
                courses.
              </p>
            </div>

            <button
              type="button"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell size={21} />
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="space-y-6 p-8">
          {/* Statistics */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* Total Students */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <Users className="text-[#087F87]" size={22} />

              <p className="mt-4 text-sm text-slate-500">
                Total Students
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                248
              </p>
            </div>

            {/* Present */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <Check className="text-green-600" size={22} />

              <p className="mt-4 text-sm text-slate-500">
                Present Today
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {presentCount}
              </p>
            </div>

            {/* Late */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <Clock className="text-amber-500" size={22} />

              <p className="mt-4 text-sm text-slate-500">
                Late
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {lateCount}
              </p>
            </div>

            {/* Absent */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <AlertCircle className="text-red-500" size={22} />

              <p className="mt-4 text-sm text-slate-500">
                Absent
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {absentCount}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search students..."
                  className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-4 text-sm outline-none transition focus:border-[#087F87] focus:ring-1 focus:ring-[#087F87]"
                />
              </div>

              {/* Date + Course */}
              <div className="flex flex-wrap gap-3">
                {/* Date */}
                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(event) =>
                      setSelectedDate(event.target.value)
                    }
                    className="h-11 rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#087F87] focus:ring-1 focus:ring-[#087F87]"
                  />
                </div>

                {/* Course */}
                <div className="relative">
                  <select
                    value={selectedCourse}
                    onChange={(event) =>
                      setSelectedCourse(event.target.value)
                    }
                    className="h-11 appearance-none rounded-lg border border-slate-300 bg-white pl-4 pr-10 text-sm outline-none transition focus:border-[#087F87] focus:ring-1 focus:ring-[#087F87]"
                  >
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Register */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {/* Table Header */}
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-bold text-slate-900">
                Attendance Register
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {formattedDate}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-6 py-4">
                      Student
                    </th>

                    <th className="px-6 py-4">
                      Course
                    </th>

                    <th className="px-6 py-4">
                      Overall Attendance
                    </th>

                    <th className="px-6 py-4">
                      Today&apos;s Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Mark Attendance
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => {
                      const currentStatus =
                        attendance[student.id];

                      return (
                        <tr
                          key={student.id}
                          className="transition hover:bg-slate-50"
                        >
                          {/* Student */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 font-semibold text-[#087F87]">
                                {student.name.charAt(0)}
                              </div>

                              <div>
                                <p className="font-semibold text-slate-900">
                                  {student.name}
                                </p>

                                <p className="text-xs text-slate-500">
                                  {student.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Course */}
                          <td className="px-6 py-5 text-sm text-slate-600">
                            {student.course}
                          </td>

                          {/* Overall Attendance */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={
                                    student.attendance >= 85
                                      ? "h-full rounded-full bg-green-500"
                                      : student.attendance >= 75
                                      ? "h-full rounded-full bg-amber-500"
                                      : "h-full rounded-full bg-red-500"
                                  }
                                  style={{
                                    width: `${student.attendance}%`,
                                  }}
                                />
                              </div>

                              <span className="text-sm font-semibold text-slate-700">
                                {student.attendance}%
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-5">
                            <span
                              className={
                                currentStatus === "Present"
                                  ? "inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                                  : currentStatus === "Late"
                                  ? "inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                                  : "inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                              }
                            >
                              {currentStatus}
                            </span>
                          </td>

                          {/* Buttons */}
                          <td className="px-6 py-5">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateAttendance(
                                    student.id,
                                    "Present"
                                  )
                                }
                                className={
                                  currentStatus === "Present"
                                    ? "flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition"
                                    : "flex items-center gap-1.5 rounded-lg border border-green-200 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-50"
                                }
                              >
                                <Check size={14} />
                                Present
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateAttendance(
                                    student.id,
                                    "Late"
                                  )
                                }
                                className={
                                  currentStatus === "Late"
                                    ? "rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white transition"
                                    : "rounded-lg border border-amber-200 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-50"
                                }
                              >
                                Late
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateAttendance(
                                    student.id,
                                    "Absent"
                                  )
                                }
                                className={
                                  currentStatus === "Absent"
                                    ? "flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition"
                                    : "flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                                }
                              >
                                <X size={14} />
                                Absent
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-sm text-slate-500"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Changes are currently stored for this session.
              </p>

              <button
                type="button"
                className="rounded-lg bg-[#087F87] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066B72]"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}