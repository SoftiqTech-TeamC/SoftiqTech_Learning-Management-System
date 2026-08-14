import Sidebar from "@/components/layout/Sidebar";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

export default function StudentPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <StudentDashboard />
      </div>
    </div>
  );
}