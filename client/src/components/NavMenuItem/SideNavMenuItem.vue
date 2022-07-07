<template>
  <div class="px-0.5 cursor-pointer" :class="text === activeTab && 'active'">
    <div class="
        grid
        justify-items-center
        gap-2
        nav-item
        text-center text-ocean-blue-dark
        hover:nav-highlight
      ">
      <div class="w-5">
        <slot></slot>
      </div>
      <span class="text-xs uppercase">{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps<{ text: string, activeTab: string }>()
</script>

<style scoped>
.hover\:nav-highlight:hover,
.active {
  box-shadow: 2px 0px theme("colors.ocean-blue.normal");
  transition-property: box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.nav-item:hover>div,
.active>div {
  color: theme("colors.ocean-blue.normal");
  transition-property: color;
  transition-duration: 0.3s;
}

.nav-item:hover>span {
  font-weight: theme("fontWeight.semibold");
  transition-timing-function: cubic-bezier(0.55, 0.06, 0.68, 0.19);
  transition-duration: 0.1s;
}
</style>

