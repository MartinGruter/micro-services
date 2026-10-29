import { http, HttpResponse } from "msw";
import type { Product } from "~/types/Product";

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

export const handlers = [
    http.get(`${apiBaseUrl}/products`, () => HttpResponse.json(mockProducts)),
    http.get(`${apiBaseUrl}/auth/me`, () => HttpResponse.json(mockUser)),
];
