<template>
  <div class="flex items-center justify-center loginBackground text-white">
    <h1>Admin!</h1>
    <br />
    <div class="flex p-2 m-2">
      <p>
        <IconButton
          icon="mdi:tools"
          text="API Test"
          class="leading-6 p-2 rounded-md bg-red-300 hover:bg-red-500 border-red-400 border-2"
          @click="checkToken"
          :isLoading="isLoading"
        />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { usePopUpsStore } from "@/stores/popups";
import { useRouter } from "vue-router";
import { testApi } from "~/api/test.api";

import type { UserDatas } from "@/types/User.d";

const userStore = useUserStore();
const popUpsStore = usePopUpsStore();
const router = useRouter();

const isLoading = ref(false);

const checkToken = async () => {
  isLoading.value = true;
  console.log("Checking token");

  await testApi();
  isLoading.value = false;
};

onBeforeMount(() => {
  let isAdmin: boolean = false;

  if (typeof window !== "undefined") {
    const userDatas: { datas: UserDatas; isAdmin: boolean } = JSON.parse(
      localStorage.getItem("userData") ?? "{}"
    );
    isAdmin = userDatas.isAdmin;
  } else {
    isAdmin = userStore.isAdmin;
  }

  if (!isAdmin) {
    popUpsStore.setPopUp(new Error("Vous n'êtes pas admin!"), "error");
    router.push("/login");
  }
});
</script>
