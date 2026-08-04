import Sidebar from "@/components/layout/Sidebar";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

export default function StudentPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <div className="ml-[220px]">
        <StudentDashboard />
      </div>
    </div>
  );
}