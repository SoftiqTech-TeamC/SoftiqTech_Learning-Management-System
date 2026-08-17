"use client";

import Link from "next/link";
import { useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

import {
  ArrowLeft,
  UserPlus,
  Save,
  User,
  Mail,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  Shield,
} from "lucide-react";

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Active");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !role || !password.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newUser = {
      name,
      email,
      role,
      password,
      status,
    };

    console.log("New User:", newUser);

    alert("User created successfully!");

    setName("");
    setEmail("");
    setRole("");
    setPassword("");
    setStatus("Active");
  };

  const getRoleInfo = () => {
    if (role === "Student") {
      return {
        icon: GraduationCap,
        title: "Student Access",
        description:
          "Students can access enrolled courses, assignments, quizzes, certificates, progress and learning resources.",
      };
    }

    if (role === "Teacher") {
      return {
        icon: BookOpen,
        title: "Teacher Access",
        description:
          "Teachers can manage their courses, students, quizzes, assignments and track student performance.",
      };
    }

    if (role === "Administrator") {
      return {
        icon: Shield,
        title: "Administrator Access",
        description:
          "Administrators can manage users, courses, permissions, reports and platform settings.",
      };
    }

    return null;
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        {/* HEADER */}
        <header className="border-b bg-white px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/permissions"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-slate-500 transition hover:bg-slate-50 hover:text-[#087f87]"
            >
              <ArrowLeft size={19} />
            </Link>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
                Access Management
              </p>

              <h1 className="mt-1 text-3xl font-bold text-[#172636]">
                Add New User
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create a new account and assign the appropriate access level.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl space-y-6 p-8">
          {/* TOP INFO CARD */}
          <section className="overflow-hidden rounded-2xl bg-[#172636] text-white shadow-sm">
            <div className="flex flex-col gap-5 p-7 md:flex-row md:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <UserPlus size={26} />
              </div>

              <div>
                <p className="text-sm text-white/60">
                  User Management
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Create a new platform account
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                  Add students, teachers or administrators and assign their
                  appropriate level of access to the learning management
                  system.
                </p>
              </div>
            </div>
          </section>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
          >
            {/* FORM HEADER */}
            <div className="border-b px-6 py-5">
              <h2 className="font-bold text-slate-900">
                Account Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the basic information for the new user.
              </p>
            </div>

            <div className="space-y-6 p-6">
              {/* PERSONAL INFORMATION */}
              <div>
                <h3 className="mb-4 text-sm font-bold text-slate-800">
                  Personal Details
                </h3>

                <div className="grid gap-5 md:grid-cols-2">
                  {/* NAME */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full rounded-lg border py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87] focus:ring-2 focus:ring-[#087f87]/10"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full rounded-lg border py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87] focus:ring-2 focus:ring-[#087f87]/10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ACCESS DETAILS */}
              <div className="border-t pt-6">
                <h3 className="mb-4 text-sm font-bold text-slate-800">
                  Access & Role
                </h3>

                <div className="grid gap-5 md:grid-cols-2">
                  {/* ROLE */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Assign Role
                    </label>

                    <div className="relative">
                      <ShieldCheck
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full appearance-none rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87]"
                      >
                        <option value="">
                          Select user role
                        </option>

                        <option value="Student">
                          Student
                        </option>

                        <option value="Teacher">
                          Teacher
                        </option>

                        <option value="Administrator">
                          Administrator
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Account Status
                    </label>

                    <div className="relative">
                      <CheckCircle2
                        size={18}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full appearance-none rounded-lg border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#087f87]"
                      >
                        <option value="Active">
                          Active
                        </option>

                        <option value="Inactive">
                          Inactive
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* PASSWORD */}
              <div className="border-t pt-6">
                <h3 className="mb-4 text-sm font-bold text-slate-800">
                  Security
                </h3>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Temporary Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={
                        showPassword ? "text" : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Create a temporary password"
                      className="w-full rounded-lg border py-3 pl-10 pr-12 text-sm outline-none transition focus:border-[#087f87] focus:ring-2 focus:ring-[#087f87]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#087f87]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    The user can change their password after logging
                    into the platform.
                  </p>
                </div>
              </div>

              {/* ROLE PREVIEW */}
              {roleInfo && (
                <div className="rounded-xl border border-[#c9ecec] bg-[#f3fbfb] p-5">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e1f5f5] text-[#087f87]">
                      <roleInfo.icon size={20} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#172636]">
                        {roleInfo.title}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {roleInfo.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex flex-col-reverse gap-3 border-t bg-slate-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/admin/permissions"
                className="rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-800"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#087f87] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#066b72]"
              >
                <Save size={17} />
                Create User
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}