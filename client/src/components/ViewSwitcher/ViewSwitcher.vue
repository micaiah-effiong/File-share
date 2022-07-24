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
      :class="viewType === FileViewTypes.LIST && activeClasses"
    >
      <MenuIcon class="text-xs w-5" />
    </button>
    <button
      class="py-1 px-1"
      @click="mainStore.switchFileView(FileViewTypes.GRID)"
      :class="viewType === FileViewTypes.GRID && activeClasses"
    >
      <ViewBoardsIcon class="text-md w-5" />
    </button>
    <button
      class="py-1 px-1"
      @click="mainStore.switchFileView(FileViewTypes.SEMI_LIST)"
      :class="viewType === FileViewTypes.SEMI_LIST && activeClasses"
    >
      <ViewGridIcon class="text-xs w-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { MenuIcon, ViewGridIcon, ViewBoardsIcon } from "@heroicons/vue/outline";
import { toRefs } from "vue";
import { useMainStore } from "../../store";
import { FileViewTypes, FileViewTypesList } from "../../store/types";

const mainStore = useMainStore();
const props = defineProps<{ fileViewType: FileViewTypesList }>();

const { fileViewType: viewType } = toRefs(props);
const activeClasses: string = "shadow-md rounded-[4px] bg-white ";
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
}
</style>
