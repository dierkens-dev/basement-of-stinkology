import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  PxAlert,
  PxCheck,
  PxEdit,
  PxEye,
  PxLink,
  PxMenu,
  PxPlus,
  PxTrash,
} from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(PxLink, PxEye, PxMenu, PxPlus, PxAlert, PxCheck, PxTrash, PxEdit);
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
