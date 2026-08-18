"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  ArrowLeft,
  Lock,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function SecurityPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword)) {
      alert(
        "New password must include uppercase and lowercase letters."
      );
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      alert("New password must include at least one number.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    alert("Password changed successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        {/* Header */}
        <header className="border-b bg-white px-8 py-6">
          <Link
            href="/admin/setting"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#087f87] hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Settings
          </Link>

          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Account Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Password & Security
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your password and keep your administrator account secure.
          </p>
        </header>

        <div className="mx-auto max-w-4xl space-y-6 p-8">
          {/* Change Password */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                <Lock size={22} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your password regularly to keep your account secure.
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              {/* Current Password */}
              <PasswordInput
                label="Current Password"
                value={currentPassword}
                onChange={setCurrentPassword}
                showPassword={showCurrent}
                setShowPassword={setShowCurrent}
              />

              {/* New Password */}
              <PasswordInput
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                showPassword={showNew}
                setShowPassword={setShowNew}
              />

              {/* Confirm Password */}
              <PasswordInput
                label="Confirm New Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                showPassword={showConfirm}
                setShowPassword={setShowConfirm}
              />

              {/* Requirements */}
              <div className="rounded-xl bg-[#f7fafa] p-4">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 text-[#087f87]"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Password requirements
                    </p>

                    <ul className="mt-2 space-y-1 text-xs text-slate-500">
                      <li>• At least 8 characters</li>
                      <li>
                        • Include uppercase and lowercase letters
                      </li>
                      <li>• Include at least one number</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Change Password Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="flex items-center gap-2 rounded-lg bg-[#087f87] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b72]"
                >
                  <KeyRound size={17} />
                  Change Password
                </button>
              </div>
            </div>
          </section>

          {/* Security Information */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Security Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Information about your current account security.
            </p>

            <div className="mt-5 divide-y rounded-xl border">
              <SecurityRow
                title="Two-Factor Authentication"
                value="Not Enabled"
              />

              <SecurityRow
                title="Last Password Change"
                value="Never"
              />

              <SecurityRow
                title="Account Protection"
                value="Active"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* Password Input */
function PasswordInput({
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full rounded-lg border px-4 py-3 pr-12 text-sm outline-none focus:border-[#087f87]"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}

/* Security Row */
function SecurityRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <span className="text-sm font-medium text-slate-700">
        {title}
      </span>

      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
        {value}
      </span>
    </div>
  );
}