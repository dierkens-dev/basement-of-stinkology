import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  auth: {
    globalAppMiddleware: true,
    baseUrl: "http://localhost:3000",
  },
  build: {
    transpile: ["oh-vue-icons"],
  },
  toaster: {
    installPlugin: false,
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/devtools",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "@cssninja/nuxt-toaster",
    "@vueuse/nuxt",
  ],
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  srcDir: "./src",
  vite: {
    plugins: [
      tsconfigPaths({
        projects: [
          path.resolve(__dirname, "tsconfig.json"),
          path.resolve(__dirname, "src", "server", "tsconfig.json"),
        ],
      }),
    ],
    resolve: {
      // https://github.com/prisma/prisma/issues/12504#issuecomment-1285883083
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
});
