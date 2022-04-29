import vuePlugin from "@vitejs/plugin-vue";

export default {
  plugins: [vuePlugin()],
  build: {
    // to make tests faster
    minify: false,
  },
  optimizeDeps: {
    disabled: true,
  },
};
