"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuizSeed } from "@/lib/learningData";
import { useLearning } from "@/lib/learningStore";
import { ChevronLeft, CheckCircle2, XCircle } from "lucide-react";

export default function QuizAttemptPage({
  params,
}: {
  params: Promise<{ quizId: string }>;
}) {
  const { quizId } = use(params);
  const quizData = getQuizSeed(quizId);
  const { saveQuizResult } = useLearning();

  if (!quizData) {
    notFound();
  }

  const quiz = quizData;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(quiz.questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const question = quiz.questions[current];
  const isLast = current === quiz.questions.length - 1;
  const answeredCount = answers.filter((a) => a !== null).length;

  const correctCount = quiz.questions.reduce(
    (acc, q, i) => (answers[i] === q.correctIndex ? acc + 1 : acc),
    0
  );
  const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = scorePercent >= 60;

  function pick(optionIndex: number) {
    const next = [...answers];
    next[current] = optionIndex;
    setAnswers(next);
  }

  function finish() {
    // Save to shared store so Grades reflects this real attempt
    saveQuizResult(quiz.id, correctCount, quiz.questions.length);
    setSubmitted(true);
  }

  function restart() {
    setAnswers(Array(quiz.questions.length).fill(null));
    setCurrent(0);
    setSubmitted(false);
  }

  if (submitted) {
    const r = 48;
    const circ = 2 * Math.PI * r;
    return (
      <div className="min-h-screen bg-[#F7F9FC] px-6 py-10">
        <div className="mx-auto w-full max-w-2xl">
          <div className="lm-scale-in rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="relative mx-auto mb-6 h-[150px] w-[150px]">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r={r} fill="none" stroke="#edf0f1" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r={r}
                  fill="none"
                  stroke={passed ? "#008f94" : "#DC2626"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - scorePercent / 100)}
                  style={{ transition: "stroke-dashoffset 1s ease-out" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[34px] font-semibold text-[#172636]">{scorePercent}%</span>
                <span className="text-[11px] text-[#7d898f]">Score</span>
              </div>
            </div>

            <h1 className="mb-1 text-2xl font-bold text-[#172636]">
              {passed ? "Great job!" : "Keep practicing!"}
            </h1>
            <p className="mb-6 text-gray-500">
              {correctCount} out of {quiz.questions.length} correct — {quiz.title}
            </p>

            <div className="mb-8 space-y-3 text-left">
              {quiz.questions.map((q, i) => {
                const correct = answers[i] === q.correctIndex;
                return (
                  <div key={q.id} className="rounded-xl border border-gray-200 p-4">
                    <p className="mb-2 text-sm font-semibold text-[#172636]">
                      {i + 1}. {q.question}
                    </p>
                    <p
                      className={
                        correct
                          ? "flex items-center gap-1.5 text-sm text-[#00999d]"
                          : "flex items-center gap-1.5 text-sm text-red-600"
                      }
                    >
                      {correct ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                      {answers[i] !== null ? q.options[answers[i] as number] : "Not answered"}
                    </p>
                    {!correct && (
                      <p className="mt-1 text-sm text-gray-500">
                        Correct: {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                );
              })}
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

  return (
    <div className="min-h-screen bg-[#F7F9FC] px-6 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/quizzes"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-[#08a7aa]"
          >
            <ChevronLeft size={16} /> Exit
          </Link>
          <span className="text-sm font-medium text-gray-500">
            Question {current + 1} of {quiz.questions.length}
          </span>
        </div>

        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#08a7aa] transition-all duration-300"
            style={{ width: `${((current + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        <div key={current} className="lm-fade-up rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
          <h1 className="mb-6 text-xl font-bold text-[#172636]">{question.question}</h1>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              const selected = answers[current] === i;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
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
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm font-medium text-[#172636]">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-medium text-[#172636] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-xs text-gray-400">
            {answeredCount}/{quiz.questions.length} answered
          </span>

          <button
            onClick={() => (isLast ? finish() : setCurrent((c) => c + 1))}
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
