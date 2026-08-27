import { createFileRoute } from "@tanstack/react-router";
import RamView from "../components/views/RamView";

export const Route = createFileRoute("/ram")({
  component: RamView,
});