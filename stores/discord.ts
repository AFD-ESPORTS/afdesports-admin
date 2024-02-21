// ~/store/discord.ts
import { defineStore } from "pinia";

export const useDiscordStore = defineStore("discord", {
  state: () => ({
    clientId: process.env.VUE_APP_DISCORD_CLIENT_ID as string | null,
    redirectUri: process.env.VUE_APP_DISCORD_URI as string | null,
  }),
  actions: {
    redirectToDiscord() {
      window.location.href = `${this.redirectUri}`;
    },
  },
});
