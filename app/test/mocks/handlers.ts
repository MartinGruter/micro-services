import { http, HttpResponse } from "msw";
import type { Product } from "~/types/Product";
import type { LoginRequest } from "~/types/LoginRequest";
import type { TokenResponse } from "~/types/TokenResponse";

export const apiBaseUrl = import.meta.env.VITE_GATEWAY_URL.replace(/\/$/, "");

export const mockProducts: Product[] = [
    {
        id: 1,
        name: "Computer",
        description: "A test computer",
        price: 499,
        stock: 10,
        category: "ELECTRONICS",
        imageUrl: null,
    },
];

// Matches the current /auth/me response; no real session or JWT is validated.
export const mockUser = {
    username: "test@example.com",
    roles: ["ROLE_USER"],
};

export const mockCredentials: LoginRequest = {
    username: mockUser.username,
    password: "test-password",
};

export const mockLoginResponse: TokenResponse = {
    accessToken: "mock-access-token",
    expiresIn: 3600,
    subject: mockUser.username,
    roles: mockUser.roles,
};

export const handlers = [
    http.post(`${apiBaseUrl}/auth/login`, async ({ request }) => {
        const credentials = await request.json() as LoginRequest;

        if (credentials.username !== mockCredentials.username ||
            credentials.password !== mockCredentials.password) {
            return new HttpResponse(null, { status: 401 });
        }

        return HttpResponse.json(mockLoginResponse);
    }),
    http.get(`${apiBaseUrl}/products`, () => HttpResponse.json(mockProducts)),
    http.get(`${apiBaseUrl}/auth/me`, () => HttpResponse.json(mockUser)),
];
