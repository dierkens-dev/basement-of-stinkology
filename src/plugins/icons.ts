import { OhVueIcon, addIcons } from "oh-vue-icons";
import { PxAlert, PxEye, PxLink, PxMenu, PxPlus } from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(PxLink, PxEye, PxMenu, PxPlus, PxAlert);
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
