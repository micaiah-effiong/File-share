const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      ash: {
        light: "#86868a",
        dark: "#1d1b22",
        accent: "#66666b",
        normal: "#26262e",
      },
    },
  },
  plugins: [],
};
