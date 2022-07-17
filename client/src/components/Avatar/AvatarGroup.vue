<template>
  <AvatarGroup />
</template>

<script lang="ts" setup>
import { h, ref, useSlots, withDefaults, defineProps, useAttrs } from "vue";
import Avatar from "./Avatar.vue";
const slots = useSlots();
const attrs = useAttrs();
const props = withDefaults(defineProps<{ max?: number }>(), { max: 3 });
const maxSlotItems = ref(props.max);
const slotDefaults = Array.from(slots.default ? slots.default() : []);

function AvatarGroup() {
  if (slotDefaults.length > maxSlotItems.value) {
    const slotSize = slotDefaults.length;
    slotDefaults.length = maxSlotItems.value;

    slotDefaults.push(
      h(Avatar, { count: slotSize - maxSlotItems.value, label: "" })
    );
  }

  return h("div", { ...attrs, class: "flex w-auto px-1" }, [
    h("ul", { class: "avatars md:flex hidden" }, slotDefaults),
  ]);
}
</script>

<style scoped>
.avatars {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
