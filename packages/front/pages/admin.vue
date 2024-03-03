<template>
  <div class="flex items-center justify-center loginBackground">Admin!</div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

onBeforeMount(() => {
  if (!userStore.isAuth) {
    router.push("/login");
  }
});
</script>
