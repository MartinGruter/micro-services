import type { MiddlewareFunction } from "react-router";
import { rolesContext } from "~/context/context";

export function requireRole(role: string): MiddlewareFunction<Response> {
  return async ({ context }) => {
    const roles = context.get(rolesContext);

    if (!roles.includes(role)) {
      throw new Response("Forbidden", {
        status: 403,
        statusText: "Forbidden",
      });
    }
  };
}
