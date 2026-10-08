import { Outlet } from "react-router";
import { requireRole } from "~/middleware/requireRole";
import type { Route } from "./+types/admin-layout";

export const middleware: Route.MiddlewareFunction[] = [requireRole("ROLE_ADMIN")];

export default function AdminLayout() {
  return <Outlet />;
}
