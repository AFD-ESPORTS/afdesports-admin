<template>
  <div
    class="flex w-screen h-screen bg-light-blue items-center justify-center text-white"
  >
    <MenusTopBar />
    <MenusLeftBar />
    <AdminPanelView />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { adminCheck } from "~/helpers/adminCheck";

onBeforeMount(() => {
  adminCheck();
});
</script>
