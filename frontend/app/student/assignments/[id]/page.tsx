"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  BookOpen,
  ClipboardCheck,
  Paperclip,
  Circle,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";

/* ============================================================= */
/* TYPES */
/* ============================================================= */

type Assignment = {
  id: number;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  dueTime: string;
  status: "Pending" | "Submitted";
  instructions: string[];
  points: number;
};

/* ============================================================= */
/* STATIC ASSIGNMENT DATA */
/* ============================================================= */

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Data Science Project",
    course: "Data Science 101",
    description:
      "Complete the assigned data analysis project and submit your findings with proper explanations, data visualizations, and conclusions.",
    dueDate: "May 24, 2026",
    dueTime: "11:59 PM",
    status: "Pending",
    points: 100,
    instructions: [
      "Analyze the provided dataset using appropriate data analysis techniques.",
      "Clean and preprocess the data before performing the analysis.",
      "Create meaningful charts and visualizations to support your findings.",
      "Explain your methodology and summarize the key insights.",
      "Submit your final report as a PDF or DOC/DOCX file.",
    ],
  },

  {
    id: 2,
    title: "Sorting Algorithms",
    course: "Algorithms & Design",
    description:
      "Implement and explain different sorting algorithms and provide a detailed time complexity analysis for each algorithm.",
    dueDate: "May 27, 2026",
    dueTime: "11:59 PM",
    status: "Pending",
    points: 80,
    instructions: [
      "Implement at least three different sorting algorithms.",
      "Explain how each algorithm works.",
      "Provide the time and space complexity of each algorithm.",
      "Compare the performance of the selected algorithms.",
      "Submit your implementation along with your explanation.",
    ],
  },

  {
    id: 3,
    title: "Business Analysis Report",
    course: "Business Analytics",
    description:
      "Prepare a business analysis report based on the given case study and provide suitable recommendations.",
    dueDate: "May 30, 2026",
    dueTime: "11:59 PM",
    status: "Submitted",
    points: 100,
    instructions: [
      "Review and analyze the provided business case study.",
      "Identify the major business problems and opportunities.",
      "Support your analysis with relevant data.",
      "Provide practical recommendations.",
      "Submit a professionally formatted business report.",
    ],
  },
];

/* ============================================================= */
/* PAGE */
/* ============================================================= */

export default function AssignmentDetailsPage() {
  const params = useParams();

  const assignmentId = Number(params.id);

  const assignment = assignments.find(
    (item) => item.id === assignmentId
  );

  const [submissionText, setSubmissionText] = useState("");
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [submitted, setSubmitted] = useState(
    assignment?.status === "Submitted"
  );

  const [loading, setLoading] = useState(false);

  /* =========================================================== */
  /* ASSIGNMENT NOT FOUND */
  /* =========================================================== */

  if (!assignment) {
    return (
      <>
        <Sidebar active="Assignments" />

        <div className="ml-[240px] flex min-h-screen items-center justify-center bg-[#f7f9fa] px-6">
          <div className="max-w-md rounded-2xl border border-[#e5e9ea] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf8f8]">
              <ClipboardCheck
                size={25}
                className="text-[#00999d]"
              />
            </div>

            <h1 className="mt-5 text-xl font-semibold text-[#172636]">
              Assignment Not Found
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#849097]">
              The assignment you are looking for does not exist.
            </p>

            <Link
              href="/student/assignments"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#008f94] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#007b80]"
            >
              <ArrowLeft size={15} />
              Back to Assignments
            </Link>
          </div>
        </div>
      </>
    );
  }

  /* =========================================================== */
  /* FILE CHANGE */
  /* =========================================================== */

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      return;
    }

    setSelectedFile(file);
  };

  /* =========================================================== */
  /* SUBMIT */
  /* =========================================================== */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!submissionText.trim() && !selectedFile) {
      alert(
        "Please write your submission or attach a file before submitting."
      );
      return;
    }

    setLoading(true);

    // Static demo submission.
    // Backend API can be connected here later.
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setSubmitted(true);
    setLoading(false);
  };

  /* =========================================================== */
  /* MAIN PAGE */
  /* =========================================================== */

  return (
    <>
      <Sidebar active="Assignments" />

      <div className="ml-[240px] min-h-screen bg-[#f7f9fa]">
        {/* ===================================================== */}
        {/* TOP HEADER */}
        {/* ===================================================== */}

        <header className="border-b border-[#e8edef] bg-white">
          <div className="px-8 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[9px]">
              <Link
                href="/student"
                className="text-[#8b969c] transition hover:text-[#00999d]"
              >
                Dashboard
              </Link>

              <span className="text-[#c3cacc]">/</span>

              <Link
                href="/student/assignments"
                className="text-[#8b969c] transition hover:text-[#00999d]"
              >
                Assignments
              </Link>

              <span className="text-[#c3cacc]">/</span>

              <span className="font-medium text-[#172636]">
                {assignment.title}
              </span>
            </div>

            {/* Header Content */}
            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#e8f7f7] px-3 py-1 text-[8px] font-semibold text-[#008f94]">
                    {assignment.course}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-[8px] font-semibold ${
                      submitted
                        ? "bg-[#e8f7ef] text-[#218653]"
                        : "bg-[#fff5df] text-[#b87900]"
                    }`}
                  >
                    {submitted
                      ? "Submitted"
                      : "Pending"}
                  </span>
                </div>

                <h1 className="mt-3 text-[27px] font-semibold tracking-tight text-[#172636]">
                  {assignment.title}
                </h1>

                <p className="mt-2 max-w-[700px] text-[11px] leading-5 text-[#849097]">
                  View the assignment requirements, review
                  the instructions, and submit your work.
                </p>
              </div>

              <Link
                href="/student/assignments"
                className="hidden items-center gap-2 rounded-lg border border-[#dce5e6] bg-white px-4 py-2.5 text-[9px] font-semibold text-[#69777f] transition hover:bg-[#f6f9f9] sm:flex"
              >
                <ArrowLeft size={14} />
                Back
              </Link>
            </div>
          </div>
        </header>

        {/* ===================================================== */}
        {/* MAIN */}
        {/* ===================================================== */}

        <main className="p-8">
          <div className="mx-auto max-w-[1100px]">
            {/* ================================================= */}
            {/* INFORMATION CARDS */}
            {/* ================================================= */}

            <div className="grid grid-cols-3 gap-4">
              {/* Course */}
              <InfoCard
                icon={<BookOpen size={18} />}
                label="Course"
                value={assignment.course}
              />

              {/* Due Date */}
              <InfoCard
                icon={<CalendarDays size={18} />}
                label="Due Date"
                value={assignment.dueDate}
              />

              {/* Points */}
              <InfoCard
                icon={<ClipboardCheck size={18} />}
                label="Total Points"
                value={`${assignment.points} Points`}
              />
            </div>

            {/* ================================================= */}
            {/* CONTENT GRID */}
            {/* ================================================= */}

            <div className="mt-6 grid grid-cols-[1fr_340px] gap-6">
              {/* ================================================= */}
              {/* LEFT COLUMN */}
              {/* ================================================= */}

              <div className="space-y-6">
                {/* Assignment Overview */}
                <section className="rounded-2xl border border-[#e3e8e9] bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f7f7]">
                      <FileText
                        size={17}
                        className="text-[#00999d]"
                      />
                    </div>

                    <div>
                      <h2 className="text-[13px] font-semibold text-[#172636]">
                        Assignment Overview
                      </h2>

                      <p className="mt-0.5 text-[8px] text-[#9aa5aa]">
                        What you need to complete
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-[10px] leading-6 text-[#69777f]">
                    {assignment.description}
                  </p>
                </section>

                {/* Instructions */}
                <section className="rounded-2xl border border-[#e3e8e9] bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f7f7]">
                      <ClipboardCheck
                        size={17}
                        className="text-[#00999d]"
                      />
                    </div>

                    <div>
                      <h2 className="text-[13px] font-semibold text-[#172636]">
                        Instructions
                      </h2>

                      <p className="mt-0.5 text-[8px] text-[#9aa5aa]">
                        Follow these requirements
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {assignment.instructions.map(
                      (instruction, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#edf8f8]">
                            <span className="text-[8px] font-semibold text-[#00999d]">
                              {index + 1}
                            </span>
                          </div>

                          <p className="text-[9px] leading-5 text-[#69777f]">
                            {instruction}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </section>
              </div>

              {/* ================================================= */}
              {/* RIGHT COLUMN */}
              {/* ================================================= */}

              <div className="space-y-6">
                {/* Deadline Card */}
                <section className="rounded-2xl border border-[#e3e8e9] bg-white p-5">
                  <h2 className="text-[11px] font-semibold text-[#172636]">
                    Submission Deadline
                  </h2>

                  <div className="mt-4 rounded-xl bg-[#f5fbfb] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f7f7]">
                        <Clock3
                          size={18}
                          className="text-[#00999d]"
                        />
                      </div>

                      <div>
                        <p className="text-[8px] text-[#9aa5aa]">
                          Due
                        </p>

                        <p className="mt-1 text-[10px] font-semibold text-[#172636]">
                          {assignment.dueDate}
                        </p>

                        <p className="mt-0.5 text-[8px] text-[#849097]">
                          {assignment.dueTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#fffaf0] p-3">
                    <AlertCircle
                      size={13}
                      className="mt-0.5 shrink-0 text-[#b87900]"
                    />

                    <p className="text-[7px] leading-4 text-[#8d6a24]">
                      Make sure you submit your work before
                      the deadline.
                    </p>
                  </div>
                </section>

                {/* Submission Status */}
                <section className="rounded-2xl border border-[#e3e8e9] bg-white p-5">
                  <h2 className="text-[11px] font-semibold text-[#172636]">
                    Submission Status
                  </h2>

                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${
                        submitted
                          ? "bg-[#e8f7ef]"
                          : "bg-[#fff5df]"
                      }`}
                    >
                      {submitted ? (
                        <CheckCircle2
                          size={17}
                          className="text-[#218653]"
                        />
                      ) : (
                        <Circle
                          size={17}
                          className="text-[#b87900]"
                        />
                      )}
                    </div>

                    <div>
                      <p className="text-[9px] font-semibold text-[#172636]">
                        {submitted
                          ? "Assignment Submitted"
                          : "Not Submitted Yet"}
                      </p>

                      <p className="mt-0.5 text-[7px] text-[#9aa5aa]">
                        {submitted
                          ? "Your work has been submitted."
                          : "Complete your work and submit it below."}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* ================================================= */}
            {/* SUBMISSION SECTION */}
            {/* ================================================= */}

            {submitted ? (
              <SubmittedState
                submissionText={submissionText}
                selectedFile={selectedFile}
              />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-6 rounded-2xl border border-[#e3e8e9] bg-white p-6"
              >
                {/* Submission Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f7f7]">
                        <Upload
                          size={17}
                          className="text-[#00999d]"
                        />
                      </div>

                      <div>
                        <h2 className="text-[13px] font-semibold text-[#172636]">
                          Submit Your Work
                        </h2>

                        <p className="mt-0.5 text-[8px] text-[#9aa5aa]">
                          Upload your completed assignment
                        </p>
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#f3f6f6] px-3 py-1 text-[7px] font-medium text-[#849097]">
                    Required
                  </span>
                </div>

                {/* Text Submission */}
                <div className="mt-6">
                  <label
                    htmlFor="submission"
                    className="mb-2 block text-[9px] font-semibold text-[#172636]"
                  >
                    Your Submission
                  </label>

                  <textarea
                    id="submission"
                    value={submissionText}
                    onChange={(event) =>
                      setSubmissionText(
                        event.target.value
                      )
                    }
                    placeholder="Write your answer, explanation, or any additional notes here..."
                    rows={7}
                    className="w-full resize-none rounded-xl border border-[#dce4e5] bg-[#fcfdfd] px-4 py-3 text-[9px] leading-5 text-[#172636] outline-none transition placeholder:text-[#a4adb1] focus:border-[#00999d] focus:bg-white focus:ring-2 focus:ring-[#00999d]/10"
                  />

                  <p className="mt-1.5 text-[7px] text-[#9aa5aa]">
                    You can provide additional details about
                    your submitted work here.
                  </p>
                </div>

                {/* File Upload */}
                <div className="mt-6">
                  <label className="mb-2 block text-[9px] font-semibold text-[#172636]">
                    Assignment File
                  </label>

                  <label
                    htmlFor="assignment-file"
                    className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#b8dfe0] bg-[#f8fcfc] px-6 py-9 transition hover:border-[#00999d] hover:bg-[#f1fafa]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f7f7] transition group-hover:bg-[#dff3f3]">
                      <Upload
                        size={21}
                        className="text-[#00999d]"
                      />
                    </div>

                    <p className="mt-3 text-[9px] font-semibold text-[#172636]">
                      Click to upload your assignment
                    </p>

                    <p className="mt-1.5 text-[7px] text-[#9aa5aa]">
                      PDF, DOC, DOCX, PPT, PPTX or ZIP
                    </p>

                    <p className="mt-0.5 text-[7px] text-[#b0b8bb]">
                      Maximum file size: 10MB
                    </p>

                    <input
                      id="assignment-file"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                      onChange={handleFileChange}
                    />
                  </label>

                  {/* Selected File */}
                  {selectedFile && (
                    <div className="mt-3 flex items-center justify-between rounded-xl border border-[#dce5e6] bg-[#f9fbfb] p-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e8f7f7]">
                          <Paperclip
                            size={15}
                            className="text-[#00999d]"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[9px] font-semibold text-[#172636]">
                            {selectedFile.name}
                          </p>

                          <p className="mt-1 text-[7px] text-[#9aa5aa]">
                            {(
                              selectedFile.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFile(null)
                        }
                        className="rounded-full p-2 text-[#9aa5aa] transition hover:bg-white hover:text-red-500"
                        aria-label="Remove file"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Warning */}
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#f1dfb8] bg-[#fffaf0] p-4">
                  <AlertCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-[#b87900]"
                  />

                  <div>
                    <p className="text-[8px] font-semibold text-[#8d6a24]">
                      Before you submit
                    </p>

                    <p className="mt-1 text-[7px] leading-4 text-[#9b7a37]">
                      Please review your answer and make sure
                      the correct file is attached. Once
                      submitted, your assignment will be marked
                      as submitted.
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <Link
                    href="/student/assignments"
                    className="rounded-lg border border-[#dce5e6] px-5 py-2.5 text-[8px] font-semibold text-[#69777f] transition hover:bg-[#f6f9f9]"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#008f94] px-6 py-2.5 text-[8px] font-semibold text-white shadow-sm transition hover:bg-[#007b80] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload size={13} />
                        Submit Assignment
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

/* ============================================================= */
/* INFO CARD */
/* ============================================================= */

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#e3e8e9] bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8f7f7] text-[#00999d]">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[8px] text-[#9aa5aa]">
            {label}
          </p>

          <p className="mt-1 truncate text-[9px] font-semibold text-[#172636]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================= */
/* SUBMITTED STATE */
/* ============================================================= */

function SubmittedState({
  submissionText,
  selectedFile,
}: {
  submissionText: string;
  selectedFile: File | null;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-[#c9e8d5] bg-[#f1fbf5] p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dff3e7]">
          <CheckCircle2
            size={20}
            className="text-[#218653]"
          />
        </div>

        <div>
          <h2 className="text-[14px] font-semibold text-[#218653]">
            Assignment Submitted Successfully
          </h2>

          <p className="mt-1 text-[9px] leading-5 text-[#5e806d]">
            Your assignment has been submitted. You can review
            the information below.
          </p>
        </div>
      </div>

      {/* Submitted Content */}
      {(submissionText || selectedFile) && (
        <div className="mt-5 space-y-3">
          {submissionText && (
            <div className="rounded-xl border border-[#dcecdf] bg-white p-4">
              <p className="text-[8px] font-semibold text-[#172636]">
                Your Submission
              </p>

              <p className="mt-2 whitespace-pre-wrap text-[9px] leading-5 text-[#69777f]">
                {submissionText}
              </p>
            </div>
          )}

          {selectedFile && (
            <div className="flex items-center gap-3 rounded-xl border border-[#dcecdf] bg-white p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f7f7]">
                <FileText
                  size={15}
                  className="text-[#00999d]"
                />
              </div>

              <div>
                <p className="text-[8px] font-semibold text-[#172636]">
                  Attached File
                </p>

                <p className="mt-1 text-[8px] text-[#69777f]">
                  {selectedFile.name}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <Link
        href="/student/assignments"
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#cfe1d5] bg-white px-5 py-2.5 text-[8px] font-semibold text-[#69777f] transition hover:bg-[#f8fbf9]"
      >
        <ArrowLeft size={13} />
        Back to Assignments
      </Link>
    </section>
  );
}