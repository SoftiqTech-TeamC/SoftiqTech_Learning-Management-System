"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import Link from "next/link";

import {
  ShieldCheck,
  Search,
  UserPlus,
  MoreHorizontal,
  CheckCircle2,
  Users,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";

const initialUsers = [
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
    name: "Hassan",
    email: "hassan123@gmail.com",
    role: "Student",
    status: "Active",
  },
];

export default function PermissionsPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = initialUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const teachers = initialUsers.filter(
    (user) => user.role === "Teacher"
  ).length;

  const students = initialUsers.filter(
    (user) => user.role === "Student"
  ).length;

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
                Access Management
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                Permissions
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage user roles and control access across the learning
                platform.
              </p>
            </div>

            <Link
              href="/admin/permissions/add-user"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#087f87] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b72]"
            >
              <UserPlus size={18} />
              Add User
            </Link>
          </div>
        </header>

        <div className="space-y-6 p-8">
          {/* SUMMARY CARDS */}
          <section className="grid gap-5 md:grid-cols-3">
            <SummaryCard
              icon={Users}
              label="Total Users"
              value={initialUsers.length.toString()}
              description="Registered platform users"
            />

            <SummaryCard
              icon={ShieldCheck}
              label="Teachers"
              value={teachers.toString()}
              description="Active teaching accounts"
            />

            <SummaryCard
              icon={CheckCircle2}
              label="Students"
              value={students.toString()}
              description="Student accounts"
            />
          </section>

          {/* USERS SECTION */}
          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* SECTION HEADER */}
            <div className="flex flex-col gap-5 border-b p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  User Permissions
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Manage users, assigned roles and account access.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* SEARCH */}
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87] sm:w-64"
                  />
                </div>

                {/* ROLE FILTER */}
                <div className="relative">
                  <select
                    value={roleFilter}
                    onChange={(e) =>
                      setRoleFilter(e.target.value)
                    }
                    className="appearance-none rounded-lg border bg-white py-2.5 pl-4 pr-10 text-sm outline-none transition focus:border-[#087f87]"
                  >
                    <option value="All">All Roles</option>
                    <option value="Teacher">Teachers</option>
                    <option value="Student">Students</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px]">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
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
                      {/* USER */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7f7] text-sm font-bold text-[#087f87]">
                            {user.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {user.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* ROLE */}
                      <td className="px-6 py-5">
                        <span className="rounded-full bg-[#eaf7f7] px-3 py-1.5 text-xs font-semibold text-[#087f87]">
                          {user.role}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {user.status}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreHorizontal size={19} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center text-sm text-slate-400"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="border-t bg-slate-50/50 px-6 py-4">
              <p className="text-xs text-slate-500">
                Showing {filteredUsers.length} of{" "}
                {initialUsers.length} users
              </p>
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
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
        <Icon size={21} />
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {label}
      </p>

      <h2 className="mt-1 text-3xl font-bold text-[#172636]">
        {value}
      </h2>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}