import Sidebar from "@/components/layout/Sidebar";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";

export default function TeacherPage() {
  return (
    <>
      <Sidebar />

      <main className="ml-64">
        <TeacherDashboard />
      </main>
    </>
  );
}
