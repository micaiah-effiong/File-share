<template>
  <nav
    class="
      h-full
      flex-shrink-0
      w-20
      min-w-20
      py-7
      bg-white
      hidden
      md:block
      shadow-md shadow-ocean-blue-accent
    "
  >
    <div class="grid h-full overflow-auto gap-6">
      <div class="text-ocean-blue-dark h-11 flex justify-center">
        <RssIcon class="w-10" />
      </div>
      <div class="grid gap-8 text-md text-ocean-blue-dark">
        <RenderNavItems />
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
            <button>
              <DotsHorizontalIcon class="w-6" />
            </button>
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

<script lang="ts" setup>
import { RssIcon, CogIcon, DotsHorizontalIcon } from "@heroicons/vue/outline";
import { ref, h } from "vue";
import NavMenuItem from "../../components/NavMenuItem/SideNavMenuItem.vue";
import { navItems } from "./NavItemsList";

let activeTabName = ref<string>("Home");
const tabs = [...navItems];
tabs.push({ text: "Settings", icon: CogIcon });

const RenderNavItems = () => {
  return tabs.map(({ text, icon }) => {
    return h(
      NavMenuItem,
      {
        text,
        onClick: () => (activeTabName.value = text),
        activeTab: activeTabName.value,
      },
      { icon }
    );
  });
};
</script>
