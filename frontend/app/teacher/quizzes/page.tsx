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
import { useEffect, useState } from "react";
import Link from "next/link";

type Quiz = {
  _id: string;
  title: string;
  description?: string;
  duration: number;
  totalMarks?: number;
  passingScore?: number;
  questions?: {
    questionText: string;
    options: string[];
    correctAnswer: string;
    marks: number;
  }[];
  isPublished: boolean;
  courseId:
    | string
    | {
        _id: string;
        title: string;
      };
  createdBy?:
    | string
    | {
        _id: string;
        name: string;
      };
};

export default function TeacherQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to fetch quizzes.");
      }

      const data = await response.json();

      setQuizzes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch quizzes error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load quizzes."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const filtered = quizzes.filter((quiz) => {
    const courseTitle =
      typeof quiz.courseId === "object"
        ? quiz.courseId.title
        : "";

    return (
      quiz.title.toLowerCase().includes(search.toLowerCase()) ||
      courseTitle.toLowerCase().includes(search.toLowerCase())
    );
  });

  const published = quizzes.filter(
    (quiz) => quiz.isPublished
  ).length;

  /*
    The current backend does not provide quiz-attempt statistics
    in GET /quizzes, so attempts cannot be calculated reliably
    from the available API.
  */
  const totalAttempts = 0;

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* SIDEBAR */}
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

            {/* LOADING */}
            {loading && (
              <div className="p-10 text-center text-sm text-slate-500">
                Loading quizzes...
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="m-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* EMPTY */}
            {!loading && !error && filtered.length === 0 && (
              <div className="p-10 text-center">
                <Brain
                  size={35}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-semibold text-slate-700">
                  No quizzes found
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Create your first quiz to get started.
                </p>
              </div>
            )}

            {/* TABLE */}
            {!loading && !error && filtered.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase text-slate-500">
                      <th className="px-6 py-4">Quiz</th>
                      <th className="px-6 py-4">Course</th>
                      <th className="px-6 py-4">Questions</th>
                      <th className="px-6 py-4">Attempts</th>
                      <th className="px-6 py-4">
                        Average Score
                      </th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {filtered.map((quiz) => {
                      const courseTitle =
                        typeof quiz.courseId === "object"
                          ? quiz.courseId.title
                          : "Course";

                      const questionCount =
                        quiz.questions?.length || 0;

                      return (
                        <tr
                          key={quiz._id}
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
                                  {quiz.duration} min
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* COURSE */}
                          <td className="px-6 py-5 text-sm text-slate-600">
                            {courseTitle}
                          </td>

                          {/* QUESTIONS */}
                          <td className="px-6 py-5 text-sm text-slate-600">
                            {questionCount}
                          </td>

                          {/* ATTEMPTS */}
                          <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                            -
                          </td>

                          {/* AVERAGE */}
                          <td className="px-6 py-5">
                            <span className="text-xs text-slate-400">
                              No data
                            </span>
                          </td>

                          {/* STATUS */}
                          <td className="px-6 py-5">
                            <span
                              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                                quiz.isPublished
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {quiz.isPublished
                                ? "Published"
                                : "Draft"}
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* FOOTER */}
            {!loading && !error && (
              <div className="border-t px-6 py-4">
                <p className="text-xs text-slate-500">
                  Showing {filtered.length} of {quizzes.length} quizzes
                </p>
              </div>
            )}
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