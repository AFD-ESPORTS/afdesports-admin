<template>
  <div
    class="box-border p-8 border-2 border-slate-400/50 backdrop-blur-md bg-white/20 rounded-md drop-shadow-md hover:drop-shadow-xl"
  >
    <img
      src="/img/Discord_AFDESPORTS_logo.png"
      alt="logo AFD.ESPORTS"
      class="flex items-center w-40 h-40 mx-auto mb-16 drop-shadow-xl"
    />
    <div class="text-black text-center object-none object-center min-w-72">
      <h1 class="text-2xl font-bold text-white mb-16">Login</h1>
      <div class="flex justify-center">
        <IconButton
          icon="discord"
          text="Se connecter avec Discord"
          class="leading-6"
          :class="classes"
          @click="loginWithDiscord"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { navigateTo } from "#app";
import { useRoute } from "vue-router";
import { useDiscordStore } from "@/stores/discord";
import { useUserStore } from "@/stores/user";
import { usePopUpsStore } from "@/stores/popups";

import type { Ref, ComputedRef } from "vue";
import type { navigateFunc, getUserDatasFunc } from "@/types/Functions.d";
import type { UserDatas } from "@/types/User.d";

const route = useRoute();
const discordStore = useDiscordStore();
const userStore = useUserStore();
const popUpsStore = usePopUpsStore();
const isLoading = ref(false);
const { VITE_DISCORD_URI } = import.meta.env;

const userDatas: Ref<UserDatas | boolean> = ref(false);

const classes: ComputedRef<string> = computed(() => {
  let baseStyle: string =
    " text-white font-bold py-2 px-4 rounded hover:shadow-xl";
  return isLoading.value
    ? baseStyle + " cursor-not-allowed bg-indigo-300"
    : baseStyle + " bg-indigo-500 hover:bg-indigo-700";
});

const loginWithDiscord: navigateFunc = () => {
  setTimeout(() => {
    isLoading.value = false;
    popUpsStore.setPopUp(
      new Error("La tentative de connexion a échouée!"),
      "error"
    );
  }, 10000);
  isLoading.value = true;
  return navigateTo(VITE_DISCORD_URI, { external: true });
};

const getUserDatas: getUserDatasFunc = async (code: string) => {
  isLoading.value = true;
  try {
    userDatas.value = await discordStore.fetchUserDatas(code);
    history.replaceState({}, "", location.pathname);
    if (userDatas.value && typeof userDatas.value !== "boolean") {
      try {
        await userStore.setUserDatas(userDatas.value);
      } catch (e: { code?: number; message?: string } | null) {
        popUpsStore.setPopUp(e, "error");
      } finally {
        isLoading.value = false;
        if (userStore.isAdmin) {
          navigateTo("/admin");
        }
      }
    }
  } catch (e: { code?: number; message?: string } | unknown | null) {
    navigateTo("/login");
  }
};

onMounted(() => {
  const code: string = route.query.code as string;
  if (code && !userStore.isLoggedIn) {
    isLoading.value = true;
    getUserDatas(code);
  }
});
</script>
