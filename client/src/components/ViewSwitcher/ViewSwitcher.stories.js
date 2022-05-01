import ViewSwitcher from "./ViewSwitcher.vue";

export default {
  title: "Example/ViewSwitcher",
  component: ViewSwitcher,
};

const Template = (args) => ({
  components: { ViewSwitcher },

  setup() {
    return { args };
  },

  template: '<div class="max-w-sm"><ViewSwitcher v-bind="args" /></div>',
});

export const Primary = Template.bind({});
