// ~/store/discord.ts
import { defineStore } from "pinia";

import type { Ref } from "vue";

export const useDiscordStore = defineStore("discord", () => {
  // const clientId = ref(process.env.VUE_APP_DISCORD_CLIENT_ID as string | null);

  const redirectUri: Ref<string | undefined> = ref(
    process.env.VUE_APP_DISCORD_URI
  );

  const redirectToDiscord = () => {
    console.log("redirectToDiscord: ", redirectUri.value);

    return navigateTo(redirectUri.value, { open: { target: "_blank" } });
  };

  const fetchUserDatas = async (userToken: string): Promise<boolean> => {
    if (userToken) {
      console.log("fetchUserData: ", userToken);
    }
    return false;
  };

  return { fetchUserDatas, redirectToDiscord };
});

/*
async function fetchQuestion(questionId) {
        if (!hash.value[questionId]) {
            hash.value[questionId] = await fetch(questionId);
        }
        return hash.value[questionId];
    }
*/
