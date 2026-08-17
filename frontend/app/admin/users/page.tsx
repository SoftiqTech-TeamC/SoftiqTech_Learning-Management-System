
"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import type { ElementType } from "react";
import {
  Search,
  Filter,
  Users,
  GraduationCap,
  UserCheck,
  MoreHorizontal,
  Mail,
} from "lucide-react";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Teacher",
    status: "Active",
    joined: "Aug 02, 2026",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Ali Ahmed",
    email: "ali.ahmed@example.com",
    role: "Student",
    status: "Active",
    joined: "Aug 01, 2026",
    initials: "AA",
  },
  {
    id: 3,
    name: "Maham Khan",
    email: "maham.khan@example.com",
    role: "Teacher",
    status: "Active",
    joined: "Jul 29, 2026",
    initials: "MK",
  },
  {
    id: 4,
    name: "Eman Fatima",
    email: "eman.fatima@example.com",
    role: "Student",
    status: "Inactive",
    joined: "Jul 25, 2026",
    initials: "EF",
  },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            User Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage students, teachers and platform users.
          </p>
        </header>

        <div className="space-y-6 p-8">
          <div className="grid gap-5 md:grid-cols-3">
            <SummaryCard
              icon={Users}
              title="Total Users"
              value="2,486"
            />

            <SummaryCard
              icon={GraduationCap}
              title="Students"
              value="2,184"
            />

            <SummaryCard
              icon={UserCheck}
              title="Teachers"
              value="302"
            />
          </div>

          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  All Users
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  View and manage registered users.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="w-64 rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#087f87]"
                  />
                </div>

                <button className="flex items-center gap-2 rounded-lg border px-4 text-sm font-medium text-slate-600 hover:bg-slate-50">
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase text-slate-500">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7f7] text-xs font-bold text-[#087f87]">
                            {user.initials}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {user.name}
                            </p>

                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                              <Mail size={12} />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.role}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {user.joined}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                          <MoreHorizontal size={19} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
}: {
  icon: ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
        <Icon size={21} />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-bold text-[#172636]">
        {value}
      </h2>
    </div>
  );
}
