"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Search,
  ChevronDown,
  BarChart3,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

type Student = {
  id: number;
  name: string;
  email: string;
  course: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  status: "Excellent" | "Good" | "Needs Attention";
};

const students: Student[] = [
  {
    id: 1,
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    course: "Computer Science 320",
    progress: 92,
    completedLessons: 23,
    totalLessons: 25,
    averageScore: 91,
    status: "Excellent",
  },
  {
    id: 2,
    name: "Ahmed Ali",
    email: "ahmed@example.com",
    course: "Computer Science 320",
    progress: 78,
    completedLessons: 19,
    totalLessons: 25,
    averageScore: 82,
    status: "Good",
  },
  {
    id: 3,
    name: "Sara Malik",
    email: "sara@example.com",
    course: "Biology 201",
    progress: 64,
    completedLessons: 16,
    totalLessons: 25,
    averageScore: 74,
    status: "Good",
  },
  {
    id: 4,
    name: "Usman Ahmed",
    email: "usman@example.com",
    course: "Mathematics 120",
    progress: 42,
    completedLessons: 10,
    totalLessons: 24,
    averageScore: 58,
    status: "Needs Attention",
  },
  {
    id: 5,
    name: "Fatima Noor",
    email: "fatima@example.com",
    course: "Psychology 150",
    progress: 88,
    completedLessons: 22,
    totalLessons: 25,
    averageScore: 89,
    status: "Excellent",
  },
  {
    id: 6,
    name: "Hamza Tariq",
    email: "hamza@example.com",
    course: "Computer Science 320",
    progress: 55,
    completedLessons: 14,
    totalLessons: 25,
    averageScore: 65,
    status: "Needs Attention",
  },
];

const courses = [
  "All Courses",
  "Computer Science 320",
  "Biology 201",
  "Psychology 150",
  "Mathematics 120",
];

export default function TeacherProgressPage() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] =
    useState("All Courses");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCourse =
        selectedCourse === "All Courses" ||
        student.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [search, selectedCourse]);

  const averageProgress = Math.round(
    students.reduce(
      (total, student) => total + student.progress,
      0
    ) / students.length
  );

  const averageScore = Math.round(
    students.reduce(
      (total, student) => total + student.averageScore,
      0
    ) / students.length
  );

  const excellentStudents = students.filter(
    (student) => student.status === "Excellent"
  ).length;

  const attentionStudents = students.filter(
    (student) => student.status === "Needs Attention"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Sidebar active="My Progress" />

      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-medium text-[#087f87]">
                Teacher Analytics
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                Student Progress
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Track student learning progress and identify students who may
                need additional support.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border bg-[#f9fbfc] px-4 py-3">
              <TrendingUp size={20} className="text-[#087f87]" />

              <div>
                <p className="text-xs text-slate-500">
                  Overall Progress
                </p>

                <p className="text-sm font-bold text-slate-900">
                  {averageProgress}%
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-8">
          {/* SUMMARY CARDS */}
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Users}
              title="Total Students"
              value={students.length.toString()}
              subtitle="Across all courses"
            />

            <StatCard
              icon={TrendingUp}
              title="Average Progress"
              value={`${averageProgress}%`}
              subtitle="Overall course completion"
            />

            <StatCard
              icon={Award}
              title="Average Score"
              value={`${averageScore}%`}
              subtitle="Based on assessments"
            />

            <StatCard
              icon={Clock3}
              title="Need Attention"
              value={attentionStudents.toString()}
              subtitle="Students below target"
            />
          </section>

          {/* PERFORMANCE OVERVIEW */}
          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            {/* PROGRESS CHART */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Course Performance
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Overall progress across your courses.
                  </p>
                </div>

                <BarChart3
                  size={21}
                  className="text-[#087f87]"
                />
              </div>

              <div className="mt-8 space-y-6">
                {[
                  {
                    course: "Computer Science 320",
                    progress: 82,
                  },
                  {
                    course: "Biology 201",
                    progress: 71,
                  },
                  {
                    course: "Psychology 150",
                    progress: 88,
                  },
                  {
                    course: "Mathematics 120",
                    progress: 62,
                  },
                ].map((course) => (
                  <div key={course.course}>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-700">
                        {course.course}
                      </p>

                      <span className="text-sm font-bold text-[#087f87]">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#087f87] transition-all"
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PERFORMANCE SUMMARY */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">
                Performance Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Quick overview of student performance.
              </p>

              <div className="mt-7 space-y-4">
                <div className="rounded-xl bg-[#f0fbfb] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#087f87] text-white">
                      <CheckCircle2 size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Excellent Progress
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {excellentStudents} students performing exceptionally
                        well.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <Clock3 size={19} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-slate-800">
                    Needs Attention
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {attentionStudents} students may need additional support to
                    improve their progress.
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Completion Target
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Target progress for this semester
                      </p>
                    </div>

                    <span className="text-lg font-bold text-[#087f87]">
                      80%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STUDENT PROGRESS TABLE */}
          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* TABLE HEADER */}
            <div className="flex flex-col gap-5 border-b p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Student Progress
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor individual learning progress and assessment
                  performance.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* SEARCH */}
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
                    className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87] sm:w-60"
                  />
                </div>

                {/* COURSE FILTER */}
                <div className="relative">
                  <select
                    value={selectedCourse}
                    onChange={(e) =>
                      setSelectedCourse(e.target.value)
                    }
                    className="w-full appearance-none rounded-lg border bg-white px-4 py-2.5 pr-10 text-sm text-slate-600 outline-none focus:border-[#087f87] sm:w-52"
                  >
                    {courses.map((course) => (
                      <option key={course}>
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

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Progress</th>
                    <th className="px-6 py-4">Lessons</th>
                    <th className="px-6 py-4">Average Score</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">
                      Details
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* STUDENT */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7f7] text-sm font-bold text-[#087f87]">
                            {student.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {student.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* COURSE */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {student.course}
                      </td>

                      {/* PROGRESS */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#087f87]"
                              style={{
                                width: `${student.progress}%`,
                              }}
                            />
                          </div>

                          <span className="text-xs font-bold text-slate-700">
                            {student.progress}%
                          </span>
                        </div>
                      </td>

                      {/* LESSONS */}
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-slate-700">
                          {student.completedLessons}/
                          {student.totalLessons}
                        </span>

                        <p className="mt-1 text-xs text-slate-400">
                          lessons completed
                        </p>
                      </td>

                      {/* SCORE */}
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-slate-800">
                          {student.averageScore}%
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <StatusBadge status={student.status} />
                      </td>

                      {/* DETAILS */}
                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            alert(
                              `${student.name}'s detailed progress will be shown here.`
                            )
                          }
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-[#087f87] transition hover:bg-[#eaf7f7]"
                        >
                          View
                          <ArrowUpRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t px-6 py-4">
              <p className="text-xs text-slate-500">
                Showing {filteredStudents.length} of {students.length}{" "}
                students
              </p>

              <p className="text-xs text-slate-400">
                Progress data is currently based on sample data.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
        <Icon size={21} />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-xs text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Student["status"];
}) {
  const styles = {
    Excellent: "bg-emerald-50 text-emerald-700",
    Good: "bg-blue-50 text-blue-700",
    "Needs Attention": "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}