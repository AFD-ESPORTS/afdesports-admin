<template>
  <div class="absolute top-0 left-0 m-2 md:w-auto sm:w-full md:min-w-96">
    <div
      v-for="(err, index) in errorStore.errors.slice(-5)"
      @mouseover="setHover(index, true)"
      @mouseout="setHover(index, false)"
      :key="index"
      class="relative max-w-96 hover:max-w-full hover:w-full h-full mb-2 z-50 drop-shadow-lg animate-slide-in transition-all duration-300 ease-in-out"
    >
      <div
        class="bg-rose-200/75 hover:bg-rose-300/75 border-rose-300 hover:border-rose-400 border-2 rounded-lg p-2 backdrop-blur-md"
      >
        <span
          class="absolute -top-2 -right-2 inline-flex rounded-full h-5 w-5 bg-white text-white justify-center items-center cursor-pointer hover:bg-gray-700 hover:text-rose-400 hover:animate-ping"
          >✖️</span
        >
        <span
          class="absolute -top-2 -right-2 inline-flex rounded-full h-5 w-5 bg-gray-400 text-white justify-center items-center cursor-pointer hover:bg-gray-700 hover:text-rose-400 hover:animate-ping"
          >✖️</span
        >
        <div
          :ref="
            (el) => {
              if (el) divRefs[index] = el as HTMLElement;
            }
          "
          class="absolute flex h-full w-10 top-0 left-0 object-center bg-rose-300 hover:bg-rose-400 rounded-l-md justify-center items-center"
        >
          <Icon name="ph:warning-fill" class="text-rose-200/75" />
        </div>
        <div class="relative pl-10">
          <h4 class="object-top text-sm font-bold mb-1">
            Une erreur est survenue
          </h4>
          <p class="object-bottom text-sm line-clamp-2">{{ err }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useErrorStore } from "@/stores/error";

import type { Ref } from "vue";

const divRefs: Ref<{ [key: number]: HTMLElement | null }> = ref({});
const setHover = (id: number, hover: boolean) => {
  if (divRefs.value === null) return;
  divRefs.value[id].value.classList.add("bg-rose-400");
};

const errorStore = useErrorStore();
console.log("ErrorStore: ", errorStore);
</script>
