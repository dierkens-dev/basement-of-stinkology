import { clsx } from "clsx";
import type { InputHTMLAttributes } from "vue";
import { defaultProps } from "~/utils/html-attributes.util";

export const inputProps = {
  autoFocus: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<InputHTMLAttributes["type"]>,
    default: undefined,
  },
  name: {
    type: String as PropType<InputHTMLAttributes["name"]>,
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
  onBlur: {
    type: Function as PropType<InputHTMLAttributes["onBlur"]>,
    default: undefined,
  },
};

export default defineComponent({
  props: {
    ...defaultProps,
    ...inputProps,
  },
  setup(props) {
    const target = ref();
    useFocus(target, { initialValue: props.autoFocus });

    return () => {
      const { class: className, ...rest } = props;

      return (
        <input
          ref={target}
          class={clsx("input input-bordered", className)}
          {...rest}
        />
      );
    };
  },
});
