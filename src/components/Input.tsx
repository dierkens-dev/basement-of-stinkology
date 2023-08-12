import { clsx } from "clsx";
import { defaultProps } from "lib/html-attributes.lib";
import type { InputHTMLAttributes } from "vue";

export default defineComponent({
  props: {
    ...defaultProps,
    type: {
      type: String as PropType<InputHTMLAttributes["type"]>,
      default: undefined,
    },
    value: {
      type: String as PropType<InputHTMLAttributes["value"]>,
      default: undefined,
    },
  },
  setup(props) {
    return () => {
      const { class: className, ...rest } = props;

      return (
        <input class={clsx("input input-bordered", className)} {...rest} />
      );
    };
  },
});
