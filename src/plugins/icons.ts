import { OhVueIcon, addIcons } from "oh-vue-icons";
import { PxEye, PxLink, PxMenu, PxPlus } from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(PxLink, PxEye, PxMenu, PxPlus);
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
