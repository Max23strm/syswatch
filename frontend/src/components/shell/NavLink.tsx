import { Link } from "@tanstack/react-router";
// import type { RoutePaths } from "@tanstack/router-core"; // opcional, ver nota
import type { ReactNode } from "react";

interface Props {
  to: string;
  icon: ReactNode;
  label: string;
}

const NavLink = ({ to, icon, label }: Props) => (
  <Link
    to={to}
    activeProps={{ className: "nav_link nav_link--active" }}
    inactiveProps={{ className: "nav_link" }}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default NavLink;