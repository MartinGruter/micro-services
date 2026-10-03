import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/loginPage.tsx"),
    route("welcome", "routes/welcomePage.tsx"),
    route("products", "routes/productsPage.tsx")
] satisfies RouteConfig;
