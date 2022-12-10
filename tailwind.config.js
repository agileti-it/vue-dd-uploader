// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const colors = require("tailwindcss/colors");

// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "index.html",
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        green: "#1BB984",
      },
      fontFamily: {
        sans: ["Sofia Pro", "sans-serif"],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("daisyui"),
    // eslint-disable-next-line no-undef
    require("flowbite/plugin"),
  ],
};
