import { clsx } from "clsx";
import type { LabelHTMLAttributes } from "vue";
import { defaultProps } from "~/utils/html-attributes.util";

export default defineComponent({
  props: {
    ...defaultProps,
    for: {
      type: String as PropType<LabelHTMLAttributes["for"]>,
      default: undefined,
    },
  },
  setup(props, context) {
    return () => {
      const { class: className, ...rest } = props;
      return (
        <label {...rest} class={clsx("label", className)}>
          <span class="label-text">
            {context.slots.default && context.slots.default()}
          </span>
        </label>
      );
    };
  },
});
