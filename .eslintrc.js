module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "@nuxt/eslint-config",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["src/components/**/*.tsx"],
      rules: {
        "vue/prop-name-casing": "off",
      },
    },
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["~/features/*/*"],
      },
    ],
  },
};
