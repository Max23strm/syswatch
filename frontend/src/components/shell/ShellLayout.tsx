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
import "../../styles/shell.css";

const items = [
  { to: "/", icon: <LayoutDashboard size={"auto"} />, label: "Overview" },
  // { to: "/cpu", icon: <CpuIcon size={"auto"} />, label: "CPU" },
  // { to: "/ram", icon: <MemoryStick size={"auto"} />, label: "RAM" },
  // { to: "/disk", icon: <HardDrive size={"auto"} />, label: "Disco" },
  // { to: "/network", icon: <NetIcon size={"auto"} />, label: "Red" },
  // { to: "/settings", icon: <Settings size={"auto"} />, label: "Ajustes" },
];

const ShellLayout = () => {
  return (
    <div className="shell">
      <aside className="shell__sidebar">
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
};

export default ShellLayout;
