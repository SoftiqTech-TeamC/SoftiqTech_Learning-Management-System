"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

type Question = {
  _id?: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  marks: number;
};

type Quiz = {
  _id: string;
  title: string;
  description?: string;
  duration: number;
  totalMarks: number;
  passingScore: number;
  questions: Question[];
  isPublished: boolean;
  courseId:
    | string
    | {
        _id: string;
        title: string;
      };
};

export default function QuizAttemptPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = use(params);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<
    (string | null)[]
  >([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * Fetch quiz from backend
   */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quizzes/${quizId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.message || "Failed to fetch quiz."
          );
        }

        setQuiz(data);

        setAnswers(
          Array(
            data.questions?.length || 0
          ).fill(null)
        );
      } catch (err) {
        console.error("Fetch quiz error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load quiz."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F9FC]">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <Loader2
            size={20}
            className="animate-spin text-[#08a7aa]"
          />
          Loading quiz...
        </div>
      </div>
    );
  }

  /*
   * Error
   */
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F9FC] px-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <XCircle
            size={45}
            className="mx-auto text-red-500"
          />

          <h1 className="mt-4 text-xl font-bold text-[#172636]">
            Unable to load quiz
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <Link
            href="/quizzes"
            className="mt-6 inline-block rounded-xl bg-[#08a7aa] px-6 py-2.5 text-sm font-medium text-white"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  if (!quiz) {
    notFound();
  }

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F9FC] px-6">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-[#172636]">
            No questions available
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This quiz does not contain any questions yet.
          </p>

          <Link
            href="/quizzes"
            className="mt-6 inline-block rounded-xl bg-[#08a7aa] px-6 py-2.5 text-sm font-medium text-white"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  const question = quiz.questions[current];

  const isLast =
    current === quiz.questions.length - 1;

  const answeredCount = answers.filter(
    (answer) => answer !== null
  ).length;

  /*
   * Calculate correct answers
   */
  const correctCount = quiz.questions.reduce(
    (count, question, index) => {
      return (
        count +
        (answers[index] === question.correctAnswer
          ? 1
          : 0)
      );
    },
    0
  );

  const scorePercent = Math.round(
    (correctCount / quiz.questions.length) * 100
  );

  const passed =
    scorePercent >=
    (quiz.totalMarks > 0
      ? Math.round(
          (quiz.passingScore / quiz.totalMarks) * 100
        )
      : 60);

  function pick(option: string) {
    const next = [...answers];

    next[current] = option;

    setAnswers(next);
  }

  function finish() {
    /*
     * IMPORTANT:
     * Backend currently provides GET/POST quiz management
     * endpoints but no quiz-attempt submission endpoint.
     *
     * Therefore this calculates the result locally for now.
     * It does NOT send an attempt to the backend.
     */
    setSubmitted(true);
  }

  function restart() {
    setAnswers(
      Array(quiz.questions.length).fill(null)
    );

    setCurrent(0);
    setSubmitted(false);
  }

  /*
   * RESULT SCREEN
   */
  if (submitted) {
    const r = 48;
    const circ = 2 * Math.PI * r;

    return (
      <div className="min-h-screen bg-[#F7F9FC] px-6 py-10">
        <div className="mx-auto w-full max-w-2xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="relative mx-auto mb-6 h-[150px] w-[150px]">
              <svg
                viewBox="0 0 120 120"
                className="h-full w-full -rotate-90"
              >
                <circle
                  cx="60"
                  cy="60"
                  r={r}
                  fill="none"
                  stroke="#edf0f1"
                  strokeWidth="8"
                />

                <circle
                  cx="60"
                  cy="60"
                  r={r}
                  fill="none"
                  stroke={
                    passed ? "#008f94" : "#DC2626"
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={
                    circ *
                    (1 - scorePercent / 100)
                  }
                  style={{
                    transition:
                      "stroke-dashoffset 1s ease-out",
                  }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[34px] font-semibold text-[#172636]">
                  {scorePercent}%
                </span>

                <span className="text-[11px] text-[#7d898f]">
                  Score
                </span>
              </div>
            </div>

            <h1 className="mb-1 text-2xl font-bold text-[#172636]">
              {passed
                ? "Great job!"
                : "Keep practicing!"}
            </h1>

            <p className="mb-6 text-gray-500">
              {correctCount} out of{" "}
              {quiz.questions.length} correct —{" "}
              {quiz.title}
            </p>

            <div className="mb-8 space-y-3 text-left">
              {quiz.questions.map(
                (question, index) => {
                  const correct =
                    answers[index] ===
                    question.correctAnswer;

                  return (
                    <div
                      key={
                        question._id || index
                      }
                      className="rounded-xl border border-gray-200 p-4"
                    >
                      <p className="mb-2 text-sm font-semibold text-[#172636]">
                        {index + 1}.{" "}
                        {question.questionText}
                      </p>

                      <p
                        className={
                          correct
                            ? "flex items-center gap-1.5 text-sm text-[#00999d]"
                            : "flex items-center gap-1.5 text-sm text-red-600"
                        }
                      >
                        {correct ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <XCircle size={15} />
                        )}

                        {answers[index] !== null
                          ? answers[index]
                          : "Not answered"}
                      </p>

                      {!correct && (
                        <p className="mt-1 text-sm text-gray-500">
                          Correct:{" "}
                          {question.correctAnswer}
                        </p>
                      )}
                    </div>
                  );
                }
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={restart}
                className="rounded-xl bg-[#08a7aa] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#068d90]"
              >
                Retake Quiz
              </button>

              <Link
                href="/grades"
                className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-medium text-[#172636] transition hover:bg-gray-50"
              >
                View in Grades
              </Link>

              <Link
                href="/quizzes"
                className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-medium text-[#172636] transition hover:bg-gray-50"
              >
                Back to Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * QUIZ ATTEMPT SCREEN
   */
  return (
    <div className="min-h-screen bg-[#F7F9FC] px-6 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/quizzes"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#08a7aa]"
          >
            <ChevronLeft size={16} />
            Exit
          </Link>

          <span className="text-sm font-medium text-gray-500">
            Question {current + 1} of{" "}
            {quiz.questions.length}
          </span>
        </div>

        {/* PROGRESS */}
        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#08a7aa] transition-all duration-300"
            style={{
              width: `${
                ((current + 1) /
                  quiz.questions.length) *
                100
              }%`,
            }}
          />
        </div>

        {/* QUESTION CARD */}
        <div
          key={current}
          className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
        >
          <h1 className="mb-6 text-xl font-bold text-[#172636]">
            {question.questionText}
          </h1>

          <div className="space-y-3">
            {question.options.map(
              (option, index) => {
                const selected =
                  answers[current] === option;

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => pick(option)}
                    className={
                      selected
                        ? "flex w-full items-center gap-3 rounded-xl border-2 border-[#08a7aa] bg-[#08a7aa]/5 p-4 text-left transition"
                        : "flex w-full items-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 text-left transition hover:border-[#08a7aa]/40 hover:bg-gray-50"
                    }
                  >
                    <span
                      className={
                        selected
                          ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#08a7aa] text-xs font-bold text-white"
                          : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-500"
                      }
                    >
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span className="text-sm font-medium text-[#172636]">
                      {option}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() =>
              setCurrent((value) =>
                Math.max(0, value - 1)
              )
            }
            disabled={current === 0}
            className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-medium text-[#172636] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-xs text-gray-400">
            {answeredCount}/
            {quiz.questions.length} answered
          </span>

          <button
            onClick={() =>
              isLast
                ? finish()
                : setCurrent(
                    (value) => value + 1
                  )
            }
            disabled={answers[current] === null}
            className="rounded-xl bg-[#08a7aa] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#068d90] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLast ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}