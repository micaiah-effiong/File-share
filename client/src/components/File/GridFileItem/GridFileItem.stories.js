import { HomeIcon } from "@heroicons/vue/solid";
import GridFileItem from "./GridFileItem.vue";

export default {
  title: "Example/GridFileItem",
  component: GridFileItem,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyGridFileItem: GridFileItem, HomeIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<MyGridFileItem v-bind="args" class="w-20" />',
});

export const Primary = Template.bind({});
Primary.args = { filename: "Hi mom", size: "3gb" };
