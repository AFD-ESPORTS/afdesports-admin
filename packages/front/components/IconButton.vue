<template>
  <button
    class="flex flex-wrap gap-2 items-center justify-center {{ classes }} "
    :disabled="isLoading"
    @click="submit"
  >
    <slot name="icon" class="mr-2 pr-2">
      <BubbleLoader v-if="isLoading" />
      <Icon :name="icon" v-else />
    </slot>
    <slot name="text" v-if="text">{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  classes: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
  },
});

const { icon, text, isLoading } = toRefs(props);

const submit = () => {
  isLoading.value = true;
};
</script>
