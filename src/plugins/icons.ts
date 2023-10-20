import { OhVueIcon, addIcons } from "oh-vue-icons";
import { PxLink } from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(PxLink);
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
