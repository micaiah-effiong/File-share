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

	template: '<BottomNavMenuItem v-bind="args" class="w-20"><template #icon><HomeIcon /></template></BottomNavMenuItem>',
});

export const Primary = Template.bind({});
Primary.args = { text: "Home", activeTab: "", showText: false };

export const Active = Template.bind({});
Active.args = { text: "Home", activeTab: "Home", showText: false };

export const WithText = Template.bind({});
WithText.args = { text: "Home", activeTab: "", showText: true };
