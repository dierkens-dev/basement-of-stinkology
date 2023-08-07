import { clsx } from "clsx";

export default defineComponent({
  props: {
    class: String,
  },
  setup(props, context) {
    return () => {
      return (
        <button {...props} class={clsx("btn", props.class)}>
          {context.slots.default && context.slots.default()}
        </button>
      );
    };
  },
});
