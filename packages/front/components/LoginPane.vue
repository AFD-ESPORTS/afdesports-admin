<template>
  <div
    class="box-border p-8 border-2 border-slate-400/50 backdrop-blur-md bg-white/20 rounded-md drop-shadow-md hover:drop-shadow-xl"
  >
    <img
      src="/img/Discord_AFDESPORTS_logo.png"
      alt="logo"
      class="flex items-center w-40 h-40 mx-auto mb-16 drop-shadow-xl"
    />
    <div class="text-black text-center object-none object-center">
      <h1 class="text-2xl font-bold text-white mb-16">Login</h1>
      <div class="flex justify-center">
        <IconButton
          icon="discord"
          text="Se connecter avec Discord"
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded hover:shadow-xl"
          @click="loginWithDiscord"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDiscordStore } from "@/stores/discord";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const { isLoading } = props;
const discordStore = useDiscordStore();

const loginWithDiscord = () => {
  discordStore.redirectToDiscord();
};
</script>
```
