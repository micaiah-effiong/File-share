<template>
  <div
    :class="selected ? 'bg-blue-50' : 'bg-white'"
    class="
      w-full
      min-w-min
      max-h-fit
      h-fit
      rounded-lg
      shadow-sm
      mono:bg-ash-normal
      mono:text-ash-accent
      mono:hover:bg-ash-secondary
      mono:hover:transition-colors
      transition-colors
    "
  >
    <div class="grid w-full p-3 rounded-md">
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

      <!-- <div class="cut"></div> -->

      <div class="flex pt-3 pb-2 cut justify-between items-center">
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

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { StarIcon, DotsVerticalIcon } from "@heroicons/vue/outline";
import { DocumentIcon } from "@heroicons/vue/solid";
import AvatarGroup from "../../Avatar/AvatarGroup.vue";
import Avatar from "../../Avatar/Avatar.vue";

type File = {
  filename: string;
  size: string;
  short: string;
  createdAt: string;
  link: string;
  downloadLink: string;
  streamLink: string;
  fileType: string;
};

export default defineComponent({
  props: {
    file: {
      type: Object as PropType<File>,
      required: true,
    },
    selected: { type: Boolean, default: false },
  },
  components: {
    StarIcon,
    DotsVerticalIcon,
    DocumentIcon,
    AvatarGroup,
    Avatar,
  },
  setup(props) {
    const { selected } = toRefs(props);

    console.log({
      file: props.file,
    });

    return { file: props.file, selected };
  },
});
</script>
