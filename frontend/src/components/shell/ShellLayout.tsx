import { Outlet } from "@tanstack/react-router";
import {
  CpuIcon,
  HardDrive,
  MemoryStick,
  Network as NetIcon,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import NavLink from "./NavLink";

const items = [
  { to: "/", icon: <LayoutDashboard size={18} />, label: "Overview" },
  { to: "/cpu", icon: <CpuIcon size={18} />, label: "CPU" },
  { to: "/ram", icon: <MemoryStick size={18} />, label: "RAM" },
  { to: "/disk", icon: <HardDrive size={18} />, label: "Disco" },
  { to: "/network", icon: <NetIcon size={18} />, label: "Red" },
  { to: "/settings", icon: <Settings size={18} />, label: "Ajustes" },
];

const ShellLayout = () => (
  <div className="shell">
    <aside className="shell__sidebar">
      <div className="shell__brand">SysWatch</div>
      <nav className="shell__nav">
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} icon={it.icon} label={it.label} />
        ))}
      </nav>
    </aside>
    <main className="shell__main">
      <Outlet />
    </main>
  </div>
);

export default ShellLayout;
