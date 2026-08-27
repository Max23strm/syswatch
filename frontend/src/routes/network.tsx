import { createFileRoute } from "@tanstack/react-router";
import NetworkView from "../components/views/NetworkView";

export const Route = createFileRoute("/network")({
  component: NetworkView,
});