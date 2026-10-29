import { describe, expect, it } from "vitest";
import { RouterContextProvider } from "react-router";
import { http, HttpResponse } from "msw";
import { action } from "~/routes/loginPage";
import { getSession } from "~/sessions.server";
import { apiBaseUrl, mockCredentials, mockLoginResponse } from "./handlers";
import { server } from "./server";

function submitLogin(password = mockCredentials.password) {
    return action({
        request: new Request("http://localhost/login", {
            method: "POST",
            body: new URLSearchParams({
                username: mockCredentials.username,
                password,
            }),
        }),
        params: {},
        url: new URL("http://localhost/login"),
        pattern: "/login",
        context: new RouterContextProvider(),
    });
}

describe("Login with MSW", () => {
    it("creates a frontend session and redirects after successful login", async () => {
        const result = await submitLogin();

        expect(result).toBeInstanceOf(Response);
        if (!(result instanceof Response)) {
            throw new Error("Expected a login redirect");
        }

        expect(result.status).toBe(302);
        expect(result.headers.get("Location")).toBe("/welcome");
        const cookie = result.headers.get("Set-Cookie");
        expect(cookie).toContain("__session=");
        expect(cookie).toContain("HttpOnly");

        const session = await getSession(cookie!.split(";")[0]);
        expect(session.get("accessToken")).toBe(mockLoginResponse.accessToken);
        expect(session.get("subject")).toBe(mockLoginResponse.subject);
        expect(session.get("roles")).toEqual(mockLoginResponse.roles);
        expect(session.get("expiresIn")).toBe(mockLoginResponse.expiresIn);
    });

    it("returns an error instead of a session for an incorrect password", async () => {
        const result = await submitLogin("wrong-password");

        expect(result).toEqual({ error: "Wrong username or password." });
    });

    it("handles a failed login API response without creating a session", async () => {
        server.use(
            http.post(`${apiBaseUrl}/auth/login`, () => new HttpResponse(null, { status: 500 })),
        );

        const result = await submitLogin();

        expect(result).toEqual({ error: "Wrong username or password." });
    });
});
