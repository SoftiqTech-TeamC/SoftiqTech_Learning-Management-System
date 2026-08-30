"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get role from URL:
  // /register?role=student
  // /register?role=faculty
  const selectedRole = searchParams.get("role") || "student";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("REGISTER BUTTON CLICKED");
    console.log("SELECTED ROLE:", selectedRole);

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

      console.log("API URL:", apiUrl);
      console.log("REGISTERING AS:", selectedRole);

      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
          role: selectedRole === "faculty" ? "faculty" : "student",
        }),
      });

      console.log("Response status:", response.status);

      const data = await response.json();

      console.log("Backend response:", data);
      console.log("REGISTERED USER ROLE:", data.user?.role);

      if (!response.ok) {
        if (response.status === 409) {
          setError("This email is already registered.");
        } else if (response.status === 400) {
          setError(
            data.message || "Please fill in all required fields."
          );
        } else {
          setError(
            data.message || "Registration failed. Please try again."
          );
        }

        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSuccess("Registration successful! Please login.");

// Redirect to login page instead
setTimeout(() => {
  router.push("/login");
}, 1000);

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Unable to connect to the server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT SIDE - IMAGE */}
      <section className="relative hidden min-h-screen lg:block">
        <img
          src="/register-learning.jpg"
          alt="Learning"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/5" />
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

            {/* Shows selected role */}
            <p className="mt-2 text-xs font-semibold text-[#087F87]">
              Registering as:{" "}
              {selectedRole === "faculty" ? "Faculty" : "Student"}
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          {/* REGISTER FORM */}
          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >

            {/* FULL NAME */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
              />
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
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 pr-11 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 pr-11 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#087F87] focus:ring-2 focus:ring-[#087F87]/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full rounded-md bg-[#087F87] text-sm font-semibold text-white transition hover:bg-[#066B72] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
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

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
