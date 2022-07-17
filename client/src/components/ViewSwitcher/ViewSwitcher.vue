<template>
  <div
    class="
      flex
      justify-between
      py-1
      px-2
      h-auto
      rounded-md
      bottom-2
      border-black
      gap-2
      bg-ocean-blue-accent
      shadow-ms shadow-inner
    "
  >
    <button
      class="py-1 px-1"
      @click="mainStore.switchFileView(FileViewTypes.LIST)"
      :class="
        mainStore.fileViewType === FileViewTypes.LIST ? activeClasses : ''
      "
    >
      <MenuIcon class="text-xs w-5" />
    </button>
    <button
      class="py-1 px-1"
      @click="mainStore.switchFileView(FileViewTypes.GRID)"
      :class="
        mainStore.fileViewType === FileViewTypes.GRID ? activeClasses : ''
      "
    >
      <ViewBoardsIcon class="text-md w-5" />
    </button>
    <button
      class="py-1 px-1"
      @click="mainStore.switchFileView(FileViewTypes.SEMI_LIST)"
      :class="
        mainStore.fileViewType === FileViewTypes.SEMI_LIST ? activeClasses : ''
      "
    >
      <ViewGridIcon class="text-xs w-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { MenuIcon, ViewGridIcon, ViewBoardsIcon } from "@heroicons/vue/outline";
import { useMainStore } from "../../store";
import {} from "pinia";
import { FileViewTypes } from "../../store/types";

const mainStore = useMainStore();
const activeClasses: string = "shadow-md rounded-[4px] bg-white ";
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
}
</style>
