"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Users,
  Award,
  Edit3,
  Camera,
  ShieldCheck,
} from "lucide-react";

export default function TeacherProfilePage() {
  const [userName, setUserName] = useState("Dr. Ahad");
  const [email, setEmail] = useState("ahad@example.com");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        if (user?.name) {
          setUserName(user.name);
        }

        if (user?.email) {
          setEmail(user.email);
        }
      } catch {
        console.error("Unable to load profile data.");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <header className="border-b bg-white px-8 py-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
          Account
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#172636]">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your professional information and teaching profile.
        </p>
      </header>

      <main className="space-y-6 p-8">
        {/* Profile Header */}
        <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-[#087f87] to-[#172636]" />

          <div className="px-6 pb-6">
            <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-white bg-[#eaf7f7] text-4xl font-bold text-[#087f87] shadow-md">
                    {userName.charAt(0).toUpperCase()}
                  </div>

                  <button
                    type="button"
                    className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#087f87] text-white shadow-md hover:bg-[#066b72]"
                    aria-label="Change profile picture"
                  >
                    <Camera size={15} />
                  </button>
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold text-[#172636]">
                    {userName}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Instructor · Computer Science Department
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-3">
          <ProfileStat
            icon={BookOpen}
            label="Courses Teaching"
            value="6"
          />

          <ProfileStat
            icon={Users}
            label="Students"
            value="248"
          />

          <ProfileStat
            icon={Award}
            label="Years Experience"
            value="8"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b pb-5">
              <div>
                <h2 className="font-bold text-slate-900">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your basic account and contact information.
                </p>
              </div>

              <Edit3 size={18} className="text-slate-400" />
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Info
                icon={Users}
                label="Full Name"
                value={userName}
              />

              <Info
                icon={Mail}
                label="Email Address"
                value={email}
              />

              <Info
                icon={Phone}
                label="Phone Number"
                value="+92 300 1234567"
              />

              <Info
                icon={MapPin}
                label="Location"
                value="Islamabad, Pakistan"
              />
            </div>
          </section>

          {/* Account Status */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Account Status
            </h2>

            <div className="mt-6 rounded-xl bg-emerald-50 p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={21}
                  className="text-emerald-600"
                />

                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    Verified Account
                  </p>

                  <p className="mt-1 text-xs text-emerald-700">
                    Your instructor account is active.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Role
                </span>

                <span className="font-medium text-slate-800">
                  Instructor
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Member Since
                </span>

                <span className="font-medium text-slate-800">
                  2024
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* About */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            About
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Computer Science instructor focused on software development,
            data structures, algorithms and practical learning experiences.
            Passionate about helping students build strong technical
            foundations through project-based education.
          </p>
        </section>
      </main>
    </div>
  );
}

function ProfileStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
        <Icon size={20} />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-[#172636]">
        {value}
      </p>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-[#087f87]" />

        <div>
          <p className="text-xs text-slate-500">
            {label}
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}