<template>
  <div class="grid gap-3 justify-items-center">
    <div class="w-6 text-white bg-ocean-blue-normal rounded-md p-1">
      <slot></slot>
    </div>
    <div>{{ label }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ActionBtn",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const label = ref(props.label);
    return { label };
  },
});
</script>
