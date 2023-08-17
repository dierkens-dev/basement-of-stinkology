import tsconfigPaths from "vite-tsconfig-paths";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  srcDir: "./src",
  vite: {
    plugins: [tsconfigPaths()],
  },
});
