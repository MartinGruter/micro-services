import { Outlet } from "react-router";
import type { Route } from "./+types/protected-layout";
import { authMiddleware } from "~/middleware/auth";

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export default function ProtectedLayout() {
    return (
        <Outlet />
    );
}