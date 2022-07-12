<script lang="ts">
import { defineComponent, h, ref } from "vue";
import Avatar from "./Avatar.vue";

export default defineComponent({
  components: { Avatar },
  props: {
    max: {
      type: Number,
    },
  },
  setup(props, { slots }) {
    const maxSlotItems = ref(props.max || 3);
    const slotDefaults = Array.from(slots.default ? slots.default() : []);

    if (slotDefaults.length > maxSlotItems.value) {
      const slotSize = slotDefaults.length;
      slotDefaults.length = maxSlotItems.value;

      slotDefaults.push(
        h(Avatar, { count: slotSize - maxSlotItems.value, label: "" })
      );
    }

    return () => {
      return h("div", { class: "flex w-auto px-1" }, [
        h("ul", { class: "avatars" }, slotDefaults),
      ]);
    };
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
