import { defineStore } from "pinia";

import type { UserDatas } from "~/types/User";

export const useUserStore = defineStore("user", () => {
  const userDatas: Ref<object> = ref({});
  const userServerDatas: Ref<object> = ref({});
  const isAdmin: Ref<boolean> = ref(false);
  const isLoggedIn: Ref<boolean> = ref(false);

  const setUserDatas = (datas: UserDatas): void => {
    userDatas.value = datas.datas;
    userServerDatas.value = datas.guilds;
    isAdmin.value = datas.isAdmin;
    isLoggedIn.value = true;
    localStorage.setItem("userData", JSON.stringify(userDatas.value));
    // Create user's JWT
  };

  return { userDatas, isAdmin, isLoggedIn, setUserDatas };
});
