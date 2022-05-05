<template>
  <div class="flex w-auto px-1">
    <ul class="avatars">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { slots }) {
    console.log({ slots });
  },
});
</script>


<style scoped>
.avatars {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>