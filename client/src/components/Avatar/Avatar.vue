<template>
  <li>
    <div class="avatar">
      <img class="img" alt="" :src="url" v-if="url" />
      <!-- src="https://randomuser.me/api/portraits/women/21.jpg" -->
      <span class="img text-xs text-white font-semibold" v-if="!url">{{
        name[0].toUpperCase()
      }}</span>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  setup(props) {
    const { name, url } = props;
    return { name, url };
  },
});
</script>


<style scoped>
.img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}

.align {
  display: grid;
  place-items: center;
}

.avatar {
  border: 0.125em solid #fff;
  border-radius: 30%;
  align-content: center;
  height: 1.5em;
  overflow: hidden;
  justify-content: center;
  background-color: theme("colors.red.500");
  display: flex;
  width: 1.5em;
  align-items: center;
}

li {
  display: flex;
  margin-left: -0em;
  margin-right: -0.4em;
}
</style>