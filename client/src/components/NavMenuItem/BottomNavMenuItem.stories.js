import { HomeIcon } from "@heroicons/vue/outline";
import BottomNavMenuItem from "./BottomNavMenuItem.vue";

export default {
  title: "Example/BottomNavMenuItem",
  component: BottomNavMenuItem,
};

const Template = (args) => ({
  components: { BottomNavMenuItem, HomeIcon },

  setup() {
    return { args };
  },

  template:
    '<BottomNavMenuItem v-bind="args" class="w-20"><HomeIcon /></BottomNavMenuItem>',
});

export const Primary = Template.bind({});
Primary.args = { text: "Hi mom" };
