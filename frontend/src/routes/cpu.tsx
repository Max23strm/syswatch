import { createFileRoute } from "@tanstack/react-router";
import CpuView from "../components/views/CpuView";

export const Route = createFileRoute("/cpu")({
  component: CpuView,
});