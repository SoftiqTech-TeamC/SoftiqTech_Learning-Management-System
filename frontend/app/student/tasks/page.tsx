"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";

const tasks = [
  {
    title: "Data Science Project Proposal",
    course: "Data Science 101",
    due: "May 24",
    status: "Pending",
  },
  {
    title: "Algorithms Assignment",
    course: "Algorithms & Design",
    due: "May 27",
    status: "Pending",
  },
  {
    title: "Business Analytics Quiz",
    course: "Business Analytics",
    due: "May 30",
    status: "Completed",
  },
  {
    title: "Physics Lab Report",
    course: "Physics II",
    due: "Jun 2",
    status: "Pending",
  },
];

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-[#fbfcfc] p-8">
      <Link
        href="/student"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#00999d]"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <h1 className="mt-6 text-2xl font-semibold text-[#172636]">
        Tasks Due
      </h1>

      <p className="mt-1 text-sm text-[#849097]">
        Keep track of your upcoming assignments and activities.
      </p>

      <div className="mt-8 space-y-4">
        {tasks.map((task) => (
          <div
            key={task.title}
            className="flex items-center justify-between rounded-xl border border-[#e7ebed] bg-white p-5"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7f7] text-[#00999d]">
                {task.status === "Completed" ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <Clock size={20} />
                )}
              </div>

              <div>
                <h2 className="font-semibold text-[#172636]">
                  {task.title}
                </h2>

                <p className="mt-1 text-xs text-[#849097]">
                  {task.course}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-[#849097]">Due</p>

              <p className="mt-1 text-sm font-semibold text-[#172636]">
                {task.due}
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-[10px] font-medium ${
                  task.status === "Completed"
                    ? "bg-[#e8f7f7] text-[#008f94]"
                    : "bg-[#fff5df] text-[#b77900]"
                }`}
              >
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}