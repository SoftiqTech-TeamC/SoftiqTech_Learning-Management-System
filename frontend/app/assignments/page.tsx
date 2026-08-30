"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
  Bell,
  ChevronDown,
  CalendarDays,
  BookOpen,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  X,
  Loader2,
} from "lucide-react";

type Assignment = {
  _id: string;
  title: string;
  description: string;
  instructions?: string;
  dueDate: string;
  totalMarks: number;
  submissionType?: "file" | "text" | "both";
  isPublished?: boolean;
  courseId?: {
    _id: string;
    title: string;
  } | null;
};

type Submission = {
  _id: string;
  assignmentId:
    | string
    | {
        _id: string;
        title?: string;
      };
  studentId?: string;
  fileUrl?: string;
  fileOriginalName?: string;
  fileSize?: number;
  textAnswer?: string;
  marksObtained?: number;
  feedback?: string;
  submittedAt: string;
  isGraded?: boolean;
};

type AssignmentRow = Assignment & {
  status: "pending" | "submitted" | "overdue";
  submission?: Submission;
};

export default function AssignmentsPage() {
  // ✅ HARDCODED URL - REPLACED process.env.NEXT_PUBLIC_API_URL
  const API_URL = "https://bashartc14-lms.hf.space/api";

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const [filter, setFilter] = useState<
    "all" | "pending" | "submitted"
  >("all");

  const [activeId, setActiveId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [pickedFile, setPickedFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

  const fetchAssignments = async () => {
    const token = getToken();

    if (!token) {
      setError("Please log in to view your assignments.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/assignments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to load assignments.");
      }

      const data = await response.json();

      setAssignments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Fetch assignments error:", err);
      setError("Unable to load assignments. Please try again.");
    }
  };

  const fetchMySubmissions = async () => {
    const token = getToken();

    if (!token) return;

    try {
      const response = await fetch(
        `${API_URL}/assignments/my/submissions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.warn(
          "Unable to fetch student submissions:",
          response.status
        );
        return;
      }

      const data = await response.json();

      setSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Fetch submissions error:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchAssignments(),
        fetchMySubmissions(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const getAssignmentIdFromSubmission = (
    submission: Submission
  ) => {
    if (typeof submission.assignmentId === "string") {
      return submission.assignmentId;
    }

    return submission.assignmentId?._id;
  };

  const rows: AssignmentRow[] = useMemo(() => {
    const now = Date.now();

    return assignments
      .filter((assignment) => assignment.isPublished !== false)
      .map((assignment) => {
        const submission = submissions.find(
          (item) =>
            getAssignmentIdFromSubmission(item) ===
            assignment._id
        );

        let status: "pending" | "submitted" | "overdue";

        if (submission) {
          status = "submitted";
        } else if (
          new Date(assignment.dueDate).getTime() < now
        ) {
          status = "overdue";
        } else {
          status = "pending";
        }

        return {
          ...assignment,
          status,
          submission,
        };
      });
  }, [assignments, submissions]);

  const filtered = rows.filter((assignment) => {
    if (filter === "pending") {
      return (
        assignment.status === "pending" ||
        assignment.status === "overdue"
      );
    }

    if (filter === "submitted") {
      return assignment.status === "submitted";
    }

    return true;
  });

  const pendingCount = rows.filter(
    (assignment) =>
      assignment.status === "pending" ||
      assignment.status === "overdue"
  ).length;

  const submittedCount = rows.filter(
    (assignment) => assignment.status === "submitted"
  ).length;

  function openPanel(id: string) {
    setActiveId(activeId === id ? null : id);
    setNote("");
    setPickedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function onFilePicked(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB.");
        e.target.value = "";
        return;
      }

      setPickedFile(file);
    }
  }

  async function confirmSubmit(
    assignment: AssignmentRow
  ) {
    const token = getToken();

    if (!token) {
      alert("Please log in again.");
      return;
    }

    const requiresFile =
      assignment.submissionType === "file" ||
      assignment.submissionType === "both" ||
      !assignment.submissionType;

    const requiresText =
      assignment.submissionType === "text" ||
      assignment.submissionType === "both";

    if (requiresFile && !pickedFile) {
      alert("Please select a file before submitting.");
      return;
    }

    if (requiresText && !note.trim()) {
      alert("Please enter your answer before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      if (pickedFile) {
        formData.append("file", pickedFile);
      }

      if (note.trim()) {
        formData.append("textAnswer", note.trim());
      }

      const response = await fetch(
        `${API_URL}/assignments/${assignment._id}/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to submit assignment."
        );
      }

      alert("Assignment submitted successfully.");

      setActiveId(null);
      setNote("");
      setPickedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await fetchMySubmissions();
    } catch (err) {
      console.error("❌ Submit assignment error:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Unable to submit assignment."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function formatDueDate(date: string) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatSubmittedDate(date: string) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      <aside className="fixed left-0 top-0 z-30 h-screen w-[250px]">
        <Sidebar active="Assignments" />
      </aside>

      <div className="ml-[250px] flex-1 min-w-0">
        <div className="sticky top-0 z-20 flex h-[80px] items-center justify-between border-b border-gray-200 bg-white px-6">
          <div>
            <h1 className="text-[36px] font-bold text-[#172636]">
              Assignments
            </h1>

            <div className="mt-1 h-[4px] w-12 rounded bg-[#08a7aa]" />
          </div>

          <div className="flex items-center gap-6">
            <Bell className="text-gray-600" size={21} />
            <ChevronDown className="text-gray-600" size={20} />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 px-6">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf8f8]">
              <Clock size={16} className="text-[#00999d]" />
            </div>

            <div>
              <p className="text-[16px] font-semibold text-[#172636]">
                {pendingCount}
              </p>

              <p className="text-[11px] text-[#8b969c]">
                Pending
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf8f8]">
              <CheckCircle2
                size={16}
                className="text-[#00999d]"
              />
            </div>

            <div>
              <p className="text-[16px] font-semibold text-[#172636]">
                {submittedCount}
              </p>

              <p className="text-[11px] text-[#8b969c]">
                Submitted
              </p>
            </div>
          </div>

          <div className="ml-auto flex overflow-hidden rounded-xl border border-gray-200">
            {(["all", "pending", "submitted"] as const).map(
              (key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={
                    filter === key
                      ? "bg-[#08a7aa] px-5 py-2.5 text-[13px] font-medium capitalize text-white"
                      : "bg-white px-5 py-2.5 text-[13px] font-medium capitalize text-gray-500 hover:bg-gray-50"
                  }
                >
                  {key}
                </button>
              )
            )}
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <main className="mt-6 space-y-4 px-6 pb-12">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2
                size={30}
                className="animate-spin text-[#08a7aa]"
              />
            </div>
          ) : (
            <>
              {filtered.map((assignment, index) => (
                <div
                  key={assignment._id}
                  className="lm-fade-up rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
                  style={{
                    animationDelay: `${index * 60}ms`,
                  }}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="text-[18px] font-bold text-[#172636]">
                          {assignment.title}
                        </h3>

                        {assignment.status === "submitted" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f7f7] px-3 py-1 text-[11px] font-semibold text-[#00999d]">
                            <CheckCircle2 size={12} />
                            Submitted
                          </span>
                        )}

                        {assignment.status === "overdue" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-600">
                            <AlertTriangle size={12} />
                            Overdue
                          </span>
                        )}

                        {assignment.status === "pending" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-600">
                            <Clock size={12} />
                            Pending
                          </span>
                        )}
                      </div>

                      <p className="mb-3 text-sm text-gray-500">
                        {assignment.description}
                      </p>

                      {assignment.instructions && (
                        <p className="mb-3 text-sm text-gray-500">
                          <span className="font-semibold text-[#172636]">
                            Instructions:
                          </span>{" "}
                          {assignment.instructions}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-5 text-[13px] text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <BookOpen
                            size={15}
                            className="text-[#08a7aa]"
                          />
                          {assignment.courseId?.title ||
                            "Course"}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <CalendarDays
                            size={15}
                            className="text-[#08a7aa]"
                          />
                          Due{" "}
                          {formatDueDate(
                            assignment.dueDate
                          )}
                        </span>

                        <span>
                          {assignment.totalMarks} marks
                        </span>
                      </div>

                      {assignment.status === "submitted" &&
                        assignment.submission && (
                          <div className="mt-3 rounded-lg border border-gray-200 bg-[#F7F9FC] px-3 py-2">
                            <div className="flex items-center gap-2 text-[13px] text-[#172636]">
                              <FileText
                                size={15}
                                className="text-[#08a7aa]"
                              />

                              <span className="font-medium">
                                {assignment.submission
                                  .fileOriginalName ||
                                  "Text submission"}
                              </span>

                              <span className="text-gray-400">
                                ·{" "}
                                {formatSubmittedDate(
                                  assignment
                                    .submission
                                    .submittedAt
                                )}
                              </span>
                            </div>

                            {assignment.submission
                              .isGraded && (
                              <p className="mt-1 text-xs text-gray-500">
                                Marks:{" "}
                                {
                                  assignment.submission
                                    .marksObtained
                                }{" "}
                                / {assignment.totalMarks}
                              </p>
                            )}

                            {assignment.submission
                              .feedback && (
                              <p className="mt-1 text-xs text-gray-500">
                                Feedback:{" "}
                                {
                                  assignment.submission
                                    .feedback
                                }
                              </p>
                            )}
                          </div>
                        )}
                    </div>

                    <div className="flex shrink-0 gap-2">
                      {assignment.status === "submitted" ? (
                        <button
                          type="button"
                          disabled
                          className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-400"
                        >
                          <CheckCircle2 size={16} />
                          Submitted
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            openPanel(assignment._id)
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-[#08a7aa] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#068d90]"
                        >
                          <Upload size={16} />

                          {activeId === assignment._id
                            ? "Cancel"
                            : "Submit"}
                        </button>
                      )}
                    </div>
                  </div>

                  {activeId === assignment._id &&
                    assignment.status !== "submitted" && (
                      <div className="lm-scale-in mt-5 rounded-xl border border-gray-200 bg-[#F7F9FC] p-5">
                        {(assignment.submissionType ===
                          "file" ||
                          assignment.submissionType ===
                            "both" ||
                          !assignment.submissionType) && (
                          <>
                            <label className="mb-2 block text-sm font-semibold text-[#172636]">
                              Upload your file
                            </label>

                            <input
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              onChange={onFilePicked}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                fileInputRef.current?.click()
                              }
                              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#08a7aa]/40 bg-white py-6 text-sm font-medium text-[#08a7aa] transition hover:bg-[#08a7aa]/5"
                            >
                              <Upload size={18} />

                              {pickedFile
                                ? "Choose a different file"
                                : "Click to upload from your computer"}
                            </button>

                            {pickedFile && (
                              <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] text-[#172636]">
                                <FileText
                                  size={15}
                                  className="text-[#08a7aa]"
                                />

                                <span className="font-medium">
                                  {pickedFile.name}
                                </span>

                                <span className="text-gray-400">
                                  ·{" "}
                                  {(
                                    pickedFile.size /
                                    1024 /
                                    1024
                                  ).toFixed(2)}{" "}
                                  MB
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        {(assignment.submissionType ===
                          "text" ||
                          assignment.submissionType ===
                            "both") && (
                          <>
                            <label className="mb-2 mt-4 block text-sm font-semibold text-[#172636]">
                              Your Answer
                            </label>

                            <textarea
                              value={note}
                              onChange={(e) =>
                                setNote(e.target.value)
                              }
                              placeholder="Enter your answer..."
                              className="mb-3 h-28 w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm text-[#172636] outline-none transition focus:border-[#08a7aa] focus:ring-2 focus:ring-[#08a7aa]/20"
                            />
                          </>
                        )}

                        <div className="mt-4 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              confirmSubmit(assignment)
                            }
                            disabled={submitting}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#08a7aa] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#068d90] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {submitting && (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            )}

                            {submitting
                              ? "Submitting..."
                              : "Turn in"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openPanel(assignment._id)
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-[#172636] hover:bg-gray-50"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              ))}

              {filtered.length === 0 && (
                <p className="py-10 text-center text-sm text-gray-500">
                  No assignments in this filter.
                </p>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}