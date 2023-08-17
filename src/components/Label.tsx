import { clsx } from "clsx";
import { defaultProps } from "lib/html-attributes.lib";
import type { LabelHTMLAttributes } from "vue";

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
