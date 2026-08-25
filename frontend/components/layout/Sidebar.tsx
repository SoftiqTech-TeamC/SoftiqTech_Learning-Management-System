"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Brain,
  ChartNoAxesColumnIncreasing,
  Award,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/student",
  },
  {
    label: "My Courses",
    icon: BookOpen,
    href: "/courses",
  },
  {
    label: "Calendar",
    icon: CalendarDays,
    href: "/student/calendar",
  },
  {
    label: "Quizzes",
    icon: Brain,
    href: "/quizzes",
  },
  {
    label: "My Progress",
    icon: ChartNoAxesColumnIncreasing,
    href: "/student/progress",
  },
  {
    label: "Certificates",
    icon: Award,
    href: "/student/certificates",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        if (user?.name) {
          setUserName(user.name);
        }
      } catch (error) {
        console.error("Unable to read user data:", error);
      }
    }
  }, []);

  const userInitial = userName.charAt(0).toUpperCase();

  const isActive = (href: string) => {
    if (href === "#") return false;
    if (href === "/student") return pathname === "/student";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col bg-[#172636] text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <img
            src="/logo.png"
            alt="Nexus Learning Logo"
            className="h-10 w-10 object-contain"
          />
        </div>

        <div>
          <h1 className="text-[16px] font-semibold leading-none">
            Nexus
          </h1>

          <p className="mt-1 text-[13px] text-white/90">
            Learning
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-5">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-[44px] items-center gap-4 rounded-lg px-4 text-[13px] transition ${
                  active
                    ? "bg-[#08a7aa] text-white shadow-sm"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.7}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* LOGOUT BUTTON - SEPARATE FROM NAVIGATION */}
          <button
            onClick={handleLogout}
            className="flex h-[44px] w-full items-center gap-4 rounded-lg px-4 text-[13px] text-white/65 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut
              size={18}
              strokeWidth={1.7}
            />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/10 p-5">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg p-1 transition hover:bg-white/5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08a7aa] text-sm font-semibold">
            {userInitial}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium">
              {userName}
            </p>

            <p className="mt-1 text-[10px] text-white/50">
              View Profile
            </p>
          </div>

          <span className="ml-auto text-lg text-white/50">
            ›
          </span>
        </Link>
      </div>
    </aside>
  );
}