"use client";

import Link from "next/link";
import { Bell, ArrowLeft } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link
        href="/teacher"
        className="mb-6 inline-flex items-center gap-2 text-sm text-teal-600 hover:underline"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <Bell className="text-teal-600" size={32} />

        <h1 className="mt-4 text-3xl font-bold text-slate-900">
          Notifications
        </h1>

        <p className="mt-2 text-slate-500">
          View your latest notifications and updates.
        </p>
      </div>
    </div>
  );
}