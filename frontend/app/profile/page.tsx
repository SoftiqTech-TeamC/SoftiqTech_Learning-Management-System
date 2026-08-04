import Sidebar from "@/components/layout/Sidebar";
import ProfilePage from "@/components/profile/ProfilePage";

export default function Profile() {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <main className="ml-[220px]">
        <ProfilePage />
      </main>
    </div>
  );
}