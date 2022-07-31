module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",

		{
			name: "@storybook/addon-postcss",
			options: {
				postcssLoaderOptions: {
					implementation: require("postcss"),
				},
			},
		},
	],
	framework: "@storybook/vue3",
	core: {
		builder: "@storybook/builder-vite",
	},

	// async viteFinal(config, { configType }) {
	//   // customize the Vite config here
	//   config.plugins = [
	//     ...config.plugins,
	//     require("@vitejs/plugin-vue").default(),
	//   ];
	//   return config;
	// },

	typescript: {
		check: false,
		checkOptions: {},
	},
};
