<template>
  <button
    class="
      grid
      justify-center justify-items-center
      items-center
      text-ocean-blue-dark
    "
  >
    <div class="nav-item px-3">
      <div class="w-6">
        <slot></slot>
      </div>
    </div>

    <span class="text-xs uppercase" v-if="!text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type BottomNavMenuItemPropsType = {
  text: {
    type: StringConstructor;
    required: true;
  };
};

interface IBottomNavMenuItemProps {
  text: string;
}
export default defineComponent<
  BottomNavMenuItemPropsType,
  IBottomNavMenuItemProps,
  unknown
>({
  props: { text: { type: String, required: true } },
  setup(props: IBottomNavMenuItemProps) {
    const { text } = props;
    return { text };
  },
});
</script>