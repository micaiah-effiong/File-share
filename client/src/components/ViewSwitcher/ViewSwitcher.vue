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
      gap-4
      bg-ocean-blue-accent
      shadow-ms shadow-inner
    "
  >
    <button>
      <MenuIcon class="text-xs w-5" />
    </button>
    <button class="shadow-md rounded-[4px] bg-white py-1 px-1">
      <ViewBoardsIcon class="text-md w-5" />
    </button>
    <button>
      <ViewGridIcon class="text-xs w-5" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MenuIcon, ViewGridIcon, ViewBoardsIcon } from "@heroicons/vue/outline";

export default defineComponent({
  name: "ViewSwitcher",
  components: {
    MenuIcon,
    ViewGridIcon,
    ViewBoardsIcon,
  },
  setup() {},
});
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
}
</style>
