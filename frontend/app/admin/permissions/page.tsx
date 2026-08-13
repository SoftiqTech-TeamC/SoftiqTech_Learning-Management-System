"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  ShieldCheck,
  Search,
  UserPlus,
  MoreHorizontal,
  CheckCircle2,
  Users,
} from "lucide-react";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "Sania",
    email: "sania332@gmail.com",
    role: "Teacher",
    status: "Active",
  },
  {
    id: 2,
    name: "Asad",
    email: "Asad222@gmail.com",
    role: "Teacher",
    status: "Active",
  },
  {
    id: 3,
    name: "Wania",
    email: "Wania321@gmail.com",
    role: "Student",
    status: "Active",
  },
  {
    id: 4,
    name: "Hassan ",
    email: "hassan123@gmail.com",
    role: "Student",
    status: "Active",
  },
];

export default function PermissionsPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Access Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Permissions
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage user roles and access permissions across the platform.
          </p>
        </header>

        <div className="space-y-6 p-8">
          <div className="grid gap-5 md:grid-cols-3">
            <SummaryCard
              icon={Users}
              label="Total Users"
              value="2,486"
            />

            <SummaryCard
              icon={ShieldCheck}
              label="Administrators"
              value="4"
            />

            <SummaryCard
              icon={CheckCircle2}
              label="Active Accounts"
              value="2,372"
            />
          </div>

          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  User Permissions
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Control user access and assigned roles.
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
                    className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#087f87] sm:w-64"
                  />
                </div>

                <button className="flex items-center gap-2 rounded-lg bg-[#087f87] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#066b72]">
                  <UserPlus size={17} />
                  Add User
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs uppercase text-slate-500">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {user.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-[#eaf7f7] px-3 py-1.5 text-xs font-semibold text-[#087f87]">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right">
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
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
        <Icon size={20} />
      </div>

      <p className="mt-4 text-sm text-slate-500">{label}</p>

      <h2 className="mt-1 text-3xl font-bold text-[#172636]">
        {value}
      </h2>
    </div>
  );
}