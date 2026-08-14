"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Flame,
  CalendarDays,
  BookOpen,
  CheckSquare,
  Target,
  ChevronRight,
  ChevronLeft,
  Flag,
  Users,
  ClipboardCheck,
  Code2,
  BarChart3,
  Atom,
  Sprout,
  Sigma,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import type { StudentDashboardData } from "@/lib/types";

const COURSE_ICONS: Record<string, typeof BookOpen> = {
  "Data Science": BarChart3,
  "Computer Science": Code2,
  Physics: Atom,
  "Environmental Science": Sprout,
  Mathematics: Sigma,
  Business: TrendingUp,
};

function courseIcon(category: string, size: number, className?: string) {
  const Icon = COURSE_ICONS[category] ?? BookOpen;
  return <Icon size={size} className={className} />;
}

function milestoneIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("exam")) return ClipboardCheck;
  if (t.includes("presentation")) return Users;
  if (t.includes("lab") || t.includes("report")) return ClipboardCheck;
  return Flag;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function StudentDashboard() {
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    let cancelled = false;

    apiFetch<StudentDashboardData>("/dashboard/student")
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
      <div className="flex min-h-screen items-center justify-center bg-[#fbfcfc]">
        <Loader2 className="h-8 w-8 animate-spin text-[#00999d]" />
      </div>
    );
  }

  if (needsAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fbfcfc] px-8">
        <p className="text-[15px] font-semibold text-[#172636]">
          Sign in to view your dashboard
        </p>
        <p className="mt-2 text-[12px] text-[#8b969c]">
          You need to be logged in as a student to see your progress.
        </p>
        <a
          href="/login"
          className="mt-5 rounded-md bg-[#008f94] px-6 py-2.5 text-[11px] font-semibold text-white"
        >
          Go to Login
        </a>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#fbfcfc] px-8">
        <p className="text-[15px] font-semibold text-[#172636]">
          Unable to load your dashboard
        </p>
        <p className="mt-2 text-[12px] text-[#8b969c]">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-5 rounded-md bg-[#008f94] px-6 py-2.5 text-[11px] font-semibold text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const { student, overallProgress, stats, focus, milestones, courses } = data;

  return (
    <div className="min-h-screen bg-[#fbfcfc]">
      {/* Header */}
      <header className="flex h-[100px] items-center justify-between border-b border-[#edf0f1] bg-white px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#00999d]">
              Learning Journey
            </span>

            <span className="text-[#00999d]">〰</span>
          </div>

          <h1 className="mt-1 text-[25px] font-semibold tracking-tight text-[#172636]">
            Welcome back, {student.name.split(" ")[0]}
          </h1>

          <p className="mt-1 text-[11px] text-[#8b969c]">
            Pick up where you left off and keep making progress.
          </p>
        </div>

        <div className="flex items-center gap-7">
          {/* Streak */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf8f8]">
              <Flame size={18} className="text-[#00999d]" />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-[#172636]">
                {stats.streakDays}{" "}
                <span className="text-[10px] font-normal text-[#6e7b82]">
                  Day Streak
                </span>
              </p>

              <p className="text-[8px] font-medium text-[#00999d]">
                Keep it up!
              </p>
            </div>
          </div>

          <div className="h-9 w-px bg-[#e9edef]" />

          {/* Tasks */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf8f8]">
              <CalendarDays size={18} className="text-[#00999d]" />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-[#172636]">
                {stats.tasksDue}{" "}
                <span className="text-[10px] font-normal text-[#6e7b82]">
                  Tasks Due
                </span>
              </p>

              <p className="text-[8px] font-medium text-[#00999d]">
                This Week
              </p>
            </div>
          </div>

          <Bell size={22} strokeWidth={1.5} className="text-[#172636]" />
        </div>
      </header>

      {/* Content */}
      <main className="p-8">
        {/* Top Row */}
        <div className="grid grid-cols-12 gap-5">
          {/* Daily Progress */}
          <div className="col-span-4 rounded-xl border border-[#e7ebed] bg-white p-6">
            <h2 className="text-[13px] font-semibold text-[#172636]">
              Daily Progress
            </h2>

            <div className="mt-6 flex items-center gap-7">
              {/* Ring */}
              <div className="relative h-[150px] w-[150px] shrink-0">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#edf0f1"
                    strokeWidth="7"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#008f94"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="301.6"
                    strokeDashoffset={301.6 - (301.6 * overallProgress) / 100}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[30px] font-semibold text-[#172636]">
                    {overallProgress}%
                  </span>

                  <span className="text-[10px] text-[#7d898f]">
                    Completed
                  </span>

                  <span className="mt-2 rounded-full bg-[#e8f7f7] px-3 py-1 text-[8px] font-medium text-[#008f94]">
                    Great job!
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 space-y-5">
                <Stat
                  icon={<BookOpen size={16} />}
                  label="Study Time"
                  value={stats.studyTimeToday}
                  detail="today"
                />

                <Stat
                  icon={<CheckSquare size={16} />}
                  label="Lessons Done"
                  value={String(stats.lessonsDone)}
                  detail={`of ${stats.totalLessons}`}
                />

                <Stat
                  icon={<Target size={16} />}
                  label="Avg Score"
                  value={`${stats.avgScore}%`}
                  detail="avg."
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold text-[#00999d]">
              View Full Progress
              <ChevronRight size={12} />
            </div>
          </div>

          {/* Focus */}
          <div className="col-span-4 rounded-xl border border-[#e7ebed] bg-white p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-[13px] font-semibold text-[#172636]">
                Focus of the Day
              </h2>

              <div className="h-8 w-5 bg-[#00999d] [clip-path:polygon(0_0,100%_0,100%_100%,50%_75%,0_100%)]" />
            </div>

            {focus ? (
              <>
                <div className="mt-5 flex h-[70px] items-center justify-center rounded-lg bg-[#e8f6f6]">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-[#008f94]">
                    <Target size={28} className="text-[#008f94]" />
                  </div>
                </div>

                <p className="mt-4 text-[8px] font-semibold text-[#00999d]">
                  CONTINUE LESSON
                </p>

                <h3 className="mt-1 text-[14px] font-semibold text-[#172636]">
                  {focus.lessonTitle}
                </h3>

                <p className="mt-1 text-[9px] text-[#849097]">
                  {focus.courseCode} · {focus.courseTitle}
                </p>

                <div className="mt-4 h-[4px] rounded-full bg-[#edf0f1]">
                  <div
                    className="h-full rounded-full bg-[#00999d]"
                    style={{ width: `${focus.courseProgress}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button className="rounded-md bg-[#008f94] px-6 py-2.5 text-[9px] font-semibold text-white">
                    Resume Lesson
                  </button>

                  <span className="text-[9px] font-semibold text-[#00999d]">
                    View Course
                  </span>
                </div>
              </>
            ) : (
              <div className="mt-5 flex h-[70px] items-center justify-center rounded-lg bg-[#e8f6f6]">
                <p className="text-[10px] text-[#7d898f]">
                  Enroll in a course to see your next lesson.
                </p>
              </div>
            )}
          </div>

          {/* Milestones */}
          <div className="col-span-4 rounded-xl border border-[#e7ebed] bg-white p-6">
            <h2 className="text-[13px] font-semibold text-[#172636]">
              Upcoming Milestones
            </h2>

            <div className="relative mt-5">
              <div className="absolute bottom-3 left-[8px] top-3 w-px bg-[#a8dada]" />

              <div className="space-y-4">
                {milestones.length === 0 && (
                  <p className="text-[10px] text-[#8b969c]">
                    No upcoming milestones. You&apos;re all caught up!
                  </p>
                )}

                {milestones.map((milestone) => {
                  const Icon = milestoneIcon(milestone.title);
                  return (
                    <Milestone
                      key={milestone.id}
                      date={formatDate(milestone.date)}
                      title={milestone.title}
                      subtitle={milestone.subtitle}
                      icon={<Icon size={12} />}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold text-[#00999d]">
              View All Milestones
              <ChevronRight size={12} />
            </div>
          </div>
        </div>

        {/* Courses */}
        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-[#172636]">
              My Active Courses
            </h2>

            <div className="flex items-center gap-3">
              <span className="text-[9px] text-[#7d898f]">
                View All Courses
              </span>

              <ChevronLeft size={14} className="text-[#9aa5aa]" />

              <ChevronRight size={14} className="text-[#9aa5aa]" />
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="rounded-xl border border-[#e7ebed] bg-white p-8 text-center">
              <p className="text-[12px] text-[#8b969c]">
                You haven&apos;t enrolled in any courses yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf7f7] text-[#00999d]">
        {icon}
      </div>

      <div>
        <p className="text-[8px] text-[#8b969c]">{label}</p>

        <p className="mt-0.5 text-[11px] font-semibold text-[#172636]">
          {value}
          <span className="ml-1 text-[7px] font-normal text-[#9aa5aa]">
            {detail}
          </span>
        </p>
      </div>
    </div>
  );
}

function Milestone({
  date,
  title,
  subtitle,
  icon,
}: {
  date: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center gap-4">
      <div className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#a8dada] bg-[#effafa] text-[#00999d]">
        {icon}
      </div>

      <div>
        <p className="text-[8px] text-[#8b969c]">{date}</p>

        <p className="mt-0.5 text-[9px] font-semibold text-[#172636]">
          {title}
        </p>

        <p className="text-[7px] text-[#8b969c]">{subtitle}</p>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: StudentDashboardData["courses"][number] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e5e9ea] bg-white">
      <div className="relative flex h-[105px] items-center justify-center bg-gradient-to-br from-[#075f69] to-[#00999d]">
        <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white">
          {courseIcon(course.category, 14)}
        </div>

        {courseIcon(course.category, 28, "text-white/70")}
      </div>

      <div className="p-3">
        <h3 className="truncate text-[10px] font-semibold text-[#172636]">
          {course.title}
        </h3>

        <p className="mt-1 truncate text-[8px] text-[#849097]">
          {course.instructorName || course.category}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-[4px] flex-1 rounded-full bg-[#e8edef]">
            <div
              className="h-full rounded-full bg-[#00999d]"
              style={{ width: `${course.progress}%` }}
            />
          </div>

          <span className="text-[8px] text-[#69777f]">
            {course.progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
