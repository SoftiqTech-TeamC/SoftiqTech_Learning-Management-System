"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Search,
  Plus,
  MessageSquare,
  MoreHorizontal,
  Pin,
  Clock,
  Users,
  ChevronRight,
  Send,
} from "lucide-react";

type Discussion = {
  id: number;
  title: string;
  course: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  pinned?: boolean;
  status: "Active" | "Closed";
};

const discussions: Discussion[] = [
  {
    id: 1,
    title: "Week 6 Discussion: Sustainable Development",
    course: "Environmental Science",
    author: "Safdar Khan",
    replies: 24,
    views: 186,
    lastActivity: "12 min ago",
    pinned: true,
    status: "Active",
  },
  {
    id: 2,
    title: "Understanding Database Normalization",
    course: "Database Systems",
    author: "Ali Raza",
    replies: 18,
    views: 143,
    lastActivity: "42 min ago",
    status: "Active",
  },
  {
    id: 3,
    title: "Midterm Preparation & Important Topics",
    course: "Data Structures",
    author: "Sarah Ahmed",
    replies: 31,
    views: 224,
    lastActivity: "2 hours ago",
    status: "Active",
  },
  {
    id: 4,
    title: "Assignment 3 Questions",
    course: "Computer Science",
    author: "Hassan Malik",
    replies: 11,
    views: 97,
    lastActivity: "Yesterday",
    status: "Active",
  },
  {
    id: 5,
    title: "Introduction to Research Methods",
    course: "Research Methods",
    author: "Anousha",
    replies: 8,
    views: 72,
    lastActivity: "2 days ago",
    status: "Closed",
  },
];

export default function TeacherForumPage() {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All Courses");
  const [status, setStatus] = useState("All");
  const [showCreate, setShowCreate] = useState(false);

  const filteredDiscussions = useMemo(() => {
    return discussions.filter((discussion) => {
      const matchesSearch =
        discussion.title.toLowerCase().includes(search.toLowerCase()) ||
        discussion.course.toLowerCase().includes(search.toLowerCase()) ||
        discussion.author.toLowerCase().includes(search.toLowerCase());

      const matchesCourse =
        course === "All Courses" || discussion.course === course;

      const matchesStatus =
        status === "All" || discussion.status === status;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [search, course, status]);

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <header className="border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between px-8 py-6">
          <div>
            <p className="text-sm font-medium text-[#087F87]">
              Communication
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Discussion Forum
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage course discussions and engage with your students.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100">
              <Bell size={21} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 rounded-lg bg-[#087F87] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066B72]"
            >
              <Plus size={18} />
              New Discussion
            </button>
          </div>
        </div>
      </header>

      <main className="space-y-6 p-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <MessageSquare className="text-[#087F87]" />
              <span className="text-xs font-medium text-green-600">
                Active
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Active Discussions
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">18</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Users className="text-[#087F87]" />
            <p className="mt-4 text-sm text-slate-500">
              Student Participation
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">76%</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <Clock className="text-[#087F87]" />
            <p className="mt-4 text-sm text-slate-500">
              Unanswered Posts
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">7</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search discussions..."
                className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-4 text-sm outline-none focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/10"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none"
              >
                <option>All Courses</option>
                <option>Environmental Science</option>
                <option>Database Systems</option>
                <option>Data Structures</option>
                <option>Computer Science</option>
                <option>Research Methods</option>
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none"
              >
                <option>All</option>
                <option>Active</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-bold text-slate-900">
              Course Discussions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredDiscussions.length} discussions found
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="group flex items-center gap-4 px-6 py-5 transition hover:bg-slate-50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#087F87]">
                  <MessageSquare size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {discussion.pinned && (
                      <Pin size={14} className="text-[#087F87]" />
                    )}

                    <h3 className="truncate font-semibold text-slate-900">
                      {discussion.title}
                    </h3>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {discussion.course} · Started by {discussion.author}
                  </p>

                  <div className="mt-2 flex gap-4 text-xs text-slate-500">
                    <span>{discussion.replies} replies</span>
                    <span>{discussion.views} views</span>
                    <span>{discussion.lastActivity}</span>
                  </div>
                </div>

                <span
                  className={`hidden rounded-full px-3 py-1 text-xs font-medium sm:block ${
                    discussion.status === "Active"
                      ? "bg-green-50 text-green-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {discussion.status}
                </span>

                <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                  <MoreHorizontal size={19} />
                </button>

                <ChevronRight
                  size={18}
                  className="text-slate-400"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-5">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Create Discussion
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Start a new topic for your students.
                </p>
              </div>

              <button
                onClick={() => setShowCreate(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <input
                placeholder="Discussion title"
                className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[#087F87]"
              />

              <select className="h-11 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none">
                <option>Select course</option>
                <option>Environmental Science</option>
                <option>Database Systems</option>
                <option>Data Structures</option>
              </select>

              <textarea
                placeholder="Write your discussion prompt..."
                rows={5}
                className="w-full resize-none rounded-lg border border-slate-300 p-4 text-sm outline-none focus:border-[#087F87]"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="rounded-lg border px-4 py-2.5 text-sm font-medium"
                >
                  Cancel
                </button>

                <button className="flex items-center gap-2 rounded-lg bg-[#087F87] px-4 py-2.5 text-sm font-semibold text-white">
                  <Send size={16} />
                  Publish Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}