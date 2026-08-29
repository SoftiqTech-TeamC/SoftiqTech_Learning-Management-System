
"use client";

import { useState } from "react";
import {
  Bell,
  Lock,
  Mail,
  Shield,
  Globe,
  Save,
  ChevronRight,
} from "lucide-react";

import TeacherSidebar from "@/components/teacher/TeacherSidebar";

export default function TeacherSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [assignmentAlerts, setAssignmentAlerts] = useState(true);
  const [studentMessages, setStudentMessages] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Teacher Sidebar */}
      <TeacherSidebar />

      {/* Main Content */}
      <div className="ml-[240px] min-h-screen">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Account Preferences
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage notifications, security and account preferences.
          </p>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-5xl space-y-6 p-8">
          {/* Notifications */}
          <SettingsSection
            icon={Bell}
            title="Notifications"
            description="Choose how you want to receive teaching and student updates."
          >
            <Toggle
              title="Email Notifications"
              description="Receive important LMS updates through email."
              enabled={emailNotifications}
              onChange={setEmailNotifications}
            />

            <Toggle
              title="Assignment Alerts"
              description="Get notified when students submit assignments."
              enabled={assignmentAlerts}
              onChange={setAssignmentAlerts}
            />

            <Toggle
              title="Student Messages"
              description="Receive notifications for new student messages."
              enabled={studentMessages}
              onChange={setStudentMessages}
            />

            <Toggle
              title="Weekly Summary"
              description="Receive a weekly overview of course activity."
              enabled={weeklySummary}
              onChange={setWeeklySummary}
            />
          </SettingsSection>

          {/* Communication */}
          <SettingsSection
            icon={Mail}
            title="Communication"
            description="Control your preferred communication settings."
          >
            <div className="flex items-center justify-between gap-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Default Email
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  ahad@example.com
                </p>
              </div>

              <button
                type="button"
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Change
              </button>
            </div>

            <div className="flex items-center justify-between gap-5 border-t py-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Language
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Choose the language used across the dashboard.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Globe
                  size={16}
                  className="text-[#087f87]"
                />

                <select
                  defaultValue="English"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#087f87]"
                >
                  <option>English</option>
                  <option>Urdu</option>
                </select>
              </div>
            </div>
          </SettingsSection>

          {/* Security */}
          <SettingsSection
            icon={Lock}
            title="Security"
            description="Protect your instructor account."
          >
            <button
              type="button"
              className="flex w-full items-center justify-between border-b py-4 text-left transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <Shield
                  size={18}
                  className="text-[#087f87]"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Change Password
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Update your account password regularly.
                  </p>
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-slate-400"
              />
            </button>

            <div className="flex items-center justify-between gap-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Two-Factor Authentication
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Add an additional layer of security to your account.
                </p>
              </div>

              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                Not Enabled
              </span>
            </div>
          </SettingsSection>

          {/* Save Changes */}
          <div className="flex items-center justify-end gap-4">
            {saved && (
              <span className="text-sm font-medium text-emerald-600">
                Settings saved successfully.
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-lg bg-[#087f87] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#066b72]"
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-start gap-4 border-b border-slate-200 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
          <Icon size={20} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {/* Section Content */}
      <div className="mt-2 divide-y divide-slate-100">
        {children}
      </div>
    </section>
  );
}

function Toggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-pressed={enabled}
        aria-label={`${title} ${enabled ? "enabled" : "disabled"}`}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#087f87]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}