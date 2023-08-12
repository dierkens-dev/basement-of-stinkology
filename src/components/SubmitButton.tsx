import { clsx } from "clsx";
import Button from "./Button";
import { defaultProps } from "../lib/html-attributes.lib";

export default defineComponent({
  props: {
    ...defaultProps,
    disabled: {
      type: Boolean,
      default: undefined,
    },
    isLoading: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, context) {
    return () => {
      return (
        <Button
          class={clsx(
            "btn-primary",
            {
              "btn-disabled": props.disabled,
              loading: props.isLoading,
            },
            props.class,
          )}
          disabled={props.disabled}
          type="submit"
        >
          {context.slots.default && context.slots.default()}
        </Button>
      );
    };
  },
});
