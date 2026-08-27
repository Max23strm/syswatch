import { createFileRoute } from "@tanstack/react-router";
import OverviewDashboard from "../components/views/OverviewDashboard";

export const Route = createFileRoute("/")({
  component: OverviewDashboard,
});