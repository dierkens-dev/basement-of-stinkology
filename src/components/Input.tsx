import { clsx } from "clsx";
import type { InputHTMLAttributes } from "vue";

export default defineComponent({
  props: {
    class: {
      type: String,
      default: undefined,
    },
    type: {
      type: String as PropType<InputHTMLAttributes["type"]>,
      default: undefined,
    },
    value: {
      type: String as PropType<InputHTMLAttributes["value"]>,
      default: undefined,
    },
  },
  setup(props, context) {
    return () => {
      const { class: className, ...rest } = props;
      return (
        <input class={clsx("input input-bordered", className)} {...rest} />
      );
    };
  },
});
