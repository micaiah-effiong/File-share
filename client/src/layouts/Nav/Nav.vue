<template>
  <nav className="h-full w-32 py-7 bg-white">
    <div className="grid gap-6">
      <div className="text-ocean-blue-dark flex justify-center">
        <RssIcon class="w-10" />
      </div>
      <div className="grid gap-8 text-md text-ocean-blue-dark">
        <NavMenuItem text="Home"> <HomeIcon /> </NavMenuItem>
        <NavMenuItem text="Recent"> <FolderIcon /> </NavMenuItem>
        <NavMenuItem text="Video"> <VideoCameraIcon /> </NavMenuItem>
        <NavMenuItem text="Photo"> <PhotographIcon /> </NavMenuItem>
        <NavMenuItem text="Settings"> <CogIcon /> </NavMenuItem>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import {
  FolderIcon,
  RssIcon,
  HomeIcon,
  VideoCameraIcon,
  PhotographIcon,
  CogIcon,
} from "@heroicons/vue/outline";
import NavMenuItem from "../../components/NavMenuItem.vue";

export default defineComponent({
  components: {
    FolderIcon,
    RssIcon,
    HomeIcon,
    VideoCameraIcon,
    PhotographIcon,
    CogIcon,
    NavMenuItem,
  },
});
</script>
