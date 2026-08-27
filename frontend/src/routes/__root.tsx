import { createRootRouteWithContext } from "@tanstack/react-router";
import ShellLayout from "../components/shell/ShellLayout";

export const Route = createRootRouteWithContext()({
  component: ShellLayout,
});