import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  PxAlert,
  PxCheck,
  PxEdit,
  PxEye,
  PxEyeClosed,
  PxForward,
  PxImage,
  PxLink,
  PxLock,
  PxMail,
  PxMailArrowRight,
  PxMenu,
  PxPlus,
  PxTrash,
  PxUpload,
  PxUser,
  PxUserPlus,
} from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  addIcons(
    PxAlert,
    PxCheck,
    PxEdit,
    PxEye,
    PxEyeClosed,
    PxForward,
    PxImage,
    PxLink,
    PxLock,
    PxMail,
    PxMailArrowRight,
    PxMenu,
    PxPlus,
    PxTrash,
    PxUpload,
    PxUser,
    PxUserPlus,
  );
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
