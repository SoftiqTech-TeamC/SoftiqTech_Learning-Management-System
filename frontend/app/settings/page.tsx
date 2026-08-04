import Sidebar from "@/components/layout/Sidebar";
import SettingsPage from "@/components/settings/SettingsPage";

export default function Settings() {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <main className="ml-[220px]">
        <SettingsPage />
      </main>
    </div>
  );
}