import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { apiBaseUrl, mockProducts, mockUser } from "./handlers";
import { server } from "./server";

describe("MSW handlers", () => {
    it("returns products without a running backend", async () => {
        const response = await fetch(`${apiBaseUrl}/products`);

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual(mockProducts);
    });

    it("allows a product error response for an individual test", async () => {
        server.use(
            http.get(`${apiBaseUrl}/products`, () => new HttpResponse(null, { status: 500 })),
        );

        const response = await fetch(`${apiBaseUrl}/products`);

        expect(response.status).toBe(500);
    });

    it("restores the default handlers between tests", async () => {
        const response = await fetch(`${apiBaseUrl}/products`);

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual(mockProducts);
    });

    it("returns a mock user without validating a real session", async () => {
        const response = await fetch(`${apiBaseUrl}/auth/me`);

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual(mockUser);
    });

    it("allows an unauthenticated response for an individual test", async () => {
        server.use(
            http.get(`${apiBaseUrl}/auth/me`, () => new HttpResponse(null, { status: 401 })),
        );

        const response = await fetch(`${apiBaseUrl}/auth/me`);

        expect(response.status).toBe(401);
    });
});
