// ~/store/discord.ts
import { defineStore } from "pinia";

export const useDiscordStore = defineStore("discord", {
  state: () => ({
    clientId: process.env.VUE_APP_DISCORD_CLIENT_ID as string | null,
    redirectUri: process.env.VUE_APP_DISCORD_URI as string | null,
  }),
  actions: {
    redirectToDiscord() {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code&scope=identify%20guilds%20email`;
    },
  },
});
