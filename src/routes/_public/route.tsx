import { Outlet, createFileRoute } from "@tanstack/react-router";

// Note: You can leave this file be, as-is, but it's for later in case you need a shared
//       piece of UI across all publc pages in the _public directory.
export const Route = createFileRoute("/_public")({
  component: Outlet,
});
