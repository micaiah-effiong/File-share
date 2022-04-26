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

    <span class="text-xs">Home</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>