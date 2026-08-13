"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  Users,
  BookOpen,
  GraduationCap,
  Activity,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const coursePerformance = [
  { name: "Computer Science", value: 86 },
  { name: "Mathematics", value: 74 },
  { name: "Biology", value: 68 },
  { name: "Psychology", value: 81 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Platform Insights
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track learning activity and overall platform performance.
          </p>
        </header>

        <div className="space-y-6 p-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <AnalyticsCard
              icon={Users}
              label="Active Users"
              value="1,842"
              trend="+14%"
            />

            <AnalyticsCard
              icon={GraduationCap}
              label="Course Enrollments"
              value="3,256"
              trend="+9%"
            />

            <AnalyticsCard
              icon={BookOpen}
              label="Courses Completed"
              value="684"
              trend="+7%"
            />

            <AnalyticsCard
              icon={Activity}
              label="Engagement Rate"
              value="87%"
              trend="+4%"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Course Performance
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Average performance by department.
                  </p>
                </div>

                <BarChart3 className="text-[#087f87]" size={21} />
              </div>

              <div className="mt-8 space-y-6">
                {coursePerformance.map((course) => (
                  <div key={course.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-700">
                        {course.name}
                      </span>

                      <span className="font-semibold text-[#087f87]">
                        {course.value}%
                      </span>
                    </div>

                    <div className="h-3 rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#08a7aa]"
                        style={{ width: `${course.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                  <TrendingUp size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Platform Growth
                  </h2>

                  <p className="text-xs text-slate-500">
                    User growth during recent months.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex h-64 items-end justify-between gap-4">
                {[45, 62, 55, 78, 69, 88, 95].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <div className="flex h-52 w-full items-end">
                        <div
                          className="w-full rounded-t-lg bg-[#08a7aa]"
                          style={{ height: `${height}%` }}
                        />
                      </div>

                      <span className="text-[10px] text-slate-400">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][
                          index
                        ]}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function AnalyticsCard({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
          <Icon size={20} />
        </div>

        <span className="text-xs font-semibold text-emerald-600">
          {trend}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-500">{label}</p>

      <h2 className="mt-1 text-3xl font-bold text-[#172636]">
        {value}
      </h2>
    </div>
  );
}