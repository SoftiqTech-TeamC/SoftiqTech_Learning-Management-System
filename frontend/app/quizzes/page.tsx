"use client";

import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { QUIZZES_SEED } from "@/lib/learningData";
import { useLearning } from "@/lib/learningStore";
import { Bell, ChevronDown, BookOpen, Clock, ListChecks, CheckCircle2 } from "lucide-react";

export default function QuizzesPage() {
  const { quizResults } = useLearning();

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Fixed sidebar — stays still on scroll */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-[250px]">
        <Sidebar active="Quizzes" />
      </aside>

      <div className="ml-[250px] flex-1 min-w-0">
        <div className="sticky top-0 z-20 flex h-[80px] items-center justify-between border-b border-gray-200 bg-white px-6">
          <div>
            <h1 className="text-[36px] font-bold text-[#172636]">Quizzes</h1>
            <div className="mt-1 h-[4px] w-12 rounded bg-[#08a7aa]" />
          </div>
          <div className="flex items-center gap-6">
            <Bell className="text-gray-600" size={21} />
            <ChevronDown className="text-gray-600" size={20} />
          </div>
        </div>

        <main className="px-6 pb-10 pt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {QUIZZES_SEED.map((quiz, index) => {
              const result = quizResults[quiz.id];
              const done = Boolean(result);
              return (
                <div
                  key={quiz.id}
                  className="lm-fade-up overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="relative flex h-[88px] items-center justify-center bg-gradient-to-br from-[#08a7aa] to-[#0b6d78]">
                    <ListChecks size={32} className="text-white/90" />
                    {done && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[11px] font-semibold text-white">
                        <CheckCircle2 size={12} /> {result.score}%
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-[16px] font-bold text-[#172636]">{quiz.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-gray-500">
                      <BookOpen size={14} className="text-[#08a7aa]" />
                      {quiz.courseTitle}
                    </p>

                    <div className="mt-4 flex items-center gap-4 text-[12px] text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <ListChecks size={14} /> {quiz.questions.length} Qs
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {quiz.durationMinutes} min
                      </span>
                    </div>

                    <Link
                      href={`/quizzes/${quiz.id}`}
                      className="mt-5 block w-full rounded-xl bg-[#08a7aa] py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#068d90]"
                    >
                      {done ? "Retake Quiz" : "Start Quiz"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
