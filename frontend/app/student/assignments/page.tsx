"use client";

import Link from "next/link";
import {
  ClipboardCheck,
  CalendarDays,
  Clock,
  FileText,
  CheckCircle2,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";

export type Assignment = {
  id: number;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  dueTime: string;
  status: "Pending" | "Submitted";
};

export const assignments: Assignment[] = [
  {
    id: 1,
    title: "Data Science Project",
    course: "Data Science 101",
    description:
      "Complete the assigned data analysis project and submit your findings with proper explanations and visualizations.",
    dueDate: "May 24, 2026",
    dueTime: "11:59 PM",
    status: "Pending",
  },
  {
    id: 2,
    title: "Sorting Algorithms",
    course: "Algorithms & Design",
    description:
      "Implement and explain different sorting algorithms. Include time complexity analysis for each algorithm.",
    dueDate: "May 27, 2026",
    dueTime: "11:59 PM",
    status: "Pending",
  },
  {
    id: 3,
    title: "Business Analysis Report",
    course: "Business Analytics",
    description:
      "Prepare a business analysis report based on the given case study and provide suitable recommendations.",
    dueDate: "May 30, 2026",
    dueTime: "11:59 PM",
    status: "Submitted",
  },
];

export default function StudentAssignmentsPage() {
  const total = assignments.length;
  const pending = assignments.filter(
    (item) => item.status === "Pending"
  ).length;
  const submitted = assignments.filter(
    (item) => item.status === "Submitted"
  ).length;

  return (
    <>
      <Sidebar active="Assignments" />

      <div className="ml-[240px] min-h-screen bg-[#fbfcfc]">
        {/* HEADER */}
        <header className="flex min-h-[100px] items-center justify-between border-b border-[#edf0f1] bg-white px-8">
          <div>
            <Link
              href="/student"
              className="mb-2 flex items-center gap-1 text-[9px] font-medium text-[#00999d] transition hover:text-[#007b80]"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="text-[25px] font-semibold tracking-tight text-[#172636]">
              Assignments
            </h1>

            <p className="mt-1 text-[11px] text-[#8b969c]">
              View your assignments and submit your work.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf8f8]">
            <ClipboardCheck
              size={21}
              className="text-[#00999d]"
            />
          </div>
        </header>

        {/* MAIN */}
        <main className="p-8">
          {/* SUMMARY */}
          <div className="mb-7 grid grid-cols-3 gap-5">
            <SummaryCard
              label="Total Assignments"
              value={String(total)}
              icon={<ClipboardCheck size={18} />}
            />

            <SummaryCard
              label="Pending"
              value={String(pending)}
              icon={<Clock size={18} />}
            />

            <SummaryCard
              label="Submitted"
              value={String(submitted)}
              icon={<CheckCircle2 size={18} />}
            />
          </div>

          {/* ASSIGNMENTS */}
          <section>
            <div className="mb-4">
              <h2 className="text-[13px] font-semibold text-[#172636]">
                My Assignments
              </h2>

              <p className="mt-1 text-[9px] text-[#849097]">
                Select an assignment to view its details and submit your work.
              </p>
            </div>

            <div className="space-y-4">
              {assignments.map((assignment) => (
                <AssignmentRow
                  key={assignment.id}
                  assignment={assignment}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

/* ============================================================= */
/* SUMMARY CARD */
/* ============================================================= */

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#e5e9ea] bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] text-[#849097]">
            {label}
          </p>

          <p className="mt-2 text-[24px] font-semibold text-[#172636]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f7f7] text-[#00999d]">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ============================================================= */
/* ASSIGNMENT ROW */
/* ============================================================= */

function AssignmentRow({
  assignment,
}: {
  assignment: Assignment;
}) {
  const isSubmitted = assignment.status === "Submitted";

  return (
    <div className="rounded-xl border border-[#e5e9ea] bg-white p-5 transition hover:border-[#b8dfe0] hover:shadow-sm">
      <div className="flex items-center justify-between gap-6">
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8f7f7]">
            <FileText
              size={21}
              className="text-[#00999d]"
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[12px] font-semibold text-[#172636]">
              {assignment.title}
            </h3>

            <p className="mt-1 text-[9px] text-[#849097]">
              {assignment.course}
            </p>

            <p className="mt-2 line-clamp-1 max-w-[500px] text-[8px] text-[#9aa5aa]">
              {assignment.description}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex shrink-0 items-center gap-8">
          {/* DUE DATE */}
          <div className="flex items-center gap-2">
            <CalendarDays
              size={15}
              className="text-[#00999d]"
            />

            <div>
              <p className="text-[7px] text-[#9aa5aa]">
                Due Date
              </p>

              <p className="mt-0.5 text-[8px] font-medium text-[#172636]">
                {assignment.dueDate}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <span
            className={`rounded-full px-3 py-1.5 text-[8px] font-medium ${
              isSubmitted
                ? "bg-[#e8f7ef] text-[#218653]"
                : "bg-[#fff5df] text-[#b87900]"
            }`}
          >
            {assignment.status}
          </span>

          {/* VIEW BUTTON */}
          <Link
            href={`/student/assignments/${assignment.id}`}
            className="rounded-md bg-[#008f94] px-5 py-2.5 text-[8px] font-semibold text-white transition hover:bg-[#007b80]"
          >
            {isSubmitted
              ? "View Submission"
              : "View & Submit"}
          </Link>
        </div>
      </div>
    </div>
  );
}