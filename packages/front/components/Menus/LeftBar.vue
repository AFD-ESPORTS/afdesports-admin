<template>
  <div
    class="fixed top-14 left-0 h-full w-14 bg-white border-t-2 border-r-2 border-gray-100 border-r-light-blue"
  >
    <div class="flex flex-col h-full w-full">
      <div class="flex items gap-4">
        <Icon
          name="simple-icons:leagueoflegends"
          class="w-10 h-10 m-2 p-1 rounded-xl border-2 cursor-pointer hover:border-blue-500 transition ease-in-out delay-150 duration-500"
          :class="
            active === 'leagueoflegends'
              ? 'text-blue-500 border-blue-500 shadow-lg'
              : 'text-gray-300 border-transparent'
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref("leagueoflegends");
console.log(active.value);
</script>
