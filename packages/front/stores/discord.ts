import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";
import { fetchUserDatasFromDiscord } from "~/api/user.api";

import type { Ref } from "vue";
import type { UserDatas } from "@/types/User.d";
import type { navigateFunc } from "~/types/Functions";

const baseUrl: string | undefined = process.env.BASE_URL;

export const useDiscordStore = defineStore("discord", () => {
  const userStore = useUserStore();
  const userAccessToken: Ref<string | undefined> = ref();
  const userDatas: Ref<object> = ref({});
  const isAuth: Ref<boolean> = ref(false);

  const fetchUserDatas = async (
    userToken: string
  ): Promise<UserDatas | boolean> => {
    userAccessToken.value = userToken.trim();

    if (userAccessToken.value && !userStore.isLoggedIn) {
      const userDatas: UserDatas = await fetchUserDatasFromDiscord(
        userAccessToken.value
      );
      return userDatas;
    }
    return false;
  };

  const logout: navigateFunc = () => {
    userAccessToken.value = undefined;
    userDatas.value = {};
    isAuth.value = false;

    return navigateTo(baseUrl);
  };

  return { fetchUserDatas, logout };
});
