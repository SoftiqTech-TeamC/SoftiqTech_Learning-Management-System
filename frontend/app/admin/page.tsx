"use client";

import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";

import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Activity,
  ArrowUpRight,
  Bell,
  MoreHorizontal,
  CircleCheck,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const activities = [
  {
    title: "New instructor account created",
    user: "Sarah Johnson",
    time: "5 minutes ago",
    icon: UserCheck,
  },
  {
    title: "Course published successfully",
    user: "Advanced Data Structures",
    time: "18 minutes ago",
    icon: BookOpen,
  },
  {
    title: "Assignment submissions updated",
    user: "Computer Science 320",
    time: "42 minutes ago",
    icon: ClipboardList,
  },
  {
    title: "System permissions updated",
    user: "Administrator",
    time: "1 hour ago",
    icon: ShieldCheck,
  },
];

const courses = [
  {
    id: 1,
    name: "Computer Science 320",
    instructor: "Dr. Jawaid",
    students: 42,
    progress: 78,
    status: "Active",
  },
  {
    id: 2,
    name: "Database Systems",
    instructor: "Maham",
    students: 38,
    progress: 65,
    status: "Active",
  },
  {
    id: 3,
    name: "Research Methodology",
    instructor: "Eman",
    students: 36,
    progress: 54,
    status: "Active",
  },
  {
    id: 4,
    name: "Mathematics 120",
    instructor: "Rubina",
    students: 40,
    progress: 89,
    status: "Active",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
                Administration Center
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                Admin Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Monitor your learning platform, users, courses and system
                activity.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* NOTIFICATIONS */}
              <Link
                href="/admin/notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-lg border bg-white text-slate-500 transition hover:bg-slate-50 hover:text-[#087f87]"
              >
                <Bell size={19} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#08a7aa]" />
              </Link>

              {/* ADMIN PROFILE */}
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-xl border bg-white px-3 py-2 transition hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf7f7] text-sm font-bold text-[#087f87]">
                  A
                </div>

                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-slate-800">
                    Administrator
                  </p>

                  <p className="text-[10px] text-slate-400">
                    System Admin
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <div className="space-y-8 p-8">
          {/* WELCOME */}
          <section className="rounded-2xl bg-[#172636] p-7 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-white/60">
                  Platform Overview
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Everything is running smoothly.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                  Monitor platform performance, manage users and keep track of
                  learning activity from one central place.
                </p>
              </div>

              <Link
                href="/admin/activity"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10"
              >
                <p className="text-xs text-white/50">
                  System Status
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  All Systems Operational
                </div>
              </Link>
            </div>
          </section>

          {/* STATISTICS */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <Link href="/admin/users">
              <StatCard
                icon={Users}
                title="Total Users"
                value="2,486"
                change="+12.5%"
                positive
              />
            </Link>

            <Link href="/admin/students">
              <StatCard
                icon={GraduationCap}
                title="Students"
                value="2,184"
                change="+8.2%"
                positive
              />
            </Link>

            <Link href="/admin/courses">
              <StatCard
                icon={BookOpen}
                title="Active Courses"
                value="86"
                change="+5.4%"
                positive
              />
            </Link>

            <Link href="/admin/activity">
              <StatCard
                icon={Activity}
                title="Platform Activity"
                value="94.8%"
                change="-1.2%"
                positive={false}
              />
            </Link>
          </section>

          {/* MAIN GRID */}
          <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
            {/* ACTIVE COURSES */}
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b p-6">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Active Courses
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Overview of currently active courses.
                  </p>
                </div>

                <Link
                  href="/admin/courses"
                  className="flex items-center gap-1 text-xs font-semibold text-[#087f87] transition hover:text-[#066b72]"
                >
                  View All
                  <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className="divide-y">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/admin/courses/${course.id}`}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                        <BookOpen size={20} />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {course.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {course.instructor} · {course.students} students
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="w-28">
                        <div className="mb-1 flex justify-between text-[10px] text-slate-400">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>

                        <div className="h-1.5 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-[#08a7aa]"
                            style={{
                              width: `${course.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
                        {course.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="rounded-2xl border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b p-6">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Recent Activity
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Latest platform updates.
                  </p>
                </div>

                <Link
                  href="/admin/activity"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-[#087f87]"
                >
                  <MoreHorizontal size={19} />
                </Link>
              </div>

              <div className="divide-y">
                {activities.map((activity) => {
                  const Icon = activity.icon;

                  return (
                    <Link
                      key={activity.title}
                      href="/admin/activity"
                      className="flex gap-4 p-5 transition hover:bg-slate-50"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {activity.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {activity.user}
                        </p>

                        <p className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                          <Clock3 size={11} />
                          {activity.time}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* BOTTOM CARDS */}
          <section className="grid gap-6 lg:grid-cols-3">
            <Link href="/admin/activity">
              <BottomCard
                icon={CircleCheck}
                title="System Health"
                value="Excellent"
                description="All core services are operating normally."
              />
            </Link>

            <Link href="/admin/users">
              <BottomCard
                icon={Users}
                title="New Users"
                value="128"
                description="New registrations during the last 7 days."
              />
            </Link>

            <Link href="/admin/settings">
              <BottomCard
                icon={ShieldCheck}
                title="Security"
                value="Protected"
                description="No unusual activity detected."
              />
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  change,
  positive,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
          <Icon size={21} />
        </div>

        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            positive ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {positive ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}

          {change}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-3xl font-bold text-[#172636]">
        {value}
      </h3>
    </div>
  );
}

function BottomCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="h-full rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
        <Icon size={20} />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-xl font-bold text-[#172636]">
        {value}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}