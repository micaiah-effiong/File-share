import { HomeIcon } from "@heroicons/vue/outline";
import SideNavMenuItem from "./SideNavMenuItem.vue";

export default {
	title: "Example/SideNavMenuItem",
	component: SideNavMenuItem,
};

const Template = (args) => ({
	// Components used in your story `template` are defined in the `components` object
	components: { MySideNavMenuItem: SideNavMenuItem, HomeIcon },
	// The story's `args` need to be mapped into the template through the `setup()` method
	setup() {
		return { args };
	},
	// And then the `args` are bound to your component with `v-bind="args"`
	template: '<MySideNavMenuItem v-bind="args" class="w-20"><template #icon><HomeIcon /></template></MySideNavMenuItem>',
});

export const Primary = Template.bind({});
Primary.args = { text: "Home", activeTab: "" };

export const Active = Template.bind({});
Active.args = { text: "Home", activeTab: "Home" };
