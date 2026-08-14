"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, CheckSquare, Target, Clock } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-[#fbfcfc] p-8">
      <Link
        href="/student"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#00999d] hover:text-[#007b80]"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-semibold text-[#172636]">
        My Progress
      </h1>

      <p className="mt-1 text-sm text-[#849097]">
        Track your overall learning progress and performance.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <ProgressCard
          icon={<Clock size={22} />}
          title="Study Time"
          value="2h 45m"
          detail="of 3h daily goal"
        />

        <ProgressCard
          icon={<CheckSquare size={22} />}
          title="Lessons Completed"
          value="5 / 8"
          detail="62% completed"
        />

        <ProgressCard
          icon={<Target size={22} />}
          title="Average Quiz Score"
          value="88%"
          detail="Excellent performance"
        />
      </div>

      <div className="mt-6 rounded-xl border border-[#e7ebed] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#172636]">
          Overall Completion
        </h2>

        <div className="mt-5 h-3 rounded-full bg-[#edf0f1]">
          <div className="h-full w-[76%] rounded-full bg-[#00999d]" />
        </div>

        <div className="mt-2 flex justify-between text-xs text-[#849097]">
          <span>Progress</span>
          <span>76%</span>
        </div>
      </div>
    </div>
  );
}

function ProgressCard({
  icon,
  title,
  value,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-[#e7ebed] bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7f7] text-[#00999d]">
        {icon}
      </div>

      <p className="mt-5 text-sm text-[#849097]">{title}</p>

      <p className="mt-1 text-2xl font-semibold text-[#172636]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#00999d]">{detail}</p>
    </div>
  );
}