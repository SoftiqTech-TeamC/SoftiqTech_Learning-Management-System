"use client";

import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BookOpen,
  Award,
  Clock,
  Edit3,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f8fafb]">
      {/* Header */}
      <header className="border-b border-[#e8edef] bg-white px-8 py-6">
        <p className="text-[11px] font-medium text-[#00999d]">
          My Account
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-[#172636]">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-[#7d898f]">
          View and manage your personal information.
        </p>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Profile Card */}
          <div className="col-span-4 rounded-xl border border-[#e5e9ea] bg-white p-7">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#c98d69] text-3xl font-semibold text-white">
                A
              </div>

              <h2 className="mt-4 text-xl font-semibold text-[#172636]">
                Alex Johnson
              </h2>

              <p className="mt-1 text-sm text-[#00999d]">
                Computer Science Student
              </p>

              <p className="mt-1 text-xs text-[#89959b]">
                Student ID: ST-2025-001
              </p>

              <button className="mt-5 flex items-center gap-2 rounded-lg bg-[#008f94] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#007b80]">
                <Edit3 size={14} />
                Edit Profile
              </button>
            </div>

            <div className="mt-7 border-t border-[#edf0f1] pt-6">
              <div className="space-y-4">
                <InfoRow
                  icon={<Mail size={16} />}
                  label="Email"
                  value="alex@example.com"
                />

                <InfoRow
                  icon={<Phone size={16} />}
                  label="Phone"
                  value="+92 300 1234567"
                />

                <InfoRow
                  icon={<MapPin size={16} />}
                  label="Location"
                  value="Lahore, Pakistan"
                />

                <InfoRow
                  icon={<CalendarDays size={16} />}
                  label="Joined"
                  value="January 2025"
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-8 space-y-6">
            {/* About */}
            <section className="rounded-xl border border-[#e5e9ea] bg-white p-7">
              <h2 className="text-sm font-semibold text-[#172636]">
                About Me
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#718087]">
                I am a Computer Science student passionate about
                technology, software development, and learning new
                skills. I enjoy working on projects and exploring
                new areas of computer science.
              </p>
            </section>

            {/* Statistics */}
            <section>
              <h2 className="mb-4 text-sm font-semibold text-[#172636]">
                Learning Overview
              </h2>

              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  icon={<BookOpen size={20} />}
                  value="6"
                  label="Active Courses"
                />

                <StatCard
                  icon={<Award size={20} />}
                  value="76%"
                  label="Average Progress"
                />

                <StatCard
                  icon={<Clock size={20} />}
                  value="42h"
                  label="Learning Time"
                />
              </div>
            </section>

            {/* Academic Information */}
            <section className="rounded-xl border border-[#e5e9ea] bg-white p-7">
              <h2 className="text-sm font-semibold text-[#172636]">
                Academic Information
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-6">
                <InfoField
                  label="Program"
                  value="Bachelor of Computer Science"
                />

                <InfoField
                  label="Semester"
                  value="6th Semester"
                />

                <InfoField
                  label="Department"
                  value="Computer Science"
                />

                <InfoField
                  label="Academic Year"
                  value="2025 - 2026"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#00999d]">
        {icon}
      </div>

      <div>
        <p className="text-[10px] text-[#89959b]">
          {label}
        </p>

        <p className="mt-0.5 text-xs font-medium text-[#172636]">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-[#e5e9ea] bg-white p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#00999d]">
        {icon}
      </div>

      <p className="mt-4 text-xl font-semibold text-[#172636]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#89959b]">
        {label}
      </p>
    </div>
  );
}

function InfoField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] text-[#89959b]">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-[#172636]">
        {value}
      </p>
    </div>
  );
}
