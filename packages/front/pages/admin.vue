<template>
  <div class="flex items-center justify-center loginBackground text-white">
    <h1>Admin!</h1>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { usePopUpsStore } from "@/stores/popups";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const popUpsStore = usePopUpsStore();
const router = useRouter();

onBeforeMount(() => {
  if (!userStore.isAdmin) {
    popUpsStore.setPopUp(new Error("Vous n'êtes pas admin!"), "error");
    router.push("/login");
  }
});
</script>
