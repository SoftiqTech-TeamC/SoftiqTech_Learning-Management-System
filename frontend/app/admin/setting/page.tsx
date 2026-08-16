"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  User,
  Mail,
  Lock,
  Bell,
  ShieldCheck,
  Save,
} from "lucide-react";
import { useState } from "react";

export default function AdminSettingsPage() {
  const [name, setName] = useState("Administrator");
  const [email, setEmail] = useState(
    "admin@lmsplatform.com"
  );

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar active="Settings" />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Account Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your administrator profile and platform preferences.
          </p>
        </header>

        <div className="mx-auto max-w-5xl space-y-6 p-8">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf7f7] text-xl font-bold text-[#087f87]">
                A
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Administrator Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your personal account information.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <User size={16} />
                  Full Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-[#087f87]"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Mail size={16} />
                  Email Address
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-[#087f87]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage system notifications and account security.
            </p>

            <div className="mt-6 space-y-4">
              <SettingItem
                icon={Bell}
                title="Email Notifications"
                description="Receive important system updates through email."
              />

              <SettingItem
                icon={ShieldCheck}
                title="Security Alerts"
                description="Receive alerts about unusual account activity."
              />

              <SettingItem
                icon={Lock}
                title="Password & Security"
                description="Manage your password and account security."
              />
            </div>
          </section>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-[#087f87] px-5 py-3 text-sm font-semibold text-white hover:bg-[#066b72]"
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

function SettingItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-5">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
          <Icon size={19} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button className="rounded-lg border px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
        Manage
      </button>
    </div>
  );
}