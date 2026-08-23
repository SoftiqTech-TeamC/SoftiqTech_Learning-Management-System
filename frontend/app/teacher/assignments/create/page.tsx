"use client";

import { useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";

type Course = {
  _id: string;
  title: string;
};

export default function CreateAssignmentPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [marks, setMarks] = useState("100");
  const [submissionType, setSubmissionType] =
    useState("File Upload");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] =
    useState(true);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error"
  >("success");

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  const fetchCourses = async () => {
    const token = getToken();

    if (!token) {
      setMessage("Please log in to continue.");
      setMessageType("error");
      setLoadingCourses(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to load courses.");
      }

      const data = await response.json();

      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Fetch courses error:", error);

      setMessage("Unable to load courses.");
      setMessageType("error");
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const getSubmissionType = () => {
    if (submissionType === "Text Submission") {
      return "text";
    }

    if (submissionType === "File + Text") {
      return "both";
    }

    return "file";
  };

  const handleSave = async (publish: boolean) => {
    setMessage("");

    if (!title.trim() || !course || !description.trim() || !dueDate) {
      setMessage(
        "Fill in all required fields before continuing."
      );
      setMessageType("error");
      return;
    }

    const token = getToken();

    if (!token) {
      setMessage("Your session has expired. Please log in again.");
      setMessageType("error");
      return;
    }

    const selectedCourse = courses.find(
      (item) => item._id === course
    );

    if (!selectedCourse) {
      setMessage("Please select a valid course.");
      setMessageType("error");
      return;
    }

    try {
      setSaving(true);

      let finalDueDate = dueDate;

      if (dueTime) {
        finalDueDate = `${dueDate}T${dueTime}`;
      }

      const payload = {
        courseId: course,
        title: title.trim(),
        description: description.trim(),
        instructions: instructions.trim(),
        dueDate: finalDueDate,
        totalMarks: Number(marks),
        submissionType: getSubmissionType(),
        isPublished: publish,
      };

      const response = await fetch(
        `${API_URL}/assignments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to create assignment."
        );
      }

      setMessage(
        publish
          ? "Assignment published successfully."
          : "Assignment saved as draft."
      );

      setMessageType("success");

      if (publish) {
        setTimeout(() => {
          window.location.href =
            "/teacher/assignments";
        }, 800);
      }
    } catch (error) {
      console.error("❌ Create assignment error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to create assignment."
      );

      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <header className="border-b border-slate-200 bg-white">
        <div className="px-6 py-6 lg:px-8">
          <Link
            href="/teacher/assignments"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#087F87] hover:underline"
          >
            <ArrowLeft size={16} />
            Assignments
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
              <FileText
                size={22}
                className="text-[#087F87]"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Create Assignment
              </h1>

              <p className="text-sm text-slate-500">
                Create an assignment and publish it to
                your students.
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
                messageType === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              <CheckCircle2 size={18} />
              {message}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="font-bold text-slate-900">
                  Assignment Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Provide the information students need
                  to complete this assignment.
                </p>
              </div>

              <div className="space-y-6 p-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Assignment Title
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    placeholder="e.g. Environmental Systems Analysis"
                    className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Course
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <BookOpen
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      value={course}
                      onChange={(e) =>
                        setCourse(e.target.value)
                      }
                      disabled={loadingCourses}
                      className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-[#087F87] disabled:bg-slate-50"
                    >
                      <option value="">
                        {loadingCourses
                          ? "Loading courses..."
                          : "Select a course"}
                      </option>

                      {courses.map((item) => (
                        <option
                          key={item._id}
                          value={item._id}
                        >
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    rows={5}
                    placeholder="Explain what students need to complete..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Instructions
                  </label>

                  <textarea
                    value={instructions}
                    onChange={(e) =>
                      setInstructions(e.target.value)
                    }
                    rows={5}
                    placeholder="Add detailed instructions, requirements, or grading criteria..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/10"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Due Date
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                          setDueDate(e.target.value)
                        }
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
                        onChange={(e) =>
                          setDueTime(e.target.value)
                        }
                        className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-[#087F87]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Total Marks
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={marks}
                      onChange={(e) =>
                        setMarks(e.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#087F87]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Submission Type
                    </label>

                    <select
                      value={submissionType}
                      onChange={(e) =>
                        setSubmissionType(
                          e.target.value
                        )
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#087F87]"
                    >
                      <option value="File Upload">
                        File Upload
                      </option>

                      <option value="Text Submission">
                        Text Submission
                      </option>

                      <option value="File + Text">
                        File + Text
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Save size={17} />
                  )}

                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#087F87] px-5 text-sm font-semibold text-white transition hover:bg-[#066B72] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Send size={17} />
                  )}

                  Publish Assignment
                </button>
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-bold text-slate-800">
                  Assignment Preview
                </h3>

                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#087F87]">
                    {courses.find(
                      (item) => item._id === course
                    )?.title || "Course"}
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
                      <li>
                        • Select the correct course.
                      </li>

                      <li>
                        • Set a clear deadline.
                      </li>

                      <li>
                        • Include enough instructions.
                      </li>

                      <li>
                        • Confirm the total marks.
                      </li>
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