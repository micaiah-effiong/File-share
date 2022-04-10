module.exports = {
  mode: "jit",
  darkClass: "dark",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ash: {
          light: "#86868a",
          dark: "#1d1b22",
          accent: "#66666b",
          normal: "#26262e",
          secondary: "#34343b",
        },
        "ocean-blue": {
          light: "#f5f9fd",
          dark: "#4d788f",
          accent: "#e8f0f7",
          normal: "#078dee",
          // secondary: "#81c5f6",
          // "":"#668b9e"
          // #e8f0f7
          secondary: "#beccd7",
        },
      },
    },
  },
  plugins: [],
};
