"use client";

import Link from "next/link";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

const lessons = [
  "Introduction to Data Structures",
  "Arrays and Linked Lists",
  "Stacks and Queues",
  "Trees",
  "Graphs",
];

export default function DataStructuresLessonPage() {
  return (
    <div className="min-h-screen bg-[#fbfcfc] p-8">
      <Link
        href="/student"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#00999d]"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="mt-8 max-w-4xl">
        <div className="rounded-2xl bg-[#e8f6f6] p-8">
          <p className="text-xs font-semibold text-[#00999d]">
            CONTINUE LESSON
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#172636]">
            Data Structures in Depth
          </h1>

          <p className="mt-2 text-sm text-[#849097]">
            CS-201 · Foundations of Computer Science
          </p>

          <div className="mt-6 h-2 rounded-full bg-white">
            <div className="h-full w-[40%] rounded-full bg-[#00999d]" />
          </div>

          <p className="mt-2 text-xs text-[#849097]">
            40% completed
          </p>

          <button className="mt-6 flex items-center gap-2 rounded-lg bg-[#008f94] px-5 py-3 text-sm font-semibold text-white hover:bg-[#007b80]">
            <PlayCircle size={18} />
            Continue Learning
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-[#e7ebed] bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#172636]">
            <BookOpen size={20} className="text-[#00999d]" />
            Course Lessons
          </h2>

          <div className="mt-5 space-y-3">
            {lessons.map((lesson, index) => (
              <div
                key={lesson}
                className="flex items-center justify-between rounded-lg border border-[#edf0f1] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#849097]">
                    {index + 1}
                  </span>

                  <span className="text-sm font-medium text-[#172636]">
                    {lesson}
                  </span>
                </div>

                {index < 2 ? (
                  <CheckCircle2
                    size={18}
                    className="text-[#00999d]"
                  />
                ) : (
                  <span className="text-xs text-[#849097]">
                    Not started
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}