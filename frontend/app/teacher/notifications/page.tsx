"use client";

import { useState } from "react";
import Sidebar from "@/components/teacher/TeacherSidebar";
import {
  Bell,
  CheckCheck,
  BookOpen,
  ClipboardList,
  Users,
  MessageSquare,
  CalendarDays,
  Trash2,
} from "lucide-react";

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "course" | "assignment" | "student" | "message" | "calendar";
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New Assignment Submission",
    description:
      "A student submitted the Data Structures assignment.",
    time: "5 minutes ago",
    type: "assignment",
    read: false,
  },
  {
    id: 2,
    title: "New Student Enrolled",
    description:
      "A new student enrolled in Computer Science 320.",
    time: "1 hour ago",
    type: "student",
    read: false,
  },
  {
    id: 3,
    title: "New Course Discussion",
    description:
      "There is a new discussion in Algorithms Fundamentals.",
    time: "3 hours ago",
    type: "message",
    read: false,
  },
  {
    id: 4,
    title: "Quiz Completed",
    description:
      "A student completed the Algorithms Fundamentals quiz.",
    time: "Yesterday",
    type: "course",
    read: true,
  },
  {
    id: 5,
    title: "Upcoming Class",
    description:
      "Your Computer Science 320 class starts tomorrow at 10:00 AM.",
    time: "Yesterday",
    type: "calendar",
    read: true,
  },
];

export default function TeacherNotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id
      )
    );
  };

  const getIcon = (type: Notification["type"]) => {
    const iconClass = "h-5 w-5";

    switch (type) {
      case "assignment":
        return <ClipboardList className={iconClass} />;

      case "student":
        return <Users className={iconClass} />;

      case "message":
        return <MessageSquare className={iconClass} />;

      case "calendar":
        return <CalendarDays className={iconClass} />;

      default:
        return <BookOpen className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Sidebar active="Notifications" />

      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-[#087f87]">
                Teacher Center
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                Notifications
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Stay updated with your courses, students, and activities.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="flex items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                <CheckCheck size={18} />
                Mark all as read
              </button>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-5xl p-8">
          {/* SUMMARY */}
          <div className="mb-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                  <Bell size={22} />
                </div>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    {unreadCount} unread
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Total Notifications
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {notifications.length}
              </h2>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Bell size={22} />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Unread Notifications
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {unreadCount}
              </h2>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="border-b px-6 py-5">
              <h2 className="text-lg font-bold text-slate-900">
                Recent Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View your latest updates and activities.
              </p>
            </div>

            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf7f7] text-[#087f87]">
                  <Bell size={28} />
                </div>

                <h3 className="mt-5 font-semibold text-slate-900">
                  No notifications
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-4 px-6 py-5 transition hover:bg-slate-50 ${
                      !notification.read
                        ? "bg-[#f5fbfb]"
                        : ""
                    }`}
                  >
                    {/* ICON */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                      {getIcon(notification.type)}
                    </div>

                    {/* CONTENT */}
                    <div
                      className="min-w-0 flex-1 cursor-pointer"
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-900">
                              {notification.title}
                            </h3>

                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-[#087f87]" />
                            )}
                          </div>

                          <p className="mt-1 text-sm text-slate-500">
                            {notification.description}
                          </p>

                          <p className="mt-2 text-xs text-slate-400">
                            {notification.time}
                          </p>
                        </div>

                        {/* DELETE */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(
                              notification.id
                            );
                          }}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          aria-label="Delete notification"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}