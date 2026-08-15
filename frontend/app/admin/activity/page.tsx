import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  Activity,
  UserCheck,
  BookOpen,
  ClipboardList,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const activities = [
  {
    title: "New instructor account created",
    description:
      "Sarah Johnson successfully created an instructor account.",
    time: "5 minutes ago",
    icon: UserCheck,
  },
  {
    title: "Course published successfully",
    description:
      "Advanced Data Structures is now available to enrolled students.",
    time: "18 minutes ago",
    icon: BookOpen,
  },
  {
    title: "Assignment submissions updated",
    description:
      "New assignment submissions were received for Computer Science 320.",
    time: "42 minutes ago",
    icon: ClipboardList,
  },
  {
    title: "System permissions updated",
    description:
      "Administrator updated platform access permissions.",
    time: "1 hour ago",
    icon: ShieldCheck,
  },
  {
    title: "New student registrations",
    description:
      "24 new students joined the learning platform.",
    time: "2 hours ago",
    icon: UserCheck,
  },
];

export default function AdminActivityPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar active="Activity" />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Platform Monitoring
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            Activity
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track recent actions and updates across the platform.
          </p>
        </header>

        <div className="mx-auto max-w-5xl space-y-6 p-8">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                <Activity size={23} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Recent Platform Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest events from users, courses and system management.
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="flex gap-5 border-b p-6 last:border-b-0 hover:bg-slate-50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {activity.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {activity.description}
                    </p>

                    <p className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                      <Clock3 size={13} />
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}