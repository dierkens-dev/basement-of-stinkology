import { clsx } from "clsx";
import { defaultProps } from "~/lib/html-attributes.lib";
import Button from "./Button";

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
            },
            props.class,
          )}
          disabled={props.disabled}
          type="submit"
        >
          <span
            class={clsx("loading-spinner absolute", {
              loading: props.isLoading,
            })}
          ></span>
          <span
            class={clsx({
              invisible: props.isLoading,
            })}
          >
            {context.slots.default && context.slots.default()}
          </span>
        </Button>
      );
    };
  },
});
