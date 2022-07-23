import { action } from "@storybook/addon-actions";
import { HomeIcon } from "@heroicons/vue/solid";
import SemiListFileItem from "./SemiListFileItem.vue";

export default {
  title: "Example/SemiListFileItem",
  component: SemiListFileItem,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyGridFileItem: SemiListFileItem, HomeIcon },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  methods: { action: action("clicked") },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<MyGridFileItem v-bind="args" class="w-48" />',
});

const link = "https://source.unsplash.com/random/128x128?girls";
export const Primary = Template.bind({});
const file = {
  createdAt: new Date().toString(),
  downloadLink: link,
  fileType: "jpg",
  filename: "random.jpg",
  link,
  short: "random.jpg",
  size: "2kb",
  streamLink: link,
};
Primary.args = {
  file,
  onClick: () => (Primary.args.isSelected = !Primary.args.isSelected),
};

export const Selected = Template.bind({});
Selected.args = { file, isSelected: true };
