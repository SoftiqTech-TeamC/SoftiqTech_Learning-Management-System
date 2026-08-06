"use client";

import Image from "next/image";

import {
  Bell,
  Flame,
  CalendarDays,
  BookOpen,
  CheckSquare,
  Target,
  ChevronRight,
  ChevronLeft,
  Flag,
  Users,
  ClipboardCheck,
  Code2,
  BarChart3,
  Globe,
  Sprout,
} from "lucide-react";

const courses = [
  {
    title: "Data Science 101",
    teacher: "Prof Munawar",
    progress: 65,
    image: "/courses/data-science.jpg",
    icon: BarChart3,
  },
  {
    title: "Algorithms & Design",
    teacher: "Prof. Ovais",
    progress: 45,
    image: "/courses/algorithms.jpg",
    icon: Code2,
  },
  {
    title: "Business Analytics",
    teacher: "Prof. Arif",
    progress: 70,
    image: "/courses/business.jpg",
    icon: BarChart3,
  },
  {
    title: "Physics II",
    teacher: "Prof. Haseeb",
    progress: 30,
    image: "/courses/physics.jpg",
    icon: Globe,
  },
  {
    title: "Environmental Science",
    teacher: "Prof. ",
    progress: 60,
    image: "/courses/environment.jpg",
    icon: Sprout,
  },
];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-[#fbfcfc]">
      {/* Header */}
      <header className="flex h-[100px] items-center justify-between border-b border-[#edf0f1] bg-white px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#00999d]">
              Learning Journey
            </span>

            <span className="text-[#00999d]">
              〰
            </span>
          </div>

          <h1 className="mt-1 text-[25px] font-semibold tracking-tight text-[#172636]">
            Welcome back, Ali 
          </h1>

          <p className="mt-1 text-[11px] text-[#8b969c]">
            Pick up where you left off and keep making progress.
          </p>
        </div>

        <div className="flex items-center gap-7">
          {/* Streak */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf8f8]">
              <Flame
                size={18}
                className="text-[#00999d]"
              />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-[#172636]">
                7{" "}
                <span className="text-[10px] font-normal text-[#6e7b82]">
                  Day Streak
                </span>
              </p>

              <p className="text-[8px] font-medium text-[#00999d]">
                Keep it up!
              </p>
            </div>
          </div>

          <div className="h-9 w-px bg-[#e9edef]" />

          {/* Tasks */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf8f8]">
              <CalendarDays
                size={18}
                className="text-[#00999d]"
              />
            </div>

            <div>
              <p className="text-[15px] font-semibold text-[#172636]">
                12{" "}
                <span className="text-[10px] font-normal text-[#6e7b82]">
                  Tasks Due
                </span>
              </p>

              <p className="text-[8px] font-medium text-[#00999d]">
                This Week
              </p>
            </div>
          </div>

          <Bell
            size={22}
            strokeWidth={1.5}
            className="text-[#172636]"
          />
        </div>
      </header>

      {/* Content */}
      <main className="p-8">
        {/* Top Row */}
        <div className="grid grid-cols-12 gap-5">
          {/* Daily Progress */}
          <div className="col-span-4 rounded-xl border border-[#e7ebed] bg-white p-6">
            <h2 className="text-[13px] font-semibold text-[#172636]">
              Daily Progress
            </h2>

            <div className="mt-6 flex items-center gap-7">
              {/* Ring */}
              <div className="relative h-[150px] w-[150px] shrink-0">
                <svg
                  viewBox="0 0 120 120"
                  className="h-full w-full -rotate-90"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#edf0f1"
                    strokeWidth="7"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#008f94"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="301.6"
                    strokeDashoffset="72.4"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[30px] font-semibold text-[#172636]">
                    76%
                  </span>

                  <span className="text-[10px] text-[#7d898f]">
                    Completed
                  </span>

                  <span className="mt-2 rounded-full bg-[#e8f7f7] px-3 py-1 text-[8px] font-medium text-[#008f94]">
                    Great job!
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 space-y-5">
                <Stat
                  icon={<BookOpen size={16} />}
                  label="Study Time"
                  value="2h 45m"
                  detail="of 3h goal"
                />

                <Stat
                  icon={<CheckSquare size={16} />}
                  label="Lessons Done"
                  value="5"
                  detail="of 8"
                />

                <Stat
                  icon={<Target size={16} />}
                  label="Quizzes Score"
                  value="88%"
                  detail="avg."
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold text-[#00999d]">
              View Full Progress
              <ChevronRight size={12} />
            </div>
          </div>

          {/* Focus */}
          <div className="col-span-4 rounded-xl border border-[#e7ebed] bg-white p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-[13px] font-semibold text-[#172636]">
                Focus of the Day
              </h2>

              <div className="h-8 w-5 bg-[#00999d] [clip-path:polygon(0_0,100%_0,100%_100%,50%_75%,0_100%)]" />
            </div>

            <div className="mt-5 flex h-[70px] items-center justify-center rounded-lg bg-[#e8f6f6]">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-[#008f94]">
                <Target
                  size={28}
                  className="text-[#008f94]"
                />
              </div>
            </div>

            <p className="mt-4 text-[8px] font-semibold text-[#00999d]">
              CONTINUE LESSON
            </p>

            <h3 className="mt-1 text-[14px] font-semibold text-[#172636]">
              Data Structures in Depth
            </h3>

            <p className="mt-1 text-[9px] text-[#849097]">
              CS-201 · Foundations of Computer Science
            </p>

            <div className="mt-4 h-[4px] rounded-full bg-[#edf0f1]">
              <div className="h-full w-[40%] rounded-full bg-[#00999d]" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button className="rounded-md bg-[#008f94] px-6 py-2.5 text-[9px] font-semibold text-white">
                Resume Lesson
              </button>

              <span className="text-[9px] font-semibold text-[#00999d]">
                View Course
              </span>
            </div>
          </div>

          {/* Milestones */}
          <div className="col-span-4 rounded-xl border border-[#e7ebed] bg-white p-6">
            <h2 className="text-[13px] font-semibold text-[#172636]">
              Upcoming Milestones
            </h2>

            <div className="relative mt-5">
              <div className="absolute left-[8px] top-3 bottom-3 w-px bg-[#a8dada]" />

              <div className="space-y-4">
                <Milestone
                  date="May 24"
                  title="Project Proposal"
                  subtitle="Data Science 101"
                  icon={<Flag size={12} />}
                />

                <Milestone
                  date="May 27"
                  title="Midterm Exam"
                  subtitle="Algorithms & Design"
                  icon={<ClipboardCheck size={12} />}
                />

                <Milestone
                  date="May 30"
                  title="Group Presentation"
                  subtitle="Business Analytics"
                  icon={<Users size={12} />}
                />

                <Milestone
                  date="Jun 2"
                  title="Lab Report"
                  subtitle="Physics I"
                  icon={<ClipboardCheck size={12} />}
                />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold text-[#00999d]">
              View All Milestones
              <ChevronRight size={12} />
            </div>
          </div>
        </div>

        {/* Courses */}
        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-[#172636]">
              My Active Courses
            </h2>

            <div className="flex items-center gap-3">
              <span className="text-[9px] text-[#7d898f]">
                View All Courses
              </span>

              <ChevronLeft
                size={14}
                className="text-[#9aa5aa]"
              />

              <ChevronRight
                size={14}
                className="text-[#9aa5aa]"
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course.title}
                course={course}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf7f7] text-[#00999d]">
        {icon}
      </div>

      <div>
        <p className="text-[8px] text-[#8b969c]">
          {label}
        </p>

        <p className="mt-0.5 text-[11px] font-semibold text-[#172636]">
          {value}
          <span className="ml-1 text-[7px] font-normal text-[#9aa5aa]">
            {detail}
          </span>
        </p>
      </div>
    </div>
  );
}

function Milestone({
  date,
  title,
  subtitle,
  icon,
}: {
  date: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center gap-4">
      <div className="relative z-10 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#a8dada] bg-[#effafa] text-[#00999d]">
        {icon}
      </div>

      <div>
        <p className="text-[8px] text-[#8b969c]">
          {date}
        </p>

        <p className="mt-0.5 text-[9px] font-semibold text-[#172636]">
          {title}
        </p>

        <p className="text-[7px] text-[#8b969c]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function CourseCard({
  course,
}: {
  course: (typeof courses)[number];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e5e9ea] bg-white shadow-sm hover:shadow-lg transition">
      {/* Course Image */}
      <div
        className="relative h-[105px] bg-cover"
        style={{
          backgroundImage: `url(${course.image})`,
          backgroundPosition: "center 15%", // 👈 Image thori upar hogi
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Card Content */}
      <div className="p-3">
        <h3 className="truncate text-[10px] font-semibold text-[#172636]">
          {course.title}
        </h3>

        <p className="mt-1 truncate text-[8px] text-[#849097]">
          {course.teacher}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-[4px] flex-1 rounded-full bg-[#e8edef]">
            <div
              className="h-full rounded-full bg-[#00999d]"
              style={{
                width: `${course.progress}%`,
              }}
            />
          </div>

          <span className="text-[8px] text-[#69777f]">
            {course.progress}%
          </span>
        </div>
      </div>
    </div>
  );
}