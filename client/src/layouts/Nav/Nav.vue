<template>
  <nav class="
      h-full
      flex-shrink-0
      w-20
      min-w-20
      py-7
      bg-white
      hidden
      md:block
      shadow-md shadow-ocean-blue-accent
    ">
    <div class="grid h-full overflow-auto gap-6">
      <div class="text-ocean-blue-dark h-11 flex justify-center">
        <RssIcon class="w-10" />
      </div>
      <div class="grid gap-8 text-md text-ocean-blue-dark">
        <NavMenuItem text="Home" @click="activeTabName = 'Home'" :activeTab="activeTabName">
          <HomeIcon />
        </NavMenuItem>
        <NavMenuItem text="Recent" @click="activeTabName = 'Recent'" :activeTab="activeTabName">
          <FolderIcon />
        </NavMenuItem>
        <NavMenuItem text="Video" @click="activeTabName = 'Video'" :activeTab="activeTabName">
          <VideoCameraIcon />
        </NavMenuItem>
        <NavMenuItem text="Photo" @click="activeTabName = 'Photo'" :activeTab="activeTabName">
          <PhotographIcon />
        </NavMenuItem>
        <NavMenuItem text="Settings" @click="activeTabName = 'Settings'" :activeTab="activeTabName">
          <CogIcon />
        </NavMenuItem>
      </div>

      <div class="flex justify-center self-end">
        <div class="
            grid
            border-ocean-blue-secondary border
            bg-ocean-blue-light
            rounded-md
          ">
          <div class="
              w-11
              h-10
              justify-center
              grid
              text-ocean-blue-dark
              items-center
            ">
            <button>
              <DotsHorizontalIcon class="w-6" />
            </button>
          </div>
          <div class="w-11 h-10 justify-center grid items-center">
            <button>
              <img src="https://source.unsplash.com/random/128x128?girls" alt="avatar" class="
                  w-8
                  h-8
                  border border-ocean-blue-secondary
                  text-xs
                  rounded-md
                " />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import {
  FolderIcon,
  RssIcon,
  HomeIcon,
  VideoCameraIcon,
  PhotographIcon,
  CogIcon,
  DotsHorizontalIcon,
} from "@heroicons/vue/outline";
import { Ref, ref } from "vue";
import NavMenuItem from "../../components/NavMenuItem/SideNavMenuItem.vue";

let activeTabName: Ref<string> = ref("")
</script>
