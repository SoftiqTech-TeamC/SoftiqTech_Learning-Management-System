"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import Link from "next/link";
import {
  FileBarChart,
  Download,
  Users,
  BookOpen,
  GraduationCap,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const reports = [
  {
    id: "user-activity",
    title: "User Activity Report",
    description: "Overview of user registrations and platform activity.",
    icon: Users,
  },
  {
    id: "course-performance",
    title: "Course Performance Report",
    description: "Analyze enrollments, progress and completion rates.",
    icon: BookOpen,
  },
  {
    id: "student-progress",
    title: "Student Progress Report",
    description: "Review student learning progress and performance.",
    icon: GraduationCap,
  },
  {
    id: "monthly-platform",
    title: "Monthly Platform Report",
    description: "Complete overview of platform performance and activity.",
    icon: CalendarDays,
  },
];

export default function ReportsPage() {
  const [format, setFormat] = useState("PDF");

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Reporting Center
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Export Reports
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Generate and export important platform reports.
          </p>
        </header>

        <div className="p-8">
          {/* REPORT SETTINGS */}
          <section className="mb-6 flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">
                Report Settings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select your preferred export format.
              </p>
            </div>

            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:border-[#087f87]"
            >
              <option value="PDF">PDF</option>
              <option value="CSV">CSV</option>
              <option value="Excel">Excel</option>
            </select>
          </section>

          {/* REPORT CARDS */}
          <div className="grid gap-6 md:grid-cols-2">
            {reports.map((report) => {
              const Icon = report.icon;

              return (
                <div
                  key={report.id}
                  className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                    <Icon size={22} />
                  </div>

                  <h2 className="mt-5 font-bold text-slate-900">
                    {report.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {report.description}
                  </p>

                  {/* CLICKABLE LINK */}
                  <Link
                    href={`/admin/reports/${report.id}?format=${format}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#087f87] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b72]"
                  >
                    <Download size={17} />
                    Export {format}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* CUSTOM REPORT */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
              <FileBarChart size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Custom Reports
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Select a report above to view and export platform data.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}