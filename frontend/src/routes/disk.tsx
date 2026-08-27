import { createFileRoute } from "@tanstack/react-router";
import DiskView from "../components/views/DiskView";

export const Route = createFileRoute("/disk")({
  component: DiskView,
});