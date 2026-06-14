import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SettingsDrawer } from "./SettingsDrawer";

export function Layout() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <div
      className="flex flex-col text-jam-text bg-jam-bg"
      style={{
        minHeight: "100dvh",
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <Header onOpenSettings={() => setSettingsOpen(true)} />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
