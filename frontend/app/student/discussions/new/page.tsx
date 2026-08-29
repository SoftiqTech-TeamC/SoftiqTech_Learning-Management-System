"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  BookOpen,
  Send,
  FileText,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";

const courses = [
  "Algorithms & Design",
  "Data Science 101",
  "Business Analytics",
  "Physics II",
];

const categories = [
  "Question",
  "Discussion",
  "Assignment",
  "Exam",
  "Help",
];

export default function NewDiscussionPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim() || !course || !category || !description.trim()) {
      return;
    }

    setLoading(true);

    // Static/demo submission for now
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setLoading(false);

    // Go back to discussions after creating
    router.push("/student/discussions");
  };

  return (
    <div className="min-h-screen bg-[#fbfcfc]">
      {/* Sidebar */}
      <Sidebar active="Discussions" />

      {/* Main Content */}
      <div className="ml-[240px] min-h-screen">
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <header className="border-b border-[#edf0f1] bg-white px-8 py-6">
          <Link
            href="/student/discussions"
            className="inline-flex items-center gap-1 text-[9px] font-medium text-[#00999d] transition hover:text-[#007b80]"
          >
            <ArrowLeft size={12} />
            Back to Discussions
          </Link>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <MessageCircle
                  size={14}
                  className="text-[#00999d]"
                />

                <span className="text-[10px] font-medium text-[#00999d]">
                  Community
                </span>
              </div>

              <h1 className="mt-2 text-[25px] font-semibold tracking-tight text-[#172636]">
                Start a New Discussion
              </h1>

              <p className="mt-1 text-[11px] text-[#8b969c]">
                Ask a question, share an idea, or start a conversation
                with your classmates.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf7f7]">
              <MessageCircle
                size={21}
                className="text-[#00999d]"
              />
            </div>
          </div>
        </header>

        {/* ===================================================== */}
        {/* MAIN */}
        {/* ===================================================== */}

        <main className="p-8">
          <div className="max-w-[900px]">
            {/* Form Card */}
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-[#e5e9ea] bg-white"
            >
              {/* Card Header */}
              <div className="border-b border-[#edf0f1] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7f7]">
                    <FileText
                      size={18}
                      className="text-[#00999d]"
                    />
                  </div>

                  <div>
                    <h2 className="text-[13px] font-semibold text-[#172636]">
                      Discussion Details
                    </h2>

                    <p className="mt-1 text-[9px] text-[#8b969c]">
                      Provide some information about your discussion.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="space-y-6 p-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-[9px] font-semibold text-[#172636]"
                  >
                    Discussion Title
                    <span className="ml-1 text-[#00999d]">
                      *
                    </span>
                  </label>

                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                      setTitle(event.target.value)
                    }
                    placeholder="e.g. How does Binary Search work?"
                    className="h-11 w-full rounded-lg border border-[#dce4e5] bg-white px-4 text-[10px] text-[#172636] outline-none transition placeholder:text-[#a4adb1] focus:border-[#00999d] focus:ring-2 focus:ring-[#00999d]/10"
                  />

                  <p className="mt-1.5 text-[8px] text-[#9aa5aa]">
                    Keep your title short and clear.
                  </p>
                </div>

                {/* Course + Category */}
                <div className="grid grid-cols-2 gap-5">
                  {/* Course */}
                  <div>
                    <label
                      htmlFor="course"
                      className="mb-2 block text-[9px] font-semibold text-[#172636]"
                    >
                      Course
                      <span className="ml-1 text-[#00999d]">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <BookOpen
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8b969c]"
                      />

                      <select
                        id="course"
                        value={course}
                        onChange={(event) =>
                          setCourse(event.target.value)
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-[#dce4e5] bg-white pl-9 pr-4 text-[10px] text-[#172636] outline-none transition focus:border-[#00999d] focus:ring-2 focus:ring-[#00999d]/10"
                      >
                        <option value="">
                          Select a course
                        </option>

                        {courses.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-[9px] font-semibold text-[#172636]"
                    >
                      Category
                      <span className="ml-1 text-[#00999d]">
                        *
                      </span>
                    </label>

                    <select
                      id="category"
                      value={category}
                      onChange={(event) =>
                        setCategory(event.target.value)
                      }
                      className="h-11 w-full rounded-lg border border-[#dce4e5] bg-white px-4 text-[10px] text-[#172636] outline-none transition focus:border-[#00999d] focus:ring-2 focus:ring-[#00999d]/10"
                    >
                      <option value="">
                        Select category
                      </option>

                      {categories.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-[9px] font-semibold text-[#172636]"
                  >
                    Discussion Details
                    <span className="ml-1 text-[#00999d]">
                      *
                    </span>
                  </label>

                  <textarea
                    id="description"
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    placeholder="Explain your question or topic in detail..."
                    rows={9}
                    className="w-full resize-none rounded-lg border border-[#dce4e5] bg-white px-4 py-3 text-[10px] leading-5 text-[#172636] outline-none transition placeholder:text-[#a4adb1] focus:border-[#00999d] focus:ring-2 focus:ring-[#00999d]/10"
                  />

                  <div className="mt-1.5 flex justify-between">
                    <p className="text-[8px] text-[#9aa5aa]">
                      Provide enough details so other students can
                      understand and respond.
                    </p>

                    <span className="text-[8px] text-[#9aa5aa]">
                      {description.length}/1000
                    </span>
                  </div>
                </div>

                {/* Guidelines */}
                <div className="rounded-lg bg-[#f5fbfb] p-4">
                  <div className="flex items-start gap-3">
                    <MessageCircle
                      size={15}
                      className="mt-0.5 shrink-0 text-[#00999d]"
                    />

                    <div>
                      <p className="text-[9px] font-semibold text-[#172636]">
                        Discussion Guidelines
                      </p>

                      <ul className="mt-2 space-y-1 text-[8px] leading-4 text-[#718087]">
                        <li>
                          • Keep your discussion relevant to the selected
                          course.
                        </li>

                        <li>
                          • Be respectful and helpful to other students.
                        </li>

                        <li>
                          • Search existing discussions before posting a
                          duplicate question.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-[#edf0f1] px-6 py-5">
                <Link
                  href="/student/discussions"
                  className="rounded-md border border-[#dce5e6] px-5 py-2.5 text-[8px] font-semibold text-[#69777f] transition hover:bg-[#f6f9f9]"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !title.trim() ||
                    !course ||
                    !category ||
                    !description.trim()
                  }
                  className="flex items-center gap-2 rounded-md bg-[#008f94] px-6 py-2.5 text-[8px] font-semibold text-white transition hover:bg-[#007b80] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send size={13} />

                  {loading
                    ? "Publishing..."
                    : "Publish Discussion"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}