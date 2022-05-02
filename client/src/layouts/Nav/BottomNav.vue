<template>
  <div class="h-16 md:hidden fixed w-full bottom-0 bottom-nav">
    <div class="h-full w-full px-4 py-2 relative bg-white">
      <div class="w-full h-full flex justify-evenly">
        <BottomNavMenuItem text="Home">
          <HomeIcon />
        </BottomNavMenuItem>
        <BottomNavMenuItem text="Recent">
          <FolderIcon />
        </BottomNavMenuItem>
        <BottomNavMenuItem text="video">
          <VideoCameraIcon />
        </BottomNavMenuItem>
        <BottomNavMenuItem text="Photo">
          <PhotographIcon />
        </BottomNavMenuItem>
        <!-- <BottomNavMenuItem text="Setting">
        <CogIcon />
      </BottomNavMenuItem> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  HomeIcon,
  FolderIcon,
  VideoCameraIcon,
  PhotographIcon,
  CogIcon,
} from "@heroicons/vue/outline";
import BottomNavMenuItem from "../../components/NavMenuItem/BottomNavMenuItem.vue";

export default defineComponent({
  components: {
    BottomNavMenuItem,
    HomeIcon,
    FolderIcon,
    VideoCameraIcon,
    PhotographIcon,
    CogIcon,
  },
});
</script>

<style scoped>
.bottom-nav {
  transition: 0.3s bottom;
}
.hide-below {
  bottom: -4rem;
}
</style>