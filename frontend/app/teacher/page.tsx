import TeacherSidebar from "@/components/teacher/TeacherSidebar";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";

export default function TeacherPage() {
  return (
    <>
      <TeacherSidebar />

      <main className="ml-[240px]">
        <TeacherDashboard />
      </main>
    </>
  );
}