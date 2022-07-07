<template>
  <button class="
      grid
      justify-center justify-items-center
      items-center
      text-ocean-blue-dark text-center
    ">
    <div class="nav-item px-3">
      <div class="w-6">
        <slot></slot>
      </div>
    </div>

    <!-- <span class="text-xs uppercase" v-if="text">{{ text }}</span> -->
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps({ text: { type: String, required: true }, active: Boolean })
</script>