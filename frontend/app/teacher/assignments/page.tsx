"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  FileText,
  Clock3,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Users,
  CalendarDays,
  ChevronRight,
  Play,
  Video,
} from "lucide-react";

type AssignmentStatus = "Published" | "Draft" | "Closed";

const assignments = [
  {
    id: 1,
    title: "Data Structures Analysis",
    course: "Computer Science 320",
    dueDate: "Aug 18, 2026",
    submissions: 32,
    totalStudents: 42,
    status: "Published" as AssignmentStatus,
    videoTitle: "Introduction to Data Structures",
    videoDuration: "12:45",
  },
  {
    id: 2,
    title: "Database Design Project",
    course: "Computer Science 320",
    dueDate: "Aug 21, 2026",
    submissions: 18,
    totalStudents: 42,
    status: "Published" as AssignmentStatus,
    videoTitle: "Database Design Guidelines",
    videoDuration: "09:30",
  },
  {
    id: 3,
    title: "Research Methodology",
    course: "Psychology 150",
    dueDate: "Aug 24, 2026",
    submissions: 0,
    totalStudents: 36,
    status: "Published" as AssignmentStatus,
    videoTitle: "Research Methodology Overview",
    videoDuration: "15:20",
  },
  {
    id: 4,
    title: "Midterm Preparation",
    course: "Mathematics 120",
    dueDate: "Sep 02, 2026",
    submissions: 0,
    totalStudents: 40,
    status: "Draft" as AssignmentStatus,
    videoTitle: "Midterm Preparation Guide",
    videoDuration: "18:10",
  },
  {
    id: 5,
    title: "Final Lab Report",
    course: "Biology 201",
    dueDate: "Jul 28, 2026",
    submissions: 38,
    totalStudents: 38,
    status: "Closed" as AssignmentStatus,
    videoTitle: "Final Lab Instructions",
    videoDuration: "11:05",
  },
];

export default function AssignmentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedAssignment, setSelectedAssignment] = useState(
    assignments[0]
  );

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const matchesSearch =
        assignment.title.toLowerCase().includes(search.toLowerCase()) ||
        assignment.course.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || assignment.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const published = assignments.filter(
    (item) => item.status === "Published"
  ).length;

  const drafts = assignments.filter(
    (item) => item.status === "Draft"
  ).length;

  const totalSubmissions = assignments.reduce(
    (sum, item) => sum + item.submissions,
    0
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* HEADER */}
      <header className="border-b bg-white px-8 py-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
              Teaching Workspace
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#172636]">
              Assignments
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create, organize and monitor assignments across your courses.
            </p>
          </div>

          <Link
            href="/teacher/assignments/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#087f87] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b72]"
          >
            <Plus size={18} />
            Create Assignment
          </Link>
        </div>
      </header>

      <main className="space-y-6 p-8">
        {/* STATS */}
        <div className="grid gap-5 md:grid-cols-4">
          <StatCard
            icon={FileText}
            label="Total Assignments"
            value={assignments.length}
          />

          <StatCard
            icon={CheckCircle2}
            label="Published"
            value={published}
          />

          <StatCard
            icon={Clock3}
            label="Drafts"
            value={drafts}
          />

          <StatCard
            icon={Users}
            label="Submissions"
            value={totalSubmissions}
          />
        </div>

        {/* VIDEO PLAYER SECTION */}
        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b px-6 py-5">
            <div className="flex items-center gap-2">
              <Video size={19} className="text-[#087f87]" />

              <h2 className="font-bold text-slate-900">
                Assignment Video
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Provide students with an instructional video related to the
              selected assignment.
            </p>
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr]">
            {/* VIDEO PLAYER */}
            <div className="relative overflow-hidden rounded-xl bg-[#172636]">
              <div className="aspect-video w-full">
                <video
                  controls
                  className="h-full w-full object-cover"
                  poster="/video-thumbnail.jpg"
                >
                  <source
                    src="/videos/assignment-introduction.mp4"
                    type="video/mp4"
                  />

                  Your browser does not support the video element.
                </video>
              </div>

              {/* Video overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <Play
                    size={23}
                    className="ml-1 text-[#087f87]"
                    fill="currentColor"
                  />
                </div>
              </div>
            </div>

            {/* VIDEO INFORMATION */}
            <div className="flex flex-col justify-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#087f87]">
                Instructional Video
              </span>

              <h3 className="mt-2 text-xl font-bold text-[#172636]">
                {selectedAssignment.videoTitle}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Watch this video to understand the assignment requirements,
                important instructions and expected submission format.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-lg bg-[#eaf7f7] px-3 py-2 text-xs font-medium text-[#087f87]">
                  {selectedAssignment.course}
                </div>

                <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                  {selectedAssignment.videoDuration}
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#e5e9ea] bg-[#f8fafb] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
                    <FileText size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Selected Assignment
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {selectedAssignment.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ASSIGNMENT LIBRARY */}
        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Assignment Library
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Manage assignments and track submission activity.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search assignments..."
                  className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87] sm:w-64"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-[#087f87]"
              >
                <option value="All">All Assignments</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="divide-y">
            {filteredAssignments.map((assignment) => {
              const submissionPercentage =
                assignment.totalStudents === 0
                  ? 0
                  : Math.round(
                      (assignment.submissions /
                        assignment.totalStudents) *
                        100
                    );

              const isSelected =
                selectedAssignment.id === assignment.id;

              return (
                <div
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment)}
                  className={`flex cursor-pointer flex-col gap-5 p-6 transition lg:flex-row lg:items-center lg:justify-between ${
                    isSelected
                      ? "bg-[#f2fafa]"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                      <FileText size={21} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900">
                        {assignment.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {assignment.course}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          Due {assignment.dueDate}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          {assignment.submissions}/
                          {assignment.totalStudents} submitted
                        </span>

                        <span className="flex items-center gap-1.5 text-[#087f87]">
                          <Video size={14} />
                          Video attached
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="hidden w-32 sm:block">
                      <div className="mb-1 flex justify-between text-[10px] text-slate-500">
                        <span>Submissions</span>
                        <span>{submissionPercentage}%</span>
                      </div>

                      <div className="h-1.5 rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#087f87]"
                          style={{
                            width: `${submissionPercentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    <StatusBadge status={assignment.status} />

                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="px-6 py-16 text-center">
              <AlertCircle
                className="mx-auto text-slate-300"
                size={30}
              />

              <p className="mt-3 font-medium text-slate-700">
                No assignments found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </section>

        {/* SUBMISSIONS LINK */}
        <Link
          href="/teacher/submissions"
          className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm transition hover:border-[#087f87]"
        >
          <div className="flex items-center gap-3">
            <Users
              className="text-[#087f87]"
              size={20}
            />

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Review student submissions
              </p>

              <p className="text-xs text-slate-500">
                Continue grading submitted assignments.
              </p>
            </div>
          </div>

          <ChevronRight
            size={18}
            className="text-slate-400"
          />
        </Link>
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
        <Icon size={20} />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-[#172636]">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: AssignmentStatus;
}) {
  const styles = {
    Published: "bg-emerald-50 text-emerald-700",
    Draft: "bg-amber-50 text-amber-700",
    Closed: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}