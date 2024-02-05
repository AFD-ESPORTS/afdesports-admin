export default defineNuxtConfig({
  bindModules: ["@pinia/nuxt", "@nuxtjs/axios", "@nuxtjs/auth-next"],
  compilerOptions: {
    types: ["@nuxtjs/auth-next"],
  },
  devtools: { enabled: true },
  serverMiddleware: [{ path: "/api", handle: "~/middleware/api.ts" }],
  router: {
    // middleware: ["auth"],
  },
  runtimeConfig: {
    auth: {
      strategies: {
        discord: {
          clientId: process.env.VUE_APP_DISCORD_CLIENT_ID,
          clientSecret: process.env.VUE_APP_DISCORD_CLIENT_SECRET,
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
