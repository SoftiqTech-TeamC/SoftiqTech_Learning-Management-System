import Link from "next/link";
import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  ArrowLeft,
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  ClipboardList,
} from "lucide-react";

const courses: Record<
  string,
  {
    name: string;
    instructor: string;
    students: number;
    progress: number;
  }
> = {
  "1": {
    name: "Computer Science 320",
    instructor: "Dr. Jawaid",
    students: 42,
    progress: 78,
  },
  "2": {
    name: "Database Systems",
    instructor: "Maham",
    students: 38,
    progress: 65,
  },
  "3": {
    name: "Research Methodology",
    instructor: "Eman",
    students: 36,
    progress: 54,
  },
  "4": {
    name: "Mathematics 120",
    instructor: "Rubina",
    students: 40,
    progress: 89,
  },
};

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const course = courses[id] || courses["1"];

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar active="Courses" />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/courses"
              className="flex h-10 w-10 items-center justify-center rounded-lg border text-slate-500 hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
                Course Details
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                {course.name}
              </h1>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-8">
          <section className="rounded-2xl bg-[#172636] p-7 text-white">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-white/60">Course Instructor</p>

                <h2 className="mt-2 text-2xl font-bold">
                  {course.instructor}
                </h2>

                <p className="mt-2 text-sm text-white/60">
                  This course is currently active on the learning platform.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 px-6 py-4">
                <p className="text-xs text-white/60">Overall Progress</p>

                <p className="mt-2 text-3xl font-bold">
                  {course.progress}%
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-5 md:grid-cols-3">
            <InfoCard
              icon={Users}
              title="Enrolled Students"
              value={course.students.toString()}
            />

            <InfoCard
              icon={GraduationCap}
              title="Instructor"
              value={course.instructor}
            />

            <InfoCard
              icon={TrendingUp}
              title="Course Progress"
              value={`${course.progress}%`}
            />
          </div>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                <ClipboardList size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Course Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monitor course content, students and learning progress.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-xs text-slate-400">
                  Course Status
                </p>

                <p className="mt-2 font-semibold text-emerald-600">
                  Active
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-xs text-slate-400">
                  Learning Progress
                </p>

                <div className="mt-3 h-2 rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#08a7aa]"
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <Icon size={21} className="text-[#087f87]" />

      <p className="mt-4 text-sm text-slate-500">{title}</p>

      <h3 className="mt-1 text-xl font-bold text-[#172636]">
        {value}
      </h3>
    </div>
  );
}