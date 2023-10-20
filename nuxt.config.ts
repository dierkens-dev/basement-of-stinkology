import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  auth: {
    globalAppMiddleware: true,
    origin: process.env.BOS_FIREBASE_AUTH_DOMAIN,
  },
  build: {
    transpile: ["oh-vue-icons"],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
    { path: "~/features/auth/components", pathPrefix: false },
  ],
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
  ],
  srcDir: "./src",
  vite: {
    plugins: [
      tsconfigPaths({
        projects: [
          path.resolve(__dirname, "tsconfig.json"),
          path.resolve(__dirname, "src", "tsconfig.server.json"),
        ],
      }),
    ],
  },
});
