<template>
  <div class="grid gap-3 justify-items-center">
    <div
      role="button"
      class="w-6 text-white bg-ocean-blue-normal rounded-md p-1"
    >
      <slot></slot>
    </div>
    <div>{{ label }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
