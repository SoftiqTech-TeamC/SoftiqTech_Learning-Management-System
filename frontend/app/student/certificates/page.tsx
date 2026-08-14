"use client";

import Sidebar from "@/components/layout/Sidebar";
import {
  Award,
  Download,
  CalendarDays,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

const certificates = [
  {
    id: 1,
    course: "Computer Science 320",
    title: "Algorithms & Data Structures",
    completed: "Completed on August 02, 2026",
    instructor: "Dr. Sarah Johnson",
  },
  {
    id: 2,
    course: "Mathematics 120",
    title: "Fundamentals of Mathematics",
    completed: "Completed on July 18, 2026",
    instructor: "Prof. Michael Brown",
  },
  {
    id: 3,
    course: "Psychology 150",
    title: "Introduction to Psychology",
    completed: "Completed on June 30, 2026",
    instructor: "Dr. Emily Wilson",
  },
];

export default function StudentCertificatesPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Sidebar active="Certificates" />

      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <p className="text-sm font-medium text-[#087f87]">
            Your Achievements
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Certificates
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and download certificates for your completed courses.
          </p>
        </header>

        <div className="p-8">
          {/* SUMMARY */}
          <div className="mb-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <Award
                size={23}
                className="text-[#087f87]"
              />

              <p className="mt-4 text-sm text-slate-500">
                Total Certificates
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {certificates.length}
              </h2>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <CheckCircle2
                size={23}
                className="text-[#087f87]"
              />

              <p className="mt-4 text-sm text-slate-500">
                Courses Completed
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {certificates.length}
              </h2>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <BookOpen
                size={23}
                className="text-[#087f87]"
              />

              <p className="mt-4 text-sm text-slate-500">
                Learning Progress
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                100%
              </h2>
            </div>
          </div>

          {/* CERTIFICATES */}
          <section>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                Your Certificates
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Certificates earned from successfully completed courses.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* CERTIFICATE TOP */}
                  <div className="bg-[#172636] p-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#08a7aa]">
                      <Award
                        size={32}
                        className="text-white"
                      />
                    </div>

                    <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#7ce0df]">
                      Certificate of Completion
                    </p>

                    <h3 className="mt-3 text-lg font-bold text-white">
                      {certificate.title}
                    </h3>
                  </div>

                  {/* DETAILS */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <BookOpen
                        size={16}
                        className="text-[#087f87]"
                      />
                      {certificate.course}
                    </div>

                    <div className="mt-4 flex items-start gap-2 text-xs text-slate-500">
                      <CalendarDays
                        size={15}
                        className="mt-0.5 shrink-0"
                      />

                      {certificate.completed}
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                      Instructor:{" "}
                      <span className="font-medium text-slate-700">
                        {certificate.instructor}
                      </span>
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          `${certificate.title} certificate download will be available after backend integration.`
                        )
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#087f87] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#066b72]"
                    >
                      <Download size={17} />
                      Download Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}