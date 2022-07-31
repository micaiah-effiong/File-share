import vuePlugin from "@vitejs/plugin-vue";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

export default {
	plugins: [vuePlugin(), viteCommonjs()],
	build: {
		// to make tests faster
		minify: false,
	},
	optimizeDeps: {
		disabled: true,
	},
};
