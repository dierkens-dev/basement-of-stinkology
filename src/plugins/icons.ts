import { OhVueIcon, addIcons } from "oh-vue-icons";
import { PxEye, PxLink } from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(PxLink, PxEye);
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
