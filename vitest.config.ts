import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        env: {
            SESSION_SECRET: "msw-test-only-session-secret",
            VITE_GATEWAY_URL: "http://gateway.test/gateway",
        },
        environment: "jsdom",
        setupFiles: ["./app/test/setup.ts"],
    },
});
