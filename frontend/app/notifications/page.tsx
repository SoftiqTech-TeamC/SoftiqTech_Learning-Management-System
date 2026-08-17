"use client";

import Link from "next/link";
import { ArrowLeft, Bell, CheckCircle2 } from "lucide-react";

const notifications = [
  {
    title: "New assignment posted",
    message: "Your Algorithms & Design assignment is now available.",
    time: "10 min ago",
  },
  {
    title: "Quiz result available",
    message: "Your Business Analytics quiz result has been published.",
    time: "2 hours ago",
  },
  {
    title: "Course reminder",
    message: "You have an upcoming Data Science milestone.",
    time: "Yesterday",
  },
];

export default function NotificationsPage() {
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
        Notifications
      </h1>

      <p className="mt-1 text-sm text-[#849097]">
        Stay updated with your latest learning activities.
      </p>

      <div className="mt-8 max-w-3xl space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.title}
            className="flex gap-4 rounded-xl border border-[#e7ebed] bg-white p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf7f7] text-[#00999d]">
              <Bell size={18} />
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-[#172636]">
                {notification.title}
              </h2>

              <p className="mt-1 text-sm text-[#849097]">
                {notification.message}
              </p>

              <p className="mt-2 text-xs text-[#00999d]">
                {notification.time}
              </p>
            </div>

            <CheckCircle2
              size={17}
              className="text-[#00999d]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}