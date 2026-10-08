import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/loginPage.tsx"),

    layout("routes/protected-layout.tsx", [
        route("welcome", "routes/welcomePage.tsx"),
        route("products", "routes/productsPage.tsx"),
        layout("routes/admin-layout.tsx", [
            route("admin/products", "routes/adminProductsPage.tsx"),
        ]),
    ]),
] satisfies RouteConfig;
