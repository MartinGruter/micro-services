import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        env: {
            VITE_GATEWAY_URL: "http://gateway.test/gateway",
        },
        environment: "jsdom",
        setupFiles: ["./app/test/setup.ts"],
    },
});
