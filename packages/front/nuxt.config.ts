import { sentryVitePlugin } from "@sentry/vite-plugin";
import { fileURLToPath, URL } from "node:url";

export default defineNuxtConfig({
  components: true,
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-icon"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    optimizeDeps: {
      include: ["@turf/turf"],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./", import.meta.url)),
      },
    },
    plugins: [
      // Put the Sentry vite plugin after all other plugins
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "gilles-cognin",
        project: "afdesports-admin-api",
        telemetry: false,
      }),
    ],
  },
  router: {
    // middleware: ["auth"],
  },
  runtimeConfig: {
    auth: {
      strategies: {
        discord: {
          clientId: process.env.DISCORD_CLIENT_ID,
          clientSecret: process.env.DISCORD_CLIENT_SECRET,
          codeChallengeMethod: "",
          responseType: "code",
          grantType: "authorization_code",
          endpoints: {
            authorization: "https://discord.com/api/oauth2/authorize",
            token: "https://discord.com/api/oauth2/token",
            userInfo: "https://discord.com/api/users/@me",
          },
          scope: ["identify", "email"],
        },
      },
    },
  },
});
