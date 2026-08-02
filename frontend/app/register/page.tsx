"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* LEFT SIDE - IMAGE */}
      <section className="relative hidden min-h-screen lg:block">
        <img
          src="/register-learning.jpg"
          alt="Students learning together"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>

      {/* RIGHT SIDE - REGISTER FORM */}
      <section className="flex min-h-screen items-center justify-center bg-white px-6 py-10 sm:px-10">
        <div className="w-full max-w-[420px]">
          
          {/* LOGO */}
          <div className="mb-7 flex justify-center">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              {/* Logo Icon */}
              <div className="flex h-12 w-12 items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 11L20 17V34L8 28V11Z"
                    stroke="#087F87"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M20 17L29 11L40 17V35L29 41L20 34V17Z"
                    stroke="#087F87"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M20 17L29 22L40 17"
                    stroke="#087F87"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <span className="text-[30px] font-bold tracking-tight text-slate-800">
                Nexus Learning
              </span>
            </Link>
          </div>

          {/* HEADING */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Create Your Account
            </h1>

            <p className="mt-2 text-xs text-slate-500">
              Join Nexus Learning and start your learning journey today.
            </p>
          </div>

          {/* REGISTER FORM */}
          <form className="space-y-4">

            {/* FULL NAME */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Full Name
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21C4.5 16.5 7.5 14 12 14C16.5 14 19.5 16.5 20 21" />
                  </svg>
                </span>

                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />
                    <path d="M3 7L12 13L21 7" />
                  </svg>
                </span>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                    />
                    <path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" />
                  </svg>
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-11 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                    />
                    <path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" />
                  </svg>
                </span>

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-11 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-md bg-[#087F87] text-sm font-semibold text-white transition hover:bg-[#066B72]"
            >
              Create Account
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="mt-5 text-center text-xs text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#087F87] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}