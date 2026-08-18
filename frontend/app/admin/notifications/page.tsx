"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  Bell,
  BookOpen,
  Users,
  ClipboardList,
  ShieldCheck,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";

const initialNotifications = [
  {
    id: 1,
    title: "New teacher registration",
    description:
      "Sarah Johnson has registered as a new instructor.",
    time: "5 minutes ago",
    icon: Users,
    read: false,
  },
  {
    id: 2,
    title: "Course published",
    description:
      "Advanced Data Structures is now available for students.",
    time: "30 minutes ago",
    icon: BookOpen,
    read: false,
  },
  {
    id: 3,
    title: "Assignment activity updated",
    description:
      "New assignment submissions have been received.",
    time: "1 hour ago",
    icon: ClipboardList,
    read: true,
  },
  {
    id: 4,
    title: "Security check completed",
    description:
      "All system security checks completed successfully.",
    time: "2 hours ago",
    icon: ShieldCheck,
    read: true,
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            System Updates
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Stay updated with the latest platform activity.
          </p>
        </header>

        <div className="mx-auto max-w-5xl space-y-6 p-8">
          <div className="flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                <Bell size={22} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Notification Center
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {unreadCount} unread notifications
                </p>
              </div>
            </div>

            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold text-[#087f87] hover:bg-[#f5fbfb]"
            >
              <CheckCheck size={17} />
              Mark all as read
            </button>
          </div>

          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            {notifications.map((notification) => {
              const Icon = notification.icon;

              return (
                <div
                  key={notification.id}
                  className={`flex gap-4 border-b p-6 last:border-b-0 ${
                    !notification.read ? "bg-[#f7fcfc]" : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                    <Icon size={20} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-slate-900">
                        {notification.title}
                      </h3>

                      {!notification.read && (
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#08a7aa]" />
                      )}
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      {notification.description}
                    </p>

                    <p className="mt-3 text-xs text-slate-400">
                      {notification.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}