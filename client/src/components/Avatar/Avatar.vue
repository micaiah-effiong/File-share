<template>
  <li class="flex">
    <div :class="'rounded-' + round" class="
        avatar
        border border-white
        justify-center
        items-center
        content-center
        flex
        overflow-hidden
        bg-red-500
        round
      ">
      <img class="h-auto w-full align-middle" alt="" :src="url" v-if="url" />
      <!-- src="https://randomuser.me/api/portraits/women/21.jpg" -->
      <span class="img text-xs text-white font-semibold" v-if="!url">{{
          count ? `+${count}` : label[0].toUpperCase()
      }}</span>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";

defineProps({
  label: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    // default: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  round: {
    type: String as PropType<"sm" | "md" | "lg" | "xl" | "none" | "full">,
    default: "md",
  },
  count: {
    type: Number,
  },
})
</script>


<style scoped>
.align {
  display: grid;
  place-items: center;
}

.o {
  border-radius: 30%;
  border: 0.125em solid #fff;
  align-content: center;
  justify-content: center;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: theme("colors.red.500");
}

.avatar {
  height: 1.5em;
  width: 1.5em;
}

li {
  /*display: flex;*/
  margin-left: -0em;
  margin-right: -0.4em;
}
</style>