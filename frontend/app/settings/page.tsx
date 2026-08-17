import Sidebar from "@/components/layout/Sidebar";
import SettingsPage from "@/components/settings/SettingsPage";

export default function Settings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1">
        <SettingsPage />
      </main>
    </div>
  );
}