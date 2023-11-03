import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  PxAlert,
  PxCheck,
  PxEdit,
  PxEye,
  PxImage,
  PxLink,
  PxMail,
  PxMailArrowRight,
  PxMenu,
  PxPlus,
  PxTrash,
  PxUpload,
  PxUser,
} from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(
    PxAlert,
    PxCheck,
    PxEdit,
    PxEye,
    PxImage,
    PxLink,
    PxMail,
    PxMailArrowRight,
    PxMenu,
    PxPlus,
    PxTrash,
    PxUpload,
    PxUser,
  );
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
