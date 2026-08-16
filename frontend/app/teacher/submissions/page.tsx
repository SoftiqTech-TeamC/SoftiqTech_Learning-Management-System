"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Eye,
  Pencil,
  ChevronDown,
} from "lucide-react";

type SubmissionStatus = "Pending" | "Graded" | "Late";

type Submission = {
  id: number;
  student: string;
  initials: string;
  assignment: string;
  course: string;
  submitted: string;
  status: SubmissionStatus;
  score: number | null;
};

const submissions: Submission[] = [
  {
    id: 1,
    student: "Sarah Ahmed",
    initials: "SA",
    assignment: "Assignment 3: Environmental Systems",
    course: "Environmental Science",
    submitted: "Today, 10:42 AM",
    status: "Pending",
    score: null,
  },
  {
    id: 2,
    student: "Safdar Ali",
    initials: "SA",
    assignment: "Week 6 Discussion",
    course: "Introduction to Psychology",
    submitted: "Today, 09:18 AM",
    status: "Pending",
    score: null,
  },
  {
    id: 3,
    student: "Anousha Khan",
    initials: "AK",
    assignment: "Lab Report 2",
    course: "Biology 201",
    submitted: "Yesterday, 04:25 PM",
    status: "Late",
    score: null,
  },
  {
    id: 4,
    student: "Hamza Raza",
    initials: "HR",
    assignment: "Database Design Project",
    course: "Computer Science 320",
    submitted: "Yesterday, 01:12 PM",
    status: "Graded",
    score: 92,
  },
  {
    id: 5,
    student: "Ayesha Malik",
    initials: "AM",
    assignment: "Midterm Reflection",
    course: "History 210",
    submitted: "Aug 9, 2026",
    status: "Graded",
    score: 87,
  },
  {
    id: 6,
    student: "Usman Tariq",
    initials: "UT",
    assignment: "Problem Set 5",
    course: "Mathematics 120",
    submitted: "Aug 8, 2026",
    status: "Graded",
    score: 95,
  },
];

export default function TeacherSubmissionsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Graded">(
    "All"
  );

  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All Courses");

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      const matchesTab =
        activeTab === "All" || submission.status === activeTab;

      const matchesCourse =
        course === "All Courses" || submission.course === course;

      const query = search.toLowerCase();

      const matchesSearch =
        submission.student.toLowerCase().includes(query) ||
        submission.assignment.toLowerCase().includes(query) ||
        submission.course.toLowerCase().includes(query);

      return matchesTab && matchesCourse && matchesSearch;
    });
  }, [activeTab, search, course]);

  const pendingCount = submissions.filter(
    (item) => item.status === "Pending" || item.status === "Late"
  ).length;

  const gradedCount = submissions.filter(
    (item) => item.status === "Graded"
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Link
              href="/teacher"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#087F87] hover:underline"
            >
              <ArrowLeft size={16} />
              Teacher Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
                <ClipboardCheck
                  size={22}
                  className="text-[#087F87]"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Submissions
                </h1>

                <p className="text-sm text-slate-500">
                  Review, grade, and manage student submissions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Pending Review</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Graded</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {gradedCount}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 lg:p-8">
        {/* Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students, assignments..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-[#087F87] focus:bg-white focus:ring-2 focus:ring-[#087F87]/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-10 text-sm text-slate-700 outline-none focus:border-[#087F87]"
                >
                  <option>All Courses</option>
                  <option>Environmental Science</option>
                  <option>Introduction to Psychology</option>
                  <option>Biology 201</option>
                  <option>Computer Science 320</option>
                  <option>History 210</option>
                  <option>Mathematics 120</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-1 border-b border-slate-200">
            {[
              { label: "All", count: submissions.length },
              { label: "Pending", count: pendingCount },
              { label: "Graded", count: gradedCount },
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() =>
                  setActiveTab(tab.label as "All" | "Pending" | "Graded")
                }
                className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
                  activeTab === tab.label
                    ? "border-[#087F87] text-[#087F87]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
                <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Submission Table */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Assignment
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Submitted
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Score
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-[#087F87]">
                          {submission.initials}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {submission.student}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {submission.course}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="max-w-[260px] text-sm font-medium text-slate-700">
                        {submission.assignment}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock3 size={15} />
                        {submission.submitted}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {submission.status === "Graded" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                          <CheckCircle2 size={14} />
                          Graded
                        </span>
                      ) : submission.status === "Late" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
                          <AlertCircle size={14} />
                          Late
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                          <Clock3 size={14} />
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      {submission.score !== null ? (
                        <span className="font-bold text-slate-800">
                          {submission.score}%
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400">
                          Not graded
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-[#087F87]"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        <button
                          type="button"
                          className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#087F87] px-3 text-xs font-semibold text-white transition hover:bg-[#066B72]"
                        >
                          <Pencil size={14} />
                          {submission.status === "Graded"
                            ? "Edit Grade"
                            : "Grade"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSubmissions.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Search className="text-slate-400" />
                </div>

                <h3 className="mt-4 font-semibold text-slate-800">
                  No submissions found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}