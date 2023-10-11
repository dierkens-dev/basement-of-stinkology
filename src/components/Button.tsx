import { clsx } from "clsx";

import { ButtonHTMLAttributes } from "vue";
import { defaultProps } from "~/lib/html-attributes.lib";

export default defineComponent({
  props: {
    ...defaultProps,
    disabled: {
      type: Boolean,
      default: undefined,
    },
    onClick: {
      type: Function as PropType<ButtonHTMLAttributes["onClick"]>,
      default: undefined,
    },
    type: {
      type: String as PropType<ButtonHTMLAttributes["type"]>,
      default: undefined,
    },
  },
  setup(props, context) {
    return () => {
      const { class: className, ...rest } = props;
      return (
        <button {...rest} class={clsx("btn", className)}>
          {context.slots.default && context.slots.default()}
        </button>
      );
    };
  },
});
