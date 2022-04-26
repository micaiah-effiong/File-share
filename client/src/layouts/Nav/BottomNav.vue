<template>
  <div class="h-20 w-full px-4 py-2">
    <div class="w-full h-full flex">
      <BottomNavMenuItem>
        <HomeIcon />
      </BottomNavMenuItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  FolderIcon,
  HomeIcon,
  VideoCameraIcon,
  PhotographIcon,
  CogIcon,
  DotsHorizontalIcon,
} from "@heroicons/vue/outline";
import BottomNavMenuItem from "../../components/NavMenuItem/BottomNavMenuItem.vue";

export default defineComponent({
  components: { BottomNavMenuItem, HomeIcon },
});
</script>