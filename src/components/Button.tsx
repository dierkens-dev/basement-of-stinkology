import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "vue";

export default defineComponent({
  props: {
    class: {
      type: String,
      default: undefined,
    },
    onClick: {
      type: Function as PropType<ButtonHTMLAttributes["onClick"]>,
      default: undefined,
    },
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
