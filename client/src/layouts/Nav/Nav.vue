<template>
  <nav class="h-full flex-grow-0 py-7 bg-white hidden md:block">
    <div class="grid h-full overflow-auto gap-6">
      <div class="text-ocean-blue-dark h-11 flex justify-center">
        <RssIcon class="w-10" />
      </div>
      <div class="grid gap-8 text-md text-ocean-blue-dark">
        <NavMenuItem text="Home"> <HomeIcon /> </NavMenuItem>
        <NavMenuItem text="Recent"> <FolderIcon /> </NavMenuItem>
        <NavMenuItem text="Video"> <VideoCameraIcon /> </NavMenuItem>
        <NavMenuItem text="Photo"> <PhotographIcon /> </NavMenuItem>
        <NavMenuItem text="Settings"> <CogIcon /> </NavMenuItem>
      </div>

      <div class="flex justify-center self-end">
        <div
          class="
            grid
            border-ocean-blue-secondary border
            bg-ocean-blue-light
            rounded-md
          "
        >
          <div
            class="
              w-11
              h-10
              justify-center
              grid
              text-ocean-blue-dark
              items-center
            "
          >
            <button><DotsHorizontalIcon class="w-6" /></button>
          </div>
          <div class="w-11 h-10 justify-center grid items-center">
            <button>
              <img
                src="https://source.unsplash.com/random/128x128?girls"
                alt="avatar"
                class="
                  w-8
                  h-8
                  border border-ocean-blue-secondary
                  text-xs
                  rounded-md
                "
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  FolderIcon,
  RssIcon,
  HomeIcon,
  VideoCameraIcon,
  PhotographIcon,
  CogIcon,
  DotsHorizontalIcon,
} from "@heroicons/vue/outline";
import NavMenuItem from "../../components/NavMenuItem/SideNavMenuItem.vue";

export default defineComponent({
  components: {
    FolderIcon,
    RssIcon,
    HomeIcon,
    VideoCameraIcon,
    PhotographIcon,
    CogIcon,
    NavMenuItem,
    DotsHorizontalIcon,
  },
});
</script>
