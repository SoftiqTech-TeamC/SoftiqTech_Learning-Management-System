"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock3,
  FileText,
  Save,
  Send,
  CheckCircle2,
} from "lucide-react";

export default function CreateAssignmentPage() {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [marks, setMarks] = useState("100");
  const [submissionType, setSubmissionType] = useState("File Upload");

  const [message, setMessage] = useState("");

  const handleSave = (publish: boolean) => {
    if (!title || !course || !description || !dueDate) {
      setMessage("Fill in all required fields before continuing.");
      return;
    }

    setMessage(
      publish
        ? "Assignment published successfully."
        : "Assignment saved as draft."
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="px-6 py-6 lg:px-8">
          <Link
            href="/teacher"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#087F87] hover:underline"
          >
            <ArrowLeft size={16} />
            Teacher Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
              <FileText size={22} className="text-[#087F87]" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Create Assignment
              </h1>

              <p className="text-sm text-slate-500">
                Create an assignment and publish it to your students.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          {message && (
            <div
              className={`mb-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                message.includes("successfully")
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
              }`}
            >
              <CheckCircle2 size={18} />
              {message}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            {/* Main Form */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="font-bold text-slate-900">
                  Assignment Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Provide the information students need to complete this
                  assignment.
                </p>
              </div>

              <div className="space-y-6 p-6">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Assignment Title
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Environmental Systems Analysis"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/10"
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <BookOpen
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-[#087F87]"
                    >
                      <option value="">Select a course</option>
                      <option value="Environmental Science">
                        Environmental Science
                      </option>
                      <option value="Biology 201">
                        Biology 201
                      </option>
                      <option value="Computer Science 320">
                        Computer Science 320
                      </option>
                      <option value="Psychology 150">
                        Psychology 150
                      </option>
                      <option value="Mathematics 120">
                        Mathematics 120
                      </option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Explain what students need to complete..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/10"
                  />
                </div>

                {/* Instructions */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Instructions
                  </label>

                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={5}
                    placeholder="Add detailed instructions, requirements, or grading criteria..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/10"
                  />
                </div>

                {/* Dates */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Due Date
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-[#087F87]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Due Time
                    </label>

                    <div className="relative">
                      <Clock3
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="time"
                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-[#087F87]"
                      />
                    </div>
                  </div>
                </div>

                {/* Marks + Submission */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Total Marks
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#087F87]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Submission Type
                    </label>

                    <select
                      value={submissionType}
                      onChange={(e) => setSubmissionType(e.target.value)}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#087F87]"
                    >
                      <option>File Upload</option>
                      <option>Text Submission</option>
                      <option>File + Text</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  <Save size={17} />
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#087F87] px-5 text-sm font-semibold text-white transition hover:bg-[#066B72]"
                >
                  <Send size={17} />
                  Publish Assignment
                </button>
              </div>
            </section>

            {/* Preview / Sidebar */}
            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-800">
                  Assignment Preview
                </h3>

                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#087F87]">
                    {course || "Course"}
                  </p>

                  <h4 className="mt-2 text-lg font-bold text-slate-900">
                    {title || "Assignment title"}
                  </h4>

                  <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-500">
                    {description ||
                      "Your assignment description will appear here."}
                  </p>

                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">
                        Total Marks
                      </span>

                      <span className="font-semibold text-slate-800">
                        {marks || "0"}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between text-xs">
                      <span className="text-slate-500">
                        Submission
                      </span>

                      <span className="font-semibold text-slate-800">
                        {submissionType}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between text-xs">
                      <span className="text-slate-500">
                        Due
                      </span>

                      <span className="font-semibold text-slate-800">
                        {dueDate || "Not set"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    <FileText
                      size={17}
                      className="text-[#087F87]"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-teal-900">
                      Before publishing
                    </h3>

                    <ul className="mt-2 space-y-1.5 text-xs leading-5 text-teal-800">
                      <li>• Select the correct course.</li>
                      <li>• Set a clear deadline.</li>
                      <li>• Include enough instructions.</li>
                      <li>• Confirm the total marks.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}