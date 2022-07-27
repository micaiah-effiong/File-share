import { action } from "@storybook/addon-actions";
import { HomeIcon } from "@heroicons/vue/solid";
import ActionBtn from "./ActionBtn.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "Example/ActionBtn",
  component: ActionBtn,
};

const Template: Story = (args) => ({
  components: { ActionBtn, HomeIcon },
  setup() {
    return { args };
  },
  methods: { action: action("clicked") },
  // argTypes: { onClick: { action: "clicked" } },
  template: '<ActionBtn v-bind="args" @click="action"><HomeIcon/> </ActionBtn>',
});

const link = "https://source.unsplash.com/random/128x128?girls";
export const Primary = Template.bind({});

Primary.args = {
  label: "Click Me",
  isDisabled: false,
} as { label: string; isDisabled?: boolean };

export const Disabled = Template.bind({});

Disabled.args = {
  label: "Click",
  isDisabled: true,
} as { label: string; isDisabled?: boolean };
