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
    themes: [
      {
        "bos-light": {
          primary: "#1c92f2",
          "primary-focus": "#0079db",
          "primary-content": "#ffffff",

          secondary: "#7b92b2",
          "secondary-focus": "#5b769a",
          "secondary-content": "#161827",

          accent: "#66d6ff",
          "accent-focus": "#51bcf5",
          "accent-content": "#161827",

          neutral: "#161827",
          "neutral-focus": "#06060a",
          "neutral-content": "#eaf0f6",

          "base-100": "#ffffff",
          "base-200": "#f7fafd",
          "base-300": "#eaf0f6",
          "base-content": "#161827",

          info: "#1c92f2",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",

          "--rounded-box": "1rem",
          "--rounded-btn": ".5rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": "0",
          "--animation-input": "0",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
      "business",
    ],
    darkTheme: "business",
  },
};
