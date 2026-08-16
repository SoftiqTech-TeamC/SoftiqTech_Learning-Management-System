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

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
  attendance: number;
  status: "Present" | "Absent" | "Late";
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

export default function TeacherAttendancePage() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendance, setAttendance] = useState<
    Record<number, Student["status"]>
  >(
    Object.fromEntries(
      students.map((student) => [student.id, student.status])
    )
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase());

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
    status: Student["status"]
  ) => {
    setAttendance((previous) => ({
      ...previous,
      [id]: status,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
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
              Track and manage student attendance across your courses.
            </p>
          </div>

          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <Bell size={21} />
          </button>
        </div>
      </header>

      <main className="space-y-6 p-8">
        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-5">
            <Users className="text-[#087F87]" />
            <p className="mt-4 text-sm text-slate-500">
              Total Students
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              248
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <Check className="text-green-600" />
            <p className="mt-4 text-sm text-slate-500">
              Present Today
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {presentCount}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <Clock className="text-amber-500" />
            <p className="mt-4 text-sm text-slate-500">
              Late
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {lateCount}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <AlertCircle className="text-red-500" />
            <p className="mt-4 text-sm text-slate-500">
              Absent
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {absentCount}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
                className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-4 text-sm outline-none focus:border-[#087F87]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <CalendarDays
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-11 rounded-lg border border-slate-300 pl-10 pr-3 text-sm outline-none focus:border-[#087F87]"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedCourse}
                  onChange={(e) =>
                    setSelectedCourse(e.target.value)
                  }
                  className="h-11 appearance-none rounded-lg border border-slate-300 bg-white pl-4 pr-10 text-sm outline-none focus:border-[#087F87]"
                >
                  <option>All Courses</option>
                  <option>Environmental Science</option>
                  <option>Database Systems</option>
                  <option>Data Structures</option>
                  <option>Computer Science</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b px-6 py-5">
            <h2 className="font-bold text-slate-900">
              Attendance Register
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {new Date(selectedDate).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Overall Attendance</th>
                  <th className="px-6 py-4">Today's Status</th>
                  <th className="px-6 py-4 text-right">
                    Mark Attendance
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const currentStatus = attendance[student.id];

                  return (
                    <tr
                      key={student.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 font-semibold text-[#087F87]">
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

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {student.course}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${
                                student.attendance >= 85
                                  ? "bg-green-500"
                                  : student.attendance >= 75
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
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

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            currentStatus === "Present"
                              ? "bg-green-50 text-green-700"
                              : currentStatus === "Late"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {currentStatus}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              updateAttendance(
                                student.id,
                                "Present"
                              )
                            }
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                              currentStatus === "Present"
                                ? "bg-green-600 text-white"
                                : "border border-green-200 text-green-700 hover:bg-green-50"
                            }`}
                          >
                            <Check size={14} />
                            Present
                          </button>

                          <button
                            onClick={() =>
                              updateAttendance(
                                student.id,
                                "Late"
                              )
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                              currentStatus === "Late"
                                ? "bg-amber-500 text-white"
                                : "border border-amber-200 text-amber-700 hover:bg-amber-50"
                            }`}
                          >
                            Late
                          </button>

                          <button
                            onClick={() =>
                              updateAttendance(
                                student.id,
                                "Absent"
                              )
                            }
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ${
                              currentStatus === "Absent"
                                ? "bg-red-600 text-white"
                                : "border border-red-200 text-red-700 hover:bg-red-50"
                            }`}
                          >
                            <X size={14} />
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4">
            <p className="text-sm text-slate-500">
              Changes are currently stored for this session.
            </p>

            <button className="rounded-lg bg-[#087F87] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#066B72]">
              Save Attendance
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}