"use client";

import { useState, useRef, useMemo } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { ASSIGNMENTS_SEED } from "@/lib/learningData";
import { useLearning } from "@/lib/learningStore";
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
} from "lucide-react";

export default function AssignmentsPage() {
  const { assignments, submitAssignment, unsubmitAssignment } = useLearning();
  const [filter, setFilter] = useState<"all" | "pending" | "submitted">("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [pickedFile, setPickedFile] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Capture "now" once (lazy state) so the render stays pure.
  const [now] = useState(() => Date.now());

  const rows = useMemo(() => {
    return ASSIGNMENTS_SEED.map((a) => {
      let status: "pending" | "submitted" | "overdue";
      if (assignments[a.id]?.status === "submitted") {
        status = "submitted";
      } else {
        status = new Date(a.dueDate).getTime() < now ? "overdue" : "pending";
      }
      return { ...a, status, submission: assignments[a.id] };
    });
  }, [assignments, now]);

  const filtered = rows.filter((a) => {
    if (filter === "pending") return a.status === "pending" || a.status === "overdue";
    if (filter === "submitted") return a.status === "submitted";
    return true;
  });

  const pendingCount = rows.filter(
    (a) => a.status === "pending" || a.status === "overdue"
  ).length;
  const submittedCount = rows.filter((a) => a.status === "submitted").length;

  function openPanel(id: string) {
    setActiveId(activeId === id ? null : id);
    setNote("");
    setPickedFile("");
  }

  function onFilePicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPickedFile(file.name);
  }

  function confirmSubmit(id: string) {
    if (!pickedFile) return;
    submitAssignment(id, pickedFile, note);
    setActiveId(null);
    setNote("");
    setPickedFile("");
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">
      {/* Fixed sidebar — stays still on scroll */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-[250px]">
        <Sidebar active="Assignments" />
      </aside>

      <div className="ml-[250px] flex-1 min-w-0">
        <div className="sticky top-0 z-20 flex h-[80px] items-center justify-between border-b border-gray-200 bg-white px-6">
          <div>
            <h1 className="text-[36px] font-bold text-[#172636]">Assignments</h1>
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
              <p className="text-[16px] font-semibold text-[#172636]">{pendingCount}</p>
              <p className="text-[11px] text-[#8b969c]">Pending</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#edf8f8]">
              <CheckCircle2 size={16} className="text-[#00999d]" />
            </div>
            <div>
              <p className="text-[16px] font-semibold text-[#172636]">{submittedCount}</p>
              <p className="text-[11px] text-[#8b969c]">Submitted</p>
            </div>
          </div>

          <div className="ml-auto flex overflow-hidden rounded-xl border border-gray-200">
            {(["all", "pending", "submitted"] as const).map((key) => (
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
            ))}
          </div>
        </div>

        <main className="mt-6 space-y-4 px-6 pb-12">
          {filtered.map((a, index) => (
            <div
              key={a.id}
              className="lm-fade-up rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-[18px] font-bold text-[#172636]">{a.title}</h3>
                    {a.status === "submitted" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f7f7] px-3 py-1 text-[11px] font-semibold text-[#00999d]">
                        <CheckCircle2 size={12} /> Submitted
                      </span>
                    )}
                    {a.status === "overdue" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-600">
                        <AlertTriangle size={12} /> Overdue
                      </span>
                    )}
                    {a.status === "pending" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-600">
                        <Clock size={12} /> Pending
                      </span>
                    )}
                  </div>
                  <p className="mb-3 text-sm text-gray-500">{a.description}</p>
                  <div className="flex flex-wrap items-center gap-5 text-[13px] text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={15} className="text-[#08a7aa]" />
                      {a.courseTitle}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={15} className="text-[#08a7aa]" />
                      Due {a.dueDate}
                    </span>
                  </div>

                  {/* Submitted file chip */}
                  {a.status === "submitted" && a.submission && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 bg-[#F7F9FC] px-3 py-2 text-[13px] text-[#172636]">
                      <FileText size={15} className="text-[#08a7aa]" />
                      <span className="font-medium">{a.submission.fileName}</span>
                      <span className="text-gray-400">· {a.submission.submittedDate}</span>
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
                  {a.status === "submitted" ? (
                    <button
                      onClick={() => unsubmitAssignment(a.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-[#172636] transition hover:bg-gray-50"
                    >
                      <X size={16} /> Unsubmit
                    </button>
                  ) : (
                    <button
                      onClick={() => openPanel(a.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#08a7aa] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#068d90]"
                    >
                      <Upload size={16} />
                      {activeId === a.id ? "Cancel" : "Submit"}
                    </button>
                  )}
                </div>
              </div>

              {/* Upload panel */}
              {activeId === a.id && a.status !== "submitted" && (
                <div className="lm-scale-in mt-5 rounded-xl border border-gray-200 bg-[#F7F9FC] p-5">
                  <label className="mb-2 block text-sm font-semibold text-[#172636]">
                    Upload your file
                  </label>

                  {/* Hidden real file input + styled dropzone button */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={onFilePicked}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#08a7aa]/40 bg-white py-6 text-sm font-medium text-[#08a7aa] transition hover:bg-[#08a7aa]/5"
                  >
                    <Upload size={18} />
                    {pickedFile ? "Choose a different file" : "Click to upload from your computer"}
                  </button>

                  {pickedFile && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] text-[#172636]">
                      <FileText size={15} className="text-[#08a7aa]" />
                      <span className="font-medium">{pickedFile}</span>
                    </div>
                  )}

                  <label className="mb-2 mt-4 block text-sm font-semibold text-[#172636]">
                    Note (optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note for your teacher..."
                    className="mb-3 h-20 w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm text-[#172636] outline-none transition focus:border-[#08a7aa] focus:ring-2 focus:ring-[#08a7aa]/20"
                  />

                  <button
                    onClick={() => confirmSubmit(a.id)}
                    disabled={!pickedFile}
                    className="rounded-xl bg-[#08a7aa] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#068d90] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Turn in
                  </button>
                  {!pickedFile && (
                    <span className="ml-3 text-xs text-gray-400">
                      Select a file to enable Turn in.
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-gray-500">No assignments in this filter.</p>
          )}
        </main>
      </div>
    </div>
  );
}
