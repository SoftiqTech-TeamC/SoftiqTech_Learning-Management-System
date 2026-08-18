"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  UserRound,
  Mail,
  Lock,
  Bell,
  Save,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function AdminSettingsPage() {
  const [name, setName] = useState("Administrator");
  const [email, setEmail] = useState("admin@nexus.edu");
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        {/* Header */}
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Account Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Profile & Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your administrator profile and account preferences.
          </p>
        </header>

        <div className="mx-auto max-w-5xl space-y-6 p-8">
          {/* ================= PROFILE ================= */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 border-b pb-6 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#08a7aa] text-2xl font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Administrator Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your personal account information.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87] focus:ring-2 focus:ring-[#087f87]/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87] focus:ring-2 focus:ring-[#087f87]/10"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECURITY ================= */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                <Lock size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Security
                </h2>

                <p className="text-xs text-slate-500">
                  Manage your account security preferences.
                </p>
              </div>
            </div>

            {/* Change Password */}
            <Link
              href="/admin/setting/security"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#087f87] hover:bg-[#f7fafa] hover:text-[#087f87]"
            >
              Change Password
              <ChevronRight size={16} />
            </Link>
          </section>

          {/* ================= NOTIFICATIONS ================= */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                  <Bell size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Notifications
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Receive important platform updates.
                  </p>
                </div>
              </div>

              {/* Notification Toggle */}
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) =>
                    setNotifications(e.target.checked)
                  }
                  className="peer sr-only"
                />

                {/* Toggle Background */}
                <div
                  className="
                    h-7
                    w-12
                    rounded-full
                    bg-slate-300
                    transition-colors
                    duration-200
                    peer-checked:bg-[#087f87]
                    peer-focus:ring-2
                    peer-focus:ring-[#087f87]/30
                    peer-focus:ring-offset-2
                  "
                />

                {/* Toggle Circle */}
                <div
                  className="
                    absolute
                    left-1
                    top-1
                    h-5
                    w-5
                    rounded-full
                    bg-white
                    shadow-sm
                    transition-transform
                    duration-200
                    peer-checked:translate-x-5
                  "
                />
              </label>
            </div>
          </section>

          {/* ================= ACCOUNT STATUS ================= */}
          <Link
            href="/admin/setting/account-status"
            className="group block rounded-2xl border bg-white p-6 shadow-sm transition hover:border-[#087f87]/40 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-slate-900">
                  Account Status
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View your administrator account status and security
                  information.
                </p>
              </div>

              <ChevronRight
                size={20}
                className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#087f87]"
              />
            </div>
          </Link>

          {/* ================= SAVE CHANGES ================= */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-[#087f87] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#066b72] focus:outline-none focus:ring-2 focus:ring-[#087f87]/30 focus:ring-offset-2"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}