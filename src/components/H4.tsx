import clsx from "clsx";
import { defaultProps } from "~/utils/html-attributes.util";

export default defineComponent({
  props: {
    ...defaultProps,
  },
  setup(props, context) {
    return () => {
      return (
        <h4
          class={clsx(
            props.class,
            "text-3xl font-normal leading-normal mt-0 mb-2",
          )}
        >
          {context.slots.default && context.slots.default()}
        </h4>
      );
    };
  },
});
