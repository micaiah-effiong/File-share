<template>
  <div
    class="
      bg-white
      w-full
      min-w-min
      max-h-56
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
            {{ filename }}
          </div>
        </div>
      </div>

      <!-- <div class="cut"></div> -->

      <div class="flex pt-3 pb-2 cut justify-between items-center">
        <div class="uppercase text-xs text-ocean-blue-dark">{{ size }}</div>
        <div>
          <div
            class="
              outline-1 outline-white
              bg-red-500
              w-6
              h-6
              rounded-md
              flex
              justify-center
              items-center
              text-sm
              font-semibold
              text-white
              p-1
            "
          >
            <span>O</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { StarIcon, DotsVerticalIcon } from "@heroicons/vue/outline";
import { DocumentIcon } from "@heroicons/vue/solid";

interface IGridFileItemProps {
  filename: string;
  size: string;
}

type GridFileItemPropsType = {
  filename: {
    type: StringConstructor;
    required: true;
  };
  size: {
    type: StringConstructor;
    required: true;
  };
};

export default defineComponent<
  GridFileItemPropsType,
  IGridFileItemProps,
  unknown
>({
  props: {
    filename: { type: String, required: true },
    size: { type: String, required: true },
  },
  components: {
    StarIcon,
    DotsVerticalIcon,
    DocumentIcon,
  },
  setup(props: IGridFileItemProps) {
    const { filename, size } = props;
    return { filename, size };
  },
});
</script>
