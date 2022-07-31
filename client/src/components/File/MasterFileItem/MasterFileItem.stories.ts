import { action } from "@storybook/addon-actions";
import { HomeIcon } from "@heroicons/vue/solid";
import MasterFileItem from "./MasterFileItem.vue";
import { Args, Meta, Story } from "@storybook/vue3";
import { FileItemProps } from "../types";
import { FileViewTypes } from "../../../store/types";

export default {
	title: "Example/MasterFileItem",
	component: MasterFileItem,
	argTypes: {
		viewType: {
			name: "View Types",
			type: "string",
			control: "select",
			options: FileViewTypes,
		},
	},
} as Meta<FileItemProps>;

const Template: Story = (args: Args) => {
	return {
		components: { MasterFileItem, HomeIcon },
		setup() {
			return { args: { ...args } };
		},
		methods: { action: action("clicked") },
		template: '<MasterFileItem v-bind="args" class="w-80"/>',
	};
};

const link = "https://source.unsplash.com/random/128x128?girls";
const file = {
	createdAt: new Date().toString(),
	downloadLink: link,
	fileType: "jpg",
	filename: "random.jpg",
	link,
	short: "random.jpg",
	size: "2kb",
	streamLink: link,
	id: "123e4567-e89b-12d3-a456-426614174000",
};

export const Primary = Template.bind({});

Primary.args = {
	file,
	isSelected: false,
	viewType: FileViewTypes.GRID,
} as FileItemProps;

export const Selected = Template.bind({});

Selected.args = {
	file,
	isSelected: true,
	viewType: FileViewTypes.GRID,
} as FileItemProps;

export const ListItem = Template.bind({});

ListItem.args = {
	file,
	isSelected: false,
	viewType: FileViewTypes.LIST,
} as FileItemProps;

export const SemiListItem = Template.bind({});

SemiListItem.args = {
	file,
	isSelected: false,
	viewType: FileViewTypes.SEMI_LIST,
} as FileItemProps;
