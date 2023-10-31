import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  PxAlert,
  PxCheck,
  PxEdit,
  PxEye,
  PxLink,
  PxMailArrowRight,
  PxMenu,
  PxPlus,
  PxTrash,
} from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(
    PxAlert,
    PxCheck,
    PxEdit,
    PxEye,
    PxLink,
    PxMailArrowRight,
    PxMenu,
    PxPlus,
    PxTrash,
  );
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
