"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* Left Side - Image */}
      <section className="relative hidden min-h-screen lg:block">
        <img
          src="/login-learning.jpg"
          alt="Learning workspace"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/5" />
      </section>

      {/* Right Side - Login Form */}
      <section className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-10 lg:px-16">
        <div className="w-full max-w-[480px]">
          {/* Logo */}
          <div className="mb-10">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 10L20 17V35L8 28V10Z"
                    stroke="#087F87"
                    strokeWidth="3"
                  />
                  <path
                    d="M20 17L29 11L40 17V36L29 42L20 35V17Z"
                    stroke="#087F87"
                    strokeWidth="3"
                  />
                  <path
                    d="M20 17L29 22L40 17"
                    stroke="#087F87"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              <span className="text-3xl font-bold tracking-tight text-slate-800">
                Nexus Learning
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Welcome back
            </h1>

            <p className="mt-2 text-base text-slate-500">
              Sign in to continue your learning journey.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ✉
                </span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-md border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔒
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-md border border-slate-300 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-[#087F87]"
                />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-[#087F87] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="h-12 w-full rounded-md bg-[#087F87] text-base font-semibold text-white transition hover:bg-[#066B72]"
            >
              Sign in
            </button>
          </form>

          {/* Register */}
          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#087F87] hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}