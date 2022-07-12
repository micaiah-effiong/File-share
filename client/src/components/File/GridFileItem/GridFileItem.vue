<template>
  <div
    :class="isSelected ? 'bg-blue-50' : 'bg-white'"
    class="
      min-w-auto
      max-h-fit
      h-auto
      rounded-lg
      shadow-sm
      mono:bg-ash-normal
      mono:text-ash-accent
      mono:hover:bg-ash-secondary
      mono:hover:transition-colors
      transition-colors
    "
  >
    <div class="grid w-full p-3 h-full rounded-md">
      <div>
        <div class="flex justify-between py-1">
          <button>
            <StarIcon class="w-5 text-ocean-blue-secondary" />
          </button>
          <button>
            <DotsVerticalIcon
              class="w-5 mono:text-ash-light text-ocean-blue-secondary"
            />
          </button>
        </div>
        <div class="grid gap-3 pb-3 md:py-3 justify-center text-center">
          <div class="flex justify-center">
            <span>
              <DocumentIcon class="h-10 md:h-16 text-ocean-blue-secondary" />
            </span>
          </div>
          <div class="text-[0.8rem] text-ocean-blue-dark font-semibold">
            {{ file.short }}
          </div>
        </div>
      </div>

      <div
        class="flex pt-3 pb-2 cut flex-wrap gap-2 justify-between items-center"
      >
        <div class="uppercase text-xs text-ocean-blue-dark">
          {{ file.size }}
        </div>
        <AvatarGroup :max="2">
          <Avatar label="Tim" />
          <Avatar
            label="Tim"
            url="https://randomuser.me/api/portraits/women/21.jpg"
          />
          <Avatar label="something" />
        </AvatarGroup>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { StarIcon, DotsVerticalIcon } from "@heroicons/vue/outline";
import { DocumentIcon } from "@heroicons/vue/solid";
import AvatarGroup from "../../Avatar/AvatarGroup.vue";
import Avatar from "../../Avatar/Avatar.vue";
import { DisplayFile } from "../../../types";

withDefaults(defineProps<{ file: DisplayFile; isSelected?: boolean }>(), {
  isSelected: false,
});
</script>
