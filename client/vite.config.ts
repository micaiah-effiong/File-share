import vuePlugin from "@vitejs/plugin-vue";
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";

export default {
  plugins: [
    vueJsxPlugin({
      include: [/\.tesx$/, /\.[jt]sx$/],
    }),
    vuePlugin(),
  ],
  build: {
    // to make tests faster
    minify: false,
  },
  optimizeDeps: {
    disabled: true,
  },
};
