import { defaultProps } from "~/utils/html-attributes.util";

export default defineComponent({
  props: {
    ...defaultProps,
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["onClose"],
  setup(props, context) {
    const dialog = ref<HTMLDialogElement>();

    onMounted(() => {
      dialog.value?.addEventListener("close", () => {
        context.emit("onClose");
      });
    });

    onUpdated(() => {
      if (props.open) {
        dialog.value?.showModal();
      }
    });

    return () => {
      return (
        <dialog ref={dialog} class="modal">
          <div class="modal-box">
            {context.slots.default && context.slots?.default()}
          </div>

          <form method="dialog" class="modal-backdrop bg-black bg-opacity-30">
            <button type="submit">close</button>
          </form>
        </dialog>
      );
    };
  },
});
