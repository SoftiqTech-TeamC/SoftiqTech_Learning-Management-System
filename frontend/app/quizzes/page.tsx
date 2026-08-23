"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useLearning } from "@/lib/learningStore";
import {
  Bell,
  ChevronDown,
  BookOpen,
  Clock,
  ListChecks,
  CheckCircle2,
  Loader2,
} from "lucide-react";

type Quiz = {
  _id: string;
  title: string;
  description?: string;
  duration: number;
  totalMarks: number;
  passingScore: number;
  questions: {
    _id?: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
    marks: number;
  }[];
  courseId:
    | string
    | {
        _id: string;
        title: string;
      };
  isPublished: boolean;
};

export default function QuizzesPage() {
  const { quizResults } = useLearning();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  async function fetchQuizzes() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quizzes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Failed to fetch quizzes");
      }

      const data = await response.json();

      // Students should only see published quizzes.
      const publishedQuizzes = data.filter(
        (quiz: Quiz) => quiz.isPublished === true
      );

      setQuizzes(publishedQuizzes);
    } catch (err) {
      console.error("Error fetching quizzes:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load quizzes."
      );
    } finally {
      setLoading(false);
    }
  }

  function getCourseTitle(courseId: Quiz["courseId"]) {
    if (typeof courseId === "object" && courseId !== null) {
      return courseId.title;
    }

    return "Course";
  }

  return (
    <div className="flex min-h-screen bg-[#F7F9FC]">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-[250px]">
        <Sidebar active="Quizzes" />
      </aside>

      <div className="ml-[250px] min-w-0 flex-1">
        {/* Header */}
        <div className="sticky top-0 z-20 flex h-[80px] items-center justify-between border-b border-gray-200 bg-white px-6">
          <div>
            <h1 className="text-[36px] font-bold text-[#172636]">
              Quizzes
            </h1>

            <div className="mt-1 h-[4px] w-12 rounded bg-[#08a7aa]" />
          </div>

          <div className="flex items-center gap-6">
            <Bell className="text-gray-600" size={21} />
            <ChevronDown className="text-gray-600" size={20} />
          </div>
        </div>

        <main className="px-6 pb-10 pt-8">
          {/* Loading */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2
                  size={20}
                  className="animate-spin text-[#08a7aa]"
                />
                Loading quizzes...
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
              <p className="font-semibold">
                Unable to load quizzes
              </p>

              <p className="mt-1">{error}</p>

              <button
                onClick={fetchQuizzes}
                className="mt-4 rounded-lg bg-[#08a7aa] px-4 py-2 text-sm font-medium text-white hover:bg-[#068d90]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && quizzes.length === 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
              <ListChecks
                size={38}
                className="mx-auto text-gray-300"
              />

              <h2 className="mt-4 text-lg font-bold text-[#172636]">
                No quizzes available
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                There are currently no published quizzes for you.
              </p>
            </div>
          )}

          {/* Quiz Cards */}
          {!loading && !error && quizzes.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {quizzes.map((quiz, index) => {
                const result = quizResults[quiz._id];

                const done = Boolean(result);

                return (
                  <div
                    key={quiz._id}
                    className="lm-fade-up overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{
                      animationDelay: `${index * 60}ms`,
                    }}
                  >
                    {/* Card Header */}
                    <div className="relative flex h-[88px] items-center justify-center bg-gradient-to-br from-[#08a7aa] to-[#0b6d78]">
                      <ListChecks
                        size={32}
                        className="text-white/90"
                      />

                      {done && (
                        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[11px] font-semibold text-white">
                          <CheckCircle2 size={12} />
                          {result.score}%
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="text-[16px] font-bold text-[#172636]">
                        {quiz.title}
                      </h3>

                      <p className="mt-1 flex items-center gap-1.5 text-[13px] text-gray-500">
                        <BookOpen
                          size={14}
                          className="text-[#08a7aa]"
                        />

                        {getCourseTitle(quiz.courseId)}
                      </p>

                      <div className="mt-4 flex items-center gap-4 text-[12px] text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <ListChecks size={14} />
                          {quiz.questions.length} Qs
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {quiz.duration} min
                        </span>
                      </div>

                      <Link
                        href={`/quizzes/${quiz._id}`}
                        className="mt-5 block w-full rounded-xl bg-[#08a7aa] py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#068d90]"
                      >
                        {done ? "Retake Quiz" : "Start Quiz"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}