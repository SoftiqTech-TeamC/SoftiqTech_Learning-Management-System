"use client";

import Sidebar from "@/components/layout/Sidebar";
import {
  Brain,
  Plus,
  Search,
  Users,
  BarChart3,
  MoreHorizontal,
  Clock3,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const quizzes = [
  {
    id: 1,
    title: "Algorithms Fundamentals",
    course: "Computer Science 320",
    questions: 20,
    attempts: 46,
    average: 84,
    duration: "30 min",
    status: "Published",
  },
  {
    id: 2,
    title: "Data Structures Quiz",
    course: "Computer Science 320",
    questions: 15,
    attempts: 41,
    average: 79,
    duration: "25 min",
    status: "Published",
  },
  {
    id: 3,
    title: "Cell Structure Assessment",
    course: "Biology 201",
    questions: 25,
    attempts: 32,
    average: 87,
    duration: "40 min",
    status: "Published",
  },
  {
    id: 4,
    title: "Research Methods",
    course: "Psychology 150",
    questions: 18,
    attempts: 29,
    average: 76,
    duration: "30 min",
    status: "Published",
  },
  {
    id: 5,
    title: "Final Review Quiz",
    course: "Mathematics 120",
    questions: 30,
    attempts: 0,
    average: 0,
    duration: "45 min",
    status: "Draft",
  },
];

export default function TeacherQuizzesPage() {
  const [search, setSearch] = useState("");

  const filtered = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(search.toLowerCase()) ||
      quiz.course.toLowerCase().includes(search.toLowerCase())
  );

  const published = quizzes.filter(
    (quiz) => quiz.status === "Published"
  ).length;

  const totalAttempts = quizzes.reduce(
    (sum, quiz) => sum + quiz.attempts,
    0
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* TEACHER SIDEBAR */}
      <Sidebar active="Quizzes" />

      {/* MAIN CONTENT */}
      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-medium text-teal-600">
                Assessment Center
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                Quizzes
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create quizzes and analyze student performance.
              </p>
            </div>

            {/* CREATE QUIZ */}
            <Link
              href="/teacher/quizzes/create"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#087f87] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b72]"
            >
              <Plus size={18} />
              Create Quiz
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="space-y-6 p-8">
          {/* SUMMARY CARDS */}
          <div className="grid gap-5 md:grid-cols-3">
            <Summary
              icon={Brain}
              title="Total Quizzes"
              value={quizzes.length.toString()}
            />

            <Summary
              icon={BarChart3}
              title="Published Quizzes"
              value={published.toString()}
            />

            <Summary
              icon={Users}
              title="Total Attempts"
              value={totalAttempts.toString()}
            />
          </div>

          {/* QUIZ LIBRARY */}
          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* LIBRARY HEADER */}
            <div className="flex flex-col gap-4 border-b p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Quiz Library
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Manage quizzes and review performance.
                </p>
              </div>

              {/* SEARCH */}
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search quizzes..."
                  className="w-72 rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500"
                />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase text-slate-500">
                    <th className="px-6 py-4">Quiz</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Questions</th>
                    <th className="px-6 py-4">Attempts</th>
                    <th className="px-6 py-4">Average Score</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filtered.map((quiz) => (
                    <tr
                      key={quiz.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* QUIZ */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                            <Brain size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {quiz.title}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                              <Clock3 size={12} />
                              {quiz.duration}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* COURSE */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {quiz.course}
                      </td>

                      {/* QUESTIONS */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {quiz.questions}
                      </td>

                      {/* ATTEMPTS */}
                      <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                        {quiz.attempts}
                      </td>

                      {/* AVERAGE */}
                      <td className="px-6 py-5">
                        {quiz.average > 0 ? (
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-20 rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-teal-600"
                                style={{
                                  width: `${quiz.average}%`,
                                }}
                              />
                            </div>

                            <span className="text-xs font-semibold">
                              {quiz.average}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">
                            No attempts
                          </span>
                        )}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            quiz.status === "Published"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {quiz.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                        >
                          <MoreHorizontal size={19} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="border-t px-6 py-4">
              <p className="text-xs text-slate-500">
                Showing {filtered.length} of {quizzes.length} quizzes
              </p>
            </div>
          </section>
        </div>
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

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold text-slate-900">
        {value}
      </h2>
    </div>
  );
}