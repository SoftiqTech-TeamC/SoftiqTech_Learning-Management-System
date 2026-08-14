"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  BookOpen,
  Users,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Loader2,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { apiFetch } from "@/lib/api";
import type { TeacherDashboardData } from "@/lib/types";

function courseShort(title: string) {
  return title
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 4);
}

type TooltipEntry = { value?: number | string; name?: string };
type ChartTooltipProps = {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
};

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-[#e7ebed] bg-white px-4 py-3 shadow-md">
      <p className="text-[11px] font-semibold text-[#172636]">{label}</p>
      <p className="mt-1 text-[11px] text-[#00999d]">
        {payload[0].value}% avg progress
      </p>
    </div>
  );
}

export default function TeacherDashboard() {
  const [data, setData] = useState<TeacherDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    let cancelled = false;

    apiFetch<TeacherDashboardData>("/dashboard/teacher")
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) {
          const e = err as Error & { status?: number };
          if (e.status === 401) {
            setNeedsAuth(true);
          } else {
            setError(e.message);
          }
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (needsAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-8">
        <p className="text-[15px] font-semibold text-slate-900">
          Sign in to view your dashboard
        </p>
        <p className="mt-2 text-sm text-slate-500">
          You need to be logged in as an instructor to see your classes.
        </p>
        <a
          href="/login"
          className="mt-5 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Go to Login
        </a>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-8">
        <p className="text-[15px] font-semibold text-slate-900">
          Unable to load your dashboard
        </p>
        <p className="mt-2 text-sm text-slate-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-5 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const { teacher, stats, engagement, recentActivity } = data;

  const chartData = engagement.map((e) => ({
    name: courseShort(e.courseTitle),
    title: e.courseTitle,
    progress: e.avgProgress,
    students: e.students,
  }));

  const statCards = [
    {
      icon: Users,
      label: "Total Students",
      value: String(stats.totalStudents),
      note: `${stats.totalEnrollments} total enrollments`,
    },
    {
      icon: BookOpen,
      label: "Active Courses",
      value: String(stats.activeCourses),
      note: "View all courses →",
    },
    {
      icon: ClipboardList,
      label: "Pending Submissions",
      value: String(stats.pendingSubmissions),
      note: "Awaiting grading",
    },
    {
      icon: TrendingUp,
      label: "Average Progress",
      value: `${stats.averageProgress}%`,
      note: "across your classes",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-8 py-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Instructor Overview
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back, {teacher.name}! Here&apos;s what&apos;s happening with
            your classes today.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <input
            type="text"
            placeholder="Search students, courses, content..."
            className="w-80 rounded-lg border px-4 py-3 text-sm outline-none focus:border-teal-500"
          />

          <Bell className="text-slate-600" />
        </div>
      </header>

      <main className="space-y-6 p-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <Icon className="text-teal-600" />

                <p className="mt-4 text-sm text-slate-500">{card.label}</p>

                <h2 className="text-3xl font-bold">{card.value}</h2>

                <p className="mt-2 text-sm text-teal-600">{card.note}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Class Engagement</h2>

              <select className="rounded-lg border px-3 py-2 text-sm">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>

            {chartData.length === 0 ? (
              <p className="mt-20 text-center text-sm text-slate-500">
                No courses with enrollments yet.
              </p>
            ) : (
              <div className="mt-8 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 4, right: 8, left: -24, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      domain={[0, 100]}
                    />

                    <Tooltip content={<ChartTooltip />} />

                    <Bar
                      dataKey="progress"
                      fill="#0d9488"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Quick Actions</h2>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                ["Grade Submissions", ClipboardList],
                ["Send Message", MessageSquare],
                ["Create Assignment", BookOpen],
                ["Post to Forum", MessageSquare],
                ["Take Attendance", Users],
                ["View Analytics", BarChart3],
              ].map(([name, Icon]) => {
                const ActionIcon = Icon as typeof ClipboardList;

                return (
                  <button
                    key={name as string}
                    className="flex min-h-28 flex-col items-center justify-center rounded-lg border p-4 text-center hover:border-teal-500 hover:bg-teal-50"
                  >
                    <ActionIcon className="mb-3 text-teal-600" size={24} />
                    <span className="text-xs font-medium">
                      {name as string}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Recent Activity</h2>

          <div className="mt-5 space-y-4">
            {recentActivity.length === 0 && (
              <p className="text-sm text-slate-500">
                No recent activity in your courses.
              </p>
            )}

            {recentActivity.map((activity) => {
              const Icon =
                activity.type === "enrollment" ? Users : GraduationCap;

              return (
                <div
                  key={`${activity.date}-${activity.message}`}
                  className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{activity.message}</p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {new Date(activity.date).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
