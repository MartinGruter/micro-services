import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  ...(console.log("ALLOWED_ORIGINS:", JSON.stringify(process.env.ALLOWED_ORIGINS)), {}),
  allowedActionOrigins: [process.env.ALLOWED_ORIGINS!],
} satisfies Config;
