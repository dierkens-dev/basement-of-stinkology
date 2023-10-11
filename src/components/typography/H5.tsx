import clsx from "clsx";
import { defaultProps } from "~/lib/html-attributes.lib";

export default defineComponent({
  props: { ...defaultProps },
  setup(props, context) {
    return () => {
      return (
        <h5
          class={clsx(
            props.class,
            "text-2xl font-normal leading-normal mt-0 mb-2",
          )}
        >
          {context.slots.default && context.slots.default()}
        </h5>
      );
    };
  },
});
