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
import { adminCheck } from "~/helpers/adminCheck";
import { testApi } from "~/api/test.api";

const isLoading = ref(false);

const checkToken = async () => {
  isLoading.value = true;
  console.log("Checking token");

  await testApi();
  isLoading.value = false;
};

onBeforeMount(() => {
  adminCheck();
});
</script>
