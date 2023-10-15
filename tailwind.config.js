/** @type {import('tailwindcss').Config} */
const srcDir = "./src";

module.exports = {
  content: [
    `${srcDir}/components/**/*.{vue,js,ts,tsx}`,
    `${srcDir}/features/**/*.{vue,js,ts,tsx}`,
    `${srcDir}/layouts/**/*.vue`,
    `${srcDir}/pages/**/*.vue`,
    `${srcDir}/composables/**/*.{js,ts,tsx}`,
    `${srcDir}/plugins/**/*.{js,ts,tsx}`,
    `${srcDir}/utils/**/*.{js,ts,tsx}`,
    `${srcDir}/App.{js,ts,tsx,vue}`,
    `${srcDir}/app.{js,ts,tsx,vue}`,
    `${srcDir}/Error.{js,ts,tsx,vue}`,
    `${srcDir}/error.{js,ts,tsx,vue}`,
    `${srcDir}/app.config.{js,ts,tsx}`,
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    logs: false,
    themes: ["corporate", "business"],
    darkTheme: "business",
  },
};
