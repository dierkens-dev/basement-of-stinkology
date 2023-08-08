import { clsx } from "clsx";
import type { LabelHTMLAttributes } from "vue";

export default defineComponent({
  props: {
    class: {
      type: String,
      default: undefined,
    },
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
