import { clsx } from "clsx";
import { defaultProps } from "lib/html-attributes.lib";
import type { InputHTMLAttributes } from "vue";

export const inputProps = {
  type: {
    type: String as PropType<InputHTMLAttributes["type"]>,
    default: undefined,
  },
  value: {
    type: String as PropType<InputHTMLAttributes["value"]>,
    default: undefined,
  },
  onInput: {
    type: Function as PropType<InputHTMLAttributes["onInput"]>,
    default: undefined,
  },
};

export default defineComponent({
  props: {
    ...defaultProps,
    ...inputProps,
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
