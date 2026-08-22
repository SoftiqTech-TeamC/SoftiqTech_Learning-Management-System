"use client";

import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function CreateCoursePage() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      courseTitle,
      courseCode,
      description,
      category,
      duration,
      maxStudents,
      status,
    });

    alert("Course created successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Sidebar />

      <main className="ml-[240px]">
        {/* Header */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <Link
              href="/teacher/courses"
              className="rounded-lg border p-2 text-slate-500 transition hover:bg-slate-50"
            >
              <ArrowLeft size={19} />
            </Link>

            {/* Header Content */}
            <div>
              <p className="text-sm font-medium text-teal-600">
                Teaching Workspace
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                Create Course
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create a new course and add its basic information.
              </p>
            </div>
          </div>
        </header>

        {/* Form */}
        <section className="p-8">
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-4xl rounded-2xl border bg-white shadow-sm"
          >
            {/* Form Header */}
            <div className="border-b px-6 py-5">
              <h2 className="text-lg font-bold text-slate-900">
                Course Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the details for your new course.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6 p-6">
              {/* Course Title & Code */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course Title
                  </label>

                  <input
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="e.g. Computer Science 320"
                    required
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course Code
                  </label>

                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="e.g. CS-320"
                    required
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a short description about this course..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {/* Category & Duration */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="">Select category</option>
                    <option value="Computer Science">
                      Computer Science
                    </option>
                    <option value="Biology">Biology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Psychology">Psychology</option>
                    <option value="History">History</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Duration
                  </label>

                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 12 weeks"
                    required
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              {/* Students & Status */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Maximum Students
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(e.target.value)}
                    placeholder="e.g. 50"
                    required
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 border-t pt-6">
                <Link
                  href="/teacher/courses"
                  className="rounded-lg border px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-[#087f87] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b72]"
                >
                  <Save size={17} />
                  Create Course
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}