<template>
  <br />
  <div
    class="flex flex-col p-2 m-2 justify-center justify-items-center content-center"
  >
    <div>
      <h1 class="text-blue-500 animate-pulse">
        Chargement des données en cours
      </h1>
    </div>
    <div>
      <BubbleLoader class="text-blue-500 justify-center" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
</script>
