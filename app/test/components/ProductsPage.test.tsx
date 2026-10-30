import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createRoutesStub, redirect, RouterContextProvider } from "react-router";
import { http, HttpResponse } from "msw";
import App from "~/root";
import ProductsPage, { ErrorBoundary, HydrateFallback, loader } from "~/routes/productsPage";
import { rolesContext, tokenContext } from "~/context/context";
import { apiBaseUrl, mockLoginResponse, mockProducts, mockUser } from "../mocks/handlers";
import { server } from "../mocks/server";

afterEach(() => {
    cleanup();
    sessionStorage.clear();
});

function renderProductsApp() {
    const Stub = createRoutesStub([
        {
            path: "/",
            Component: App,
            children: [
                {
                    path: "products",
                    Component: ProductsPage,
                    ErrorBoundary,
                    HydrateFallback,
                    loader: async () => {
                        // Test-only auth adapter: the app still uses __session rather than /auth/me.
                        // This supplies the authenticated context expected by the real products loader.
                        const response = await fetch(`${apiBaseUrl}/auth/me`);
                        if (!response.ok) {
                            throw redirect("/login");
                        }
                        const user = await response.json() as typeof mockUser;
                        const context = new RouterContextProvider();
                        context.set(tokenContext, mockLoginResponse.accessToken);
                        context.set(rolesContext, user.roles);

                        return loader({
                            request: new Request("http://localhost/products"),
                            params: {},
                            context,
                            url: new URL("http://localhost/products"),
                            pattern: "/products",
                        });
                    },
                },
                {
                    path: "login",
                    Component: () => <p>Please log in</p>,
                },
            ],
        },
    ]);

    render(<Stub initialEntries={["/products"]} />);
}

describe("Product fetching with MSW", () => {
    it("shows fetched products for an authenticated user", async () => {
        renderProductsApp();

        for (const product of mockProducts) {
            expect(await screen.findByRole("heading", { name: product.name })).toBeInTheDocument();
        }
        expect(screen.queryByText(/Unable to load products/)).not.toBeInTheDocument();
    });

    it("shows an error when product fetching fails", async () => {
        server.use(
            http.get(`${apiBaseUrl}/products`, () => new HttpResponse(null, { status: 500 })),
        );

        renderProductsApp();

        expect(await screen.findByText(/Unable to load products\. Status: 500/)).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: mockProducts[0].name })).not.toBeInTheDocument();
    });

    it("does not show products when the mocked session is missing", async () => {
        server.use(
            http.get(`${apiBaseUrl}/auth/me`, () => new HttpResponse(null, { status: 401 })),
        );

        renderProductsApp();

        expect(await screen.findByText("Please log in")).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: mockProducts[0].name })).not.toBeInTheDocument();
    });
});
