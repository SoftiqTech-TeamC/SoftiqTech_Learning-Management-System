"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldCheck,
  ChartNoAxesCombined,
  Upload,
  FileBarChart,
  Settings,
  UserRound,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Permissions",
    icon: ShieldCheck,
    href: "/admin/permissions",
  },
  {
    label: "Analytics",
    icon: ChartNoAxesCombined,
    href: "/admin/analytics",
  },
  {
    label: "File Upload",
    icon: Upload,
    href: "/admin/upload",
  },
  {
    label: "Export Reports",
    icon: FileBarChart,
    href: "/admin/reports",
  },
  {
    label: "Profile & Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[240px] flex-col bg-[#172636] text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center">
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

          <p className="mt-1 text-[13px] text-white/80">
            Learning
          </p>
        </div>
      </div>

      {/* Admin Label */}
      <div className="px-5 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
          Administration
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex h-[44px] items-center gap-4 rounded-lg px-4 text-[13px] transition ${
                  isActive
                    ? "bg-[#08a7aa] text-white shadow-sm"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Admin Profile */}
      <div className="border-t border-white/10 p-5">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-lg p-1 transition hover:bg-white/5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#08a7aa]">
            <UserRound size={18} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium">
              Administrator
            </p>

            <p className="mt-1 text-[10px] text-white/50">
              System Administrator
            </p>
          </div>
        </Link>

        <button className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-white/60 transition hover:bg-white/5 hover:text-white">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}