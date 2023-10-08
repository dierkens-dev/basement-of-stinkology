import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  auth: {
    globalAppMiddleware: true,
    origin: process.env.BOS_FIREBASE_AUTH_DOMAIN,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
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
