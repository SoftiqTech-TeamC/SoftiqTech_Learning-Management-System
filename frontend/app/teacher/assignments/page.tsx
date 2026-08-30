"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  Video,
  Loader2,
} from "lucide-react";

type AssignmentStatus = "Published" | "Draft" | "Closed";

type Assignment = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  isPublished?: boolean;
  submissionCount?: number;
  courseId?: {
    _id: string;
    title: string;
  } | null;
};

type Course = {
  _id: string;
  title: string;
};

export default function AssignmentsPage() {
  const API_URL = 'https://bashartc14-lms.hf.space';

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  const fetchAssignments = async () => {
    const token = getToken();

    if (!token) {
      setError("Please log in to continue.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/assignments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assignments.");
      }

      const data = await response.json();

      const assignmentData = Array.isArray(data) ? data : [];

      setAssignments(assignmentData);

      if (assignmentData.length > 0) {
        setSelectedAssignment(assignmentData[0]);
      }
    } catch (err) {
      console.error("❌ Fetch teacher assignments error:", err);
      setError("Unable to load assignments.");
    }
  };

  const fetchCourses = async () => {
    const token = getToken();

    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();

      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Fetch courses error:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchAssignments(),
        fetchCourses(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const getStatus = (
    assignment: Assignment
  ): AssignmentStatus => {
    if (!assignment.isPublished) {
      return "Draft";
    }

    const dueDate = new Date(
      assignment.dueDate
    ).getTime();

    if (
      !Number.isNaN(dueDate) &&
      dueDate < Date.now()
    ) {
      return "Closed";
    }

    return "Published";
  };

  const getCourseTitle = (assignment: Assignment) => {
    if (assignment.courseId?.title) {
      return assignment.courseId.title;
    }

    const matchingCourse = courses.find(
      (course) =>
        course._id ===
        assignment.courseId?._id
    );

    return matchingCourse?.title || "Course";
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const courseTitle = getCourseTitle(assignment);

      const matchesSearch =
        assignment.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        courseTitle
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        getStatus(assignment) === filter;

      return matchesSearch && matchesFilter;
    });
  }, [assignments, search, filter, courses]);

  const published = assignments.filter(
    (item) => getStatus(item) === "Published"
  ).length;

  const drafts = assignments.filter(
    (item) => getStatus(item) === "Draft"
  ).length;

  const totalSubmissions = assignments.reduce(
    (sum, item) =>
      sum + (item.submissionCount || 0),
    0
  );

  function formatDate(date: string) {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
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
              Create, organize and monitor assignments
              across your courses.
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
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

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

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b px-6 py-5">
            <div className="flex items-center gap-2">
              <Video
                size={19}
                className="text-[#087f87]"
              />

              <h2 className="font-bold text-slate-900">
                Assignment Overview
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Select an assignment to view its details.
            </p>
          </div>

          {selectedAssignment ? (
            <div className="p-6">
              <div className="rounded-xl border bg-[#f8fafb] p-5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#087f87]">
                  Selected Assignment
                </span>

                <h3 className="mt-2 text-xl font-bold text-[#172636]">
                  {selectedAssignment.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedAssignment.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <div className="rounded-lg bg-[#eaf7f7] px-3 py-2 text-xs font-medium text-[#087f87]">
                    {getCourseTitle(selectedAssignment)}
                  </div>

                  <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                    Due{" "}
                    {formatDate(
                      selectedAssignment.dueDate
                    )}
                  </div>

                  <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                    {selectedAssignment.totalMarks} Marks
                  </div>

                  <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                    {selectedAssignment.submissionCount ||
                      0}{" "}
                    Submissions
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center text-sm text-slate-500">
              No assignment selected.
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Assignment Library
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Manage assignments and track submission
                activity.
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
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search assignments..."
                  className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87] sm:w-64"
                />
              </div>

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-[#087f87]"
              >
                <option value="All">
                  All Assignments
                </option>
                <option value="Published">
                  Published
                </option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2
                size={30}
                className="animate-spin text-[#087f87]"
              />
            </div>
          ) : (
            <>
              <div className="divide-y">
                {filteredAssignments.map(
                  (assignment) => {
                    const submissionCount =
                      assignment.submissionCount || 0;

                    const isSelected =
                      selectedAssignment?._id ===
                      assignment._id;

                    const status =
                      getStatus(assignment);

                    return (
                      <div
                        key={assignment._id}
                        onClick={() =>
                          setSelectedAssignment(
                            assignment
                          )
                        }
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
                              {getCourseTitle(
                                assignment
                              )}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1.5">
                                <CalendarDays size={14} />
                                Due{" "}
                                {formatDate(
                                  assignment.dueDate
                                )}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <Users size={14} />
                                {submissionCount}{" "}
                                submitted
                              </span>

                              <span className="flex items-center gap-1.5 text-[#087f87]">
                                <FileText size={14} />
                                {assignment.totalMarks}{" "}
                                marks
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-5">
                          <StatusBadge
                            status={status}
                          />

                          <button
                            type="button"
                            onClick={(e) =>
                              e.stopPropagation()
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <MoreHorizontal
                              size={19}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  }
                )}
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
            </>
          )}
        </section>

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
