"use client";

import Sidebar from "@/components/layout/Sidebar";
import { QUIZZES_SEED, ASSIGNMENTS_SEED } from "@/lib/learningData";
import { useLearning } from "@/lib/learningStore";
import { Bell, ChevronDown, Award, TrendingUp, Inbox } from "lucide-react";

type Row = {
  id: string;
  courseTitle: string;
  item: string;
  type: "Quiz" | "Assignment";
  detail: string;
  date: string;
  pct: number | null;
};

export default function GradesPage() {
  const { quizResults, assignments } = useLearning();

  // Build grade rows from REAL activity
  const quizRows: Row[] = QUIZZES_SEED.filter((q) => quizResults[q.id]).map((q) => {
    const r = quizResults[q.id];
    return {
      id: `quiz-${q.id}`,
      courseTitle: q.courseTitle,
      item: q.title,
      type: "Quiz",
      detail: `${r.correct}/${r.total}`,
      date: r.date,
      pct: r.score,
    };
  });

  const assignmentRows: Row[] = ASSIGNMENTS_SEED.filter(
    (a) => assignments[a.id]?.status === "submitted"
  ).map((a) => ({
    id: `assign-${a.id}`,
    courseTitle: a.courseTitle,
    item: a.title,
    type: "Assignment",
    detail: "Submitted",
    date: assignments[a.id].submittedDate,
    pct: null, // not graded yet
  }));

  const rows = [...quizRows, ...assignmentRows];

  const gradedPcts = rows.filter((r) => r.pct !== null).map((r) => r.pct as number);
  const overallPct =
    gradedPcts.length > 0
      ? Math.round(gradedPcts.reduce((a, b) => a + b, 0) / gradedPcts.length)
      : 0;
  const bestPct = gradedPcts.length > 0 ? Math.max(...gradedPcts) : 0;

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Fixed sidebar — stays still on scroll */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-[250px]">
        <Sidebar active="Grades" />
      </aside>

      <div className="ml-[250px] flex-1 min-w-0">
        <div className="sticky top-0 z-20 flex h-[80px] items-center justify-between border-b border-gray-200 bg-white px-6">
          <div>
            <h1 className="text-[36px] font-bold text-[#172636]">Grades</h1>
            <div className="mt-1 h-[4px] w-12 rounded bg-[#08a7aa]" />
          </div>
          <div className="flex items-center gap-6">
            <Bell className="text-gray-600" size={21} />
            <ChevronDown className="text-gray-600" size={20} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-5 px-6">
          <div className="lm-fade-up rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf8f8]">
                <TrendingUp size={20} className="text-[#00999d]" />
              </div>
              <div>
                <p className="text-[26px] font-bold text-[#172636]">{overallPct}%</p>
                <p className="text-[12px] text-[#8b969c]">Overall Average</p>
              </div>
            </div>
          </div>

          <div className="lm-fade-up rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" style={{ animationDelay: "70ms" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf8f8]">
                <Award size={20} className="text-[#00999d]" />
              </div>
              <div>
                <p className="text-[26px] font-bold text-[#172636]">{bestPct}%</p>
                <p className="text-[12px] text-[#8b969c]">Best Score</p>
              </div>
            </div>
          </div>

          <div className="lm-fade-up rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" style={{ animationDelay: "140ms" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf8f8]">
                <Award size={20} className="text-[#00999d]" />
              </div>
              <div>
                <p className="text-[26px] font-bold text-[#172636]">{rows.length}</p>
                <p className="text-[12px] text-[#8b969c]">Graded Items</p>
              </div>
            </div>
          </div>
        </div>

        <main className="mt-6 px-6 pb-12">
          {rows.length === 0 ? (
            <div className="lm-fade-up flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <Inbox size={40} className="mb-3 text-gray-300" />
              <p className="text-sm font-medium text-[#172636]">No grades yet</p>
              <p className="mt-1 text-sm text-gray-500">
                Complete a quiz or submit an assignment and it will appear here.
              </p>
            </div>
          ) : (
            <div className="lm-fade-up overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#F7F9FC] text-[12px] uppercase tracking-wide text-[#8b969c]">
                    <th className="px-6 py-4 font-semibold">Course</th>
                    <th className="px-6 py-4 font-semibold">Item</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 text-right font-semibold">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-b border-gray-50 text-[14px] transition hover:bg-[#F7F9FC]">
                      <td className="px-6 py-4 font-medium text-[#172636]">{r.courseTitle}</td>
                      <td className="px-6 py-4 text-gray-600">{r.item}</td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            r.type === "Quiz"
                              ? "rounded-full bg-[#e8f7f7] px-3 py-1 text-[11px] font-semibold text-[#00999d]"
                              : "rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-600"
                          }
                        >
                          {r.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{r.date}</td>
                      <td className="px-6 py-4 text-right">
                        {r.pct !== null ? (
                          <>
                            <span className="font-semibold text-[#172636]">{r.detail}</span>
                            <span
                              className={
                                r.pct >= 60
                                  ? "ml-2 text-[12px] font-medium text-[#00999d]"
                                  : "ml-2 text-[12px] font-medium text-red-500"
                              }
                            >
                              {r.pct}%
                            </span>
                          </>
                        ) : (
                          <span className="text-[12px] font-medium text-amber-600">
                            Awaiting grade
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
