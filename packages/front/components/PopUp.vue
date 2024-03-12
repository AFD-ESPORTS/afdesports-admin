<template>
  <div class="absolute top-0 left-0 m-2 md:w-auto sm:w-full">
    <transition-group name="fade" tag="div">
      <div
        v-for="(popUp, index) in oldestPopUps"
        :key="popUp.originalIndex"
        class="relative max-w-96 hover:max-w-full hover:w-full h-full mb-2 z-50 drop-shadow-lg animate-slide-in transition-all duration-600 ease-in-out"
      >
        <div
          @mouseenter="setHover(popUp.originalIndex, true)"
          @mouseleave="setHover(popUp.originalIndex, false)"
          class="border-2 rounded-lg p-2 backdrop-blur-md hover:pr-12"
          :class="getColorClass(popUp.popup.type).tile"
        >
          <div
            :ref="
            (el) => {
              if (el) divRefs[index] = el as HTMLElement;
            }
          "
            class="absolute flex h-full w-10 top-0 left-0 object-center rounded-l-md justify-center items-center"
            :class="`${getColorClass(popUp.popup.type).iconBackground} ${
              hoverStates[index] &&
              getColorClass(popUp.popup.type).iconBackgroundHover
            }`"
          >
            <Icon
              v-if="!hoverStates[popUp.originalIndex]"
              name="radix-icons:dot-filled"
              :class="`${
                getColorClass(popUp.popup.type).iconColor
              } drop-shadow-lg`"
            />
            <Icon
              v-else
              :name="getColorClass(popUp.popup.type).icon"
              :class="`${
                getColorClass(popUp.popup.type).iconColorHover
              } drop-shadow-lg`"
            />
          </div>
          <div class="relative pl-10">
            <h4 class="object-top text-sm font-bold">
              {{
                popUp.popup.title ||
                (popUp.popup.type === "error"
                  ? "Une erreur est survenue"
                  : popUp.popup.type === "success"
                  ? "Succès"
                  : "Information")
              }}
            </h4>
            <p
              class="object-bottom text-sm line-clamp-2 mt-1"
              :class="{ hidden: !hoverStates[popUp.originalIndex] }"
            >
              {{ popUp.popup.message }}
            </p>
          </div>
          <div
            v-if="hoverStates[popUp.originalIndex]"
            class="absolute flex h-full w-10 top-0 right-0 object-center hover:bg-gray-100/25 rounded-r-md justify-center items-center cursor-pointer"
          >
            <Icon
              name="raphael:cross"
              class="text-gray-200/75 drop-shadow-lg"
              @click="closePopup(popUp.originalIndex)"
            />
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePopUpsStore } from "@/stores/popups";

import type { Ref } from "vue";

const divRefs: Ref<{ [key: number]: HTMLElement | null }> = ref({});
const hoverStates: Ref<{ [key: number]: boolean }> = ref({});

const oldestPopUps = computed(() => {
  return popupsStore.popup.slice(0, 5).map((popup, index) => ({
    popup,
    originalIndex: index,
  }));
});

const getColorClass = (type: string) => {
  switch (type) {
    case "error":
      return {
        tile: "bg-rose-200/75 hover:bg-rose-300/75 border-rose-300 hover:border-rose-400",
        icon: "raphael:exclamation",
        iconColor: "text-red-700/75",
        iconColorHover: "text-red-200/75",
        iconBackground: "bg-rose-300 hover:bg-rose-400 ",
        iconBackgroundHover: "bg-rose-400",
      };
    case "warning":
      return {
        tile: "bg-yellow-200/75 hover:bg-yellow-300/75 border-yellow-300 hover:border-yellow-400",
        icon: "ph:warning-fill",
        iconColor: "text-yellow-700/75",
        iconColorHover: "text-yellow-200/75",
        iconBackground: "bg-yellow-300 hover:bg-yellow-400 ",
        iconBackgroundHover: "bg-yellow-400",
      };
    case "success":
      return {
        tile: "bg-green-200/75 hover:bg-green-300/75 border-green-300 hover:border-green-400",
        icon: "ph:check",
        iconColor: "text-green-700/75",
        iconColorHover: "text-green-200/75",
        iconBackground: "bg-green-300 hover:bg-green-400 ",
        iconBackgroundHover: "bg-green-400",
      };
    case "info":
    default:
      return {
        tile: "bg-blue-200/75 hover:bg-blue-300/75 border-blue-300 hover:border-blue-400",
        icon: "ph:info",
        iconColor: "text-blue-700/75",
        iconColorHover: "text-blue-200/75",
        iconBackground: "bg-blue-300 hover:bg-blue-400 ",
        iconBackgroundHover: "bg-blue-400",
      };
  }
};

const setHover = (id: number, hover: boolean) => {
  if (divRefs.value === null) return;
  hoverStates.value[id] = hover;
};

const closePopup = (id: number) => {
  if (divRefs.value === null) return;
  popupsStore.removePopUp(id);
};

const popupsStore = usePopUpsStore();
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
