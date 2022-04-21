import { HomeIcon } from "@heroicons/vue/solid";
import NavMenuItem from "../components/NavMenuItem.vue";
import "../index.css";

export default {
  title: "Example/NavMenuItem",
  component: NavMenuItem,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyNavMenuItem: NavMenuItem, HomeIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<MyNavMenuItem v-bind="args" class="w-20"><HomeIcon /></MyNavMenuItem>',
});

export const Primary = Template.bind({});
Primary.args = { text: "Hi mom" };
