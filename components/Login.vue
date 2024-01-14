<template>
  <div>
    <button @click="loginWithDiscord">Se connecter avec Discord</button>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount } from "vue";
import { useDiscordStore } from "@/stores/discord";

export default {
  setup() {
    const discordStore = useDiscordStore();

    const loginWithDiscord = () => {
      console.log(discordStore.$state);
      discordStore.redirectToDiscord();
      // window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${store.state.discord.clientId}&redirect_uri=${store.state.discord.redirectUri}&response_type=code&scope=${scope}`;
    };

    return {
      loginWithDiscord,
    };
  },
};
</script>
