import { clsx } from "clsx";
import { defaultProps } from "~/lib/html-attributes.lib";

export default defineComponent({
  props: {
    ...defaultProps,
  },
  setup(props, context) {
    return () => (
      <div class={clsx("form-control mb-3", props.class)}>
        {context.slots.default && context.slots.default()}
      </div>
    );
  },
});
