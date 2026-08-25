import Sidebar from "@/components/layout/Sidebar";
import SettingsPage from "@/components/settings/SettingsPage";

export default function Settings() {
  return (
    <div className="min-h-screen bg-[#f8fafb]">
      <Sidebar />

      {/* ml-[240px] pushes content clear of the fixed 240px sidebar */}
      <main className="ml-[240px] min-h-screen p-6">
        <SettingsPage />
      </main>
    </div>
  );
}