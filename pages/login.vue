<template>
  <div class="flex items-center justify-center loginBackground">
    <LoginPane />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
console.log("Params: ", route.params);
console.log("Query: ", route.query);
</script>
