"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  Plus,
  MessageCircle,
  Clock3,
  ChevronRight,
  Pin,
  BookOpen,
  Users,
  Filter,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";

type Discussion = {
  id: number;
  title: string;
  description: string;
  author: string;
  course: string;
  replies: number;
  lastActivity: string;
  category: string;
  pinned: boolean;
};

const discussions: Discussion[] = [
  {
    id: 1,
    title: "How does Binary Search work?",
    description:
      "I am confused about how the search space is reduced after every comparison. Can someone explain it with a simple example?",
    author: "Ayesha Khan",
    course: "Algorithms & Design",
    replies: 12,
    lastActivity: "10 min ago",
    category: "Question",
    pinned: true,
  },
  {
    id: 2,
    title: "Data Science 101 - Assignment Discussion",
    description:
      "Can we discuss the dataset requirements for the upcoming assignment?",
    author: "Hamza Ali",
    course: "Data Science 101",
    replies: 8,
    lastActivity: "35 min ago",
    category: "Assignment",
    pinned: false,
  },
  {
    id: 3,
    title: "Important topics for Midterm",
    description:
      "Which topics should we focus on for the Algorithms & Design midterm?",
    author: "Sara Ahmed",
    course: "Algorithms & Design",
    replies: 18,
    lastActivity: "1 hour ago",
    category: "Exam",
    pinned: false,
  },
  {
    id: 4,
    title: "Business Analytics project ideas",
    description:
      "Let's share some project ideas that could work well for the final project.",
    author: "Ali Raza",
    course: "Business Analytics",
    replies: 15,
    lastActivity: "2 hours ago",
    category: "Discussion",
    pinned: false,
  },
  {
    id: 5,
    title: "Physics II - Lab Report Help",
    description:
      "Does anyone know how we should structure the conclusion section of the lab report?",
    author: "Maham Noor",
    course: "Physics II",
    replies: 6,
    lastActivity: "Yesterday",
    category: "Help",
    pinned: false,
  },
];

const courses = [
  "All Courses",
  "Algorithms & Design",
  "Data Science 101",
  "Business Analytics",
  "Physics II",
];

export default function StudentDiscussionsPage() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] =
    useState("All Courses");

  const filteredDiscussions = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return discussions.filter((discussion) => {
      const matchesSearch =
        discussion.title.toLowerCase().includes(searchValue) ||
        discussion.description.toLowerCase().includes(searchValue) ||
        discussion.author.toLowerCase().includes(searchValue);

      const matchesCourse =
        selectedCourse === "All Courses" ||
        discussion.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });
  }, [search, selectedCourse]);

  return (
    <div className="min-h-screen bg-[#fbfcfc]">
      {/* ===================================================== */}
      {/* SIDEBAR */}
      {/* ===================================================== */}

      <Sidebar active="Discussions" />

      {/* ===================================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================================== */}

      <div className="ml-[240px] min-h-screen">
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <header className="border-b border-[#edf0f1] bg-white px-8 py-6">
          <div className="flex items-center justify-between gap-6">
            {/* Header Left */}
            <div>
              <div className="flex items-center gap-2">
                <MessageCircle
                  size={14}
                  className="text-[#00999d]"
                />

                <span className="text-[11px] font-medium text-[#00999d]">
                  Community
                </span>
              </div>

              <h1 className="mt-2 text-[25px] font-semibold tracking-tight text-[#172636]">
                Course Discussions
              </h1>

              <p className="mt-1 text-[11px] text-[#8b969c]">
                Ask questions, share ideas, and learn together
                with your classmates.
              </p>
            </div>

            {/* ================================================= */}
            {/* NEW DISCUSSION BUTTON */}
            {/* ================================================= */}

            <Link
              href="/student/discussions/new"
              className="flex shrink-0 items-center gap-2 rounded-md bg-[#008f94] px-5 py-3 text-[10px] font-semibold text-white transition hover:bg-[#007b80] active:scale-[0.98]"
            >
              <Plus size={14} strokeWidth={2} />
              New Discussion
            </Link>
          </div>
        </header>

        {/* ===================================================== */}
        {/* MAIN */}
        {/* ===================================================== */}

        <main className="p-8">
          {/* ================================================= */}
          {/* STATS */}
          {/* ================================================= */}

          <div className="grid grid-cols-3 gap-4">
            {/* Total Discussions */}
            <div className="rounded-xl border border-[#e7ebed] bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7f7]">
                  <MessageCircle
                    size={18}
                    className="text-[#00999d]"
                  />
                </div>

                <div>
                  <p className="text-[9px] text-[#8b969c]">
                    Total Discussions
                  </p>

                  <p className="mt-1 text-[20px] font-semibold text-[#172636]">
                    24
                  </p>
                </div>
              </div>
            </div>

            {/* Active Courses */}
            <div className="rounded-xl border border-[#e7ebed] bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7f7]">
                  <BookOpen
                    size={18}
                    className="text-[#00999d]"
                  />
                </div>

                <div>
                  <p className="text-[9px] text-[#8b969c]">
                    Active Courses
                  </p>

                  <p className="mt-1 text-[20px] font-semibold text-[#172636]">
                    5
                  </p>
                </div>
              </div>
            </div>

            {/* Community Members */}
            <div className="rounded-xl border border-[#e7ebed] bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7f7]">
                  <Users
                    size={18}
                    className="text-[#00999d]"
                  />
                </div>

                <div>
                  <p className="text-[9px] text-[#8b969c]">
                    Community Members
                  </p>

                  <p className="mt-1 text-[20px] font-semibold text-[#172636]">
                    86
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* SEARCH + FILTER */}
          {/* ================================================= */}

          <div className="mt-6 flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa5aa]"
              />

              <input
                type="text"
                placeholder="Search discussions..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-[#dfe5e7] bg-white pl-11 pr-4 text-[11px] text-[#172636] outline-none transition placeholder:text-[#a0aaae] focus:border-[#00999d] focus:ring-2 focus:ring-[#00999d]/10"
              />
            </div>

            {/* Course Filter */}
            <div className="relative">
              <Filter
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8b969c]"
              />

              <select
                value={selectedCourse}
                onChange={(event) =>
                  setSelectedCourse(event.target.value)
                }
                className="h-11 min-w-[190px] appearance-none rounded-lg border border-[#dfe5e7] bg-white pl-9 pr-8 text-[10px] text-[#172636] outline-none focus:border-[#00999d]"
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ================================================= */}
          {/* DISCUSSIONS */}
          {/* ================================================= */}

          <section className="mt-7">
            {/* Section Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[13px] font-semibold text-[#172636]">
                Recent Discussions
              </h2>

              <span className="text-[9px] text-[#8b969c]">
                {filteredDiscussions.length} discussions
              </span>
            </div>

            {/* Discussion Cards */}
            <div className="space-y-3">
              {filteredDiscussions.length > 0 ? (
                filteredDiscussions.map((discussion) => (
                  <Link
                    key={discussion.id}
                    href={`/student/discussions/${discussion.id}`}
                    className="group block rounded-xl border border-[#e5e9ea] bg-white p-5 transition hover:-translate-y-[1px] hover:border-[#b8dfe0] hover:shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf7f7]">
                        <MessageCircle
                          size={18}
                          className="text-[#00999d]"
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {discussion.pinned && (
                                <Pin
                                  size={11}
                                  className="shrink-0 text-[#00999d]"
                                />
                              )}

                              <h3 className="truncate text-[13px] font-semibold text-[#172636] transition group-hover:text-[#00999d]">
                                {discussion.title}
                              </h3>
                            </div>

                            <p className="mt-1 line-clamp-2 text-[10px] leading-5 text-[#7d898f]">
                              {discussion.description}
                            </p>
                          </div>

                          <ChevronRight
                            size={17}
                            className="mt-1 shrink-0 text-[#aab4b8] transition group-hover:translate-x-1 group-hover:text-[#00999d]"
                          />
                        </div>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[#eaf7f7] px-2.5 py-1 text-[8px] font-medium text-[#008f94]">
                            {discussion.course}
                          </span>

                          <span className="rounded-full bg-[#f2f4f5] px-2.5 py-1 text-[8px] text-[#69777f]">
                            {discussion.category}
                          </span>

                          <span className="text-[8px] text-[#8b969c]">
                            By {discussion.author}
                          </span>

                          <span className="flex items-center gap-1 text-[8px] text-[#8b969c]">
                            <MessageCircle size={10} />
                            {discussion.replies} replies
                          </span>

                          <span className="flex items-center gap-1 text-[8px] text-[#8b969c]">
                            <Clock3 size={10} />
                            {discussion.lastActivity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                /* No Results */
                <div className="rounded-xl border border-dashed border-[#d9e1e3] bg-white py-16 text-center">
                  <MessageCircle
                    size={28}
                    className="mx-auto text-[#b5c1c5]"
                  />

                  <h3 className="mt-3 text-[13px] font-semibold text-[#172636]">
                    No discussions found
                  </h3>

                  <p className="mt-1 text-[10px] text-[#8b969c]">
                    Try changing your search or course filter.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}