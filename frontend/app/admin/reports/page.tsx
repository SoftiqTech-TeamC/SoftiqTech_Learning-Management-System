"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  FileBarChart,
  Download,
  Users,
  BookOpen,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";

const reports = [
  {
    title: "User Activity Report",
    description: "Overview of user registrations and platform activity.",
    icon: Users,
  },
  {
    title: "Course Performance Report",
    description: "Analyze enrollments, progress and completion rates.",
    icon: BookOpen,
  },
  {
    title: "Student Progress Report",
    description: "Review student learning progress and performance.",
    icon: GraduationCap,
  },
  {
    title: "Monthly Platform Report",
    description: "Complete overview of platform performance and activity.",
    icon: CalendarDays,
  },
];

export default function ReportsPage() {
  const [format, setFormat] = useState("PDF");

  const handleExport = (title: string) => {
    alert(`${title} will be exported as ${format}.`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
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
              <option>PDF</option>
              <option>CSV</option>
              <option>Excel</option>
            </select>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            {reports.map((report) => {
              const Icon = report.icon;

              return (
                <div
                  key={report.title}
                  className="rounded-2xl border bg-white p-6 shadow-sm"
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

                  <button
                    type="button"
                    onClick={() => handleExport(report.title)}
                    className="mt-6 flex items-center gap-2 rounded-lg bg-[#087f87] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#066b72]"
                  >
                    <Download size={17} />
                    Export {format}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
              <FileBarChart size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Custom reports
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Select the report type above to generate platform data.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}