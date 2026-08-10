"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
    href: "/student/quizzes",
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
  {
    label: "Logout",
    icon: LogOut,
    href: "#",
  },
];

interface SidebarProps {
  active?: string;
}

export default function Sidebar({
  active = "Dashboard",
}: SidebarProps) {
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

  return (
    <aside className="flex min-h-screen w-[240px] flex-col bg-[#172636] text-white">
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
      <nav className="flex-1 px-3 pt-5">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-[44px] items-center gap-4 rounded-lg px-4 text-[13px] transition ${
                  active === item.label
                    ? "bg-[#08a7aa] text-white"
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
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/10 p-5">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg transition hover:bg-white/5"
        >
          {/* User Initial */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08a7aa] text-sm font-semibold">
            {userInitial}
          </div>

          {/* User Name */}
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium">
              {userName}
            </p>

            <p className="mt-1 text-[10px] text-white/50">
              View Profile
            </p>
          </div>

          <span className="ml-auto text-white/50">
            ›
          </span>
        </Link>
      </div>
    </aside>
  );
}