"use client";

import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const settings = [
  {
    icon: User,
    title: "Account Information",
    description: "Manage your personal and account details.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Choose how you want to receive notifications.",
  },
  {
    icon: Lock,
    title: "Password & Security",
    description: "Manage your password and account security.",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Customize the look and feel of your dashboard.",
  },
  {
    icon: Globe,
    title: "Language & Region",
    description: "Set your preferred language and region.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy",
    description: "Manage your privacy and data preferences.",
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafb]">
      {/* Header */}
      <header className="border-b border-[#e8edef] bg-white px-8 py-6">
        <p className="text-[11px] font-medium text-[#00999d]">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-[#172636]">
          Settings
        </h1>

        <p className="mt-1 text-sm text-[#7d898f]">
          Manage your account preferences and settings.
        </p>
      </header>

      <main className="max-w-5xl p-8">
        {/* Settings Cards */}
        <div className="space-y-3">
          {settings.map((setting) => {
            const Icon = setting.icon;

            return (
              <button
                key={setting.title}
                className="flex w-full items-center rounded-xl border border-[#e5e9ea] bg-white p-5 text-left transition hover:border-[#9dd5d6] hover:shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#00999d]">
                  <Icon size={20} />
                </div>

                <div className="ml-4 flex-1">
                  <h2 className="text-sm font-semibold text-[#172636]">
                    {setting.title}
                  </h2>

                  <p className="mt-1 text-xs text-[#89959b]">
                    {setting.description}
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-[#9aa5aa]"
                />
              </button>
            );
          })}
        </div>

        {/* Danger Zone */}
        <div className="mt-8 rounded-xl border border-red-100 bg-white p-6">
          <h2 className="text-sm font-semibold text-red-600">
            Account Actions
          </h2>

          <p className="mt-2 text-xs text-[#89959b]">
            These actions affect your account and cannot be
            easily undone.
          </p>

          <button className="mt-5 rounded-lg border border-red-200 px-5 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50">
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}