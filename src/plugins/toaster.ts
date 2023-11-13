import { NinjaToasterTheme } from "@cssninja/nuxt-toaster";
import type { ToastOptions } from "~/components/Toast.vue";
import Toast from "~/components/Toast.vue";

export default defineNuxtPlugin(() => {
  const theme: NinjaToasterTheme = {
    containerClass: [
      "absolute",
      "inset-0",
      "pointer-events-none",
      "p-4",
      "flex",
      "flex-col-reverse",
      "items-start",
      "gap-2",
      "isolate",
    ],
    wrapperClass: [
      "pointer-events-auto",
      "cursor-pointer",
      "transition-all",
      "relative",
    ],
    transition: {
      enterActiveClass: "ease-out",
      enterFromClass: "-mb-10 opacity-0",
      enterToClass: "mb-0 opacity-100",
      leaveActiveClass: "ease-in -z-10",
      leaveFromClass: "translate-y-0 opacity-100",
      leaveToClass: "translate-y-full opacity-0",
    },
    maxToasts: 3,
  };

  const nt = createNinjaToaster({
    theme,
    dismissible: false,
  });

  const toast = {
    async show(options: ToastOptions) {
      await nt.show(() => h(Toast, options));
    },
  };

  return {
    provide: {
      toast,
    },
  };
});
