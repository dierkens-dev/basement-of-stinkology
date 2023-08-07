import clsx from "clsx";

export default defineComponent({
  props: {
    class: String,
  },
  setup(props, context) {
    return () => {
      return (
        <h6
          class={clsx(
            props.class,
            "text-base font-light leading-normal mt-0 mb-2",
          )}
        >
          {context.slots.default && context.slots.default()}
        </h6>
      );
    };
  },
});
