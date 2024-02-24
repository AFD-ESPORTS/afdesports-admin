<template>
  <div class="flex items-center justify-center loginBackground">
    <LoginPane :isLoading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useDiscordStore } from "@/stores/discord";

import type { Ref } from "vue";
// import type { CustomError } from "@/types/CustomError";

const discordStore = useDiscordStore();
const route = useRoute();
// const error: Ref<CustomError> = ref({ code: 500, message: "Unknown eror" });
const isLoading: Ref<boolean> = ref(false);
const isAuth: Ref<boolean> = ref(false);

console.log("Params: ", route.params);
console.log("Query: ", route.query);

if (route.query?.code) {
  console.log("Code: ", route.query.code);
  isLoading.value = true;
  // error.value = null;

  try {
    isAuth.value = await discordStore.fetchUserDatas(
      route.query.code as string
    );
    console.log("isAuth: ", isAuth.value);
  } catch (e: { code?: number; message?: string } | unknown | null) {
    // error.value = e?.code || "Erreur inconnue";
    // error.value.message = "Unknown error";
  }
  isLoading.value = false;
}
</script>
