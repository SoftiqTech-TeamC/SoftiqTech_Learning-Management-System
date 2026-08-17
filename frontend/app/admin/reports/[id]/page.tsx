"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Users,
  BookOpen,
  GraduationCap,
  CalendarDays,
  FileText,
  CheckCircle2,
} from "lucide-react";

const reportData = {
  "user-activity": {
    title: "User Activity Report",
    description:
      "Detailed overview of user registrations, activity and platform engagement.",
    icon: Users,
    stats: [
      { label: "Total Users", value: "2,486" },
      { label: "New Users", value: "128" },
      { label: "Active Users", value: "2,372" },
    ],
  },

  "course-performance": {
    title: "Course Performance Report",
    description:
      "Detailed analysis of course enrollments, progress and completion rates.",
    icon: BookOpen,
    stats: [
      { label: "Active Courses", value: "86" },
      { label: "Total Enrollments", value: "4,820" },
      { label: "Completion Rate", value: "78%" },
    ],
  },

  "student-progress": {
    title: "Student Progress Report",
    description:
      "Review student learning progress, performance and course completion.",
    icon: GraduationCap,
    stats: [
      { label: "Total Students", value: "2,184" },
      { label: "Average Progress", value: "76%" },
      { label: "Completed Courses", value: "1,624" },
    ],
  },

  "monthly-platform": {
    title: "Monthly Platform Report",
    description:
      "Complete monthly overview of platform performance and user activity.",
    icon: CalendarDays,
    stats: [
      { label: "Monthly Users", value: "2,486" },
      { label: "Platform Activity", value: "94.8%" },
      { label: "New Courses", value: "12" },
    ],
  },
};

export default function ReportPreviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id as string;
  const format = searchParams.get("format") || "PDF";

  const report =
    reportData[id as keyof typeof reportData];

  if (!report) {
    return (
      <div className="min-h-screen bg-[#f7f9fc]">
        <AdminSidebar />

        <main className="ml-[240px] flex min-h-screen items-center justify-center">
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">
              Report not found
            </h1>

            <Link
              href="/admin/reports"
              className="mt-4 inline-block text-sm font-semibold text-[#087f87]"
            >
              Back to Reports
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const Icon = report.icon;

  const handleDownload = () => {
    alert(`${report.title} downloaded as ${format}.`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/reports"
                className="flex h-10 w-10 items-center justify-center rounded-lg border text-slate-500 transition hover:bg-slate-50"
              >
                <ArrowLeft size={18} />
              </Link>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
                  Report Preview
                </p>

                <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                  {report.title}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Preview your report before downloading.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#087f87] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b72]"
            >
              <Download size={17} />
              Download {format}
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-6 p-8">
          {/* REPORT OVERVIEW */}
          <section className="rounded-2xl border bg-white p-7 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eaf7f7] text-[#087f87]">
                <Icon size={26} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {report.title}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  {report.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600">
                  <CheckCircle2 size={15} />
                  Report generated successfully
                </div>
              </div>
            </div>
          </section>

          {/* STATISTICS */}
          <section className="grid gap-5 md:grid-cols-3">
            {report.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#172636]">
                  {stat.value}
                </h2>
              </div>
            ))}
          </section>

          {/* REPORT CONTENT */}
          <section className="rounded-2xl border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b p-6">
              <div>
                <h2 className="font-bold text-slate-900">
                  Report Summary
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Overview of the generated platform data.
                </p>
              </div>

              <FileText
                size={21}
                className="text-[#087f87]"
              />
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-xl bg-[#f7f9fc] p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Performance Overview
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  The platform continues to show positive activity and
                  engagement. This report provides a structured overview of
                  the selected data, including key performance indicators and
                  recent activity.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs uppercase text-slate-500">
                      <th className="px-5 py-4">
                        Metric
                      </th>

                      <th className="px-5 py-4">
                        Current Value
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {report.stats.map((stat) => (
                      <tr key={stat.label}>
                        <td className="px-5 py-4 text-sm font-medium text-slate-800">
                          {stat.label}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {stat.value}
                        </td>

                        <td className="px-5 py-4">
                          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            Available
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end border-t p-5">
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-lg bg-[#087f87] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b72]"
              >
                <Download size={17} />
                Download {format}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}