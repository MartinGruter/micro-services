import { redirect, type MiddlewareFunction } from "react-router";
import { rolesContext, tokenContext } from "~/context/context";
import { getSession } from "~/sessions.server";

export const authMiddleware: MiddlewareFunction<Response> = async ({
    request,
    context,
}) => {
    const session = await getSession(request.headers.get("Cookie"));
    const accessToken = session.get("accessToken");
    const roles = session.get("roles") ?? [];

    // check for token expiration

    if (!accessToken) {
        throw redirect("/login");
    }

    context.set(tokenContext, accessToken);
    context.set(rolesContext, roles);
};
