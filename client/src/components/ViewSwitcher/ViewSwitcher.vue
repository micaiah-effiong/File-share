<template>
  <div class="
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
    ">
    <button class="py-1 px-1" @click="store.dispatch('switchFileView', FileViewType.LIST)"
      :class="store.state.fileViewType === FileViewType.LIST ? activeClasses : ''">
      <MenuIcon class=" text-xs w-5" />
    </button>
    <button class="py-1 px-1" @click="store.dispatch('switchFileView', FileViewType.GRID)"
      :class="store.state.fileViewType === FileViewType.GRID ? activeClasses : ''">
      <ViewBoardsIcon class=" text-md w-5" />
    </button>
    <button class="py-1 px-1" @click="store.dispatch('switchFileView', FileViewType.SEMI_LIST)"
      :class="store.state.fileViewType === FileViewType.SEMI_LIST ? activeClasses : ''">
      <ViewGridIcon class="text-xs w-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { MenuIcon, ViewGridIcon, ViewBoardsIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex"
import { FileViewType } from "../../store/types"

const store = useStore()

const activeClasses: string = "shadow-md rounded-[4px] bg-white "
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
}
</style>
