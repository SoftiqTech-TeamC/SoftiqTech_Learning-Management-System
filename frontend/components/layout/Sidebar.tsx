"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Mail,
  FolderOpen,
  Users,
  Settings,
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
    href: "#",
  },
  {
    label: "Assignments",
    icon: ClipboardList,
    href: "#",
  },
  {
    label: "Grades",
    icon: GraduationCap,
    href: "#",
  },
  {
    label: "Messages",
    icon: Mail,
    href: "#",
  },
  {
    label: "Resources",
    icon: FolderOpen,
    href: "#",
  },
  {
    label: "Community",
    icon: Users,
    href: "#",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  active?: string;
}

export default function Sidebar({
  active = "Dashboard",
}: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[220px] flex-col bg-[#172636] text-white">
      {/* Logo */}
      <div className="flex h-[90px] items-center gap-3 px-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-[#08a7aa]">
          <div className="text-xl font-bold text-[#08a7aa]">
            N
          </div>
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
                <Icon size={18} strokeWidth={1.7} />

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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#08a7aa] text-sm font-semibold">
            A
          </div>

          <div className="min-w-0">
            <p className="text-[13px] font-medium">
              Ali
            </p>

            <p className="mt-1 text-[10px] text-white/50">
              View Profile
            </p>
          </div>

          <span className="ml-auto text-white/50">›</span>
        </Link>
      </div>
    </aside>
  );
}