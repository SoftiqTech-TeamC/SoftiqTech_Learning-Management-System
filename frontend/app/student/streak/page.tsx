"use client";

import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";

export default function StreakPage() {
  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  return (
    <div className="min-h-screen bg-[#fbfcfc] p-8">
      <Link
        href="/student"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#00999d]"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-[#e7ebed] bg-white p-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#edf8f8]">
          <Flame size={38} className="text-[#00999d]" />
        </div>

        <h1 className="mt-5 text-3xl font-semibold text-[#172636]">
          7 Day Streak
        </h1>

        <p className="mt-2 text-sm text-[#849097]">
          Great consistency! Keep learning every day.
        </p>

        <div className="mt-8 grid grid-cols-7 gap-3">
          {days.map((day) => (
            <div key={day}>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#00999d] text-white">
                ✓
              </div>

              <p className="mt-2 text-xs text-[#849097]">{day}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-[#eaf7f7] p-5">
          <p className="text-sm font-medium text-[#008f94]">
            Keep your streak going!
          </p>

          <p className="mt-1 text-xs text-[#6e7b82]">
            Complete at least one learning activity today.
          </p>
        </div>
      </div>
    </div>
  );
}