"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Activity,
  Mail,
  LockKeyhole,
  Clock3,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const accountDetails = [
  {
    icon: UserCheck,
    title: "Account Verification",
    description: "Your administrator identity has been verified.",
    status: "Verified",
  },
  {
    icon: ShieldCheck,
    title: "Security Status",
    description: "Your account security is currently protected.",
    status: "Protected",
  },
  {
    icon: Activity,
    title: "Account Activity",
    description: "Your account is active and available for use.",
    status: "Active",
  },
  {
    icon: Mail,
    title: "Email Verification",
    description: "Your administrator email address is verified.",
    status: "Verified",
  },
];

export default function AccountStatusPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        {/* Header */}
        <header className="border-b bg-white px-8 py-6">
          <Link
            href="/admin/setting"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#087f87] transition hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Settings
          </Link>

          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Account Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Account Status
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your administrator account status and security information.
          </p>
        </header>

        <div className="mx-auto max-w-4xl space-y-6 p-8">
          {/* Current Status */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={30} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Current Account Status
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-emerald-600">
                      Active
                    </h2>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Operational
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#f7fafa] px-4 py-3">
                <p className="text-xs text-slate-500">
                  Account Type
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  System Administrator
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">
              <div className="flex gap-3">
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    Your account is in good standing
                  </p>

                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Your administrator account is active and currently has
                    access to the LMS administration features.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Account Overview */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div>
              <h2 className="font-bold text-slate-900">
                Account Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                A summary of your current account and security status.
              </p>
            </div>

            <div className="mt-6 divide-y rounded-xl border">
              {accountDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-5 px-5 py-5"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-800">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#eaf7f7] px-3 py-1 text-xs font-semibold text-[#087f87]">
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Security Summary */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Security Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current security information associated with your account.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={LockKeyhole}
                title="Password Protection"
                value="Active"
              />

              <InfoCard
                icon={ShieldCheck}
                title="Account Protection"
                value="Enabled"
              />

              <InfoCard
                icon={Clock3}
                title="Account Activity"
                value="No Issues"
              />

              <InfoCard
                icon={Activity}
                title="System Access"
                value="Full Access"
              />
            </div>
          </section>

          {/* Important Information */}
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex gap-3">
              <AlertCircle
                size={21}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <h2 className="font-semibold text-amber-900">
                  Need to deactivate your account?
                </h2>

                <p className="mt-1 text-sm leading-6 text-amber-700">
                  Administrator accounts cannot be deactivated from this
                  page. Contact the platform administrator if you need to
                  suspend or deactivate this account.
                </p>
              </div>
            </div>
          </section>

          {/* Back Button */}
          <div className="flex justify-end">
            <Link
              href="/admin/setting"
              className="inline-flex items-center gap-2 rounded-lg border bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#087f87] hover:text-[#087f87]"
            >
              <ArrowLeft size={16} />
              Back to Settings
            </Link>
          </div>
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
    <div className="rounded-xl border p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7f7] text-[#087f87]">
          <Icon size={19} />
        </div>

        <div>
          <p className="text-xs text-slate-500">{title}</p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}