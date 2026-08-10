"use client";

import Link from "next/link";
import { ArrowLeft, Flag, ClipboardCheck, Users } from "lucide-react";

const milestones = [
  {
    date: "May 24",
    title: "Project Proposal",
    course: "Data Science 101",
    icon: Flag,
  },
  {
    date: "May 27",
    title: "Midterm Exam",
    course: "Algorithms & Design",
    icon: ClipboardCheck,
  },
  {
    date: "May 30",
    title: "Group Presentation",
    course: "Business Analytics",
    icon: Users,
  },
  {
    date: "Jun 2",
    title: "Lab Report",
    course: "Physics II",
    icon: ClipboardCheck,
  },
];

export default function MilestonesPage() {
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
        Upcoming Milestones
      </h1>

      <p className="mt-1 text-sm text-[#849097]">
        Important deadlines and academic milestones.
      </p>

      <div className="mt-8 max-w-3xl space-y-4">
        {milestones.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-5 rounded-xl border border-[#e7ebed] bg-white p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf7f7] text-[#00999d]">
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <p className="text-xs text-[#849097]">{item.date}</p>

                <h2 className="mt-1 font-semibold text-[#172636]">
                  {item.title}
                </h2>

                <p className="mt-1 text-xs text-[#849097]">
                  {item.course}
                </p>
              </div>

              <span className="rounded-full bg-[#fff5df] px-3 py-1 text-xs font-medium text-[#b77900]">
                Upcoming
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}