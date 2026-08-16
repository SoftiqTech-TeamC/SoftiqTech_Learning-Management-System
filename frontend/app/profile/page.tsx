import Sidebar from "@/components/layout/Sidebar";
import ProfilePage from "@/components/profile/ProfilePage";

export default function Profile() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <ProfilePage />
      </main>
    </div>
  );
}